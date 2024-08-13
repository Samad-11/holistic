'use client'
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import BackButton from './BackButton'
import { Product2 } from '@/lib/types'
import AddToCartButton from '../AddToCartButton'
import QuantityButtons from '../QuantityButtons'

const ProductDetailText = ({ product, selectedVariant, setSelectedVariant }: {
    product: Product2,
    setSelectedVariant: Dispatch<SetStateAction<number>>,
    selectedVariant: number
}) => {
    const [quantity, setQuantity] = useState(1)

    const handleVariant = (indx: number) => {
        setSelectedVariant(indx)
    }

    const handleQuantity = (addOrRemove: boolean) => {
        if (addOrRemove) {
            setQuantity(quantity + 1)
        } else if (!addOrRemove && quantity > 1) {
            setQuantity(quantity - 1)
        }
    }


    return (
        <div className='col-span-1  max-sm:order-last w-full flex flex-col  justify-around max-sm:gap-5'>
            <div>
                <BackButton />
            </div>
            <div className='max-w-sm'>
                <h1 className="text-4xl font-semibold text-primary capitalize">
                    {product.name}
                </h1>
            </div>
            <div className=''>
                <p className='text-xl w-1/2 border border-secondary  text-secondary rounded-sm text-center py-2 capitalize'>{product.type}</p>
            </div>
            <div className='max-w-sm'>
                <p className='text-sm text-balance capitalize'>
                    {product.description}
                </p>
            </div>
            <div>
                <label className="form-control w-full max-w-sm">
                    <div className="label">
                        <span className="label-text">Options:</span>
                    </div>
                    <select
                        onChange={(e) => handleVariant(parseInt(e.target.value))}
                        defaultValue={selectedVariant}
                        className="select select-bordered select-secondary w-full">
                        {
                            product.variant.map((variant, indx) => (
                                <option key={`option-product-detail-${indx}`} value={indx}>{variant.name}</option>
                            ))
                        }
                    </select>
                </label>
            </div>
            <div className='max-w-sm'>
                <QuantityButtons actionHandle={handleQuantity} quantity={quantity} />
            </div>
            <div>
                <h2 className='font-semibold text-xl'>{product.variant[selectedVariant].price} INR</h2>
            </div>
            <div className='flex gap-5'>
                <div className='w-1/3'>
                    <AddToCartButton inStock={product.variant[selectedVariant].inStock} product={product} variant={product.variant[selectedVariant]} quantity={quantity} />
                </div>
                <button className="btn btn-secondary btn-outline group w-1/3">
                    <span className='group-hover:text-white'>Buy Now</span></button>
            </div>
        </div>
    )
}

export default ProductDetailText