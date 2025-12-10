import type {PageInfoType} from "@/types/productQuery.ts";
import ReactPaginate from "react-paginate";
import {useSearchParams} from "react-router-dom";
export default function PaginationComponent({PageInfo}: { PageInfo: PageInfoType }) {


    // Invoke when user click to request another page.
    const [, setSearchParams] = useSearchParams();
    const handlePageClick = (even:never) => {

        setSearchParams(prev => ({...prev,"page":even.selected}));

    };
    return (
        <>
            <ReactPaginate
                pageClassName="rounded-md"
                pageLinkClassName="bg-gray-100 rounded-md flex justify-center items-center p-1 md:p-3"


                activeLinkClassName="bg-gray-900 text-white"


                previousLinkClassName="bg-gray-200 rounded-md flex justify-center items-center p-1 md:p-3"


                nextLinkClassName="bg-gray-200 rounded-md flex justify-center items-center p-1 md:p-3"

                className="flex items-center gap-x-3 mb-8 text-sm p-4 md:px-8 rounded-md cursor-pointer bg-white self-center flex-row-reverse"
                breakLabel="..."
                nextLabel=" بعدی"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                forcePage={PageInfo.page}

                pageCount={PageInfo.totalPages}
                previousLabel="قبلی"
                renderOnZeroPageCount={null}
            />
        </>
    );
}