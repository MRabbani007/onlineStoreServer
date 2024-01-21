//  MongoDB connection via mongoose
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

// TODO: change MongoDB DB/Collection
const uri = `mongodb+srv://mnrabbani:kztDSuHPEELfHBk4@myivi.xhjrir2.mongodb.net/onlineStore?retryWrites=true&w=majority`;

// Connect to Mongoose
const Main = async () => {
  //process.env.MONGODB_URI
  await mongoose
    .connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then((dbo) => {
      console.log("mongodb connected");
    })
    .catch(() => {
      console.log("Mongo.js: failed");
    });
};

Main().catch((err) => console.log(err));
