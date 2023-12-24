import React from "react";
import SchoolCard from "./SchoolCard";
import { getSchoolData } from "@/lib/handlers/get-school-data";

import PageNavigation from "./PageNavigation";
import { PAGINATION_COUNT } from "@/lib/constants";

interface SchoolCardProps {
  page: string;
}

const SchoolCardLayout = async ({ page }: SchoolCardProps) => {
  let ParsedPage = parseInt(page);
  if (isNaN(ParsedPage)) ParsedPage = 0;
  const { totalSchool, schoolData } = await getSchoolData(ParsedPage);
  const TotalPage = Math.ceil(totalSchool / PAGINATION_COUNT) - 1;


  const canNextPage = TotalPage <= ParsedPage;
  return (
    <div className="flex flex-col ">
      <div className="flex gap-x-4 gap-y-12 flex-wrap items-center justify-center  ">
        {schoolData.map((school) => {
          return <SchoolCard key={school.id} {...school} />;
        })}
      </div>
      <PageNavigation
        ParsedPage={isNaN(ParsedPage) ? 0 : ParsedPage}
        totalSchool={totalSchool}
        TotalPage={TotalPage}
        canNextPage={canNextPage}
      />
    </div>
  );
};

export default SchoolCardLayout;
