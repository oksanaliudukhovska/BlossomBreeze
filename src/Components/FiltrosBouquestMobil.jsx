import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import checkboxEmpty from '../assets/checkboxEmpty1.png'
import checkboxChecked from '../assets/checkboxChecked1.png'
import { applyFilters, resetFilters, setColorFilter, setFlowerFilter, setIsMobile, setPriceFilterBouquets } from '../redux/slices/bouquetsSlice';
import namer from 'color-namer';

const CollapsibleBouquestSectionMobile = ({ title, children }) => {
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
const FiltrosBouquestMobil = () => {
 
  const getColorName = (rgbString) => {
    if (typeof rgbString !== 'string') return 'Unknown'; 
    const rgbArray = rgbString.match(/\d+/g);
    if (!rgbArray || rgbArray.length !== 3) return 'Unknown'; 
    const rgbNumbers = rgbArray.map(Number);
    const hex = `#${rgbNumbers.map(c => c.toString(16).padStart(2, '0')).join('')}`;
    const namedColor = namer(hex);
    return namedColor.ntc[0].name; 
};

  const isMobile = useSelector((state) => state.bouquets.isMobile);
  const color = useSelector((state) => state.bouquets.color);
  const composition = useSelector((state) => state.bouquets.composition)
  const dispatch = useDispatch();
  const [isActiveColor, setIsActiveColor] = useState(null);
  const [isActiveFlower, setIsActiveFlower] = useState(null);
  const [isActivePrice, setIsActivePrice] = useState(null);

   const onFilterColorHandler = (color) => {
        dispatch(setColorFilter([color]))
        dispatch(applyFilters())
        setIsActiveColor(color)
    };

  const onFilterFlowersHandler = (flower) => {
    dispatch(setFlowerFilter([flower]))
    dispatch(applyFilters())
    setIsActiveFlower(flower)
  }
  const onFilterPriceHandler = (price) => {
    dispatch(setPriceFilterBouquets(price))
    setIsActivePrice(price)
  };
  const onResetHandler = () => {
    dispatch(resetFilters())
    setIsActiveColor(null);
    setIsActiveFlower(null)
    setIsActivePrice(null)
  }
  return (
    <div>
      {isMobile && (
        <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-headerDark/95 flex flex-col items-center justify-center text-xl font-bold z-50 transition-opacity duration-300 opacity-100 px-4 overflow-y-auto'>
          <div className='flex flex-col w-full h-full justify-between py-4'>
            <div>
              <div className='flex justify-between text-bezchBase1/70 mb-10'>
                <p>Filtors</p>
                <XMarkIcon className='w-6 h-6 cursor-pointer' onClick={() => dispatch(setIsMobile(false))} />
              </div>
              <div>
                <CollapsibleBouquestSectionMobile title='Prices'>
                  <ul className='py-1'>
                    <li className='flex gap-2 items-center' onClick={() => onFilterPriceHandler([0, 40])}><img src={isActivePrice && isActivePrice[0] === 0 && isActivePrice[1] === 40 ? checkboxChecked : checkboxEmpty} alt="" className='w-6 h-6' /> <span>less then 40€</span></li>
                    <li className='flex gap-2 items-center' onClick={() => onFilterPriceHandler([40, 60])}><img src={isActivePrice && isActivePrice[0] === 40 && isActivePrice[1] === 60 ? checkboxChecked : checkboxEmpty} alt="" className='w-6 h-6' /> <span>40€ - 60€</span></li>
                    <li className='flex gap-2 items-center' onClick={() => onFilterPriceHandler([60, Infinity])}><img src={isActivePrice && isActivePrice[0] === 60 && isActivePrice[1] === Infinity ? checkboxChecked : checkboxEmpty} alt="" className='w-6 h-6' /> <span>more then 60€</span></li>
                  </ul>
                </CollapsibleBouquestSectionMobile>
                <CollapsibleBouquestSectionMobile title='Color'>
                  <ul className='py-1'>
                  {color.map((item, index) => ( <li key={index} className='flex gap-2 items-center' onClick={() => onFilterColorHandler(item)}><img src={`${isActiveColor && isActiveColor === item ? checkboxChecked : checkboxEmpty}`} alt="" className='w-6 h-6' /> <span>{getColorName(item)}</span></li>))}
                  </ul>
                </CollapsibleBouquestSectionMobile>
                <CollapsibleBouquestSectionMobile title='Composition'>
                  <ul className='py-1'>
                  {composition.map((item, index) => ( <li key={index} onClick={() => onFilterFlowersHandler(item)} className='flex gap-2 items-center' ><img 
                  src={`${isActiveFlower && isActiveFlower === item ? checkboxChecked : checkboxEmpty}`} 
                  alt="" className='w-6 h-6' /> <span>{item}</span></li>))}
                  </ul>
                </CollapsibleBouquestSectionMobile>
              </div>
            </div>
            <div className='w-full justify-between flex'>
              <button className='bg-white p-4 border border-gold w-[45%]' onClick={() => {
                dispatch(setIsMobile(false))
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

export default FiltrosBouquestMobil

