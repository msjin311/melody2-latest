"use client"

import "./UserEditPage.css";
import {useState, useContext, useRef} from "react";
import {BsCheck, BsX} from "react-icons/bs";
import {UserContext} from "../../contexts/UserContext";

const UserEditPage = () => {
    const { userState, userDispatch } = useContext(UserContext);
    const profileImageRef = useRef();


    const accountId = userState.user.accountId;
    const [name, setName] = useState(userState.user.name);
    const [birthDate, setBirthDate] = useState(userState.user.birthDate);
    const [email, setEmail] = useState(userState.user.email);
    const [gender, setGender] = useState(userState.user.gender);
    const [oldpassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [userHashtags, setUserHashtags] = useState(userState.user.userHashtags);
    const [profileImage, setProfileImage] = useState('');

    const userEdit = {
        accountId,
        name,
        birthDate,
        email,
        gender,
        password,
        userHashtags,
        profileImage
    };

    //회원정보 수정기능
    const handleEdit =async () => {
        //비밀번호 공백일시
        if(password === '' || password === null) {
            alert('비밀번호를 입력하세요.')
            return;
        }

        //기존 비밀번호 불일치시
        if(userState.user.password !== oldpassword){
            alert('기존 비밀번호가 불일치 합니다.')
            const oldInput = document.querySelectorAll(".old-input");
            oldInput.forEach((inputBox) => {
                inputBox.classList.add("on");
            });
            return;
        }else{
            const oldInput = document.querySelectorAll(".old-input");
            oldInput.forEach((inputBox) => {
                inputBox.classList.remove("on");
            });
            //비밀번호 불일치시 input
            if(password !== passwordConfirm) {
                const checkInput = document.querySelectorAll(".check-input");
                checkInput.forEach((inputBox) => {
                    inputBox.classList.add("on");
                });
                return;
            }else{
                const checkInput = document.querySelectorAll(".check-input");
                checkInput.forEach((inputBox) => {
                    inputBox.classList.remove("on");
                });
            }
        }

        try{
            const response = await fetch(`api/user-accounts/${userState.user.userAccountId}`, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(userEdit),
            });

            if (response.ok) {
                const userData= await response.json();
                console.log(userData);
                alert("데이터가 정상적으로 수정되었습니다.")
            }else {
                console.error('Edit Failed')
                console.log(userState.user)
                alert("데이터 수정에 실패했습니다.")
            }
        }catch (error) {
            console.error('error : ', error);
        }
    }

    //비밀번호 확인
    if(password && passwordConfirm !== ""){
        //비밀번호 불일치 input Icon
        if(password !== passwordConfirm) {
            const inputCheckIcons = document.querySelectorAll(".input-check-icon");
            inputCheckIcons.forEach((icon) => {
                icon.classList.add("show");
            });
            const iconX = document.querySelectorAll(".bsicon-x");
            iconX.forEach((xIcon) => {
                xIcon.classList.add("on");
            });
            const iconCheck = document.querySelectorAll(".bsicon-check");
            iconCheck.forEach((checkIcon) => {
                checkIcon.classList.remove("on");
            });
        }else {
            //비밀번호 일치시  input Icon
            const checkInput = document.querySelectorAll(".check-input");
            checkInput.forEach((inputBox) => {
                inputBox.classList.remove("on");
            });
            const iconX = document.querySelectorAll(".bsicon-x");
            iconX.forEach((xIcon) => {
                xIcon.classList.remove("on");
            });
            const iconCheck = document.querySelectorAll(".bsicon-check");
            iconCheck.forEach((checkIcon) => {
                checkIcon.classList.add("on");
            });
        }
    }else {
        //비밀번호 칸이 비어있을경우
        const inputCheckIcons = document.querySelectorAll(".input-check-icon");
        inputCheckIcons.forEach((icon) => {
            icon.classList.remove("show");
        });
        const iconX = document.querySelectorAll(".bsicon-x");
        iconX.forEach((xIcon) => {
            xIcon.classList.remove("on");
        });
        const iconCheck = document.querySelectorAll(".bsicon-check");
        iconCheck.forEach((checkIcon) => {
            checkIcon.classList.remove("on");
        });
    }

    //프로필 이미지 미리보기
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        console.log(imageUrl)
        console.log(file)
    }
    //프로필 기본이미지
    const handleDefaultImageChange = () => {
        setProfileImage('')
        console.log(setProfileImage)
    }


    //회원탈퇴기능
    const handledelete =async () => {
        if (confirm("정말 탈퇴 하시겠습니까?") === true) {
            console.log(userDispatch)
            const userDelete = { ...userState.user,  isWithdraw: 1 };


            try {
                const response = await fetch(`api/user-accounts/${userState.user.userAccountId}`, {
                    method: 'PUT',
                    headers: {
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify(userDelete),
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData);
                    console.log(userDelete);
                    userDispatch({ type: 'LOGOUT' });
                    alert("회원 탈퇴가 완료되었습니다.")
                    window.location.href = '/login';
                } else {
                    console.error('Edit Failed')
                    console.log(userState.user)
                    alert("데이터 수정에 실패했습니다.")
                }
            } catch (error) {
                console.error('error : ', error);
            }
        }
    }

    return (
        <div className="userEditPage-Inner">
            <h1>User Edit Page</h1>
            <div className="onEditInputs-Inner">
                <div className="onEditInputs">
                    {/* AccountId */}
                    <div className="input-inner">
                        <span>AccountId</span>
                        <div className="accountIdInput-inner">{userState.user.accountId}</div>
                    </div>

                    {/* Name */}
                    <div className="input-inner">
                        <span>Name</span>
                        <input type="text" onChange={(event) => setName(event.target.value)} required placeholder="Name" value={name}/>
                    </div>

                    {/* Current PassWord */}
                    <div className="input-inner">
                        <span>Current PassWord</span>
                        <label className="input-icon-inner" >
                            <input type="password" className="old-input" onChange={(event) => setOldPassword(event.target.value)} required placeholder="Current PassWord" value={oldpassword}/>
                        </label>
                    </div>

                    {/* New PassWord */}
                    <div className="input-inner">
                        <span>New PassWord</span>
                        <label className="input-icon-inner" >
                            <input type="password" onChange={(event) => setPassword(event.target.value)} required placeholder="New PassWord" value={password}/>
                        </label>
                    </div>

                    {/* New PassWord Confirmation */}
                    <div className="input-inner">
                        <span>New PassWord Confirmation</span>
                        <label className="input-icon-inner" >
                            <input type="password" className="check-input" onChange={(event) => setPasswordConfirm(event.target.value)} required placeholder="New PassWord Confirmation" value={passwordConfirm}/>
                            <span className="input-check-icon">
                        <BsCheck className="bsicon bsicon-check"/>
                        </span>
                            <span className="input-check-icon">
                        <BsX className="bsicon bsicon-x"/>
                        </span>
                        </label>
                    </div>
                </div>

                {/* ProfileImage */}
                <div className="onEditImage">
                    <div className="userProfileImage-Inner">
                        {profileImage ? (
                            <img
                                src={profileImage}
                            />
                        ) : (
                            <img
                                src="../../../public/images/default_profile_image.jpg"
                            />
                        )}
                    </div>
                    <div className="imageEditBtn">
                        <button onChange={handleDefaultImageChange}>기본이미지</button>
                        <label>
                            이미지선택
                            <input type="file" onChange={handleImageChange} accept="image/*" ref={profileImageRef}/>
                        </label>
                    </div>
                </div>
            </div>

            <div className="underEditInputs-Inner">
                <div className="underEditInputs">

                    {/* Email */}
                    <div className="input-inner">
                        <span>Email</span>
                        <input type="text" onChange={(event) => setEmail(event.target.value)} required placeholder="Email" value={email}/>
                    </div>

                    {/* BirthDate */}
                    <div className="input-inner">
                        <span>BirthDate</span>
                        <label name="BirthDate">
                            <input type="date" onChange={(event) => setBirthDate(event.target.value)} required name="BirthDate" placeholder="BirthDate" value={userState.user.birthDate}/>
                        </label>
                    </div>

                    {/* Gender */}
                    <div className="gender-Inner">
                        <span>Gender</span>
                        <div>
                            <label><input type="radio" onChange={(event) => setGender(event.target.value)} name="gender" value="Male"/><span>Male</span></label>
                            <label><input type="radio" onChange={(event) => setGender(event.target.value)} name="gender" value="Female"/><span>Female</span></label>
                        </div>
                    </div>

                    {/* HashTag */}
                    <div className="input-inner">
                        <span>HashTag</span>
                        <input type="text" onChange={(event) => setUserHashtags(event.target.value)} required placeholder="HashTag" value={userHashtags}/>
                    </div>

                    <div className="userEditBtns">
                        <button className="editBtn" onClick={handleEdit}>수정하기</button>
                        <button className="secessionBtn" onClick={handledelete}>회원탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEditPage;