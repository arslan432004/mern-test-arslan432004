const express = require("express");
const {
  createCourse,
  getCourses,
  deleteCourse,
  updateCourse
} = require("../controllers/courseController");

const router = express.Router();

router.post("/", createCourse);
router.get("/", getCourses);
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);

module.exports = router;