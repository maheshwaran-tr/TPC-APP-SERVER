import userService from "../services/userService.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.findUserById(id);
    res.json(user);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userId = parseInt(id);
    const user = await userService.deleteUser(userId);
    res.json(user);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

export default { 
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};