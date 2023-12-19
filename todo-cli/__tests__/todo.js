const createTodoList = require("../todo");

describe("Todo List Test Suite", () => {
  let todoInstance;

  beforeEach(() => {
    todoInstance = createTodoList();

    todoInstance.addTask({
      title: "New Task",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });

    todoInstance.addTask({
      title: "Test Task",
      completed: false,
      dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    });
  });

  test("Add a new todo item", () => {
    const initialTaskCount = todoInstance.tasks.length;
    todoInstance.addTask({
      title: "Another Task",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(todoInstance.tasks.length).toBe(initialTaskCount + 1);
  });

  test("Mark a todo as complete", () => {
    const taskIndex = 0;
    todoInstance.markAsComplete(taskIndex);
    expect(todoInstance.tasks[taskIndex].completed).toBe(true);
  });

  test("Retrieve overdue items", () => {
    const overdueItems = todoInstance.getOverdueTasks();
    expect(overdueItems.length).toBe(0); // Assuming there are no tasks overdue in this test case setup
  });

  test("Retrieve due today items", () => {
    const dueTodayItems = todoInstance.getTasksDueToday();
    expect(dueTodayItems.length).toBeGreaterThan(0); // Assuming at least one task is due today
  });

  test("Retrieve due later items", () => {
    const dueLaterItems = todoInstance.getTasksDueLater();
    expect(dueLaterItems.length).toBe(1); // Assuming one task is due later based on the setup
  });

  // Existing test cases...

  // Add more specific assertions based on your implementation for each test case
});
