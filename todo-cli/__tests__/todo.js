const todoList = require('../todo');
const { all, markAsComplete, add, dueLater, dueToday, overdue, toDisplayableList } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
  });

  test("should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("should mark as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test('retrieving overdue items', () => {
    add({
      title: "Overdue Todo",
      completed: false,
      dueDate: '2023-12-01', // Past due date for testing
    });
    expect(overdue().length).toBe(1);
  });

  test('retrieving due today items', () => {
    add({
      title: "Today's Todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(dueToday().length).toBe(1);
  });

  test('retrieving due later items', () => {
    add({
      title: "Future Todo",
      completed: false,
      dueDate: '2023-12-31', // Future date for testing
    });
    expect(dueLater().length).toBe(1);
  });

  test('toDisplayableList function', () => {
    const displayableList = toDisplayableList();
    expect(typeof displayableList).toBe('string');
    // You can add more specific expectations for the displayable list format if needed
  });
});
