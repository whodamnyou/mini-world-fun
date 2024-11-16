"use client";

import {DollarSign, Home, Users} from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, usePathname } from "next/navigation";
import { SignIn } from "./sign-in";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/holdings", label: "Holdings", icon: DollarSign },
  { path: "/communities", label: "Communities", icon: Users },
  { path: "/meme", label: "Create Meme", icon: Users },
];

export function Navbar() {
  const { data: session } = useSession();
  console.log("session", session);
	const router = useRouter();
	const pathname = usePathname();

	return (
		<nav className="flex items-center justify-between p-4 bg-white">
			{/* <div className="text-lg font-semibold text-black">
				{session?.user?.name?.slice(0, 12)}
      </div> */}
      <SignIn />
			<Select value={pathname} onValueChange={(value) => router.push(value)}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Navigate to..." />
				</SelectTrigger>
				<SelectContent>
					{navItems.map((item) => (
						<SelectItem key={item.path} value={item.path}>
							<div className="flex items-center gap-2">
								<item.icon className="h-4 w-4" />
								<span>{item.label}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</nav>
	);
}
