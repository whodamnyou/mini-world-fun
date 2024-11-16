"use client";

import {useState} from "react";
import Image from "next/image";
import {useSwipeable} from "react-swipeable";
import {XCircle, CheckCircle, CircleMinus, CirclePlus} from "lucide-react";
import {Card} from "@/components/ui/card";
import {Input} from "./ui/input";
import {Button} from "./ui/button";

export default function SwipeFeature() {
	const [items, setItems] = useState([
		{
			name: "Dogelon",
			src: "/bcc.jpg",
			description: "Description for image 1",
		},
		{
			name: "ShibaMoon",
			src: "/bcc.jpg",
			description: "Description for image 2",
		},
		{
			name: "SafeMars",
			src: "/bcc.jpg",
			description: "Description for image 3",
		},
		{
			name: "MoonPug",
			src: "/bcc.jpg",
			description: "Description for image 4",
		},
		{
			name: "AstroDoge",
			src: "/bcc.jpg",
			description: "Description for image 5",
		},
		{
			name: "CosmoCat",
			src: "/bcc.jpg",
			description: "Description for image 6",
		},
		{
			name: "GalaxyPup",
			src: "/bcc.jpg",
			description: "Description for image 7",
		},
		{
			name: "RocketRat",
			src: "/bcc.jpg",
			description: "Description for image 8",
		},
		{
			name: "StellarFox",
			src: "/bcc.jpg",
			description: "Description for image 9",
		},
		{
			name: "LunarWhale",
			src: "/bcc.jpg",
			description: "Description for image 10",
		},
	]);
	const [index, setIndex] = useState(0);
	const [swipeDirection, setSwipeDirection] = useState("");
	const [translateX, setTranslateX] = useState(0);
	const [rotateDeg, setRotateDeg] = useState(0);
	const [value, setValue] = useState(0);
	const [opacity, setOpacity] = useState(1);

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			setItems((prevItems) => prevItems.filter((_, i) => i !== index));
			setSwipeDirection("left");
			setTranslateX(-100);
			setRotateDeg(-45);
			setOpacity(0.5);
		},
		onSwipedRight: () => {
			setItems((prevItems) => prevItems.filter((_, i) => i !== index));
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

	return (
		<div className="relative w-full h-full">
			<Card
				className="p-4 transition-all duration-300 ease-out"
				{...handlers}
				style={{
					transform: `translateX(${translateX}%) rotate(${rotateDeg}deg)`,
					opacity: opacity,
				}}
			>
				<div className="flex flex-col items-center justify-center">
					{items.length > 0 ? (
						<>
							<div className="text-xl font-bold mb-4">
								{items[index % items.length].name}
							</div>
							<p className="mb-6">
								{items[index % items.length].description}
							</p>
							<Image
								src={items[index % items.length].src}
								alt="Swipeable Image"
								className="mb-6 rounded-lg"
								width={500}
								height={500}
							/>
							<div className="flex flex-row w-full items-center space-x-2">
								<Button className="w-1/4" onClick={handleDecrement}>
									<CircleMinus />
								</Button>
								<Input
									type="number"
									value={value}
									onChange={handleInputChange}
									className="text-center w-2/4"
								/>
								<Button className="w-1/4" onClick={handleIncrement}>
									<CirclePlus />
								</Button>
							</div>
						</>
					) : (
						<Button onClick={() => {/* Add logic to open create meme coin drawer */}}>
							Create Meme Coin
						</Button>
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
	);
}
