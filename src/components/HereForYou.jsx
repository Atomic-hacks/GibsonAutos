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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 60,
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
      scale: 1.08,
      y: -30,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tabVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="bg-neutral-50 py-32 px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-neutral-900/5" />
      </div>

      <div className="max-w-8xl mx-auto relative">
        {/* Header */}
        <Motion.div
          className="text-center mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >
          <Motion.h2
            className="text-6xl lg:text-8xl font-extralight text-neutral-900 mb-12"
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
          <Motion.div variants={textVariants} className="space-y-3">
            <p className="text-2xl lg:text-3xl text-neutral-600 font-extralight tracking-wide">
              Discover below our additional services
            </p>
            <p className="text-2xl lg:text-3xl text-neutral-600 font-extralight tracking-wide">
              that will make your life easier.
            </p>
          </Motion.div>
        </Motion.div>

        {/* Tabs */}
        <Motion.div
          className="flex justify-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <div className="flex space-x-12 lg:space-x-16 relative">
            {tabs.map((tab, index) => (
              <Motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative pb-3 text-xl lg:text-2xl font-light transition-all duration-300 tracking-wide ${
                  activeTab === tab.id
                    ? "text-amber-500"
                    : "text-neutral-400 hover:text-neutral-700"
                }`}
                variants={tabVariants}
                custom={index}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
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
                      duration: 0.5,
                    }}
                  />
                )}

                {/* Hover glow effect */}
                <Motion.div
                  className="absolute inset-0 bg-amber-500/5 rounded-lg -m-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </Motion.button>
            ))}
          </div>
        </Motion.div>

        <div className="relative min-h-[700px] lg:min-h-[600px] max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <Motion.div
              key={activeTab}
              className="absolute inset-0 flex gap-16 lg:gap-20 items-center justify-between"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={staggerContainer}
            >
              <Motion.div
                className="order-2 lg:order-1 flex-1"
                variants={imageVariants}
              >
                <div className="relative overflow-hidden rounded-md shadow-2xl shadow-neutral-900/20 max-w-xl">
                  <div className="aspect-[4/5] w-full  h-[600px]">
                    <Motion.img
                      src={tabContent[activeTab].image}
                      alt={tabContent[activeTab].title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.15, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 2.2,
                        ease: "easeOut",
                        opacity: { duration: 1.8, ease: "easeOut" },
                      }}
                    />
                  </div>

                  {/* Premium overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent" />

                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
                </div>
              </Motion.div>

              {/* Text Content */}
              <Motion.div
                className="order-1 lg:order-2 lg:col-span-5 space-y-10"
                variants={staggerContainer}
              >
                <Motion.div variants={textVariants}>
                  <h3 className="text-5xl lg:text-6xl font-extralight text-neutral-900 mb-8 ">
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
                                duration: 1.2,
                                ease: "easeOut",
                                delay: 0.3 + index * 0.1,
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 1,
                              ease: "easeOut",
                              delay: 0.2 + index * 0.05,
                            }}
                          >
                            {word}{" "}
                          </Motion.span>
                        );
                      })}
                  </h3>
                </Motion.div>

                <Motion.p
                  className="text-2xl lg:text-3xl text-neutral-600 font-extralight leading-relaxed tracking-wide"
                  variants={textVariants}
                >
                  {tabContent[activeTab].subtitle}
                </Motion.p>

                <Motion.p
                  className="text-xl text-neutral-500 leading-relaxed font-light"
                  variants={textVariants}
                >
                  {tabContent[activeTab].description}
                </Motion.p>

                <Motion.div variants={textVariants} className="pt-4">
                  <Motion.button
                    className="group relative inline-flex items-center px-12 py-5 bg-amber-500 text-white font-light text-xl rounded-full overflow-hidden shadow-xl shadow-amber-500/25"
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Button background glow */}
                    <Motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    <span className="relative z-10 tracking-wide">
                      Learn More
                    </span>

                    {/* Subtle shine effect */}
                    <Motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: "-200%" }}
                      animate={{
                        x: "200%",
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        repeatDelay: 2,
                      }}
                    />
                  </Motion.button>
                </Motion.div>
              </Motion.div>
            </Motion.div>
          </AnimatePresence>
        </div>
        <section className="relative py-32 text-center ">
          <Motion.div
            className="max-w-4xl mx-auto px-6 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light mb-8">
              Ready to Experience
              <span className="block text-amber-500">Luxury?</span>
            </h2>

            <Motion.p
              className="text-xl text-white/80 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover our curated collection of premium vehicles and begin your
              journey with us today.
            </Motion.p>

            <Motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Motion.button
                className="px-8 py-4 bg-amber-500 text-black rounded-full font-medium hover:bg-amber-400 "
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="/vehicles">Explore Vehicles</a>
              </Motion.button>

              <Motion.button
                className="px-8 py-4 rounded-full text-black border border-black"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="/contact"> Contact Us</a>
              </Motion.button>
            </Motion.div>
          </Motion.div>
        </section>
      </div>
    </section>
  );
};

export default ServicesSection;
