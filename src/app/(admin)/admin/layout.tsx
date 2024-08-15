import AdminNavbar from '@/components/admin-components/AdminNavbar'
import AdminSidebar from '@/components/admin-components/AdminSidebar'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='bg-gray-800 h-screen overflow-y-hidden'>
            <AdminNavbar />
            <div className='grid grid-cols-10 h-fit px-5 pb-5'>
                <AdminSidebar />
                <div className='col-span-8 p-5 bg-white '>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout