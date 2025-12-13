
import axios from "axios";
import {category_URLS} from "@/api/categoryApi/categoryApiUrls.ts";
export const addNewCategoryFn = async (query: string) => {
    const {data}=await axios.post(`${category_URLS.addNewCategory}${query}`);
    return data;

};
export const deleteCategoryFn = async (query: number) => {
    const {data}=await axios.delete(`${category_URLS.deleteCategory}${query}`);
    return data;

};
export const updateCategoryFn = async (query: {id:number,updated:string}) => {
    const {data}=await axios.put(`${category_URLS.updateCategory}${query.id}/${query.updated}`);
    return data;

};
