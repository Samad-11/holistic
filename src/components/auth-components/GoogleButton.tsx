import React from 'react'
import { FaGoogle } from 'react-icons/fa6'

const GoogleButton = ({ text = "Using google" }: { text?: string }) => {
    return (
        <button
            type='button'
            className='btn btn-accent text-white font-semibold text-lg'
            onClick={async () => {
                // const res = await signIn("google", { callbackUrl: "/" })

            }}
        >
            <FaGoogle fill='white' />
            {text}</button>
    )
}

export default GoogleButton