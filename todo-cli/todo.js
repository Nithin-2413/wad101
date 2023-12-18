function todoList() {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const isDueToday = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    return dueDate === today;
  };

  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => isDueToday(todo.dueDate));
  };

  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = () => {
    return all
      .map((todo) => {
        const dueDate = isDueToday(todo.dueDate) ? "" : todo.dueDate;
        const status = todo.completed ? "[x]" : "[ ]";
        return `${status} ${todo.title} ${dueDate}`;
      })
      .join("\n");
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
}

module.exports = todoList;
