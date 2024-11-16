"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ChevronLeft} from "lucide-react";

const testMessages = [
	{
		id: 1,
		user: "Alice",
		message: "Hey everyone! Excited about this project!",
		timestamp: "10:30 AM",
	},
	{
		id: 2,
		user: "Bob",
		message: "The latest updates look promising",
		timestamp: "10:32 AM",
	},
	{
		id: 3,
		user: "Carol",
		message: "When is the next community call?",
		timestamp: "10:35 AM",
	},
];

export default function CommunityChat({
	params,
	onBack
}: {
	params: {name: string};
	onBack: () => void;
}) {
	const name = params.name.charAt(0).toUpperCase() + params.name.slice(1);
	const [messages, setMessages] = useState(testMessages);
	const [newMessage, setNewMessage] = useState("");

	const handleSend = () => {
		if (!newMessage.trim()) return;

		setMessages([
			...messages,
			{
				id: messages.length + 1,
				user: "You",
				message: newMessage,
				timestamp: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			},
		]);
		setNewMessage("");
	};

	return (
		<div className="flex flex-col h-[calc(100vh-10rem)]">
			<div className="flex items-center gap-4 mb-4">
				<Button
					variant="outline"
					size="sm"
					onClick={onBack}
				>
					<ChevronLeft className="h-4 w-4" />
					Back
				</Button>
				<h1 className="text-2xl font-bold text-center flex-1">
					{name} Community
				</h1>
			</div>

			<ScrollArea className="flex-1 p-4 rounded-lg border mb-4">
				{messages.map((msg) => (
					<div key={msg.id} className="mb-4">
						<div className="flex items-center gap-2">
							<span className="font-semibold">{msg.user}</span>
							<span className="text-xs text-gray-500">
								{msg.timestamp}
							</span>
						</div>
						<p className="text-gray-700">{msg.message}</p>
					</div>
				))}
			</ScrollArea>

			<div className="flex gap-2">
				<Input
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Type your message..."
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>
				<Button onClick={handleSend}>Send</Button>
			</div>
		</div>
	);
}
