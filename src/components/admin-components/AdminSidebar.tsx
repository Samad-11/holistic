import Link from 'next/link'
import React from 'react'
import { AiOutlineProduct } from 'react-icons/ai'
import { BsSpeedometer2 } from 'react-icons/bs'
import { LuPackage } from 'react-icons/lu'
import { TbCategory2 } from 'react-icons/tb'

const AdminSidebar = () => {
    const adminLinks = [
        {
            icon: <BsSpeedometer2 className='text-gray-500' />,
            label: 'Dashboard',
            href: '/admin/',
        },
        {
            icon: <LuPackage className='text-gray-500' />,
            label: 'Orders',
            href: '/admin/orders',
        },
        {
            icon: <AiOutlineProduct className='text-gray-500' />,
            label: 'Products',
            href: '/admin/products',
        },
        {
            icon: <TbCategory2 className='text-gray-500' />,
            label: 'Category',
            href: '/admin/category',
        },
    ]
    return (
        <div className='col-span-2 bg-gray-800  pt-10'>
            <div className=''>
                <ul className=''>
                    {
                        adminLinks.map((link) => (
                            <li key={link.href} className='py-4 px-1 '>
                                <Link href={link.href} className='flex items-center gap-5 font-light text-gray-200 hover:underline'>
                                    {link.icon} {link.label}
                                </Link>
                            </li>
                        ))
                    }

                </ul>
            </div>
        </div>
    )
}

export default AdminSidebar