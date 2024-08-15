import Container from '@/components/Container'
import CartProductList from '@/components/user-components/CartProductList'
import CartSummary from '@/components/user-components/CartSummary'
import React from 'react'

const page = () => {
    return (
        <div className='relative'>
            <Container>
                <div className='grid sm:grid-cols-10 grid-cols-1 pt-10 gap-5  '>
                    <CartProductList />
                    <div className=' sm:col-span-3 col-span-1 '>
                        <CartSummary />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default page