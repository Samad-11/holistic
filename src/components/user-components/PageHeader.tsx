import React from 'react'
import Container from '../Container'
import { useRouter } from 'next/navigation'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import BackButton from './BackButton'

const PageHeader = ({ category }: { category: string }) => {

    return (
        <div className='bg-gray-300'>
            <Container>
                <div className='h-80 flex items-center'>
                    <div className='space-y-3 max-w-3xl'>
                        <BackButton />
                        <h1 className='text-primary text-2xl sm:text-4xl font-bold px-3 capitalize'>
                            {
                                category.toLowerCase() === "all" ? "All Products" : category
                            }
                        </h1>
                        <p className='text-xs sm:text-sm px-3'>
                            An acute cough is one of the most common presenting complaints encountered in the pharmacy for which patients seek advice about or over-the-counter cough treatment. It is most commonly caused by a viral upper respiratory tract infection such as a common cold or flu.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PageHeader