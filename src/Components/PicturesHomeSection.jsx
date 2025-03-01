import React, { useEffect, useRef } from 'react';
import description1 from '../assets/stuff/description1.jpg';
import description2 from '../assets/stuff/description2.jpg';
import description3 from '../assets/stuff/description3.jpg';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PicturesHomeSection = () => {
    const sectionRef = useRef(null);
    const contentRefs = useRef([]);

    useEffect(() => {
        contentRefs.current = contentRefs.current.filter(el => el);

        let ctx = gsap.context(() => {
            contentRefs.current.forEach((item, i) => {
                const isImage = item.classList.contains('image-block');

                gsap.fromTo(
                    item,
                    { 
                        opacity: 0, 
                        x: isImage ? (i % 2 === 0 ? -100 : 100) : 0, 
                        y: isImage ? 0 : 100 
                    },
                    { 
                        opacity: 1, 
                        x: 0, 
                        y: 0, 
                        duration: 1, 
                        scrollTrigger: {
                            trigger: item,
                            toggleActions: 'play none none reverse',
                            start: 'top 85%',
                            once: false,
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const getBackgroundStyle = (image) => ({
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    });

    return (
        <section ref={sectionRef} className='gap-0 container mx-auto text-gold/80 border-y-2 border-gold/40 py-20'>
            {/* first row */}
            <div className='flex flex-col lg:flex-row'>
                <div ref={(el) => { if (el) contentRefs.current.push(el); }} className='text-block flex flex-col justify-center items-center text-bold gap-4 p-6 w-full lg:w-[50%]'>
                    <p className='text-3xl font-corintia font-bold'>Enchanting Present</p>
                    <p className='uppercase text-xl font-semibold'>For nature enthusiasts. All you desire</p>
                    <p className='text-gold/60'>
                        Discover the perfect blend of elegance and charm with our unique floral creations. Every bouquet is crafted to bring joy and beauty to any occasion.
                    </p>
                </div>

                <div ref={(el) => { if (el) contentRefs.current.push(el); }} style={getBackgroundStyle(description2)} className='image-block w-full lg:w-[50%] h-[400px] bg-cover bg-center flex justify-center items-center text-bezchBase2'>
                    <p className='text-6xl font-corintia font-bold text-center'>Enchanting <br /> Present</p>
                </div>
            </div>

            {/* second row */}
            <div className='flex flex-col lg:flex-row-reverse'>
                <div ref={(el) => { if (el) contentRefs.current.push(el); }} className='text-block flex flex-col justify-center items-center text-bold gap-4 p-6 w-full lg:w-[50%]'>
                    <p className='text-3xl font-corintia font-bold'>Blossom Energy</p>
                    <p className='uppercase text-xl font-semibold'>For those who adore blooms. The ultimate pick</p>
                    <p className='text-gold/60'>
                        Let the vibrant energy of blossoms inspire your day. Perfect for celebrations, gifts, or simply brightening your space.
                    </p>
                </div>

                <div ref={(el) => { if (el) contentRefs.current.push(el); }} style={getBackgroundStyle(description1)} className='image-block w-full lg:w-[50%] h-[400px] bg-cover bg-center flex justify-center items-center text-bezchBase2'>
                    <p className='text-6xl font-corintia font-bold text-center'>Blossom <br /> Energy</p>
                </div>
            </div>

            {/* third row */}
            <div className='flex flex-col lg:flex-row'>
                <div ref={(el) => { if (el) contentRefs.current.push(el); }} className='text-block flex flex-col justify-center items-center text-bold gap-4 p-6 w-full lg:w-[50%]'>
                    <p className='text-3xl font-corintia font-bold'>Purely Enchanting</p>
                    <p className='uppercase text-xl font-semibold'>For floral admirers. Perfect for every moment</p>
                    <p className='text-gold/60'>
                        Experience the timeless beauty of flowers with our carefully curated collections, designed to leave a lasting impression.
                    </p>
                </div>

                <div ref={(el) => { if (el) contentRefs.current.push(el); }} style={getBackgroundStyle(description3)} className='image-block w-full lg:w-[50%] h-[400px] bg-cover bg-center flex justify-center items-center text-bezchBase2'>
                    <p className='text-6xl font-corintia font-bold text-center'>Purely <br /> Enchanting</p>
                </div>
            </div>
        </section>
    );
};

export default PicturesHomeSection;
