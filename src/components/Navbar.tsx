import { GraduationCap } from "lucide-react";
import React from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { ModeToggle } from "./ui/ModeToggle";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <MaxWidthWrapper className="sticky top-0 z-50">
      <nav className="bg-primary-foreground/95 rounded-b-2xl p-2">
        <div className="flex justify-between items-center gap-x-2">
          <Link href="/">
            <div className="flex items-center  gap-2">
              <GraduationCap
                size={44}
                strokeWidth={1}
                className="stroke-primary"
              />

              <h3 className="text-2xl font-bold tracking-tight text-primary ">
                Edunify
              </h3>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className=" hidden md:flex items-center gap-x-12">
            <div className="space-x-4">
              <Link href="/" className={buttonVariants()}>
                <p className="font-medium">Home</p>
              </Link>
              <Link href="/schools" className={buttonVariants()}>
                <p className="font-medium">Find School</p>
              </Link>
            </div>
            <ModeToggle />
          </div>
          {/* Desktop Navigation - Ends */}
          <div className="block md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
