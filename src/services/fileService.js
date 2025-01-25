import supabase from "../config/supabaseClient.js";

const BUCKET_NAME = "sit-tpc";

const uploadFile = async (fileBuffer, fileName, mimeType) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME) // Your Supabase bucket name
    .upload(fileName, fileBuffer, {
      cacheControl: "3600",
      upsert: true, // Set true if you want to overwrite files
      contentType: mimeType,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getFileUrl = (fileName) => {
  const { data, error } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);
  
  if (error) {
    throw new Error(error.message);
  }
  return data.publicUrl;
};

const deleteFile = async (fileName) => {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);

  if (error) {
    throw new Error(error.message);
  }

  return { message: "File deleted successfully" };
};

export default {
  uploadFile,
  getFileUrl,
  deleteFile,
};
