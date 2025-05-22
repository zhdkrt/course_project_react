import React, { createContext, useContext, useState, useEffect } from "react";
import { Car } from "../Components/cars";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  photoUrl?: string;
  theme?: 'light' | 'dark';
}

interface AuthContextType {
  user: User | null;
  favorites: Car[];
  login: (email: string, password: string) => boolean;
  register: (
    name: string,
    phone: string,
    email: string,
    password: string
  ) => boolean;
  logout: () => void;
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  updateProfilePhoto: (photoUrl: string) => void;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
  updateUserData: (userData: { name: string; phone: string; email: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Ошибка при анализе пользователя из localStorage:", e);
      return null;
    }
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem("theme");
      return (saved as 'light' | 'dark') || 'light';
    } catch (e) {
      console.error("Ошибка при разборе темы из localStorage:", e);
      return 'light';
    }
  });

  const [favorites, setFavorites] = useState<Car[]>(() => {
    try {
      const savedUser = localStorage.getItem("user");
      let userId = "guest";
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (
          parsedUser &&
          typeof parsedUser === "object" &&
          "id" in parsedUser
        ) {
          userId = parsedUser.id;
        }
      }
      const savedFavorites = localStorage.getItem(`favorites_${userId}`);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (e) {
      console.error("Ошибка при разборе избранного из localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      const userId = user?.id || "guest";
      const savedFavorites = localStorage.getItem(`favorites_${userId}`);
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.error("Ошибка в useEffect для избранного:", e);
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    const userId = user?.id || "guest";
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      if (foundUser.theme) {
        setTheme(foundUser.theme);
      }
      return true;
    }
    return false;
  };

  const register = (
    name: string,
    phone: string,
    email: string,
    password: string
  ): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u: User) => u.email === email)) {
      return false;
    }
    const newUser: User = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      password,
      theme: 'light'
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("user");
  };

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

  const updateProfilePhoto = (photoUrl: string) => {
    if (user) {
      const updatedUser = { ...user, photoUrl };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: User) => 
        u.id === user.id ? { ...u, photoUrl } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (user) {
      const updatedUser = { ...user, theme: newTheme as 'light' | 'dark' };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: User) => 
        u.id === user.id ? { ...u, theme: newTheme as 'light' | 'dark' } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const updateUserData = (userData: { name: string; phone: string; email: string }) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: User) => 
        u.id === user.id ? { ...u, ...userData } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        login,
        register,
        logout,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        updateProfilePhoto,
        toggleTheme,
        theme,
        updateUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться в AuthProvider");
  }
  return context;
};
