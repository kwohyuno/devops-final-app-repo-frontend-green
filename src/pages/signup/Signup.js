import "./style/Signup.css";
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Signup(props) {
    const navi = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        const dto={
            userId:id,
            password:password,
            email:email,
        };
        axios
            .post("/api2/members/create", dto)
            .then(()=>{
                // console.log(dto);
                sessionStorage.setItem("userId", id);
                navi("/login");
            })
            .catch((error)=>{
                console.log(error);
            });

    };





    return(
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <div className="signup-header">
                    <div className="signup-header-logo">
                        <img className="signup-header-logo-image" alt=""
                             src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/mypage_assets/header-icon.svg'}/>
                    </div>
                </div>

                <div className="signup-body">

                    <div className="signup-body-id">
                        <input className="signup-body-id-input" type="text" placeholder="Id" value={id}
                               onChange={(e) => setId(e.target.value)}/>
                    </div>

                    <div className="signup-body-password">
                        <input className="signup-body-password-input" type="password" placeholder="Password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="signup-body-email">
                        <input className="signup-body-email-input" type="text" placeholder="Email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="signup-body-btn">
                        <button className="signup-body-btn-submitbtn" type="submit">Submit</button>

                    </div>

                </div>
            </form>
        </div>

)
    ;

}

export default Signup;