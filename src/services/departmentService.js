import prisma from "../config/prismaClient.js";

const getAllDepartments = async () => {
  try {
    const departments = await prisma.department.findMany({
      include:{
        students:true,
        staff:true
      }
    });
    return departments;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDepartmentById = async (id) => {
  try {
    const department = await prisma.department.findUnique({
      where: { dept_id: id },
      include:{
        students:true,
        staff:true
      }
    });
    return department;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addDepartment = async (department) => {
  try {
    const newDepartment = await prisma.department.create({ data: department });
    return newDepartment;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDepartment = async (id, department) => {
  try {
    const updatedDepartment = await prisma.department.update({
      where: { dept_id: id },
      data: department,
    });
    return updatedDepartment;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteDepartment = async (id) => {
  try {
    const deletedDepartment = await prisma.department.delete({
      where: { dept_id: id },
    });
    return deletedDepartment;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
