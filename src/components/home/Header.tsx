import {headerItems} from "@/data/HeaderData.ts";
import type {headerItemsType} from "@/types/HeaderItemsType.ts";
import SearchInput from "@/components/search/SearchInput.tsx";
import MobileNavbar from "@/components/home/MobileNavbar.tsx";
import {Link} from "react-router-dom";

export default function Header() {

    return (
        <div
            className={"max-w-full sticky top-0 bg-white items-center container  md:gap-x-10 mx-auto flex justify-start md:justify-start"}>
            <div className={"md:flex hidden gap-x-8 px-6"}>
                {headerItems.map((headerItem: headerItemsType) => {
                    return <Link
                        className={"border-b-4 py-8 border-white p-2 cursor-pointer  hover:border-blue-500  capitalize "}
                        key={headerItem.id} to={headerItem.link}>{headerItem.title}</Link>
                })}
            </div>


            <MobileNavbar/>
            <SearchInput></SearchInput>

        </div>
    )
}