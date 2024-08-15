import { siteName } from '@/constants'
import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'

const AdminNavbar = () => {
    return (
        <nav className='flex items-center justify-between w-full h-16 bg-gray-800
        px-5
        '>
            <div className='flex items-center'>
                <p className='text-primary font-bold text-lg capitalize'>{siteName}</p>
            </div>
            <div className='flex justify-center items-center gap-3'>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  border ">
                        <div className="indicator">
                            <span className="badge  badge-sm rounded-full  indicator-item text-neutral badge-error">New</span>

                            <IoMdNotificationsOutline fill='white' size={25} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>new user</li>
                        <li>new order</li>
                        <li>new spam</li>
                    </ul>
                </div>
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
            </div>
        </nav>
    )
}

export default AdminNavbar