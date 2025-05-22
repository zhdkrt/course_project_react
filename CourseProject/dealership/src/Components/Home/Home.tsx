import Header from "../Header/Header";
import CarBanner from "../CarBanner/CarBanner";
import KeyBenefits from "../KeyBenefits/KeyBenefits";
import CarCardList from "../HomeCarCard/HomeCarList";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#222222]">
      <Header />
      <CarBanner />
      <KeyBenefits />
      <CarCardList />
      <Footer />
    </div>
  );
};

export default Home;
