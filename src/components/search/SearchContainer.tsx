import type {SearchContainerProps} from "@/types/productQuery.ts";

export default function SearchContainer({ isError, error, isLoading, data}: SearchContainerProps) {
    return (
        <div className={"absolute flex flex-col top-full bg-white mt-[5px] rounded-md p-3 inset-x-0  z-[100] min-h-40"}>
            {isLoading && <div>Loading...</div>}
            {isError && <div className="text-red-500">{String(error)}</div>}


        </div>
    )
}