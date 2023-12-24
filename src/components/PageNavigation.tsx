"use client";
import React, { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
interface PageNavigationProps {
  ParsedPage: number;
  totalSchool: number;
  TotalPage: number;
  canNextPage: boolean;
}
const PageNavigation = ({
  ParsedPage,
  TotalPage,
  canNextPage,
}: PageNavigationProps) => {
  const router = useRouter();
  useEffect(() => {
    if (TotalPage < ParsedPage) {
      router.push(`/schools?page=${TotalPage}`);
    }
  }, [ParsedPage, TotalPage, router]);
  return (
    <div className="mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            className={cn({ "pointer-events-none": ParsedPage - 1 < 0 })}
            href={`/schools?page=${ParsedPage - 1}`}
          />

          <PaginationLink href={"#"}>{ParsedPage}</PaginationLink>

          <PaginationEllipsis className="hidden md:flex" />
          <PaginationLink href={`/schools?page=${TotalPage}`}>
            {TotalPage}
          </PaginationLink>

          <PaginationNext
            className={cn({ "pointer-events-none": canNextPage })}
            href={`/schools?page=${ParsedPage + 1}`}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PageNavigation;
