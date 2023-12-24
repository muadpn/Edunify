import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import AddSchool from "@/components/AddSchool";
import { School } from "lucide-react";
export default function Home() {
  return (
    <>
      <main>
        <MaxWidthWrapper>
          <div className="flex items-center justify-center text-center gap-2 flex-col">
            <h1 className="text-2xl xs:text-4xl tracking-tighter  lg:text-5xl text-primary  font-bold  max-w-prose  pt-3">
              Welcome to Edunify: Connecting Schools, Empowering Education
            </h1>

            <p className="max-w-prose text-muted-foreground text-sm md:text-lg lg:text-xl">
              Unleash the Power of Knowledge with Our Community-Driven Platform.
              India&apos;s largest school discovery platform helping lakhs of
              parents every year find the best schools for their children
            </p>
            <Link
              href="/school"
              className={cn(
                buttonVariants(),
                "whitespace-normal p-2 h-auto w-auto md:whitespace-nowrap"
              )}
            >
              Get Started - Find Your School Today!
            </Link>
          </div>
          <section className="my-32">
            <div className="bg-primary-foreground/90 py-4 px-2 md:p-5 rounded-lg max-w-3xl m-auto">
              <div className="flex items-center gap-2 px-1 ">
                <School size={32} className="flex-shrink-0" strokeWidth={1} />
                <h4 className="text-xl sm:text-2xl md:text-4xl  font-bold tracking-tighter">
                  Know a School ? Register here.
                </h4>
              </div>
              <AddSchool />
            </div>
          </section>
        </MaxWidthWrapper>
      </main>
    </>
  );
}
