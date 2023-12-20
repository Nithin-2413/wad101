"use strict";

const { Model, Op } = require("sequelize");

class CustomTodoModel extends Model {
  static async addTask(params) {
    return await CustomTodoModel.create(params);
  }

  static async showList() {
    console.log("My Todo list \n");

    console.log("Overdue");
    console.log(
      (await CustomTodoModel.overdue())
        .map((todo) => {
          return todo.displayableString();
        })
        .join("\n")
    );
    console.log("\n");

    console.log("Due Today");
    console.log(
      (await CustomTodoModel.dueToday())
        .map((todo) => todo.displayableString())
        .join("\n")
    );
    console.log("\n");

    console.log("Due Later");
    console.log(
      (await CustomTodoModel.dueLater())
        .map((todo) => todo.displayableString())
        .join("\n")
    );
  }

  static async overdue() {
    return await CustomTodoModel.findAll({
      where: {
        dueDate: { [Op.lt]: new Date().toLocaleDateString("en-CA") },
      },
    });
  }

  static async dueToday() {
    return await CustomTodoModel.findAll({
      where: {
        dueDate: { [Op.eq]: new Date().toLocaleDateString("en-CA") },
      },
    });
  }

  static async dueLater() {
    return await CustomTodoModel.findAll({
      where: {
        dueDate: { [Op.gt]: new Date().toLocaleDateString("en-CA") },
      },
    });
  }

  static async markAsComplete(id) {
    await CustomTodoModel.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  }

  displayableString() {
    let checkbox = this.completed ? "[x]" : "[ ]";
    return `${this.id}. ${checkbox} ${this.title} ${
      this.dueDate == new Date().toLocaleDateString("en-CA") ? "" : this.dueDate
    }`.trim();
  }
}

module.exports = (sequelize, DataTypes) => {
  CustomTodoModel.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "CustomTodoModel",
    }
  );
  return CustomTodoModel;
};
