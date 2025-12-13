import {Button} from "@/components/ui/button.tsx"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {useMutation} from "@tanstack/react-query";
import {deleteCategoryFn} from "@/api/categoryApi/CategoryMutation.ts";
import {MdOutlineDeleteOutline} from "react-icons/md";
import {toastHandler} from "@/service/ToastHandler.ts";
import type {Category, CategoryType} from "@/types/CategoryType.ts";
import {useQueryClient} from "@tanstack/react-query";

export default function DeleteCategoryButton({item}: { item: Category }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({

        mutationFn: (id: number) => deleteCategoryFn(id),
        onError: (error: Error) => {
            toastHandler({message: error.message, isSuccess: false});

        },
        onSuccess: (data, id) => {
            toastHandler({message: data.message, isSuccess: true});
            queryClient.setQueryData(['categories'], (oldData: CategoryType) => {
                if (!oldData) return oldData;
                const updated = oldData.data.filter(item => item.id !== id)

                return {
                    ...oldData,
                    data: [...updated]

                };
            })}});


    /// delete button////
    const handleDelete = () => {
        mutation.mutate(item.id);
    }
    return (
        <Dialog>

            <DialogTrigger
                className={"py-2 px-8 rounded-md  bg-red-500 text-white cursor-pointer hover:bg-red-600 duration-300 hover:text-white"}
                asChild>
                <button disabled={Boolean(item.productCount)}
                        className={`py-2 justify-center  disabled:cursor-not-allowed  disabled:bg-gray-500  flex items-center gap-x-2 px-6 cursor-pointer rounded-md `}>
                    پاک کردن
                    <MdOutlineDeleteOutline className={"text-xl"}></MdOutlineDeleteOutline>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle className={"text-right text-sm mt-4 md:text-base"}>آیا از پاک کردن اطمینان
                        دارید؟</DialogTitle>

                </DialogHeader>

                <DialogFooter className={"*:cursor-pointer"}>
                    <DialogClose asChild>
                        <Button variant="outline">خیر</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={handleDelete} type="submit">بله</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
