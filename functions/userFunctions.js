const user = require("../dbSchemas/user");

const userInfo = [];

const signInUser = async (clientusername, clientpassword) => {
  try {
    let result = "";
    const data = await user.find({ userName: clientusername });
    if (data.length) {
      if (data[0].userName === clientusername) {
        if (data[0].password === clientpassword) {
          result = "accepted";
          userInfo.push({ userName: data[0].userName, userID: data[0]._id });
        } else {
          result = "wrong password";
        }
      } else {
        result = "wrong details";
      }
    } else {
      result = "wrong details";
    }
    return result;
  } catch (error) {
    return "Error: Signin error";
  }
};

const signUpUser = async (clientusername, clientpassword) => {
  try {
    let result = "";
    const data = await user.find({ userName: clientusername });
    console.log("data", data);
    // check if already registered
    if (data.length !== 0) {
      if (data[0].userName === clientusername) {
        result = "already registered";
        return result;
      } else {
        // TODO: check
        result = "already registered";
        return result;
      }
    } else {
      // if username not in db register new user
      // save data into db model
      const newUser = new user({
        userName: clientusername,
        password: clientpassword,
        email: "",
        key: "",
      });
      // save request to db
      newUser.save().then(
        (saveResult) => {
          result = "registered";
          console.log("One entry added");
          console.log(saveResult);
          return result;
        },
        (err) => {}
      );
    }
  } catch (error) {
    return "Error: Signup error";
  }
};

// TODO: Implement updates to user
const updateUser = async (userName, updateType, updateData) => {};

const getUserID = async (userName) => {
  try {
    let temp = userInfo.find((user) => user.userName);
    if (false) {
      return temp._id;
    } else {
      const data = await user.find({ userName: userName });
      if (data.length !== 0) {
        return data[0]._id.toString();
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log("Error: get user ID");
  }
};

module.exports = { signInUser, signUpUser, getUserID };
