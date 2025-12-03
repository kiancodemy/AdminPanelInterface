import {BsFilterLeft} from "react-icons/bs";
import disableScroll from 'disable-scroll';
export default function FilterProductButton({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <div
            onClick={()=>{setOpen(true);disableScroll.on()}}
            className={"flex items-center justify-center gap-x-3 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md "}>
            <h1 className={"text-sm md:text-base"}>فیلتر و دسته بندی</h1>
            <div className={"text-xl md:text-3xl "}><BsFilterLeft/></div>
        </div>


    )
}