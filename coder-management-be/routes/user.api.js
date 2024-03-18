const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controllers.js");

//Read
/**
 * @route GET api/User
 * @description get list of Users
 * @access public
 */
router.get("/", getAllUsers);

//Read
/**
 * @route GET api/User
 * @description get information of single User
 * @access public
 */
router.get("/:id", idValidationRules, getUser);

//Create
/**
 * @route POST api/User
 * @description create a User
 * @access public
 */
router.post("/", createUserValidationRules, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createUser(req, res, next);
});

//Update
/**
 * @route PUT api/User
 * @description update a User
 * @access public
 */
router.put("/:id", idValidationRules, updateUserById);

//Delete
/**
 * @route DELETE api/User
 * @description delet a User
 * @access public
 */
router.delete("/:id", idValidationRules, deleteUserById);

//export
module.exports = router;
