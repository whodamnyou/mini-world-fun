"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function Footer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="fixed mt-4 px-6 top-0 left-1/2 transform -translate-x-1/2 w-2/3">Create your own MEME coin</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle>Asset Registration</DrawerTitle>
            <DrawerDescription>Register a new asset with its details.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-0">
            <div className="p-4 border-2 border-dashed w-64 h-64 flex items-center justify-center mx-auto mb-2">
              <Input type="file" className="w-full h-full opacity-0 absolute" />
              <span className="text-center text-gray-500">Drag and drop your file here or click to select a file</span>
            </div>
            <Input placeholder="Name" className="mb-2" />
            <Input placeholder="Ticker" className="mb-2" />
            <Input placeholder="Description" className="mb-2" />
            <Input type="number" placeholder="Quantity" className="mb-2" />
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
