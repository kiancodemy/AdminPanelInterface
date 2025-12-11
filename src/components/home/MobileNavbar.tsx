import {GiHamburgerMenu} from "react-icons/gi";
import {useState} from "react";
import {IoMdClose} from "react-icons/io";
import type {headerItemsType} from "@/types/HeaderItemsType.ts";
import {Link} from "react-router-dom";
import disableScroll from 'disable-scroll';
import {headerItems} from "@/data/HeaderData.ts";

export default function MobileNavbar() {
    const [open, setOpen] = useState(false);

    // handle navbar menu ///
    const handleNavbar = () => {
        if (!open) {
            setOpen(true);
            disableScroll.on();
            document.body.classList.add("no-scrollbar");

        } else {
            setOpen(false);
            disableScroll.off();
            document.body.classList.remove("no-scrollbar");
        }
    }


    return (
        <div className={"py-6 px-3 relative z-[1000] md:hidden"}>
            <p onClick={() => {
                setOpen(true);
            }}>
                <GiHamburgerMenu/>
            </p>
            {open && <div
                onClick={handleNavbar}
                className={"fixed z-100  inset-0 flex overflow-hidden  justify-start bg-black/70"}>
                <div className={"flex w-3/5 p-6 gap-y-4 flex-col bg-white"}>
                    <div><IoMdClose className={"w-5 h-5"}></IoMdClose></div>
                    <div className={" grow flex  flex-col gap-y-6 "}>
                        {headerItems.map((headerItem: headerItemsType) => (
                            <Link className={"py-3  border-b-1 border-b-gray-300  border-black"} key={headerItem.id}
                                  to={headerItem.link}>{headerItem.title}</Link>

                        ))}
                    </div>
                </div>
            </div>}
        </div>);
}