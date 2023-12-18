const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    // Marks a task as completed at a specific index in the list.
    all[index].completed = true;
  };

  const overdue = () => {
    // Filters and returns tasks that are overdue based on their due date.
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate < today && !item.completed);
  };

  const dueToday = () => {
    // Filters and returns tasks that are due today.
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate === today && !item.completed);
  };

  const dueLater = () => {
    // Filters and returns tasks that are due later.
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate > today && !item.completed);
  };

  const toDisplayableList = (list) => {
    // Formats the list of tasks for display, including completion status and due date.
    const formattedList = list.map((item) => {
      const status = item.completed ? "[x]" : "[ ]";
      return `${status} ${item.title} ${item.dueDate !== today ? item.dueDate : ''}`;
    }).join("\n");

    return formattedList;
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
