import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowResults(true);
  };

  const handleSearchProduct = async () => {
    console.log("searchTerm", searchTerm);
    // navigate(`/search?keyword=${searchTerm}`)
    const page = 1;
    const size = 12;
    const keyword = searchTerm;
    navigate(`/search/${keyword}/page/${page}/size/${size}`);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearchProduct();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="flex h-[40px] justify-between rounded-md bg-white shadow shadow-black/20">
          <input
            type="text"
            className="flex text-3xl flex-1 py-2 px-3
             focus:outline-black focus:outline-offset-4 "
            placeholder="Tìm kiếm..."
            onClick={() => setShowResults(true)}
            onChange={handleInputChange}
          />
          <span
            className="m-1 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700"
            onClick={() => {
              handleSearchProduct();
            }}
          >
            <svg
              className="text-white"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z"
              />
            </svg>
          </span>
        </div>
      </form>
      {/* result */}
      {showResults && searchTerm && (
        <div className="absolute mt-2 w-full overflow-hidden rounded-md bg-white ">
          <div className="cursor-pointer h-14 py-2 px-3 hover:bg-slate-100">
            <p className="text-3xl font-sans text-gray-600">iphone 14</p>
          </div>
          <div className="cursor-pointer h-14 py-2 px-3 hover:bg-slate-100">
            <p className="text-3xl font-sans text-gray-600">
              iphone 15 pro max
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
