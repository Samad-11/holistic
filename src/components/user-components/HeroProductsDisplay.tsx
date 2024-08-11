import React from 'react'
import ProductCard from '../ProductCard'
import { products } from '@/lib/dummy'
import Link from 'next/link'
import { Category, Product, Variant } from '@prisma/client'
import { IProduct, IProducts, IProducts2 } from '@/lib/types'


// interface ProductCardProps {
//     products: {

//         id: string;
//         name: string;
//         description: string;
//         brand: string;
//         category: string;
//         type: string;
//         salesCount: number;
//         variant: {
//             name: string;
//             price: number;
//             inStock: boolean;
//             images: string[];
//         }[];
//     }[]
// }

const HeroProductsDisplay = ({ products, title, showMore = true }: { products: IProducts2, title: string, showMore?: boolean }) => {
    return (
        <div className='mt-20 overflow-x-hidden'>
            <h2
                className='text-5xl font-semibold text-primary'
            >
                {title}
            </h2>
            <div className="carousel rounded-box sm:space-x-2 md:space-x-4 space-x-2  w-full mt-10">
                {
                    products.map((product, indx) => (
                        <div key={`bestsellers-product-${indx}`} className="carousel-item max-sm:w-full max-md:w-1/2  ">
                            <ProductCard product={product} />
                        </div>
                    ))
                }

            </div>
            {
                showMore &&
                <Link href={"/shop/all"}
                    className='btn btn-block btn-outline btn-secondary mt-10'
                >Show More Products</Link>
            }
        </div>
    )
}

export default HeroProductsDisplay