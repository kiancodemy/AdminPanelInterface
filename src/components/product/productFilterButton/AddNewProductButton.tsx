
import { BsDatabaseAdd } from "react-icons/bs";
import {Link} from "react-router-dom";
export default function AddNewProductButton() {
    return (
        <Link
            to="/products/newProduct"

            className={"flex items-center justify-center gap-x-3 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md "}>
            <h1 className={"text-sm md:text-base"}>اضافه کردن محصول</h1>
            <div className={"text-xl md:text-2xl "}><BsDatabaseAdd/></div>
        </Link>
    )
}