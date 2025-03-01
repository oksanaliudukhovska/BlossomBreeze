import React, { useState } from 'react'
import { resetFiters, setCategoryFilter, setPriceFilter } from '../redux/slices/plantsslice';
import { useDispatch } from 'react-redux';
import checkboxEmpty from '../assets/checkboxEmpty1.png'
import checkboxChecked from '../assets/checkboxChecked1.png'

const FiltorsPlantsAsideBar = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [activePrice, setActivePrice] = useState(false);

    const dispatch = useDispatch();

    const onFilterCaterogyHandler = (category) => {
        setActiveCategory(category);
        dispatch(setCategoryFilter(category))
    };
    const onFilterPriceHandler = (priceRange) => {
        setActivePrice(priceRange);
        dispatch(setPriceFilter(priceRange))
    };
    const onResetHandler = () => {
        setActivePrice(null);
        setActiveCategory(null)
        dispatch(resetFiters());
    };


    return (
        <div className='mt-10 2xl:mt-16 flex flex-col gap-8  text-greenDark'>
            <div className='p-5'>
                <h3 className='text-lg lg:text-xl font-bold mb-2'>Filter by Category</h3>
                <div className='flex flex-col gap-3 items-center-center text-lg lg:text-xl'>
                    <button className={`px-7 py-2 lg:py-4 transition-all duration-300 border border-gold hover:scale-105 ${activeCategory === 'blooming' ? 'bg-headerDark/40 font-bold' : 'bg-transparent hover:bg-headerDark/60'}`}
                        onClick={() => onFilterCaterogyHandler('blooming')}>Blooming</button>
                    <button className={`px-7 py-2 lg:py-4 transition-all duration-300 border border-gold hover:scale-105 ${activeCategory === 'deciduous' ? 'bg-headerDark/40 font-bold' : 'bg-transparent hover:bg-headerDark/60'}`} onClick={() => onFilterCaterogyHandler('deciduous')}>Foliage</button>
                    <button className={`px-7 py-2 lg:py-4 transition-all duration-300 border border-gold hover:scale-105 ${activeCategory === 'cactus' ? 'bg-headerDark/40 font-bold' : 'bg-transparent hover:bg-headerDark/60'}`} onClick={() => onFilterCaterogyHandler('cactus')}>Cactus</button>
                </div>
            </div>
            <div className='px-5'>
                <h3 className='text-lg lg:text-xl font-bold mb-2'>Filter by Price</h3>
                <div className='flex flex-col gap-2 items-start'>
                    <div onClick={() => onFilterPriceHandler([0, 20])} className='flex gap-2 items-center cursor-pointer' >
                        <img
                            src={activePrice && activePrice[0] === 0 && activePrice[1] === 20 ? checkboxChecked : checkboxEmpty}
                            alt="Checkbox"
                            className="w-4 lg:w-8"
                        />
                        <p className='text-sm lg:text-lg'>Less than 20€</p>
                    </div>
                    <div onClick={() => onFilterPriceHandler([20, 50])} className='flex gap-2 items-center cursor-pointer' >
                    <img
                            src={activePrice && activePrice[0] === 20 && activePrice[1] === 50 ? checkboxChecked : checkboxEmpty}
                            alt="Checkbox"
                            className="w-4 lg:w-8"
                        />
                        <p className='text-sm lg:text-lg'>20€ - 50€</p>
                    </div>
                    <div onClick={() => onFilterPriceHandler([50, Infinity])} className='flex gap-2 items-center cursor-pointer' >
                    <img
                            src={activePrice && activePrice[0] === 50 && activePrice[1] === Infinity ? checkboxChecked : checkboxEmpty}
                            alt="Checkbox"
                            className="w-4 lg:w-8"
                        />
                        <p className='text-sm lg:text-lg'>More then 50€</p>
                    </div>
                </div>
            </div>
            <button className='w-full text-lg lg:text-xl border text-gold border-bezchDark py-2 lg:py-4 bg-headerDark/90 transition-all duration-300 hover:scale-105 hover:bg-headerDark' onClick={onResetHandler}>Reset all filtros</button>
        </div>
    )
}

export default FiltorsPlantsAsideBar
