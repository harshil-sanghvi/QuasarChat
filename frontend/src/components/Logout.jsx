import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  // Handle the logout process
  const handleClick = async () => {
    try {
      const id = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )._id;

      // Make a request to the server to logout
      const response = await axios.get(`${logoutRoute}/${id}`);

      if (response.status === 200) {
        // Clear the local storage and navigate to the login page
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data); // Log the error details
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #60E1E0;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
