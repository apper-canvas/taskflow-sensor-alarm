import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks found", 
  description = "Get started by creating your first task",
  actionText = "Add New Task",
  onAction,
  icon = "CheckSquare",
  className 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-full p-8 mb-8 shadow-lg">
        <ApperIcon name={icon} size={64} className="text-indigo-500" />
      </div>
      
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {onAction && actionText && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            {actionText}
          </button>
        )}
      </div>
      
      <div className="mt-8 flex items-center space-x-6 text-sm text-gray-400">
        <div className="flex items-center">
          <ApperIcon name="Zap" size={16} className="mr-2" />
          <span>Stay organized</span>
        </div>
        <div className="flex items-center">
          <ApperIcon name="Target" size={16} className="mr-2" />
          <span>Set priorities</span>
        </div>
        <div className="flex items-center">
          <ApperIcon name="Calendar" size={16} className="mr-2" />
          <span>Track progress</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;