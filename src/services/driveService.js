import prisma from "../config/prismaClient.js";
import notificationService from "./notificationService.js";
import companyService from "./companyService.js";

const getAllDrives = async () => {
  try {
    const drives = await prisma.drive.findMany({
      include: {
        company: true,
        applications: true,
      },
    });
    return drives;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDriveById = async (id) => {
  try {
    const drive = await prisma.drive.findUnique({
      where: { drive_id: id },
      include: {
        company: true,
        applications: true,
      },
    });
    return drive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addDrive = async (drive) => {
  try {
    const newDrive = await prisma.drive.create({ data: drive });
    const company = await companyService.getByCompanyId(newDrive.company_id);
    notificationService.sendNotification(newDrive.job_role, company.company_name, company.logo_url);
    return newDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDrive = async (id, drive) => {
  try {
    const updatedDrive = await prisma.drive.update({
      where: { drive_id: id },
      data: drive,
    });
    return updatedDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteDrive = async (id) => {
  try {
    const deletedDrive = await prisma.drive.delete({ where: { drive_id: id } });
    return deletedDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getAllDrives,
  getDriveById,
  addDrive,
  updateDrive,
  deleteDrive,
};
