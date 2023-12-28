const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.send("Hello World");
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.findAll(); // Query PostgreSQL database using Sequelize to get all Todos
    response.send(todos); // Respond with all Todos
  } catch (error) {
    console.error("Error fetching todos:", error);
    response.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id); // Find the Todo by ID

    if (!todo) {
      response.send(false); // If Todo not found, respond with false
      return;
    }

    await todo.destroy(); // Delete the Todo
    response.send(true); // Respond with true upon successful deletion
  } catch (error) {
    console.error("Error deleting todo:", error);
    response.status(500).json(false); // Respond with false in case of an error
  }
});

module.exports = app;
