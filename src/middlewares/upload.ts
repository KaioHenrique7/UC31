import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const nomeArquivo = Date.now() + path.extname(file.originalname);
        cb(null, nomeArquivo);
    }
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {

    const tiposPermitidos = /jpeg|jpg|png|gif/;
    const extensao = tiposPermitidos.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mime = tiposPermitidos.test(file.mimetype);

    if (extensao && mime) {
        cb(null, true);
    } else {
        cb(new Error("Somente imagens JPG, JPEG, PNG ou GIF são permitidas."));
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;