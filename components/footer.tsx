"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Footer() {
	const router = useRouter();

	return (
		<Button 
			className="fixed mb-4 px-6 bottom-0 left-1/2 transform -translate-x-1/2 w-2/3"
			onClick={() => router.push('/meme')}
		>
			Create your own MEME coin
		</Button>
	);
}
