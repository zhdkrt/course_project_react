import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import Home from "./Components/Home/Home";
import Catalog from "./Components/Catalog/Catalog";
import AboutUs from "./Components/AboutUs/AboutUs";
import CarDetails from "./Components/CarsDetails/CarsDetails";
import Favorites from "./Components/Favorites/Favorites";
import Profile from "./Components/Profile/Profile";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
