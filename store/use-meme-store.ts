import {create} from "zustand";
import {persist} from "zustand/middleware";
import {ethers} from "ethers";
import {abi} from "../public/abi";
import Cookies from "js-cookie";
import {MiniKit} from "@worldcoin/minikit-js";

const abi1 = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageUrl",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "createMemeToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const abi2 = [
  "function balanceOf(address _owner) view returns (uint256)"
];

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
					"0x658C7dcF7ba7f68020dB9ca240e1895665Ad238E";
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
						supply: "1",
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

				// Validate inputs
				if (!name || !symbol || !image || !description) {
					throw new Error("All fields are required");
				}

				// Ensure image is a valid data URL or HTTP URL
				if (!image.startsWith('data:image/') && !image.startsWith('http')) {
					throw new Error("Invalid image format");
				}

				try {
					const {commandPayload, finalPayload} =
						await MiniKit.commandsAsync.sendTransaction({
								transaction: [
									{
										address: "0x658C7dcF7ba7f68020dB9ca240e1895665Ad238E",
										abi: abi1,
										functionName: "createMemeToken",
										args: ["name1", "symbol1", "imag1e", "description"],
									},
								],
                        });
                    
                    console.log("commandPayload: ", commandPayload);
                    console.log("finalPayload: ", finalPayload);

					if (finalPayload.status === "error") {
						throw new Error(finalPayload.error_code || "Transaction failed");
					}

					await get().fetchMemeCoins();
				} catch (error) {
					console.error("Error creating meme token:", error);
					throw error;
				}
            },
			getBalance: async (address: string): Promise<string> => {
				try {
					const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL);
					const contract = new ethers.Contract(
						"0x1d9B6ee651Eb174D12Cf9c7Cb5cAcCD428B393Cb",
						abi2,
						provider
					);
					const balance = await contract.balanceOf(address);
					return balance.toString();
				} catch (error) {
					console.error("Error getting balance:", error);
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
