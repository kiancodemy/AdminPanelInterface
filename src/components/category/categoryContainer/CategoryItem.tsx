import type {Category} from "@/types/CategoryType.ts";
import DeleteCategoryButton from "@/components/category/categoryButtons/DeleteCategoryButton.tsx";
import UpdateCategoryButton from "@/components/category/categoryButtons/UpdateCategoryButton.tsx";
export default function CategoryItem({item}: { item: Category }) {
    return (
        <div className={"grid grid-cols-1 text-sm md:grid-cols-4  lg:grid-cols-5  md:gap-2 gap-y-6 items-center p-4 rounded-md bg-gray-200"} key={item.id}>
            <div className={"flex py-2 px-4 rounded-md bg-yellow-400 gap text-white "}>
                <h1>کد : </h1>
                <h1>{item.id}</h1>
            </div>
            <div className={"flex py-2 px-4  rounded-md bg-blue-400 gap text-white "}>
                <h1>نام: </h1>
                <span className={"break-all whitespace-normal"}>{item.name}</span>
            </div>
            <DeleteCategoryButton item={item} />
            <UpdateCategoryButton item={item} />
            <div
                className={"py-2 flex justify-center  items-center gap-x-2 px-2 lg:px-6  rounded-md bg-orange-600 gap text-white "}>
                <h1>تعداد محصولات</h1>
                <h1>{item.productCount||0}</h1>
            </div>


        </div>
    )
}