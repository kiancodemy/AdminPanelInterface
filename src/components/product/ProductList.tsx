import {useState, lazy, Suspense,useEffect} from "react";
import {useLocation} from "react-router-dom";
import {BsFilterLeft} from "react-icons/bs";

import ProductFilterSkeleton from "@/components/skeletons/ProductFilterSkeleton.tsx";

export default function ProductList() {
    const ProductFilter = lazy(() => import("./ProductFilter.tsx"));
    const [open, setOpen] = useState<boolean>(false);
    const location = useLocation();

    ////fetching products///
    useEffect(()=>{

    },[location.search])

    return (
        <div className={"max-w-full container mx-auto bg-gray-50 p-2  md:p-5"}>
            {/*filtering button*/}
            <div onClick={() => setOpen(true)}
                 className={"flex justify-start cursor-pointer py-2"}>
                <div className={"flex items-center justify-center gap-x-3 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md "}>
                    <h1 className={"text-sm md:text-base"}>فیلتر و دسته بندی</h1>
                    <div className={"text-xl md:text-3xl "}><BsFilterLeft/></div>
                </div>
            </div>
            {/*product container*/}
            <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"}>



            </div>



            {open && <Suspense fallback={<ProductFilterSkeleton/>}>
                <ProductFilter setOpen={setOpen}/>
            </Suspense>}

        </div>
    )
}