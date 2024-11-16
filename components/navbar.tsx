import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full">Create your own MEME coin</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full px-4">
            <DrawerHeader>
              <DrawerTitle>Asset Registration</DrawerTitle>
              <DrawerDescription>Register a new asset with its details.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="p-4 border-2 border-dashed w-full h-64 flex items-center justify-center mb-4">
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
    </nav>
  )
}
