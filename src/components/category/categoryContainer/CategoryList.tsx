import AddPCategoryButton from "@/components/category/categoryButtons/AddCategoryButton.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

import {fetchAllCategories} from "@/api/categoryApi/CategoryService.ts";
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton.tsx";
import CategoryItem from "@/components/category/categoryContainer/CategoryItem.tsx";
import type {Category} from "@/types/CategoryType.ts";
export default function CategoryList() {


// get all categories fucntion (react query) //
    const {data, isLoading} = useQuery({
            queryKey: ["categories"],
            queryFn: () => fetchAllCategories(),
            retry: false,
            placeholderData: keepPreviousData,
            staleTime: 120 * 60 * 1000,
        }
    );

    return (
        <div className={"max-w-full overflow-y-auto container flex flex-col gap-y-4 mx-auto bg-gray-50 p-2  md:p-5"}>
            <div
                className={"flex px-3 border-b-2 bg-white justify-start gap-x-3 items-center cursor-pointer py-3 rounded-md"}>
                <div className={"flex flex-col-reverse md:flex-row gap-y-3 items-center gap-x-3"}>
                    <AddPCategoryButton/>
                </div>

            </div>
            {/*handle loading */}
            {isLoading && <ProductListSkeleton/>}


            {/*product container*/}
            {data && data.data.length > 0 ? (

                <div className={"flex min-h-screen gap-y-4 max-w-8/10 mx-auto container flex-col"}>
                    {data.data.map((item:Category) =>
                        <CategoryItem item={item}></CategoryItem>
                    )}

                </div>

            ) : <div className={"flex md:py-40 py-20 grow items-center justify-center"}><h1>محصولی موجود نیست</h1>
            </div>}

        </div>
    )
}