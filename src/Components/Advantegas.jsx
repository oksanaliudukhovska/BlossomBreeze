import React, { useEffect, useRef } from 'react';
import iconTruck from '../assets/iconTruck.png';
import iconThumb from '../assets/iconThumb.png';
import iconTrash from '../assets/iconTrash.png';
import iconBouquet from '../assets/iconBouquet.png';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  { icon: iconBouquet, text: "Extra fresh flowers" },
  { icon: iconTrash, text: "30% less waste" },
  { icon: iconTruck, text: "Fast shipping" },
  { icon: iconThumb, text: "Fair prices for flower growers" },
];

const AdvantagesSection = () => {
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, 
          start: "top 90%", 
        }
      });

      imgRefs.current.forEach((img, i) => {
        tl.fromTo(
          img,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1,  duration: 0.2}
        );
      });

      textRefs.current.forEach((text, i) => {
        tl.fromTo(
          text,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.2},
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <div ref={sectionRef} className="bg-bezchBase2 text-gold px-6 md:px-20 py-14">
      <h3 className="text-sm md:text-xl font-semibold text-center pb-4">
        We reduce the journey time of the flowers from 15 to 5 days to guarantee:
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 text-lg">
        {advantages.map((adv, index) => (
          <div key={index} className="flex flex-col items-center">
             <div className="h-14 flex flex-col items-center">
            <img
              ref={(el) => (imgRefs.current[index] = el)}
              src={adv.icon}
              alt=""
              className="w-10 md:w-14 h-auto"
            />
            <p ref={(el) => (textRefs.current[index] = el)} className='text-sm md:text-lg text-center'>{adv.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvantagesSection;
