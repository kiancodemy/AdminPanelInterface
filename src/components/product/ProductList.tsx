import {useState, lazy, Suspense} from "react";
import {useLocation} from "react-router-dom";
import FilterProductButton from "@/components/product/FilterProductButton.tsx";
import {keepPreviousData, useQuery} from '@tanstack/react-query'
import {fetchAllProducts} from "@/api/productApi/ProductService.ts";
import ProductFilterSkeleton from "@/components/skeletons/ProductFilterSkeleton.tsx";
import type {dataType} from "@/types/productQuery.ts";
import PageAndTotalNumber from "@/components/product/PageAndTotalNumber.tsx";
import ProductItem from "@/components/product/ProductItem.tsx";
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton.tsx";

const ProductFilter = lazy(() => import("./ProductFilter.tsx"));
export default function ProductList() {

    ///open and close filter products navbar//
    const [open, setOpen] = useState<boolean>(false);
    const location = useLocation();
    const query = location.search;

    /// getAllProducts functions///
    const {data, isLoading} = useQuery<dataType>({
        queryKey: ['products', query],
        queryFn: () => fetchAllProducts(query),
        placeholderData: keepPreviousData,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });


    return (
        <div className={"max-w-full container flex flex-col gap-y-12 mx-auto bg-gray-50 p-2  md:p-5"}>


            {/* filter header */}
            <div
                className={"flex px-3 border-b-2 bg-white justify-between gap-x-3 items-center cursor-pointer py-6 rounded-md"}>
                <FilterProductButton setOpen={setOpen}></FilterProductButton>
                {data && <PageAndTotalNumber
                    pageInfo={{
                        totalElements: data.data.totalElements,
                        totalPages: data.data.totalPages,
                        page: data.data.totalElements > 0 ? data.data.page : -1
                    }}/>}

            </div>
            {/*handle loading */}
            {isLoading && <ProductListSkeleton/>}


            {/*product container*/}
            {data && data.data.content.length > 0 ? (

                <div className={"grid  grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-3"}>
                    {data?.data.content.map(item =>
                        <ProductItem key={item.id} item={item}></ProductItem>
                    )}

                </div>

            ) : <div className={"flex md:py-40 py-20 grow items-center justify-center"}><h1>محصولی موجود نیست</h1>
            </div>}

            {/* filter products navbar */}
            {open && <Suspense fallback={<ProductFilterSkeleton/>}>
                <ProductFilter setOpen={setOpen}/>
            </Suspense>}

        </div>
    )
}