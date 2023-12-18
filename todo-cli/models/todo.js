'use strict';
const { Model } = require('sequelize');
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MyTodo extends Model {
    static async addTask(params) {
      return await MyTodo.create(params);
    }

    static async showTodoList() {
      console.log("Todo List: \n");

      console.log("Overdue");
      const pendingTasks = await MyTodo.overdueTasks();
      pendingTasks.forEach((task) => {
        console.log(task.displayString());
      });

      console.log("\n");

      console.log("Due Today");
      const todayTasks = await MyTodo.tasksDueToday();
      todayTasks.forEach((task) => {
        console.log(task.displayString());
      });

      console.log("\n");

      console.log("Due Later");
      const futureTasks = await MyTodo.tasksDueLater();
      futureTasks.forEach((task) => {
        console.log(task.displayString());
      });
    }

    static async overdueTasks() {
      return await MyTodo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().split("T")[0],
          },
        },
      });
    }

    static async tasksDueToday() {
      return await MyTodo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date().toISOString().split("T")[0],
          },
        },
      });
    }

    static async tasksDueLater() {
      return await MyTodo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().split("T")[0],
          },
        },
      });
    }

    static async markAsComplete(id) {
      const todo = await MyTodo.findByPk(id);
      todo.completed = true;
      await todo.save();
    }

    displayString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let displayDate =
        this.dueDate === new Date().toLocaleDateString("en-CA")
          ? ""
          : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${displayDate}`.trim();
    }
  }

  MyTodo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'MyTodo',
  });

  return MyTodo;
};
