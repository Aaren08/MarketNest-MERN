import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionToDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected successfully : ${connectionToDB.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // 1 means exit with failure, 0 for success.
  }
};
