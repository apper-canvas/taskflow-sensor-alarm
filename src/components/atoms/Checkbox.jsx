import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  label,
  error,
  ...props 
}, ref) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 border-2 rounded transition-all duration-200 cursor-pointer flex items-center justify-center",
            checked 
              ? "bg-gradient-to-r from-indigo-500 to-blue-600 border-indigo-500" 
              : "border-gray-300 hover:border-indigo-400 bg-white",
            error && "border-red-300",
            className
          )}
        >
          {checked && (
            <ApperIcon 
              name="Check" 
              size={14} 
              className="text-white animate-scale-up" 
            />
          )}
        </div>
      </div>
      
      {label && (
        <div className="flex-1">
          <label className="text-sm text-gray-700 cursor-pointer">
            {label}
          </label>
          {error && (
            <p className="text-sm text-red-600 font-medium mt-1">{error}</p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;