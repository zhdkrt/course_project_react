import React from "react";
import { useNavigate } from "react-router-dom";
import HomeCarCard from "./HomeCarCard";
import { cars, Car } from "../cars";

export interface HomeCar extends Car {
  date: string;
}

const sampleCars: HomeCar[] = [
  {
    ...cars.find((car) => car.title === "Opel Astra")!,
    date: "10.05.2025",
  },
  {
    ...cars.find((car) => car.title === "Opel Mokka")!,
    date: "06.03.2025",
  },
  {
    ...cars.find((car) => car.title === "Opel Vivaro")!,
    date: "21.04.2025",
  },
];

const CarCardList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center bg-white dark:bg-[#222222] py-10">
      {sampleCars.map((car, idx) => (
        <HomeCarCard
          key={idx}
          imageUrl={car.imageUrl}
          date={car.date}
          title={car.title}
          car={car}
          onClick={() => navigate(`/car/${car.id}`)}
        />
      ))}
    </div>
  );
};

export default CarCardList;
