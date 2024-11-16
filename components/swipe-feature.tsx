"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import {useSwipeable} from "react-swipeable";
import {XCircle, CheckCircle, CircleMinus, CirclePlus, Plus} from "lucide-react";
import {Card} from "@/components/ui/card";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import { useMemeStore } from '@/store/use-meme-store'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { CreateMemeForm } from "./create-meme-form";

export default function SwipeFeature() {
	const { memeCoins, currentIndex, removeCurrentMeme, fetchMemeCoins, createMemeToken } = useMemeStore()
	const [swipeDirection, setSwipeDirection] = useState("");
	const [translateX, setTranslateX] = useState(0);
	const [rotateDeg, setRotateDeg] = useState(0);
	const [value, setValue] = useState(0);
	const [opacity, setOpacity] = useState(1);
	const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

	useEffect(() => {
		fetchMemeCoins();
	}, [fetchMemeCoins]);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			removeCurrentMeme('left');
			setSwipeDirection("left");
			setTranslateX(-100);
			setRotateDeg(-45);
			setOpacity(0.5);
		},
		onSwipedRight: () => {
			removeCurrentMeme('right');
			setSwipeDirection("right");
			setTranslateX(100);
			setRotateDeg(45);
			setOpacity(0.5);
		},
		onSwiped: () => {
			setTimeout(() => {
				setSwipeDirection("");
				setTranslateX(0);
				setRotateDeg(0);
				setOpacity(1);
			}, 300);
		},
		// @ts-ignore
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	const handleIncrement = () => {
		setValue((prevValue) => prevValue + 1);
	};

	const handleDecrement = () => {
		setValue((prevValue) => Math.max(0, prevValue - 1));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value, 10);
		if (!isNaN(newValue) && newValue >= 0) {
			setValue(newValue);
		}
	};

	console.log(memeCoins)

	return (
		<>
			<div className="relative w-full h-full pt-8">
				<Card
					className="p-4 transition-all duration-300 ease-out"
					{...handlers}
					style={{
						transform: `translateX(${translateX}%) rotate(${rotateDeg}deg)`,
						opacity: opacity,
					}}
				>
					<div className="flex flex-col items-center justify-center">
						{memeCoins.length > 0 ? (
							<>
								<div className="text-xl font-bold mb-4">
									{memeCoins[currentIndex % memeCoins.length].name}
								</div>
								<p className="mb-6">
									{memeCoins[currentIndex % memeCoins.length].description}
								</p>
								<Image
									src={memeCoins[currentIndex % memeCoins.length].image}
									alt="Swipeable Image"
									className="mb-6 rounded-lg"
									width={500}
									height={500}
								/>
								<div className="flex flex-row w-full items-center space-x-2">
									<Button
										className="w-1/4"
										onClick={handleDecrement}
									>
										<CircleMinus />
									</Button>
									<Input
										type="number"
										value={value}
										onChange={handleInputChange}
										className="text-center w-2/4"
									/>
									<Button
										className="w-1/4"
										onClick={handleIncrement}
									>
										<CirclePlus />
									</Button>
								</div>
							</>
						) : (
							<div className="flex items-center justify-center h-full">
								<p className="text-2xl font-bold text-center">No more!</p>
							</div>
						)}
					</div>
				</Card>
				{swipeDirection === "left" && (
					<XCircle
						className="absolute top-1/2 left-4 transform -translate-y-1/2 text-red-700"
						size={120}
					/>
				)}
				{swipeDirection === "right" && (
					<CheckCircle
						className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-700"
						size={120}
					/>
				)}
			</div>

			<div className="fixed bottom-4 left-4 right-4">
				<Button onClick={() => setIsCreateDrawerOpen(true)} className="w-full p-4 flex items-center justify-center gap-2">
					<Plus className="h-6 w-6" />
					<span>Create your meme now!</span>
				</Button>
			</div>

			<Drawer open={isCreateDrawerOpen} onOpenChange={setIsCreateDrawerOpen}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Create New Meme Token</DrawerTitle>
					</DrawerHeader>
					<div className="p-4">
						<CreateMemeForm 
							onSuccess={() => setIsCreateDrawerOpen(false)}
						/>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
}
