import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import connectToMongoDB from "./app/config/db";

const main = async () => {
  const port = Number(config.port) || 5000;
  try {
    await connectToMongoDB();

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

main();
