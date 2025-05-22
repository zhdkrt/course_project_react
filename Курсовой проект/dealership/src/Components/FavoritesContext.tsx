import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car } from '../Components/cars';

interface FavoritesContextType {
  favorites: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Car[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (car: Car) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === car.id)) {
        return [...prev, car];
      }
      return prev;
    });
  };

  const removeFromFavorites = (carId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== carId));
  };

  const isFavorite = (carId: string) => {
    return favorites.some((fav) => fav.id === carId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites должны использоваться в рамках FavoritesProvider');
  }
  return context;
};