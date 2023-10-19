import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.CONNECTION_STRING as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions // Cast to the appropriate type
    );
    console.log(
      "Database Connected:",
      connection.connection.host,
      connection.connection.name
    );
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

export default connectDb;
