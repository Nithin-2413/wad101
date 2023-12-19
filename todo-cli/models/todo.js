'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async overdue() {
      try {
        const overdueTasks = await Todo.findAll({
          where: {
            dueDate: { [sequelize.Op.lt]: new Date() },
          },
        });
        return overdueTasks;
      } catch (error) {
        throw new Error('Unable to fetch overdue tasks');
      }
    }

    static async dueToday() {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueTodayTasks = await Todo.findAll({
          where: {
            dueDate: today,
          },
        });
        return dueTodayTasks;
      } catch (error) {
        throw new Error('Unable to fetch tasks due today');
      }
    }

    static async dueLater() {
      try {
        const dueLaterTasks = await Todo.findAll({
          where: {
            dueDate: { [sequelize.Op.gt]: new Date() },
          },
        });
        return dueLaterTasks;
      } catch (error) {
        throw new Error('Unable to fetch tasks due later');
      }
    }

    static async markAsComplete(id) {
      try {
        const todo = await Todo.findByPk(id);
        if (todo) {
          todo.completed = true;
          await todo.save();
          return todo;
        }
        throw new Error('Todo not found');
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
