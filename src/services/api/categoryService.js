export const categoryService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "task_count_c"}}
        ],
        orderBy: [{"fieldName": "Name", "sorttype": "ASC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };

      const response = await apperClient.fetchRecords('category_c', params);
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error);
      throw new Error("Failed to fetch categories. Please try again.");
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "task_count_c"}}
        ]
      };

      const response = await apperClient.getRecordById('category_c', parseInt(id), params);
      
      if (!response?.data) {
        throw new Error(`Category with id ${id} not found`);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error?.response?.data?.message || error);
      throw new Error(`Category with id ${id} not found`);
    }
  },

  async create(categoryData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const params = {
        records: [{
          Name: categoryData.name_c || categoryData.name || "Untitled Category",
          name_c: categoryData.name_c || categoryData.name || "",
          color_c: categoryData.color_c || categoryData.color || "",
          task_count_c: 0
        }]
      };

      const response = await apperClient.createRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          throw new Error(failed[0]?.message || "Failed to create category");
        }
        
        return successful[0]?.data || successful[0];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error?.response?.data?.message || error);
      throw new Error("Failed to create category. Please try again.");
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updateData.name_c !== undefined && { name_c: updateData.name_c }),
          ...(updateData.name !== undefined && { name_c: updateData.name }),
          ...(updateData.color_c !== undefined && { color_c: updateData.color_c }),
          ...(updateData.color !== undefined && { color_c: updateData.color }),
          ...(updateData.task_count_c !== undefined && { task_count_c: updateData.task_count_c }),
          ...(updateData.taskCount !== undefined && { task_count_c: updateData.taskCount })
        }]
      };

      // Update Name field if name is changed
      if (updateData.name_c || updateData.name) {
        params.records[0].Name = updateData.name_c || updateData.name;
      }

      const response = await apperClient.updateRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          throw new Error(failed[0]?.message || "Failed to update category");
        }
        
        return successful[0]?.data || successful[0];
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error?.response?.data?.message || error);
      throw new Error("Failed to update category. Please try again.");
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('category_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          throw new Error(failed[0]?.message || "Failed to delete category");
        }
        
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error?.response?.data?.message || error);
      throw new Error("Failed to delete category. Please try again.");
    }
  },

  async updateTaskCount(categoryName, change) {
    try {
      const categories = await this.getAll();
      const category = categories.find(c => c.name_c === categoryName || c.Name === categoryName);
      
      if (category) {
        const newCount = Math.max(0, (category.task_count_c || 0) + change);
        const updatedCategory = await this.update(category.Id, { task_count_c: newCount });
        return updatedCategory;
      }
    } catch (error) {
      console.error("Error updating task count:", error);
      // Don't throw error to avoid breaking task operations
      return null;
    }
  }
};