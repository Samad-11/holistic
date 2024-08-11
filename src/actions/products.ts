"use server"

import prisma from "@/lib/prisma"



export async function fetchProductsHome() {
    try {
        const products = await prisma.product.findMany({
            take: 8,
            include: {
                category: true,
                variant: true
            },
            orderBy: {
                salesCount: "desc"
            }
        });
        return products;
    } catch (error) {
        console.log('====================================');
        console.log("Error", error);
        console.log('====================================');
    }
}

export async function fetchProductsSlug() {
    try {
        const products = await prisma.product.findMany({
            select: {
                slug: true
            }
        })

        return products
    } catch (error) {

    }
}

export async function fetchProductsShop(offset: number,
    maxProducts: number,
    query?: string,
    category?: string,
    price?: {
        max?: number, min?: number,
    },
    orderBy?: { field: string, direction: string },
    inStock?: boolean
) {
    try {
        const queryServer = query || undefined
        const offsetServer = offset ? offset : 0;
        const maxProductsServer = maxProducts ? maxProducts : 6;
        // const maxServer = price?.max ? price.max : undefined;
        // const minServer = price?.min ? price.min : undefined;
        const categoryServer = category !== "all" ? category : undefined;
        // const inStockServer = inStock === undefined ? true : inStock
        console.log('====================================');
        console.log("stock in server", inStock);
        console.log('====================================');
        console.log('====================================');
        console.log("offset", offset, "\nmaxproduct", maxProducts);
        console.log('====================================');

        const products = await prisma.product.findMany({
            where: {
                OR: query ? [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ] : undefined,
                category: {
                    slug: {
                        equals: categoryServer, mode: "insensitive"
                    }
                },
                variant: {
                    some: {
                        price: {
                            gte: price?.min,
                            lte: price?.max,
                        },
                        inStock
                    }
                },
            },
            take: ((offset + 1) * maxProducts),
            include: {
                category: true,
                variant: {
                    where: {
                        price: {
                            gte: price?.min,
                            lte: price?.max,
                        },
                        inStock
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        const productCount = await prisma.product.count({
            where: {
                OR: query ? [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ] : undefined,
                category: {
                    name: {
                        equals: categoryServer, mode: "insensitive"
                    }
                },
                variant: {
                    every: {
                        price: {
                            gte: price?.min,
                            lte: price?.max,
                        },
                        inStock
                    }
                }
            },
        });

        console.log('====================================');
        console.log("products", productCount);
        console.log('====================================');
        return { products, productCount };
    } catch (error) {

    }
}


export async function getSingleProduct(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug
            },
            include: {
                category: true,
                variant: true
            }
        })

        return product
    } catch (error) {

    }
}