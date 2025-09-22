import React, { useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";

const PremiumAboutSection = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);

  // Simplified scroll tracking - only what we need
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Simplified, performant transforms
  const heroY = useTransform(heroProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.3]);

  // Simple parallax for images - no complex scaling/rotation
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Optimized animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden"
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Simplified Background */}
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

        {/* Content */}
        <Motion.div
          className="relative z-20 text-center max-w-4xl mx-auto px-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <Motion.div variants={fadeUp} className="mb-6">
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-medium">
              Since 1985
            </span>
          </Motion.div>

          <Motion.h1
            variants={fadeUp}
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight"
          >
            About <span className="text-amber-500 font-thin">Us</span>
          </Motion.h1>

          <Motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl font-light text-white/90 leading-relaxed"
          >
            Crafting exceptional automotive experiences with unparalleled luxury
            and precision
          </Motion.p>
        </Motion.div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="relative py-32 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-8">
                <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-medium">
                  Our Legacy
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
                Four Decades of
                <span className="block text-amber-500">Excellence</span>
              </h2>

              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p>
                  About Gibson Autos Established in 2023, Gibson Autos has grown
                  to become one of the most trusted car dealerships in Nigeria.
                  We specialize in providing high-quality vehicles from top
                  manufacturers at competitive prices.
                </p>
                <p>
                  Our mission is to make car ownership accessible to everyone
                  while maintaining the highest standards of quality and
                  customer service. With our extensive network and industry
                  expertise, we source the best vehicles to meet your needs.
                </p>
              </div>

              {/* Stats */}
              <Motion.div
                className="grid grid-cols-3 gap-8 mt-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {[
                  { number: "38+", label: "Years" },
                  { number: "5K+", label: "Vehicles Sold" },
                  { number: "98%", label: "Satisfaction" },
                ].map((stat) => (
                  <Motion.div
                    key={stat.label}
                    className="text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-light text-amber-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </Motion.div>
                ))}
              </Motion.div>
            </Motion.div>

            {/* Right Image - Simple Parallax */}
            <Motion.div
              className="relative"
              style={{ y: imageParallax }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-amber-500/10 z-10" />
                <img
                  src="/int7.jpg"
                  alt="Luxury car interior"
                  className="w-full h-[600px] object-cover"
                />

                {/* Floating Card */}
                <Motion.div
                  className="absolute bottom-8 left-8 bg-black/90 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 max-w-xs"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  viewport={{ once: true }}
                >
                  <div className="text-amber-500 text-sm mb-2 font-medium">
                    Precision Craftsmanship
                  </div>
                  <div className="text-white/90 font-light text-sm">
                    Every detail meticulously curated for the ultimate driving
                    experience
                  </div>
                </Motion.div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="text-black text-sm tracking-[0.3em] uppercase font-medium mb-4 block">
              Our Values
            </span>
            <h2 className="text-4xl text-black md:text-5xl lg:text-6xl font-light">
              What Drives <span className="text-amber-500">Us</span>
            </h2>
          </Motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Excellence",
                description:
                  "We pursue perfection in every interaction, every vehicle, and every service we provide.",
                icon: "✦",
              },
              {
                title: "Integrity",
                description:
                  "Transparency and honesty form the foundation of every relationship we build.",
                icon: "◆",
              },
              {
                title: "Innovation",
                description:
                  "We embrace cutting-edge technology and forward-thinking solutions.",
                icon: "▲",
              },
            ].map((value, index) => (
              <Motion.div
                key={value.title}
                className="text-center group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 rounded-full flex items-center justify-center text-2xl text-amber-500 group-hover:border-amber-500/60 transition-all duration-300">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-2xl text-black font-light mb-4 group-hover:text-amber-500 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-black leading-relaxed group-hover:text-neutral-900/80 transition-colors duration-300">
                  {value.description}
                </p>

                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="relative py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Image - Simple Animation */}
            <Motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                  alt="Professional team"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />

                {/* Simple decorative elements */}
                <div className="absolute top-6 left-6 w-20 h-px bg-amber-500" />
                <div className="absolute bottom-6 right-6 w-px h-20 bg-amber-500" />
              </div>
            </Motion.div>

            {/* Right Content */}
            <Motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-8">
                <span className="text-amber-500 text-sm tracking-[0.3em] uppercase font-medium">
                  Our Team
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
                Expert
                <span className="block text-amber-500">Professionals</span>
              </h2>

              <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                <p>
                  Our team consists of passionate automotive experts, each
                  bringing decades of experience and an unwavering commitment to
                  exceptional service.
                </p>
                <p>
                  From our certified technicians to our knowledgeable sales
                  consultants, every team member is dedicated to exceeding your
                  expectations.
                </p>
              </div>

              <Motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Motion.button
                  className="relative px-8 py-4 border border-amber-500/30 rounded-full text-white hover:bg-amber-500 hover:text-black transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 font-medium">
                    Meet Our Team
                  </span>
                </Motion.button>
              </Motion.div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
              className="px-8 py-4 bg-amber-500 text-black rounded-full font-medium hover:bg-amber-400 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Vehicles
            </Motion.button>

            <Motion.button
              className="px-8 py-4 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </Motion.button>
          </Motion.div>
        </Motion.div>
      </section>
    </div>
  );
};

export default PremiumAboutSection;
