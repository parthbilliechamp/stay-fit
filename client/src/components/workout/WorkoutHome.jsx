import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import userStore from "../../store/Userstore";

export default function WorkoutHome() {

  const email = userStore((state) => state.email);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/user/getUserWorkout/${email}`
      );
      console.log(response.data);
      delete response.data._id;
      delete response.data.__v;
      setUserData({ ...response.data });
    };
    getData();
  }, []);

  const navigate = useNavigate();

  const [expandedDate, setExpandedDate] = useState(null);

  const handleEdit = (date) => {
    const workoutData = { [date]: userData[date] };
    console.log(workoutData);
    navigate(`/edit/${date}`, { state: { workoutData: workoutData } });
  };

  if (!userData) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box mt={3} textAlign="center">
          <Typography variant="h5">
            Welcome to Your Workout Dashboard
          </Typography>
          <Box my={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/add"
              style={{
                background: "rgb(145, 163, 251)",
                border: "none",
                padding: "1rem",
                borderRadius: "10px",
                color: "white",
                fontWeight: "500",
                cursor: "pointer",
                fontSize: "1.4rem",
              }}
            >
              Add New Workout
            </Button>
          </Box>
          <Grid
            container
            spacing={2}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12} md={6}>
              {Object.keys(userData).map((date) => (
                <Accordion
                  key={date}
                  expanded={expandedDate === date}
                  onChange={() => setExpandedDate(date)}
                  style={{
                    fontSize: "1.4rem",
                    background: "rgb(4, 13, 25)",
                    color: "white",
                    border: "1px solid white",
                  }}
                >
                  <AccordionSummary>{date}</AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {userData[date] ? (
                        userData[date].map((workout, index) => (
                          <Grid item xs={12} key={index}>
                            <Box p={2} border="1px solid #ccc">
                              <Typography style={{ fontSize: "1.4rem" }}>
                                {workout.muscleGroup} - {workout.workoutName} -
                                Sets: {workout.totalSets} - Reps:{" "}
                                {workout.totalReps}
                              </Typography>
                            </Box>
                          </Grid>
                        ))
                      ) : (
                        <Grid item xs={12}>
                          <Typography>No workouts for this date.</Typography>
                        </Grid>
                      )}
                      <Box
                        mt={3}
                        ml={4}
                        style={{ display: "flex", gap: "1rem" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(date)}
                          style={{
                            background: "rgb(145, 163, 251)",
                            border: "none",
                            padding: "0.5rem",
                            borderRadius: "2px",
                            color: "white",
                            fontWeight: "500",
                            cursor: "pointer",
                            fontSize: "1.4rem",
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            color: "rgb(235, 0, 19)",
                            borderColor: "rgb(235, 0, 19)",
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
