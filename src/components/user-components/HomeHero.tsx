import { siteName } from '@/constants'
import React, { Suspense } from 'react'
import ProductCard from '../ProductCard'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IProduct } from '@/lib/types'
import HomeHeroSearchInput from './HomeHeroSearchInput'
// import { products } from '@/lib/dummy'

const HomeHero = ({ product }: IProduct) => {
    return (
        <div className='grid lg:grid-cols-3 grid-cols-1 sm:pt-20  gap-y-8 mt-5'>
            <div className="lg:col-span-2
             
            flex justify-center items-start  flex-col text-neutral lg:max-w-lg">
                <p className='font-thin text-lg '>{siteName}</p>
                <h1 className=' text-primary text-4xl font-bold mb-8'>The place where you can find all medications</h1>
                <p >We believe that improving both the occasional and ongoing engagement experience is necessary to making care dramatically better.</p>
                <Suspense>
                    <HomeHeroSearchInput />
                </Suspense>
            </div>
            <div className="col-span-1 flex justify-center items-center">
                <ProductCard product={product} />
            </div>
        </div>
    )
}

export default HomeHero