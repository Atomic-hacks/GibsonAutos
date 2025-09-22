import React, { useState, useRef } from "react";
import { motion as Motion } from "framer-motion";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const FeaturedVehicles = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sample vehicle data - replace with your actual data
  const vehicles = [
    {
      id: 1,
      brand: "Hyundai",
      model: "IONIQ 6SE",
      image: "/car2.jpg",
      link: "/vehicles/hyundai-ioniq-6se",
    },
    {
      id: 2,
      brand: "Volkswagen",
      model: "Touareg TDI Lux",
      image: "/car3.jpg",
      link: "/vehicles/volkswagen-touareg-tdi",
    },
    {
      id: 3,
      brand: "Cadillac",
      model: "ELR Base",
      image: "/car4.jpg",
      link: "/vehicles/cadillac-elr-base",
    },
    {
      id: 4,
      brand: "BMW",
      model: "X5 M50i",
      image: "/car5.jpg",
      link: "/vehicles/bmw-x5-m50i",
    },
    {
      id: 5,
      brand: "Mercedes",
      model: "GLE 450",
      image: "car1.jpg",
      link: "/vehicles/mercedes-gle-450",
    },
  ];

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -400, behavior: "smooth" });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 400, behavior: "smooth" });
      setTimeout(checkScrollButtons, 300);
    }
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener("scroll", checkScrollButtons);
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  return (
    <section className="bg-black text-white py-16 px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-light mb-6">
              Featured Vehicles
            </h2>
            <Motion.a
              href="/vehicles"
              className="text-white/80 hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 text-lg"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              View all vehicles
              <IoChevronForward size={20} />
            </Motion.a>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <Motion.button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "hover:bg-amber-500 hover:text-black text-white"
                  : "text-white/30 cursor-not-allowed"
              }`}
              whileHover={canScrollLeft ? { scale: 1.05 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
            >
              <IoChevronBack size={20} />
            </Motion.button>
            <Motion.button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? "hover:bg-amber-500 hover:text-black text-white"
                  : "text-white/30 cursor-not-allowed"
              }`}
              whileHover={canScrollRight ? { scale: 1.05 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
            >
              <IoChevronForward size={20} />
            </Motion.button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {vehicles.map((vehicle, index) => (
            <Motion.div
              key={vehicle.id}
              className="flex-none w-80 lg:w-96"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Motion.a
                href={vehicle.link}
                className="block group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Vehicle Image */}
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                  <Motion.img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Vehicle Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-light text-white group-hover:text-amber-500 transition-colors duration-300">
                      {vehicle.brand}
                    </h3>
                    <p className="text-xl lg:text-2xl font-light text-white/90 group-hover:text-amber-500 transition-colors duration-300">
                      {vehicle.model}
                    </p>
                  </div>

                  <Motion.div
                    className="flex items-center gap-2 text-white/70 group-hover:text-amber-300 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <span className="text-lg">View Details</span>
                    <IoChevronForward size={18} />
                  </Motion.div>
                </div>
              </Motion.a>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
