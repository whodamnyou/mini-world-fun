"use client";

import { useSession } from "next-auth/react";
import { SignIn } from "./sign-in"

interface GateProps {
  children: React.ReactNode
}

export function Gate({ children }: GateProps) {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <SignIn />
      </div>
    )
  }

  return <>{children}</>
}