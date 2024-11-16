import {create} from "zustand";
import {persist} from "zustand/middleware";
import {ethers} from "ethers";
import {abi} from "../public/abi";
import Cookies from "js-cookie";
import {MiniKit} from "@worldcoin/minikit-js";

interface MemeToken {
	name: string;
	symbol: string;
	description: string;
	image: string;
	supply: string;
	creator: string;
	contractAddress: string;
}

interface MemeState {
	memeCoins: MemeToken[];
	currentIndex: number;
	setMemeCoins: (coins: MemeToken[]) => void;
	setCurrentIndex: (index: number) => void;
	removeCurrentMeme: (direction: "left" | "right") => void;
	fetchMemeCoins: () => Promise<void>;
	createMemeToken: (
		name: string,
		symbol: string,
		image: string,
		description: string
	) => Promise<void>;
}

const cookieStorage = {
	getItem: (name: string) => {
		const value = Cookies.get(name);
		return value ? JSON.parse(value) : null;
	},
	setItem: (name: string, value: any) => {
		Cookies.set(name, JSON.stringify(value), {expires: 7}); // expires in 7 days
	},
	removeItem: (name: string) => Cookies.remove(name),
};

export const useMemeStore = create<MemeState>()(
	persist(
		(set, get) => ({
			memeCoins: [],
			currentIndex: 0,
			setMemeCoins: (coins) => set({memeCoins: coins}),
			setCurrentIndex: (index) => set({currentIndex: index}),
			removeCurrentMeme: (direction) => {
				const {memeCoins, currentIndex} = get();
				const newMemeCoins = memeCoins.filter(
					(_, i) => i !== currentIndex
				);

				// If we're at the last item, move index back by 1
				const newIndex =
					currentIndex >= newMemeCoins.length
						? Math.max(0, newMemeCoins.length - 1)
						: currentIndex;

				set({
					memeCoins: newMemeCoins,
					currentIndex: newIndex,
				});
			},
			fetchMemeCoins: async () => {
				const contractAddress =
					"0xF7a41702267781b4ad671Cca32fbB3aAb1Bb129d";
				const provider = new ethers.providers.JsonRpcProvider(
					"https://worldchain-mainnet.g.alchemy.com/public"
				);
				const contract = new ethers.Contract(
					contractAddress,
					abi,
					provider
				);
				const coins = await contract.getAllMemeTokens();
				if (coins && coins.length > 0 && Array.isArray(coins[0])) {
					const formattedCoins: MemeToken[] = coins.map((coin: any) => ({
						name: coin[0] || "",
						symbol: coin[1] || "",
						description: coin[2] || "",
						image: coin[3] && coin[3].startsWith("http") ? coin[3] : "/placeholder.png",
						supply: coin[4] ? ethers.utils.formatUnits(coin[4], 0) : "0",
						creator: coin[5] || "",
						contractAddress: coin[6] || ""
					}));
					set({memeCoins: formattedCoins});
				} else {
					set({memeCoins: []});
				}
			},
			createMemeToken: async (
				name: string,
				symbol: string,
				image: string,
				description: string
			): Promise<void> => {
				if (!MiniKit.isInstalled()) {
					throw new Error("MiniKit not installed");
				}

				const deadline = Math.floor(
					(Date.now() + 30 * 60 * 1000) / 1000
				).toString();

				try {
					const {commandPayload, finalPayload} =
						await MiniKit.commandsAsync.sendTransaction({
							transaction: [
								{
									address:
										"0xF7a41702267781b4ad671Cca32fbB3aAb1Bb129d",
									abi: abi,
									functionName: "createMemeToken",
									args: [name, symbol, image, description],
								},
							],
						});

					if (finalPayload.status === "error") {
						throw new Error(
							finalPayload.error_code || "Transaction failed"
						);
					}

					// Refresh the meme coins list after successful creation
					await get().fetchMemeCoins();
				} catch (error) {
					console.error("Error creating meme token:", error);
					throw error;
				}
			},
		}),
		{
			name: "meme-storage",
			storage: cookieStorage,
		}
	)
);