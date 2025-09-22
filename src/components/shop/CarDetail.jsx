import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  IoChevronBack,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
  IoCalendarOutline,
  IoColorPaletteOutline,
  IoSettingsOutline,
  IoCheckmarkCircleOutline,
  IoShareSocialOutline,
  IoSearchOutline,
  IoChevronForward,
  IoCarOutline,
} from "react-icons/io5";
import { getCarById, getAllCars } from "../../data/carDatabase";

const CarDetail = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedVehicles, setRelatedVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);

      const carData = getCarById(carId);

      if (!carData) {
        setError("Vehicle not found");
        setIsLoading(false);
        return;
      }

      setCar(carData);

      // Get related vehicles (excluding current car)
      const allCars = getAllCars();
      if (allCars && allCars.length > 0) {
        const related = allCars
          .filter((vehicle) => vehicle.id !== carData.id)
          .slice(0, 3);
        setRelatedVehicles(related);
      }

      setCurrentImageIndex(0);
      setIsLoading(false);
    } catch (err) {
      console.error("Error loading car data:", err);
      setError("Error loading vehicle data");
      setIsLoading(false);
    }
  }, [carId]);

  const nextImage = useCallback(() => {
    if (car && car.images && car.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === car.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [car]);

  const prevImage = useCallback(() => {
    if (car && car.images && car.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? car.images.length - 1 : prev - 1
      );
    }
  }, [car]);

  const handleRelatedVehicleClick = useCallback(
    (vehicleId) => {
      // Use replace to avoid navigation stack issues
      navigate(`/vehicles/${vehicleId}`, { replace: false });
    },
    [navigate]
  );

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSearchClick = useCallback(() => {
    navigate("/vehicles");
  }, [navigate]);

  const handleShareClick = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: `${car?.brand} ${car?.model}`,
          text: `Check out this ${car?.brand} ${car?.model}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((error) => {
          console.log("Error copying to clipboard:", error);
        });
    }
  }, [car]);

  const handleImageIndicatorClick = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white"
        >
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading vehicle details...</p>
        </Motion.div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white"
        >
          <IoCarOutline className="mx-auto mb-4 text-white/40" size={64} />
          <p className="text-xl mb-4">{error || "Vehicle not found"}</p>
          <Motion.button
            onClick={() => navigate("/vehicles")}
            className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Back to Vehicles
          </Motion.button>
        </Motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="flex relative top-10">
          {/* Navigation */}
          <Motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleBackClick}
            className="absolute top-8 left-8 z-20 w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoChevronBack size={20} />
          </Motion.button>

          <Motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-8 right-20 z-20 w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchClick}
          >
            <IoSearchOutline size={20} />
          </Motion.button>

          <Motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShareClick}
          >
            <IoShareSocialOutline size={20} />
          </Motion.button>
        </div>

        {/* Image Gallery */}
        <div className="relative w-full h-full overflow-hidden">
          {car.images && car.images.length > 0 && (
            <Motion.img
              key={`${car.id}-${currentImageIndex}`}
              src={car.images[currentImageIndex]}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.src = "/placeholder-car-image.jpg"; // Fallback image
              }}
            />
          )}

          {/* Image Navigation */}
          {car.images && car.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Previous image"
              >
                <IoChevronBack size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Next image"
              >
                <IoChevronForward size={20} />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {car.images && car.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleImageIndicatorClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-amber-500" : "bg-white/30"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Hero Content */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 p-8 lg:p-16"
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-5xl lg:text-7xl font-light">{car.brand}</h1>
              <span
                className={`px-3 py-1 rounded-lg text-sm ${
                  car.status === "New"
                    ? "bg-green-500/20 text-green-400 border border-green-400/20"
                    : "bg-blue-500/20 text-blue-400 border border-blue-400/20"
                }`}
              >
                {car.status}
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-light text-amber-500 mb-6">
              {car.model}
            </h2>
            <p className="text-4xl lg:text-6xl font-light mb-8">
              {car.priceDisplay}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <IoCalendarOutline size={20} />
                <span>{car.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoSpeedometerOutline size={20} />
                <span>{car.mileage}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoColorPaletteOutline size={20} />
                <span>{car.color}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoSettingsOutline size={20} />
                <span>{car.fuelType}</span>
              </div>
            </div>
          </div>
        </Motion.div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Specifications */}
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl lg:text-4xl font-light mb-8">
                Specifications
              </h3>
              <div className="space-y-4">
                {car.specs &&
                  Object.entries(car.specs).map(([key, value], index) => (
                    <Motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center py-3 border-b border-white/10 hover:border-amber-500/30 transition-colors duration-300"
                    >
                      <span className="text-white/80">{key}</span>
                      <span className="text-amber-500 font-medium">
                        {value}
                      </span>
                    </Motion.div>
                  ))}
              </div>
            </Motion.div>

            {/* Features */}
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl lg:text-4xl font-light mb-8">Features</h3>
              <div className="grid gap-4">
                {car.features &&
                  car.features.map((feature, index) => (
                    <Motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                    >
                      <IoCheckmarkCircleOutline
                        className="text-amber-500 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-white/90">{feature}</span>
                    </Motion.div>
                  ))}
              </div>
            </Motion.div>
          </div>

          {/* Description */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-3xl lg:text-4xl font-light mb-8">
              About This Vehicle
            </h3>
            <p className="text-xl lg:text-2xl font-light text-white/80 leading-relaxed max-w-4xl">
              {car.description}
            </p>
          </Motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 lg:px-8 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl lg:text-5xl font-light mb-8">
              Interested in this vehicle?
            </h3>
            <p className="text-xl lg:text-2xl font-light text-white/80 mb-12">
              Get in touch with our team to schedule a viewing or learn more.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Motion.button
                className="flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-black rounded-full font-medium text-lg hover:bg-amber-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("tel:+1234567890", "_self")}
              >
                <IoCallOutline size={20} />
                Call Us
              </Motion.button>

              <Motion.button
                className="flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("mailto:info@example.com", "_self")}
              >
                <IoMailOutline size={20} />
                Email Inquiry
              </Motion.button>
            </div>

            <Motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-center gap-2 text-white/60"
            >
              <IoLocationOutline size={20} />
              <span>Visit our showroom for a test drive</span>
            </Motion.div>
          </Motion.div>
        </div>
      </section>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-3xl lg:text-4xl font-light mb-4">
                You might also like
              </h3>
              <Motion.button
                onClick={handleSearchClick}
                className="text-white/80 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 text-lg"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                View all vehicles
                <IoChevronForward size={20} />
              </Motion.button>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedVehicles.map((vehicle, index) => (
                <Motion.div
                  key={`related-${vehicle.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRelatedVehicleClick(vehicle.id);
                  }}
                >
                  <img
                    src={
                      vehicle.images && vehicle.images[0]
                        ? vehicle.images[0]
                        : "/placeholder-car-image.jpg"
                    }
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-car-image.jpg";
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-light text-amber-500">
                          {vehicle.brand}
                        </h4>
                        <h5 className="text-lg font-light text-white">
                          {vehicle.model}
                        </h5>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          vehicle.status === "New"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-white">
                        {vehicle.priceDisplay}
                      </span>
                      <Motion.div
                        className="flex items-center gap-1 text-amber-500"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm">View Details</span>
                        <IoChevronForward size={16} />
                      </Motion.div>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CarDetail;
