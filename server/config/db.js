// Import Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI stored in the .env file
    await mongoose.connect(process.env.MONGO_URI, {
      // Use the new URL parser to avoid deprecation warnings
      useNewUrlParser: true,
      // Use the new Server Discovery and Monitoring engine
      useUnifiedTopology: true,
    });

    // Log a success message when the connection is established
    console.log("✅ MongoDB Connected Successfully.");
  } catch (error) {
    // Log an error message if the connection fails
    console.error("❌ MongoDB Connection Error:", error.message);

    // Exit the process with failure (non-zero) status code
    // This is important for production — I don't want my app running without a DB
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other files (e.g., server.js)
module.exports = connectDB;
