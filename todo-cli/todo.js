const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    if (index >= 0 && index < all.length) {
      all[index].completed = true;
    } else {
      console.error("Invalid index!");
    }
  };

  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate < today && !item.completed);
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate === today && !item.completed);
  };

  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate > today && !item.completed);
  };

  const toDisplayableList = (list) => {
    const formattedList = list
      .map((item) => {
        const status = item.completed ? "[x]" : "[ ]";
        return `${status} ${item.title} ${item.dueDate !== today ? item.dueDate : ''}`;
      })
      .join("\n");
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
