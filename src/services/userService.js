import prisma from "../config/prismaClient.js";

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include:{
        student:true,
        staff:true,
        admin:true
      }
    });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include:{
        student:true,
        staff:true,
        admin:true
      }
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: id },
      include:{
        student:true,
        staff:true,
        admin:true
      }
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (data) => {
  try {
    const user = await prisma.user.create({
      data,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, data) => {
  try {
    const {user_id, ...userData} = data;
    const user = await prisma.user.update({
      where: { user_id: id },
      data: userData,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: { user_id: id },
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { getAllUsers, findUserByUsername, findUserById, updateUser, deleteUser, createUser };
