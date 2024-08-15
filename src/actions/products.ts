"use server"

import prisma from "@/lib/prisma"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { cache } from "react";
import slugify from "slugify";


const {
    AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME,
    AWS_BUCKET_REGION,
} = process.env

const s3 = new S3Client({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!
    },
    region: AWS_BUCKET_REGION
})




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
        console.log('error', error);

    }
}

export const totalproducts = cache(async () => {
    return await prisma.product.count({})
})


export const fetchProducts = async (offset?: number, take?: number, query?: string, inStock?: boolean, price?: { gte?: number, lte?: number }) => {
    try {
        const where: any = {}
        if (query) {
            where.OR = [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
            ]

            if (inStock !== undefined) {
                where.variant = { some: { inStock } }
            }

            if (price) {
                where.variant = { some: { price: { gte: price.gte, lte: price.lte } } }
            }

        } else if (inStock !== undefined) {
            where.variant = { some: { inStock } }
        } else if (price) {
            where.variant = { some: { price: { gte: price.gte, lte: price.lte } } }
        }

        const products = await prisma.product.findMany({
            where,
            skip: ((offset || 1) - 1) * (take || 10),
            take: take || 10,
            include: {
                category: true,
                variant: {
                    where: {
                        price,
                        inStock
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return products

    } catch (error) {
        console.log('====================================');
        console.log("Error", error);
        console.log('====================================');
    }


}


export async function addProduct(formdata: FormData) {
    try {
        const name = formdata.get("name") as string
        const slug = slugify(name, { lower: true, trim: true, replacement: "-" })
        const description = formdata.get("description") as string
        const categoryId = formdata.get("category") as string
        const type = formdata.get("type") as string
        const brand = formdata.get("brand") as string
        const noOfVariants = formdata.get("noOfVariants") as unknown as number
        let variantArray: { name: string, price: number, images: File[], key: string[] }[] = []
        const newProduct = await prisma.product.create({
            data: {
                brand, description, name, slug, type, categoryId
            }
        })

        const productId = newProduct.id
        for (let i = 1; i <= noOfVariants; i++) {
            const name = formdata.get(`variant-${i}-name`) as string
            const price = parseFloat(formdata.get(`variant-${i}-price`) as string)
            const noOfImages = formdata.get(`variant-${i}-noOfImages`) as unknown as number
            console.log(noOfImages);

            let images: File[] = []
            let key: string[] = []
            for (let j = 1; j <= noOfImages; j++) {
                const image = formdata.get(`variant-${i}-image-${j}`) as File
                images.push(image)
                key.push(randomUUID() + image.name)
            }
            variantArray.push({
                name, price, images, key
            })
        }
        console.log("variantArray", variantArray);

        variantArray.forEach(async (variant) => {
            variant.images.forEach(async (image, j) => {
                const arrayBuffer = await image.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);

                const cmd = new PutObjectCommand({
                    Bucket: AWS_BUCKET_NAME,
                    Key: variant.key[j],
                    Body: buffer,
                    ContentType: image.type
                })

                const res = await s3.send(cmd);
                console.log(res);

            })
        })
        const data = variantArray.map((variant, indx) => {
            return { productId, name: variant.name, price: variant.price, images: variant.key }
        })
        const newVariants = await prisma.variant.createMany({
            data
        })

        console.log("created successful");

    } catch (error) {
        console.log('error', error);

    }
}