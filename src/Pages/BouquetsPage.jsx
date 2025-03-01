import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { BarsArrowDownIcon, FaceFrownIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import square from '../assets/iconsSquare.png'
import square4 from '../assets/icons4Squares.png'
import local from '../assets/local.png'
import best from '../assets/best.png'
import { useNavigate } from 'react-router-dom'
import { applyFilters, fetchBouquets, setIsMobile, setSortOrderBouquets } from "../redux/slices/bouquetsSlice";
import FiltrosBouquetsAsideBar from "../Components/FiltrosBouquestAsideBar";
import Preloader from "../utils/preloader";
import FiltrosBouquestMobil from "../Components/FiltrosBouquestMobil";
import { setViewed } from "../redux/slices/cartSlice";

const Bouquets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredBouquets = useSelector((state) => state.bouquets.filteredBouquets);
  const filters = useSelector((state) => state.bouquets.filters);
  const isMobile = useSelector((state) => state.bouquets.isMobile);
  const sortOrderBouquets = useSelector((state) => state.bouquets.filters.sortOrderBouquets);
  const loading = useSelector((state) => state.bouquets.loading);
  const error = useSelector((state) => state.bouquets.error);
  const [sizeCard, setSizeCard] = useState(true);
  const [isSelectedOpen, setIsSelectedOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBouquets())
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters())
  }, [filters, dispatch])

  const goToOneBouquetPageHandler = (bouquetId, bouquet) => {
    navigate(`/bouquets/${bouquetId}`)
     dispatch(setViewed(bouquet))
  }

  const handleSortSelect = (value) => {
    dispatch(setSortOrderBouquets(value));
    setIsSelectedOpen(false);
  };
  return (
    <section className='bg-bezchBase1/40 text-gold py-10 px-6 w-full'>
    <div className="mx-auto container">
      <div className="flex gap-8">
        {/* filtros left */}
        <aside className="flex-[1.5] hidden sm:flex">
          <FiltrosBouquetsAsideBar />
        </aside>
        <main className="flex-[4.5]">
          {/* <h2 className="text-3xl font-semibold">Bouquets</h2> */}
          {/* sorting top */}
          <div className="flex justify-end items-center mb-6">
          <p className='md:hidden text-lg font-semibold cursor-pointer mx-4 flex justify-center gap-2'>Filtors <AdjustmentsHorizontalIcon className='w-6 h-6' onClick={() => dispatch(setIsMobile(true))}/></p>
          <div><FiltrosBouquestMobil/></div>
            <p className="text-lg font-semibold hidden md:block"> Sorting</p>
            <div className="relative mx-2">
                <button
                  className="border border-none bg-transparent rounded-lg p-2 font-semibold text-sm md:text-lg flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsSelectedOpen(!isSelectedOpen)}
                >
                  {sortOrderBouquets === "lowToHigh"
                    ? "Low to High"
                    : sortOrderBouquets === "highToLow"
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
                  sortOrderBouquets === 'lowToHigh' ? 'highToLow' : 'lowToHigh';
                console.log(sortOrderBouquets);
                dispatch(setSortOrderBouquets(nextOrder));
                console.log(nextOrder)
              }}
            />
            <div className="hidden lg:flex items-center space-x-4 ml-4">
              <img src={square} alt="big card" className="cursor-pointer w-6 lg:w-8" onClick={() => setSizeCard(true)} />
              <img src={square4} alt="small card" className="cursor-pointer w-6 lg:w-8" onClick={() => setSizeCard(false)} />
            </div>
          </div>
          {loading && <Preloader/>}
          {error && <p>Error</p>}
          {!loading && !error && (
            filteredBouquets.length > 0 ? (
              <ul
              className={`grid gap-4 lg:gap-8 2xl:gap-12 ${sizeCard ? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'}`}
            >
                {filteredBouquets.map((bouquet) => (
                  <li key={bouquet.id} className="relative group cursor-pointer bg-white/50 rounded-br-lg rounded-bl-lg" onClick={() => goToOneBouquetPageHandler(bouquet.id, bouquet)}>
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={bouquet.image}
                        alt={bouquet.name}
                        className="w-full h-auto object-contain transition-opacity duration-300 group-hover:opacity-100"
                      />
                      <img
                        src={bouquet.image_hover}
                        alt={bouquet.name}
                        className="absolute top-0 left-0 w-full h-auto object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                      {bouquet.bestseller && (
                        <div className="text-sm font-bold absolute top-1 right-1 flex items-center bg-white/40  rounded-lg p-1 xl:p-2">
                          best seller <img src={best} alt="" className="w-4 xl:w-6" />
                        </div>
                      )}
                      {bouquet.local && (
                        <div className="text-sm font-bold absolute top-1 left-1 flex items-center bg-gold/20 rounded-lg p-1 xl:p-2">
                          local <img src={local} alt="" className="w-4 xl:w-6" />
                        </div>
                      )}
                    </div>
                    <div className={`${sizeCard ? 'flex items-center justify-between p-2' : 'flex flex-col px-2'}`}>
                      <h2 className="mt-0.5 text-sm md:text-lg font-semibold text-start w-full block truncate">{bouquet.name}</h2>
                      <p className="text-sm md:text-lg ">{bouquet.price}€</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className=" flex justify-center items-center w-full text-lg font-semibold text-center py-10">
              <FaceFrownIcon className="w-6 h-6 mr-2"/>  Sorry, no products match your search. Please adjust the filters and try again...
              </p>
            )
          )}
        </main>

      </div>
    </div>
    </section>
  );
};

export default Bouquets;
