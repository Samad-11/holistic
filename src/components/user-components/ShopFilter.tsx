'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

const ShopFilter = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const handleMinPrice = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("min", term)
        } else {
            params.delete("min")
        }

        replace(`${pathname}?${params.toString()}`)
    }, 350)
    const handleMaxPrice = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("max", term)
        } else {
            params.delete("max")
        }

        replace(`${pathname}?${params.toString()}`)
    }, 350)


    const handleOutOfStock = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        if (e.target.checked) {
            params.set("out-of-stock", "true")
        } else {
            params.delete("out-of-stock")
        }
        replace(`${pathname}?${params.toString()}`)

    }
    const handleInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        if (e.target.checked) {
            params.set("in-stock", "true")
        } else {
            params.delete("in-stock")
        }
        replace(`${pathname}?${params.toString()}`)

    }




    return (
        <div className=''>
            <div className="divider"></div>
            <div>
                <h4 className='text-lg font-semibold'>Availability</h4>
                <div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text text-base">In Stock</span>
                            <input
                                defaultChecked={searchParams.get("in-stock") === 'true' && true}

                                onChange={e => handleInStock(e)}
                                name='in-stock'
                                type="checkbox" className="checkbox checkbox-secondary" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">Out Of Stock</span>
                            <input
                                defaultChecked={searchParams.get("out-of-stock") === 'true' && true}
                                onChange={e => handleOutOfStock(e)}

                                name='out-of-stock'
                                type="checkbox" className="checkbox checkbox-secondary" />
                        </label>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div>
                <h4 className='text-lg font-semibold'>Price</h4>
                <div className='flex gap-2'>
                    <label className="form-control w-1/2">
                        <div className="label">
                            <span className="label-text">Min Price:</span>
                        </div>
                        <input
                            defaultValue={searchParams.get('min')?.toString()}
                            onChange={e => handleMinPrice(e.target.value)}
                            type="number" min={0} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control  w-1/2">
                        <div className="label">
                            <span className="label-text">Max Price:</span>
                        </div>
                        <input
                            defaultValue={searchParams.get('max')?.toString()}

                            onChange={e => handleMaxPrice(e.target.value)}
                            type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default ShopFilter