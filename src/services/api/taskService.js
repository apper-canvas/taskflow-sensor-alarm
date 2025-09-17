import tasksData from "../mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(400);
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updateData
    };
    
    // Handle completion status change
    if (updateData.completed !== undefined) {
      updatedTask.completedAt = updateData.completed ? new Date().toISOString() : null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    const deletedTask = tasks.splice(index, 1)[0];
    return { ...deletedTask };
  },

  async getByStatus(status) {
    await delay(200);
    if (status === "all") return [...tasks];
    const completed = status === "completed";
    return tasks.filter(t => t.completed === completed);
  },

  async getByCategory(category) {
    await delay(200);
    return tasks.filter(t => t.category === category);
  },

  async getByPriority(priority) {
    await delay(200);
    return tasks.filter(t => t.priority === priority);
  },

  async search(query) {
    await delay(150);
    const searchTerm = query.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(searchTerm) ||
      t.description.toLowerCase().includes(searchTerm)
    );
  }
};