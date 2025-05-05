import BoardForm from "./BoardForm";
import "./style/BoardUpdate.css";
import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";


function BoardUpdate(props) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navi = useNavigate();
    const location = useLocation();
    const board = location.state;

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            authorId : sessionStorage.getItem("userId"),
            title: title,
            content: body
        };

        // Send POST request to the /board/create endpoint
        axios
            .post(`/api/board/update/${board.id}`, postData)
            .then((response) => {
                console.log("Post created successfully:", response.data);
                console.log(response.data);
                // Navigate to the board detail page after successful post creation
                navi(`/board/detail/${board.id}`);
            })
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    };

    useEffect(() => {
        if (board) {
            setTitle(board.title);
            setBody(board.content);
        }
    }, [board]);

    return (
        <div className="boardupdate">
            <div className="boardupdate-header">
                <div className="boardupdate-header-logo">
                    <img className="boardupdate-header-logo-image" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/header-icon.svg'}/>
                </div>
                <div className="boardupdate-header-searchbar">
                    <img className="boardupdate-header-searchbar-icon" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/searchicon.svg'}/>
                    <input className="boardupdate-header-searchbar-input" type="text" placeholder="Search posts"/>
                </div>
                <div className="boardupdate-header-posticon">
                    <button className="boardupdate-header-posticon-btn">+ Create</button>
                </div>
                <div className="boardupdate-header-chaticon">
                    <img className="boardupdate-header-chaticon" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/chaticon.svg'}
                         style={{cursor: 'pointer'}}/>

                </div>
                <div className="boardupdate-header-mypagebtn">
                    <button className="boardupdate-header-mypagebtn-btn">My Page</button>
                </div>
                <div className="boardupdate-header-logoutbtn">
                    <button className="boardupdate-header-logoutbtn-btn">Log out</button>
                </div>
            </div>


            <div className="boardupdate-body">
                <div className="boardupdate-body-title">
                    <input className="boardupdate-body-title-input" type="text" value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="boardupdate-body-body">
                    <input className="boardupdate-body-body-input" type="text" value={body}
                           onChange={(e) => setBody(e.target.value)}/>
                </div>

                <div className="boardupdate-body-btn">
                    <button className="boardupdate-body-btn-cancelbtn" onClick={() => navi("/board")}>Cancel</button>
                    <button className="boardupdate-body-btn-postbtn" onClick={handleSubmit}>Post</button>
                </div>
            </div>


        </div>
    );
}

export default BoardUpdate;




