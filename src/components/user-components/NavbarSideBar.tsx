'use client'
import Link from 'next/link'
import React, { useRef } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosClose } from 'react-icons/io'

type CategoryType = {
    id: number;
    name: string;
}


const NavbarSideBar = ({ categories }: { categories: CategoryType[] }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const closeSideBar = () => {
        inputRef.current?.click()
    }
    return (
        <div>
            <div className="drawer drawer-end sm:hidden">
                <input ref={inputRef} id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button"><GiHamburgerMenu /></label>
                </div>
                <div className="drawer-side z-[999]">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu bg-base-200 text-base-content min-h-full w-80 max-sm:w-full px-4">
                        <div className='w-full btn-secondary h-full'>
                            <button
                                onClick={closeSideBar}
                                className='btn'><IoIosClose size={30} className='text-white' /></button>
                        </div>
                        {/* Sidebar content here */}
                        <ul className='text-primary text-lg w-full  my-5 font-semibold list-outside'>
                            <li className='list-item'>
                                <div className="collapse w-full p-0">
                                    <input type="checkbox" />
                                    <div className="collapse-title text-xl font-medium flex justify-center items-center gap-4 w-full
                                    ">
                                        <span>Category</span>
                                        <span><FaAngleDown /></span>
                                    </div>
                                    <ul className="collapse-content list-inside">
                                        {
                                            categories.map((category, indx) => (
                                                <li key={`category-${indx}`} className='list-item'>
                                                    <Link href={category.name}>
                                                        {category.name}
                                                    </Link>
                                                </li>

                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>
                            <li><Link href={"/about"}>About</Link></li>
                            <li><Link href={"/about"}>FAQ&apos;s</Link></li>
                            <li><Link href={"/about"}>Blogs</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarSideBar


const dummyProducts = [
    {
        id: "1",
        name: "jhandu balm",
        description: "something about the product",
        brand: "balm",
        category: "pain",
        type: "balm",
        variant: [
            {
                name: "small",
                price: 40,
                inStock: true,
                images: ["imageUrl1", "imageUrl2"]
            },
            {
                name: "medium",
                price: 60,
                inStock: false,
                images: ["imageUrl1"]
            },
        ]
    }
]