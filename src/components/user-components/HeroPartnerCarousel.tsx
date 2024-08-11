
import React, { useEffect, useState } from 'react'
const HeroPartnerCarousel = () => {


    return (
        <div className='w-full border h-20 mt-20 flex items-center gap-5 bg-gray-300'>
            <div className='bg-primary text-white h-full flex justify-center items-center
            px-16
            '>
                <p className='text-xl font-semibold '>Partners</p>
            </div>
            <div className="carousel carousel-center rounded-box">
                {
                    Array.from({ length: 10 }).map((_, indx) => (
                        <CarouselItem key={indx} indx={indx} partnerName='Holistic' />
                    ))
                }
            </div>
        </div>
    )
}

const CarouselItem = ({ partnerName, indx }: { partnerName: string, indx: number }) => {
    return (
        <div id={`partner-${indx}`} className="carousel-item h-full flex justify-center items-center px-16 text-primary font-semibold text-xl" >
            {partnerName}
        </div>
    )
}

export default HeroPartnerCarousel