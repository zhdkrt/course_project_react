import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../../public/OpelBanner.jpg";

const CarBanner: React.FC = () => {
  return (
    <div
      className="relative w-full h-[30rem] sm:h-[42.5rem] flex items-end overflow-hidden shadow-2xl"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent dark:from-[#222222]/80 dark:to-transparent"></div>
      <div className="relative w-full mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-6 gap-4 sm:gap-0">
        <div className="w-full sm:w-[170px] h-10 flex items-center justify-center text-lg sm:text-2xl font-normal text-white rounded-full bg-[rgba(77,77,79,0.15)] dark:bg-[#222222]/70 shadow-[0_0_3px_1px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          Opel Mokka
        </div>
        <div className="w-full sm:w-[400px] md:w-[600px] h-10 flex items-center justify-center text-lg sm:text-2xl font-normal text-white rounded-full bg-[rgba(77,77,79,0.15)] dark:bg-[#222222]/70 shadow-[0_0_3px_1px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          Добро пожаловать в мир Опель
        </div>
        <Link to="/catalog">
          <button className="w-full sm:w-[170px] h-10 text-lg sm:text-2xl font-normal text-white rounded-full bg-[rgba(77,77,79,0.15)] dark:bg-[#222222]/70 shadow-[0_0_3px_1px_rgba(0,0,0,0.35)] backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            Каталог
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarBanner;