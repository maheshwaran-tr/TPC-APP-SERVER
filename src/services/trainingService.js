import prisma from "../config/prismaClient.js";

/**
 * Get all trainings
 * @returns {Promise<Array>} - List of trainings
 */
const getAllTrainings = async () => {
  try {
    const trainings = await prisma.training.findMany({
      include: {
        training_attendance: {
          include: {
            student: true,
          },
        },
      },
    });
    return trainings;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get a training by ID
 * @param {number} id - Training ID
 * @returns {Promise<Object>} - Training details
 */
const getTrainingById = async (id) => {
  try {
    const training = await prisma.training.findUnique({
      where: { training_id: id },
      include: {
        training_attendance: {
          include: {
            student: true,
          },
        },
      },
    });
    return training;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Add a new training
 * @param {Object} training - Training data
 * @returns {Promise<Object>} - Newly created training
 */
const addTraining = async (training) => {
  try {
    const newTraining = await prisma.training.create({
      data: training,
    });
    return newTraining;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Update a training
 * @param {number} id - Training ID
 * @param {Object} training - Updated training data
 * @returns {Promise<Object>} - Updated training
 */
const updateTraining = async (id, training) => {
  try {
    const updatedTraining = await prisma.training.update({
      where: { training_id: id },
      data: training,
    });
    return updatedTraining;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Delete a training
 * @param {number} id - Training ID
 * @returns {Promise<Object>} - Deleted training
 */
const deleteTraining = async (id) => {
  try {
    const deletedTraining = await prisma.training.delete({
      where: { training_id: id },
    });
    return deletedTraining;
  } catch (error) {
    throw new Error(error.message);
  }
};


export default {
  getAllTrainings,
  getTrainingById,
  addTraining,
  updateTraining,
  deleteTraining,
};