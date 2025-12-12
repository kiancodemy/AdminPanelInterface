import AddPCategoryButton from "@/components/category/categoryButtons/AddCategoryButton.tsx";
import {useQuery} from "@tanstack/react-query";

import {fetchAllCategories} from "@/api/categoryApi/CategoryService.ts";

export default function CategoryList() {


// get all categories fucntion (react query) //
    const {data, isLoading,isError,error} = useQuery({
            queryKey: ["categories"],
            queryFn: () => fetchAllCategories(),
            retry: false,
            staleTime: 120 * 60 * 1000,
        }
    );

    return (
        <div className={"max-w-full overflow-y-auto container flex flex-col gap-y-4 mx-auto bg-gray-50 p-2  md:p-5"}>
            <div
                className={"flex px-3 border-b-2 bg-white justify-between gap-x-3 items-center cursor-pointer py-3 rounded-md"}>
                <div className={"flex flex-col-reverse md:flex-row gap-y-3 items-center gap-x-3"}>
                    <AddPCategoryButton/>

                </div>
            </div>
            {data&&<div>{data.data.length}</div>}

        </div>
    )
}