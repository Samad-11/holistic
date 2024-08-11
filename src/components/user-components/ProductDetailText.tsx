import React, { Dispatch, SetStateAction } from 'react'
import BackButton from './BackButton'
import { Product2 } from '@/lib/types'

const ProductDetailText = ({ product, selectedVariant, setSelectedVariant }: {
    product: Product2,
    setSelectedVariant: Dispatch<SetStateAction<number>>,
    selectedVariant: number
}) => {

    const handleVariant = (indx: number) => {
        setSelectedVariant(indx)
    }


    return (
        <div className='col-span-1  w-full flex flex-col  justify-around'>
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
                <div className="join w-full border rounded-sm  flex  items-center ">
                    <button className=" join-item inline-flex justify-center items-center p-2 flex-1 btn btn-ghost">-</button>
                    <span className='flex-1 text-center font-semibold'>1</span>
                    <button className=" join-item inline-flex justify-center items-center p-2 flex-1 btn btn-ghost">+</button>
                </div>
            </div>
            <div>
                <h2 className='font-semibold text-xl'>{product.variant[selectedVariant].price} INR</h2>
            </div>
            <div className='flex gap-5'>
                <button className="btn btn-secondary text-white w-1/3">Add to Cart</button>
                <button className="btn btn-secondary btn-outline group w-1/3"><span className='group-hover:text-white'>Buy Now</span></button>
            </div>
        </div>
    )
}

export default ProductDetailText