let todoList = require("../todo");

describe("Todo List Test Suite", () => {
  let { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList } = todoList();

  beforeEach(() => {
    // Clear the list before each test
    all = [];
    add({
      title: "Buy milk",
      completed: false,
      dueDate: new Date("2023-12-16").toLocaleDateString("en-CA"),
    });
    add({
      title: "Pay rent",
      completed: false,
      dueDate: new Date("2023-12-17").toLocaleDateString("en-CA"),
    });
    add({
      title: "Submit assignment",
      completed: false,
      dueDate: new Date("2023-12-20").toLocaleDateString("en-CA"),
    });
  });

  test("Should add a new todo", () => {
    add({
      title: "A test item",
      completed: false,
      dueDate: new Date("2023-12-18").toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(4);
  });

  test("Should mark a todo as complete", () => {
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = overdue();
    expect(overdueItems.length).toEqual(2);
  });

  test("Should retrieve due today items", () => {
    const todayItems = dueToday();
    expect(todayItems.length).toEqual(1);
  });

  test("Should retrieve due later items", () => {
    const laterItems = dueLater();
    expect(laterItems.length).toEqual(1);
  });

  test("Should format tasks for display", () => {
    const displayableList = toDisplayableList();
    expect(displayableList).toEqual([
      { title: "Buy milk", completed: "No", dueDate: expect.any(String) },
      { title: "Pay rent", completed: "No", dueDate: expect.any(String) },
      { title: "Submit assignment", completed: "No", dueDate: expect.any(String) },
    ]);
  });
});
