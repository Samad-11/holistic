'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa'

const BackButton = () => {
    const router = useRouter()
    const handleBackClick = () => {
        router.back()
    }
    return (
        <button
            onClick={handleBackClick}
            type="button"
            className='flex items-center justify-center gap-2
    px-3
    py-1
    rounded-full
    max-sm:text-xs
transition-all
hover:bg-neutral
hover:text-white
'>
            <span className='border p-2 rounded-full border-neutral'>
                <FaLongArrowAltLeft />
            </span>
            <span>Back</span>
        </button>
    )
}

export default BackButton