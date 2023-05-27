import React from 'react'
import Robot from "../assets/robot.gif";
import styled from 'styled-components';

export default function Welcome({ currentUser }) {
    if (!currentUser) {
        return null;
      }
    return (
        <Container>
            <img src={Robot} alt='Robot' />
            <h1>
              Welcome, <span>{currentUser.username}</span>
            </h1>
            <h3>Please selected a chat to start Messaging</h3>
        </Container>

          
    );
    
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white ;
    img{
        height: 20rem;
    }
    span{
        color: #4e00ff;
    }
`;
