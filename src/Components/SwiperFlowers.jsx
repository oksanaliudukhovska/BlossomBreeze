import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const SwiperFlowers = ({ bouquet }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null); 

  return (
    <div className="flex flex-col-reverse gap-4">
      <div className="w-full">
        <Swiper
            style={{
              "--swiper-navigation-color": "rgb(40, 58, 51)", 
              "--swiper-pagination-color": "rgb(40, 58, 51)", 
            }}
          onSwiper={setThumbsSwiper} 
          spaceBetween={15} 
          slidesPerView={3} 
          navigation
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
          }}
          modules={[Thumbs, Navigation, Pagination]}
        >
          {bouquet.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full">
        <Swiper
          navigation 
          thumbs={{ swiper: thumbsSwiper }} 
          modules={[Navigation, Thumbs]}
          style={{
            "--swiper-navigation-color": "rgb(40, 58, 51)", 
            "--swiper-pagination-color": "rgb(40, 58, 51)", 
          }}
        >
          {bouquet.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Bouquet ${index + 1}`}
                className="w-full h-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperFlowers;
