import React, { useState } from "react";
import { format, isAfter } from "date-fns";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";

const TaskItem = ({ task, onTaskUpdate, onTaskDelete, onTaskEdit }) => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggleComplete = async () => {
    setUpdating(true);
    try {
const updatedTask = await taskService.update(task.Id, {
        completed_c: !task.completed_c
      });
      onTaskUpdate(updatedTask);
      toast.success(task.completed_c ? "Task marked as pending" : "Task completed! 🎉");
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setDeleting(true);
    try {
      await taskService.delete(task.Id);
      onTaskDelete(task.Id);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return { backgroundColor: "#EF4444", color: "white" };
      case "Medium":
        return { backgroundColor: "#F59E0B", color: "white" };
      case "Low":
        return { backgroundColor: "#3B82F6", color: "white" };
      default:
        return { backgroundColor: "#6B7280", color: "white" };
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Work": "#3B82F6",
      "Personal": "#10B981",
      "Health": "#F59E0B",
      "Finance": "#8B5CF6"
    };
    return colors[category] || "#6B7280";
  };

const isOverdue = task.due_date_c && !task.completed_c && isAfter(new Date(), new Date(task.due_date_c));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
className={`bg-white rounded-xl p-6 shadow-lg border transition-all duration-200 hover:shadow-xl ${
        task.completed_c ? "border-green-200 bg-green-50" : "border-gray-100 hover:border-indigo-200"
      } ${isOverdue ? "border-l-4 border-l-red-500" : ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <Checkbox
            checked={task.completed_c}
            onChange={handleToggleComplete}
            disabled={updating}
          />
          
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${
              task.completed_c 
                ? "text-green-700 line-through" 
                : "text-gray-900"
            }`}>
              {task.title_c}
            </h3>
            
{task.description_c && (
              <p className={`text-sm mt-1 ${
                task.completed_c 
                  ? "text-green-600 line-through" 
                  : "text-gray-600"
              }`}>
                {task.description_c}
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTaskEdit(task)}
            disabled={updating || deleting}
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          >
            <ApperIcon name="Edit3" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={updating || deleting}
            loading={deleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Badge 
            variant="custom" 
            size="xs"
style={getPriorityColor(task.priority_c)}
          >
            {task.priority_c}
          </Badge>
          
          <Badge 
            variant="custom" 
            size="xs"
            style={{ backgroundColor: getCategoryColor(task.category_c?.Name || task.category_c), color: "white" }}
          >
            {task.category_c?.Name || task.category_c}
          </Badge>
          {isOverdue && (
            <Badge variant="danger" size="xs">
              Overdue
            </Badge>
          )}
        </div>

{task.due_date_c && (
          <div className={`text-sm flex items-center ${
            isOverdue ? "text-red-600 font-semibold" : "text-gray-500"
          }`}>
<ApperIcon name="Calendar" size={14} className="mr-1" />
            {format(new Date(task.due_date_c), "MMM d, yyyy")}
          </div>
        )}
      </div>

      {task.completed_c && task.completed_at_c && (
        <div className="mt-3 pt-3 border-t border-green-200">
          <div className="text-sm text-green-600 flex items-center">
            <ApperIcon name="CheckCircle" size={14} className="mr-1" />
            Completed on {format(new Date(task.completed_at_c), "MMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;