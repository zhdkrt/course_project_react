import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import navlogo from "../../../public/navbar_logo.png";
import { useAuth } from "../AuthContext";
import { cars, Car } from "../cars";

const debounce = (func: Function, wait: number) => {
  let timeout: number;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

interface HeaderProps {
  onSearch?: (query: string) => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  general?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, login, register, theme, toggleTheme } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [registerErrors, setRegisterErrors] = useState<FormErrors>({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim() === "") {
        setSearchResults([]);
        setIsSearchResultsOpen(false);
        return;
      }

      const regex = new RegExp(`(^|\\s)${query}`, "i");
      const filteredCars = cars.filter((car) => regex.test(car.title));

      setSearchResults(filteredCars);
      setIsSearchResultsOpen(true);
    }, 300),
    []
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    }
  };

  const handleFavoritesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsSearchResultsOpen(false);
    }

    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      !(event.target as Element).closest(".mobile-menu-button")
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterErrors({});
    setFormSubmitting(true);
    setRegisterSuccess(false);

    const nameInput = document.getElementById(
      "registerName"
    ) as HTMLInputElement;
    const phoneInput = document.getElementById(
      "registerPhone"
    ) as HTMLInputElement;
    const emailInput = document.getElementById(
      "registerEmail"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "registerPassword"
    ) as HTMLInputElement;

    const name = nameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    let newErrors: FormErrors = {};
    let hasErrors = false;

    if (!validateName(name)) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
      hasErrors = true;
    }

    if (!validatePhone(phone)) {
      newErrors.phone = "Введите корректный номер телефона";
      hasErrors = true;
    }

    if (!validateEmail(email)) {
      newErrors.email = "Введите корректный email";
      hasErrors = true;
    }

    if (!validatePassword(password)) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
      hasErrors = true;
    }

    if (hasErrors) {
      setRegisterErrors(newErrors);
      setFormSubmitting(false);
      return;
    }

    const success = register(name, phone, email, password);

    if (success) {
      setRegisterSuccess(true);
      setTimeout(() => {
        setIsProfileMenuOpen(false);
      }, 1000);
    } else {
      setRegisterErrors({
        general: "Пользователь с таким email уже существует",
      });
    }

    setFormSubmitting(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrors({});
    setFormSubmitting(true);
    setLoginSuccess(false);

    const emailInput = document.getElementById(
      "loginEmail"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "loginPassword"
    ) as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    let newErrors: FormErrors = {};
    let hasErrors = false;

    if (!validateEmail(email)) {
      newErrors.email = "Введите корректный email";
      hasErrors = true;
    }

    if (password.length === 0) {
      newErrors.password = "Введите пароль";
      hasErrors = true;
    }

    if (hasErrors) {
      setLoginErrors(newErrors);
      setFormSubmitting(false);
      return;
    }

    const success = login(email, password);

    if (success) {
      setLoginSuccess(true);
      setTimeout(() => {
        setIsProfileMenuOpen(false);
      }, 1000);
    } else {
      setLoginErrors({ general: "Неверный email или пароль" });
    }

    setFormSubmitting(false);
  };

  const toggleForms = () => {
    setIsLoginForm(!isLoginForm);
    setLoginErrors({});
    setRegisterErrors({});
    setLoginSuccess(false);
    setRegisterSuccess(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-6">
          <div className="flex items-center justify-between">
            <img src={navlogo} alt="Logo" className="h-12 w-auto" />
            <button
              className="mobile-menu-button md:hidden p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            <ul className="hidden md:flex items-center gap-8 ml-10">
              <li>
                <Link
                  to="/"
                  className="text-white text-lg font-medium hover:text-indigo-300 transition-colors duration-300"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="text-white text-lg font-medium hover:text-indigo-300 transition-colors duration-300"
                >
                  Автомобили
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-white text-lg font-medium hover:text-indigo-300 transition-colors duration-300"
                >
                  О нас
                </Link>
              </li>
            </ul>
          </div>
          <div
            ref={mobileMenuRef}
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <ul className="flex flex-col space-y-4 py-2">
              <li>
                <Link
                  to="/"
                  className="block text-white text-lg font-medium hover:text-indigo-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog"
                  className="block text-white text-lg font-medium hover:text-indigo-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Автомобили
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="block text-white text-lg font-medium hover:text-indigo-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xs" ref={searchRef}>
              <input
                type="text"
                placeholder="Поиск автомобилей..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:border-indigo-500 transition-colors duration-300 placeholder-gray-400"
              />
              <button
                onClick={() => onSearch?.(searchQuery)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-300 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 23 24"
                  fill="none"
                >
                  <path
                    d="M16.438 14.9654H15.3991L15.0309 14.6103C16.3196 13.1112 17.0955 11.165 17.0955 9.04774C17.0955 4.32676 13.2687 0.5 8.54774 0.5C3.82676 0.5 0 4.32676 0 9.04774C0 13.7687 3.82676 17.5955 8.54774 17.5955C10.665 17.5955 12.6112 16.8196 14.1103 15.5309L14.4654 15.8991V16.938L21.0406 23.5L23 21.5406L16.438 14.9654ZM8.54774 14.9654C5.2733 14.9654 2.63007 12.3222 2.63007 9.04774C2.63007 5.7733 5.2733 3.13007 8.54774 3.13007C11.8222 3.13007 14.4654 5.7733 14.4654 9.04774C14.4654 12.3222 11.8222 14.9654 8.54774 14.9654Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              {isSearchResultsOpen && searchResults.length > 0 && (
                <div className="absolute left-0 w-full md:w-96 mt-2 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto bg-white dark:bg-[#2a2a2a]">
                  <div className="p-2">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      Результаты поиска
                    </h3>
                    {searchResults.map((car) => (
                      <Link
                        key={car.id}
                        to={`/car/${car.id}`}
                        onClick={() => setIsSearchResultsOpen(false)}
                      >
                        <div className="flex items-center gap-4 p-3 border-b hover:bg-gray-100 dark:hover:bg-[#333333] border-gray-200 dark:border-gray-600">
                          <img
                            src={car.imageUrl}
                            alt={car.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {car.title}
                            </p>
                            <p className="text-sm line-clamp-1 text-gray-600 dark:text-gray-300">
                              {car.description}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {car.price} BYN
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>

              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                  onClick={handleProfileClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M7.7 30.2C9.4 28.9 11.3 27.8747 13.4 27.124C15.5 26.3747 17.7 26 20 26C22.3 26 24.5 26.3747 26.6 27.124C28.7 27.8747 30.6 28.9 32.3 30.2C33.4667 28.8333 34.3753 27.2833 35.026 25.55C35.6753 23.8167 36 21.9667 36 20C36 15.5667 34.442 11.7913 31.326 8.674C28.2087 5.558 24.4333 4 20 4C15.5667 4 11.792 5.558 8.676 8.674C5.55867 11.7913 4 15.5667 4 20C4 21.9667 4.32533 23.8167 4.976 25.55C5.62533 27.2833 6.53333 28.8333 7.7 30.2ZM20 22C18.0333 22 16.3747 21.3253 15.024 19.976C13.6747 18.6253 13 16.9667 13 15C13 13.0333 13.6747 11.3747 15.024 10.024C16.3747 8.67467 18.0333 8 20 8C21.9667 8 23.6253 8.67467 24.976 10.024C26.3253 11.3747 27 13.0333 27 15C27 16.9667 26.3253 18.6253 24.976 19.976C23.6253 21.3253 21.9667 22 20 22ZM20 40C17.2333 40 14.6333 39.4747 12.2 38.424C9.76667 37.3747 7.65 35.95 5.85 34.15C4.05 32.35 2.62533 30.2333 1.576 27.8C0.525334 25.3667 0 22.7667 0 20C0 17.2333 0.525334 14.6333 1.576 12.2C2.62533 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.62467 12.2 1.574C14.6333 0.524667 17.2333 0 20 0C22.7667 0 25.3667 0.524667 27.8 1.574C30.2333 2.62467 32.35 4.05 34.15 5.85C35.95 7.65 37.3747 9.76667 38.424 12.2C39.4747 14.6333 40 17.2333 40 20C40 22.7667 39.4747 25.3667 38.424 27.8C37.3747 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.3747 27.8 38.424C25.3667 39.4747 22.7667 40 20 40Z"
                      fill="white"
                    />
                  </svg>
                </button>

                {isProfileMenuOpen && !user && (
                  <div className="absolute right-0 mt-2 w-72 rounded-md shadow-lg py-2 z-50 bg-white dark:bg-[#222222]">
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                        {isLoginForm ? "Вход" : "Регистрация"}
                      </h3>

                      {isLoginForm ? (
                        <form
                          onSubmit={handleLoginSubmit}
                          className="space-y-3"
                        >
                          {loginSuccess && (
                            <div className="p-2 mb-3 text-center text-sm bg-green-100 text-green-800 rounded-md">
                              Вход выполнен успешно!
                            </div>
                          )}

                          {loginErrors.general && (
                            <div className="p-2 mb-3 text-center text-sm bg-red-100 text-red-800 rounded-md">
                              {loginErrors.general}
                            </div>
                          )}

                          <div>
                            <input
                              id="loginEmail"
                              type="email"
                              placeholder="Email"
                              className={`w-full px-3 py-2 border rounded-md text-sm ${
                                loginErrors.email
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-300 dark:border-gray-600 dark:bg-[#222222]"
                              } dark:text-white`}
                              required
                            />
                            {loginErrors.email && (
                              <p className="text-red-500 text-xs mt-1">
                                {loginErrors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              id="loginPassword"
                              type="password"
                              placeholder="Пароль"
                              className={`w-full px-3 py-2 border rounded-md text-sm ${
                                loginErrors.password
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-300 dark:border-gray-600 dark:bg-[#222222]"
                              } dark:text-white`}
                              required
                            />
                            {loginErrors.password && (
                              <p className="text-red-500 text-xs mt-1">
                                {loginErrors.password}
                              </p>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-md text-sm hover:bg-gray-700 bg-black text-white disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={formSubmitting}
                          >
                            {formSubmitting ? "Выполняется вход..." : "Войти"}
                          </button>
                          <div className="text-center mt-2">
                            <button
                              type="button"
                              onClick={toggleForms}
                              className="text-sm hover:text-gray-700 text-black dark:text-white dark:hover:text-gray-300"
                            >
                              Регистрация
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form
                          onSubmit={handleRegisterSubmit}
                          className="space-y-3"
                        >
                          {registerSuccess && (
                            <div className="p-2 mb-3 text-center text-sm bg-green-100 text-green-800 rounded-md">
                              Регистрация успешна!
                            </div>
                          )}

                          {registerErrors.general && (
                            <div className="p-2 mb-3 text-center text-sm bg-red-100 text-red-800 rounded-md">
                              {registerErrors.general}
                            </div>
                          )}

                          <div>
                            <input
                              id="registerName"
                              type="text"
                              placeholder="Имя"
                              className={`w-full px-3 py-2 border rounded-md text-sm ${
                                registerErrors.name
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-300 dark:border-gray-600 dark:bg-[#222222]"
                              } dark:text-white`}
                              required
                            />
                            {registerErrors.name && (
                              <p className="text-red-500 text-xs mt-1">
                                {registerErrors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              id="registerPhone"
                              type="tel"
                              placeholder="Телефон"
                              className={`w-full px-3 py-2 border rounded-md text-sm ${
                                registerErrors.phone
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-300 dark:border-gray-600 dark:bg-[#222222]"
                              } dark:text-white`}
                              required
                            />
                            {registerErrors.phone && (
                              <p className="text-red-500 text-xs mt-1">
                                {registerErrors.phone}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              id="registerEmail"
                              type="email"
                              placeholder="Email"
                              className={`w-full px-3 py-2 border rounded-md text-sm ${
                                registerErrors.email
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-300 dark:border-gray-600 dark:bg-[#222222]"
                              } dark:text-white`}
                              required
                            />
                            {registerErrors.email && (
                              <p className="text-red-500 text-xs mt-1">
                                {registerErrors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              id="registerPassword"
                              type="password"
                              placeholder="Пароль"
                              className={`w-full px-3 py-2 border rounded-md text-sm ${
                                registerErrors.password
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-300 dark:border-gray-600 dark:bg-[#222222]"
                              } dark:text-white`}
                              required
                            />
                            {registerErrors.password && (
                              <p className="text-red-500 text-xs mt-1">
                                {registerErrors.password}
                              </p>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2 px-4 rounded-md text-sm hover:bg-gray-700 bg-black text-white disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={formSubmitting}
                          >
                            {formSubmitting
                              ? "Регистрация..."
                              : "Зарегистрироваться"}
                          </button>
                          <div className="text-center mt-2">
                            <button
                              type="button"
                              onClick={toggleForms}
                              className="text-sm hover:text-gray-700 text-black dark:text-white dark:hover:text-gray-300"
                            >
                              Вход
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/favorites"
                onClick={handleFavoritesClick}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  user ? "hover:bg-gray-800" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 31 32"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3111_129)">
                    <path
                      d="M24.2835 31.5C23.6635 31.5 23.0779 31.3278 22.5268 30.9833L15.8102 26.7467C15.6035 26.6089 15.3968 26.6089 15.1902 26.7467L8.47349 30.9833C7.85349 31.3967 7.1646 31.5517 6.40682 31.4483C5.64904 31.345 4.9946 31.0522 4.44349 30.57C3.7546 29.95 3.41016 29.1578 3.41016 28.1933V3.80667C3.410 2.91111 3.73738 2.13611 4.39182 1.48167C5.04627 0.827223 5.82127 0.5 6.71682 0.5H24.2835C25.179 0.5 25.954 0.827223 26.6085 1.48167C27.2629 2.13611 27.5902 2.91111 27.5902 3.80667V28.1933C27.5902 29.0889 27.2629 29.8639 26.6085 30.5183C27.954 31.1728 25.179 31.5 24.2835 31.5ZM15.5002 23.9567C16.1202 23.9567 16.7057 24.1289 17.2568 24.4733L23.9735 28.71C24.0424 28.7789 24.1457 28.8133 24.2835 28.8133C24.4213 28.8133 24.5418 28.7617 24.6452 28.6583C24.7485 28.555 24.8002 28.4 24.8002 28.1933V3.80667C24.8002 3.6 24.7485 3.445 24.6452 3.34167C24.5418 3.23833 24.4213 3.18667 24.2835 3.18667H6.71682C6.57904 3.18667 6.45849 3.23833 6.35516 3.34167C6.25182 3.445 6.20016 3.6 6.20016 3.80667V28.1933C6.20016 28.4 6.28627 28.5722 6.45849 28.71C6.63071 28.8478 6.82016 28.8478 7.02682 28.71L13.7435 24.4733C14.2946 24.1289 14.8802 23.9567 15.5002 23.9567Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
