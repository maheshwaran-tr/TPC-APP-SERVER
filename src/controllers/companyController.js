import companyService from "../services/companyService.js";

const allCompanies = async (req, res, next) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.json(companies);
  } catch (error) {
    const err = new Error(
      `Error while fetching all companies - ${error.message}`
    );
    err.status = 500;
    next(err);
  }
};

const getCompanyById = async (req, res, next) => {
  try {
    const companyId = parseInt(req.params.id);
    const company = await companyService.getByCompanyId(companyId);
    if (!company) {
      const err = new Error(`Company with id ${companyId} not found`);
      err.status = 404;
      next(err);
    }
    res.json(company);
  } catch (error) {
    const err = new Error(
      `Error while fetching all companies - ${error.message}`
    );
    err.status = 500;
    next(err);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const companyId = parseInt(req.params.id);
    const updatedCompany = await companyService.updateCompany(
      companyId,
      req.body
    );
    res.json(updatedCompany);
  } catch (error) {
    const err = new Error(
      `Error while fetching all companies - ${error.message}`
    );
    err.status = 500;
    next(err);
  }
};

const addCompany = async (req, res, next) => {
  try {
    const newCompany = await companyService.addCompany(req.body);
    res.json(newCompany);
  } catch (error) {
    const err = new Error(
      `Error while fetching all companies - ${error.message}`
    );
    err.status = 500;
    next(err);
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const companyId = parseInt(req.params.id);
    const company = await companyService.deleteCompany(companyId);
    res.json(company);
  } catch (error) {
    const err = new Error(
      `Error while fetching all companies - ${error.message}`
    );
    err.status = 500;
    next(err);
  }
};

export default {
    allCompanies,
    getCompanyById,
    updateCompany,
    addCompany,
    deleteCompany
};