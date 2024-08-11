import { fetchProductsShop } from '@/actions/products'
import React from 'react'

const page = async () => {
    const price = undefined
    const maxProducts = 6;
    const orderBy = {
        field: 'price',
        direction: 'asc'
    }
    const products = await fetchProductsShop(1 * maxProducts, maxProducts, undefined, "66b71678280f765835c6e024", price, orderBy, true)
    return (
        <div className='min-h-screen'>
            <pre>
                {products?.products?.length}
                {JSON.stringify(products, null, 2)}
            </pre>
        </div>
    )
}

export default page