import React, {useState} from 'react';
import styled from 'styled-components';
import Picker, { Emoji } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
export default function ChatInput({handleSendMsg}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const handleShowEmoji = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = ( emoji) => {
        console.log(emoji);
        let message = msg;
        message +=  emoji.emoji;
        setMsg(message);
    }
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleShowEmoji} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>{sendChat(e)}}>
                <input type='text' placeholder='Type your message here' value={msg} onChange={(e)=>{setMsg(e.target.value)}} />
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}
const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: #080420;
padding:0 2rem ;
padding-bottom: 0.3rem;
@media screen and (min-width:720px) and (max-width:1080px){
            padding: 0rem 1rem;
            gap:1rem;
            margin-bottom: 40px;
}
.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
        position: relative;
        svg{
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
        }
        .EmojiPickerReact{
            position: absolute;
            top: -450px;
            background-color: #080420;
            box-shadow: 0px 5px 10px #9a86f3;
            border-color: #9186f3;
            &::-webkit-scrollbar{
                background-color: #080420;
                width: 5px;
                &-thumb{
                    background-color: #9186f3 ;
                }
            }
            .epr-preview{
                height: 50px;
            }
            .emoji-categories{
                button{
                    filter: contrast(0);
                }
            }
            .emoji-search{
                background-color: transparent;
                border-color: #9186f3;
            }
            .emoji-group:before{
                background-color: #080420;
            }
            .epr-emoji-category-label{
                background-color: #080420;
                
            }
        }
    }
}
.input-container{
    width: 100%;
    border-radius: 2rem ;
    display: flex;
    align-content: center;
    gap:2rem;
    background-color: #ffffff34;
    input{
        padding-top: 10px;
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left:1rem ;
        font-size: 1.2rem;
        &::selection{
            background-color:#9186f3 ;
        }
        &:focus{
           outline: none;
             }

        }

    }
    button{
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        background-color: #9a86f3;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        margin-right: 1px;
        cursor: pointer;
        svg{
            font-size: 2rem;
            color: white;
        }
        @media screen and (min-width:720px) and (max-width:1080px){
            padding: 0,3rem 1rem;
            svg{
                font-size: 1rem;
            }
}
    }

`;
