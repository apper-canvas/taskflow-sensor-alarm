import React from "react";

const Loading = ({ className }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Task Form Skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
        </div>
        <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
        </div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-36"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1 min-w-[200px]"></div>
        </div>
      </div>

      {/* Task List Skeleton */}
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;