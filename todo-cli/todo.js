const createTodoList = () => {
  const currentDate = new Date().toISOString().split("T")[0];
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

  const toDisplayableList = () => {
    const list = tasks.filter((item) => !item.completed);
    return displayableList(list);
  };

  const formattedDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return {
    tasks,
    addTask,
    markAsComplete,
    getOverdueTasks,
    getTasksDueToday,
    getTasksDueLater,
    toDisplayableList,
  };
};

module.exports = createTodoList;
