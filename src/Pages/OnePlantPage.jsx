import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlantById } from '../redux/slices/onePlantslice';
import { useNavigate, useParams } from 'react-router';
import { ArrowRightIcon, ArrowLeftIcon, InformationCircleIcon, TruckIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import PlantDescription from '../Components/PlantDescription';
import Preloader from '../utils/preloader';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OnePlantPage = () => {

  const plant = useSelector((state) => state.onePlant.plant);
  const filteredPlants = useSelector((state) => state.plants.filteredPlants);
  const loading = useSelector((state) => state.onePlant.loading);
  const error = useSelector((state) => state.onePlant.error);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { plantId } = useParams();
  console.log(plantId);

  useEffect(() => {
    dispatch(fetchPlantById(plantId))
  }, [dispatch, plantId]);

  if (loading) return <Preloader />
  if (error) return <p>{error}</p>

  const currentIndex = filteredPlants.findIndex((item) => item.id === plantId);

  const previousPlant = currentIndex > 0 ? filteredPlants[currentIndex - 1] : null;
  const nextPlant = currentIndex < filteredPlants.length - 1 ? filteredPlants[currentIndex + 1] : null;

  const previousItemHandler = () => {
    if (previousPlant) {
      navigate(`/plants/${previousPlant.id}`)
    }
  }
  const nextItemHandler = () => {
    if (nextPlant) {
      navigate(`/plants/${nextPlant.id}`)
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
  const addToCartHandler = (plant) => {
    dispatch(addToCart({
      item: plant,
      type: 'plant',
      additionalOptions: null
    }));
    toastAddToCart()
  };
  return (
    <div className='bg-bezchBase1/20 w-full text-gold'>
      {plant ? (
        <div className='px-8'>
          <div className='flex justify-between py-4 font-semibold text-lg' >
            <span className={`flex items-center cursor-pointer ${previousPlant ? '' : 'opacity-50 pointer-events-none'}`} onClick={previousItemHandler}> <ArrowLeftIcon className='w-6 h-6 mr-3' />Previous bouquet</span>
            <span className={`flex items-center cursor-pointer ${nextPlant ? '' : 'opacity-50 pointer-events-none'}`} onClick={nextItemHandler}>Next bouquet <ArrowRightIcon className='w-6 h-6 ml-3' /></span>
          </div>
          <div>
            <div className='flex flex-col lg:flex-row gap-6'>
              <img src={plant.image} alt={plant.name} className='w-[500px]' />
              <div className='flex flex-col justify-between'>
                <h2 className='text-3xl  font-semibold'>{plant.name}</h2>
                <div className=' font-semibold'>
                  <h4 className=' text-lg font-semibold mb-3'>Pay your Attention</h4>
                  <div className='flex items-center py-4 px-2 bg-bezchDark/20 rounded-lg mb-2 transition-translate duration-500 hover:translate-x-3'> <InformationCircleIcon className='w-6 h-6 mx-3 text-lg' /> <p>Since each stem is unique, the colors or flowers used may vary from those in the photo.</p></div>
                  <div className='flex items-center py-4 px-2 bg-bezchBase/50 rounded-lg mb-2 transition-translate duration-500 hover:translate-x-3 '>
                    <ExclamationTriangleIcon className='w-6 h-6 mx-3 text-lg' />
                    <p>{plant.toxicity === 'Yes' ? 'Toxic flower for some pets' : 'Pets friendly'}</p>
                  </div>
                  <div className='flex items-center py-4 px-2 bg-bezchBase1/90 rounded-lg mb-2 transition-translate duration-500 hover:translate-x-3'>
                    <TruckIcon className='w-6 h-6 mx-3 text-lg' />
                    <p>Free shipping on purchases over €150.</p>
                  </div>
                </div>
                <button className='uppercase border border-gold py-4 px-6 my-6 font-bold w-full cursor-pointer' onClick={() => addToCartHandler(plant)}>
                  Add to cart €{plant.price}
                </button>
              </div>
            </div>
            <div className='w-full'>
              <PlantDescription plant={plant} />
            </div>
          </div>

        </div>
      ) : (<p>Plant was not found</p>)}
    </div>
  )
}

export default OnePlantPage
