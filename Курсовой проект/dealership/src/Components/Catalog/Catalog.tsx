import React from "react";
import Header from "../Header/Header";
import CatalogMain from "../CatalogMain";
import Footer from "../Footer/Footer";

const Catalog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#222222]">
      <Header />
      <CatalogMain />
      <Footer />
    </div>
  );
};

export default Catalog;