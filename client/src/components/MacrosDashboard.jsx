import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import styled from "styled-components";
import Navbar from "./Navbar";
import userStore from "../store/Userstore";

const MacroDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [macrosData, setMacrosData] = useState(null);
  const email = userStore((state) => state.email);

  useEffect(() => {
    const fetchDailyMacrosCount = () => {
      const date = format(addDays(new Date(selectedDate), 1), "dd MMMM yyyy");
      const backendURL = `http://localhost:3001/get-daily-macros-count/user/${email}/${date}`;

      fetch(backendURL)
        .then((response) => response.json())
        .then((data) => {
          setMacrosData(data.response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchDailyMacrosCount();
  }, [selectedDate]);

  const renderCharts = () => {
    if (!macrosData) {
      return <div>Loading...</div>;
    }

    const chartData = {
      labels: ["Protein", "Carbohydrates", "Fat", "Calories"],
      datasets: [
        {
          label: "Macros Count",
          data: [
            macrosData.protein,
            macrosData.carbohydrates,
            macrosData.fat,
            macrosData.calories,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(53, 162, 235, 0.5)",
            "rgba(53, 192, 225, 0.5)",
            "rgba(205, 59, 162, 0.5)",
          ],
        },
      ],
    };

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "",
        },
      },
    };

    return (
      <div>
        <div className="chart-container">
          <Bar options={options} data={chartData} />
        </div>

        <div className="macros-info">
          <div>Protein: {macrosData.protein}g</div>
          <div>Carbohydrates: {macrosData.carbohydrates}g</div>
          <div>Fat: {macrosData.fat}g</div>
          <div>Calories: {macrosData.calories} kcal</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <StyledMacroDashboard className="macro-dashboard-container">
        <h2>Macro Dashboard</h2>
        <div className="date-picker">
          <label htmlFor="selectedDate">Select Date: </label>
          <input
            type="date"
            id="selectedDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        {renderCharts()}
      </StyledMacroDashboard>
    </>
  );
};

const StyledMacroDashboard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin: 10rem auto;
  box-shadow: 5px 5px 10px 2px rgb(13, 36, 68);
  border: thin solid rgb(204, 204, 204);
  background: rgb(4, 13, 25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
    font-size: 2rem;
    margin-bottom: 5rem;
    text-align: center;
  }
  .date-picker {
    /* margin-bottom: 20px; */
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.4rem;
    label {
      flex-basis: 40%;
      font-size: 1.6rem;
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

  .chart-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .macros-info {
    margin-top: 2rem;
    width: 100%;
    font-size: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;
    div {
      border: 1px solid white;
      border-radius: 10px;
      padding: 1rem;
    }
  }
`;

export default MacroDashboard;
