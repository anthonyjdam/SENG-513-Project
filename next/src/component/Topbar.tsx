import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Topbar = () => {
  const [count, setCount] = useState(0);
  const [view, setView] = useState("w");

  return (
    <div className="flex justify-between mx-3 py-4">
      <div className="flex space-x-0.5 items-center">
        <button
          className="rounded-md bg-zinc-300 py-0.5 px-2 hover:bg-zinc-700 hover:text-white transition-all duration-300"
          onClick={() => {
            setCount(count - 1);
          }}
        >
          &lt;
        </button>
        <p className="rounded-md bg-zinc-300 py-1 px-2 text-sm">
          Month {count}
        </p>
        <button
          className="rounded-md bg-zinc-300 py-0.5 px-2 hover:bg-zinc-700 hover:text-white transition-all duration-300"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          &gt;
        </button>
      </div>

      <div className="flex space-x-0.5 text-zinc-700">
        <button
          className={`py-0.5 px-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 ${
            view === "d" ? "bg-red-500 text-white" : "bg-zinc-300"
          }`}
          onClick={() => {
            setView("d");
          }}
        >
          Day
        </button>

        <button
          className={`py-0.5 px-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 ${
            view === "w" ? "bg-red-500 text-white" : "bg-zinc-300"
          }`}
          onClick={() => {
            setView("w");
          }}
        >
          Week
        </button>
      </div>

      <div className="flex space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Login</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <p>settings</p>
        <p>profile</p>
      </div>
    </div>
  );
};
