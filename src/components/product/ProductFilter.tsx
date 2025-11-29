import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Label} from "@/components/ui/label";
import {IoMdClose} from "react-icons/io";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Slider} from "@/components/ui/slider";
import {useState} from "react";
import type {ProductQuery} from "@/types/productQuery.ts";
import {useSearchParams} from "react-router-dom";
type filterType={
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ProductFilter({setOpen}:filterType) {
    const [priceRange, setPriceRange] = useState<number[]>([0, 50_000_000]);
    const [stock, setStock] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [categoryId,] = useState<number | null>(null);
    const [, setSearchParams] = useSearchParams();


    const handleSubmit = () => {

        const newFilter: ProductQuery = {
            min: priceRange[0],
            max: priceRange[1],
            stock: stock,
            sort: sort,
            categoryId: categoryId,
        };

        const queryParams: Record<string, string> = {};

        for (const [key, value] of Object.entries(newFilter)) {
            if (value !== null && value !== "") {
                queryParams[key] = value.toString();
            }
        }
        setSearchParams(queryParams);
        setOpen(false)
    };



    return (
        <div className="absolute inset-0 flex justify-start bg-black/50">
            <div className="md:w-[400px] max-w-full container flex overflow-y-scroll flex-col p-6 bg-white">
                <div onClick={()=>setOpen(false)} className="my-1 md:my-4 text-2xl cursor-pointer">
                    <IoMdClose/>
                </div>

                <Accordion type="single" className="flex flex-col gap-y-2" collapsible>
                    {/* Price Filter */}
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-yekanBold text-base">قیمت</AccordionTrigger>
                        <AccordionContent className="py-3 flex flex-col gap-y-6">
                            <div className="flex justify-between items-center">
                                <Label>{priceRange[1].toLocaleString()}</Label>
                                <Label>{priceRange[0].toLocaleString()}</Label>
                            </div>
                            <Slider
                                className="cursor-pointer"
                                defaultValue={[0, 50_000_000]}
                                max={50_000_000}
                                min={0}
                                value={priceRange}
                                onValueChange={(value) => setPriceRange(value)}
                                step={100_000}
                            />
                            <div className="flex justify-between items-center">
                                <Label>بیشترین قیمت</Label>
                                <Label>کمترین قیمت</Label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Category Filter */}
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-yekanBold text-base">دسته‌بندی</AccordionTrigger>
                        <AccordionContent className="py-3">سلام</AccordionContent>
                    </AccordionItem>

                    {/* Stock Filter */}
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-yekanBold text-base">موجودی</AccordionTrigger>
                        <AccordionContent className="py-3">
                            <RadioGroup
                                value={stock}
                                className="flex flex-col gap-y-6"
                                onValueChange={setStock}
                            >
                                <div
                                    className="flex *:cursor-pointer cursor-pointer flex-row-reverse items-center gap-4">
                                    <RadioGroupItem value="available" id="r1"/>
                                    <Label htmlFor="r1">موجود</Label>
                                </div>
                                <div
                                    className="flex *:cursor-pointer cursor-pointer flex-row-reverse items-center gap-4">
                                    <RadioGroupItem value="notavailable" id="r2"/>
                                    <Label htmlFor="r2">ناموجود</Label>
                                </div>
                                <div
                                    className="flex *:cursor-pointer cursor-pointer flex-row-reverse items-center gap-4">
                                    <RadioGroupItem value="all" id="r3"/>
                                    <Label htmlFor="r3">همه</Label>
                                </div>
                            </RadioGroup>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Sort Filter */}
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-yekanBold text-base">مرتب‌سازی</AccordionTrigger>
                        <AccordionContent className="py-3">
                            <RadioGroup
                                value={sort}
                                onValueChange={setSort}
                                className="flex flex-col gap-y-6"
                            >
                                <div
                                    className="flex  *:cursor-pointer cursor-pointer flex-row-reverse items-center gap-4">
                                    <RadioGroupItem value="desc" id="a1"/>
                                    <Label htmlFor="a1">بیشترین قیمت</Label>
                                </div>
                                <div
                                    className="flex  *:cursor-pointer cursor-pointer flex-row-reverse items-center gap-4">
                                    <RadioGroupItem value="asc" id="a2"/>
                                    <Label htmlFor="a2">کمترین قیمت</Label>
                                </div>
                            </RadioGroup>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <button

                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 duration-300 mt-5 cursor-pointer text-white rounded-md py-2 px-6"
                >
                    اعمال فیلتر
                </button>
            </div>
        </div>
    );
}
