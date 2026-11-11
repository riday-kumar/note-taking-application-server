import mongoose from "mongoose";
import config from ".";

const connectToMongoDB = async () => {
  await mongoose.connect(config.database_url);
  console.log("successfully connected to MongoDB!");
};

export default connectToMongoDB;
