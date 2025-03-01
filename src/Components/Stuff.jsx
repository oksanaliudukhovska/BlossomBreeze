import React, { useEffect, useRef } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamBG from '../assets/stuff/teamBG.jpg'
import stuff1 from '../assets/stuff/stuff1.jpg'
import stuff2 from '../assets/stuff/stuff2.jpg'
import stuff3 from '../assets/stuff/stuff3.jpg'
import banerBG from '../assets/banerBG.jpg'
import PicturesHomeSection from './PicturesHomeSection'

gsap.registerPlugin(ScrollTrigger);

const Stuff = () => {
    const sectionRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { x: 300, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        end: "top 40%",
                        scrub: true
                    }
                }
            );
        });
        return () => ctx.revert();
    }, []);

    const titleBG = {
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), 
        url(${teamBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className='w-full overflow-x-hidden'>
            <div style={titleBG} className='text-white font-corintia px-6 py-20'>
                <h3 className='font-bold py-3 text-center text-3xl'>
                    Our Team – the heart behind the Blooms
                </h3>
                <p className='text-center text-lg'>
                    A passionate group of skilled florists, horticulturists, and creative minds work tirelessly
                    to ensure every arrangement and plant is crafted with care, precision, and love.
                    From sourcing the freshest flowers to designing breathtaking bouquets, our team is dedicated
                    to bringing beauty into your home and life. Together, we share a common mission: to celebrate
                    the art of nature and create memorable experiences for our customers.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-gold font-corintia text-lg px-4 py-20 overflow-x-hidden'>
                {[{ img: stuff1, name: 'Teona', role: 'Plant Care Specialist' },
                { img: stuff2, name: 'Ameli', role: 'Florist' },
                { img: stuff3, name: 'Rada', role: 'Florist' }].map((staff, index) => (
                    <div key={index} className="relative p-4 flex flex-col items-center text-center">
                        <div className="relative w-full max-w-[250px]">
                            <div className="absolute w-[115%] h-[115%] bg-gold/40 -z-10 translate-x-6 translate-y-6"></div>
                            <img src={staff.img} alt={staff.name} className="w-full h-auto" />
                        </div>
                        <p className="text-xl font-bold mt-2">{staff.name}</p>
                        <p className="text-base">{staff.role}</p>
                    </div>
                ))}
            </div>

            {/* about us section */}
            <PicturesHomeSection />

            {/* Текст с анимацией */}
            <div className='w-full flex flex-col gap-10 justify-center items-center py-10' ref={sectionRef}>
                <p ref={contentRef}
                    className="text text-center uppercase font-serif leading-tight"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),url(${banerBG})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    <span className="text-[50px] sm:text-[100px] md:text-[140px] lg:text-[180px]">exclusive</span> <br />
                    <span className="text-[50px] sm:text-[100px] md:text-[140px] lg:text-[180px]">fresh</span> <br />
                    <span className="text-[50px] sm:text-[100px] md:text-[140px] lg:text-[180px]">bouquets</span> <br />
                </p>
            </div>

            <div style={titleBG} className='w-full py-8 text-center text-3xl text-white font-corintia'>
                inspiration day by day
            </div>
        </div>
    );
};

export default Stuff;
