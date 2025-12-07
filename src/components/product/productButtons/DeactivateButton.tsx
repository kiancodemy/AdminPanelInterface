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
import {deactivateByIdFn} from "@/api/productApi/ProductMutation.ts";
import type {ProductDto, dataType} from "@/types/productQuery.ts";
import {toastHandler} from "@/service/ToastHandler.ts";
import {useLocation} from "react-router-dom";
export default function DeactivateButton({id}: { id: number }) {
    const queryClient = useQueryClient();
    const location=useLocation();
    const mutation = useMutation({

        mutationFn: (id: number) => deactivateByIdFn(id),
        onError: (error: Error) => {
            toastHandler({message: error.message, isSuccess: false});
        },
        onSuccess: (updatedItem) => {

            toastHandler({message: updatedItem.message, isSuccess: true});

            // update the cached query that matches the current query string
            queryClient.setQueryData(['products', location.search], (oldData: dataType) => {
                if (!oldData) return oldData;
                console.log(updatedItem);

                const updatedContent = oldData.data.content.map((item: ProductDto) =>
                    item.id === updatedItem.data.id ? updatedItem.data : item
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
    const handleDeactive = () => {
       mutation.mutate(id);
    };
    return (
        <Dialog>

                <DialogTrigger
                    className={"rounded-md py-2 px-8  bg-blue-500 text-white cursor-pointer hover:bg-blue-600 duration-300 hover:text-white"}
                    asChild>
                    <Button  variant="outline">غیر فعال کردن</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] ">
                    <DialogHeader>
                        <DialogTitle className={"text-right text-sm md:text-base mt-4 "}>آیا از پاک کردن اطمینان
                            دارید؟</DialogTitle>

                    </DialogHeader>

                    <DialogFooter className={"*:cursor-pointer"}>
                        <DialogClose asChild>
                            <Button variant="outline">خیر</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={handleDeactive} type="submit">بله</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>

        </Dialog>
    )
}
