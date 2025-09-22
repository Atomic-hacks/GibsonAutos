import React from "react";
import { motion as Motion } from "framer-motion";

const Footer = () => {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop Vehicles", href: "/vehicles" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contacts", href: "/contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.25, 0, 1],
        delay: 0.8,
      },
    },
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800/20 via-transparent to-gray-800/20"></div>
      </div>

      <div className="relative z-10">
        <Motion.div
          className="max-w-7xl mx-auto px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Logo Section */}
            <Motion.div className="lg:col-span-1" variants={logoVariants}>
              <Motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-2xl font-light">
                  <span className="text-white">Gibson Autos</span>
                </div>
                <div className="text-sm text-gray-400 font-light mt-1 tracking-wider">
                  CAR DEALERSHIP
                </div>
              </Motion.div>
            </Motion.div>

            {/* Menu Section */}
            <Motion.div className="lg:col-span-1" variants={itemVariants}>
              <Motion.h3
                className="text-xl font-light mb-8 text-white"
                variants={itemVariants}
              >
                Menu
              </Motion.h3>
              <Motion.nav className="space-y-4" variants={containerVariants}>
                {menuItems.map((item, index) => (
                  <Motion.div key={index} variants={itemVariants}>
                    <Motion.a
                      href={item.href}
                      className="block text-gray-300 font-light hover:text-amber-500 transition-colors duration-300 relative group"
                      whileHover={{ x: 6 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <span className="relative">
                        {item.name}
                        <Motion.span
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                        />
                      </span>
                    </Motion.a>
                  </Motion.div>
                ))}
              </Motion.nav>
            </Motion.div>

            {/* Contacts Section */}
            <Motion.div className="lg:col-span-1" variants={itemVariants}>
              <Motion.h3
                className="text-xl font-light mb-8 text-white"
                variants={itemVariants}
              >
                Contacts
              </Motion.h3>
              <Motion.div className="space-y-6" variants={containerVariants}>
                {/* Address */}
                <Motion.div variants={itemVariants}>
                  <Motion.div
                    className="text-xs text-gray-500 font-light tracking-wider mb-2"
                    whileHover={{ color: "#9CA3AF" }}
                  >
                    ADDRESS
                  </Motion.div>
                  <Motion.div
                    className="text-gray-300 font-light leading-relaxed"
                    whileHover={{ color: "#FFFFFF", x: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    13b Eastern Bypass,
                    <br />
                    Port Harcourt, Rivers State
                  </Motion.div>
                </Motion.div>

                {/* Phone */}
                <Motion.div variants={itemVariants}>
                  <Motion.div
                    className="text-xs text-gray-500 font-light tracking-wider mb-2"
                    whileHover={{ color: "#9CA3AF" }}
                  >
                    PHONE
                  </Motion.div>
                  <Motion.a
                    href="tel:+234 906 633 5108"
                    className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                    whileHover={{ x: 2, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    +234 906 633 5108
                  </Motion.a>
                </Motion.div>

                {/* Email */}
                <Motion.div variants={itemVariants}>
                  <Motion.div
                    className="text-xs text-gray-500 font-light tracking-wider mb-2"
                    whileHover={{ color: "#9CA3AF" }}
                  >
                    EMAIL
                  </Motion.div>
                  <Motion.a
                    href="mailto:gibsontheophilus4@gmail.com"
                    className="text-gray-300 font-light hover:text-white transition-colors duration-300"
                    whileHover={{ x: 2, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    gibsontheophilus4@gmail.com
                  </Motion.a>
                </Motion.div>
              </Motion.div>
            </Motion.div>
          </div>
        </Motion.div>

        {/* Divider Line */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Motion.div
            className="h-px bg-gray-800 origin-left"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </div>

        {/* Bottom Section */}
        <Motion.div
          className="max-w-7xl mx-auto px-6 lg:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.25, 0, 1] }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <Motion.div
              className="text-sm text-gray-500 font-light"
              whileHover={{ color: "#9CA3AF" }}
              transition={{ duration: 0.3 }}
            >
              © 2023{" "}
              <Motion.a
                href="#"
                className="underline hover:text-gray-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Gibson Autos
              </Motion.a>
              <br />
              Premium car dealership since 2023
            </Motion.div>

            {/* Terms & Privacy */}
            <Motion.div className="flex items-center space-x-4 text-sm text-gray-500 font-light">
              <Motion.a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300 relative group"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <span className="underline">Terms & Conditions</span>
              </Motion.a>
              <span className="text-gray-700">•</span>
              <Motion.a
                href="#"
                className="hover:text-gray-400 transition-colors duration-300 relative group"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <span className="underline">Privacy Policy</span>
              </Motion.a>
            </Motion.div>
          </div>
        </Motion.div>
      </div>
    </footer>
  );
};

export default Footer;
