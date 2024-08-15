'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'

const QuantityButtons = ({ classNameDiv, classNameButton, actionHandle, quantity }: { classNameDiv?: ClassNameValue, classNameButton?: ClassNameValue, actionHandle: (addOrRemove: boolean) => void, quantity: number }) => {

    return (
        <div className={cn("join w-full border rounded-sm flex items-center ",
            classNameDiv
        )}>
            <button onClick={() => actionHandle(false)} className={cn("join-item inline-flex justify-center items-center p-2 flex-1 btn btn-ghost ",
                classNameButton
            )}>-</button>
            <span className='flex-1 text-center font-semibold select-none'>{quantity}</span>
            <button
                onClick={() => actionHandle(true)}
                className={cn("join-item inline-flex justify-center items-center p-2 flex-1 btn btn-ghost ",
                    classNameButton
                )}>+</button>
        </div>
    )
}

export default QuantityButtons