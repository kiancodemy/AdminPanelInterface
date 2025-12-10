export type AddProductRequest = {
    name: string | null;
    description: string | null
    price: number
    stock: number
    isActive: boolean
    categoryId: number | null
}