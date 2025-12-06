import type {ProductDto} from "@/types/productQuery.ts";
import {Link} from "react-router";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import DeactivateDialog from "@/components/dialog/DeactivateDialog.tsx";
import DeleteDialog from "@/components/dialog/DeleteDialog.tsx";

export default function ProductItem({item}: { item: ProductDto }) {


    return (
        <div
            key={item.id}
            className={"flex shadow-xl text-sm md:text-base justify-center items-center flex-col gap-y-4 p-4 bg-white rounded-md"}>
            {item.images?.length > 0 ? (
                <img className={"h-40 md:w-4/5 w-full  rounded-md overflow-hidden md:h-50 object-fill"}
                     src={`${BASE_URL}${item.images[0].downloadedUrl}`}
                     alt={`${item.images[0].id}`}/>
            ) : (<div
                className={"h-40 border-3 border-gray-300 w-full rounded-md md:h-50 flex items-center justify-center"}>عکس
                موجود نیست</div>)}
            <div className={"flex flex-col items-center  gap-y-5 "}>
                <h1>{item.name}</h1>
                <div className={"flex flex-col gap-y-4"}>
                    <div className={"flex gap-x-2"}>
                        <h1>{item.price?.toLocaleString()}</h1>
                        <h1>تومان</h1>
                    </div>
                    <div
                        className={`text-center ${item.stock > 0 ? "text-green-500" : "text-red-500"}`}>{item.stock > 0 ?
                        <h1>موجود</h1> : <h1>ناموجود</h1>}</div>
                </div>
                <div className={"flex flex-col gap-y-3 text-sm md:text-base text-center"}>
                    <div>
                        <p className={`text-white py-2 px-8 rounded-md  cursor-pointer
                     ${item.isActive ? "bg-green-400" : "bg-gray-500"}
                      `}>{item.isActive ? "فعال" : "غیر فعال"}
                        </p>

                    </div>

                    <Link className={`text-white py-2 px-8 rounded-md  cursor-pointer
                        bg-yellow-400 "}`} to={{pathname: `productDetail/${item.id}`}}>به روز رسانی
                    </Link>


                    <DeactivateDialog id={item.id}></DeactivateDialog>
                    <DeleteDialog id={item.id}></DeleteDialog>
                </div>


            </div>


        </div>
    )
}