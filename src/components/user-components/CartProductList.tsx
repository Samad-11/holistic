
'use client'
import Image from 'next/image'
import React from 'react'
import QuantityButtons from '../QuantityButtons'
import useCartStore, { CartItem as CartItemType } from '@/store/cartStore'
import { AiOutlineDelete } from 'react-icons/ai'
import Link from 'next/link'
import { currencyFormat } from '@/lib/helper'

const CartProductList = () => {
    const { cart, totalPrice } = useCartStore()

    return (
        <div className='sm:col-span-7 col-span-1 min-h-32 border border-gray'>
            {
                cart.map((cartItem, index) => (
                    <CartItem key={index} cartItem={cartItem} />
                ))
            }
            <div className='flex border-t border-t-base-200  p-5 justify-between
            items-center 
            sticky bottom-0 bg-white'>
                <p className='text-lg font-bold'>
                    Total {currencyFormat(totalPrice)}
                </p>
                <button className='btn btn-primary  text-white 
                '>
                    Place Order
                </button>
            </div>
        </div>
    )
}

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore()
    const handleQuantity = (addOrRemove: boolean) => {
        if (addOrRemove) {
            increaseQuantity(cartItem.product.id, cartItem.variant.id, 1)
        } else if (!addOrRemove && cartItem.quantity > 1) {
            decreaseQuantity(cartItem.product.id, cartItem.variant.id, 1)
        } else {
            removeFromCart(cartItem.product.id, cartItem.variant.id)
        }
    }
    return (
        <div className=' flex  gap-10 py-5 px-5 '>
            <figure className='aspect-square'>
                <Link href={`/shop/product/${cartItem.product.slug}`}>
                    <Image src={cartItem.variant.images[0]} alt={cartItem.product.name} sizes='100' objectFit='cover' width={100} height={100} />
                </Link>
            </figure>
            <div className='flex gap-2 flex-1 '>
                <div className='flex-1'>
                    <p className=' sm:text-lg leading-4'>{cartItem.product.name}</p>
                    <p className='text-secondary'>{cartItem.variant.name}</p>
                    <p className='text-secondary'>{cartItem.product.brand}</p>
                    <div className=' flex  justify-between items-center gap-2'>
                        <p className='font-semibold sm:text-lg'>{currencyFormat(cartItem.variant.price * cartItem.quantity)}</p>
                        <QuantityButtons quantity={cartItem.quantity} actionHandle={handleQuantity} classNameDiv="sm:w-32 w-24" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartProductList