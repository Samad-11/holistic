import { fetchProductsShop, fetchProductsSlug, getSingleProduct } from '@/actions/products';
import Container from '@/components/Container'
import HeroProductsDisplay from '@/components/user-components/HeroProductsDisplay';
import ProductDetail from '@/components/user-components/ProductDetail'
import React from 'react'


export async function generateStaticParams() {
    const products = await fetchProductsSlug();
    if (!products) {
        return [];
    }
    return products?.map((product) => ({
        slug: product.slug
    }))
}


const page = async ({ params }: { params: { slug: string } }) => {
    const product = await getSingleProduct(params.slug)
    if (!product) {
        return <h1>Product not found</h1>
    }

    const data = await fetchProductsShop(0, 8, undefined, product.category.name, undefined, undefined, true);

    return (
        <Container>
            <ProductDetail product={product} />
            <div className="divider"></div>
            <HeroProductsDisplay showMore={false} title='Related Products' products={data?.products || []} />
        </Container>
    )
}

export default page