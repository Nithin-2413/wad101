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
      (item) => new Date(item.dueDate) < new Date().toLocaleDateString("en-CA")
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
      (item) => new Date(item.dueDate) > new Date().toLocaleDateString("en-CA")
    );
  };

  const toDisplayableList = () => {
    return all.map((item) => {
      return {
        title: item.title,
        completed: item.completed ? "Yes" : "No",
        dueDate: item.dueDate,
      };
    });
  };

  return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
};

module.exports = todoList;
