import React from "react";
import opks from "../../../public/OpelCorsa.jpg";

const KeyBenefits: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-8 bg-gradient-to-b from-gray-100 to-white text-black dark:from-[#222222] dark:to-[#222222] dark:text-white">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10">
        Opel – Инновации для доступного комфорта
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto">
        <div className="flex-1 max-w-[680px] w-full bg-black/85 px-6 py-10 rounded-lg lg:rounded-r-none dark:bg-[#2a2a2a]">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-white">
            Ключевые преимущества
          </h3>
          <ul className="list-disc lg:text-[16px] list-inside space-y-3 text-base sm:text-lg text-white/90">
            <li>FlexRide: адаптивная подвеска для комфорта и устойчивости.</li>
            <li>
              IntelliLux LED: матричные фары для отличной видимости и
              предотвращения ослепления.
            </li>
            <li>
              Экономичные двигатели: баланс производительности и расхода
              топлива.
            </li>
            <li>OnStar: сервис навигации и экстренной помощи.</li>
            <li>
              Эргономичные сиденья: сертифицированные AGR для снижения
              утомляемости водителя.
            </li>
          </ul>
        </div>
        <div className="relative flex-1 max-w-[600px] w-full h-64 sm:h-80 lg:h-[25.5rem]">
          <img
            className="w-full h-full rounded-lg lg:rounded-l-none shadow-xl object-cover"
            src={opks}
            alt="Opel Corsa Electric"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
