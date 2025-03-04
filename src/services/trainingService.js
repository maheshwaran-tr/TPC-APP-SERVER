import prisma from "../config/prismaClient.js";

/**
 * Get all trainings
 * @returns {Promise<Array>} - List of trainings
 */
const getAllTrainings = async () => {
  try {
    const trainings = await prisma.training.findMany({
      include: {
        training_attendance: true,
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

// const updateAttandance = async (attendances) => {
//   console.log(attendances);
//   try {
//     // Use Promise.all to handle all attendance records concurrently
//     const updatedAttendances = await Promise.all(
//       attendances.map(async (attendance) => {
//         const { training_id, student_id,training_date, status } = attendance;

//         // Check if the attendance record already exists
//         const existingAttendance = await prisma.training_attendance.findFirst({
//           where: {
//             training_id,
//             student_id,
//             training_date: {
//               equals: new Date(training_date).setHours(0, 0, 0, 0), // Normalize to start of the day
//             },
//           },
//         });

//         if (existingAttendance) {
//           // Update the existing record
//           return await prisma.training_attendance.update({
//             where: {
//               attendance_id: existingAttendance.attendance_id, // Use the unique attendance_id to update
//             },
//             data: {
//               status, // Update the status
//             },
//           });
//         } else {
//           // Insert a new record
//           return await prisma.training_attendance.create({
//             data: {
//               training_id,
//               student_id,
//               training_date,
//               status,
//             },
//           });
//         }
//       })
//     );

//     return updatedAttendances; // Return the list of updated or inserted attendances
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const updateAttandance = async (attendances) => {
  console.log(attendances);
  try {
    const updatedAttendances = await Promise.all(
      attendances.map(async (attendance) => {
        const { training_id, student_id, training_date, status } = attendance;

        const normalizedDate = new Date(training_date);
        normalizedDate.setHours(0, 0, 0, 0); // Ensure it's only the date

        // Check if attendance already exists (ignoring time)
        const existingAttendance = await prisma.training_attendance.findFirst({
          where: {
            training_id,
            student_id,
          },
          orderBy: {
            training_date: "desc",
          },
        });

        if (
          existingAttendance &&
          existingAttendance.training_date.toISOString().split("T")[0] ===
            normalizedDate.toISOString().split("T")[0] // Compare only the date part
        ) {
          return await prisma.training_attendance.update({
            where: {
              attendance_id: existingAttendance.attendance_id,
            },
            data: { status },
          });
        } else {
          return await prisma.training_attendance.create({
            data: {
              training_id,
              student_id,
              training_date: normalizedDate, // Store without time
              status,
            },
          });
        }
      })
    );

    return updatedAttendances;
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw new Error("Failed to update attendance. Please try again.");
  }
};


export default {
  getAllTrainings,
  getTrainingById,
  addTraining,
  updateAttandance,
  updateTraining,
  deleteTraining,
};
