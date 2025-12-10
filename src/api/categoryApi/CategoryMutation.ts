
import axios from "axios";
import {PRODUCT_URLS} from "@/api/productApi/ProductApiUrls.ts";
export const deactivateByIdFn = async (query: number) => {
    const {data}=await axios.delete(`${PRODUCT_URLS.deactivateById}${query}`);
    return data;

};
export const deleteByIdFn = async (query: number) => {
    const {data}=await axios.delete(`${PRODUCT_URLS.deleteById}${query}`);
    return data;

};

