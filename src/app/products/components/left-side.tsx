import React from "react";
import PriceFilterCopy from "./price-filter-copy";
import { Divide, Filter, X } from "lucide-react";
import Categories from "./categories";

const LeftSideContent = () => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpen = false;
  return (
    <>
      {/* Mobile Filter Button */}
      <button
        // onClick={() => setIsModalOpen(true)}
        className="md:hidden flex items-center gap-2 px-3 py-1 border border-primary/20 rounded hover:bg-primary/5 transition"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>

      {/* Desktop View */}
      <div className="hidden md:block space-y-6 border border-primary/20 rounded p-3">
        {/* Price Filter */}
        <PriceFilterCopy />
        <Divide className="h-[1px] w-full bg-primary/30" />
        {/* Categories */}
        <Categories />
      </div>

      {/* Mobile Modal */}
      {isModalOpen && (
        <div className="fixed h-full inset-0 z-50 bg-black/50 md:hidden">
          <div className="fixed h-full top-0 left-0 right-0 bg-white rounded-t-lg p-4 max-h-[99vh] overflow-y-auto">
            {/* Close Button */}
            <button
            //   onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-primary/10 rounded transition"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6 pt-8">
              {/* Price Filter */}
              <PriceFilterCopy />
              <Divide className="h-[1px] w-full bg-primary/30" />
              {/* Categories */}
              <Categories />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftSideContent;
