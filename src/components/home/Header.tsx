import {headerItems} from "@/data/HeaderData.ts";
import type {headerItemsType} from "@/types/HeaderItemsType.ts";
import MobileNavbar from "@/components/home/MobileNavbar.tsx";
import {Link} from "react-router-dom";
export default function Header() {
    return (
        <div className={"max-w-full bg-white items-center container mx-auto flex justify-start md:justify-center"}>
            <div className={"md:flex hidden gap-x-8 px-6"}>
                {headerItems.map((headerItem: headerItemsType) => {
                    return <Link className={"border-b-4 py-8 border-white p-2 cursor-pointer  hover:border-blue-500  capitalize "} key={headerItem.id} to={headerItem.link}>{headerItem.title}</Link>
                })}
            </div>
            <MobileNavbar/>

        </div>
    )
}