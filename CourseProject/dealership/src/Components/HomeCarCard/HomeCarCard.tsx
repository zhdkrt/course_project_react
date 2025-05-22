import React from "react";
import { useAuth } from "../AuthContext";
import { HomeCar } from "../HomeCarCard/HomeCarList";

interface CarCardProps {
  imageUrl: string;
  date: string;
  title: string;
  onClick?: () => void;
  car: HomeCar;
}

const HomeCarCard: React.FC<CarCardProps> = ({
  imageUrl,
  date,
  title,
  onClick,
  car,
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const favorite = isFavorite(car.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  return (
    <div className="max-w-sm rounded-2xl border border-blue-300 dark:border-gray-600 p-2 bg-white dark:bg-[#2a2a2a] relative overflow-hidden shadow-sm transition hover:shadow-lg">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-xl w-full h-64 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/80 dark:bg-[#333333]/80 rounded-full p-2 hover:bg-white dark:hover:bg-[#404040] transition"
        >
          <svg
            width={24}
            height={24}
            fill="none"
            stroke={favorite ? "#ff0000" : "#fff"}
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="px-2 pt-4 pb-2">
        <div className="mb-2 text-sm text-black dark:text-gray-300">{date}</div>
        <div className="mb-6 text-xl font-medium tracking-wide text-gray-900 dark:text-white">
          {title}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClick}
            className="flex items-center gap-2 bg-black dark:bg-[#333333] text-white rounded-full px-8 py-2 text-lg font-medium transition hover:bg-gray-800 dark:hover:bg-[#404040]"
          >
            <span>
              <svg width={32} height={24} viewBox="0 0 32 24" fill="none">
                <path
                  d="M20 12H4M28 12L20 12M28 12L22 18M28 12L22 6"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCarCard;
