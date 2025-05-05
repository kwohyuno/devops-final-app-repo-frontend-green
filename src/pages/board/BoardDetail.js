import "./style/BoardDetail.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"; // useParams import
import { Modal, Box, Typography, Button } from "@mui/material";


function BoardDetail(props) {
    const { boardId } = useParams();
    const [board,setBoard] = useState([]);
    const navi = useNavigate();
    const [open, setOpen] = useState(false); // 모달 상태
    const [translatedTitle, setTranslatedTitle] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [comment, setComment] = useState("");
    const [commentList,setCommentList] = useState([]);



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    useEffect(()=>{
        if (boardId) {
            axios
                .get(`/api/board/detail/${boardId}`)
                .then((res) => {
                    setBoard(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching board details:", error);
                });
        }
    },[]);

    const deleteBoard = (boardId) => {
        if (window.confirm("Are you sure you want to delete this board?")) {
            axios.delete(`/api/board/detail/${boardId}`)
                .then(() => {
                    navi(`/board`);  // 삭제 후 목록 페이지로 이동
                })
                .catch((error) => {
                    console.error("Error deleting board:", error);
                });
        }
    };

    const editBoard = (boardId) => {
        navi(`/board/updateform/${boardId}`,{ state: board });
    };

    const translateContent = (e) => {
        e.preventDefault();

        axios.post("/api/translate", {
            prompt: board.content,
        })
            .then((response) => {
                setTranslatedText(response.data.translatedText);
                console.log("번역된 텍스트는: " + response.data.translatedText);

                // 모달 열기
                handleOpen();
            })
            .catch((error) => {
                console.error('번역 중 오류 발생:', error);
            });
    }

    const handleLogout = () => {
        // 세션에서 사용자 정보 삭제
        sessionStorage.removeItem("userId");

        // 로그인 페이지로 리다이렉트
        navi("/login");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dto={
            postId: boardId,
            userId:sessionStorage.getItem("userId"),
            content: comment
        };
        axios
            .post("/api/comment/create", dto)
            .then(()=>{
                // console.log(dto);
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error);
            });

    };

    useEffect(()=>{
        axios
            .get(`/api/comment`, { params: { postId: boardId } })
            .then(res => {
                const sortedCommentList = res.data.sort((a, b) =>  new Date(a.createdAt) - new Date(b.createdAt));
                setCommentList(sortedCommentList);
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);

    const deleteComment = (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            axios.delete(`/api/comment/${commentId}`)
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error deleting board:", error);
                });
        }
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


    return(
        <div className="boarddetail">
            <div className="boarddetail-header">
                <div className="boarddetail-header-logo">
                    <img className="boarddetail-header-logo-image" alt="" src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/header-icon.svg'}/>
                </div>
                <div className="boarddetail-header-logoutbtn">
                    <button className="boarddetail-header-logoutbtn-btn" onClick={handleLogout}>Log out</button>
                </div>
            </div>


            <div className="boarddetail-body">
                <div className="boarddetail-body-box">
                    {/*<img className="boarddetail-body-box-profile-img" src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/board_assets/profileimg.svg'}/>*/}
                    <div className="boarddetail-body-box-profile-id"> {board.authorId}</div>
                    <div className="boarddetail-body-box-profile-writtentime">{board.createdAt}</div>

                    <div className="boarddetail-body-box-subject">{board.title}</div>
                    <div className="boarddetail-body-box-content">{board.content}
                    </div>

                    <div className="boarddetail-body-box-btnbox">

                        {board.authorId === sessionStorage.getItem("userId") ? (
                            <>
                                <div className="boarddetail-body-box-btnbox-delete" style={{cursor:'pointer'}} onClick={() => deleteBoard(boardId)}>Delete</div>
                                <div className="boarddetail-body-box-btnbox-edit" style={{cursor:'pointer'}} onClick={() => editBoard(boardId)}>Edit</div>
                            </>
                        ) : null}

                        <div className="boarddetail-body-box-btnbox-translate" style={{cursor:'pointer'}} onClick={translateContent}> Translate </div>
                        <div className="boarddetail-body-box-btnbox-dashboard" style={{cursor:'pointer'}} onClick={()=> navi("/board")}>  Dashboard &nbsp; &gt; </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input className="boarddetail-body-box-writecomment" type="text" placeholder="Write Comment" value={comment} onChange={(e) => setComment(e.target.value)}/>


                        <button className="boarddetail-body-box-postcomment" style={{cursor:'pointer'}}>Post</button>
                    </form>

                    <div className="boarddetail-body-box-commentbox">
                        <div className="boarddetail-body-box-commentbox-borderline">
                            <div className="boarddetail-body-box-commentbox-commentsign">comment</div>
                            <div className="boarddetail-body-box-commentbox-commentsignline"></div>
                        </div>


                        {commentList.map((comment, index) => (
                            <div className="boarddetail-body-box-commentbox-comments">
                                <div className="boarddetail-body-box-commentbox-comments-comment">
                                    <div className="boarddetail-body-box-commentbox-comments-comment-header">
                                        <div
                                            className="boarddetail-body-box-comments-comments-comment-header-id"
                                            onClick={() => sendMessage(comment.userId)}
                                            style={{ cursor: 'pointer' }}
                                            >

                                            {comment.userId}

                                            <div className="boarddetail-body-box-comments-comments-comment-header-id-popup">
                                                Send Message
                                            </div>

                                        </div>
                                        <div
                                            className="boarddetail-body-box-comments-comments-comment-header-writtentime">{comment.createdAt}
                                        </div>
                                    </div>
                                    <div className="boarddetail-body-box-commentbox-comments-comment-content">
                                        {comment.content}
                                    </div>

                                    {comment.userId === sessionStorage.getItem("userId") && (
                                        <div
                                            className="boarddetail-body-box-commentbox-comments-comment-deletebtn"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => deleteComment(comment.commentId)}
                                        >
                                            Delete
                                        </div>
                                    )}

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {/* 모달 */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2">
                    {/*{translatedTitle ? translatedTitle : "Translating..."}*/}
                        {translatedTitle}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {/*{translatedText ? translatedText : "Translating..."}*/}
                        {translatedText}
                    </Typography>
                    <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default BoardDetail;


