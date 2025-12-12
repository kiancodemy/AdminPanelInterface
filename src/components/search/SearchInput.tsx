import {useEffect, useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import type {dataType} from "@/types/productQuery.ts";
import {fetchAllProducts} from "@/api/productApi/ProductService.ts";
import SearchContainer from "@/components/search/SearchContainer.tsx";

export default function SearchInput() {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string | null>(null);
    const {data, isLoading,refetch,isError,error} = useQuery<dataType>({
        queryKey: ['products', search],
        queryFn: () => fetchAllProducts(search),
        placeholderData: keepPreviousData,
        retry: false,
        enabled: false,

    });
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search) {
                console.log("search", search);
                refetch();
            }

        }, 500)
        return () => clearTimeout(timer)

    }, [search, refetch]);

    return (
        <div>
            <div className={"relative flex flex-col"}>
                <input  onChange={(e)=>setSearch(`?search=${e.target.value}`)} onClick={() => setOpen(true)}
                       className={"w-[280px]  bg-white z-[100] placeholder:text-sm border-2 rounded-md border-gray-200 py-1 px-1 md:px-4 focus:outline-blue-500"}
                       type="text" placeholder={"جستجوی محصول"}/>
                {open&&<SearchContainer isError={isError} error={error}  isLoading={isLoading} data={data}></SearchContainer>}

            </div>
            {open && <div onClick={() => setOpen(false)} className={"fixed bg-black/50 inset-0 z-80"}></div>}
        </div>
    )
}