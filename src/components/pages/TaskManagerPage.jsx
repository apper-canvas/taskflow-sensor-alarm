import React, { useState } from "react";
import TaskForm from "@/components/molecules/TaskForm";
import TaskList from "@/components/organisms/TaskList";

const TaskManagerPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  const handleTaskCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditComplete = () => {
    setEditingTask(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            TaskFlow
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Organize your day, prioritize your goals, and track your progress with our intuitive task management system.
        </p>
      </div>

      <TaskForm 
        onTaskCreated={handleTaskCreated}
        editingTask={editingTask}
        onEditComplete={handleEditComplete}
      />

      <TaskList 
        refreshTrigger={refreshTrigger}
        onTaskEdit={handleEditTask}
      />
    </div>
  );
};

export default TaskManagerPage;