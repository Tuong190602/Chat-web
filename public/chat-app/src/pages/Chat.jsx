import axios from 'axios';
import React, { useState, useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import styled,{keyframes} from 'styled-components'
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import Logout from '../components/Logout';
import { io } from "socket.io-client";


export default function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUSer, setCurrentUser] = useState(undefined);
  const [currentUserUpdated, setCurrentUserUpdated] = useState(false);
  const [currentChat, setCureentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem('chat-app')) {
          navigate("/login");
        } else {
          const user = await JSON.parse(localStorage.getItem('chat-app'));
          setCurrentUser(user);
          setIsLoaded(true);
        }
      } catch (error) {
        console.log("Bug from chat: ", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (currentUSer) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUSer._id);
    }
  },[currentUSer])
  useEffect(() => {
    const fetchData = async () => {
      try {

        if (currentUSer) {
          if (currentUSer.isAvatarImageSet === false) {
            navigate("/setAvatar");
          }
          else {
              const data = await axios.get(`${allUsersRoute}/${currentUSer._id}`);
            setContacts(data.data);
            console.log("avatar:",currentUSer.isAvatarImageSet)
          }

        } 
        

      } catch (error) {
        console.log("Bug from chat", error);
      }
    };
    if (currentUSer !== undefined) {
      fetchData();
    }
  }, [currentUSer]);
  const handleChatChange = (chat) => {
    if (chat !== undefined) {
      setCureentChat(chat);
    }

  };

  return (
     <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUSer} changeChat={handleChatChange} />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUSer} />
        ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUSer}
              socket={socket}
            />
        )}
      </div>
      <div className="Logout">
      <Logout/>
      </div>
      <span className='transition'>You are using Chat App, this application is made and design by Tran Quoc Chung. Thank you!!</span>
      </Container>

  )
}
const moveAnimation = keyframes`
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(150%);
  }
`;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:1rem;
  background-color: #363656;
  position: relative;
  .container{
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and(min-width:720px) and (max-width:1080px){
      grid-template-columns: 35% 65%;
    }
  }
  .Logout{
    position: absolute;
    right: 40px;
    width: 10px;
    height: 20px;
    top: 15px;
  }
  .transition{
  white-space: nowrap;
  overflow: hidden;
  animation: ${moveAnimation} 10s linear infinite;
  font-size: 1.2rem;
  color: white;
  margin-top: 20px;
  font-weight: 300;
  }
`;


