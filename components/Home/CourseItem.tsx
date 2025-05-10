import React from "react";
import Image from "next/image";

interface CourseItemProps {
  course: {
    name: string;
    imageSrc: string;
  };
}

export const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-md shadow-lg p-4 md:p-6 flex flex-col items-center justify-center">
      <Image
        width={1000}
        height={1000}
        src={course.imageSrc}
        alt={course.name}
        className="w-[30vw] md:w-[5vw] object-contain"
      />
      <h3 className="text-center md:text-lg font-semibold text-gray-800">{course.name}</h3>
    </div>
  );
};
