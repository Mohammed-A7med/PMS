import { useState, useEffect, useCallback } from "react";
import Styles from "./PageNavigator.module.css";

export default function PageNavigator({
  arrayOfPages,
  numOfRecords,
  setSearchParams,
  searchParams,
}: any) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = parseInt(searchParams.get("pageNumber") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      setSearchParams({
        title: searchParams.get("title") || "",
        pageNumber: newPage.toString(),
      });
    },
    [searchParams, setSearchParams]
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < arrayOfPages.length) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div
      className={`d-flex justify-content-end w-100 border-2 border-top bg-white p-3 rounded-bottom-4 shadow-sm`}
    >
      <div
        className={`row align-items-center justify-content-end ${Styles.PaginationContainer}`}
      >
        <div className="col-12 col-md-6 d-flex justify-content-around justify-content-md-end align-items-center py-2">
          <div className="item ms-md-3 text-center text-md-start">
            <span className="mx-2">Showing</span>
            <select
              className="rounded-3 px-1"
              value={currentPage}
              onChange={(e) => {
                const newPage = parseInt(e.target.value, 10);
                handlePageChange(newPage);
              }}
            >
              {arrayOfPages.map((page: any) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <span className="mx-2 mx-md-1">of {numOfRecords} Results</span>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end align-items-center py-2">
          <span className="mx-3">
            Page {currentPage} of {arrayOfPages.length}
          </span>
          <button className="border-0 bg-transparent">
            <i
              onClick={handlePrevious}
              className="fa-solid fa-angle-left mx-2"
              style={{
                cursor: currentPage > 1 ? "pointer" : "not-allowed",
                opacity: currentPage > 1 ? 1 : 0.5,
              }}
            ></i>
          </button>
          <button className="border-0 bg-transparent">
            <i
              onClick={handleNext}
              className="fa-solid fa-angle-right mx-2"
              style={{
                cursor:
                  currentPage < arrayOfPages.length ? "pointer" : "not-allowed",
                opacity: currentPage < arrayOfPages.length ? 1 : 0.5,
              }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
