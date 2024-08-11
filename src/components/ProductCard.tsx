'use client'
import React, { useEffect, useState } from 'react'
import img from '@/../public/dummyImageProduct.webp'
import Image from 'next/image'
import { FaBasketShopping } from 'react-icons/fa6'
import { Category, Product, Variant } from '@prisma/client'
import { IProduct, Product2 } from '@/lib/types'
import { useRouter } from 'next/navigation'
import slugify from 'slugify'

// interface ProductCardProps {
//     product: {

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
//     }
// }


const ProductCard = ({ product }: { product: Product2 }) => {
    const [selectedVariant, setSelectedVariant] = useState(0)
    const router = useRouter()

    //use effect on selectedVariantchange 
    useEffect(() => {
        if (selectedVariant >= product.variant.length) {
            setSelectedVariant(0)
        }
    }, [selectedVariant, product.variant])


    const handleSelectVariant = (variantIndex: number) => {
        setSelectedVariant(variantIndex)

    }



    const handleProductDetail = () => {
        const slug = slugify(product.name, { trim: true, replacement: "-", lower: true })
        router.push(`/shop/product/${slug}`)
    }

    return (
        <div
            onClick={handleProductDetail}
            className="card  w-full  shadow-xl  border-[0.4px] border-secondary/60 pt-2">
            <figure className='h-64
            max-sm:h-56
            mx-auto
            w-56
            cursor-pointer
            relative'>
                <Image
                    fill
                    className='object-contain'
                    src={product.variant[selectedVariant].images[0]}
                    alt={`${product.name}-image`} />
            </figure>
            <div className="card-body py-0 px-2 pb-2">
                <h2 className="card-title text-primary  max-sm:text-base">
                    {product.name}
                </h2>
                <div className="card-actions justify-start">
                    <div className="badge  ">{product.category.name}</div>
                    <div className="badge ">{product.brand}</div>
                </div>
                <div>
                    <label className="form-control w-full  text-neutral">
                        <div className="label">
                            <span className="label-text text-neutral">Option</span>
                        </div>
                        <select
                            onClick={e => e.stopPropagation()}
                            onChange={e => {
                                e.stopPropagation();
                                handleSelectVariant(parseInt(e.target.value))
                            }}
                            className="select select-bordered  text-white bg-secondary">

                            {
                                product.variant.map((v, indx) => (

                                    <option
                                        key={indx} value={indx}>{v.name}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>
                <div className='text-neutral font-semibold flex justify-start gap-3 text-lg'>
                    <span>{product.variant[selectedVariant].price}</span>
                    <span>INR</span>
                </div>
                <div>
                    <button
                        disabled={
                            product.variant[selectedVariant].inStock === false
                        }
                        className='btn btn-block btn-primary text-white'>
                        <FaBasketShopping />
                        <span>
                            {
                                product.variant[selectedVariant].inStock === false ? "Out Of Stock" : "Add to cart"
                            }
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard