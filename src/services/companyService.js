import prisma from "../config/prismaClient.js";

const getAllCompanies = async () => {
  try {
    const companies = await prisma.company.findMany({
      include:{
        drives: true
      }
    });
    return companies;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByCompanyId = async (id) => {
  try {
    const company = await prisma.company.findUnique({
      where: { company_id: id },
      include:{
        drives: true
      }
    });
    return company;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCompany = async (companyData) => {
  try {
    const company = await prisma.company.create({
      data: companyData,
    });
    return company;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCompany = async (companyId, updatedData) => {
  try {
    const updatedCompany = await prisma.company.update({
      where: { company_id: companyId },
      data: updatedData,
    });
    return updatedCompany;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCompany = async (companyId) => {
  try {
    const deletedCompany = await prisma.company.delete({
      where: { company_id: companyId },
    });
    return deletedCompany;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
    getAllCompanies,
    updateCompany,
    deleteCompany,
    addCompany,
    getByCompanyId
};