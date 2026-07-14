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
import { setSearchParams } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ProductPagination = (props: {
  totalPages: number;
  currentPage: number;
}) => {
  const { totalPages, currentPage } = props;
  const searchParams = useSearchParams();
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const items = [];

    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <Link
          href={setSearchParams({
            searchParams: searchParams.toString(),
            params: { page: "1" },
          })}
        >
          <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
        </Link>
      </PaginationItem>
    );

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <Link
            href={setSearchParams({
              searchParams: searchParams.toString(),
              params: { page: i.toString() },
            })}
          >
            <PaginationLink isActive={currentPage === i}>{i}</PaginationLink>
          </Link>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <Link
            href={setSearchParams({
              searchParams: searchParams.toString(),
              params: { page: totalPages.toString() },
            })}
          >
            <PaginationLink isActive={currentPage === totalPages}>
              {totalPages}
            </PaginationLink>
          </Link>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="mt-8 flex justify-end">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <Link
                href={setSearchParams({
                  searchParams: searchParams.toString(),
                  params: { page: (currentPage - 1).toString() },
                })}
              >
                <PaginationPrevious aria-disabled={currentPage === 1} />
              </Link>
            </PaginationItem>
          )}
          {renderPageNumbers()}
          {currentPage < totalPages && (
            <PaginationItem>
              <Link
                href={setSearchParams({
                  searchParams: searchParams.toString(),
                  params: { page: (currentPage + 1).toString() },
                })}
              >
                <PaginationNext aria-disabled={currentPage === totalPages} />
              </Link>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductPagination;
