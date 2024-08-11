'use client'
import React, { useEffect } from 'react'
import ProductDetailText from './ProductDetailText'
import ProductDetailImage from './ProductDetailImage'
import { Product2 } from '@/lib/types'

const ProductDetail = ({ product }: { product: Product2 }) => {
    //selected variant initially first
    const [selectedVariant, setSelectedVariant] = React.useState(0)
    useEffect(() => {
        console.log('====================================');
        console.log(selectedVariant);
    }, [selectedVariant])

    return (
        <div className='grid grid-cols-1  sm:grid-cols-2 min-h-screen mt-10'>
            <ProductDetailText product={product} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
            <ProductDetailImage product={product} selectedVariant={selectedVariant} />
        </div>
    )
}

export default ProductDetail