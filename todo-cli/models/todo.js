'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
     
    }

    static async addTask(params) {
      try {
        return await Todo.create(params);
      } catch (error) {
        throw new Error('Unable to add a new task');
      }
    }

    static async showList() {
      try {
        
      } catch (error) {
        throw new Error('Unable to fetch and display todos');
      }
    }

    static async overdue() {
      try {
        
      } catch (error) {
        throw new Error('Unable to fetch overdue todos');
      }
    }

    static async dueToday() {
      try {
        
      } catch (error) {
        throw new Error('Unable to fetch todos due today');
      }
    }

    static async dueLater() {
      try {
        
      } catch (error) {
        throw new Error('Unable to fetch todos due later');
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
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
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
