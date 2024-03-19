const { sendResponse, AppError } = require("../helpers/utils.js");

const Task = require("../models/Task.js");

// Thanh id: 65f5ece8252edcc78be5a573
const taskController = {};
//Create a Task
taskController.createTask = async (req, res, next) => {
  //in real project you will getting info from req
  const info = req.body;
  try {
    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create Task Error");
    //in real project you must also check if id (referenceTo) is valid as well as if document with given id is exist before any futher process

    //mongoose query
    const created = await Task.create(info);

    // If the assignedTo field is an array and is not empty, update each user
    if (Array.isArray(info.assignedTo) && info.assignedTo.length > 0) {
      await User.updateMany(
        { _id: { $in: info.assignedTo } },
        { $addToSet: { tasks: created._id } }
      );
    }

    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create Task Success"
    );
  } catch (err) {
    next(err);
  }
};

//Get all Task
taskController.getAllTasks = async (req, res, next) => {
  //in real project you will getting condition from from req then construct the filter object for query
  // empty filter mean get all
  const { taskId } = req.params;
  const filter = { isDeleted: false };
  if (taskId) {
    filter._id = taskId;
  }
  try {
    //mongoose query
    const listOfFound = await Task.find(filter).populate("assignedTo");
    //this to query data from the reference and append to found result.
    if (taskId && listOfFound.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound },
      null,
      "Found list of Tasks success"
    );
  } catch (err) {
    next(err);
  }
};

//Update a Task
taskController.updateTaskById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  //you will also get updateInfo from req
  // empty target and info mean update nothing
  const targetId = null;
  const updateInfo = "";

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Task.findByIdAndUpdate(targetId, updateInfo, options);

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Update Task success"
    );
  } catch (err) {
    next(err);
  }
};
taskController.addUserToTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { ref } = req.body;

  try {
    let task = await Task.findByIdAndUpdate(
      taskId,
      { $addToSet: { assignedTo: ref } },
      { new: true, useFindAndModify: false }
    );
    // Update the user document with the task ID
    let user = await User.findByIdAndUpdate(
      ref,
      { $addToSet: { tasks: taskId } },
      { new: true, useFindAndModify: false }
    );

    if (!task || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Task or user not found" });
    }
    sendResponse(
      res,
      200,
      true,
      { data: task },
      null,
      "Add user to task success"
    );
  } catch (err) {
    next(err);
  }
};

//Delete Task
taskController.deleteTaskById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const targetId = req.params.taskId;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const deleted = await Task.findByIdAndUpdate(
      targetId,
      { isDeleted: true },
      options
    );
    if (!deleted) throw new AppError("Task not found", 404);

    sendResponse(
      res,
      200,
      true,
      { data: deleted },
      null,
      "Delete Task success"
    );
  } catch (err) {
    next(err);
  }
};
//export
module.exports = taskController;
