import { fetchProducts, fetchProductsShop } from '@/actions/products'
import React from 'react'

const page = async () => {

    const products = await fetchProducts(0, 4, undefined, undefined, { gte: 150, lte: undefined })
    return (
        <div className='min-h-screen'>
            <pre>
                {products?.length}
                {JSON.stringify(products, null, 2)}
            </pre>
        </div>
    )
}

export default page