const express = require("express");
const { create, list, remove, show, update } = require("../controllers/userController");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = 'user-' + Date.now() + ext;
        cb(null, filename);
    }
});
const upload = multer({ storage });

router.post("/", upload.single('avatar'), create);
router.get("/", list);
router.put("/:id", upload.single('avatar'), update);
router.get("/:id", show);
router.delete("/:id", remove);

module.exports = router;