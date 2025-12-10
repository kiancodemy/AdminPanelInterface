import {Button} from "@/components/ui/button"
import {fetchAllCategories} from "@/api/categoryApi/CategoryService.ts";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type {Category} from "@/types/CategoryType.ts";
import NewProductFormSkeleton from "@/components/skeletons/NewProductFormSkeleton.tsx";
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
import {useLocation} from "react-router-dom";
import {useForm, Controller} from "react-hook-form"
import {Label} from "@/components/ui/label"
import type {AddProductRequest} from "@/types/newProduct.ts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {toastHandler} from "@/service/ToastHandler.ts";
import type {dataType} from "@/types/productQuery.ts";
import {addNewFn} from "@/api/productApi/ProductMutation.ts";

export default function AddProductButton() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const location = useLocation();
    // get all categories
    const {data, refetch, isError} = useQuery({
            queryKey: ["categories"],
            queryFn: () => fetchAllCategories(),
            retry: false,
            staleTime: 120 * 60 * 1000,
            enabled: false
        }
    );
    const mutation = useMutation({

        mutationFn: (query: AddProductRequest) => addNewFn(query),
        onError: (error: Error) => {
            toastHandler({message: error.message, isSuccess: false});
        },
        onSuccess: (updatedItem) => {
            toastHandler({message: updatedItem.message, isSuccess: true});

            // update the cached query that matches the current query string
            queryClient.setQueryData(['products', location.search], (oldData: dataType) => {
                if (!oldData) return oldData;


                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        content: [...oldData.data.content, updatedItem.data], // create new array
                    },
                };
            });
            setOpen(false)
            reset();
        }
    });


    const {
        control,
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
            categoryId: null
        }
    })

    const onSubmit = (data: AddProductRequest) => {
        mutation.mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => refetch()}
                    className="flex items-center py-3 md:py-5 px-5 md:px-6 gap-x-3 bg-blue-500 hover:bg-blue-700 text-white">
                    اضافه کردن محصول
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ایجاد محصول</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {data && !isError ? (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">


                    <div
                        className="grid max-h-[55vh] md:max-h-[70vh] overflow-y-auto p-4  gap-3 text-sm min-h-1 md:gap-4 ">

                        <div className="flex flex-col gap-y-2">
                            <p className="text-red-500 min-h-1">{errors.categoryId?.message}</p>
                            <Controller name="categoryId"
                                        control={control}
                                        rules={{required: {value: true, message: "دسته بندی را انتخاب کنید"}}}
                                        render={({field}) => (
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                value={field.value !== null && field.value !== undefined ? field.value.toString() : undefined}
                                            >
                                                <SelectTrigger className="w-full flex flex-row-reverse ">
                                                    <SelectValue placeholder="دسته بندی"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {data?.data?.map((item: Category) => (
                                                        <SelectItem key={item.id} value={item.id.toString()}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}>

                            </Controller>
                        </div>
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
                            <Label>توضیحات</Label>
                            <textarea
                                {...register("description")}
                                className="bg-gray-100 rounded-md p-2"
                                placeholder="اختیاری"
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
                </form>) : (<NewProductFormSkeleton></NewProductFormSkeleton>)}

            </DialogContent>
        </Dialog>
    )
}
