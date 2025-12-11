export type ProductQuery = {
    min: number,
    max: number,
    stock: string,
    sort: string,
    categoryId: number | null
}

// src/types/product.ts

// Image DTO
export interface ImageDto {
    id: number;      // optional if your backend sometimes doesn't send it
    downloadedUrl: string;
    // add other fields from ImageDto as needed
}

// Category DTO
export interface CategoryDto {
    id?: number;
    name?: string;
    // add other fields from CategoryDto as needed
}

// AllProduct DTO
export interface ProductDto {
    id: number;
    price: number;
    isActive:boolean;
    name: string;
    images: ImageDto[];
    stock: number;
    category: CategoryDto;
}

// ProductPage DTO
export interface ProductPageDto {
    content: ProductDto[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface dataType {
    message: string;

    data: ProductPageDto;
}

export interface PageInfoType {
    totalElements: number;
    page: number;
    totalPages: number;
    size: number
}

export interface SearchContainerProps {

    isError: boolean;
    error: unknown;        // or Error if you prefer
    isLoading: boolean;
    data?: dataType;
}