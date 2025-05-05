import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Board, BoardForm, BoardDetail, BoardUpdate} from "../pages/board";
import { Login } from "../pages/login";
import { Mypage } from "../pages/mypage";
import { Signup } from "../pages/signup";
import { Message } from "../pages/message";


function RouteMain(props) {

    return (
        <Routes>
            <Route>
                <Route path="/" element={<Login />} />
                <Route path="/board" element={<Board />} />
                <Route path="/board/form" element={<BoardForm />} />
                <Route path="/board/detail/:boardId" element={<BoardDetail />} />
                <Route path="/board/updateform/:boardId" element={<BoardUpdate />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/message" element={<Message />} />
            </Route>
        </Routes>
    );
}

export default RouteMain;