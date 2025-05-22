import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

const AboutUsSlider: React.FC = () => {
  return (
    <div className="w-full py-15 flex items-center justify-center rounded-2xl mt-10 mb-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1.2}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        <SwiperSlide>
          <div className="h-64 flex flex-col items-center justify-center bg-black dark:bg-[#2a2a2a] rounded-2xl text-white dark:text-gray-100 p-10 text-center shadow-lg border border-gray-700 dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4">
              Гарантийные обязательства
            </h2>
            <p>
              С 1 января 2019 года на все автомобили, приобретённые в Орел Центр
              Минск, действует пятилетняя гарантия производителя: 2 года без
              ограничения пробега и дополнительно 3 года гарантии при общем
              пробеге не более 150 000 км.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-64 flex flex-col items-center justify-center bg-black dark:bg-[#2a2a2a] rounded-2xl text-white dark:text-gray-100 p-10 text-center shadow-lg border border-gray-700 dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4">
              Сервисное обслуживание
            </h2>
            <p>
              Мы предлагаем выгодные условия на сервисное обслуживание и
              оригинальные запчасти Opel.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-64 flex flex-col items-center justify-center bg-black dark:bg-[#2a2a2a] rounded-2xl text-white dark:text-gray-100 p-10 text-center shadow-lg border border-gray-700 dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4">
              Официальная поддержка
            </h2>
            <p>
              Работаем напрямую с заводом-изготовителем, предоставляя все
              гарантии на автомобили.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 flex flex-col items-center justify-center bg-black dark:bg-[#2a2a2a] rounded-2xl text-white dark:text-gray-100 p-10 text-center shadow-lg border border-gray-700 dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-4">
              Сервисное обслуживание
            </h2>
            <p>
              Мы предлагаем выгодные условия на сервисное обслуживание и
              оригинальные запчасти Opel.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AboutUsSlider;
