import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ onTaskCreated, editingTask, onEditComplete }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    category: "",
    dueDate: ""
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (editingTask) {
      setIsEditing(true);
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "",
        category: editingTask.category || "",
        dueDate: editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().split("T")[0] : ""
      });
    } else {
      setIsEditing(false);
      setFormData({
        title: "",
        description: "",
        priority: "",
        category: "",
        dueDate: ""
      });
    }
  }, [editingTask]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    if (!formData.priority) {
      toast.error("Please select a priority level");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);

    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      };

      if (isEditing) {
        await taskService.update(editingTask.Id, taskData);
        toast.success("Task updated successfully!");
        onEditComplete && onEditComplete();
      } else {
        await taskService.create(taskData);
        toast.success("Task created successfully!");
        onTaskCreated && onTaskCreated();
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        priority: "",
        category: "",
        dueDate: ""
      });
    } catch (error) {
      console.error("Failed to save task:", error);
      toast.error(isEditing ? "Failed to update task" : "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      priority: "",
      category: "",
      dueDate: ""
    });
    onEditComplete && onEditComplete();
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-2 mr-3">
          <ApperIcon name={isEditing ? "Edit3" : "Plus"} size={20} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {isEditing ? "Edit Task" : "Create New Task"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter task title..."
            required
          />
          
          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter task description..."
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            placeholder="Select priority"
            required
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </Select>

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Select category"
            required
          >
            {categories.map(category => (
              <option key={category.Id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>

          <div className="flex items-end space-x-2">
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </Button>
            
            {isEditing && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;