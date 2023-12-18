/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const createTodoList = require("../todo");

describe("Todo List Test Suite", () => {
  let todoInstance;

  beforeAll(() => {
    todoInstance = createTodoList();
    todoInstance.addTask({
      title: "New Task",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    todoInstance.addTask({
      title: "Test Task",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA", { addDays: 1 }),
    });
  });

  test("Should add a new task", () => {
    const taskCount = todoInstance.tasks.length;
    todoInstance.addTask({
      title: "Test Task",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(todoInstance.tasks.length).toBe(taskCount + 1);
  });

  test("Should mark a task as complete", () => {
    expect(todoInstance.tasks[0].completed).toBe(false);
    todoInstance.markAsComplete(0);
    expect(todoInstance.tasks[0].completed).toBe(true);
  });

  test("Should add an overdue task", () => {
    const overdueTask = {
      title: "Pay bills",
      dueDate: "2023-12-12",
      completed: false,
    };
    todoInstance.addTask(overdueTask);
    const overdueItems = todoInstance.getOverdueTasks();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0]).toEqual(overdueTask);
  });

  test("Should retrieve tasks due today", () => {
    const dueTodayTasks = todoInstance.getTasksDueToday();
    expect(dueTodayTasks.length).toBeGreaterThan(0);
    // Add more specific assertions based on your implementation
  });

  test("Should retrieve tasks due later", () => {
    const dueLaterTask = {
      title: "Call dentist",
      dueDate: "2024-12-29",
      completed: false,
    };
    todoInstance.addTask(dueLaterTask);
    const dueLaterTasks = todoInstance.getTasksDueLater();
    expect(dueLaterTasks.length).toBe(1);
    expect(dueLaterTasks[0]).toEqual(dueLaterTask);
  });
});
