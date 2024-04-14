"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Paginate({
  itemCount,
  perPage,
}: {
  itemCount: number;
  perPage: number;
}) {
  let pageCount = Math.ceil(itemCount / perPage);
  let pageArr = new Array(pageCount).fill(0);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page") ?? 1);

  function setPage(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page > 0 && page <= pageCount) {
      params.set("page", page.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <Pagination className="md:mb-10 mb-4">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={() => setPage(currentPage - 1)} />
        </PaginationItem>
        {currentPage - 1 > 0 && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink onClick={() => setPage(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationLink isActive={true}>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
          <PaginationLink onClick={() => setPage(currentPage + 1)}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        {currentPage + 1 <= pageCount && (
          <PaginationItem className="cursor-pointer">
            <PaginationLink onClick={() => setPage(currentPage + 2)}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 1 < pageCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={() => setPage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
