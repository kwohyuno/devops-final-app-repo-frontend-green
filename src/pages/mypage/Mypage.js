import "./style/Mypage.css";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";






function Mypage(props) {
    const loginId = sessionStorage.getItem("userId");
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navi = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const dto={
            userId:loginId,
            password:password,
            email:email,
        };
        axios
            .post("/api/members/update", dto)
            .then(()=>{
                // console.log(dto);
                navi("/board");
            })
            .catch((error)=>{
                console.log(error);
            });

    };

    return (
        <div className="mypage">
            <form onSubmit={handleSubmit}>
                <div className="mypage-header">

                    <div className="mypage-header-logo">
                        <img className="mypage-header-logo-image" alt=""
                             src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/mypage_assets/header-icon.svg'}/>
                    </div>


                    <div className="mypage-header-chaticon">
                        <img className="mypage-header-chaticon" alt=""
                             src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/mypage_assets/chaticon.svg'}
                             style={{cursor: 'pointer'}}/>
                    </div>

                    {/*<div className="mypage-header-profile">*/}
                    {/*    /!*<div className="mypage-header-profile-pic">*!/*/}
                    {/*    /!*    <img className="mypage-header-profile-pic-img" alt=""*!/*/}
                    {/*    /!*         style={{cursor: 'pointer'}}*!/*/}
                    {/*    /!*         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/mypage_assets/profileimg.svg'}/>*!/*/}
                    {/*    /!*    <div className="mypage-header-profile-pic-plusicon" style={{cursor: 'pointer'}}>+</div>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    <div className="mypage-header-profile-id"> Jake1234</div>*/}
                    {/*</div>*/}


                    <div className="mypage-header-mypagebtn">
                        <button className="mypage-header-mypagebtn-btn" onClick={() => navi("/board")}>Main Page
                        </button>
                    </div>
                    <div className="mypage-header-logoutbtn">
                        <button className="mypage-header-logoutbtn-btn">Log out</button>
                    </div>

                </div>

                <div className="mypage-body">
                    <div className="mypage-body-name">
                        <input className="mypage-body-name-input" type="text" placeholder={' '}
                               style={{color: 'black'}}/>
                        <span className="mypage-body-name-text" style={{color: 'black'}}>
                        {loginId}
                    </span>
                    </div>

                    <div className="mypage-body-state">
                        <input className="mypage-body-password-input" type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="mypage-body-college">
                        <input className="mypage-body-email-input" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    {/*<div className="mypage-body-age">*/}
                    {/*    <input className="mypage-body-age-input" type="text" placeholder="Age"/>*/}
                    {/*</div>*/}

                    {/*<div className="mypage-body-nationality">*/}
                    {/*    <input className="mypage-body-nationality-input" type="text" placeholder="Nationality"/>*/}
                    {/*</div>*/}


                    <div className="mypage-body-btn">
                        <button className="mypage-body-btn-submitbtn">Change Info</button>

                    </div>
                </div>

            </form>
        </div>
);
}

export default Mypage;