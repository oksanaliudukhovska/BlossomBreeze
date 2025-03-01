import React, { useState } from 'react'
import checkboxEmpty from '../assets/checkboxEmpty1.png'
import checkboxChecked from '../assets/checkboxChecked1.png'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, resetFilters, setColorFilter, setFlowerFilter, setPriceFilterBouquets } from '../redux/slices/bouquetsSlice'

const FiltrosBouquetsAsideBar = () => {

  const color = useSelector((state) => state.bouquets.color);
  const composition = useSelector((state) => state.bouquets.composition);
 
  const [activeColor, setActiveColor] = useState(null);
  const [activeFlower, setActiveFlower] = useState(null);
  const [activePrice, setActivePrice] = useState(false);
  const dispatch = useDispatch();
  
  const onFilterPriceHandler = (priceRange) => {
    setActivePrice(priceRange);
    dispatch(setPriceFilterBouquets(priceRange));
    dispatch(applyFilters())
  }

  const onFilterFlowersHandler = (selectedFlower) => {
    setActiveFlower(selectedFlower);
    dispatch(setFlowerFilter([selectedFlower]))
    dispatch(applyFilters())
  }

  const onFilterColorHandler = (selectedColor) => {
    setActiveColor(selectedColor);
    dispatch(setColorFilter([selectedColor]));
    dispatch(applyFilters());
};

  const onResetHandler = () => {
    setActiveFlower(null);
    setActiveColor(null);
    setActivePrice(null);
    dispatch(resetFilters());
  }
  return (
    <div className='mt-10 lg:mt-20 flex flex-col gap-4 text-greenDark'>
      <div className='px-5 border-b border-greyLight pb-3'>
        <h3 className='text-lg lg:text-xl font-bold mb-3'>Filter by Price</h3>
        <div className='flex flex-col gap-2 items-start font-semibold'>
          <div className='flex gap-2 items-center cursor-pointer' onClick={() => onFilterPriceHandler([0, 40])}>
            <img src={activePrice && activePrice[0] === 0 && activePrice[1] === 40 ? checkboxChecked : checkboxEmpty} alt="" className="w-4 lg:w-8" />
            <p className='text-sm lg:text-lg'>Less than 40€</p>
          </div>
          <div className='flex gap-2 items-center cursor-pointer'  onClick={() => onFilterPriceHandler([40, 60])}>
            <img src={activePrice && activePrice [0] === 40 && activePrice[1] === 60 ? checkboxChecked : checkboxEmpty} alt="" className="w-4 lg:w-8" />
            <p className='text-sm lg:text-lg'>40€ - 60€</p>
          </div>
          <div className='flex gap-2 items-center cursor-pointer'  onClick={() => onFilterPriceHandler([60, Infinity])}>
            <img src={activePrice && activePrice[0] === 60 && activePrice[1] === Infinity ? checkboxChecked : checkboxEmpty} alt="" className="w-4 lg:w-8" />
            <p className='text-sm lg:text-lg'>More then 60€</p>
          </div>
        </div>
      </div>
      <div className='px-5 border-b border-greyLight pb-3'>
        <h3 className='text-lg lg:text-xl font-bold mb-3'>Filter by Colors</h3>
        <ul className="flex flex-wrap gap-2">
          {color.map((item, index) => (
            <li
            key={index}
            className={`w-8 h-8 rounded-full border border-greyLight cursor-pointer ${activeColor === item ? 'shadow-lg shadow-greenBase' : ''}`}
            style={{ backgroundColor: item }}
            onClick={() => { onFilterColorHandler(item); setActiveColor(item); }}
          ></li>
            
          ))}
        </ul>
      </div>
      <div className='px-5'>
        <h3 className='text-lg lg:text-xl font-bold mb-3'>Filter by Flowers</h3>
        <ul>
          {composition.map((flower, index) => <li key={index} className='flex items-center gap-2 text-lg cursor-pointer' onClick={() => onFilterFlowersHandler(flower)}>
            <img src={activeFlower && activeFlower === flower ? checkboxChecked : checkboxEmpty} className='w-4 lg:w-8' />
            <span className='text-sm lg:text-lg'>{flower}</span>
          </li>)}
        </ul>
      </div>
      <button className='w-full text-xl border text-gold border-bezchDark py-4 bg-headerDark/90 transition-all duration-300 hover:scale-105 hover:bg-headerDark' onClick={onResetHandler}>Reset all filtros</button>
    </div>
  )
}

export default FiltrosBouquetsAsideBar;
