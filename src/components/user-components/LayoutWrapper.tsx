import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Container from '../Container'
import { Category } from '@prisma/client'

const LayoutWrapper = ({ children, categories }: { children: ReactNode, categories: Category[] }) => {
    return (
        <div className=''>
            <Navbar categories={categories} />
            <div className='min-h-screen'>
                {children}
            </div>
            <div className="divider"></div>
            <Container>
                <Footer />
            </Container>
        </div>
    )
}

export default LayoutWrapper