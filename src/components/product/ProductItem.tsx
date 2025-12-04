import type {ProductDto} from "@/types/productQuery.ts";
import {Link} from "react-router";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function ProductItem({item}: { item: ProductDto }) {
    return (
        <div className={"flex text-sm md:text-base justify-center items-center flex-col gap-y-4 p-4 bg-white rounded-md"}>
            {item.images.length > 0 ? (
                <img className={"h-40 md:w-4/5 w-full  rounded-md overflow-hidden md:h-50 object-fill"} src={`${BASE_URL}${item.images[0].downloadedUrl}`}
                     alt={`${item.images[0].id}`}/>
            ) : (<div className={"h-40 border-3 border-gray-300 w-full rounded-md md:h-50 flex items-center justify-center"}>عکس موجود نیست</div>)}
            <div className={"flex flex-col gap-y-5  items-center"}>
                <h1>{item.name}</h1>
                <div className={"flex flex-col gap-y-4"}>
                    <div className={"flex gap-x-2"}>
                        <h1>{item.price.toLocaleString()}</h1>
                        <h1>تومان</h1>
                    </div>
                    <div
                        className={`text-center ${item.stock > 0 ? "text-green-500" : "text-red-500"}`}>{item.stock > 0 ?
                        <h1>موجود</h1> : <h1>ناموجود</h1>}</div>
                </div>
                <div>
                    <Link className={` text-white py-2 px-6 rounded-md  cursor-pointer ${item.stock === 0
                        ? "bg-gray-500 cursor-pointer"
                        : "bg-blue-500 cursor-pointer"}`} to={{pathname:`productDetail/${item.id}`}}>مشاهده جزییات</Link>

                </div>

            </div>


        </div>
    )
}