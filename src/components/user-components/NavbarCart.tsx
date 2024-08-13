'use client'
import { products } from '@/lib/dummy'
import { truncateStr } from '@/lib/helper'
import useCartStore, { CartItem } from '@/store/cartStore'
import Image from 'next/image'
import React from 'react'
import QuantityButtons from '../QuantityButtons'
import { Product2, Variant2 } from '@/lib/types'
import { AiOutlineDelete } from 'react-icons/ai'

const NavbarCart = () => {

    const { cart, totalItems, totalPrice, removeFromCart } = useCartStore()

    const cartEmpty = () => {
        return (
            <div className="text-center h-20 flex justify-center items-center text-white">
                <p className='font-semibold text-lg'>Your cart is empty</p>
            </div>
        )
    }
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="badge  badge-sm indicator-item text-neutral">{totalItems}</span>
                </div>
            </div>
            <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-secondary  z-[1] mt-3 w-52 shadow">
                {
                    totalItems < 1 ? cartEmpty() :
                        <div className="card-body max-h-96 ">
                            <span className="text-lg font-bold">{totalItems} Items</span>
                            <ul className='min-h-20 
                            max-h-56 overflow-y-auto
                            '>
                                {
                                    cart.map((cartItem, indx) => (
                                        <NavCartItem key={indx} indx={indx} cartItem={cartItem} />
                                    ))
                                }
                            </ul>
                            <span className="text-base-100">Subtotal: {totalPrice} INR</span>
                            <div className="">
                                <button className="btn btn-primary btn-block text-white">View cart</button>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

const NavCartItem = ({ indx, cartItem }: { indx: number, cartItem: CartItem }) => {
    const { decreaseQuantity, increaseQuantity, removeFromCart } = useCartStore()
    const handleQuantity = (addOrRemove: boolean) => {
        if (addOrRemove) {
            increaseQuantity(cartItem.product.id, cartItem.variant.id, 1)
        } else {
            decreaseQuantity(cartItem.product.id, cartItem.variant.id, 1)
        }
    }
    return (
        <li className='h-full'>
            <div className='grid grid-cols-5 text-xs w-full h-10'>
                <div className="col-span-3 flex flex-col">
                    <span>{truncateStr(cartItem.product.name, 20)}</span>
                    <span>{truncateStr(cartItem.variant.name, 17)}x{cartItem.quantity}</span>
                </div>
                <div className='col-span-2 flex flex-col justify-center items-center'>
                    <QuantityButtons actionHandle={handleQuantity} quantity={cartItem.quantity} classNameButton="btn-sm" classNameDiv="border-none" />
                </div>
            </div>
            <div>
                <button
                    onClick={() => removeFromCart(cartItem.product.id, cartItem.variant.id)}
                    className='btn btn-sm btn-error  btn-outline '><AiOutlineDelete size={14} className='text-white font-extrabold' /></button>
            </div>
            <div className="divider"></div>
        </li>
    )
}

export default NavbarCart