"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateMemePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create your MEME coin</h1>
          <p className="text-muted-foreground">
            Register a new meme coin with its details.
          </p>
        </div>

        <div className="p-4 border-2 border-dashed rounded-lg w-full h-64 relative flex items-center justify-center mb-4">
          <Input
            type="file"
            className="w-full h-full opacity-0 absolute cursor-pointer"
          />
          <span className="text-center text-muted-foreground">
            Drag and drop your file here or click to select a file
          </span>
        </div>

        <div className="space-y-4">
          <Input placeholder="Name" />
          <Input placeholder="Ticker" />
          <Input placeholder="Description" />
          <Input type="number" placeholder="Quantity" />
        </div>

        <Button className="w-full">Create Meme Coin</Button>
      </div>
    </div>
  );
}
