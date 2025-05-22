import img1 from "../../public/1_5sm7-st.jpg";
import img2 from "../../public/2171688-ckyb3thfmn-whr.jpg";
import img3 from "../../public/Opel-Astra-Electric-6s.jpg";
import img4 from "../../public/563x304.jpg";
import img5 from "../../public/116DF.jpg";
import img6 from "../../public/5C00.jpg";
import img7 from "../../public/2F35.jpg";
import img8 from "../../public/3DE7.jpg";
import img9 from "../../public/1197D.jpg";
import img10 from "../../public/210FF.jpg";
import img11 from "../../public/3FA8.jpg";
import img12 from "../../public/5D84.jpg";
import img13 from "../../public/11069.jpg";
import img14 from "../../public/2DE5.jpg";
import img15 from "../../public/3CA0.jpg";
import img16 from "../../public/4BB7.jpg";
import img17 from "../../public/116FF.jpg";
import img18 from "../../public/2F46.jpg";
import img19 from "../../public/3DF8.jpg";
import img20 from "../../public/7AD3.jpg";
import img21 from "../../public/11BCC.jpg";
import img22 from "../../public/5EBB.jpg";
import img23 from "../../public/21431.jpg";
import img24 from "../../public/6DDF.jpg";
import img25 from "../../public/Vivaro_1.jpg";
import img26 from "../../public/Vivaro_2.jpg";
import img27 from "../../public/Vivaro_3.jpg";
import img28 from "../../public/Vivaro_4.jpg";
import img29 from "../../public/130.jpg";
import img30 from "../../public/225.jpg";
import img31 from "../../public/321.jpg";
import img32 from "../../public/518.jpg";
import img33 from "../../public/Adam_1.jpg";
import img34 from "../../public/Adam_2.jpg";
import img35 from "../../public/Adam_11.jpg";
import img36 from "../../public/Adam_21.jpg";
import img37 from "../../public/Cascada_1.jpg";
import img38 from "../../public/Cascada_2.jpg";
import img39 from "../../public/Cascada_3.jpg";
import img40 from "../../public/Cascada_4.jpg";

export interface Car {
  id: string;
  name: string;
  imageUrl: string;
  images: string[];
  title: string;
  description: string;
  fuel: string;
  engineType: string;
  driveType: string;
  transmissionType: string;
  bodyType: string;
  mileage: number;
  color: string;
  price: string;
}

export const cars: Car[] = [
  {
    id: "1",
    name: "Opel Astra",
    imageUrl: `${img1}`,
    images: [`${img1}`, `${img2}`, `${img3}`, `${img4}`],
    title: "Opel Astra",
    description: "Удобный и экономичный хэтчбек для города",
    fuel: "Бензиновый",
    engineType: "Бензиновый",
    driveType: "Передний",
    transmissionType: "Механическая",
    bodyType: "Хэтчбек",
    mileage: 40000,
    color: "Синий",
    price: "180000",
  },
  {
    id: "2",
    name: "Opel Insignia",
    imageUrl: `${img5}`,
    images: [`${img5}`, `${img6}`, `${img7}`, `${img8}`],
    title: "Opel Insignia",
    description: "Стильный седан с отличной динамикой",
    fuel: "Дизельный",
    engineType: "Дизельный",
    driveType: "Передний",
    transmissionType: "Автоматическая",
    bodyType: "Седан",
    mileage: 70000,
    color: "Синий",
    price: "220000",
  },
  {
    id: "3",
    name: "Opel Mokka",
    imageUrl: `${img9}`,
    images: [`${img9}`, `${img10}`, `${img11}`, `${img12}`],
    title: "Opel Mokka",
    description: "Компактный кроссовер с высокими характеристиками",
    fuel: "Бензиновый",
    engineType: "Бензиновый",
    driveType: "Полный",
    transmissionType: "Автоматическая",
    bodyType: "Кроссовер",
    mileage: 35000,
    color: "Белый",
    price: "250000",
  },
  {
    id: "4",
    name: "Opel Corsa",
    imageUrl: `${img13}`,
    images: [`${img13}`, `${img14}`, `${img15}`, `${img16}`],
    title: "Opel Corsa",
    description: "Компактный городской автомобиль с низким расходом топлива",
    fuel: "Бензиновый",
    engineType: "Бензиновый",
    driveType: "Передний",
    transmissionType: "Механическая",
    bodyType: "Хэтчбек",
    mileage: 30000,
    color: "Красный",
    price: "140000",
  },
  {
    id: "5",
    name: "Opel Zafira",
    imageUrl: `${img17}`,
    images: [`${img17}`, `${img18}`, `${img19}`, `${img20}`],
    title: "Opel Zafira",
    description: "Минивэн для всей семьи с комфортом и пространством",
    fuel: "Бензиновый",
    engineType: "Бензиновый",
    driveType: "Передний",
    transmissionType: "Автоматическая",
    bodyType: "Минивэн",
    mileage: 80000,
    color: "Белый",
    price: "170000",
  },
  {
    id: "6",
    name: "Opel Grandland X",
    imageUrl: `${img21}`,
    images: [`${img21}`, `${img22}`, `${img23}`, `${img24}`],
    title: "Opel Grandland X",
    description: "Кроссовер с отличной управляемостью и просторным салоном",
    fuel: "Дизельный",
    engineType: "Дизельный",
    driveType: "Полный",
    transmissionType: "Автоматическая",
    bodyType: "Кроссовер",
    mileage: 45000,
    color: "Темно-серый",
    price: "280000",
  },
  {
    id: "7",
    name: "Opel Vivaro",
    imageUrl: `${img25}`,
    images: [`${img25}`, `${img26}`, `${img27}`, `${img28}`],
    title: "Opel Vivaro",
    description:
      "Фургон для коммерческих перевозок с большой грузоподъемностью",
    fuel: "Дизельный",
    engineType: "Дизельный",
    driveType: "Передний",
    transmissionType: "Механическая",
    bodyType: "Фургон",
    mileage: 90000,
    color: "Бежевый",
    price: "220000",
  },
  {
    id: "8",
    name: "Opel Combo",
    imageUrl: `${img29}`,
    images: [`${img29}`, `${img30}`, `${img31}`, `${img32}`],
    title: "Opel Combo",
    description: "Универсальный минивэн с высокой проходимостью",
    fuel: "Бензиновый",
    engineType: "Бензиновый",
    driveType: "Передний",
    transmissionType: "Механическая",
    bodyType: "Минивэн",
    mileage: 75000,
    color: "Серый",
    price: "150000",
  },
  {
    id: "9",
    name: "Opel Adam",
    imageUrl: `${img33}`,
    images: [`${img33}`, `${img34}`, `${img35}`, `${img36}`],
    title: "Opel Adam",
    description: "Компактный и стильный городской автомобиль",
    fuel: "Бензиновый",
    engineType: "Бензиновый",
    driveType: "Передний",
    transmissionType: "Автоматическая",
    bodyType: "Хэтчбек",
    mileage: 25000,
    color: "Жёлтый",
    price: "120000",
  },
  {
    id: "10",
    name: "Opel Cascada",
    imageUrl: `${img37}`,
    images: [`${img37}`, `${img38}`, `${img39}`, `${img40}`],
    title: "Opel Cascada",
    description: "Элегантный кабриолет для тех, кто ценит стиль",
    fuel: "Бензиновый",
    engineType: "Бензиновый",
    driveType: "Передний",
    transmissionType: "Автоматическая",
    bodyType: "Кабриолет",
    mileage: 50000,
    color: "Зелёный",
    price: "220000",
  },
];
