import type {toastHandlerType} from "@/types/general.ts";
import {Flip, toast} from "react-toastify";


export const toastHandler = (input: toastHandlerType) => {
    if (input.isSuccess) {
        toast.success(input.message, {
            autoClose: 2000,
            theme: "light",
            transition:Flip,
            hideProgressBar: true,
            closeButton: false



        });
    } else {
        toast.error(input.message, {
            autoClose: 2000,
            theme: "light",
            transition:Flip,
            hideProgressBar: true,
            closeButton: false

        });
    }


}