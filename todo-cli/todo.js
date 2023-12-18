const todoList = () => {
  const allTasks = [];

  const addTask = (task) => {
    allTasks.push(task);
  };

  const markAsComplete = (taskId) => {
    const task = allTasks.find((item) => item.id === taskId);
    if (task) {
      task.completed = true;
    } else {
      console.error(`Task with ID ${taskId} not found.`);
    }
  };

  const overdue = () => {
    const currentDate = new Date();
    return allTasks.filter((item) => new Date(item.dueDate) < currentDate);
  };

  const dueToday = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return allTasks.filter((item) => new Date(item.dueDate).toISOString().split('T')[0] === currentDate);
  };

  const dueLater = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return allTasks.filter((item) => new Date(item.dueDate).toISOString().split('T')[0] > currentDate);
  };

  const toDisplayableList = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    let output = "";

    allTasks.forEach((item) => {
      if (item.dueDate === currentDate) {
        output += `[${item.completed ? 'x' : ' '}] ${item.title}\n`;
      } else if (item.dueDate < currentDate) {
        output += `[ ] ${item.title} ${item.dueDate}\n`;
      } else {
        output += `[ ] ${item.title} ${item.dueDate}\n`;
      }
    });

    return output.trim();
  };

  return {
    allTasks,
    addTask,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
