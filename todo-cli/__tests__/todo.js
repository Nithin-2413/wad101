const TaskManager = require("../todo");

describe("Task Manager Test Suite", () => {
  let taskManager;

  beforeEach(() => {
    taskManager = TaskManager();

    taskManager.addTask({
      title: "Project Work",
      isDone: false,
      deadline: new Date().toISOString().split("T")[0], 
    });

    taskManager.addTask({
      title: "Study for Exam",
      isDone: false,
      deadline: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0], 
    });
  });

  test("Adding a new task increments task count", () => {
    const initialCount = taskManager.tasks.length;
    taskManager.addTask({
      title: "Prepare Presentation",
      isDone: false,
      deadline: new Date().toISOString().split("T")[0], 
    });
    expect(taskManager.tasks.length).toBe(initialCount + 1);
  });

  test("Marking a task as complete updates status", () => {
    expect(taskManager.tasks[0].isDone).toBe(false);
    taskManager.markAsComplete(0);
    expect(taskManager.tasks[0].isDone).toBe(true);
  });

  test("Adding an overdue task identifies it correctly", () => {
    const overdueTask = {
      title: "Report Submission",
      deadline: "2023-12-12",
      isDone: false,
    };
    taskManager.addTask(overdueTask);
    const overdueTasks = taskManager.overdueTasks();
    expect(overdueTasks.length).toBe(1);
    expect(overdueTasks[0]).toEqual(overdueTask);
  });

  test("Retrieving tasks due today works as expected", () => {
    const todayTasks = taskManager.tasksDueToday();
    expect(todayTasks.length).toBeGreaterThan(0);
    
  });

  test("Retrieving tasks due later functions correctly", () => {
    const laterTask = {
      title: "Dentist Appointment",
      deadline: "2024-12-29",
      isDone: false,
    };
    taskManager.addTask(laterTask);
    const laterTasks = taskManager.tasksDueLater();
    expect(laterTasks.length).toBe(1);
    expect(laterTasks[0]).toEqual(laterTask);
  });

  test("Completing a task removes it from tasks due today", () => {
    const dueTodayTasksBefore = taskManager.tasksDueToday().length;
    const taskId = 0; 
    taskManager.markAsComplete(taskId);
    const dueTodayTasksAfter = taskManager.tasksDueToday().length;
    const completedTask = taskManager.tasks[taskId];

    expect(dueTodayTasksAfter).toBeLessThan(dueTodayTasksBefore);
    expect(completedTask.isDone).toBe(true);
  });

  test("Adding multiple tasks updates the total count", () => {
    const initialCount = taskManager.tasks.length;
    const tasksToAdd = [
      { title: "Task A", isDone: false, deadline: "2023-12-12" },
      { title: "Task B", isDone: false, deadline: "2023-12-13" },
    ];
    tasksToAdd.forEach((task) => taskManager.addTask(task));
    expect(taskManager.tasks.length).toBe(initialCount + tasksToAdd.length);
  });
});
