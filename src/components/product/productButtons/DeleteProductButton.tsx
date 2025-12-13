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
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteByIdFn} from "@/api/productApi/ProductMutation.ts";
import type {ProductDto, dataType} from "@/types/productQuery.ts";
import {toastHandler} from "@/service/ToastHandler.ts";

import {useLocation} from "react-router-dom";
export default function DeleteProductButton({id}: { id: number }) {
    const queryClient = useQueryClient();
    const location=useLocation();
    const mutation = useMutation({

        mutationFn: (id: number) => deleteByIdFn(id),
        onError: (error: Error) => {
            toastHandler({message: error.message, isSuccess: false});

        },
        onSuccess: (data,variables:number) => {
            toastHandler({message: data.message, isSuccess: true});


            // update the cached query that matches the current query string
            queryClient.setQueryData(['products', location.search], (oldData: dataType) => {
                if (!oldData) return oldData;


                const updatedContent = oldData.data.content.filter((item: ProductDto) =>
                    item.id !== variables
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

    /// delete button////
    const handleDelete = () => {
        mutation.mutate(id);
    }
    return (
        <Dialog>

                <DialogTrigger
                    className={"py-2 px-8 rounded-md  bg-red-500 text-white cursor-pointer hover:bg-red-600 duration-300 hover:text-white"}
                    asChild>
                    <Button variant="outline">پاک کردن</Button>
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
