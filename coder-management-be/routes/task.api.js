const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
} = require("../controllers/task.controllers.js");

//Read
/**
 * @route GET api/Task
 * @description get list of Tasks
 * @access public
 */
router.get("/", getAllTasks);

//Create
/**
 * @route POST api/Task
 * @description create a Task
 * @access public
 */
router.post("/", createTask);

//export
module.exports = router;
