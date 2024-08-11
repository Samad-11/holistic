
import { siteName } from '@/constants'
import Link from 'next/link'
import React from 'react'
import NavbarCart from './NavbarCart'
import NavbarInput from './NavbarInput'
import Container from '../Container'
// import { categories } from '@/lib/dummy'

import NavbarSideBar from './NavbarSideBar'
import { usePathname, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'
import { categories } from '@/lib/dummy'

const Navbar = ({ categories }: { categories: Category[] }) => {


    return (
        <>
            <Container>
                <NavTop />
            </Container>
            <div className="divider bg-accent-content/20 h-[1px] m-0"></div>
            <Container>
                <NavBottom categories={categories} />
            </Container>
            <div className="divider bg-accent-content/20 h-[1px] m-0"></div>
        </>
    )
}

const NavTop = () => {

    return (
        <div className="navbar items-center">
            <div className="flex-1">
                <Link href={'/'} className="text-2xl text-primary font-bold ">{siteName}</Link>
            </div>
            <div className="flex-none gap-2">
                <NavbarInput />
                <NavbarCart />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
                <NavbarSideBar categories={categories} />
            </div>
        </div>
    )
}

const NavBottom = ({ categories }: { categories: Category[] }) => {
    return (
        <div className="navbar items-center justify-between py-0 gap-14 flex-wrap
        max-sm:hidden
        
        ">
            <div className="flex-1 flex justify-start flex-wrap gap-3">
                {
                    [{ id: "0", name: "All" }, ...categories].map((category, indx) => (
                        <Link key={category.name + indx} href={`/shop/${category.name.toLowerCase()}`} className="text-sm text-gray-600 hover:text-gray-900">{category.name}</Link>

                    ))
                }
            </div>
            <div className="flex-none gap-2">
                <Link href={'/about'} className=" text-gray-600 hover:text-gray-900">About</Link>
                <Link href={'/'} className=" text-gray-600 hover:text-gray-900">FAQ&apos;s</Link>
                <Link href={'/contact'} className=" text-gray-600 hover:text-gray-900">Blogs</Link>
            </div>
        </div>
    )
}

export default Navbar