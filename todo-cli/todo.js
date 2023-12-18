/* eslint-disable no-undef */
function todoList() {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    if (all[index]) {
      all[index].completed = true;
    }
  };

  const isDueToday = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    return dueDate === today;
  };

  const toString = (todo) => {
    const dueDate = isDueToday(todo.dueDate) ? "" : todo.dueDate;
    const status = todo.completed ? "[x]" : "[ ]";
    return `${status} ${todo.title} ${dueDate}`;
  };

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
