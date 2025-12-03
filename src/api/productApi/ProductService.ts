import type {dataType} from "@/types/productQuery.ts";
import axios from "axios";
import {PRODUCT_URLS} from "@/api/productApi/ProductApiUrls.ts";
export const fetchAllProducts = async (query: string|null) => {
    const {data}=await axios.get<dataType>(`${PRODUCT_URLS.findAllProducts}${query}`);
    return data;

};
