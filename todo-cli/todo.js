const TaskManager = () => {
  const today = new Date().toISOString().split("T")[0];
  const tasks = [];

  const addTask = (newTask) => {
    tasks.push(newTask);
  };

  const markAsComplete = (index) => {
    tasks[index].isDone = true;
    
    const today = new Date().toISOString().split("T")[0];
    tasks = tasks.filter(task => new Date(task.deadline).toISOString().split("T")[0] !== today);
  };  


    const overdueTasks = () => {
    return tasks.filter((task) => new Date(task.deadline) < new Date(today));
  };

  const tasksDueToday = () => {
    return tasks.filter((task) => new Date(task.deadline).toISOString().split("T")[0] === today);
  };

  const tasksDueLater = () => {
    return tasks.filter((task) => new Date(task.deadline) > new Date(today));
  };

  const displayTasks = (list) => {
    let output = "";
    if (list.length === 0) {
      return "";
    }

    for (const task of list) {
      output += `[${task.isDone ? "x" : " "}] ${task.title}`;
      if (task.deadline !== today) {
        output += ` ${formatDate(new Date(task.deadline))}`;
      }
      output += "\n";
    }

    return output.trim();
  };

  const toDisplayableList = (list) => {
    let output = "";
    if (list.length === 0) {
      return "";
    }

    for (const task of list) {
      output += `[${task.isDone ? "x" : " "}] ${task.title}`;
      if (task.deadline !== today) {
        output += ` ${formatDate(new Date(task.deadline))}`;
      }
      output += "\n";
    }

    return output.trim();
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return {
    tasks,
    addTask,
    markAsComplete,
    overdueTasks,
    tasksDueToday,
    tasksDueLater,
    displayTasks,
    toDisplayableList,
  };
};

module.exports = TaskManager;
