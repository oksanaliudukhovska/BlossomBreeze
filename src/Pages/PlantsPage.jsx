import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { applyFiters, fetchPlants, setIsMobile, setSortOrder } from '../redux/slices/plantsslice';
import { BarsArrowDownIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import square from '../assets/iconsSquare.png'
import square4 from '../assets/icons4Squares.png'
import pets from '../assets/pets.png'
import FiltorsPlantsAsideBar from '../Components/FiltorsPlantsAsideBar';
import Preloader from '../utils/preloader';
import FiltrosPlantsMobil from '../Components/FiltrosPlantsMobil';
import { setViewed } from '../redux/slices/cartSlice';

const PlantsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filteredPlants = useSelector((state) => state.plants.filteredPlants);
    const filters = useSelector((state) => state.plants.filters);
    const loading = useSelector((state) => state.plants.loading);
    const error = useSelector((state) => state.plants.error);
    const isMobile = useSelector((state) => state.plants.isMobile);
    const sortOrder = useSelector((state) => state.plants.filters.sortOrder);
    const [sizeCard, setSizeCard] = useState(true);
    const [isSelectedOpen, setIsSelectedOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchPlants());
    }, [dispatch]);

    useEffect(() => {
        dispatch(applyFiters())
    }, [filters, dispatch]);

    const toggleSizeCard = (size) => {
        setSizeCard(size)
    }

    const handleSortChange = (e) => {
        dispatch(setSortOrder(e.target.value));
    };

    const goToOnePlantPageHandler = (plantId, plant) => {
        navigate(`/plants/${plantId}`);
        dispatch(setViewed(plant))
        console.log(plant);
    }

    const handleSortSelect = (value) => {
        dispatch(setSortOrder(value));
        setIsSelectedOpen(false);
      };
    return (
        <section className='bg-bezchBase1/40 px-6 w-full'>
            <div className='flex gap-10 text-gold container mx-auto py-10'>
                <aside className="hidden sm:flex flex-col gap-10 flex-[1.5]">
                    <FiltorsPlantsAsideBar />
                </aside>
                <main className='flex-[4.5]'>
                    {/* sorting top */}
                    <div className="flex justify-end items-center mb-6">
                        <p className='md:hidden text-lg font-semibold cursor-pointer mx-4 flex justify-center gap-2' >Filtors <AdjustmentsHorizontalIcon className='w-6 h-6' onClick={() => dispatch(setIsMobile(true))} /></p>
                        <div><FiltrosPlantsMobil /></div>
                        <p className="text-lg font-semibold hidden md:block"> Sorting</p>
                        <div className="relative mx-2">
                            <button
                                className="border border-none bg-transparent rounded-lg p-2 font-semibold text-sm md:text-lg flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsSelectedOpen(!isSelectedOpen)}
                            >
                                {sortOrder === "lowToHigh"
                                    ? "Low to High"
                                    : sortOrder === "highToLow"
                                        ? "High to Low"
                                        : "Select order"}
                                <ChevronDownIcon className="w-4 h-4" />
                            </button>

                            {isSelectedOpen && (
                                <div className="absolute z-10 bg-bezchBase3 text-gold font-semibold rounded-sm shadow-lg py-2 px-4 w-[130%] text-sm md:text-lg">
                                    <div
                                        className="p-2 cursor-pointer"
                                        onClick={() => handleSortSelect("lowToHigh")}
                                    >
                                        Low to High
                                    </div>
                                    <div
                                        className="p-2 cursor-pointer"
                                        onClick={() => handleSortSelect("highToLow")}
                                    >
                                        High to Low
                                    </div>
                                </div>
                            )}
                        </div>
                        <BarsArrowDownIcon
                            className="h-6 w-6 text-mint cursor-pointer"
                            onClick={() => {
                                const nextOrder =
                                    sortOrder === 'lowToHigh' ? 'highToLow' : 'lowToHigh';
                                console.log(sortOrder);
                                dispatch(setSortOrder(nextOrder));
                                console.log(nextOrder);
                            }}
                        />
                        <div className="hidden lg:flex items-center space-x-4 ml-4">
                            <img src={square} alt="big card" className="cursor-pointer w-6 lg:w-8" onClick={() => setSizeCard(true)} />
                            <img src={square4} alt="small card" className="cursor-pointer w-6 lg:w-8" onClick={() => setSizeCard(false)} />
                        </div>
                    </div>
                    {loading && <Preloader />}
                    {error && <p>Error</p>}
                    {!loading && !error && (
                        <ul
                            className={`grid gap-4 lg:gap-8 2xl:gap-12 ${sizeCard ? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'}`}
                        >
                            {filteredPlants?.map((plant) => <li key={plant.id} className='flex flex-col relative bg-white cursor-pointer transition-scale duration-300 hover:scale-105 border border-gold1' onClick={() => goToOnePlantPageHandler(plant.id, plant)}>
                                <img src={plant.image} alt={plant.name} />
                                <div className='flex flex-col items-start px-2 bg-white'>
                                    <p className={`w-full block truncate ${sizeCard ? 'text-sm md:text-lg font-semibold' : 'text-sm lg:text-lg font-semibold'}`}>{plant.name}</p>
                                    <p className={`${sizeCard ? 'text-sm md:text-lg' : 'text-xs lg:text-sm'}`}>€ {plant.price} </p>
                                    {plant.toxicity === 'No' && <img src={pets} alt='pest' className='absolute top-1 right-1 w-8' />}
                                </div>
                            </li>)}
                        </ul>
                    )}
                </main>
            </div>
        </section>
    )
}

export default PlantsPage
