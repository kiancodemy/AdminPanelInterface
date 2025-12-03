import type {PageInfoType} from "@/types/productQuery.ts";

export default function PageAndTotalNumber({pageInfo}: { pageInfo: PageInfoType }) {
    return (
        <div className={"flex flex-col md:text-base  md:flex-row gap-y-2 text-sm md:items-center gap-x-12 cursor-pointer"}>

            <div className={"flex justify-end gap-x-2  items-center"}>
                <h1>صفحه :</h1>
                <div className={"flex gap-x-1 items-center"}>
                    <h1>{pageInfo.totalPages}</h1>
                    <h1>/</h1>
                    <h1>{pageInfo.page + 1}</h1>
                </div>
            </div>

            <div className={"flex  gap-x-2 items-center"}>
                <h1>تعداد محصولات :</h1>
                <div className={"flex gap-x-1 items-center"}>
                    <h1>{pageInfo.totalElements}</h1>
                </div>
            </div>

        </div>
    )
}