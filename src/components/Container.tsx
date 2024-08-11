import React, { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className='max-w-6xl mx-auto sm:px-10 px-5 '>
            {
                children
            }
        </div>
    )
}

export default Container