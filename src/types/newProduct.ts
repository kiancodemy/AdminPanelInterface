export type AddProductRequest = {
    name: string
    description: string | null
    price: number
    stock: number
    isActive: boolean
    categoryId: number
}