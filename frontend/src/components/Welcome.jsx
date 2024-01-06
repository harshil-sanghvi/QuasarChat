import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  // Fetch the username from local storage
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Get the username from local storage
        const storedUserData = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        // Set the username in the state
        if (storedUserData && storedUserData.username) {
          setUserName(storedUserData.username);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  border-radius: 0 1rem 1rem 0;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
