"use client";

import {useState} from "react";
import Image from "next/image";
import {useSwipeable} from "react-swipeable";
import {XCircle, CheckCircle} from "lucide-react";
import {Card} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SwipeFeature() {
	const items = [
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
	];
	const [index, setIndex] = useState(0);
	const [swipeDirection, setSwipeDirection] = useState("");

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			setIndex((prevIndex) => (prevIndex + 1) % items.length);
			setSwipeDirection("left");
		},
		onSwipedRight: () => {
			setIndex(
				(prevIndex) => (prevIndex - 1 + items.length) % items.length
			);
			setSwipeDirection("right");
		},
		onSwiped: () => {
			setTimeout(() => setSwipeDirection(""), 100);
		},
		// @ts-ignore
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	return (
		<div {...handlers}>
			<div className="flex flex-col items-center justify-center">
				<div className="text-xl font-bold mb-4">
					{items[index].name}
				</div>
				<p className="mb-6">{items[index].description}</p>
				<Image
					src={items[index].src}
					alt="Swipeable Image"
					className="mb-6"
					width={500}
					height={500}
				/>
				{swipeDirection === "left" && (
					<XCircle
						className="absolute top-1/2 left-1/4 text-red-500"
						size={120}
					/>
				)}
				{swipeDirection === "right" && (
					<CheckCircle
						className="absolute top-1/2 right-1/4 text-green-500"
						size={120}
					/>
				)}
				<div className="flex flex-row items-center space-x-2">
					<Button>
						-
					</Button>
					<Input
                        type="number"
                        value={0}
						className="text-center"
					/>
					<Button>
						+
					</Button>
				</div>
			</div>
		</div>
	);
}
