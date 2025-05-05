import "./style/BoardForm.css";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function BoardForm(props) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navi = useNavigate();



    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            authorId : sessionStorage.getItem("userId"),
            title: title,
            content: body
        };

        // Send POST request to the /board/create endpoint
        axios
            .post("/api/board/create", postData)
            .then((response) => {
                console.log("Post updated successfully:", response.data);
                console.log(response.data);
                // Navigate to the board page after successful post creation
                navi(`/board/`);
            })
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    };

    return (
        <div className="boardform">
            <div className="boardform-header">
                <div className="boardform-header-logo">
                    <img className="boardform-header-logo-image" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/header-icon.svg'}/>
                </div>
                <div className="boardform-header-searchbar">
                    <img className="boardform-header-searchbar-icon" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/searchicon.svg'}/>
                    <input className="boardform-header-searchbar-input" type="text" placeholder="Search posts"/>
                </div>
                <div className="boardform-header-posticon">
                    <button className="boardform-header-posticon-btn">+ Create</button>
                </div>
                <div className="boardform-header-chaticon">
                    <img className="boardform-header-chaticon" alt="" src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/chaticon.svg'} style={{ cursor: 'pointer' }}/>

                </div>
                <div className="boardform-header-mypagebtn">
                    <button className="boardform-header-mypagebtn-btn">My Page</button>
                </div>
                <div className="boardform-header-logoutbtn">
                    <button className="boardform-header-logoutbtn-btn">Log out</button>
                </div>
            </div>


            <div className="boardform-body">
                <div className="bodyform-body-title">
                    <input className="board-body-title-input" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="bodyform-body-body">
                    <input className="board-body-body-input" type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)}/>
                </div>

                <div className="bodyform-body-btn">
                    <button className="boardform-body-btn-cancelbtn" onClick={() => navi("/board")}>Cancel</button>
                    <button className="boardform-body-btn-postbtn" onClick={handleSubmit}>Post</button>
                </div>
            </div>


        </div>
    );
}

export default BoardForm;