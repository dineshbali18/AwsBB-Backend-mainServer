const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getNameById,
  deleteEmail,
  deleteUser
} = require("../controllers/user");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("email",deleteEmail)

router.get("/user/:userId/getuser", isSignedIn, isAuthenticated, getUser);
router.get("/user/:email",deleteUser);
router.put("/user/:userId/updateuser", isSignedIn, isAuthenticated, updateUser);
router.get("/user/:userId/getname",getNameById);


module.exports = router;
