"use client"

import './page.css'

const LoginPage = () => {
    return (
        <div className="login-Inner">
            <h1>Login</h1>
            <div className="input-inner">
                <span>AccountId</span>
                <input type="text" placeholder="AccountId"/>
            </div>

            <div className="input-inner">
                <span>PassWord</span>
                <input type="password" placeholder="Password"/>
            </div>

            <div className="loginSaveBtn">
                <div>
                    <label><input type="checkbox"/><span>아이디 저장</span></label>
                    <a href="#">ID/PW 찾기</a>
                </div>
            </div>
            <div className="loginBtn">
                <button>Login</button>
            </div>
        </div>
    )
}

export default LoginPage