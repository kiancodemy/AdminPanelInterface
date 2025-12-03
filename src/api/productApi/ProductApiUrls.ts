const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const PRODUCT_URLS = {
    findProductById: `${BASE_URL}/api/v1/product/findbyid/`,
    findAllProducts: `${BASE_URL}/api/v1/product/allProduct`,
};