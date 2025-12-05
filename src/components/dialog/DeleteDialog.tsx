import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteByIdFn} from "@/api/productApi/ProductMutation.ts";
import type {ProductDto, dataType} from "@/types/productQuery.ts";
import {useEffect} from "react";
import {toastHandler} from "@/service/ToastHandler.ts";
import {useLocation} from "react-router-dom";
export default function DeleteDialog({id}: { id: number }) {
    const queryClient = useQueryClient();
    const location=useLocation();
    const mutation = useMutation({
        mutationFn: (id: number) => deleteByIdFn(id),
        onSuccess: (updatedItem) => {
            // update the cached query that matches the current query string
            queryClient.setQueryData(['products', location.search], (oldData: dataType) => {
                if (!oldData) return oldData;
                console.log(updatedItem);

                const updatedContent = oldData.data.content.map((item: ProductDto) =>
                    item.id === updatedItem.data.id ? updatedItem : item
                );

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        content: updatedContent,
                    },
                };
            });
        },
    });

    ///handle error and success///
    useEffect(() => {
        if (mutation.isSuccess) {
            toastHandler({message: mutation.data.message, isSuccess: true})
        } else if (mutation.isError) {
            console.log(mutation.error)

        }
    }, [mutation])

    /// delete button////
    const handleDelete = () => {
        mutation.mutate(id);
    }
    return (
        <Dialog>
            <form>
                <DialogTrigger
                    className={"py-2 px-8 rounded-md bg-red-500 text-white cursor-pointer hover:bg-red-600 duration-300 hover:text-white"}
                    asChild>
                    <Button variant="outline">پاک کردن محصول</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] ">
                    <DialogHeader>
                        <DialogTitle className={"text-right mt-4 text-base"}>آیا از پاک کردن اطمینان
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
            </form>
        </Dialog>
    )
}
