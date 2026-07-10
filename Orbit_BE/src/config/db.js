import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Database Connected to ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
