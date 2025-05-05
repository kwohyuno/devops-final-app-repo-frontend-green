import "./style/Board.css";
import React, {useEffect, useState} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Board(props) {
    const navi = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [boardList,setBoardList] = useState([]);

    const handleClickOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleCreate = () => {
        navi("/board/form");
    };

    useEffect(()=>{
        console.log(sessionStorage.getItem("userId"));
        axios
            .get("/api/board")
            .then(res => {
                const sortedBoardList = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBoardList(sortedBoardList);
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);

    // 가상 데이터 예시
    const userData = {
        id: "username123",
        photo: "https://example.com/userphoto.jpg",
        name: "John Doe",
        email: "johndoe@example.com"
    };

    const handleLogout = () => {
        // 세션에서 사용자 정보 삭제
        sessionStorage.removeItem("userId");

        // 로그인 페이지로 리다이렉트
        navi("/login");
    };

    const sendMessage = (receiverId) =>{
        const participant1 = sessionStorage.getItem("userId");
        const participant2 = receiverId;
        console.log("Participant1:", participant1); // 세션에 저장된 사용자 ID
        console.log("Participant2:", participant2); // 메시지 수신자의 ID

        axios
            .post("/api/message/startconverse", {
                participant1: participant1,
                participant2: participant2


            })
            .then((response) => {
                navi("/message");
            })
            .catch((error) => {
                console.error("Error creating post:", error);
            });
    };

    return (
        <div className="board">
            <div className="board-header">

                <div className="board-header-logo">
                    <img className="board-header-logo-image" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/header-icon.svg'}/>
                </div>
                {/*<div className="board-header-searchbar">*/}
                {/*    <img className="board-header-searchbar-icon" alt=""*/}
                {/*         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/searchicon.svg'}/>*/}
                {/*    <input className="board-header-searchbar-input" type="text" placeholder="Search posts"/>*/}
                {/*</div>*/}
                <div className="board-header-posticon">
                    <button className="board-header-posticon-btn" onClick={handleCreate}>+ Create</button>
                </div>
                <div className="board-header-chaticon">
                    <img className="board-header-chaticon" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/chaticon.svg'}
                         style={{cursor: 'pointer'}} onClick={() => navi("/message")}/>

                </div>
                <div className="board-header-mypagebtn">
                    <button className="board-header-mypagebtn-btn" onClick={()=>navi("/mypage")}>My Page</button>
                </div>
                <div className="board-header-logoutbtn">
                    <button className="board-header-logoutbtn-btn" onClick={handleLogout}>Log out</button>
                </div>

            </div>


            <div className="board-body">
                {boardList.map((board, index) => (
                    <div key={index} className="board-body-box"
                         style={{cursor: 'pointer'}}>
                        <div className="board-body-box-post">
                            <div className="board-body-box-profile">

                                <div className="board-body-box-profile-id" onClick={() => sendMessage(board.authorId)}
                                     style={{cursor: 'pointer'}}>
                                    {board.authorId}
                                    <div className="board-body-box-profile-message-popup" >
                                        Send Message
                                    </div>
                                </div>
                                <div className="board-body-box-profile-writtendate">{board.createdAt}</div>
                            </div>

                            <div className="board-body-box-subject" onClick={() => navi(`/board/detail/${board.id}`)}>
                                {board.title}
                            </div>
                            <div className="board-body-box-contents" onClick={() => navi(`/board/detail/${board.id}`)}>
                                {board.content}
                            </div>
                        </div>
                    </div>
                ))}

                {/* 프로필 정보 다이얼로그 */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{selectedUser?.name}</DialogTitle>
                    <DialogContent>
                        <img src={selectedUser?.photo} alt={selectedUser?.name}
                             style={{width: '100px', height: '100px'}}/>
                        <p>{selectedUser?.email}</p>
                        <p>{selectedUser?.id}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Board;