import React from "react";
import { FaEllipsisV, FaThumbsUp, FaComment } from "react-icons/fa";

const FeedbackCard = ({
  header,
  subhead,
  title,
  subtitle,
  description,
}: {
  header: string;
  subhead: string;
  title: string;
  subtitle: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 w-[20vw]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="relative w-[3vw] h-[3vw] text-xl rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
            {header.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h5 className="text-xl font-semibold text-gray-800">{header}</h5>
            <p className="text-sm text-gray-500">{subhead}</p>
          </div>
        </div>
        <FaEllipsisV className="text-gray-500 cursor-pointer" />
      </div>
      <h6 className="text-2xl font-semibold text-newBlue mb-0.5">{title}</h6>
      <p className="text-gray-600 text-base mb-3">{subtitle}</p>
      <p className="text-newGrey text-lg mb-4">{description}</p>
      <div className="flex items-center justify-end space-x-8">
        <button className="flex items-center text-lg text-gray-500 hover:text-newBlue focus:outline-none">
          <FaComment className="mr-1.5" />
          <span className="text-base">Comment</span>
        </button>
        <button className="flex items-center text-lg text-gray-500 hover:text-blue-600 focus:outline-none">
          <FaThumbsUp className="mr-1.5" />
          <span className="text-base">Like</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
