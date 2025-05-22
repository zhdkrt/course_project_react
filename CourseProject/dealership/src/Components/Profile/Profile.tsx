import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth } from "../AuthContext";

const Profile: React.FC = () => {
  const { user, logout, updateProfilePhoto, updateUserData } = useAuth();
  const [testDrives, setTestDrives] = useState<any[]>([]);
  const [openTestDriveIdx, setOpenTestDriveIdx] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTestDrive, setIsEditingTestDrive] = useState<number | null>(
    null
  );
  const [editedTestDrive, setEditedTestDrive] = useState<any>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isTestDriveActive = (testDrive: any) => {
    const testDriveDate = new Date(`${testDrive.date}T${testDrive.time}`);
    const now = new Date();
    return testDriveDate > now;
  };

  const sortTestDrives = (drives: any[]) => {
    return drives.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  useEffect(() => {
    if (user) {
      const key = `testdrives_${user.id}`;
      const drives = JSON.parse(localStorage.getItem(key) || "[]");
      setTestDrives(sortTestDrives(drives));
      setEditedUser({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    }
  }, [user]);

  const handleToggle = (idx: number) => {
    setOpenTestDriveIdx(openTestDriveIdx === idx ? null : idx);
  };

  const handleCancel = (idx: number) => {
    if (!user) return;
    const key = `testdrives_${user.id}`;
    const updated = testDrives.filter((_, i) => i !== idx);
    localStorage.setItem(key, JSON.stringify(updated));
    setTestDrives(updated);
    setOpenTestDriveIdx(null);
  };

  const handleEditTestDrive = (idx: number) => {
    setIsEditingTestDrive(idx);
    setEditedTestDrive({ ...testDrives[idx] });
  };

  const handleSaveTestDrive = (idx: number) => {
    if (!user) return;
    const validationErrors = validateTestDrive();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const selectedDate = new Date(editedTestDrive.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setDateError("Нельзя выбрать дату в прошлом");
      return;
    }

    const key = `testdrives_${user.id}`;
    const updated = [...testDrives];
    updated[idx] = editedTestDrive;
    localStorage.setItem(key, JSON.stringify(updated));
    setTestDrives(updated);
    setIsEditingTestDrive(null);
    setEditedTestDrive(null);
    setDateError(null);
    setErrors({});
  };

  const handleCancelEditTestDrive = () => {
    setIsEditingTestDrive(null);
    setEditedTestDrive(null);
    setDateError(null);
  };

  const handleTestDriveInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "date") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setDateError("Нельзя выбрать дату в прошлом");
      } else {
        setDateError(null);
      }
    }
    setEditedTestDrive((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result as string;
        updateProfilePhoto(photoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (user) {
      updateUserData(editedUser);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setEditedUser({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateTestDrive = () => {
    const newErrors: { [key: string]: string } = {};
    if (!editedTestDrive.date) {
      newErrors.date = "Выберите дату";
    } else {
      const today = new Date();
      const selected = new Date(editedTestDrive.date);
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = "Дата не может быть в прошлом";
      }
    }
    if (!editedTestDrive.time) {
      newErrors.time = "Выберите время";
    }
    if (!editedTestDrive.location) {
      newErrors.location = "Выберите локацию";
    }
    if (!editedTestDrive.hasLicense) {
      newErrors.hasLicense = "Необходимо наличие водительских прав";
    }
    if (!editedTestDrive.contactMethod) {
      newErrors.contactMethod = "Выберите предпочтительный способ связи";
    }
    return newErrors;
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-[#222222] min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 min-h-[71vh]">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Пожалуйста, войдите в аккаунт.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#222222] min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 bg-white dark:bg-[#1a1a1a] mb-8">
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group mx-auto md:mx-0"
            onClick={handlePhotoClick}
          >
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                Изменить фото
              </span>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex-1 w-full mt-4 md:mt-0">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Номер телефона: {user.phone}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Email: {user.email}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={handleEdit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 dark:hover:bg-red-500 transition"
                  >
                    Выйти из аккаунта
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          История тест-драйвов
        </h2>

        <div className="space-y-3 mb-8">
          <div className="overflow-x-auto">
            {testDrives.length === 0 ? (
              <div className="text-gray-400 dark:text-gray-500 p-4 min-h-[30.7vh]">
                Нет записей на тест-драйв.
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Активные тест-драйвы
                  </h3>
                  <div className="space-y-3">
                    {testDrives.filter(isTestDriveActive).length === 0 ? (
                      <div className="text-gray-400 dark:text-gray-500 p-4">
                        Нет активных тест-драйвов.
                      </div>
                    ) : (
                      testDrives
                        .filter(isTestDriveActive)
                        .map((testDrive, idx) => (
                          <div key={idx}>
                            <div
                              className={`bg-white dark:bg-[#222222] border border-gray-300 dark:border-gray-600 rounded-lg transition-shadow ${
                                openTestDriveIdx === idx
                                  ? "shadow dark:shadow-gray-700"
                                  : ""
                              }`}
                            >
                              <div
                                className={
                                  `flex flex-wrap items-center justify-between px-4 py-2 cursor-pointer transition-shadow ` +
                                  `hover:shadow-md dark:hover:shadow-gray-700 ${
                                    openTestDriveIdx === idx
                                      ? "rounded-b-none"
                                      : ""
                                  }`
                                }
                                onClick={() => handleToggle(idx)}
                              >
                                <span className="text-base text-gray-800 dark:text-gray-200">
                                  {testDrive.date} {testDrive.time}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-base text-gray-800 dark:text-gray-200">
                                    {testDrive.model}
                                  </span>
                                  <span
                                    className={`transition-transform duration-200 text-gray-800 dark:text-gray-200 ${
                                      openTestDriveIdx === idx
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  >
                                    ▼
                                  </span>
                                </div>
                              </div>
                              {openTestDriveIdx === idx && (
                                <div className="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-b-lg space-y-2 text-sm">
                                  {isEditingTestDrive === idx ? (
                                    <div className="space-y-3">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                          Дата
                                        </label>
                                        <input
                                          type="date"
                                          name="date"
                                          value={editedTestDrive.date}
                                          onChange={handleTestDriveInputChange}
                                          min={
                                            new Date()
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {dateError && (
                                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                                            {dateError}
                                          </p>
                                        )}
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                          Время
                                        </label>
                                        <select
                                          name="time"
                                          value={editedTestDrive.time}
                                          onChange={handleTestDriveInputChange}
                                          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-[#222222] dark:border-gray-600 dark:text-white ${
                                            errors.time ? "border-red-500" : ""
                                          }`}
                                        >
                                          <option value="">
                                            Выберите время
                                          </option>
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
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                          Локация
                                        </label>
                                        <select
                                          name="location"
                                          value={editedTestDrive.location}
                                          onChange={handleTestDriveInputChange}
                                          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-[#222222] dark:border-gray-600 dark:text-white ${
                                            errors.location
                                              ? "border-red-500"
                                              : ""
                                          }`}
                                        >
                                          <option value="">
                                            Выберите локацию
                                          </option>
                                          <option value="Минск, ул. Немига, 5">
                                            Минск, ул. Немига, 5
                                          </option>
                                          <option value="Минск, пр. Независимости, 95">
                                            Минск, пр. Независимости, 95
                                          </option>
                                          <option value="Гомель, ул. Советская, 45">
                                            Гомель, ул. Советская, 45
                                          </option>
                                          <option value="Брест, ул. Ленина, 12">
                                            Брест, ул. Ленина, 12
                                          </option>
                                          <option value="Гродно, ул. Ожешко, 38">
                                            Гродно, ул. Ожешко, 38
                                          </option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                          Способ связи
                                        </label>
                                        <select
                                          name="contactMethod"
                                          value={editedTestDrive.contactMethod}
                                          onChange={handleTestDriveInputChange}
                                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                          <option value="Телефон">
                                            Телефон
                                          </option>
                                          <option value="Email">Email</option>
                                          <option value="WhatsApp">
                                            WhatsApp
                                          </option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                          Водительские права
                                        </label>
                                        <select
                                          name="hasLicense"
                                          value={
                                            editedTestDrive.hasLicense
                                              ? "true"
                                              : "false"
                                          }
                                          onChange={(e) =>
                                            setEditedTestDrive((prev: any) => ({
                                              ...prev,
                                              hasLicense:
                                                e.target.value === "true",
                                            }))
                                          }
                                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                          <option value="true">Есть</option>
                                          <option value="false">Нет</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                          Пожелания
                                        </label>
                                        <input
                                          type="text"
                                          name="wishes"
                                          value={editedTestDrive.wishes || ""}
                                          onChange={handleTestDriveInputChange}
                                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                      <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                          onClick={() =>
                                            handleSaveTestDrive(idx)
                                          }
                                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                                        >
                                          Сохранить
                                        </button>
                                        <button
                                          onClick={handleCancelEditTestDrive}
                                          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                        >
                                          Отмена
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-gray-800 dark:text-gray-200">
                                        <strong>Дата:</strong> {testDrive.date}
                                      </p>
                                      <p className="text-gray-800 dark:text-gray-200">
                                        <strong>Время:</strong> {testDrive.time}
                                      </p>
                                      <p className="text-gray-800 dark:text-gray-200">
                                        <strong>Модель:</strong>{" "}
                                        {testDrive.model}
                                      </p>
                                      <p className="text-gray-800 dark:text-gray-200">
                                        <strong>Локация:</strong>{" "}
                                        {testDrive.location}
                                      </p>
                                      <p className="text-gray-800 dark:text-gray-200">
                                        <strong>Способ связи:</strong>{" "}
                                        {testDrive.contactMethod}
                                      </p>
                                      <p className="text-gray-800 dark:text-gray-200">
                                        <strong>Водительские права:</strong>{" "}
                                        {testDrive.hasLicense ? "Есть" : "Нет"}
                                      </p>
                                      <p className="text-gray-800 dark:text-gray-200">
                                        <strong>Пожелания:</strong>{" "}
                                        {testDrive.wishes || "—"}
                                      </p>
                                      <div className="flex flex-col sm:flex-row gap-2 mt-3">
                                        <button
                                          onClick={() =>
                                            handleEditTestDrive(idx)
                                          }
                                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                                        >
                                          Редактировать
                                        </button>
                                        <button
                                          onClick={() => handleCancel(idx)}
                                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-400 transition"
                                        >
                                          Отменить тест-драйв
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Прошедшие тест-драйвы
                  </h3>
                  <div className="space-y-3">
                    {testDrives.filter((td) => !isTestDriveActive(td))
                      .length === 0 ? (
                      <div className="text-gray-400 dark:text-gray-500 p-4">
                        Нет прошедших тест-драйвов.
                      </div>
                    ) : (
                      testDrives
                        .filter((td) => !isTestDriveActive(td))
                        .map((testDrive, idx) => (
                          <div key={idx}>
                            <div
                              className={`bg-white dark:bg-[#222222] border border-gray-300 dark:border-gray-600 rounded-lg transition-shadow ${
                                openTestDriveIdx === idx
                                  ? "shadow dark:shadow-gray-700"
                                  : ""
                              }`}
                            >
                              <div
                                className={
                                  `flex flex-wrap items-center justify-between px-4 py-2 cursor-pointer transition-shadow ` +
                                  `hover:shadow-md dark:hover:shadow-gray-700 ${
                                    openTestDriveIdx === idx
                                      ? "rounded-b-none"
                                      : ""
                                  }`
                                }
                                onClick={() => handleToggle(idx)}
                              >
                                <span className="text-base text-gray-800 dark:text-gray-200">
                                  {testDrive.date} {testDrive.time}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-base text-gray-800 dark:text-gray-200">
                                    {testDrive.model}
                                  </span>
                                  <span
                                    className={`transition-transform duration-200 text-gray-800 dark:text-gray-200 ${
                                      openTestDriveIdx === idx
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  >
                                    ▼
                                  </span>
                                </div>
                              </div>
                              {openTestDriveIdx === idx && (
                                <div className="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 rounded-b-lg space-y-2 text-sm">
                                  <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Дата:</strong> {testDrive.date}
                                  </p>
                                  <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Время:</strong> {testDrive.time}
                                  </p>
                                  <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Модель:</strong> {testDrive.model}
                                  </p>
                                  <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Локация:</strong>{" "}
                                    {testDrive.location}
                                  </p>
                                  <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Способ связи:</strong>{" "}
                                    {testDrive.contactMethod}
                                  </p>
                                  <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Водительские права:</strong>{" "}
                                    {testDrive.hasLicense ? "Есть" : "Нет"}
                                  </p>
                                  <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Пожелания:</strong>{" "}
                                    {testDrive.wishes || "—"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
