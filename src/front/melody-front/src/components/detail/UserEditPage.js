"use client"

import "./UserEditPage.css";
import {useState} from "react";
import {BsCheck, BsX} from "react-icons/bs";

const UserEditPage = () => {
    const [name, setName] = useState('');
    const [accountId, setAccountId] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [userHashtags, setUserHashtags] = useState('');

    const user = {
        name,
        accountId,
        birthDate,
        email,
        gender,
        password,
        userHashtags
    };

    return (
        <div className="myPage-Inner">
            <div className="onEditInputs-Inner">
                <div className="onEditInputs">
                    <div className="input-inner accountIdInput-inner">
                        <span>AccountId</span>
                        <div>{accountId}</div>
                    </div>

                    <div className="input-inner">
                        <span>Name</span>
                        <input type="text" onChange={(event) => setName(event.target.value)} required placeholder="Name" value={name}/>
                    </div>

                    <div className="input-inner">
                        <span>Current PassWord</span>
                        <label className="input-icon-inner" >
                            <input type="password" onChange={(event) => setPassword(event.target.value)} required placeholder="Password" value={password}/>
                        </label>
                    </div>

                    <div className="input-inner">
                        <span>New PassWord</span>
                        <label className="input-icon-inner" >
                            <input type="password" onChange={(event) => setPassword(event.target.value)} required placeholder="Password" value={password}/>
                        </label>
                    </div>

                    <div className="input-inner">
                        <span>New PassWord Confirmation</span>
                        <label className="input-icon-inner" >
                            <input type="password" className="check-input" onChange={(event) => setPasswordConfirm(event.target.value)} required placeholder="ConfirmPassWord" value={passwordConfirm}/>
                            <span className="input-check-icon">
                        <BsCheck className="bsicon bsicon-check"/>
                        </span>
                            <span className="input-check-icon">
                        <BsX className="bsicon bsicon-x"/>
                        </span>
                        </label>
                    </div>
                </div>

                <div className="onEditImage">
                    <div className="userProfileImage-Inner"></div>
                    <div className="imageEditBtn">
                        <button>기본이미지</button>
                        <button>찾아보기</button>
                    </div>
                </div>
            </div>

            <div className="underEditInputs-Inner">
                <div className="underEditInputs">
                    <div className="input-inner">
                        <span>Email</span>
                        <input type="text" onChange={(event) => setEmail(event.target.value)} required placeholder="Email" value={email}/>
                    </div>

                    <div className="input-inner">
                        <span>BirthDate</span>
                        <label name="BirthDate">
                            <input type="date" onChange={(event) => setBirthDate(event.target.value)} required name="BirthDate" placeholder="BirthDate" value={birthDate}/>
                        </label>
                    </div>

                    <div className="gender-Inner">
                        <span>Gender</span>
                        <div>
                            <label><input type="radio" onChange={(event) => setGender(event.target.value)} name="gender" value="Male"/><span>Male</span></label>
                            <label><input type="radio" onChange={(event) => setGender(event.target.value)} name="gender" value="Female"/><span>Female</span></label>
                        </div>
                    </div>

                    <div className="input-inner">
                        <span>HashTag</span>
                        <input type="text" onChange={(event) => setUserHashtags(event.target.value)} required placeholder="HashTag" value={userHashtags}/>
                    </div>

                    <div className="userEditBtns">
                        <button className="editBtn">수정하기</button>
                        <button className="secessionBtn">회원탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEditPage;