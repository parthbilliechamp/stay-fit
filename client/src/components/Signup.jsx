import React, { useState } from "react";
import styled from "styled-components";
import userStore from "../store/Userstore";
import { Link, useNavigate } from "react-router-dom";

const Singup = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // store
  const { signup } = userStore((state) => ({
    signup: state.signup,
  }));

  const submitHandler = (event) => {
    event.preventDefault();
    signup(inputEmail, password)
      .then((data) => {
        console.log(data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputHandler = (event) => {
    if (event.target.name === "email") {
      setInputEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  return (
    <StyledSignup onSubmit={submitHandler}>
      <h3 className="signup-header">Signup</h3>
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={inputEmail}
          onChange={inputHandler}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={inputHandler}
        />
      </div>
      <Link className="login-link" to="/">
        <span className="first-half">Already have an account? </span>
        <span className="second-half">Login now.</span>
      </Link>
      <button type="submit">Submit</button>
    </StyledSignup>
  );
};

const StyledSignup = styled.form`
  width: 350px;
  margin: 5rem auto;
  border: thin solid rgb(204, 204, 204);
  padding: 3rem;
  padding-bottom: 4rem;
  border-radius: 20px;
  box-shadow: 5px 5px 10px 2px rgb(13, 36, 68);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: rgb(4, 13, 25);
  h3 {
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    label {
      font-size: 1.2rem;
    }
    input {
      border-radius: 10px;
      padding: 1rem 1.2rem;
      outline: none;
      border: none;
      background: rgb(7, 20, 38);
      color: white;
      border: 1px solid white;
      font-size: 1.4rem;
    }
  }
  .login-link {
    font-size: 1.2rem;
    color: var(--primary-color);
    text-decoration: none;

    .first-half {
      color: rgb(78, 78, 78);
    }
    .second-half {
      text-decoration: underline;
    }
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
`;

export default Singup;
