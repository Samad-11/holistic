import { getAllCategories } from '@/actions/categories'
import AddProductForm from '@/components/admin-components/AddProductForm'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const categories = await getAllCategories()
    if (!categories) return <><h1>Error while getting categories...</h1></>
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-gray-700 font-semibold capitalize text-lg'>Add New Product</h1>
                <span>
                    <Link href={'/admin/products'} className='btn btn-primary text-white'>View Products</Link>
                </span>
            </div>
            <div className="divider text-gray-700"></div>
            <AddProductForm categories={categories} />
        </div>
    )
}

export default page