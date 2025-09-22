"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";



export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}) => {
  // Use useState with a lazy initializer to ensure this only runs on client
  const [active, setActive] = useState(0);
  
  // Store rotation values in a ref to keep them consistent across renders
  const [rotationValues, setRotationValues] = useState();
  
  // Client-side only flag
  const [isClient, setIsClient] = useState(false);

  // Initialize rotation values once on client-side only
  useEffect(() => {
    setIsClient(true);
    
    // Generate and store stable rotation values for each testimonial
    const rotations = testimonials.map(() => Math.floor(Math.random() * 15) - 7);
    setRotationValues(rotations);
  }, [testimonials.length]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  // Setup autoplay only on client side
  useEffect(() => {
    if (!isClient || !autoplay) return;
    
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, isClient]);

  // Get rotation for a specific card
  const getRotation = (index) => {
    // Before client-side initialization, return 0 to prevent hydration mismatch
    if (!isClient || rotationValues.length === 0) return 0;
    return rotationValues[index] || 0;
  };

  // Only render the full component on the client
  if (!isClient) {
    // Simple placeholder to prevent hydration mismatch
    return (
      <div className="rounded-2xl bg-neutral-300 mx-auto w-full px-4 py-16 md:py-24 font-sans antialiased min-h-[600px]">
        <div className="text-center mb-10">
          <div className="h-1 w-16 bg-amber-500 rounded-full mx-auto mb-6"></div>
          <h1 className="text-3xl md:text-5xl font-bold">
            What our <span className="text-amber-600">Clients</span> Say
          </h1>
        </div>
        <div className="relative grid grid-cols-1 gap-10 md:gap-16 lg:gap-20 md:grid-cols-2 items-center">
          {/* Placeholder structures while client-side JS loads */}
          <div className="h-96 md:h-[28rem] w-full relative">
            <div className="absolute inset-0 bg-neutral-200 rounded-3xl"></div>
          </div>
          <div className="flex flex-col justify-between py-4 md:py-8">
            <div className="space-y-6 animate-pulse">
              <div className="h-6 w-48 bg-neutral-200 rounded"></div>
              <div className="h-4 w-32 bg-neutral-200 rounded"></div>
              <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-neutral-200 rounded"></div>
                <div className="h-4 w-full bg-neutral-200 rounded"></div>
                <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-neutral-300 mx-auto w-full px-4 py-16 md:py-24 font-sans antialiased">
      <div className="text-center mb-10">
        {/* Orange accent line */}
        <div className="h-1 w-16 bg-amber-500 rounded-full mx-auto mb-6"></div>
        <h1 className="text-3xl md:text-5xl font-bold">
          What our <span className="text-amber-600">Clients</span> Say
        </h1>
      </div>
      
      <div className="relative grid grid-cols-1 gap-10 md:gap-16 lg:gap-20 md:grid-cols-2 items-center">
        {/* Image Section */}
        <div className="relative h-96 md:h-[28rem] w-full overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/30 to-neutral-50/30 dark:from-neutral-900/30 dark:to-neutral-800/30 rounded-3xl -z-10 blur-xl opacity-80"></div>
          
          {/* Orange accent sparkle */}
          <div className="absolute -top-4 -right-4 h-16 w-16 bg-amber-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 h-12 w-12 bg-amber-500 rounded-full opacity-30 blur-lg"></div>
          
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <Motion.div
                key={`${testimonial.src}-${index}`}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  z: -100,
                  rotate: getRotation(index),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.65,
                  scale: isActive(index) ? 1 : 0.94,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : getRotation(index),
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -30, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.88,
                  z: -100,
                  rotate: getRotation(index),
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                className="absolute inset-0 origin-center"
              >
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  {/* Orange accent overlay on active */}
                  {isActive(index) && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-500"></div>
                  )}
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full object-cover object-center transition-transform duration-700"
                  />
                  {isActive(index) && (
                    <Motion.div 
                      className="absolute bottom-6 left-6 right-6 z-10 md:hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <h4 className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-white/80">
                        {testimonial.designation}
                      </p>
                    </Motion.div>
                  )}
                </div>
              </Motion.div>
            ))}
          </AnimatePresence>
          
          {/* Navigation indicators */}
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className="p-1"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div 
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    isActive(index)
                      ? "bg-amber-500"
                      : "bg-neutral-400 hover:bg-neutral-500 dark:bg-neutral-700"
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between py-4 md:py-8">
          <AnimatePresence mode="wait">
            <Motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-1">
                  {testimonials[active].designation}
                </p>
                {/* Accent line */}
                <div className="h-1 w-12 bg-amber-500 rounded-full mt-3"></div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 -top-2 text-5xl font-serif text-amber-500 opacity-30">&ldquo;</div>
                <Motion.p className="relative mt-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <Motion.span
                      key={index}
                      initial={{
                        filter: "blur(8px)",
                        opacity: 0,
                        y: 3,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.015 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </Motion.span>
                  ))}
                </Motion.p>
              </div>
            </Motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 pt-12 md:pt-6">
            <button
              onClick={handlePrev}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 hover:bg-amber-500 dark:bg-neutral-800 dark:hover:bg-amber-600 transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <IconArrowLeft className="h-5 w-5 text-neutral-700 group-hover:text-white transition-all duration-300 group-hover:-translate-x-0.5 dark:text-neutral-300" />
            </button>
            <button
              onClick={handleNext}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 hover:bg-amber-500 dark:bg-neutral-800 dark:hover:bg-amber-600 transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <IconArrowRight className="h-5 w-5 text-neutral-700 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 dark:text-neutral-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};