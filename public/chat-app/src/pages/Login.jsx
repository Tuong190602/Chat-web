import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/LogoMess.png";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
       username:"", 
       password:"", 
    });
    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme:"dark",
    }
    useEffect(() => {
        if (localStorage.getItem('chat-app')) {
            navigate("/chat");
        }
    }, []);
    const handleSubmit =async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const {  username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg,toastOption)
            } else if (data.status === true) {
                localStorage.setItem('chat-app', JSON.stringify(data.user)); 
                console.log("user:",data.user)
                console.log("local:",localStorage.getItem('chat-app'))
                navigate("/chat");
            }

        }
    }
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        console.log("state",values);
    }
    const handleValidation = () => {
        const {  username, password } = values;
        if (password ==="") {
            toast.error(
                "Password must be required.",
                toastOption
            );
            return false;
        } else if (username === "") {
            toast.error(
                "username is required.",
                toastOption
            );
            return false;
        }
        return true;
    }
  return (
      <>
          <FormContainer>
              <form onSubmit={(event) => handleSubmit(event)}>
              <div className="brand">
                  <img src={Logo} />
                  <h1>SMERNCHAT</h1>
              </div>
        
              <input
                  type='text'
                  placeholder='username'
                  name="username"
                  onChange={(e)=>handleChange(e)
                  }
              />
              <input
                  type='password'
                  placeholder='Password'
                  name="password"
                  onChange={(e)=>handleChange(e)}
              />
                  
              <button type='submit'>Login</button>
              <span>
                  Don't have an account ? <Link to="/register">Register</Link>
                </span>
                  </form>
          </FormContainer>
          <ToastContainer />
      </>
  )
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display:flex;
flex-direction:column;
justify-content: center;
gap: lrem;
align-items: center;
background-color: #131324;
.brand{
    display: flex;
    align-items: center;
    gap:lrem;
    justify-content: center;
    img{
        height: 5rem;
    }
    h1{
        color: white;
        text-transform: uppercase;
    }
}
form{
    display: flex;
    flex-direction: column;
    gap:2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 5rem;
    input{
        background-color: transparent;
        padding: 1rem;
        border:0,1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus{ 
            border:0.1rem solid #997af0;
            outline:none;
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
    span{
        color:white;
      //  text-transform: uppercase;
        a{
            color: #4e0eff;
            text-transform: none;
            font-weight: bold;
        }

    }
}

`;
export default Login
