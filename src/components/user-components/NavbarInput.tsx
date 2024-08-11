'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
const NavbarInput = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()


    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        if (!pathname.includes("/shop/")) {
            replace(`/shop/all?${params.toString()}`)
        } else {
            replace(`${pathname}?${params.toString()}`)
        }
    }, 350

    )


    return (
        <div className="form-control ">
            <input
                defaultValue={searchParams.get("query")?.toString()}
                onChange={e => handleSearch(e.target.value)}
                type="text" placeholder="Search" className="input
            max-sm:hidden
            input-bordered w-24 md:w-auto  text-secondary-content 
            placeholder:text-secondary-content/55
            " />
        </div>
    )
}

export default NavbarInput