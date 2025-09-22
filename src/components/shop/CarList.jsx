import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  IoChevronBack,
  IoCarOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoOptionsOutline,
  IoChevronForward,
  IoGridOutline,
  IoListOutline,
} from "react-icons/io5";
import { getAllCars } from "../../data/carDatabase";

const CarList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(getAllCars());
  const [filters, setFilters] = useState({
    category: "all",
    fuelType: "all",
    priceRange: "all",
    status: "all",
  });
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let filtered = getAllCars();

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.year.toString().includes(searchTerm) ||
          car.color.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (car) => car.category.toLowerCase() === filters.category
      );
    }
    if (filters.fuelType !== "all") {
      filtered = filtered.filter(
        (car) => car.fuelType.toLowerCase() === filters.fuelType
      );
    }
    if (filters.status !== "all") {
      filtered = filtered.filter(
        (car) => car.status.toLowerCase() === filters.status
      );
    }
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((car) => {
        if (max) {
          return car.price >= min && car.price <= max;
        } else {
          return car.price >= min;
        }
      });
    }

    setFilteredVehicles(filtered);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      fuelType: "all",
      priceRange: "all",
      status: "all",
    });
    setSearchTerm("");
  };

  const handleVehicleClick = (vehicleId) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="sticky top-20 bg-black/80 mb-16 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Motion.button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoChevronBack size={20} />
            </Motion.button>
            <h1 className="text-3xl lg:text-4xl font-light">Our Vehicles</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <IoSearchOutline
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
              size={20}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by brand, model, year, or color..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-12 py-4 text-white placeholder-white/60 focus:outline-none focus:border-amber-500 transition-colors duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
              >
                <IoCloseOutline size={20} />
              </button>
            )}
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Motion.button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  showFilters
                    ? "bg-amber-500 text-black border-amber-500"
                    : "border-white/20 text-white hover:border-amber-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoOptionsOutline size={18} />
                Filters
              </Motion.button>

              <span className="text-white/60">
                {filteredVehicles.length} vehicle
                {filteredVehicles.length !== 1 ? "s" : ""} found
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === "grid"
                    ? "bg-amber-500 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <IoGridOutline size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === "list"
                    ? "bg-amber-500 text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <IoListOutline size={20} />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <Motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10 overflow-hidden"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-white/80 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="w-full bg-black border border-white/20 rounded-lg p-2 text-white"
                    >
                      <option value="all">All Categories</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="coupe">Coupe</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">
                      Fuel Type
                    </label>
                    <select
                      value={filters.fuelType}
                      onChange={(e) =>
                        handleFilterChange("fuelType", e.target.value)
                      }
                      className="w-full bg-black border border-white/20 rounded-lg p-2 text-white"
                    >
                      <option value="all">All Fuel Types</option>
                      <option value="electric">Electric</option>
                      <option value="gasoline">Gasoline</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">
                      Price Range
                    </label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) =>
                        handleFilterChange("priceRange", e.target.value)
                      }
                      className="w-full bg-black border border-white/20 rounded-lg p-2 text-white"
                    >
                      <option value="all">All Prices</option>
                      <option value="0-60000">Under $60,000</option>
                      <option value="60000-80000">$60,000 - $80,000</option>
                      <option value="80000-100000">$80,000 - $100,000</option>
                      <option value="100000">$100,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="w-full bg-black border border-white/20 rounded-lg p-2 text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="used">Used</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Motion.button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear All
                    </Motion.button>
                  </div>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {filteredVehicles.length === 0 ? (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <IoCarOutline className="mx-auto mb-4 text-white/40" size={64} />
            <h3 className="text-2xl font-light mb-2">No vehicles found</h3>
            <p className="text-white/60">
              Try adjusting your search criteria or filters.
            </p>
          </Motion.div>
        ) : (
          <Motion.div
            layout
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredVehicles.map((vehicle, index) => (
              <Motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={
                  viewMode === "grid"
                    ? "bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                    : "bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors duration-300 cursor-pointer flex"
                }
                onClick={() => handleVehicleClick(vehicle.id)}
                whileHover={{ y: -5 }}
              >
                <div className={viewMode === "grid" ? "" : "w-1/3"}>
                  <img
                    src={vehicle.images[0]}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className={`w-full object-cover ${
                      viewMode === "grid" ? "h-48" : "h-full"
                    }`}
                  />
                </div>
                <div
                  className={`p-6 ${
                    viewMode === "grid"
                      ? ""
                      : "flex-1 flex flex-col justify-between"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-light text-amber-500">
                          {vehicle.brand}
                        </h3>
                        <h4 className="text-lg font-light text-white">
                          {vehicle.model}
                        </h4>
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

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>{vehicle.year}</span>
                        <span>{vehicle.mileage}</span>
                        <span>{vehicle.fuelType}</span>
                      </div>
                      <p className="text-white/80">{vehicle.color}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light text-white">
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
          </Motion.div>
        )}
      </div>
    </div>
  );
};

export default CarList;
