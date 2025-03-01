import React, { Children } from 'react'
import calendar from '../assets/calendar.png'
import aroma from '../assets/aroma.png'
import flower from '../assets/flower.png'
import iconComposition from '../assets/iconComposition.png'
import { ChevronDownIcon} from '@heroicons/react/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

const renderCircles = (value) => {
    const maxCircles = 5;
    return Array.from({ length: maxCircles }).map((_, index) => (
        <span
            key={index}
            className={`w-2 h-2 rounded-full border-solid border border-greenDark ${index < value ? "bg-greenDark" : "bg-transparent"
                } mx-1`}
        ></span>
    ));
};

const CollapsibleSection = ({ title, children }) => {
    return (
        <Disclosure as="div" className="w-full border-b py-2" defaultOpen>
        <DisclosureButton className="group flex items-center justify-between w-full text-left text-xl font-bold">
            {title}
            <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <div className="py-2 border-b border-gray-300 last:border-0">
          <DisclosurePanel
            // transition
            className="origin-top transition-[height] duration-200 ease-in-ou"
          >
           {children}
          </DisclosurePanel>
        </div>
      </Disclosure>
    )
};

const BouquetDescription = ({ bouquet }) => {
    return (
        <div className='flex flex-col gap-1 '>
            <CollapsibleSection title='Properties'>
                <div className='flex text-lg'>
                    <div className='flex flex-col items-center mr-5'>
                        <img src={calendar} className='w-20' />
                        <div className="flex items-center py-1">
                            {renderCircles(bouquet.durability)}
                        </div>
                        Durability
                    </div>
                    <div className='flex flex-col items-center mr-5'>
                        <img src={aroma} className='w-20' />
                        <div className="flex items-center py-1">
                            {renderCircles(bouquet.fragrance)}
                        </div>
                        Fragrance
                    </div>
                    <div className='flex flex-col items-center mr-5'>
                        <img src={flower} className='w-20' />
                        <div className="flex items-center py-1">
                            {renderCircles(bouquet.resistance)}
                        </div>
                        Resistance
                    </div>
                </div>
            </CollapsibleSection>
            <CollapsibleSection title='Composition of the bouquet'>
                {bouquet.composition.map((flower, idx) =>  <li key={idx} className='flex items-center'>
                <img src={iconComposition} alt="" className='w-6 h-6 mr-3' />  
                <span key={idx}> {flower}</span>
                </li>
               )}
            </CollapsibleSection>
            <CollapsibleSection title='Colors'>
                {bouquet.color.map((item, idx) => 
                <span key={idx}
                  className="inline-block mr-4 w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: item }}
                ></span>)}
            </CollapsibleSection>
            <CollapsibleSection title='Description'>
                <p className='text-lg'>{bouquet.description}</p>
            </CollapsibleSection>
            <CollapsibleSection title='Size'>
                <p className='text-lg'>Weight:  {bouquet.weight}</p>
                <p className='text-lg'>Dimensions: {bouquet.dimensions}</p>
            </CollapsibleSection>
        </div>
    )
}

export default BouquetDescription
