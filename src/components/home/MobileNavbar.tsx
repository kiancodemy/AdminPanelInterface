import {GiHamburgerMenu} from "react-icons/gi";
import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import type {headerItemsType} from "@/types/HeaderItemsType.ts";
import {Link} from "react-router-dom";
import {headerItems} from "@/data/HeaderData.ts";

export default function MobileNavbar() {
    const [open, setOpen] = useState(false);
    return (
        <div className={"py-6 px-3 md:hidden"}>
            <p onClick={() => setOpen(!open)}>
                <GiHamburgerMenu/>
            </p>

            {open && <div onClick={() => setOpen(!open)} className={"absolute   inset-0 flex  justify-start  bg-black/70"}>
                <div className={"flex p-6 gap-y-4 flex-col bg-white"}>
                    <div ><IoMdClose className={"w-5 h-5"}></IoMdClose></div>
                    <div className={" grow flex  flex-col gap-y-4 "}>
                        {headerItems.map((headerItem: headerItemsType) => (
                            <Link className={" py-2   border-black"} key={headerItem.id}
                                  to={headerItem.link}>{headerItem.title}</Link>

                        ))}
                    </div>
                </div>


            </div>}
        </div>
    );
}