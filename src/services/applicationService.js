import prisma from "../config/prismaClient.js";

// Apply for a drive
const applyForDrive = async (studentId, driveId) => {
  try {
    // Check if the student has already applied for the drive
    
    const existingApplication = await prisma.application.findFirst({
      where: {
        student_id: studentId,
        drive_id: driveId,
      },
    });

    if (existingApplication) {
      throw new Error("Student has already applied for this drive");
    }

    // Fetch drive details and its eligibility criteria
    const drive = await prisma.drive.findUnique({
      where: { drive_id: driveId },
    });

    if (!drive) {
      throw new Error("Drive not found");
    }

    // Destructure the drive's eligibility criteria
    const { eligible_10th_mark, eligible_12th_mark, eligible_cgpa } = drive;

    // Fetch student details
    const student = await prisma.student.findUnique({
      where: { student_id: studentId },
    });

    if (!student) {
      throw new Error("Student not found.");
    }

    // Destructure the student's marks and CGPA
    const { score_10th, score_12th, cgpa } = student;

    // Check if the student meets the eligibility criteria
    if (eligible_10th_mark && score_10th < eligible_10th_mark) {
      throw new Error("Student does not meet the 10th eligibility criteria");
    }

    if (eligible_12th_mark && score_12th < eligible_12th_mark) {
      throw new Error("Student does not meet the 12th eligibility criteria");
    }

    if (eligible_cgpa && cgpa < eligible_cgpa) {
      throw new Error("Student does not meet the CGPA eligibility criteria"); 
    }

    // Create the application with initial status (status_id: 1 for applying stage)
    const application = await prisma.application.create({
      data: {
        student_id: studentId,
        drive_id: driveId,
        status_id: 1, // Status ID for applying stage (Wl)
      },
    });

    return application;
    
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all applications
const getAllApplications = async () => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        student: true,
        drive: true,
        status: true,
      },
    });
    return applications;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get application by ID
const getApplicationById = async (applicationId) => {
  try {
    const application = await prisma.application.findUnique({
      where: { application_id: applicationId },
      include: {
        student: true,
        drive: true,
        status: true,
      },
    });
    if (!application) {
      throw new Error("Application not found");
    }
    return application;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update application status
const updateApplication = async (applicationId, statusId) => {
  try {
    const updatedApplication = await prisma.application.update({
      where: { application_id: applicationId },
      data: { status_id: statusId },
    });
    return updatedApplication;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete application
const deleteApplication = async (applicationId) => {
  try {
    const deletedApplication = await prisma.application.delete({
      where: { application_id: applicationId },
    });
    return deletedApplication;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  applyForDrive,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
