import React, { useRef } from "react";
import { motion as Motion, useTransform, useScroll } from "framer-motion";

const PremiumContactPage = () => {
  const containerRef = useRef(null);

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const heroRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.3]);

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6"
        ref={heroRef}
      >
        <Motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/50 to-black/70 z-10" />
          <img
            src="/show1.jpg"
            alt="Luxury showroom"
            className="w-full h-full object-cover"
          />
        </Motion.div>
        <Motion.div
          className="text-center max-w-4xl mx-auto relative z-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Motion.div variants={fadeUp} className="mb-6">
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-medium">
              Get In Touch
            </span>
          </Motion.div>

          <Motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight"
          >
            Contact <span className="text-amber-500 font-thin">Us</span>
          </Motion.h1>

          <Motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl font-light text-white/90 leading-relaxed max-w-2xl mx-auto"
          >
            Ready to begin your luxury automotive journey? We're here to make it
            extraordinary.
          </Motion.p>
        </Motion.div>
      </section>

      {/* Main Content */}
      <section className="relative py-32 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Contact Information */}
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-12">
                Let's Connect
              </h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Visit Our Showroom",
                    primary: "123 Luxury Drive",
                    secondary: "Premium District, City 12345",
                    tertiary:
                      "Monday - Saturday: 9AM - 7PM\nSunday: 12PM - 6PM",
                    icon: "📍",
                  },
                  {
                    title: "Call Us",
                    primary: "+1 (555) 123-4567",
                    secondary: "Sales & General Inquiries",
                    tertiary: "Available 24/7 for urgent matters",
                    icon: "📞",
                  },
                  {
                    title: "Email Us",
                    primary: "hello@premiumautos.com",
                    secondary: "We respond within 2 hours",
                    tertiary: "For detailed inquiries and quotes",
                    icon: "✉️",
                  },
                ].map((item, index) => (
                  <Motion.div
                    key={item.title}
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-amber-500/20 transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-light mb-2 group-hover:text-amber-500 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-white font-medium mb-1">
                          {item.primary}
                        </p>
                        <p className="text-white/70 text-sm mb-1">
                          {item.secondary}
                        </p>
                        <p className="text-white/50 text-sm whitespace-pre-line">
                          {item.tertiary}
                        </p>
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <Motion.div
                className="mt-16 pt-8 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-light mb-6 text-amber-500">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Motion.button
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:border-amber-500/50 hover:bg-white/10 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Test Drive
                  </Motion.button>
                  <Motion.button
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:border-amber-500/50 hover:bg-white/10 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Quote
                  </Motion.button>
                  <Motion.button
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:border-amber-500/50 hover:bg-white/10 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Service
                  </Motion.button>
                </div>
              </Motion.div>
            </Motion.div>

            {/* Contact Form */}
            <Motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12"
            >
              <h3 className="text-2xl font-light mb-8 text-center">
                Send Us a Message
              </h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/50 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                    />
                  </Motion.div>
                  <Motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/50 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                    />
                  </Motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/50 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                    />
                  </Motion.div>
                  <Motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/50 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 focus:outline-none"
                    />
                  </Motion.div>
                </div>

                <Motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 focus:outline-none appearance-none cursor-pointer">
                    <option value="" className="bg-gray-900">
                      Select Inquiry Type
                    </option>
                    <option value="purchase" className="bg-gray-900">
                      Vehicle Purchase
                    </option>
                    <option value="service" className="bg-gray-900">
                      Service & Maintenance
                    </option>
                    <option value="financing" className="bg-gray-900">
                      Financing Options
                    </option>
                    <option value="trade" className="bg-gray-900">
                      Trade-In Evaluation
                    </option>
                    <option value="other" className="bg-gray-900">
                      Other
                    </option>
                  </select>
                </Motion.div>

                <Motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <textarea
                    placeholder="Tell us about your automotive needs..."
                    rows={5}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-white/50 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 focus:outline-none resize-none"
                  ></textarea>
                </Motion.div>

                <Motion.button
                  className="w-full py-4 bg-amber-500 text-black font-medium rounded-full hover:bg-amber-400 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert("Form submitted! (Demo only)")}
                >
                  Send Message
                </Motion.button>

                <p className="text-white/50 text-sm text-center">
                  We'll get back to you within 2 hours during business hours.
                </p>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Find <span className="text-amber-500">Us</span>
            </h2>
            <p className="text-white/70">
              Located in the heart of the premium automotive district
            </p>
          </Motion.div>

          <Motion.div
            className="bg-white/10 rounded-3xl p-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800 rounded-3xl h-96 flex items-center justify-center text-white/50">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p>Interactive Map Placeholder</p>
                <p className="text-sm mt-2">
                  123 Luxury Drive, Premium District
                </p>
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 text-center">
        <Motion.div
          className="max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Ready to Start Your <span className="text-amber-500">Journey?</span>
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Experience luxury automotive excellence like never before.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Motion.button
              className="px-8 py-4 bg-amber-500 text-black font-medium rounded-full hover:bg-amber-400 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/vehicles">Browse Vehicles</a>
            </Motion.button>
            <Motion.button
              className="px-8 py-4 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/about">About us</a>
            </Motion.button>
          </div>
        </Motion.div>
      </section>
    </div>
  );
};

export default PremiumContactPage;
