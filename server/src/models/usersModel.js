const mongoose = require("mongoose");
const { response } = require("../../app");
const ObjectId = mongoose.Types.ObjectId;

// defining schema for the food-database collection
const foodDatabasesSchema = new mongoose.Schema({
  food: { type: String, required: true },
  protein: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  fat: { type: Number, required: true },
  calories: { type: Number, required: true },
});

const userMealsSchema = new mongoose.Schema({
  user_email: { type: String, required: true },
  user_daily_meals: [
    {
      log_date: { type: String, required: true },
      meals_list: [
        {
          meal_type: { type: String, required: true },
          food_items: [
            {
              food: { type: String, required: true },
              protein: { type: Number, required: true },
              carbohydrates: { type: Number, required: true },
              fat: { type: Number, required: true },
              calories: { type: Number, required: true },
            },
          ],
        },
      ],
    },
  ],
});

const userWorkoutSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
  },
  { strict: false }
);

const foodDatabases = mongoose.model("food_databases", foodDatabasesSchema);
const userMeals = mongoose.model("user_meals", userMealsSchema);
const UserWorkout = mongoose.model("user_workouts", userWorkoutSchema);

exports.getFoodDatabase = async () => {
  try {
    const foodItems = await foodDatabases.find({});
    console.log(foodItems);
    return foodItems;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.addMeal = async (mealData) => {
  const { user_email, log_date, meal_type, food_items } = mealData;

  try {
    let existingUserMeals = await userMeals.findOne({ user_email });

    if (!existingUserMeals) {
      existingUserMeals = new userMeals({
        user_email,
        user_daily_meals: [
          {
            log_date: log_date,
            meals_list: [{ meal_type: meal_type, food_items: food_items }],
          },
        ],
      });
    } else {
      const existingLogDate = existingUserMeals.user_daily_meals.find(
        (dailyMeal) => dailyMeal.log_date === log_date
      );

      if (!existingLogDate) {
        existingUserMeals.user_daily_meals.push({
          log_date: log_date,
          meals_list: [{ meal_type: meal_type, food_items: food_items }],
        });
      } else {
        existingLogDate.meals_list.push({
          meal_type: meal_type,
          food_items: food_items,
        });
      }
    }
    await existingUserMeals.save();
    return existingUserMeals;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getDailyMacrosCountForUser = async (email, date) => {
  try {
    const userMealsDoc = await userMeals.findOne({ user_email: email });

    if (!userMealsDoc) {
      return {};
    }

    const dailyMealRecord = userMealsDoc.user_daily_meals.find(
      (dailyMeal) => dailyMeal.log_date === date
    );

    if (!dailyMealRecord) {
      return {};
    }

    let aggregatedStats = {
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      calories: 0,
    };

    for (const meal of dailyMealRecord.meals_list) {
      for (const foodItem of meal.food_items) {
        aggregatedStats.protein += foodItem.protein;
        aggregatedStats.carbohydrates += foodItem.carbohydrates;
        aggregatedStats.fat += foodItem.fat;
        aggregatedStats.calories += foodItem.calories;
      }
    }
    return aggregatedStats;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.addUpdateUserWorkout = async (workoutData) => {
  try {
    const { userId, ...rest } = workoutData;
    if (!userId || !rest) {
      return {};
    }
    await UserWorkout.findByIdAndUpdate({ _id: userId.toString() }, rest, {
      upsert: true,
    });

    return "success";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getUserWorkout = async (userId) => {
  try {
    if (!userId) {
      return {};
    }
    const userWorkoutDoc = await UserWorkout.findById(userId);
    if (!userWorkoutDoc) {
      return {};
    }
    return userWorkoutDoc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
