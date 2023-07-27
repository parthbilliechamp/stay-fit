import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckUser from "./components/CheckUser";
import Home from "./components/Home";
import Login from "./components/Login";
import MacroDashboard from "./components/MacrosDashboard";
import NutritionTracking from "./components/NutritionTracking";
import RequireAuth from "./components/RequireAuth";
import Signup from "./components/Signup";
import AddWorkout from "./components/workout/AddWorkout";
import EditWorkout from "./components/workout/EditWorkout";
import WorkoutHome from "./components/workout/WorkoutHome";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <CheckUser>
                <Login />
              </CheckUser>
            }
          />
          <Route
            path="/signup"
            element={
              <CheckUser>
                <Signup />
              </CheckUser>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/add-meal"
            element={
              <RequireAuth>
                <NutritionTracking />
              </RequireAuth>
            }
          />
          <Route
            path="/macros-dashboard"
            element={
              <RequireAuth>
                <MacroDashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/add"
            element={
              <RequireAuth>
                <AddWorkout />
              </RequireAuth>
            }
          />
          <Route
            path="/edit/:date"
            element={
              <RequireAuth>
                <EditWorkout />
              </RequireAuth>
            }
          />
          <Route
            path="/workouts"
            element={
              <RequireAuth>
                <WorkoutHome />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
