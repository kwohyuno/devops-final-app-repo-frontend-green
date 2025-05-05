import "./style/Login.css";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function Login(props) {

    const navi = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    axios.defaults.withCredentials=true;


    const onSubmitEvent = (e)=>{
        e.preventDefault();
        const dto = {
          userId: id,
          password: password,
        };
        axios
            .post("/api/login", dto)
            .then((res)=>{
                // console.log(dto);

                if(res.data!=''){
                    // console.log(res);
                    // console.log(res.data);
                    console.log()
                    navi("/board");
                }else{
                    alert("Invalid username or password. Please try again.");
                }
                sessionStorage.setItem("userId", id);

                console.log(sessionStorage.getItem("userId"));
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    return (
        <div>
            <div className="login-green">Green Version</div>
            <form className="login-form" onSubmit={onSubmitEvent}>
                <div>
                    <img className="header-icon" alt=""
                         src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/login_assets/header-icon.svg'}/>
                </div>
                <div>
                    {/*<img className="login-image" alt=""*/}
                    {/*     src={'https://projectjakeassets.s3.ap-northeast-2.amazonaws.com/src/login_assets/login-image.svg'}/>*/}
                </div>

                <input
                    className="login-form-id"
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    className="login-form-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-form-button" type="submit">Login</button>

                <div className="login-form-signup" onClick={() => navi("/signup")} style={{ cursor: 'pointer' }}>
                    Sign-up
                </div>
            </form>
        </div>
    );
}

export default Login;


