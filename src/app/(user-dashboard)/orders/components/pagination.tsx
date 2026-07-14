import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const OrderPagination = (props: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  query: { [key: string]: string | number };
}) => {
  const { totalPages, currentPage, setCurrentPage } = props;
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const items = [];

    // Always show first page
    items.push(
      <PaginationItem key={1} onClick={() => setCurrentPage(1)}>
        <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
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
        <PaginationItem key={i} onClick={() => setCurrentPage(i)}>
          <PaginationLink isActive={currentPage === i}>{i}</PaginationLink>
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
        <PaginationItem
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          <PaginationLink isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
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
            <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>
              <PaginationPrevious aria-disabled={currentPage === 1} />
            </PaginationItem>
          )}
          {renderPageNumbers()}
          {currentPage < totalPages && (
            <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>
              <PaginationNext aria-disabled={currentPage === totalPages} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OrderPagination;
