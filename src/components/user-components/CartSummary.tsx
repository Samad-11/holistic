import { currencyFormat } from '@/lib/helper'
import React from 'react'

const CartSummary = () => {
    return (
        <div className='sm:sticky sm:top-10 p-5 border border-base-200 w-full'>
            <div>
                <p className='text-center text-secondary font-bold capitalize'>Price Details</p>
            </div>
            <div className="divider text-base-200 "></div>
            <div className='flex flex-col gap-5  border-dashed border-b-2 border-base-200 pb-5 mb-5'>
                <div className='flex justify-between'>
                    <p className='flex-1'>Price (2 items)</p>
                    <p className='flex-1 text-right'>{currencyFormat(2400.49)}</p>
                </div>
                <div className='flex justify-between flex-wrap'>
                    <p className='flex-1'>Delivery Charges</p>
                    <p className='flex-1 text-right'>{currencyFormat(100)}</p>
                </div>
            </div>
            <div>
                <div className='flex justify-between text-lg font-semibold'>
                    <p className='flex-1 text-nowrap'>Total Amount</p>
                    <p className='flex-1 text-right'>{currencyFormat(2500.49)}</p>
                </div>
            </div>
        </div>
    )
}

export default CartSummary