import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setAvatar, setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

export default function SetAvatar() {
    const api = 'https://api.multiavatar.com/4645646';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOption)
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app", JSON.stringify(user));
                navigate('/chat');
            } else {
                toast.error("Error setting avatar. Please try again", toastOption);
            }
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const avatarIds = [];
                for (let i = 0; i < 4; i++) {
                    avatarIds.push(Math.round(Math.random() * 1000));
                }
                const data = [];
                for (const id of avatarIds) {

                    const imageUrl = `https://api.multiavatar.com/${id}?apikey=r0dEJOnimgG3uy`;
                    const image = await axios.get(imageUrl);
                    const buffer = Buffer.from(image.data);
                    // const base64Image = buffer.toString('base64');
                    data.push(buffer.toString("base64"));

                    // data.push(image);
                }
                setAvatars(data);
                setIsLoading(false);

            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {
                isLoading ? <Container>
                    <img src={Loader} alt="loader" className='loader' />
                </Container> : (
                    <Container>

                        <div className='title-container'>
                            <h1>Pick an avatar as your profile picture</h1>

                        </div>
                        <div className='avatars'>
                            {avatars.map((avatar, index) => {
                                return (

                                    <div
                                        key={index}
                                        className={`avatar ${selectedAvatar === index ? "selected" : ""
                                            }`}
                                    >
                                        <img src={`data:image/svg+xml;base64,${avatar}`}
                                            alt="avatar"
                                            onClick={() => setSelectedAvatar(index)}
                                        />
                                    </div>

                                );
                            })}
                        </div>
                        <button className='submit-btn' onClick={setProfilePicture} >Set as Profie Picture</button>
                    </Container>
                )
            }
            <ToastContainer />
        </>
    );
}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap:3rem;
background-color: #131324;
height: 100vh;;
width: 100vw;
.loader{
    max-inline-size:100%;
}
.title-container{
    h1{
        color: white;
    }
}
.avatars{
    display:flex;
    gap:2rem;
    .avatar{
        border:0.4rem solid transparent;
        padding:0.4rem;
        border-radius: 5rem;
        display:flex;
        justify-content: center;
        align-items: center;
        transition: 0ms.5s ease-in-out;
        img{
            height: 6rem;
            cursor: pointer;

        }
    }
    .selected{
        border: 0.4rem solid #4e0eff;
    }
   
}
button{
        background-color: #997af0;
        color:white;
        padding: 1rem 2rem;
        border:none;
        font-weight: bold;
        cursor:pointer;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }

`;