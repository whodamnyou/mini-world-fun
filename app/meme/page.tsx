"use client";

import { CreateMemeForm } from "@/components/create-meme-form";

export default function CreateMemePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <CreateMemeForm 
          onSuccess={() => {
            console.log("Meme created successfully");
          }}
        />
      </div>
    </div>
  );
}
