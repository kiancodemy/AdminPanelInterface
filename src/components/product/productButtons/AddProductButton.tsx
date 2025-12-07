import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useState} from "react"
import {useForm} from "react-hook-form"
import {Label} from "@/components/ui/label"
import type {AddProductRequest} from "@/types/AddProductRequest"

export default function AddProductButton() {
    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<AddProductRequest>({
        defaultValues: {
            name: null,
            description: null,
            price: 0,
            stock: 0,
            isActive: true,
            categoryId: 1,
        }
    })

    const onSubmit = (data: AddProductRequest) => {
        console.log(data)
        setOpen(false)
        reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center py-3 md:py-5 px-5 md:px-6 gap-x-3 bg-blue-500 hover:bg-blue-700 text-white">
                    اضافه کردن محصول
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <DialogHeader>
                        <DialogTitle>ایجاد محصول</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <div
                        className="grid max-h-[55vh] md:max-h-[65vh] overflow-y-auto p-4  gap-3 text-sm min-h-1 md:gap-4 ">

                        <div className="grid gap-2">
                            <Label>نام محصول</Label>
                            <input
                                {...register("name", {required: {value: true, message: "نام محصول اجباری است"}})}
                                className="bg-gray-100 rounded-md p-2"
                                type="text"

                            />
                            <p className="text-red-500 min-h-1 ">{errors.name?.message}</p>
                        </div>


                        <div className="grid gap-2">
                            <Label>توضیحات</Label>
                            <textarea
                                {...register("description")}
                                className="bg-gray-100 rounded-md p-2"
                                placeholder="اختیاری"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>قیمت</Label>
                            <input
                                {...register("price", {
                                    required: {value: true, message: "قیمت الزامی است"}, validate: (value) =>
                                        !isNaN(Number(value)) || "فرمت قیمت صحیح نیست",
                                })}

                                className="bg-gray-100 rounded-md p-2"

                            />
                            <p className="text-red-500 min-h-1">{errors.price?.message}</p>
                        </div>

                        <div className="grid gap-2">
                            <Label>موجودی</Label>
                            <input

                                {...register("stock", {
                                    required: {value: true, message: "موجودی الزامی است"},

                                    validate: (value) =>
                                        !isNaN(Number(value)) || "فرمت موجودی صحیح نیست",

                                    setValueAs: (value) => Number(value)
                                })}
                                className="bg-gray-100 rounded-md p-2"

                            />
                            <p className="text-red-500 min-h-1">{errors.stock?.message}</p>
                        </div>

                        <div className="grid gap-2">
                            <Label>دسته‌بندی</Label>
                            <input
                                {...register("categoryId", {required: true, valueAsNumber: true})}
                                className="bg-gray-100 rounded-md p-2"
                                type="number"
                            />
                        </div>

                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className={"cursor-pointer"} variant="outline">انصراف</Button>
                        </DialogClose>

                        <Button className={"cursor-pointer"} type="submit">
                            ایجاد محصول
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
