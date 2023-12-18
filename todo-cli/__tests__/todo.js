const todoList = require("./todo");

describe("Todo List Test Suite", () => {
  let { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

  beforeEach(() => {
    // Clear the list before each test
    all = [];
  });

  test("Should add a todo", () => {
    add({
      title: "Buy groceries",
      completed: false,
      dueDate: new Date("2023-12-20").toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(1);
  });

  test("Should mark a todo as complete", () => {
    add({
      title: "Buy groceries",
      completed: false,
      dueDate: new Date("2023-12-20").toLocaleDateString("en-CA"),
    });

    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should retrieve overdue items", () => {
    add({
      title: "Buy groceries",
      completed: false,
      dueDate: new Date("2023-12-18").toLocaleDateString("en-CA"),
    });

    add({
      title: "Pay bills",
      completed: false,
      dueDate: new Date("2023-12-17").toLocaleDateString("en-CA"),
    });

    expect(overdue().length).toEqual(2);
  });

  test("Should retrieve due today items", () => {
    add({
      title: "Buy groceries",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    add({
      title: "Pay bills",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(dueToday().length).toEqual(2);
  });

  test("Should retrieve due later items", () => {
    add({
      title: "Submit assignment",
      completed: false,
      dueDate: new Date("2023-12-25").toLocaleDateString("en-CA"),
    });

    expect(dueLater().length).toEqual(1);
  });
});
