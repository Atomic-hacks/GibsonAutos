"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion as Motion, useAnimation } from "framer-Motion";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

const Hero = ({ videoSrc = "/car-int.mp4" }) => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();

  // Handle video autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }
  }, []);

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Start animations on mount
  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
    };
    sequence();
  }, [controls]);

  const parallaxOffset = scrollPosition * 0.3;

  // Premium easing curves
  const premiumEase = [0.16, 1, 0.3, 1]; // Custom cubic-bezier for luxury feel
  const softEase = [0.25, 0.46, 0.45, 0.94];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset}px) scale(1.05)`,
            transition: "transform 0.05s ease-out",
            height: "110%",
          }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{
            scale: 1.05,
            opacity: 1,
          }}
          transition={{
            duration: 2.5,
            ease: premiumEase,
            opacity: { duration: 1.8, ease: "easeOut" },
          }}
        >
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Motion.div>
      </div>

      {/* Overlay */}
      <Motion.div
        className="absolute inset-0 bg-black/40 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-start justify-center pl-8 md:pl-20">
        {/* Main Title */}
        <div className="text-left text-white max-w-2xl mb-8 overflow-hidden">
          <Motion.h1
            className="text-6xl md:text-8xl font-light tracking-wide mb-8 text-white"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1.8,
              ease: premiumEase,
              delay: 0.8,
            }}
          >
            <Motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1.8,
                ease: premiumEase,
                delay: 0.8,
              }}
              className="inline-block"
            >
              Gibson
            </Motion.span>{" "}
            <Motion.span
              className="text-amber-500 inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.8,
                ease: premiumEase,
                delay: 1.2,
              }}
            >
              Autos
            </Motion.span>
          </Motion.h1>

          <Motion.p
            className="text-neutral-300 text-lg md:text-xl font-light tracking-wide leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: softEase,
              delay: 1.6,
            }}
          >
            Premium automotive excellence, redefined
          </Motion.p>
        </div>

        {/* Buttons */}
        <Motion.div
          className="flex items-center gap-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: softEase,
            delay: 2,
          }}
        >
          <Motion.button
            className="group relative overflow-hidden bg-amber-500 rounded-full px-4 py-4 md:px-8 md:py-5 flex items-baseline gap-2"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.4, ease: softEase },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
          >
            {/* Button background glow effect */}
            <Motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{
                scale: 1,
                opacity: 0.2,
                transition: { duration: 0.4, ease: softEase },
              }}
            />

            <span className="relative z-10 text-black font-medium">
              view our cars
            </span>

            <Motion.span
              className="relative z-10"
              whileHover={{
                rotate: 45,
                transition: { duration: 0.3, ease: softEase },
              }}
            >
              <FaArrowUp className="rotate-45" />
            </Motion.span>
          </Motion.button>

          <Motion.button
            className="group text-neutral-100 hover:text-amber-500 transition-colors duration-500 flex items-center gap-1"
            whileHover={{
              x: 8,
              transition: { duration: 0.4, ease: softEase },
            }}
          >
            <span>get in touch</span>
            <Motion.div
              whileHover={{
                x: 4,
                transition: { duration: 0.4, ease: softEase },
              }}
            >
              <FaChevronRight />
            </Motion.div>
          </Motion.button>
        </Motion.div>

        {/* Bottom Text */}
        <Motion.h1
          className="text-neutral-50 font-semibold text-xl md:text-3xl mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.6,
            ease: premiumEase,
            delay: 2.4,
          }}
        >
          <Motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 2.8,
              ease: "easeOut",
            }}
          >
            Find your dream vehicle right now
          </Motion.span>
        </Motion.h1>
      </div>
    </section>
  );
};

export default Hero;
