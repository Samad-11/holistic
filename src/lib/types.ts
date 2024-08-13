import { Category, Product, Variant } from "@prisma/client"

export interface IProduct {
    product: Product & {
        variant: Variant[]
    } & {
        category: Category
    }
}


export interface IProducts {
    products: (Product & { variant: Variant[] } & { category: Category })[]
}


export interface Product2 {
    id: string;
    slug: string;
    name: string;
    description: string;
    brand: string,
    type: string,
    salesCount: number,
    createdAt: Date;
    updatedAt: Date;
    variant: Variant2[];
    category: Category2;
}

export interface Variant2 {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
    images: string[];
    productId: string;
}

export interface Category2 {
    id: string;
    name: string;
}

export type IProducts2 = Product2[];
