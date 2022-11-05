const mongoose = require("mongoose");
require("dotenv").config();

const conn_str =
  process.env.DB_HOST +
  "://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@newcluster.ngbf70u.mongodb.net/project?retryWrites=true&w=majority";

mongoose.connect(
  conn_str,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      console.log("error in connection");
    } else {
      console.log("mongodb is connected");
    }
  }
);