import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("financing");

  const tabs = [
    { id: "financing", label: "Financing" },
    { id: "sell", label: "Sell Your Car" },
    { id: "rent", label: "Rent-a-Car" },
    { id: "repair", label: "Auto Repair" },
  ];

  const tabContent = {
    financing: {
      title: "We help you get credit.",
      subtitle:
        "Get pre-approved in minutes and let our finance team get you the best rate from our top lenders.",
      description:
        "Our extensive experience in the industry has enabled us to cultivate valuable relationships that we leverage to your advantage. This includes our partnerships with trusted lenders who offer competitive rates and flexible terms tailored to your financial situation.",
      image: "/int4.jpg",
    },
    sell: {
      title: "We make selling easy.",
      subtitle:
        "Get an instant quote for your vehicle and sell it hassle-free with our streamlined process.",
      description:
        "Skip the traditional selling headaches. Our expert team handles everything from valuation to paperwork, ensuring you get the best price for your vehicle with minimal effort on your part.",
      image: "/car1.jpg",
    },
    rent: {
      title: "Premium rentals available.",
      subtitle:
        "Access our fleet of premium vehicles for short-term or long-term rental needs.",
      description:
        "Whether you need a luxury vehicle for a special occasion or a reliable car for extended travel, our diverse fleet offers options for every need with competitive rates and exceptional service.",
      image: "/car3.jpg",
    },
    repair: {
      title: "Expert service guaranteed.",
      subtitle:
        "Professional automotive repair and maintenance services from certified technicians.",
      description:
        "Keep your vehicle running at peak performance with our comprehensive repair and maintenance services. Our certified technicians use state-of-the-art equipment and genuine parts.",
      image: "/eng2.jpg",
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const tabVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="bg-neutral-50 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-neutral-900/5" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <Motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-extralight text-neutral-900 mb-6 sm:mb-8 lg:mb-12 leading-tight"
            variants={textVariants}
          >
            We're here{" "}
            <Motion.span
              className="text-amber-500 inline-block"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: true }}
            >
              for you.
            </Motion.span>
          </Motion.h2>
          <Motion.div
            variants={textVariants}
            className="space-y-2 sm:space-y-3"
          >
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-neutral-600 font-extralight tracking-wide px-2">
              Discover below our additional services
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-neutral-600 font-extralight tracking-wide px-2">
              that will make your life easier.
            </p>
          </Motion.div>
        </Motion.div>

        {/* Mobile-optimized Tabs */}
        <Motion.div
          className="mb-12 sm:mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* Mobile: Grid layout for better touch targets */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {tabs.map((tab, index) => (
              <Motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative py-3 px-4 text-center text-sm font-medium transition-all duration-300 rounded-full ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-white shadow-lg"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-amber-200"
                }`}
                variants={tabVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {tab.label}
              </Motion.button>
            ))}
          </div>

          {/* Tablet and Desktop: Horizontal layout */}
          <div className="hidden sm:flex justify-center">
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 xl:gap-12 relative">
              {tabs.map((tab, index) => (
                <Motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative pb-2 lg:pb-3 text-lg lg:text-xl xl:text-2xl font-light transition-all duration-300 tracking-wide whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-amber-500"
                      : "text-neutral-400 hover:text-neutral-700"
                  }`}
                  variants={tabVariants}
                  custom={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <Motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        duration: 0.4,
                      }}
                    />
                  )}

                  {/* Hover glow effect - only on larger screens */}
                  <Motion.div
                    className="absolute inset-0 bg-amber-500/5 rounded-lg -m-3 hidden lg:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </Motion.button>
              ))}
            </div>
          </div>
        </Motion.div>

        {/* Content Area - Mobile-first responsive */}
        <div className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] mb-16 sm:mb-24 lg:mb-32">
          <AnimatePresence mode="wait">
            <Motion.div
              key={activeTab}
              className="absolute inset-0 flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20 items-center justify-between"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={staggerContainer}
            >
              {/* Image */}
              <Motion.div
                className="w-full lg:flex-1 order-1 lg:order-1"
                variants={imageVariants}
              >
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl shadow-neutral-900/20 max-w-sm sm:max-w-md lg:max-w-xl mx-auto lg:mx-0">
                  <div className="aspect-[4/5] w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px]">
                    <Motion.img
                      src={tabContent[activeTab].image}
                      alt={tabContent[activeTab].title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        opacity: { duration: 1.2, ease: "easeOut" },
                      }}
                    />
                  </div>

                  {/* Premium overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent" />

                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-1 ring-white/20" />
                </div>
              </Motion.div>

              {/* Text Content */}
              <Motion.div
                className="w-full lg:flex-1 order-2 lg:order-2 space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left"
                variants={staggerContainer}
              >
                <Motion.div variants={textVariants}>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight text-neutral-900 mb-4 sm:mb-6 lg:mb-8 leading-tight px-2 lg:px-0">
                    {tabContent[activeTab].title
                      .split(" ")
                      .map((word, index) => {
                        if (
                          word === "credit." ||
                          word === "easy." ||
                          word === "available." ||
                          word === "guaranteed."
                        ) {
                          return (
                            <Motion.span
                              key={index}
                              className="text-amber-500 px-1"
                              initial={{ opacity: 0, rotateY: 90 }}
                              animate={{ opacity: 1, rotateY: 0 }}
                              transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.2 + index * 0.05,
                              }}
                            >
                              {word}
                            </Motion.span>
                          );
                        }
                        return (
                          <Motion.span
                            key={index}
                            className="inline-block px-1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.6,
                              ease: "easeOut",
                              delay: 0.1 + index * 0.03,
                            }}
                          >
                            {word}{" "}
                          </Motion.span>
                        );
                      })}
                  </h3>
                </Motion.div>

                <Motion.p
                  className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-neutral-600 font-extralight leading-relaxed tracking-wide px-2 lg:px-0"
                  variants={textVariants}
                >
                  {tabContent[activeTab].subtitle}
                </Motion.p>

                <Motion.p
                  className="text-base sm:text-lg lg:text-xl text-neutral-500 leading-relaxed font-light px-2 lg:px-0"
                  variants={textVariants}
                >
                  {tabContent[activeTab].description}
                </Motion.p>

                <Motion.div variants={textVariants} className="pt-2 sm:pt-4">
                  <Motion.button
                    className="group relative inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-3 sm:py-4 lg:py-5 bg-amber-500 text-white font-light text-lg sm:text-xl rounded-full overflow-hidden shadow-lg sm:shadow-xl shadow-amber-500/25 w-full sm:w-auto transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                   

                    <span className="relative z-10 tracking-wide">
                      Learn More
                    </span>

                    {/* Subtle shine effect - reduced on mobile */}
                    <Motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 hidden sm:block"
                      initial={{ x: "-200%" }}
                      animate={{
                        x: "200%",
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                        repeatDelay: 3,
                      }}
                    />
                  </Motion.button>
                </Motion.div>
              </Motion.div>
            </Motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Section - Mobile optimized */}
        <section className="relative mt-40 py-16 sm:py-24 lg:py-32 text-center">
          <Motion.div
            className="max-w-4xl mx-auto px-6 sm:px-8 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-6 sm:mb-8 leading-tight text-black">
              Ready to Experience
              <span className="block text-amber-500 mt-2">Luxury?</span>
            </h2>

            <Motion.p
              className="text-lg sm:text-xl text-black/80 mb-8 sm:mb-12 leading-relaxed px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover our curated collection of premium vehicles and begin your
              journey with us today.
            </Motion.p>

            <Motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-400 text-base sm:text-lg w-full sm:w-auto transition-all duration-300 justify-center inline-flex items-center"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <a href="/vehicles" className="w-full text-center">
                  Explore Vehicles
                </a>
              </Motion.button>

              <Motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-black border border-black/30 hover:border-amber-500 hover:text-amber-500 text-base sm:text-lg w-full sm:w-auto transition-all duration-300 justify-center inline-flex items-center"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <a href="/contact" className="w-full text-center">
                  Contact Us
                </a>
              </Motion.button>
            </Motion.div>
          </Motion.div>
        </section>
      </div>
    </section>
  );
};

export default ServicesSection;
