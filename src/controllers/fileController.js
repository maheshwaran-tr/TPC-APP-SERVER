import fileService from "../services/fileService.js";

const FOLDER_CONTEXTS = {
  "company-logo": "company-logo",
  "resume": "resume",
  "profile": "profile",
  "department-logo": "department-logo",
  "proof": "proof",
  "drive-docs": "drive-docs",
};

function getFileName(folderContext, originalname) {
  if (!FOLDER_CONTEXTS[folderContext]) {
    throw new Error(`Invalid folder context: ${folderContext}`);
  }
  return `${FOLDER_CONTEXTS[folderContext]}/${originalname}`;
}

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("No file uploaded");
      err.status = 400;
      return next(err);
    }

    const folderContext = req.params.folderContext;

    if (!folderContext) {
      const err = new Error("Folder context is required");
      err.status = 400;
      return next(err);
    }

    const { buffer, originalname, mimetype } = req.file;

    const fileName = getFileName(folderContext, originalname);

    const fileData = await fileService.uploadFile(buffer, fileName, mimetype);
    const fileUrl = fileService.getFileUrl(fileName);

    res.status(200).json({
      message: "File uploaded successfully!",
      url: fileUrl,
    });
  } catch (error) {
    const err = new Error(`Error uploading file - ${error.message}`);
    next(err);
  }
};

const getFileUrl = async (req, res, next) => {
  try {
    const originalName = req.params.fileName;
    const folderContext = req.params.folderContext;

    const fileName = getFileName(folderContext,originalName);
    const fileUrl = fileService.getFileUrl(fileName);

    res.status(200).json({ url: fileUrl });
  } catch (error) {
    const err = new Error(`Error getting file - ${error.message}`);
    next(err);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const originalName = req.params.fileName;
    const folderContext = req.params.folderContext;

    const fileName = getFileName(folderContext, originalName);
    await fileService.deleteFile(fileName);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    const err = new Error(`Error uploading file - ${error.message}`);
    next(err);
  }
};

export default {
  uploadFile,
  getFileUrl,
  deleteFile,
};