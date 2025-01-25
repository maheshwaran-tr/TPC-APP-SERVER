import studentService from "../services/studentService.js";

const getAllStudents = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const getStudentByRollno = async (req, res, next) => {
  try {
    const rollno = req.params.rollno;
    const student = await studentService.getByRollno(rollno);
    res.json(student);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const getStudentByUserId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const student = await studentService.getByUserId(id);
    res.json(student);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const getByStudentId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const student = await studentService.getByStudentId(id);
    res.json(student);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const getStudentsByDept = async (req, res, next) => {
  try {
    const dept = parseInt(req.params.dept);
    const students = await studentService.getStudentsByDept(dept);
    res.json(students);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const getStudentsByPlacementWilling = async (req, res, next) => {
  try {
    const placementWilling = req.params.placementWilling;
    if (placementWilling === "yes" || placementWilling === "no") {
      const students = await studentService.getStudentsByPlacementWilling(
        placementWilling
      );
      res.json(students);
    } else {
      const err = new Error("placementWilling should be either yes or no");
      err.statusCode = 400;
      next(err);
    }
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const student = req.body;
    const newStudent = await studentService.createStudent(student);
    res.json(newStudent);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const updateByStudentId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const student = req.body;
    const updatedStudent = await studentService.updateByStudentId(id, student);
    res.json(updatedStudent);
  } catch (error) {
    const err = new Error(error.message);
    next(err);
  }
};

const deleteByStudentId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const student = await studentService.deleteByStudentId(id);
    res.json(student);
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    next(err);
  }
};

export default {
  getAllStudents,
  getStudentByRollno,
  getStudentByUserId,
  getByStudentId,
  getStudentsByPlacementWilling,
  getStudentsByDept,
  createStudent,
  updateByStudentId,
  deleteByStudentId,
};
