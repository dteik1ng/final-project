import multer from "multer";
import fs from 'fs'

export const upload = multer({
  storage: multer.memoryStorage(),
});

export const maxBytes = 1e7;

export const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg"];

export const validateSchemaInto = (Shema, body) => {
  try {
    return Shema.parse(body);
  } catch (err) {
    return err;
  }
};

export const crearNombreRecurso = (file) => {
  let formato = file.mimetype.split("/");
  let nombreImg = file.originalname.split(".");

  const llaveUnica = `${formato[0]}_${Date.now()}_${Math.round(
    Math.random() * 1e4
  )}`;
  const mimetype = formato[formato.length - 1];
  const nombre = `${nombreImg[0]}_${llaveUnica}.${mimetype}`
    .replace(/\s/g, "")
    .toLowerCase();
  return {
    nombre,
    mimetype,
  };
};

export const deleteFile = (pathFile) => {
  let path = `src/upload/${pathFile}`;
  const existe = fs.existsSync(path);

  if (path && existe) {
    fs.rm(path, (err) => {
      if (err) return true;
      else return false;
    });
  }
};
