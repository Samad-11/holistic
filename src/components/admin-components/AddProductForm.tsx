'use client'
import { addProduct } from '@/actions/products'
import { Category2 } from '@/lib/types'
import React, { useRef, useState } from 'react'

const AddProductForm = ({ categories }: { categories: Category2[] }) => {
    // dynamic variant input fields
    const [noOfVariant, setNoOfVariant] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    return (
        <>
            {
                isLoading &&
                <div className='fixed h-screen top-0 left-0 bg-black/25 z-40 w-screen flex justify-center items-center'>
                    <span className="loading loading-lg "></span>
                </div>
            }
            <div className='h-[31rem] overflow-y-auto px-1 py-1'>

                <form ref={formRef} action={async (formdata: FormData) => {
                    setIsLoading(true)
                    await addProduct(formdata)
                    setIsLoading(false)
                    formRef?.current?.reset()
                    setNoOfVariant(1)
                }}>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Name</span>
                        </div>
                        <input required type="text" placeholder="Product Name" name='name' className="input input-bordered w-full " />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Brand</span>
                        </div>
                        <input required type="text" placeholder="Product Brand" name='brand' className="input input-bordered w-full " />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Type</span>
                        </div>
                        <input required type="text" placeholder="Product Type" name='type' className="input input-bordered w-full " />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Description</span>
                        </div>
                        <textarea required placeholder="Product Description" name='description' className="input input-bordered w-full " />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Product Category</span>
                        </div>
                        <select required className="select select-bordered" defaultValue={""} name='category'>
                            <option disabled value={""}>Pick one</option>
                            {
                                categories.map((category, indx) => (
                                    <option key={`add-product-category-${indx}`} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <div className="divider text-gray-800"></div>
                    {
                        Array.from({ length: noOfVariant }).map((_, i) => (
                            <VariantFields sno={i + 1} key={'variant-' + i} />
                        ))
                    }
                    <input type='hidden' name='noOfVariants' value={noOfVariant} />
                    <div className='flex justify-end px-5'>
                        <button type='button'
                            onClick={() => setNoOfVariant(prev => prev + 1)}
                            className='btn btn-secondary btn-outline
                
                '>Add Variant</button>
                        <button type='button'
                            onClick={() => setNoOfVariant(prev => prev > 1 ? prev - 1 : prev)}
                            className='btn btn-accent btn-outline
                
                '>Remove Variant</button>
                    </div>
                    <div className='mt-4'>
                        <button type='submit' className='btn text-white btn-primary btn-block '>Save Product</button>
                    </div>
                </form>

            </div>
        </>
    )
}


const VariantFields = ({ sno }: { sno: number }) => {
    const [noOfImages, setNoOfImages] = useState(1)
    return (
        <>
            <div className='flex gap-1 flex-wrap'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Variant Name</span>
                    </div>
                    <input required type="text" placeholder="Variant Name" name={`variant-${sno}-name`} className="input input-bordered w-full " />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Variant Price</span>
                    </div>
                    <input required type="text" placeholder="Variant Price" name={`variant-${sno}-price`} className="input input-bordered w-full " />
                </label>
                {
                    Array.from({ length: noOfImages }).map((_, i) => (
                        <label key={"add-product-image-" + i} className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Pick a Image</span>
                            </div>
                            <input required type="file" accept='image/*' name={`variant-${sno}-image-${i + 1}`} className="file-input file-input-bordered w-full max-w-xs" />
                        </label>
                    ))
                }
                <input type='hidden' name={`variant-${sno}-noOfImages`} value={noOfImages} />

                <div className="flex-col w-full max-w-xs flex justify-end">
                    <div className="join">
                        <button
                            onClick={
                                () => setNoOfImages(prev => prev === 5 ? prev : prev + 1)
                            }
                            type='button' className="btn join-item btn-outline btn-secondary">+</button>
                        <button
                            onClick={
                                () => setNoOfImages(prev => prev > 1 ? prev - 1 : prev)
                            }
                            type='button' className="btn join-item btn-outline btn-secondary">-</button>
                    </div>
                </div>
            </div>
            <div className="divider text-gray-800"></div>

        </>
    )
}

export default AddProductForm