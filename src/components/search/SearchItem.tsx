import type {ProductDto} from "@/types/productQuery.ts";
import {Link} from "react-router";

export default function SearchItem({item}: { item: ProductDto }) {
    return (
        <Link to={{pathname: `productDetail/${item.id}`}}
              className={"bg-gray-200 cursor-pointerc hover:text-white hover:bg-gray-600  justify-between flex flex-col text-sm font-yekan  gap-y-1 rounded-md p-2"}
              key={item.id}>


            <div className={"flex gap-x-2 items-center"}>
                <h1 className={"font-yekanBold"}>نام:</h1>
                <h1>{item.name}</h1>
            </div>

            <div className={"flex gap-x-2 "}>
                <h1 className={"font-yekanBold"}>کد :</h1>
                <h1>{item.id}</h1>
            </div>



        </Link>
    )
}