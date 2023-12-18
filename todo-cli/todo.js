function todoList() {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  function isDueToday(dueDate) {
    const today = new Date().toISOString().split("T")[0];
    return dueDate === today;
  }

  function toString(todo) {
    const dueDate = isDueToday(todo.dueDate) ? "" : todo.dueDate;
    const status = todo.completed ? "[x]" : "[ ]";
    return `${status} ${todo.title} ${dueDate}`;
  }

  const overdue = () => {
    return all.filter((todo) => todo.dueDate < new Date().toISOString().split("T")[0]);
  };

  const dueToday = () => {
    return all.filter((todo) => todo.dueDate === new Date().toISOString().split("T")[0]);
  };

  const dueLater = () => {
    return all.filter((todo) => todo.dueDate > new Date().toISOString().split("T")[0]);
  };

  const toDisplayableList = () => {
    return all.map((todo) => toString(todo)).join("\n");
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
