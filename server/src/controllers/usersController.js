const usersModel = require("../models/usersModel");

exports.getFoodDatabase = async (req, res) => {
  try {
    const foodItems = await usersModel.getFoodDatabase();
    res.json({ foodItems });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while fetching food items." });
  }
};

exports.addMeal = async (req, res) => {
  try {
    console.log("req in the controller" + req.body.user_email);
    const response = await usersModel.addMeal(req.body);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while adding meal." });
  }
};

exports.getDailyMacrosCountForUser = async (req, res) => {
  const email = req.params.email;
  const date = req.params.date;
  console.log(email + date);
  try {
    const response = await usersModel.getDailyMacrosCountForUser(email, date);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while adding meal." });
  }
};

exports.addUpdateUserWorkout = async (req, res) => {
  const workoutData = req.body;
  try {
    const response = await usersModel.addUpdateUserWorkout(workoutData);
    if (response === "success") {
      return res
        .status(200)
        .json({ message: "Successfully added/modified workout log" });
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error adding/updating workout" });
  }
};

exports.getUserWorkout = async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await usersModel.getUserWorkout(userId);
    if (!response) {
      return res.status(400).json({ error: "Bad Request" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error getting user workout details" });
  }
};
