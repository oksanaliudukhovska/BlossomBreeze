import React, { useEffect, useRef, useState } from 'react';
import Stuff from '../Components/Stuff';
import homeBaner from '../assets/homePage4.jpg';
import AdvantagesSection from '../Components/Advantegas';
import NavHome from '../Components/NavHome';

const HomePage = () => {

  const [index, setIndex] = useState(0);

  const phrases = [
    "Free shipping on orders over €150",
    "Same-day delivery available",
    "Fresh flowers, handpicked daily",
    "Order before 2 PM for next-day delivery"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-bezchBase1/50 w-full'>
      {/* main banner section */}
      <section className="w-full flex flex-col items-center text-bezchBase1 bg-cover bg-center overflow-hidden" 
        style={{ backgroundImage: `url(${homeBaner})`, backgroundAttachment: 'fixed' }}>
        {/* Text Welcome */}
          <h2 className='uppercase font-sans text-center text-xl md:text-5xl font-light px-10 pt-[20%]'>Create a Stunning Online Home for Your Flower Shop </h2>
          <p className='font-corintia text-sm md:text-3xl w-[70%] text-center py-10 pb-[20%]'>With our Website Rejuvenation approach, we craft beautiful and user-friendly digital spaces that highlight your floral arrangements, enhance your customer experience, and attract flower lovers to your shop.</p>
      </section>
      <div className="bg-bezchBase2 flex justify-center items-center h-10 md:h-16 overflow-hidden relative">
      {phrases.map((phrase, i) => (
        <p
          key={i}
          className={`absolute uppercase text-headerDark/80 font-semibold  text-sm md:text-lg transition-all duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {phrase}
        </p>
      ))}
    </div>
      <div>
        <NavHome />
      </div>
      <div>
        <AdvantagesSection />
      </div>
      <div>
        <Stuff />
      </div>
    </div>
  );
}

export default HomePage;
