import React from "react";
import { Link } from "react-router-dom";
import CarCard from "../Components/Card/Card";

interface Car {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  fuel: string;
  mileage: number;
  price: string;
  transmissionType: string;
  driveType: string;
  power?: string;
}

interface CatalogCardListProps {
  cars: Car[];
}

const CatalogCardList: React.FC<CatalogCardListProps> = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-full justify-items-start">
      {cars.map((car) => (
        <Link key={car.id} to={`/car/${car.id}`} className="w-full">
          <CarCard
            imageUrl={car.imageUrl}
            title={car.title}
            description={car.description}
            mileage={car.mileage}
            fuel={car.fuel}
            price={car.price}
            onDetailsClick={() => {}}
          />
        </Link>
      ))}
    </div>
  );
};

export default CatalogCardList;
