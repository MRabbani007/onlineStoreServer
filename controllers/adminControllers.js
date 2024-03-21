const user = require("../db_schemas/user");

// Get user details for admin
const handleGetUsers = async (req, res) => {
  try {
    const data = await user.find(
      {},
      { password: 0, accessToken: 0, refreshToken: 0 }
    );
    if (data.length !== 0) {
      return res.status(200).json(data);
    } else {
      return res.sendStatus(204);
    }
  } catch (error) {
    console.log("Error: Admin get users");
    return res.sendStatus(500);
  }
};

const handleUpdateRoles = async (req, res) => {
  try {
    const action = req?.body?.action;
    const { type, payload } = action;

    console.log(action);
    if (!type || !payload) {
      return res.sendStatus(400);
    }

    const id = payload?.id;
    const roles = payload?.roles;

    const data = await user.updateOne({ id }, { $set: { roles } });
    return res
      .status(200)
      .json({ status: "success", message: "roles updated" });
  } catch (error) {
    console.log("Error: Admin Update Roles");
    return res.sendStatus(500);
  }
};

const handleResetPassword = async (req, res) => {
  try {
    const action = req?.body?.action;
    const { type, payload } = action;

    const id = payload?.id;
    const roles = payload?.roles;

    const data = await user.updateOne({ id }, { $set: { password: "123456" } });
    return res
      .status(200)
      .json({ status: "success", message: "reset password" });
  } catch (error) {
    console.log("Error: Admin Reset Password");
    return res.sendStatus(500);
  }
};

module.exports = { handleGetUsers, handleUpdateRoles, handleResetPassword };
