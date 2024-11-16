"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {itemsArray} from "@/data";
import {Bar, BarChart, CartesianGrid, Line, LineChart, XAxis} from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {useEffect, useState} from "react";
import CommunityChat from "@/components/community-chat";
import { LabelList, Cell } from "recharts";

const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 205 },
  { month: "March", visitors: -207 },
  { month: "April", visitors: 173 },
  { month: "May", visitors: -209 },
  { month: "June", visitors: 214 },
]
import {useMemeStore} from "@/store/use-meme-store";

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-2)) ",
	},
} satisfies ChartConfig;

export default function HoldingsPage() {
	const {
		memeCoins,
		currentIndex,
		removeCurrentMeme,
		fetchMemeCoins,
		createMemeToken,
	} = useMemeStore();
	const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
		null
	);

	useEffect(() => {
		fetchMemeCoins();
	}, [fetchMemeCoins]);

	if (selectedCommunity) {
		return (
			<div className="mt-2 px-2">
				<CommunityChat
					params={{name: selectedCommunity}}
					onBack={() => setSelectedCommunity(null)}
				/>
			</div>
		);
	}

	return (
		<div className="px-6">
			<Accordion className="w-full" type="single" collapsible>
				{memeCoins.length > 0 ? (
					memeCoins.map((token, i) => (
						<AccordionItem key={i} value={`item-${i}`}>
							<AccordionTrigger>
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center gap-4">
										<img
											src={token.image}
											alt={token.name}
											className="w-8 h-8 rounded-full"
										/>
										<span className="font-medium">
											{token.name}
										</span>
									</div>
									<span className="text-lg mr-4">
										{token.supply || "0"}
									</span>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<ChartContainer config={chartConfig}>
									<BarChart
										accessibilityLayer
										data={chartData}
									>
										<CartesianGrid vertical={false} />
										<ChartTooltip
											cursor={false}
											content={
												<ChartTooltipContent
													hideLabel
													hideIndicator
												/>
											}
										/>
										<Bar dataKey="visitors">
											<LabelList
												position="top"
												dataKey="month"
												fillOpacity={1}
											/>
											{chartData.map((item) => (
												<Cell
													key={item.month}
													fill={
														item.visitors > 0
															? "hsl(var(--chart-1))"
															: "hsl(var(--chart-2))"
													}
												/>
											))}
										</Bar>
									</BarChart>
								</ChartContainer>
								<Button
									className="w-full mt-2"
									onClick={() =>
										setSelectedCommunity(
											token.name.toLowerCase()
										)
									}
								>
									Chat with {token.name} community
								</Button>
							</AccordionContent>
						</AccordionItem>
					))
				) : (
					<div className="col-span-2 text-center py-8">
						<h2 className="text-xl font-semibold">
							No communities available
						</h2>
					</div>
				)}
			</Accordion>
		</div>
	);
}
