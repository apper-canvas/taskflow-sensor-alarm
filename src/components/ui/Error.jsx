import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, className }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-full p-6 mb-6 shadow-lg">
        <ApperIcon name="AlertTriangle" size={48} className="text-red-500" />
      </div>
      
      <div className="text-center max-w-md">
        <h3 className="text-xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="RefreshCw" size={18} className="mr-2" />
            Try Again
          </button>
        )}
      </div>
      
      <div className="mt-8 text-sm text-gray-400 text-center">
        <p>If this problem persists, please refresh the page</p>
      </div>
    </div>
  );
};

export default Error;