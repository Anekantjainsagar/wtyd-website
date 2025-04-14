"use client";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import AnimatedCounter from "@/components/Home/AnimatedCounter";

export interface CounterItem {
  endValue: number;
  label: string;
}

interface InsightNumbersProps {
  counters: CounterItem[];
}

const InsightNumbers = ({ counters }: InsightNumbersProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div ref={containerRef} className="bg-[#FAF8FF] py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {counters?.map((counter, index) => (
            <AnimatedCounter key={index} {...counter} isInView={isInView} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightNumbers;
