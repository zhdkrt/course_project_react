import React, { useState, useEffect } from "react";
import CarFilter from "./Filter";
import CatalogCardList from "./CatalogCardList";
import { cars, Car } from "../Components/cars";

const CatalogMain: React.FC = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [filters, setFilters] = useState({
    engineType: [] as string[],
    driveType: [] as string[],
    transmissionType: [] as string[],
    bodyType: [] as string[],
    priceRange: { min: "", max: "" },
    mileageRange: { min: "", max: "" },
    sortCriterion: "",
  });

  useEffect(() => {
    let updatedCars = [...cars].filter((car) => {
      const matchesEngine =
        filters.engineType.length === 0 ||
        filters.engineType.includes(car.engineType);
      const matchesDrive =
        filters.driveType.length === 0 ||
        filters.driveType.includes(car.driveType);
      const matchesTransmission =
        filters.transmissionType.length === 0 ||
        filters.transmissionType.includes(car.transmissionType);
      const matchesBody =
        filters.bodyType.length === 0 ||
        filters.bodyType.includes(car.bodyType);
      const matchesPrice =
        (!filters.priceRange.min ||
          parseFloat(car.price) >= parseFloat(filters.priceRange.min)) &&
        (!filters.priceRange.max ||
          parseFloat(car.price) <= parseFloat(filters.priceRange.max));
      const matchesMileage =
        (!filters.mileageRange.min ||
          car.mileage >= parseFloat(filters.mileageRange.min)) &&
        (!filters.mileageRange.max ||
          car.mileage <= parseFloat(filters.mileageRange.max));

      return (
        matchesEngine &&
        matchesDrive &&
        matchesTransmission &&
        matchesBody &&
        matchesPrice &&
        matchesMileage
      );
    });

    switch (filters.sortCriterion) {
      case "price-desc":
        updatedCars.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "price-asc":
        updatedCars.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "newness":
        updatedCars.sort((a, b) => a.mileage - b.mileage);
        break;
      case "mileage-desc":
        updatedCars.sort((a, b) => b.mileage - a.mileage);
        break;
      case "mileage-asc":
        updatedCars.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        break;
    }

    setFilteredCars(updatedCars);
  }, [filters]);

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-white dark:bg-[#222222] py-6 md:py-8 min-h-screen md:mx-3 sm:mx-3">
      <div className="container mx-auto max-w-5xl">
        <div className="block lg:flex">
          <div className="block lg:hidden w-full mb-4">
            <CarFilter onApplyFilters={handleApplyFilters} />
          </div>

          <div className="w-full lg:w-2/3 pr-0 lg:pr-2">
            <CatalogCardList cars={filteredCars} />
          </div>

          <div className="hidden lg:block lg:w-1/3">
            <div>
              <CarFilter onApplyFilters={handleApplyFilters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogMain;
