import "./style/Message.css";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Message(props) {
    const navi = useNavigate();
    const userId = sessionStorage.getItem("userId");
    const [chatRoomList, setChatRoomList] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [receiverId, setReceiverId] = useState("");

    useEffect(()=>{
        console.log("userId",userId);
        if (userId) {
            axios
                .get(`/api/message/getallchatrooms`, {
                        params: { loginUser: userId }  // 쿼리 파라미터로 loginId 전달
                    })
                    .then((res) => {
                        setChatRoomList(res.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching chatRoomList", error);
                    });
                }
    },[userId]);



    const getMessage = (userTwoId) =>{
        axios
            .get(`/api/message/getmessage`,{
                params: {participant1: userId, participant2: userTwoId}
            })
            .then((res) => {
                setChatMessages(res.data);
                setReceiverId(userTwoId);
                setMessage('');
            })
            .catch((error) => {
            console.error("Error fetching chatMessage", error);
        });
    }

    const chatSubmit = (e) => {
        e.preventDefault();
        const messageDto = {
            senderId : sessionStorage.getItem("userId"),
            receiverId: receiverId,
            messageText: message
        };

        console.log("Sending message: ", sessionStorage.getItem("userId"));
        console.log("Sending message: ", receiverId);
        console.log("Sending message: ", message);

        axios
            .post("/api/message/sendmessage", messageDto)
            .then((response) => {
                console.log("Post updated successfully:", response.data);
                console.log(response.data);
                getMessage(receiverId);
            })
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    };

    return(
        <div className="message">

            <div className="message-header">
                <div className="message-header-logo">
                    <img className="message-header-logo-image" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/mypage_assets/header-icon.svg'}/>
                </div>

                <div className="message-header-mypagebtn" onClick={()=>navi("/board")}>
                    <button className="message-header-mypagebtn-btn">Dashboard</button>
                </div>
                <div className="message-header-logoutbtn">
                    <button className="message-header-logoutbtn-btn">Log out</button>
                </div>
            </div>

            <div className="message-body">

                <div className="message-body-messagebox" style={{cursor:'pointer'}}>
                    {/*<div className="message-body-messagebox-message">*/}
                    {/*    <div className="message-body-messagebox-message-id">IDExample</div>*/}
                    {/*    <div className="message-body-messagebox-message-preview">This is message Preview Example ...</div>*/}
                    {/*</div>*/}

                    {chatRoomList && chatRoomList.map((conversation, index) => (
                        <div className="message-body-messagebox-message" style={{cursor: 'pointer'}} onClick={()=> getMessage(conversation.userTwoId)}>
                                <div className="message-body-messagebox-message-id">{conversation.userTwoId}</div>
                                <div className="message-body-messagebox-message-preview">Click
                                </div>
                        </div>
                    ))}
                </div>


                <div className="message-body-messageroom">
                    {/*<div className="message-body-messageroom-content">*/}
                    {/*    userId : Message*/}
                    {/*</div>*/}

                    {chatMessages && chatMessages.map((message, index) => (
                        <div className="message-body-messageroom-content" >
                            {message.senderId} : {message.messageText}
                        </div>
                    ))}

                </div>

                <div className="message-body-messagepost">
                    <div>
                        <input className="message-body-messagepost-message" type="text" placeholder="message"
                               value={message} onChange={(e) => setMessage(e.target.value)}></input>

                    </div>

                    <button className="message-body-messagepost-button" onClick={chatSubmit}>Send</button>
                </div>

            </div>


        </div>

    );
}

export default Message;