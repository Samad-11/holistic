import { getAllCategories } from '@/actions/categories'
import { fetchProductsShop } from '@/actions/products'
import Container from '@/components/Container'
import PageHeader from '@/components/user-components/PageHeader'
import ShopProductsSection from '@/components/user-components/ShopProductsSection'
import { products } from '@/lib/dummy'
import React, { Suspense } from 'react'


export async function generateStaticParams() {
    const categories = await getAllCategories();
    if (!categories) return [];
    return categories?.map((category) => ({
        category: category.slug
    }))
}



const page = async ({ params }: { params: { category: string } }) => {

    return (
        <div>
            <PageHeader category={params.category} />
            <Container>
                <Suspense>
                    <ShopProductsSection categoryName={params.category} />
                </Suspense>
            </Container>
        </div>
    )
}

export default page