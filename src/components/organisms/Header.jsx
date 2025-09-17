import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-2 mr-3">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-gray-500">Productivity Task Manager</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="Zap" size={16} className="mr-2 text-indigo-500" />
                <span>Stay productive</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Target" size={16} className="mr-2 text-green-500" />
                <span>Achieve goals</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Calendar" size={16} className="mr-2 text-blue-500" />
                <span>Never miss deadlines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;