import React, { useState } from "react";

interface FilterProps {
  onApplyFilters: (filters: {
    engineType: string[];
    driveType: string[];
    transmissionType: string[];
    bodyType: string[];
    priceRange: { min: string; max: string };
    mileageRange: { min: string; max: string };
    sortCriterion: string;
  }) => void;
}

const CarFilter: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const [engineType, setEngineType] = useState<string[]>([]);
  const [driveType, setDriveType] = useState<string[]>([]);
  const [transmissionType, setTransmissionType] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [mileageRange, setMileageRange] = useState({ min: "", max: "" });
  const [sortCriterion, setSortCriterion] = useState<string>("");

  const handleCheckboxChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    state: string[]
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleApply = () => {
    onApplyFilters({
      engineType,
      driveType,
      transmissionType,
      bodyType,
      priceRange,
      mileageRange,
      sortCriterion,
    });
  };

  const handleReset = () => {
    setEngineType([]);
    setDriveType([]);
    setTransmissionType([]);
    setBodyType([]);
    setPriceRange({ min: "", max: "" });
    setMileageRange({ min: "", max: "" });
    setSortCriterion("");
    onApplyFilters({
      engineType: [],
      driveType: [],
      transmissionType: [],
      bodyType: [],
      priceRange: { min: "", max: "" },
      mileageRange: { min: "", max: "" },
      sortCriterion: "",
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriterion(event.target.value);
    onApplyFilters({
      engineType,
      driveType,
      transmissionType,
      bodyType,
      priceRange,
      mileageRange,
      sortCriterion: event.target.value,
    });
  };

  return (
    <div className="p-4 bg-black text-white rounded-lg space-y-4 w-full max-w-full lg:max-w-none flex-shrink-0 dark:bg-[#2a2a2a]">
      <h2 className="text-center text-lg font-bold">Фильтры</h2>
      <div>
        <p className="font-semibold mb-2">Сортировать</p>
        <select
          value={sortCriterion}
          onChange={handleSortChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">Без сортировки</option>
          <option value="price-desc">По цене (сначала дороже)</option>
          <option value="price-asc">По цене (сначала дешевле)</option>
          <option value="mileage-desc">По пробегу (сначала больше)</option>
          <option value="mileage-asc">По пробегу (сначала меньше)</option>
        </select>
      </div>

      <div>
        <p className="font-semibold">Тип двигателя</p>
        <div className="space-y-2">
          {["Бензиновый", "Дизельный"].map((type) => (
            <div key={type}>
              <input
                type="checkbox"
                id={type}
                className="mr-2"
                checked={engineType.includes(type)}
                onChange={() =>
                  handleCheckboxChange(type, setEngineType, engineType)
                }
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold">Привод</p>
        <div className="space-y-2">
          {["Передний", "Задний", "Полный"].map((type) => (
            <div key={type}>
              <input
                type="checkbox"
                id={type}
                className="mr-2"
                checked={driveType.includes(type)}
                onChange={() =>
                  handleCheckboxChange(type, setDriveType, driveType)
                }
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold">Тип трансмиссии</p>
        <div className="space-y-2">
          {["Механическая", "Автоматическая"].map((type) => (
            <div key={type}>
              <input
                type="checkbox"
                id={type}
                className="mr-2"
                checked={transmissionType.includes(type)}
                onChange={() =>
                  handleCheckboxChange(
                    type,
                    setTransmissionType,
                    transmissionType
                  )
                }
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold">Тип кузова</p>
        <div className="space-y-2">
          {["Кроссовер", "Универсал", "Хэтчбек", "Минивэн", "Седан"].map(
            (type) => (
              <div key={type}>
                <input
                  type="checkbox"
                  id={type}
                  className="mr-2"
                  checked={bodyType.includes(type)}
                  onChange={() =>
                    handleCheckboxChange(type, setBodyType, bodyType)
                  }
                />
                <label htmlFor={type}>{type}</label>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <p className="font-semibold">Цена</p>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="От"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            className="w-1/2 p-2 rounded bg-gray-800 text-white dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="До"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            className="w-1/2 p-2 rounded bg-gray-800 text-white dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div>
        <p className="font-semibold">Пробег</p>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="От"
            value={mileageRange.min}
            onChange={(e) =>
              setMileageRange({ ...mileageRange, min: e.target.value })
            }
            className="w-1/2 p-2 rounded bg-gray-800 text-white dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="До"
            value={mileageRange.max}
            onChange={(e) =>
              setMileageRange({ ...mileageRange, max: e.target.value })
            }
            className="w-1/2 p-2 rounded bg-gray-800 text-white dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleApply}
          className="w-full bg-white text-black p-2 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Показать
        </button>
        <button
          onClick={handleReset}
          className="w-full border border-white p-2 rounded hover:bg-white hover:text-black dark:hover:bg-gray-700"
        >
          Сбросить фильтр
        </button>
      </div>
    </div>
  );
};

export default CarFilter;
