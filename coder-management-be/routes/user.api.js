const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
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

//Create
/**
 * @route POST api/User
 * @description create a User
 * @access public
 */
router.post("/", createUser);

//Update
/**
 * @route PUT api/User
 * @description update a User
 * @access public
 */
router.put("/:id", updateUserById);

//Delete
/**
 * @route DELETE api/User
 * @description delet a User
 * @access public
 */
router.delete("/:id", deleteUserById);

//export
module.exports = router;
