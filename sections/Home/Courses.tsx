"use client";
import { CourseItem } from "@/components/Home/CourseItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback } from "react";

interface Course {
  name: string;
  imageSrc: string;
}

interface CarouselProps {
  courses: Course[];
  autoScrollInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  courses,
  autoScrollInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const visibleSlides = 4;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, courses.length - visibleSlides)
    );
  }, [courses.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const next = prevIndex + 1;
        return next > courses.length - visibleSlides ? 0 : next;
      });
    }, autoScrollInterval);
  }, [autoScrollInterval, courses.length]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  const handleMouseEnter = () => stopAutoScroll();
  const handleMouseLeave = () => startAutoScroll();

  return (
    <div className="relative bg-[#FAF8FF] px-[5vw] md:px-[6vw] py-[10vw] md:py-[4vw]">
      <h1 className="text-3xl md:text-5xl font-semibold text-center">
        Future-Ready Courses Designed by Experts
      </h1>
      <p className="text-lg md:text-2xl text-newGrey mt-2 mb-[2.5vw] text-center md:w-10/12 md:mx-auto">
        Enhance your career with industry-relevant courses in Node.js, Flutter,
        Android Studio, and more—designed to give you practical skills and
        job-ready expertise.
      </p>

      <div
        className="overflow-hidden mt-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex gap-10 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
            width: `${(courses.length / visibleSlides) * 100}%`,
          }}
        >
          {courses.map((course, index) => (
            <div
              key={index}
              className="w-full pb-10"
              style={{ flex: `0 0 ${100 / courses.length}%` }}
            >
              <CourseItem course={course} />
            </div>
          ))}
        </div>
      </div>

      {courses.length > visibleSlides && (
        <>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-[2vw] md:left-[3vw] top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-3 md:p-5 text-lg md:text-xl shadow-md ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= courses.length - visibleSlides}
            className={`absolute right-[2vw] md:right-[3vw] top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-3 md:p-5 text-lg md:text-xl shadow-md ${
              currentIndex >= courses.length - visibleSlides
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
