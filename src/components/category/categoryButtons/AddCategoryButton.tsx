import {Button} from "@/components/ui/button"
import type {CategoryType} from "@/types/CategoryType.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addNewCategoryFn} from "@/api/categoryApi/CategoryMutation.ts";
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
import {toastHandler} from "@/service/ToastHandler.ts";
export default function AddPCategoryButton() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    // redact  hook form config //
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<{ name: string }>({})

    /// add new product mutation (react query)
    const mutation = useMutation({

        mutationFn: (query: { name: string }) => addNewCategoryFn(query.name),
        onError: (error: Error) => {
            toastHandler({message: error.message, isSuccess: false});
        },
        onSuccess: (updatedItem) => {
            toastHandler({message: updatedItem.message, isSuccess: true});

            // update the cached query that matches the current query string
            queryClient.setQueryData(['categories'], (oldData: CategoryType) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    data: [...oldData.data, updatedItem.data]

                };
            });
            setOpen(false)
            reset();
        }
    });


    /// add new product button ////
    const onSubmit = (data: { name: string }) => {
        mutation.mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center py-3 md:py-5 px-5 md:px-6 gap-x-3 bg-blue-500 hover:bg-blue-700 text-white">
                    اضافه کردن دسته
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ایجاد دسته</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">


                    <div
                        className="grid max-h-[55vh] md:max-h-[70vh] overflow-y-auto p-4  gap-3 text-sm min-h-1 md:gap-4 ">


                        <div className="grid gap-2">
                            <Label>نام دسته</Label>
                            <input
                                {...register("name", {required: {value: true, message: "نام دسته را وارد کنید"}})}
                                className="bg-gray-100 rounded-md p-2"
                                type="text"

                            />
                            <p className="text-red-500 min-h-1 ">{errors.name?.message}</p>
                        </div>


                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className={"cursor-pointer"} variant="outline">انصراف</Button>
                        </DialogClose>

                        <Button className={"cursor-pointer"} type="submit">
                            ایجاد دسته
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
