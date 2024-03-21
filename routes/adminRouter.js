const express = require("express");
const verifyRoles = require("../middleware/verifyRoles");
const {
  handleGetUsers,
  handleUpdateRoles,
  handleResetPassword,
} = require("../controllers/adminControllers");

const adminRouter = express();

adminRouter.route("/users/getall").post(verifyRoles(5150), handleGetUsers);

adminRouter
  .route("/users/updateRoles")
  .put(verifyRoles(5150), handleUpdateRoles);

adminRouter
  .route("/users/resetPassword")
  .put(verifyRoles(5150), handleResetPassword);

adminRouter.post("/*", (req, res) => {
  console.log(req.params.name);
  res.json("Server Running");
});

module.exports = adminRouter;
