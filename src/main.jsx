import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarDetail from "./components/shop/CarDetail.jsx";
import CarList from "./components/shop/CarList.jsx";
import PremiumAboutSection from "./components/about/About.jsx";
import PremiumContactPage from "./components/contact/Contact.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/vehicles" element={<CarList />} />
        <Route path="/vehicles/:carId" element={<CarDetail />} />
        <Route path="/about" element={<PremiumAboutSection />} />
        <Route path="/contact" element={<PremiumContactPage />} />
        <Route path="/" element={<App />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
