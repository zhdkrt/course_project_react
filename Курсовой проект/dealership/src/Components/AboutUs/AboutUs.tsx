import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AboutUsBanner from "./AboutUsBanner";
import AboutUsSlider from "./AboutUsSlider";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#222222] text-black dark:text-white">
      <Header></Header>
      <AboutUsBanner></AboutUsBanner>
      <AboutUsSlider></AboutUsSlider>
      <Footer></Footer>
    </div>
  );
};

export default AboutUs;
