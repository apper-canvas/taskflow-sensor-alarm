import categoriesData from "../mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      ...categoryData,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updateData) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    const updatedCategory = {
      ...categories[index],
      ...updateData
    };
    
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with id ${id} not found`);
    }
    
    const deletedCategory = categories.splice(index, 1)[0];
    return { ...deletedCategory };
  },

  async updateTaskCount(categoryName, change) {
    await delay(100);
    const category = categories.find(c => c.name === categoryName);
    if (category) {
      category.taskCount = Math.max(0, category.taskCount + change);
      return { ...category };
    }
  }
};