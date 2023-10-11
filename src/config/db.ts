import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://ioweb3:ioweb3123@serverlessinstance0.nad5ffl.mongodb.net/curiotory?retryWrites=true&w=majority",
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
