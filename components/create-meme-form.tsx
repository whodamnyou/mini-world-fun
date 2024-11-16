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

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
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
				className="relative w-full aspect-square mb-4 cursor-pointer"
				onClick={handleImageClick}
			>
				{newMeme.image ? (
					<Image
						src={newMeme.image}
						alt="Meme Preview"
						className="rounded-lg object-cover"
						fill
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
						<p className="text-gray-500">Click to upload image</p>
					</div>
				)}
				<Input
					placeholder="Image URL"
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
