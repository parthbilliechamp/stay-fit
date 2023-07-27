const usersController = require("../controllers/usersController");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "App running successfully!!" });
});

router.get("/food-database", (req, res) => {
  usersController.getFoodDatabase(req, res);
});

router.post("/user/add-meal", (req, res) => {
  usersController.addMeal(req, res);
});

router.post("/user/addUpdateWorkout", (req, res) => {
  usersController.addUpdateUserWorkout(req, res);
});

router.get("/user/getUserWorkout/:userId", (req, res) => {
  usersController.getUserWorkout(req, res);
});

router.get("/get-daily-macros-count/user/:email/:date", (req, res) => {
  usersController.getDailyMacrosCountForUser(req, res);
});

module.exports = router;
