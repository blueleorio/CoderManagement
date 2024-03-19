const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const {
  createTaskValidationRules,
  idValidationRules,
} = require("../controllers/validationRules.js");
const {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  addUserToTask,
} = require("../controllers/task.controllers.js");

//Read
/**
 * @route GET api/Task
 * @description get list of Tasks
 * @access public
 */
router.get("/:taskId?", idValidationRules, getAllTasks);

//Create
/**
 * @route POST api/Task
 * @description create a Task
 * @access public
 */
router.post("/", createTaskValidationRules, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createTask(req, res, next);
});

//Update
/**
 * @route PUT api/Task
 * @description update a Task
 * @access public
 */
router.put("/updateTaskInfo/:taskId", idValidationRules, updateTaskById);

/**
 * @route PUT api/boo
 * @description assigned new use to task
 * @access public
 */
router.put("/addUserToTask/:taskId", idValidationRules, addUserToTask);

//Delete
/**
 * @route DELETE api/Task
 * @description delet a Task
 * @access public
 */
router.delete("/:taskId", idValidationRules, deleteTaskById);

//export
module.exports = router;
