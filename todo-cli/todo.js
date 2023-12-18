const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

const todoList = () => {
  const tasks = [];

  const addTask = (task) => {
    tasks.push(task);
  };

  const markAsComplete = (index) => {
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
    }
  };

  const overdueTasks = () => {
    const currentDate = getCurrentDate();
    return tasks.filter((item) => new Date(item.dueDate) < new Date(currentDate));
  };

  const tasksDueToday = () => {
    const currentDate = getCurrentDate();
    return tasks.filter((item) => new Date(item.dueDate).toISOString().split("T")[0] === currentDate);
  };

  const tasksDueLater = () => {
    const currentDate = getCurrentDate();
    return tasks.filter((item) => new Date(item.dueDate) > new Date(currentDate));
  };

  const formatDisplayableList = (list) => {
    let output = "";
    if (list.length === 0) {
      return "";
    }

    for (const item of list) {
      output += `[${item.completed ? "x" : " "}] ${item.title}`;
      if (item.dueDate !== getCurrentDate()) {
        output += ` ${formattedDate(new Date(item.dueDate))}`;
      }
      output += "\n";
    }

    return output.trim();
  };

  return {
    tasks,
    addTask,
    markAsComplete,
    overdueTasks,
    tasksDueToday,
    tasksDueLater,
    formatDisplayableList,
  };
};

module.exports = todoList;
