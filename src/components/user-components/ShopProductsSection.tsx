'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import ProductCard from '../ProductCard'
import ShopFilter from './ShopFilter'
// import { products } from '@/lib/dummy'
import { fetchProductsShop } from '@/actions/products'
import { IProducts, IProducts2 } from '@/lib/types'
import ShopLoading from './ShopLoading'
import { useSearchParams } from 'next/navigation'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6'

interface ShowProductSectionProps {
    initialProducts: {

        id: string;
        name: string;
        description: string;
        brand: string;
        category: string;
        type: string;
        salesCount: number;
        variant: {
            name: string;
            price: number;
            inStock: boolean;
            images: string[];
        }[];
    }[]
}

const NUMBER_OF_LOAD_MORE_PRODUCTS = 6

const ShopProductsSection = ({ categoryName }: { categoryName: string }) => {
    const [offset, setOffset] = useState(0)
    const [productsState, setProductsState] = useState<IProducts2>([])
    const [isLoading, setIsLoading] = useState(false)
    const [total, setTotal] = useState(0)
    //previous price state
    const [previousPrice, setPreviousPrice] = useState<{ min: number | undefined, max: number | undefined }>({ min: undefined, max: undefined })
    //previous query
    const [previousQuery, setPreviousQuery] = useState<string | undefined>(undefined)
    //previous out-of-stock and in-stock
    const [previousStock, setPreviousStock] = useState<string | undefined>(undefined)
    const searchParams = useSearchParams();

    const [filterCollapse, setFilterCollapse] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {

            setIsLoading(true);
            const query = searchParams.get("query") || undefined
            const price = {
                min: Number(searchParams.get("min")) || undefined,
                max: Number(searchParams.get("max")) || undefined,
            }
            const stock = [searchParams.get("in-stock") && "in-stock", searchParams.get("out-of-stock") && "out-of-stock"].filter((value) => value !== null).join(",")
            if ((JSON.stringify(price) !== JSON.stringify(previousPrice)) || (JSON.stringify(query) !== JSON.stringify(previousQuery)) || (stock !== previousStock)) {
                setOffset(0)
            }
            setPreviousStock(stock)
            setPreviousQuery(query)
            setPreviousPrice(price)
            let boolStock = ((stock.split(',').length !== 1) || (stock === "")) ? undefined : stock === "in-stock" ? true : false
            const data = await fetchProductsShop(offset, NUMBER_OF_LOAD_MORE_PRODUCTS, query, categoryName, price, undefined, boolStock);
            if (data) {
                setProductsState([...data.products])
                setTotal(data.productCount)
                setIsLoading(false);
            }
            setIsLoading(false)
        }
        fetchProducts();
    }, [offset, searchParams])


    const handleLoadMore = async () => {
        setOffset(prev => {
            return prev + 1
        })
        console.log(offset);
    }

    return (
        <div
            className='
                        grid 
                        sm:grid-cols-9
                        mt-20
                        grid-cols-1
                        gap-y-2
                    '
        >

            <div className=" sm:col-span-2 col-span-1   sm:border-r sm:border-neutral px-2"
            >
                <h3
                    className='max-sm:hidden text-2xl font-semibold py-5'
                >Filters</h3>
                <div>
                    <div className="sm:hidden collapse bg-base-200 transition-all">
                        <input type="checkbox" onClick={() => setFilterCollapse(prev => !prev)} />
                        <div className="collapse-title text-xl font-semibold text-center flex justify-center items-center gap-3">Filters
                            {
                                filterCollapse ? <span><FaAngleUp /></span> : <span><FaAngleDown /></span>
                            }
                        </div>
                        <div className="collapse-content">
                            <Suspense>
                                <ShopFilter />
                            </Suspense>
                        </div>
                    </div>
                    <div className='max-sm:hidden'>
                        <Suspense>
                            <ShopFilter />
                        </Suspense>
                    </div>
                </div>
            </div>
            <div className="col-span-7 px-2">
                <div className='flex justify-between items-center'>
                    <h3
                        className='text-xl sm:text-2xl font-semibold py-5 capitalize'
                    >{
                            categoryName === "all" ? "All Products" : categoryName
                        }</h3>
                    <div className='flex max-sm:flex-col sm:justify-center sm:items-center sm:gap-4 '>
                        <p className='font-semibold max-sm:text-xs self-end'>Sort by:</p>
                        <select className="select select-bordered  select-sm">
                            <option>Popularity</option>
                            <option>Price: High to Low</option>
                            <option>Price: Low to High</option>
                            <option>Rating: High to Low</option>
                            <option>Rating: Low to High</option>
                            <option>Newest First</option>
                        </select>
                    </div>
                </div>
                <div className="divider"></div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
                    {
                        productsState.map((product, indx) => (
                            <ProductCard product={product} key={`shop-product-${indx}`} />
                        ))
                    }
                    {
                        isLoading && <ShopLoading />
                    }
                    <div className='flex justify-center items-center col-span-full'>
                        <button
                            disabled={((offset + 1) * NUMBER_OF_LOAD_MORE_PRODUCTS >= total) || isLoading}  // if offset is more than or equal to total, then disable the button.
                            onClick={handleLoadMore}
                            className='btn btn-block btn-primary'>
                            Load More
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ShopProductsSection