"use client";

import {useState, useRef} from "react";
import Image from "next/image";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {useMemeStore} from "@/store/use-meme-store";

interface CreateMemeFormProps {
	onSuccess?: () => void;
	className?: string;
}

export function CreateMemeForm({onSuccess, className}: CreateMemeFormProps) {
	const {createMemeToken} = useMemeStore();
	const [isCreating, setIsCreating] = useState(false);
	const [newMeme, setNewMeme] = useState({
		name: "",
		symbol: "",
		image: "",
		description: "",
	});
    const fileInputRef = useRef<HTMLInputElement>(null);
    

    const handleCreateMemeToken = async () => {
        console.log("meme data:",newMeme );
		try {
			setIsCreating(true);
			await createMemeToken(
				newMeme.name,
				newMeme.symbol,
				newMeme.image,
				newMeme.description
			);
			setNewMeme({name: "", symbol: "", image: "", description: ""});
			onSuccess?.();
		} catch (error) {
			console.error("Failed to create meme token:", error);
		} finally {
			setIsCreating(false);
		}
	};

	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) { // 5MB limit
				alert("File is too large. Please choose an image under 5MB");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setNewMeme({...newMeme, image: reader.result as string});
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className={`p-4 space-y-4 ${className}`}>
			<div
				className="relative w-full aspect-square mb-4 cursor-pointer hover:opacity-90 transition-opacity"
				onClick={handleImageClick}
			>
				{newMeme.image ? (
					<Image
						src={newMeme.image}
						alt="Meme Preview"
						className="rounded-lg object-cover"
						fill
						priority
					/>
				) : (
					<div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
						<svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
						<p className="text-gray-500">Click to upload image</p>
						<p className="text-gray-400 text-sm mt-1">Max size: 5MB</p>
					</div>
				)}
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleImageChange}
				/>
			</div>
			<Input
				placeholder="Token Name"
				value={newMeme.name}
				onChange={(e) => setNewMeme({...newMeme, name: e.target.value})}
			/>
			<Input
				placeholder="Token Symbol"
				value={newMeme.symbol}
				onChange={(e) =>
					setNewMeme({...newMeme, symbol: e.target.value})
				}
			/>
			<Input
				placeholder="Description"
				value={newMeme.description}
				onChange={(e) =>
					setNewMeme({...newMeme, description: e.target.value})
				}
			/>
			<Button
				onClick={handleCreateMemeToken}
				disabled={isCreating}
				className="w-full"
			>
				{isCreating ? "Creating..." : "Create Token"}
			</Button>
		</div>
	);
}
