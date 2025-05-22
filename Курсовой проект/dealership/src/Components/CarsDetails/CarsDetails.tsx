import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarCard from "../Card/Card";
import { cars, Car } from "../cars";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth } from "../AuthContext";
import TestDriveModal from "./TestDriveModal";

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [similarCars, setSimilarCars] = useState<Car[]>([]);
  const { isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const carData = cars.find((c) => c.id === id);
    setCar(carData || null);

    if (carData) {
      const similar = cars
        .filter((c) => c.id !== id && c.bodyType === carData.bodyType)
        .slice(0, 3);
      setSimilarCars(similar);
    }
  }, [id]);

  if (!car) {
    return (
      <div className="bg-white dark:bg-[#222222]">
        <Header />
        <div className="max-w-screen-xl mx-auto px-4 py-6"></div>
        <Footer />
      </div>
    );
  }

  const favorite = isFavorite(car.id);
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  return (
    <div className="bg-white dark:bg-[#222222]">
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/5">
            <div className="relative h-96 overflow-hidden rounded-lg">
              <img
                src={car.images[0]}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {car.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative h-24 sm:h-30 overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt={`image-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <h1 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {car.name}
            </h1>
            <ul className="list-none text-gray-700 dark:text-gray-300">
              <li className="mb-1">Тип двигателя: {car.engineType}</li>
              <li className="mb-1">Привод: {car.driveType}</li>
              <li className="mb-1">Тип трансмиссии: {car.transmissionType}</li>
              <li className="mb-1">Тип кузова: {car.bodyType}</li>
              <li className="mb-1">Пробег: {car.mileage} км</li>
              <li className="mb-1">Цвет: {car.color}</li>
            </ul>
            <p className="text-lg text-center font-semibold mt-4 text-gray-900 dark:text-white">
              Цена: <span className="text-red-500">{car.price} BYN</span>
            </p>
            <div className="mt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-black dark:bg-[#333333] text-white px-4 py-2 rounded-lg w-full mb-2 hover:bg-gray-800 dark:hover:bg-[#404040]"
              >
                Тест-драйв
              </button>
              <button
                onClick={handleFavoriteClick}
                className={`w-full px-4 py-2 rounded-lg ${
                  favorite
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333333]"
                }`}
              >
                {favorite ? "Удалить из избранного" : "Добавить в избранное"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Похожее
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarCars.map((similarCar) => (
              <CarCard
                key={similarCar.id}
                imageUrl={similarCar.imageUrl}
                title={similarCar.title}
                description={similarCar.description}
                fuel={similarCar.fuel}
                mileage={similarCar.mileage}
                price={similarCar.price}
                onDetailsClick={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
      <TestDriveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carModel={car.name}
      />
      <Footer />
    </div>
  );
};

export default CarDetails;
