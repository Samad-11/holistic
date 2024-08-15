'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const Pagination = ({ total, max }: { total: number, max: number }) => {
    const pages = Math.ceil(total / max)
    const pathname = usePathname()
    const { replace } = useRouter()
    const searchParams = useSearchParams()

    const handleChangePage = (page: number) => {
        //update query parameters
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        replace(`${pathname}?${params.toString()}`)
    }
    return (
        <div className='w-full  mx-auto flex justify-end items-center py-2 px-5'>

            <div className="join ">
                {
                    Array.from({ length: pages }, (_, i) => i + 1).map(page => (
                        <button
                            onClick={() => handleChangePage(page)}
                            key={page} className={`join-item btn btn-secondary btn-outline ${page === 1 ? 'btn-primary' : ''}`}>
                            {page}
                        </button>
                    ))
                }

            </div>
        </div>
    )
}

export default Pagination