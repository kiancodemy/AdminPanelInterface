import type {CategoryType} from "@/types/CategoryType.ts";
import axios from "axios";
import {category_URLS} from "@/api/categoryApi/categoryApiUrls.ts";
export const fetchAllCategories = async () => {
    const {data}=await axios.get<CategoryType>(category_URLS.findAllCategory);
    return data;

};
