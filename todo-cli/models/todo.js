'use strict';
const { Model, DataTypes, Op } = require('sequelize');

module.exports = (sequelize) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n Overdue");
      const overdueTodos = await Todo.overdue();
      console.log(overdueTodos.map((todo) => todo.displayableString()).join("\n"));
      
      console.log("\n Due Today");
      const todayTodos = await Todo.dueToday();
      console.log(todayTodos.map((todo) => todo.displayableString()).join("\n"));
      
      console.log("\n Due Later");
      const laterTodos = await Todo.dueLater();
      console.log(laterTodos.map((todo) => todo.displayableString()).join("\n"));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: new Date().toLocaleDateString("en-CA") },
        },
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.eq]: new Date().toLocaleDateString("en-CA") },
        },
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: new Date().toLocaleDateString("en-CA") },
        },
      });
    }

    static async markAsComplete(id) {
      await Todo.update(
        { completed: true },
        { where: { id: id } }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${
        this.dueDate == new Date().toLocaleDateString("en-CA")
        ? ""
        : this.dueDate
      }`.trim();
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    { sequelize, modelName: 'Todo' }
  );

  return Todo;
};
