import {Button} from "@/components/ui/button"
import type {Category, CategoryType} from "@/types/CategoryType.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCategoryFn} from "@/api/categoryApi/CategoryMutation.ts";
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
import {GrUpdate} from "react-icons/gr";

export default function UpdateCategoryButton({item}: { item: Category }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    // redact  hook form config //
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<{ name: string }>({defaultValues: {name: item.name}})

    /// add new product mutation (react query)
    const mutation = useMutation({

        mutationFn: (query: { id: number, updated: string }) => updateCategoryFn(query),
        onError: (error: Error) => {
            toastHandler({message: error.message, isSuccess: false});
        },
        onSuccess: (updatedItem, variable) => {
            toastHandler({message: updatedItem.message, isSuccess: true});

            // update the cached query that matches the current query string
            queryClient.setQueryData(['categories'], (oldData: CategoryType) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    data: oldData.data.map(item =>
                        item.id === variable.id
                            ? {...item, name: variable.updated}
                            : item
                    ),

                };
            });
            setOpen(false)
            reset();
        }
    });


    /// add new product button ////
    const onSubmit = (data: { name: string }) => {
        mutation.mutate({id: item.id, updated: data.name})
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div
                    className={"py-2 flex items-center gap-x-2 justify-center px-2 lg:px-6 cursor-pointer rounded-md bg-green-600 gap text-white "}>
                    <h1>به روز رسانی</h1>
                    <GrUpdate></GrUpdate>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>به روز رسانی</DialogTitle>
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
                            به روز رسانی
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
