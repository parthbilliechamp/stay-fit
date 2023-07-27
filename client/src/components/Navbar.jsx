import React from "react";
import styled from "styled-components";
import userStore from "../store/Userstore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = userStore((state) => ({
    logout: state.logOut,
  }));

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleWorkouts = () => {
    navigate("/workouts");
  };

  const handleMacros = () => {
    navigate("/macros-dashboard");
  };

  const handleMeals = () => {
    navigate("/add-meal");
  };
  return (
    <StyledNavbar>
      <div className="nav-title" onClick={handleHome}>
        Stay Fit
      </div>
      <div className="nav-links">
        <div className="home" onClick={handleHome}>
          Home
        </div>
        <div className="workouts" onClick={handleWorkouts}>
          Workouts
        </div>
        <div className="macros" onClick={handleMacros}>
          Macros
        </div>
        <div className="meals" onClick={handleMeals}>
          Meals
        </div>
        <div className="logout" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: 5px 5px 10px 1px rgb(21, 33, 49);
  font-size: 1.7rem;
  position: sticky;
  align-items: center;
  .nav-title {
    cursor: pointer;
  }
  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
    div {
      cursor: pointer;
    }
    .logout {
      background: rgb(145, 163, 251);
      border: none;
      padding: 1rem;
      border-radius: 5px;
      color: white;
      font-weight: 400;
      cursor: pointer;
    }
  }
`;

export default Navbar;
