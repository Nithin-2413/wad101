const todoList = () => {
  const all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    if (index >= 0 && index < all.length) {
      all[index].completed = true;
    } else {
      console.error("Invalid index");
    }
  };

  const overdue = () => {
    const currentDate = new Date();
    return all.filter((item) => new Date(item.dueDate) < currentDate);
  };

  const dueToday = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return all.filter((item) => new Date(item.dueDate).toISOString().split('T')[0] === currentDate);
  };

  const dueLater = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return all.filter((item) => new Date(item.dueDate).toISOString().split('T')[0] > currentDate);
  };

  const toDisplayableList = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    let output = "";

    all.forEach((item) => {
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
