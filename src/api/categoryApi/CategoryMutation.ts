
import axios from "axios";
import {category_URLS} from "@/api/categoryApi/categoryApiUrls.ts";
export const addNewCategoryFn = async (query: string) => {
    const {data}=await axios.post(`${category_URLS.addNewCategory}${query}`);
    return data;

};
