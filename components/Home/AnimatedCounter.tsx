// components/AnimatedCounter.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps extends CounterItem {
  isInView: boolean;
}

interface CounterItem {
  endValue: number;
  label: string;
}

const AnimatedCounter = ({
  endValue,
  label,
  isInView,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    if (hasStarted) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < endValue) {
            const increment = Math.ceil(endValue / 100);
            return Math.min(prevCount + increment, endValue);
          }
          return prevCount;
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [hasStarted, endValue]);

  const displayValue = count.toLocaleString();

  return (
    <div className="text-center">
      <motion.span
        className="text-3xl md:text-5xl font-semibold text-black"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {displayValue}
        <span className="text-2xl md:text-4xl font-medium">+</span>
      </motion.span>
      <p className="text-newGrey text-lg mt-2">{label}</p>
    </div>
  );
};

export default AnimatedCounter;
