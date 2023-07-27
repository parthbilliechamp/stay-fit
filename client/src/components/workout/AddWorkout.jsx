import React, { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Grid,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Navbar from "../Navbar";
import userStore from "../../store/Userstore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddWorkout() {
    
    const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const email = userStore((state) => state.email);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [workouts, setWorkouts] = useState([
    {
      muscleGroup: "",
      workoutName: "",
      totalSets: 0,
      totalReps: 0,
    },
  ]);

  const muscleGroups = ["Chest", "Back", "Legs", "Shoulders", "Arms"];

  const handleAddWorkout = () => {
    const newWorkout = {
      muscleGroup: "",
      workoutName: "",
      totalSets: 0,
      totalReps: 0,
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const handleRemoveWorkout = (index) => {
    if (workouts.length > 1) {
      const updatedWorkouts = [...workouts];
      updatedWorkouts.splice(index, 1);
      setWorkouts(updatedWorkouts);
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleWorkoutChange = (index, field, value) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][field] = value;
    setWorkouts(updatedWorkouts);
  };

  const handleSubmit = async () => {
    const data = {
      userId: email,
      [date]: [...workouts],
    };
    console.log(JSON.stringify(data));
    try {
      const resposne = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/user/addUpdateWorkout",
        data
      );
      console.log(resposne.data);

      navigate('/workouts');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={darkTheme}>
        <Container
          maxWidth="sm"
          style={{
            border: "thin solid rgb(204, 204, 204)",
            padding: "3rem",
            marginTop: "5rem",
            paddingBottom: "4rem",
            borderRadius: "20px",
            boxShadow: "5px 5px 10px 2px rgb(13, 36, 68)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            background: "rgb(4, 13, 25)",
          }}
        >
          <Box mt={3} textAlign="center">
            <Typography
              variant="h5"
              style={{ color: "white", fontSize: "2rem" }}
            >
              Add Workout
            </Typography>
            <Box my={2}>
              <input
                label="Date"
                type="date"
                value={date}
                onChange={handleDateChange}
                style={{
                  colorScheme: "dark",
                  flexBasis: "60%",
                  width: " 100%",
                  padding: "0.5rem",
                  outline: "none",
                  background: "transparent",
                  border: "1px solid white",
                  borderRadius: "10px",
                }}
              />
            </Box>
            {workouts.map((workout, index) => (
              <Box key={index} my={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Muscle Group"
                      fullWidth
                      value={workout.muscleGroup}
                      onChange={(e) =>
                        handleWorkoutChange(
                          index,
                          "muscleGroup",
                          e.target.value
                        )
                      }
                    >
                      {muscleGroups.map((group) => (
                        <MenuItem
                          key={group}
                          value={group}
                          style={{ fontSize: "1.4rem" }}
                        >
                          {group}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Workout Name"
                      fullWidth
                      value={workout.workoutName}
                      onChange={(e) =>
                        handleWorkoutChange(
                          index,
                          "workoutName",
                          e.target.value
                        )
                      }
                      style={{ fontSize: "1.4rem" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      label="Total Sets"
                      fullWidth
                      value={workout.totalSets}
                      onChange={(e) =>
                        handleWorkoutChange(
                          index,
                          "totalSets",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      label="Total Reps"
                      fullWidth
                      value={workout.totalReps}
                      onChange={(e) =>
                        handleWorkoutChange(
                          index,
                          "totalReps",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </Grid>
                </Grid>
                {workouts.length > 1 && (
                  <Box mt={1}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveWorkout(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
            <Container
              my={2}
              style={{
                display: "flex",
                padding: "0",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddWorkout}
                style={{
                  background: "rgb(145, 163, 251)",
                  border: "none",
                  padding: "1rem",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: "500",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                Add Workout
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{
                  background: "rgb(145, 163, 251)",
                  border: "none",
                  padding: "1rem",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: "500",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                Submit
              </Button>
            </Container>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
