import React from "react";
import navlogo from "../../../public/navbar_logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4">
        <div className="flex items-center">
          <img src={navlogo} alt="Logo" className="mr-2 h-10" />
          <span>Спасибо, что выбираете нас</span>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-bold">Наши соц. сети</h3>
          <a
            href="https://www.instagram.com/zhdk.rt"
            className="text-blue-400 underline"
          >
            Инстаграм
          </a>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-bold">Часы работы</h3>
          <p>Пн – Пт: 09:00 – 20:00</p>
          <p>Сб: 09:00 – 18:00</p>
          <p>Вс: закрыто</p>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-bold">Наше местоположение</h3>
          <p>г. Минск, ул. Бобруйская 25</p>
        </div>
      </div>
      <div className="text-center text-[#636363] font-inter text-sm font-normal leading-normal mt-4">
        Официальный дилер Opel в Беларуси
      </div>
    </footer>
  );
};

export default Footer;
