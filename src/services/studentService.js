import prisma from "../config/prismaClient.js";

// Read operations
const getAllStudents = async () => {
  try {
    const students = await prisma.student.findMany({
      include: {
        department: true,
        applications: true,
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
    const updatedStudent = await prisma.student.update({
      where: {
        student_id: studentId,
      },
      data: student,
    });
    return updatedStudent;
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
  updateByStudentId,
  deleteByRollno,
  deleteByStudentId,
};
