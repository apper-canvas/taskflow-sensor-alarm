export const taskService = {
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "category_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 1000, "offset": 0}
      };

      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error);
      throw new Error("Failed to fetch tasks. Please try again.");
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "category_c"}}
        ]
      };

      const response = await apperClient.getRecordById('task_c', parseInt(id), params);
      
      if (!response?.data) {
        throw new Error(`Task with id ${id} not found`);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error);
      throw new Error(`Task with id ${id} not found`);
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include updateable fields
      const params = {
        records: [{
          Name: taskData.title_c || taskData.title || "Untitled Task",
          title_c: taskData.title_c || taskData.title || "",
          description_c: taskData.description_c || taskData.description || "",
          priority_c: taskData.priority_c || taskData.priority || "",
          due_date_c: taskData.due_date_c || taskData.dueDate ? new Date(taskData.due_date_c || taskData.dueDate).toISOString() : null,
          completed_c: false,
          created_at_c: new Date().toISOString(),
          completed_at_c: null,
          category_c: taskData.category_c?.Id || parseInt(taskData.category_c) || taskData.category || null
        }]
      };

      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          throw new Error(failed[0]?.message || "Failed to create task");
        }
        
        return successful[0]?.data || successful[0];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error);
      throw new Error("Failed to create task. Please try again.");
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
          ...(updateData.title_c !== undefined && { title_c: updateData.title_c }),
          ...(updateData.title !== undefined && { title_c: updateData.title }),
          ...(updateData.description_c !== undefined && { description_c: updateData.description_c }),
          ...(updateData.description !== undefined && { description_c: updateData.description }),
          ...(updateData.priority_c !== undefined && { priority_c: updateData.priority_c }),
          ...(updateData.priority !== undefined && { priority_c: updateData.priority }),
          ...(updateData.due_date_c !== undefined && { due_date_c: updateData.due_date_c ? new Date(updateData.due_date_c).toISOString() : null }),
          ...(updateData.dueDate !== undefined && { due_date_c: updateData.dueDate ? new Date(updateData.dueDate).toISOString() : null }),
          ...(updateData.completed_c !== undefined && { 
            completed_c: updateData.completed_c,
            completed_at_c: updateData.completed_c ? new Date().toISOString() : null
          }),
          ...(updateData.completed !== undefined && { 
            completed_c: updateData.completed,
            completed_at_c: updateData.completed ? new Date().toISOString() : null
          }),
          ...(updateData.category_c !== undefined && { category_c: updateData.category_c?.Id || parseInt(updateData.category_c) || null }),
          ...(updateData.category !== undefined && { category_c: updateData.category })
        }]
      };

      // Update Name field if title is changed
      if (updateData.title_c || updateData.title) {
        params.records[0].Name = updateData.title_c || updateData.title;
      }

      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          throw new Error(failed[0]?.message || "Failed to update task");
        }
        
        return successful[0]?.data || successful[0];
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error?.response?.data?.message || error);
      throw new Error("Failed to update task. Please try again.");
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

      const response = await apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          throw new Error(failed[0]?.message || "Failed to delete task");
        }
        
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error?.response?.data?.message || error);
      throw new Error("Failed to delete task. Please try again.");
    }
  },

  async getByStatus(status) {
    try {
      const tasks = await this.getAll();
      if (status === "all") return tasks;
      const completed = status === "completed";
      return tasks.filter(t => t.completed_c === completed);
    } catch (error) {
      console.error("Error filtering tasks by status:", error);
      throw error;
    }
  },

  async getByCategory(category) {
    try {
      const tasks = await this.getAll();
      return tasks.filter(t => t.category_c?.Name === category || t.category_c === category);
    } catch (error) {
      console.error("Error filtering tasks by category:", error);
      throw error;
    }
  },

  async getByPriority(priority) {
    try {
      const tasks = await this.getAll();
      return tasks.filter(t => t.priority_c === priority);
    } catch (error) {
      console.error("Error filtering tasks by priority:", error);
      throw error;
    }
  },

  async search(query) {
    try {
      const tasks = await this.getAll();
      const searchTerm = query.toLowerCase();
      return tasks.filter(t => 
        (t.title_c && t.title_c.toLowerCase().includes(searchTerm)) ||
        (t.description_c && t.description_c.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error("Error searching tasks:", error);
      throw error;
    }
  }
};