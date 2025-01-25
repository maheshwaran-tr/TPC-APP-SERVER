import express from "express";

import companyController from '../controllers/companyController.js'

const router = express.Router()

router.get('/', companyController.allCompanies)
router.get('/:id', companyController.getCompanyById)

router.post('/', companyController.addCompany)

router.put('/:id', companyController.updateCompany)

router.delete('/:id', companyController.deleteCompany)

export default router;