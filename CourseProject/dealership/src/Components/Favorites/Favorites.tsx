import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CarCard from '../Card/Card';
import { useAuth } from '../AuthContext';

const Favorites: React.FC = () => {
  const { favorites } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#222222]">
      <Header />
      <div className="flex-grow px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Избранное</h1>
          {favorites.length === 0 ? (
            <p className="text-lg text-gray-500 dark:text-gray-400">В избранном пока нет автомобилей.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {favorites.map((car) => (
                <Link key={car.id} to={`/car/${car.id}`}>
                  <CarCard
                    imageUrl={car.imageUrl}
                    title={car.title}
                    description={car.description}
                    fuel={car.fuel}
                    mileage={car.mileage}
                    price={car.price}
                    onDetailsClick={() => {}}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;