'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useRef } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const HomeHeroSearchInput = () => {
    const searchParams = useSearchParams()
    const inputRef = useRef<HTMLInputElement>(null)
    const { replace } = useRouter()
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams)
        const term = inputRef.current?.value?.trim()
        if (term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        replace(`/shop/all?${params.toString()}`)
    }
    return (
        <form
            onSubmit={e => handleSearch(e)}
            className="form-control mt-10 w-full space-y-3">
            <input
                ref={inputRef}
                type="text" placeholder="Search" className="input input-bordered   text-secondary-content placeholder:text-secondary-content/55" />
            <button

                type="submit"
                className='btn btn-primary btn-outline text-lg
        group
        '
            >
                <FaMagnifyingGlass className='group-hover:text-white' />
                <span className='group-hover:text-white'>Search</span>
            </button>
        </form>
    )
}

export default HomeHeroSearchInput