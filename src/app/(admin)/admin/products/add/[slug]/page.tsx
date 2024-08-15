import { getAllCategories } from '@/actions/categories'
import { getSingleProduct } from '@/actions/products'
import UpdateProductForm from '@/components/admin-components/UpdateProductForm'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }: { params: { slug: string } }) => {
    const categories = await getAllCategories() || [];
    const product = await getSingleProduct(params.slug)
    if (!product) return <><h1>Error while getting product...</h1></>

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-gray-700 font-semibold capitalize text-lg'>Update Product</h1>
                <span>
                    <Link href={'/admin/products'} className='btn btn-primary text-white'>View Products</Link>
                </span>
            </div>
            <div className="divider text-gray-700"></div>
            <UpdateProductForm categories={categories} product={product} />
        </div>
    )
}

export default page