import { fetchProducts } from '@/actions/products'
import { imagePrefix } from '@/constants'
import { currencyFormat } from '@/lib/helper'
import { Product2 } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductList = async ({ currentPage, max }: { currentPage: number, max: number }) => {
    const products = await fetchProducts(currentPage, max)
    return (
        <div className="overflow-y-auto h-[20rem]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='w-fit'>Sno.</th>
                        <th>Product</th>
                        <th>Variants</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((product, indx) => (



                            <tr key={`product-table-${product.slug}-${indx}`}>
                                <th className='w-fit'>{indx + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-square h-12 w-12 relative">

                                                <Image
                                                    fill
                                                    className='object-contain'
                                                    src={`${imagePrefix}${product.variant[0].images[0]}`}
                                                    alt="product Image" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.name}</div>
                                            <div className="text-sm opacity-50">{product.category.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <ul>
                                        {
                                            product.variant.map((variant, index) => (
                                                <li key={`variant-${index}`}>{variant.name} for {currencyFormat(variant.price)}</li>
                                            ))
                                        }

                                    </ul>

                                </td>
                                <td>{product.brand}</td>
                                <th>
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-sm group btn-accent btn-outline"><span className="group-hover:text-white">Details</span></div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-accent text-white  rounded-box z-[1] w-52 p-2 shadow">
                                            <li><Link href={``}>View</Link></li>
                                            <li><Link href={`/admin/products/add/${product.slug}`}>Update</Link></li>
                                        </ul>
                                    </div>
                                </th>
                            </tr>
                        ))
                    }

                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ProductList