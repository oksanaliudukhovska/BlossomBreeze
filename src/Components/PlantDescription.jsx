import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'
import temperature from '../assets/temperature.png'
import height from '../assets/height.png'
import petsFriendly from '../assets/petsFriendly.png'
import toxic from '../assets/toxic.png'

const CollapsibleSection = ({ title, children }) => {
    return (
        <Disclosure as='div' className="w-full border-b py-2" defaultOpen>
            <DisclosureButton className="group flex items-center justify-between w-full text-left text-xl font-bold">
                {title}
                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <div className="overflow-hidden py-2 border-b last:border-0">
                <DisclosurePanel transition className="origin-top">
                    {children}
                </DisclosurePanel>
            </div>
        </Disclosure>
    )
}

const PlantDescription = ({ plant }) => {
    return (
        <div className='w-full flex flex-col'>
            <CollapsibleSection title='Properties'>
                <div className='flex gap-4'>
                    <div className='flex flex-col text-sm font-bold justify-center'>
                        <img src={temperature} alt="temperature" className='w-20' />
                       <p className='text-center'>{plant.temperature}</p> 
                    </div>
                    <div className='flex flex-col text-sm font-bold justify-center'>
                        <img src={height} alt="height" className='w-20' />
                        <p className='text-center'>{plant.height}</p>
                    </div>
                    <div className=' font-bold'>
                        {plant.toxicity === 'Yes' 
                        ? (<div><img src = {toxic} alt='toxic' className='w-20'/> <p className='text-center'>Pets</p></div>) 
                        : (<div><img src={petsFriendly} alt='pets friendly' className='w-20'/> <p className='text-center'>Friendly</p> </div>)}
                    </div>
                </div>
            </CollapsibleSection>
            <CollapsibleSection title='Care'>
                <p className='text-lg'>{plant.care}</p>
            </CollapsibleSection>
            <CollapsibleSection title='Propagation'>
                <p className='text-lg' >{plant.propagation}</p>
            </CollapsibleSection>
            <CollapsibleSection title='Description'>
                <p className='text-lg'>{plant.description}</p>
            </CollapsibleSection>
        </div>
    )
}

export default PlantDescription
