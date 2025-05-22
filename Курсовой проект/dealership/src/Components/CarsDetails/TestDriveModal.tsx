import React, { useState } from "react";
import { useAuth } from '../AuthContext';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  carModel?: string;
}

const TestDriveModal: React.FC<TestDriveModalProps> = ({ isOpen, onClose, carModel }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    date: "",
    time: "",
    model: carModel || "",
    location: "",
    wishes: "",
    hasLicense: false,
    contactMethod: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.date) {
      newErrors.date = 'Выберите дату';
    } else {
      const today = new Date();
      const selected = new Date(form.date);
      today.setHours(0,0,0,0);
      if (selected < today) {
        newErrors.date = 'Дата не может быть в прошлом';
      }
    }
    if (!form.time) {
      newErrors.time = 'Выберите время';
    }
    if (!form.model) {
      newErrors.model = 'Выберите модель автомобиля';
    }
    if (!form.location) {
      newErrors.location = 'Выберите локацию';
    }
    if (!form.hasLicense) {
      newErrors.hasLicense = 'Необходимо наличие водительских прав';
    }
    if (!form.contactMethod) {
      newErrors.contactMethod = 'Выберите предпочтительный способ связи';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (user) {
        const testDrive = {
          date: form.date,
          time: form.time,
          model: form.model,
          location: form.location,
          wishes: form.wishes,
          hasLicense: form.hasLicense,
          contactMethod: form.contactMethod,
        };
        const key = `testdrives_${user.id}`;
        const prev = JSON.parse(localStorage.getItem(key) || '[]');
        localStorage.setItem(key, JSON.stringify([...prev, testDrive]));
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  const inputClass = "border rounded px-3 py-2 h-10 dark:bg-[#222222] dark:border-gray-600 dark:text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white dark:bg-[#222222] rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white z-10"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white pr-6">Заполните данные для тест-драйва</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="flex-1 flex flex-col mb-2 sm:mb-0">
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Дата</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`${inputClass} ${errors.date ? 'border-red-500' : ''}`}
                required
              />
              {errors.date && <div className="text-red-500 text-xs mt-1">{errors.date}</div>}
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Время</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className={`${inputClass} ${errors.time ? 'border-red-500' : ''}`}
                required
              >
                <option value="">Выберите время</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
              </select>
              {errors.time && <div className="text-red-500 text-xs mt-1">{errors.time}</div>}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Локация</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className={`${inputClass} ${errors.location ? 'border-red-500' : ''}`}
              required
            >
              <option value="">Выберите локацию</option>
              <option value="Минск, ул. Немига, 5">Минск, ул. Немига, 5</option>
              <option value="Минск, пр. Независимости, 95">Минск, пр. Независимости, 95</option>
              <option value="Гомель, ул. Советская, 45">Гомель, ул. Советская, 45</option>
              <option value="Брест, ул. Ленина, 12">Брест, ул. Ленина, 12</option>
              <option value="Гродно, ул. Ожешко, 38">Гродно, ул. Ожешко, 38</option>
            </select>
            {errors.location && <div className="text-red-500 text-xs mt-1">{errors.location}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Модель автомобиля</label>
            <select
              name="model"
              value={form.model}
              onChange={handleChange}
              className={`${inputClass} ${errors.model ? 'border-red-500' : ''}`}
              required
            >
              <option value="">Модель автомобиля</option>
              <option value="Opel Astra">Opel Astra</option>
              <option value="Opel Insignia">Opel Insignia</option>
              <option value="Opel Mokka">Opel Mokka</option>
              <option value="Opel Corsa">Opel Corsa</option>
              <option value="Opel Zafira">Opel Zafira</option>
              <option value="Opel Grandland X">Opel Grandland X</option>
              <option value="Opel Vivaro">Opel Vivaro</option>
              <option value="Opel Combo">Opel Combo</option>
              <option value="Opel Adam">Opel Adam</option>
              <option value="Opel Cascada">Opel Cascada</option>
            </select>
            {errors.model && <div className="text-red-500 text-xs mt-1">{errors.model}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Способ связи</label>
            <select
              name="contactMethod"
              value={form.contactMethod}
              onChange={handleChange}
              className={`${inputClass} ${errors.contactMethod ? 'border-red-500' : ''}`}
              required
            >
              <option value="">Предпочтительный способ связи</option>
              <option value="Звонок">Звонок</option>
              <option value="Email">Email</option>
              <option value="Мессенджер">Мессенджер</option>
            </select>
            {errors.contactMethod && <div className="text-red-500 text-xs mt-1">{errors.contactMethod}</div>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Пожелания</label>
            <textarea
              name="wishes"
              placeholder="Пожелания"
              value={form.wishes}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 min-h-[60px] dark:bg-[#222222] dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="hasLicense"
              name="hasLicense"
              checked={form.hasLicense}
              onChange={handleChange}
              className="mr-2 h-4 w-4 dark:bg-[#222222] dark:border-gray-600"
              required
            />
            <label htmlFor="hasLicense" className="text-sm text-gray-900 dark:text-white">
              У меня есть водительские права
            </label>
          </div>
          {errors.hasLicense && <div className="text-red-500 text-xs mt-1">{errors.hasLicense}</div>}

          <button
            type="submit"
            className="w-full bg-black dark:bg-[#333333] text-white py-3 rounded mt-4 text-lg hover:bg-gray-900 dark:hover:bg-[#404040] transition"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestDriveModal; 