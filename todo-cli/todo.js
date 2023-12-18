const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter(
      (item) => new Date(item.dueDate) < new Date()
    );
  };

  const dueToday = () => {
    const today = new Date().toLocaleDateString("en-CA");
    return all.filter(
      (item) => item.dueDate === today
    );
  };

  const dueLater = () => {
    return all.filter(
      (item) => new Date(item.dueDate) > new Date()
    );
  };

  return { all, add, markAsComplete, overdue, dueToday, dueLater };
};

module.exports = todoList;
