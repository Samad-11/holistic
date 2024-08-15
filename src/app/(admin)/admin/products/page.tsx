import { fetchProducts, fetchProductsShop, totalproducts } from '@/actions/products'
import ProductList from '@/components/admin-components/ProductList'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import React from 'react'

const page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
    // Fetch products from your API or database
    const total = await totalproducts()
    const MAX_PER_PAGE = 8
    const currentPage = Number(searchParams?.page) || 1

    return (
        <div >
            <div className='flex justify-between items-center'>
                <h1 className='text-gray-700 font-semibold capitalize text-lg'>Products</h1>
                <span>
                    <Link href={'/admin/products/add'} className='btn btn-primary text-white'>Add</Link>
                </span>
            </div>
            <div className="divider text-gray-700"></div>
            <div>
                <ProductList currentPage={currentPage} max={MAX_PER_PAGE} />
                <Pagination total={total} max={MAX_PER_PAGE} />
            </div>
        </div>
    )
}

export default page