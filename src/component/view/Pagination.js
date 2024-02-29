import React, { useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  console.log("pagination page", productsPerPage, paginate);
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination_div">
      <div className="pagination">
        {pageNumbers.includes(currentPage - 1) && (
          <span className="page-item">
            {" "}
            <button
              className="page-button"
              onClick={() => {
                setCurrentPage(currentPage - 1);
                paginate(currentPage - 1);
              }}
            >
              {" "}
              Prev
            </button>
          </span>
        )}

        {pageNumbers.map((number) => (
          <span key={number} className="page-item">
            <Link
              onClick={() => {
                paginate(number);
                setCurrentPage(currentPage + 1);
              }}
              to="/"
              className="page-link"
            >
              {number}
            </Link>
          </span>
        ))}
        {pageNumbers.includes(currentPage + 1) && (
          <span className="page-item">
            {" "}
            <button
              className="page-button"
              onClick={() => {
                setCurrentPage(currentPage + 1);
                paginate(currentPage + 1);
              }}
            >
              {" "}
              Next
            </button>
          </span>
        )}
      </div>
      <br />
      <div className="totalData">Total Count:- {totalProducts}</div>
    </div>
  );
};

export default Pagination;
