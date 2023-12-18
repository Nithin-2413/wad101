const testDB = require("../models");

const calculateJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Days should be an integer.");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};

describe("Tests for functions in todo.js", function () {
  beforeAll(async () => {
    await testDB.sequelize.sync({ force: true });
  });

  test("Retrieving overdue tasks", async () => {
    const task = await testDB.Todo.addTask({
      title: "Sample task",
      dueDate: calculateJSDate(-2),
      completed: false,
    });
    const overdueTasks = await testDB.Todo.overdue();
    expect(overdueTasks.length).toBe(1);
  });

  test("Retrieving tasks due today", async () => {
    const todayTasks = await testDB.Todo.dueToday();
    const task = await testDB.Todo.addTask({
      title: "Sample task",
      dueDate: calculateJSDate(0),
      completed: false,
    });
    const tasks = await testDB.Todo.dueToday();
    expect(tasks.length).toBe(todayTasks.length + 1);
  });

  test("Retrieving tasks due later", async () => {
    const laterTasks = await testDB.Todo.dueLater();
    const task = await testDB.Todo.addTask({
      title: "Sample task",
      dueDate: calculateJSDate(2),
      completed: false,
    });
    const tasks = await testDB.Todo.dueLater();
    expect(tasks.length).toBe(laterTasks.length + 1);
  });

  test("Marking a task as complete", async () => {
    const overdueTasks = await testDB.Todo.overdue();
    const task = overdueTasks[0];
    expect(task.completed).toBe(false);
    await testDB.Todo.markAsComplete(task.id);
    await task.reload();
    expect(task.completed).toBe(true);
  });

  test("Displaying details for completed and incomplete tasks", async () => {
    const overdueTasks = await testDB.Todo.overdue();
    const overdueTask = overdueTasks[0];
    expect(overdueTask.completed).toBe(true);
    let displayValue = overdueTask.displayableString();
    expect(displayValue).toBe(
      `${overdueTask.id}. [x] ${overdueTask.title} ${overdueTask.dueDate}`,
    );

    const laterTasks = await testDB.Todo.dueLater();
    const laterTask = laterTasks[0];
    expect(laterTask.completed).toBe(false);
    displayValue = laterTask.displayableString();
    expect(displayValue).toBe(
      `${laterTask.id}. [ ] ${laterTask.title} ${laterTask.dueDate}`,
    );

    const todayTasks = await testDB.Todo.dueToday();
    const todayTask = todayTasks[0];
    expect(todayTask.completed).toBe(false);
    displayValue = todayTask.displayableString();
    expect(displayValue).toBe(`${todayTask.id}. [ ] ${todayTask.title}`);

    await testDB.Todo.markAsComplete(todayTask.id);
    await todayTask.reload();
    displayValue = todayTask.displayableString();
    expect(displayValue).toBe(`${todayTask.id}. [x] ${todayTask.title}`);
  });
});
