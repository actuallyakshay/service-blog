const {
  getAllPosts,
  createPost,
  getPostById,
} = require("../controller/post.controller");
const multer = require("multer");
const upload = multer();

const router = require("express").Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/create", upload.single("file"), createPost);

module.exports = router;
