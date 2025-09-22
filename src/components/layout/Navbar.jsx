import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop Vehicles", href: "/vehicles" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contacts", href: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1],
      },
    },
    visible: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    hidden: {
      x: -50,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <Motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-white/15 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Motion.div
              className="flex-shrink-0"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <a href="/" className="block">
                <div
                  className={`text-2xl font-light transition-colors duration-300 ${
                    scrolled || isOpen ? "text-gray-900" : "text-white"
                  }`}
                >
                  <span>Gibon Autos</span>
                </div>
                <div
                  className={`text-xs font-light mt-0.5 tracking-wider transition-colors duration-300 ${
                    scrolled || isOpen ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  CAR DEALERSHIP
                </div>
              </a>
            </Motion.div>

            {/* Desktop Menu */}
            <Motion.div
              className="hidden lg:flex items-center space-x-12"
              variants={itemVariants}
            >
              {menuItems.map((item, index) => (
                <Motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group"
                >
                  <a
                    href={item.href}
                    className={`relative text-lg font-light transition-all duration-300 group ${
                      scrolled || isOpen
                        ? "text-neutral-800 group-hover:text-amber-500"
                        : "text-white/90 group-hover:text-amber-500"
                    }`}
                  >
                    {item.name}
                    <Motion.span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-current transform origin-left transition-all duration-300 ${
                        scrolled || isOpen ? "bg-gray-900" : "bg-white"
                      }`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                  </a>
                </Motion.div>
              ))}
            </Motion.div>

            {/* CTA Button */}
            <Motion.div className="hidden lg:block" variants={itemVariants}>
              <Motion.a
                href="#"
                className={`inline-flex items-center px-6 py-4 text-sm font-light rounded-full transition-all duration-300 ${
                  scrolled || isOpen
                    ? " text-white bg-amber-500/90 hover:bg-amber-300"
                    : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Get Started
              </Motion.a>
            </Motion.div>

            {/* Mobile Menu Button */}
            <Motion.button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <Motion.span
                  className={`w-full h-0.5 transform transition-all duration-300 ${
                    scrolled || isOpen ? "bg-gray-900" : "bg-white"
                  }`}
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <Motion.span
                  className={`w-full h-0.5 transition-all duration-300 ${
                    scrolled || isOpen ? "bg-gray-900" : "bg-white"
                  }`}
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <Motion.span
                  className={`w-full h-0.5 transform transition-all duration-300 ${
                    scrolled || isOpen ? "bg-gray-900" : "bg-white"
                  }`}
                  animate={
                    isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                  }
                />
              </div>
            </Motion.button>
          </div>
        </div>
      </Motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <Motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <Motion.div
              className="fixed top-20 left-0 right-0 bg-white z-40 lg:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="px-6 py-8">
                <Motion.nav className="space-y-8">
                  {menuItems.map((item, index) => (
                    <Motion.div key={index} variants={mobileItemVariants}>
                      <Motion.a
                        href={item.href}
                        className="block text-2xl font-light text-neutral-900 hover:text-amber-600 transition-colors duration-300 relative group"
                        onClick={() => setIsOpen(false)}
                        whileHover={{ x: 10, scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        {item.name}
                        <Motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-neutral-900"
                          initial={{ width: 0 }}
                          whileHover={{ width: "60px" }}
                          transition={{ duration: 0.3 }}
                        />
                      </Motion.a>
                    </Motion.div>
                  ))}
                </Motion.nav>

                {/* Mobile CTA */}
                <Motion.div
                  className="mt-12 pt-8 border-t border-gray-200"
                  variants={mobileItemVariants}
                >
                  <Motion.a
                    href="#"
                    className="inline-flex items-center justify-center px-6 py-4 bg-amber-500 text-white font-light text-lg rounded-full hover:bg-amber-600 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    Get Started
                  </Motion.a>
                </Motion.div>

                {/* Contact Info */}
                <Motion.div
                  className="mt-8 pt-8 border-t border-gray-200 space-y-4"
                  variants={mobileItemVariants}
                >
                  <div className="text-sm text-gray-500 font-light">
                    <div className="mb-2">
                      7416 Ireland Ct, El Paso, TX 79930
                    </div>
                    <div className="mb-2">
                      <a
                        href="tel:(417)932-6616"
                        className="hover:text-gray-700 transition-colors"
                      >
                        (417) 932-6616
                      </a>
                    </div>
                    <div>
                      <a
                        href="mailto:info@reliable.com"
                        className="hover:text-gray-700 transition-colors"
                      >
                        info@reliable.com
                      </a>
                    </div>
                  </div>
                </Motion.div>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
