const { sendResponse, AppError } = require("../helpers/utils.js");

var express = require("express");
//importing query from <express-validator></express-validator>
const { body, param, validationResult } = require("express-validator");
var router = express.Router();

// Set a timeout of 15 seconds for all API calls
router.use((req, res, next) => {
  req.setTimeout(15000, () => {
    let err = new Error("Request Timeout");
    err.status = 408;
    next(err);
  });
  next();
});
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to CoderSchool!");
});

router.get("/template/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});

router.get("/slow", (req, res, next) => {
  try {
    setTimeout(() => {
      res.status(200).send("Slow response Testing");
    }, 20000);
  } catch (err) {
    next(err);
  }
});

const userRouter = require("./user.api.js");
router.use("/users", userRouter);

const taskRouter = require("./task.api.js");
router.use("/tasks", taskRouter);

module.exports = router;
