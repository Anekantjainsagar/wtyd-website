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
    <div className="bg-white rounded-md shadow-lg p-6 flex flex-col items-center justify-center">
      <Image
        width={1000}
        height={1000}
        src={course.imageSrc}
        alt={course.name}
        className="w-[5vw] object-contain"
      />
      <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
    </div>
  );
};
