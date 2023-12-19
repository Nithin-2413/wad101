'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async overdue() {
      try {
        // Fetch all tasks (including completed ones) that are past their due date
        // Implement logic here
      } catch (error) {
        throw new Error('Unable to fetch overdue tasks');
      }
    }

    static async dueToday() {
      try {
        // Fetch all tasks that are due today (including completed ones)
        // Implement logic here
      } catch (error) {
        throw new Error('Unable to fetch tasks due today');
      }
    }

    static async dueLater() {
      try {
        // Fetch all tasks due on a future date (including completed ones)
        // Implement logic here
      } catch (error) {
        throw new Error('Unable to fetch tasks due later');
      }
    }

    static async markAsComplete(id) {
      try {
        // Change the completed property of a todo to true
        // Implement logic here
      } catch (error) {
        throw new Error('Unable to mark todo as complete');
      }
    }

    displayableString() {
      // Implement displayableString method to return formatted strings for different scenarios
    }
  }

  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};
