import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Label} from "@/components/ui/label"
import {IoMdClose} from "react-icons/io";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {useState} from "react";

export default function ProductFilter() {
    const [filters, setFilters] = useState({
        categoryId: null,
        min: null,
        max: null,
        stock: null,
        search: null,
        sort: null
    });

    return (
        <div className={"absolute inset-0 flex justify-start bg-black/50"}>
            <div className={"md:w-[400px] max-w-full container flex overflow-y-scroll  flex-col p-6 bg-white "}>
                <div className={"my-4 text-2xl cursor-pointer"}>
                    <IoMdClose></IoMdClose>
                </div>
                <Accordion type="single" className={"flex flex-col gap-y-2"} collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>قیمت</AccordionTrigger>
                        <AccordionContent className={"py-3"}>
                            سلام
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger> گروه بندی</AccordionTrigger>
                        <AccordionContent className={"py-3"}>
                            سلام
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>موجودی</AccordionTrigger>
                        <AccordionContent className={"py-3"}>
                            <div>
                                <RadioGroup className={"flex flex-col gap-y-6"} onValueChange={(e) => console.log(Boolean(e))} >
                                    <div className="flex *:cursor-pointer  flex-row-reverse  items-center gap-4">
                                        <RadioGroupItem value="true" id="r1"/>
                                        <Label htmlFor="r1">موجود</Label>
                                    </div>
                                    <div className="flex *:cursor-pointer flex-row-reverse  items-center gap-4">
                                        <RadioGroupItem value="false" id="r2"/>
                                        <Label htmlFor="r2">ناموجود</Label>
                                    </div>
                                    <div className="flex *:cursor-pointer flex-row-reverse  items-center gap-4">
                                        <RadioGroupItem value={"null"} id="r3"/>
                                        <Label htmlFor="r2">همه</Label>
                                    </div>

                                </RadioGroup>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>ترتیب</AccordionTrigger>
                        <AccordionContent className={"py-3"}>
                            <RadioGroup className={"flex flex-col gap-y-6"} onValueChange={(e) => console.log(Boolean(e))} >
                                <div className="flex *:cursor-pointer  flex-row-reverse  items-center gap-4">
                                    <RadioGroupItem value="desc" id="r1"/>
                                    <Label htmlFor="r1">بیشترین قیمت</Label>
                                </div>
                                <div className="flex *:cursor-pointer flex-row-reverse  items-center gap-4">
                                    <RadioGroupItem value="asc" id="r2"/>
                                    <Label htmlFor="r2">کمترین قیمت</Label>
                                </div>

                            </RadioGroup>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <button className={"bg-blue-500 mt-5 cursor-pointer text-white rounded-md py-2 px-6"}>اعمال فیلتر
                </button>

            </div>

        </div>
    )
}