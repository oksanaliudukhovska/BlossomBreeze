import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetFiters, setCategoryFilter, setIsMobile, setPriceFilter } from '../redux/slices/plantsslice';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import checkboxEmpty from '../assets/checkboxEmpty1.png'
import checkboxChecked from '../assets/checkboxChecked1.png'

const CollapsibleSectionMobile = ({ title, children }) => {
    return (
        <Disclosure as='div' className='w-full border border-gold/70  text-bezchBase1/60 bg-headerDark mb-4'>
            <DisclosureButton className='group flex items-center justify-between w-full text-start text-xl font-bold px-2 py-1'>
                {title}
                <ChevronDownIcon className='w-6 h-6 group-data-[oren]:rotate-180' />
            </DisclosureButton>
            <DisclosurePanel className='px-2 origin-top font-light text-md'>
                {children}
            </DisclosurePanel>
        </Disclosure>
    )
}
const FiltrosPlantsMobil = () => {

    const isMobile = useSelector((state) => state.plants.isMobile);

    const dispatch = useDispatch();

    const [isActiveCategory, setIsActiveCategory] = useState(null);
    const [isActivePrice, setIsActivePrice] = useState(null);

    const onFilterCaterogyHandler = (category) => {
        dispatch(setCategoryFilter(category))
        setIsActiveCategory(category)
    };
    const onFilterPriceHandler = (price) =>{
        dispatch(setPriceFilter(price))
        setIsActivePrice(price)
    };
    const onResetHandler = () => {
        dispatch(resetFiters())
        setIsActiveCategory(null);
        setIsActivePrice(null)
    }

    return (
        <div>
            {isMobile && (
                <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-headerDark/95 flex flex-col items-center justify-center text-xl font-bold z-50 transition-opacity duration-300 opacity-100 px-4'>
                    <div className='flex flex-col w-full h-full justify-between py-4'>
                        <div>
                        <div className='flex justify-between text-bezchBase1/70 mb-10'>
                            <p>Filtors</p>
                            <XMarkIcon className='w-6 h-6 cursor-pointer' onClick={() => dispatch(setIsMobile(false))} />
                        </div>
                        <div>
                            <CollapsibleSectionMobile title='Category'>
                                <ul className='py-1'>
                                  <li className='flex gap-2 items-center' onClick={() => onFilterCaterogyHandler('blooming')}><img src={`${isActiveCategory === 'blooming' ? checkboxChecked : checkboxEmpty}`} alt="" className='w-6 h-6'/> <span>Bloming</span></li>
                                  <li className='flex gap-2 items-center' onClick={() => onFilterCaterogyHandler('deciduous')}><img src={`${isActiveCategory === 'deciduous' ? checkboxChecked : checkboxEmpty}`} alt="" className='w-6 h-6'/> <span>Foliage</span></li>
                                  <li className='flex gap-2 items-center' onClick={() => onFilterCaterogyHandler('cactus')}><img src={`${isActiveCategory === 'cactus' ? checkboxChecked : checkboxEmpty}`} alt="" className='w-6 h-6'/> <span>Cactus</span></li>
                                </ul>
                            </CollapsibleSectionMobile>
                            <CollapsibleSectionMobile title='Prices'>
                                <ul className='py-1'>
                                <li className='flex gap-2 items-center' onClick={() => onFilterPriceHandler([0, 20]) }><img src={isActivePrice && isActivePrice[0] === 0 && isActivePrice[1] === 20 ? checkboxChecked : checkboxEmpty} alt="" className='w-6 h-6'/> <span>less then 20€</span></li>
                                <li className='flex gap-2 items-center' onClick={() => onFilterPriceHandler([20, 50]) }><img src={isActivePrice && isActivePrice[0] === 20 && isActivePrice[1] === 50 ? checkboxChecked : checkboxEmpty} alt="" className='w-6 h-6'/> <span>20€ - 50€</span></li>
                                <li className='flex gap-2 items-center' onClick={() => onFilterPriceHandler([50, Infinity]) }><img src={isActivePrice && isActivePrice[0] === 50 && isActivePrice[1] === Infinity ? checkboxChecked : checkboxEmpty} alt="" className='w-6 h-6'/> <span>more then 50€</span></li>
                                </ul>
                            </CollapsibleSectionMobile>
                        </div>
                        </div>
                        <div className='w-full justify-between flex'>
                            <button className='bg-white p-4 border border-gold w-[45%]' onClick={() => {dispatch(setIsMobile(false))
                            onResetHandler()    
                            }}>Reset Filtors</button>
                            <button className='p-4 bg-gold text-white/80 border border-white/40 w-[45%]' onClick={() => dispatch(setIsMobile(false))}>Apply Filters</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FiltrosPlantsMobil
