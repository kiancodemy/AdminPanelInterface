import type {SearchContainerProps} from "@/types/productQuery.ts";
import type {ProductDto} from "@/types/productQuery.ts";
import LoadingSpinner from "@/components/skeletons/loading/LoadingSpinner.tsx";
import SearchItem from "@/components/search/SearchItem.tsx";
export default function SearchContainer({ isError, error, isLoading, data}: SearchContainerProps) {

    return (
        <div className={"absolute flex flex-col top-full bg-white mt-[5px] font-yekanBold text-sm rounded-md p-1  inset-x-0  z-[1000] min-h-60 max-h-90 overflow-y-auto"}>
            {isLoading &&<LoadingSpinner></LoadingSpinner>}
            {isError && <div className="m-auto text-red-500 ">{error?.response?.data?.message || "خطای داخلی!"}</div>}
            {data && data.data.content.length===0&&<div className={"m-auto"}>محصولی یافت نشد</div>}

            {data &&<div className={"gap-y-1 flex flex-col"}>{data?.data.content.map((item:ProductDto)=><SearchItem item={item}/>)}</div>}


        </div>
    )
}