"use strict";

const { Model, DataTypes, Op } = require("sequelize");

class Todo extends Model {
  static async addTask(params) {
    return await Todo.create(params);
  }

  static async showList() {
    console.log("My Todo list \n");

    console.log("Overdue");
    console.log(
      (await Todo.overdue())
        .map((todo) => todo.displayableString())
        .join("\n")
    );
    console.log("\n");

    console.log("Due Today");
    console.log(
      (await Todo.dueToday())
        .map((todo) => todo.displayableString())
        .join("\n")
    );
    console.log("\n");

    console.log("Due Later");
    console.log(
      (await Todo.dueLater())
        .map((todo) => todo.displayableString())
        .join("\n")
    );
  }

  static async overdue() {
    return await Todo.findAll({
      where: {
        dueDate: { [Op.lt]: new Date() },
      },
    });
  }

  static async dueToday() {
    return await Todo.findAll({
      where: {
        dueDate: new Date().toLocaleDateString("en-CA"),
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
    const todo = await Todo.findByPk(id);
    if (todo) {
      todo.completed = true;
      await todo.save();
    }
  }

  displayableString() {
  let checkbox = this.completed ? "[x]" : "[ ]";
  let dateStr = '';

  if (this.completed && new Date(this.dueDate) < new Date()) {
    dateStr = ` ${this.dueDate.toLocaleDateString("en-CA")}`;
  } else if (!this.completed && new Date(this.dueDate) > new Date()) {
    dateStr = ` ${this.dueDate.toLocaleDateString("en-CA")}`;
  } else if (!this.completed && new Date(this.dueDate).toDateString() === new Date().toDateString()) {
    dateStr = '';
  }

  return `${this.id}. ${checkbox} ${this.title}${dateStr}`.trim();
}


module.exports = (sequelize) => {
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
