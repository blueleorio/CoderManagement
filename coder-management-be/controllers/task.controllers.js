const { sendResponse, AppError } = require("../helpers/utils.js");

const Task = require("../models/Task.js");

const taskController = {};
//Create a Task
taskController.createTask = async (req, res, next) => {
  //in real project you will getting info from req
  const info = {
    name: "any",
    description: "any Task",
    referenceTo: "62cc2ac20dd407751c1e45c6",
  };
  try {
    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create Task Error");
    //in real project you must also check if id (referenceTo) is valid as well as if document with given id is exist before any futher process

    //mongoose query
    const created = await Task.create(info);
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
  const filter = {};
  try {
    //mongoose query
    const listOfFound = await Task.find(filter).populate("referenceTo");
    //this to query data from the reference and append to found result.

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

//Delete Task
taskController.deleteTaskById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const targetId = null;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Task.findByIdAndDelete(targetId, options);

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Delete Task success"
    );
  } catch (err) {
    next(err);
  }
};
//export
module.exports = taskController;
