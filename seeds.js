const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Course = require("./models/Course.js");
const MyCourses = require("./models/Mycourses.js");
const User = require("./models/User.js"); // Import the User model
require('dotenv').config();


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

  
const preprocessData = (data) => {
  return data.map((item) => {
    if (item._id && item._id.$oid) {
      item._id = item._id.$oid;
    }
    if (item.createdAt && item.createdAt.$date) {
      item.createdAt = new Date(item.createdAt.$date);
    }
    if (item.updatedAt && item.updatedAt.$date) {
      item.updatedAt = new Date(item.updatedAt.$date);
    }
    return item;
  });
};


const productFilePath = path.join(__dirname, "he.courses.json");
const rawProductData = fs.readFileSync(productFilePath, "utf-8");
const productsData = preprocessData(JSON.parse(rawProductData));

const mycoursesFilePath = path.join(__dirname, "he.mycourses.json");
const rawMycoursesData = fs.readFileSync(mycoursesFilePath, "utf-8");
const mycoursesData = preprocessData(JSON.parse(rawMycoursesData));


const userFilePath = path.join(__dirname, "he.users.json");  
const rawUserData = fs.readFileSync(userFilePath, "utf-8");
const usersData = preprocessData(JSON.parse(rawUserData));

// Seed the database
const seedDatabase = async () => {
  try {
    // Seed products
    await Course.deleteMany({}); // Remove existing documents
    await Course.insertMany(productsData); // Insert new documents

    await MyCourses.deleteMany({}); // Remove existing documents
    await MyCourses.insertMany(mycoursesData); // Insert new documents

    await User.deleteMany({}); // Remove existing documents
    await User.insertMany(usersData); // Insert new documents

    mongoose.connection.close();
  } catch (err) {
    console.error("Database seeding error:", err);
    mongoose.connection.close();
  }
};

seedDatabase();