// Import the todoList module
const todoList = require("../todo");

// Destructure the methods from the todoList module
const { add, markAsComplete, overdue, dueToday, dueLater, all } = todoList();

// Test suite for the Todo List
describe("Todo List Test Suite", () => {
  // Before starting all tests
  beforeAll(() => {
    // Add a test task before each test
    add({
      title: "Test todo",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
  });

  // Test for adding a new todo
  test("Adding a new todo", () => {
    const initialLength = all.length;
    add({
      title: "Another Test todo",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(all.length).toBe(initialLength + 1);
  });

  // Test for marking a todo as complete
  test("Marking a todo as complete", () => {
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  // Test for overdue todos
  test("Overdue todos", () => {
    add({
      title: "Test overdue",
      dueDate: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(overdue().length).toBe(1);
  });

  // Test for todos due today
  test("Due today todos", () => {
    expect(dueToday().length).toBe(2);
  });

  // Test for todos due later
  test("Due later todos", () => {
    add({
      title: "Test due later",
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueLater().length).toBe(1);
  });
});
