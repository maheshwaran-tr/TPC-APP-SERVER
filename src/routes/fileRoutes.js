import express from 'express';
import multer from 'multer';
import fileController from '../controllers/fileController.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload/:folderContext', upload.single('file'), fileController.uploadFile);
router.get('/:fileName/:folderContext', fileController.getFileUrl);
router.delete('/:fileName/:folderContext', fileController.deleteFile);

export default router;