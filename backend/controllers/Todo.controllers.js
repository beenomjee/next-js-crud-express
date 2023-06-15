import { Todo } from "../db/index.js";

export const createTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const { description } = req.body;
    const todo = new Todo({ userId, description });
    await todo.save();
    return res.status(201).json({
      message: "Todo created!",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      error,
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const userId = req.userId;
    const todos = await Todo.find({ userId });
    return res.status(200).json({
      message: "Todos loaded!",
      todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      error,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { _id, description, isCompleted } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      _id,
      {
        description,
        isCompleted,
      },
      { new: true }
    );
    if (!todo)
      return res.status(404).json({
        message: "Todo not found!",
      });
    return res.status(200).json({
      message: "Todo updated!",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      error,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { _id } = req.params;
    const todo = await Todo.findByIdAndDelete(_id);
    if (!todo)
      return res.status(404).json({
        message: "Todo not found!",
      });
    return res.status(200).json({
      message: "Todo deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong. Please try again!",
      error,
    });
  }
};
