import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import TaskItem from "@/components/molecules/TaskItem";
import TaskFilters from "@/components/molecules/TaskFilters";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const TaskList = ({ refreshTrigger, onTaskEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all"
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  useEffect(() => {
    applyFilters();
  }, [tasks, filters, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      const completed = filters.status === "completed";
      filtered = filtered.filter(task => task.completed === completed);
    }

    // Apply priority filter
    if (filters.priority !== "all") {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Sort by priority and due date
    filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Sort by priority
      const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
      const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      if (priorityDiff !== 0) return priorityDiff;

      // Sort by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;

      // Sort by creation date
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredTasks(filtered);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.Id === updatedTask.Id ? updatedTask : task
      )
    );
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId));
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadData}
      />
    );
  }

  const stats = getTaskStats();

  return (
    <div>
      {/* Statistics Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-2 mr-3">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-2 mr-3">
              <ApperIcon name="CheckCircle" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-100 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-2 mr-3">
              <ApperIcon name="Clock" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-2 mr-3">
              <ApperIcon name="TrendingUp" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600">Progress</p>
              <p className="text-2xl font-bold text-purple-900">{stats.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <TaskFilters
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Empty 
          title={searchQuery || filters.status !== "all" || filters.priority !== "all" || filters.category !== "all" 
            ? "No matching tasks found" 
            : "No tasks yet"
          }
          description={searchQuery || filters.status !== "all" || filters.priority !== "all" || filters.category !== "all"
            ? "Try adjusting your filters or search query"
            : "Create your first task to get started with TaskFlow"
          }
          actionText="Clear Filters"
          onAction={() => {
            setFilters({ status: "all", priority: "all", category: "all" });
            setSearchQuery("");
          }}
          icon="Filter"
        />
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTasks.map(task => (
              <TaskItem
                key={task.Id}
                task={task}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                onTaskEdit={onTaskEdit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;