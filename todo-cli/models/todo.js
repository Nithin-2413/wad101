const { Model, DataTypes, Op } = require('sequelize');

class Todo extends Model {
  static async addTask(params) {
    return await Todo.create(params);
  }

  static async showList() {
    console.log("My Todo list \n");

    console.log("Overdue");
    const overdueList = await Todo.fetchOverdueTasks();
    Todo.displayTasks(overdueList);
    console.log("\n");

    console.log("Due Today");
    const todayList = await Todo.fetchDueTodayTasks();
    Todo.displayTasks(todayList);
    console.log("\n");

    console.log("Due Later");
    const laterList = await Todo.fetchDueLaterTasks();
    Todo.displayTasks(laterList);
  }

  static async fetchOverdueTasks() {
    return await Todo.findAll({
      where: {
        dueDate: { [Op.lt]: new Date() },
        completed: false,
      },
      order: [["dueDate", "ASC"]],
    });
  }

  static async fetchDueTodayTasks() {
    return await Todo.findAll({
      where: {
        dueDate: new Date(),
        completed: false,
      },
      order: [["dueDate", "ASC"]],
    });
  }

  static async fetchDueLaterTasks() {
    return await Todo.findAll({
      where: {
        dueDate: { [Op.gt]: new Date() },
        completed: false,
      },
      order: [["dueDate", "ASC"]],
    });
  }

  static async markAsComplete(id) {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.completed = true;
    await todo.save();
  }

  static initialize(sequelize) {
    Todo.init({
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN
    }, {
      sequelize,
      modelName: 'Todo',
    });
  }

  static displayTasks(tasks) {
    tasks.forEach((todo) => {
      console.log(todo.displayableString());
    });
  }

  displayableString() {
    const currentDate = new Date();
    const isCompleted = this.completed;
    const isDueToday = currentDate.toDateString() === this.dueDate.toDateString();
    const id = this.id;
    const title = this.title;
    let displayableDate = '';

    if (!isCompleted && !isDueToday) {
      displayableDate = ' ' + this.dueDate.toDateString();
    }

    return `${id}. [${isCompleted ? 'x' : ' '}] ${title}${displayableDate}`;
  }
}

module.exports = Todo;
