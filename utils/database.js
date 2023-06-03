const { default: mongoose } = require("mongoose");

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", {
      dbName: "event-planner",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
