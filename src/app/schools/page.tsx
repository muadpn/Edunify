import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

import SchoolCardLayout from "@/components/SchoolCardLayout";

import React, { Suspense } from "react";
interface SchoolPageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
 
}
const Page = ({ searchParams }: SchoolPageProps) => {
  // console.log(searchParams.page);
  return (
    <main>
      <MaxWidthWrapper>
        <div className="flex items-center text-center flex-col justify-center my-8">
          <h1 className="text-4xl font-bold">Find Your School Today!</h1>
          <p className=" text-muted-foreground text-pretty text-center">
            Ready to embark on your educational journey? Connect with a school
            that aligns with your aspirations. Click on any card to learn more
            and start your exploration.
          </p>
        </div>
        <Suspense>
          <SchoolCardLayout page={searchParams.page ?? "0"} />
        </Suspense>
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
