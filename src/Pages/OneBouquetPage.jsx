import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBouquetByID } from '../redux/slices/oneBouquetSlice';
import { useNavigate, useParams } from 'react-router';
import { ArrowRightIcon, ArrowLeftIcon, InformationCircleIcon, TruckIcon, ExclamationTriangleIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SwiperFlowers from '../Components/SwiperFlowers';
import BouquetDescription from '../Components/BouquetDescription';
import { addToCart } from '../redux/slices/cartSlice';
import Preloader from '../utils/preloader';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OneBouquetPage = () => {
  const bouquet = useSelector((state) => state.oneBouquet.bouquet);
  const filteredBouquets = useSelector((state) => state.bouquets.filteredBouquets)
  const loading = useSelector((state) => state.oneBouquet.loading);
  const error = useSelector((state) => state.oneBouquet.error);
   const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { bouquetId } = useParams();
  const [selectedPacking, setSelectedPacking] = useState(null);

  useEffect(() => {
    dispatch(fetchBouquetByID(bouquetId))
  }, [dispatch, bouquetId])

  if (loading) return <Preloader/>;
  if (error) return <p>Error: {error}</p>

  const currentIndex = filteredBouquets.findIndex((item) => item.id === bouquetId);

  const previousBouquet = currentIndex > 0 ? filteredBouquets[currentIndex - 1] : null;
  const nexBouquet = currentIndex < filteredBouquets.length - 1
    ? filteredBouquets[currentIndex + 1] : null;

  const previousItemHandler = () => {
    if (previousBouquet) {
      navigate(`/bouquets/${previousBouquet.id}`)
    }
  }
  const nextItemHandler = () => {
    if (nexBouquet) {
      navigate(`/bouquets/${nexBouquet.id}`)
    }
  }

  const toastAddToCart = () => {
    toast.success(
      <div className="flex items-center gap-2">
        {user 
               ? ( <><CheckCircleIcon className="w-6 h-6 text-[rgb(115,80,0)]" /> 
                  <span>Successfully added to cart</span></>)
               : (<><ExclamationTriangleIcon className="w-6 h-6 text-[rgb(115,80,0)]" /> 
                 <span>Please sign in</span></>)
               }
      </div>,
      {
        position: "top-right",
        theme: "light",
        icon: false, //checkicon green off
        hideProgressBar: true, // БЕГУНОК green off
        autoClose: 1000,
        style: {
          backgroundColor: "rgb(238, 217, 192)", 
          color: "rgb(115, 80, 0)", 
          border: "1px solid rgb(115, 80, 0)", 
        },
      }
    );
  };
  
  const addToCartHandler = (bouquet) => {
    dispatch(addToCart({
      item: bouquet,
      type: 'bouquet',
      additionalOptions: { packing: selectedPacking }
    }));
    toastAddToCart()
  };

  return (
    <div className='w-full bg-bezchBase1/30 text-gold'>
      {bouquet ? (
        <div className='px-6 lg:px-12'>
          <div className='flex justify-between py-4 font-semibold text-lg'>
            <span className={`flex items-center cursor-pointer ${previousBouquet ? '' : 'opacity-50 pointer-events-none'}`} onClick={previousItemHandler}> <ArrowLeftIcon className='w-6 h-6 mr-3' />Previous bouquet</span>
            <span className={`flex items-center cursor-pointer ${nexBouquet ? '' : 'opacity-50 pointer-events-none'}`} onClick={nextItemHandler}>Next bouquet <ArrowRightIcon className='w-6 h-6 ml-3' /></span>
          </div>
          <div className='flex flex-col md:flex-row gap-6 xl:gap-20'>
            <div className='w-full md:w-1/2 xl:w-1/2 2xl:w-2/6'>
            <SwiperFlowers bouquet={bouquet} />
              {/* <img src={bouquet.image} alt="" /> */}
            </div>
            <div className='flex justify-between w-full md:w-1/2 xl:w-1/2 2xl:w-4/6 flex-col gap-4'>
             <div>
             <h2 className='text-3xl font-semibold'>{bouquet.name}</h2>
             <span className="block text-xl py-3">{bouquet.price}€</span>
             </div>
              <div>
                <h2 className='py-1 font-semibold'>Available Packing</h2>
                {bouquet.packing && bouquet.packing.length > 0 ? (
                  <ul className="flex gap-6">
                    {bouquet.packing.map((pack) => (
                      <li key={pack.id}
                        onClick={() => setSelectedPacking(pack)}
                        className={`relative flex flex-col items-center cursor-pointer transition-scale duration-300 hover:scale-105 ${selectedPacking?.id === pack.id ? 'border border-gold' : ''
                          }`}>
                        <img
                          src={pack.image}
                          alt={pack.name}
                          className="object-cover w-[200px] h-auto "
                        />
                        <span className='absolute top-1 right-1 w-5' onClick={(e) => {e.stopPropagation(); setSelectedPacking(null)}}><XMarkIcon/></span>
                        <p>{pack.name}</p>
                        <p>Price: €{pack.price}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No packing options available.</p>
                )}
              </div>
              <div className=' font-semibold'>
                <h4 className='text-lg font-semibold mb-3'>Pay your Attention</h4>
                <div className='flex items-center py-4 px-2 bg-bezchDark/20 rounded-lg mb-2 transition-translate duration-500 hover:translate-x-3'> <InformationCircleIcon className='w-6 h-6 mx-3 text-lg' /> <p>Since each stem is unique, the colors or flowers used may vary from those in the photo.</p></div>
                <div className='flex items-center py-4 px-2 bg-bezchBase/50 rounded-lg mb-2 transition-translate duration-500 hover:translate-x-3'>
                  <ExclamationTriangleIcon className='w-6 h-6 mx-3 text-lg' />
                  <p>Toxic flower for some pets.</p>
                </div>
                <div className='flex items-center py-4 px-2 bg-bezchBase1/90 rounded-lg mb-2 transition-translate duration-500 hover:translate-x-3'>
                  <TruckIcon className='w-6 h-6 mx-3 text-lg' />
                  <p>Free shipping on purchases over €150.</p>
                </div>
              </div>
              <button className='uppercase border border-gold py-4 px-6 font-bold w-full cursor-pointer'
                onClick={() => addToCartHandler(bouquet)}
                // disabled={!selectedPacking && bouquet.packing.length > 0}
              >
                Add to cart €{(parseFloat(bouquet.price) + parseFloat(selectedPacking?.price || 0)).toFixed(2)}
              </button>
            </div>
          </div>
          <div className='w-full my-4'>
            <BouquetDescription bouquet={bouquet} />
          </div>
        </div>
      ) : (
        <p>Bouquet was not found</p>
      )}
    </div>
  )
}

export default OneBouquetPage
