const AboutUsBanner = () => {
  return (
    <div>
      <div className="flex items-center justify-center bg-[url(../../../public/aboutusbanner.jpg)] h-[697px] bg-no-repeat bg-cover">
        <div className="flex items-center w-[805px] h-[126px] text-center text-2xl font-normal leading-normal shrink-0 rounded-[25px] bg-[rgba(77,77,79,0.15)] dark:bg-[#222222]/70 shadow-[0_0_3px_1px_rgba(0,0,0,0.35)] backdrop-blur-[2px] text-white">
          <p>
            Opel – это страсть, увлеченность, внимание к деталям,
            ответственность, стремление и, конечно, уверенность в будущем. Это о
            нас.
          </p>
        </div>
      </div>
      <p className="text-4xl text-center mt-10 dark:text-white">
        Мы — официальный дилер Opel в Беларуси
      </p>
    </div>
  );
};

export default AboutUsBanner;
