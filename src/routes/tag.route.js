const {
  getAllTags,
  createTag,
  updateTagById,
  getTagById,
  deleteTag,
} = require("../controller/tag.controller");

const router = require("express").Router();

router.get("/", getAllTags);

router.get("/:id", getTagById);

router.post("/create", createTag);

router.patch("/update/:id", updateTagById);

router.delete("/delete/:id", deleteTag);

module.exports = router;
