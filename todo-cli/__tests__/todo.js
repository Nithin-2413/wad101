/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, dueLater, dueToday, overdue, toDisplayableList } = todoList();

describe("Todolist test suite", () => {
  beforeAll(() => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0]
    });
  });

  // existing tests

  test('retrieving due later items', () => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: "2023-12-20"
    });
    add({
      title: "Todo",
      completed: false,
      dueDate: "2023-12-20"
    });
    add({
      title: "Test",
      completed: false,
      dueDate: "2023-12-20"
    });

    expect(dueLater().length).toBe(3);
  });

  test('toDisplayableList should return a formatted string', () => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: "2023-12-20"
    });
    add({
      title: "Todo",
      completed: true,
      dueDate: "2023-12-20"
    });

    const expected = "[ ] Test Todo 2023-12-20\n[x] Todo ";
    expect(toDisplayableList()).toBe(expected);
  });
});
