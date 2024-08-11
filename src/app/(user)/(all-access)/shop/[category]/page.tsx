import { fetchProductsShop } from '@/actions/products'
import Container from '@/components/Container'
import PageHeader from '@/components/user-components/PageHeader'
import ShopProductsSection from '@/components/user-components/ShopProductsSection'
import { products } from '@/lib/dummy'
import React from 'react'



const page = async ({ params }: { params: { category: string } }) => {

    return (
        <div>
            <PageHeader category={params.category} />
            <Container>
                <ShopProductsSection categoryName={params.category} />
            </Container>
        </div>
    )
}

export default page