import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/ModeToggle";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col my-12 gap-y-12">
          <div className="flex flex-col gap-2">
            <SheetClose asChild>
              <Link href="/" className={buttonVariants({ variant: "outline" })}>
                <p className="font-medium">Home</p>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/schools"
                className={buttonVariants({ variant: "outline" })}
              >
                <p className="font-medium">Find School</p>
              </Link>
            </SheetClose>
          </div>
          <div className="self-end">
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
