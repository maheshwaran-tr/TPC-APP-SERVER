import prisma from "../config/prismaClient.js";

const getAllStatuses = async () => {
  try {
    const statuses = await prisma.status.findMany({
      include: {
        applications: true,
      },
    });
    return statuses;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStatusById = async (id) => {
  try {
    const status = await prisma.status.findUnique({
      where: { status_id: id },
      include: {
        applications: true,
      },
    });
    return status;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addStatus = async (status) => {
  try {
    const newStatus = await prisma.status.create({ data: status });
    return newStatus;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStatus = async (id, status) => {
  try {
    const updatedStatus = await prisma.status.update({
      where: { status_id: id },
      data: status,
    });
    return updatedStatus;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStatus = async (id) => {
  try {
    const deletedStatus = await prisma.status.delete({
      where: { status_id: id },
    });
    return deletedStatus;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getAllStatuses,
  getStatusById,
  addStatus,
  updateStatus,
  deleteStatus,
};
