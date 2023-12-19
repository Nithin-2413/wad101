const currentDate = new Date().toISOString().split("T")[0];

const createTodoList = () => {
  const tasks = [];

  const addTask = (taskItem) => {
    tasks.push(taskItem);
  };

  const markAsComplete = (index) => {
    tasks[index].completed = true;
  };

  const getOverdueTasks = () => {
    return tasks.filter((item) => new Date(item.dueDate) < new Date(currentDate));
  };

  const getTasksDueToday = () => {
    return tasks.filter((item) => new Date(item.dueDate).toISOString().split("T")[0] === currentDate);
  };

  const getTasksDueLater = () => {
    return tasks.filter((item) => new Date(item.dueDate) > new Date(currentDate));
  };

  const displayableList = (list) => {
    let output = "";
    if (list.length === 0) {
      return "";
    }

    for (const item of list) {
      output += `[${item.completed ? "x" : " "}] ${item.title}`;
      if (item.dueDate !== currentDate) {
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
    getOverdueTasks,
    getTasksDueToday,
    getTasksDueLater,
    displayableList,
  };
};

module.exports = createTodoList;
