import React, { useState, useEffect } from "react";
import "../assets/style/NutritionTracking.css";
import { format, addDays } from "date-fns";
import styled from "styled-components";
import Navbar from "./Navbar";
import userStore from "../store/Userstore";

const NutritionTracking = () => {
  const [mealType, setMealType] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoodItems, setSelectedFoodItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  console.log(selectedDate);
  const email = userStore((state) => state.email);

  useEffect(() => {
    fetch("http://localhost:3001/food-database")
      .then((response) => response.json())
      .then((data) => {
        setFoodItems(data.foodItems);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddFoodItem = () => {
    const selectedOption = document.getElementById("foodItem").value;
    const selectedFoodItem = foodItems.find(
      (foodItem) => foodItem.food === selectedOption
    );

    if (selectedFoodItem) {
      setSelectedFoodItems((prevSelectedFoodItems) => [
        ...prevSelectedFoodItems,
        selectedFoodItem,
      ]);
    }
  };

  const handleAddMeal = () => {
    const date = format(addDays(new Date(selectedDate), 1), "dd MMMM yyyy");
    console.log(date);
    const mealData = {
      user_email: email,
      log_date: date,
      meal_type: mealType,
      food_items: selectedFoodItems,
    };

    fetch("http://localhost:3001/user/add-meal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Meal added successfully!");
      })
      .catch((error) => {
        console.error("Error adding meal:", error);
      });
  };

  return (
    <>
      <Navbar />
      <StyledNutritionTracking className="nutrition-tracking-container">
        <div className="date-picker">
          <label htmlFor="selectedDate">Select Date: </label>
          <input
            type="date"
            id="selectedDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="meal-type-container">
          <label htmlFor="mealType">Select Meal Type:</label>
          <select
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <div className="food-database-container">
          <h3>Food Database</h3>
          <div className="add-food-item-container">
            <select id="foodItem">
              {foodItems.map((foodItem) => (
                <option key={foodItem.food} value={foodItem.food}>
                  {foodItem.food}
                </option>
              ))}
            </select>
            <button onClick={handleAddFoodItem}>Add Food Item</button>
          </div>
        </div>

        <div className="selected-food-items-container">
          <h3>Selected Food Items</h3>
          <ul>
            {selectedFoodItems.map((foodItem) => (
              <li key={foodItem.food}>{foodItem.food}</li>
            ))}
          </ul>
        </div>

        <button className="add-meal-button" onClick={handleAddMeal}>
          Add Meal
        </button>
      </StyledNutritionTracking>
    </>
  );
};

const StyledNutritionTracking = styled.div`
  margin: 10rem auto;
  box-shadow: 5px 5px 10px 2px rgb(13, 36, 68);
  border: thin solid rgb(204, 204, 204);
  background: rgb(4, 13, 25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .date-picker {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.4rem;
    label {
      flex-basis: 40%;
    }
    input {
      color-scheme: dark;
      flex-basis: 60%;
      width: 100%;
      padding: 0.5rem;
      outline: none;
      background: transparent;
      border: 1px solid white;
      border-radius: 10px;
    }
  }
  .meal-type-container {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.4rem;
    label {
      flex-basis: 40%;
    }
    select {
      flex-basis: 60%;
      width: 100%;
      padding: 0.5rem;
      outline: 1px solid white;
      background: transparent;
      color: white;
      border: 5px solid transparent;
      border-radius: 10px;
    }
  }
  .food-database-container {
    h3 {
      font-size: 1.4rem;
      font-weight: 400;
    }
    .add-food-item-container {
      display: flex;
      gap: 1rem;
      select {
        width: 100%;
        padding: 0.5rem;
        outline: 1px solid white;
        background: transparent;
        color: white;
        border: 5px solid transparent;
        border-radius: 10px;
      }
      button {
        background: rgb(145, 163, 251);
        border: none;
        padding: 1rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
  .selected-food-items-container {
    h3 {
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
  .add-meal-button {
    background: rgb(145, 163, 251);
    border: none;
    padding: 1rem;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    cursor: pointer;
  }
`;

export default NutritionTracking;
