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
//export
module.exports = taskController;
