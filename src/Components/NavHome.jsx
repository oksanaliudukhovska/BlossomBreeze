import React from 'react'
import plantCenter from '../assets/3262be2f584099c0b67340b356048e9b.jpg';
import bouquetCenter from '../assets/d0b4402beac07a0847e2517faf713fa0.jpg';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const NavHome = () => {
    return (
        <div className='w-full py-10 md:py-20'>
            <h2 className='w-full text-center font-corintia text-3xl md:text-4xl text-headerDark/70'>Wonderful gift for every occasion</h2>
            <h3 className='w-full text-center uppercase font-sans text-2xl md:text-3xl text-headerDark/70'>make your choice</h3>

            <div className='flex flex-col lg:flex-row justify-center items-center gap-20 py-10 px-10'>
                <div className='bg-white/30 border border-gold/30 w-[360px] md:w-[500px] '>
                    <div className='relative'>
                        <img src={bouquetCenter} alt="" className='w-full' />
                        <span className='text-white/80  uppercase text-4xl md:text-6xl font-sans absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>bouquets</span>
                    </div>
                    <div className='w-full px-10 py-8 text-headerDark/70 flex flex-col gap-10'>
                        <p>
                            <span className='font-bold font-corintia text-2xl'> The Perfect Gift </span>– a bouquet of flowers expresses emotions better than a thousand words, whether it’s for a celebration, gratitude, or just a thoughtful gesture.
                        </p>
                        <p >
                            <span className='font-bold font-corintia text-2xl'> Creates a Festive Atmosphere </span> – floral arrangements add beauty to any occasion, from birthdays to weddings and anniversaries.
                        </p>
                        <p >
                            <span className='font-bold font-corintia text-2xl'>A Pleasant Surprise for No Reason </span> – flowers are a simple yet meaningful way to show love and care, even without a special occasion.
                        </p>
                        <button className='flex justify-center gap-5 py-4 border border-gold/60 w-full uppercase text-sm md:text-base' >Find Your Perfect Bouquet <ArrowRightIcon className='w-6' /></button>
                    </div>
                </div>
                <div className='bg-white/30 border border-gold/30 w-[360px] md:w-[500px]'>
                    <div className='relative'>
                        <img src={plantCenter} alt="" className='w-full h-auto' />
                        <span className='text-white/80  uppercase text-4xl md:text-6xl font-sans absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>homeplants</span>
                    </div>
                    <div className='w-full px-10 py-8 text-headerDark/70 flex flex-col gap-10'>
                        <p > <span className='font-bold font-corintia text-2xl'>Enhances Interior Design </span> – Fresh flowers bring warmth and elegance, making any space feel cozy and inviting.</p>
                        <p > <span className='font-bold font-corintia text-2xl'>Boosts Mood </span> – Studies show that flowers have a positive effect on emotions and help reduce stress.</p>
                        <p className='mb-12'> <span className='font-bold font-corintia text-2xl'>Good for Health </span>– Some houseplants purify the air and increase oxygen levels, creating a healthier environment.</p>
                        <button className='flex justify-center gap-5 py-4 border border-gold/60 w-full uppercase text-sm md:text-base' >Grow Your Indoor Oasis <ArrowRightIcon className='w-6' /></button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NavHome
