import { useNavigate, useParams } from "react-router-dom";
import {
    useGetListProductsPageByShopSearchSortMutation
} from "../../features/common/products/services/productPageApi.ts";
import React, { useEffect, useState } from "react";

interface searchParamsRequest {
    search: string;
    page: number;
    size: number;
    sort: string;
}

const SearchProducts = () => {
    const { keyword, page, size } = useParams(); // Use useParams to get parameters directly
    const [searchParams, setSearchParams] = useState<searchParamsRequest>({
        search: keyword,
        page: Number(page), // Convert to number
        size: Number(size), // Convert to number
        sort: "newest",
    });

    const [callApiSearch] = useGetListProductsPageByShopSearchSortMutation();
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await callApiSearch(searchParams).unwrap();
            console.log("response", response);
        } catch (err) {
            console.log("err", err);
        }
    };

    useEffect(() => {
        setSearchParams({
            ...searchParams,
            search: keyword,
        });
        handleSearch();
    }, [keyword, page, size]); // Add dependencies to useEffect

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchParams({
            ...searchParams,
            search: event.target.value,
        });
    };

    const handleSearchProduct = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search/${searchParams.search}/page/${searchParams.page}/size/${searchParams.size}`);
    };

    return (
        <>
            <div>
                <form onSubmit={handleSearchProduct}>
                    <div className="flex h-[40px] justify-between rounded-md bg-white shadow shadow-black/20">
                        <input
                            type="text"
                            className="flex text-3xl flex-1 py-2 px-3 focus:outline-black focus:outline-offset-4 "
                            placeholder="Tìm kiếm..."
                            value={searchParams.search} // Add value attribute
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit" // Change from span to button
                            className="m-1 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700"
                        >
                            <svg className="text-white" width="32" height="32" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            <div>SearchProducts 32</div>
        </>
    );
};

export default SearchProducts;
