import prisma from "../config/prismaClient.js";


const getByUserId = async (user_id) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        user_id,
      },
      include: {
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return admin;
  } catch (error) {
    throw new Error(`Error in getting admin - ${error.message}`);
  }
};

const getAllAdmins = async () => {
  try {
    const admins = await prisma.admin.findMany({
      include: {
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return admins;
  } catch (error) {
    throw new Error(`Error in getting all admins - ${error.message}`);
  }
};

const getAdminById = async (admin_id) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        admin_id,
      },
      include: {
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return admin;
  } catch (error) {
    throw new Error(`Error in getting admin by id - ${error.message}`);
  }
};

const createAdmin = async (data) => {
  try {
    const admin = await prisma.admin.create({
      data,
    });
    
    return admin;
  } catch (error) {
    throw new Error(`Error in creating admin - ${error.message}`);
  }
};

const updateAdmin = async (admin_id, data) => {
  try {
    const admin = await prisma.admin.update({
      where: {
        admin_id,
      },
      data,
    });
    return admin;
  } catch (error) {
    throw new Error(`Error in updating admin - ${error.message}`);
  }
};

const deleteAdmin = async (admin_id) => {
  try {
    const admin = await prisma.admin.delete({
      where: {
        admin_id,
      },
    });
    return admin;
  } catch (error) {
    throw new Error(`Error in deleting admin - ${error.message}`);
  }
};

export default {
  getAllAdmins,
  getAdminById,
  getByUserId,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};