'use client'
import { Product2 } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ProductDetailImage = ({ product, selectedVariant }: { product: Product2, selectedVariant: number }) => {
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        setSelectedImage(0)
    }, [selectedVariant])

    const handleImageChange = (index: number) => {
        setSelectedImage(index)
    }
    return (
        <div
            className=' px-2 space-y-5'
        >
            <figure className='aspect-square relative rounded-md'>
                <Image
                    src={product.variant[selectedVariant].images[selectedImage]}
                    alt="Product Image "
                    fill
                    className='object-contain shadow-md shadow-black rounded-md' />
            </figure>
            <div className='carousel  rounded-box w-full space-x-2'>
                {
                    product.variant[selectedVariant].images.map((image, index) => (
                        <div
                            onClick={() => handleImageChange(index)}
                            key={image + index} className={cn('size-16 border-2 border-black carousel-item relative hover:cursor-pointer',
                                selectedImage === index ? 'border-black' : 'border-primary'
                            )}>
                            <Image
                                src={image}
                                alt='Product Images'
                                fill
                                className='object-cover'
                            />
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default ProductDetailImage