import React from "react";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const TaskFilters = ({ 
  filters, 
  onFiltersChange, 
  categories = [],
  searchQuery,
  onSearchChange 
}) => {
  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="min-w-[150px]">
          <Select
            label="Status"
            value={filters.status || "all"}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Select>
        </div>

        <div className="min-w-[120px]">
          <Select
            label="Priority"
            value={filters.priority || "all"}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </div>

        <div className="min-w-[140px]">
          <Select
            label="Category"
            value={filters.category || "all"}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.Id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex-1 min-w-[200px] relative">
          <Input
            label="Search Tasks"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title or description..."
            className="pr-10"
          />
          <div className="absolute right-3 top-9 text-gray-400">
            <ApperIcon name="Search" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;