import prisma from "../config/prismaClient.js";

// Read operations
const getAllStudents = async () => {
  try {
    const students = await prisma.student.findMany({
      include: {
        department: true,
        applications: true,
        training_attendance:{
          include:{
            training:true
          }
        }
      },
    });
    return students;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByRollno = async (rollno) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        rollno: rollno,
      },
      include: {
        department: true,
        applications: true,
        training_attendance:{
          include:{
            training:true
          }
        }
      },
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByUserId = async (userId) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        userId: userId,
      },
      include: {
        department: true,
        applications: true,
        training_attendance:{
          include:{
            training:true
          }
        }
      },
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByStudentId = async (studentId) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        student_id: studentId,
      },
      include: {
        department: true,
        applications: true,
        training_attendance:{
          include:{
            training:true
          }
        }
      },
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStudentsByDept = async (deptId) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        dept_id: deptId,
      },
      include: {
        department: true,
        applications: true,
        training_attendance:true
      },
    });
    return students;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStudentsByPlacementWilling = async (placementWilling) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        placement_willing: placementWilling,
      },
      include: {
        department: true,
        applications: true,
        training_attendance:true
      },
    });
    return students;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create Operations
const createStudent = async (student) => {
  try {
    const newStudent = await prisma.student.create({
      data: student,
    });
    return newStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Operations
const updateByRollno = async (rollno, student) => {
  try {
    const updatedStudent = await prisma.student.update({
      where: {
        rollno: rollno,
      },
      data: student,
    });
    return updatedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateByStudentId = async (studentId, student) => {
  try {
    const { applications, department, ...studentData } = student;
    const updatedStudent = await prisma.student.update({
      where: {
        student_id: studentId,
      },
      data: studentData,
    });
    return updatedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStudents = async (students) => {
  try {
    // Use Promise.all to update all students concurrently
    const updatedStudents = await Promise.all(
      students.map(async (student) => {
        const { applications, department, ...studentData } = student;

        // Update each student individually
        return await prisma.student.update({
          where: {
            student_id: student.student_id, // Use the student_id to identify the student
          },
          data: studentData, // Update only non-relational fields
        });
      })
    );
    return updatedStudents; // Return the list of updated students
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Operations
const deleteByRollno = async (rollno) => {
  try {
    const deletedStudent = await prisma.student.delete({
      where: {
        rollno: rollno,
      },
    });
    return deletedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteByStudentId = async (studentId) => {
  try {
    const deletedStudent = await prisma.student.delete({
      where: {
        student_id: studentId,
      },
    });
    return deletedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createStudent,
  getAllStudents,
  getByRollno,
  getByUserId,
  getByStudentId,
  getStudentsByDept,
  getStudentsByPlacementWilling,
  updateByRollno,
  updateStudents,
  updateByStudentId,
  deleteByRollno,
  deleteByStudentId,
};
