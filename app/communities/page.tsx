"use client";

import { useState } from "react";
import { itemsArray } from "@/data";
import { Card } from "@/components/ui/card";
import CommunityChat from "@/components/community-chat";

export default function CommunityPage() {
	const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

	if (selectedCommunity) {
		return (
			<div className="mt-2 px-2">
				<CommunityChat 
					params={{ name: selectedCommunity }} 
					onBack={() => setSelectedCommunity(null)}
				/>
			</div>
		);
	}

	return (
		<div className="container mt-2 px-2">
			<div className="grid gap-2 grid-cols-2">
				{itemsArray.map((community, i) => (
					<Card 
						key={i} 
						className="relative overflow-hidden h-48 cursor-pointer hover:opacity-90 transition-opacity"
						onClick={() => setSelectedCommunity(community.name.toLowerCase())}
					>
						<div
							className="absolute inset-0 bg-cover bg-center z-0"
							style={{ backgroundImage: `url(${community.src})` }}
						/>
						<div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
						<div className="relative z-20 h-full flex items-center justify-center">
							<h2 className="text-white text-xl font-semibold">
								{community.name}
							</h2>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
