import React from 'react';
import poliester from '../assets/poliester.png';
import box from '../assets/box.png';
import boxToy from '../assets/boxToy.png';
import { XCircleIcon } from '@heroicons/react/24/outline';

const Packing = ({ selectedPacking, onTogglePacking }) => {
  const packingOptions = [
    { id: 1, image: poliester, name: 'Eco kraft', price: 4.99 },
    { id: 2, image: box, name: 'Velvet box', price: 14.99 },
    { id: 3, image: boxToy, name: 'Custom packing', price: 39.99 },
  ];

  return (
    <>
      <h4 className="text-greenDark text-xl font-bold mb-3">
        Gift packing see in detail
      </h4>
      <div className="flex gap-6">
        {packingOptions.map((option) => {
          const isSelected = selectedPacking?.id === option.id; // не поняла что это значит 
          return (
            <div
              key={option.id}
              onClick={() => onTogglePacking(option)}
              className="relative flex flex-col items-start w-40 text-greenDark transition-transform duration-500 hover:scale-105 cursor-pointer"
            >
              <div className="w-40 h-40 overflow-hidden">
                <img
                  src={option.image}
                  alt={option.name}
                  className={`object-cover w-full h-full rounded-lg border-2 ${
                    isSelected ? 'border-greenDark' : 'border-transparent'
                  }`}
                />
              </div>
              {isSelected && (
                <XCircleIcon
                  className="w-6 h-6 text-white bg-greenDark rounded-full absolute top-1 right-1 z-10"
                  onClick={(e) => {
                    e.stopPropagation(); // Чтобы клик не вызывал переключение упаковки
                    onTogglePacking(null); // Сброс выбора упаковки
                  }}
                />
              )}
              <p
                className={`${
                  isSelected ? 'font-bold' : 'font-normal'
                } text-lg`}
              >
                {option.name}
              </p>
              <span className="font-bold">{option.price}€</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Packing;
