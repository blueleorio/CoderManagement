const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
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

//Update
/**
 * @route PUT api/Task
 * @description update a Task
 * @access public
 */
router.put("/:id", updateTaskById);

//Delete
/**
 * @route DELETE api/Task
 * @description delet a Task
 * @access public
 */
router.delete("/:id", deleteTaskById);

//export
module.exports = router;
