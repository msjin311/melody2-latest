"use client"

import "./UserEditPage.css";
import {useState, useContext, useRef, useEffect} from "react";
import {BsCheck, BsX} from "react-icons/bs";
import {UserContext} from "../../contexts/UserContext";

const UserEditPage = () => {
    const { userState, userDispatch } = useContext(UserContext);
    const profileImageRef = useRef();


    const [accountId, setAccountId] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [userHashtags, setUserHashtags] = useState('');

    useEffect(() => {
        // Once userState.user is available, populate accountId and other fields
        if (userState.user) {
            setAccountId(userState.user.accountId);
            setName(userState.user.name);
            setBirthDate(userState.user.birthDate);
            setEmail(userState.user.email);
            setGender(userState.user.gender);
            setUserHashtags(userState.user.userHashtags);
        }
    }, [userState.user]);


    const [oldpassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [profileImage, setProfileImage] = useState('');

    //비밀번호 공백 및 중복확인시 css 클래스 작업
    const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isOldPasswordMismatch, setIsOldPasswordMismatch] = useState(false);

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

    //비밀번호 중복확인 및 공백확인
    // useEffect(() => {
    //     // if (password && passwordConfirm !== "" || password && passwordConfirm !== null){
    //     //     if (password !== passwordConfirm) {
    //     //         setIsPasswordMismatch(true);
    //     //         setIsPasswordMatch(false);
    //     //     } else {
    //     //         setIsPasswordMismatch(false);
    //     //         setIsPasswordMatch(true);
    //     //     }
    //     // }
    // }, [password, passwordConfirm]);

    //기존 비밀번호 확인
    // useEffect(() => {
    //     // if (oldpassword !== '') {
    //     //     if (userState.user.password !== oldpassword) {
    //     //         setIsOldPasswordMismatch(true);
    //     //     } else {
    //     //         setIsOldPasswordMismatch(false);
    //     //     }
    //     // } else {
    //     //     setIsOldPasswordMismatch(false);
    //     // }
    // }, [oldpassword, userState.user.password]);

    //회원정보 수정기능
    const handleEdit =async () => {
        //비밀번호 공백일시
        if(password === '' || password === null) {
            alert('비밀번호를 입력하세요.')
            setIsPasswordMismatch(true);
            return;
        }

        //회원정보 수정시 변경할 비밀번호 2차확인
        if (password !== passwordConfirm) {
            alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
            setIsPasswordMismatch(true);
            setIsPasswordMatch(false);
            return;
        } else {
            setIsPasswordMismatch(false);
            setIsPasswordMatch(true);
        }

        //회원정보 수정시 기존 비밀번호 확인
        if (userState.user?.password !== oldpassword) {
            alert('기존 비밀번호를 정확히 입력해주세요.');
            setIsOldPasswordMismatch(true);
            return;
        }

        try{
            const response = await fetch(`api/user-accounts/${accountId}`, {
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


    //프로필 이미지 미리보기
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }else {
            return;
        }
    }
    //프로필 기본이미지
    const handleDefaultImageChange = (event) => {
        event.preventDefault();
        setProfileImage('');
        console.log(profileImage)
    }


    //회원탈퇴기능
    const handledelete =async () => {
        //기존 비밀번호 불일치시
        if(userState.user?.password !== oldpassword){
            alert('기존 비밀번호가 불일치 합니다.')
            setIsOldPasswordMismatch(true);
        }else{
            if (confirm("정말 탈퇴 하시겠습니까?") === true) {
                console.log(userDispatch)
                const userDelete = { ...userState.user,  isWithdraw: 1 };


                try {
                    const response = await fetch(`api/user-accounts/${accountId}`, {
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
    }

    return (
        <div className="userEditPage-Inner">
            <h1>User Edit Page</h1>
            <div className="onEditInputs-Inner">
                <div className="onEditInputs">
                    <div className="input-inner">
                        <span>AccountId</span>
                        <div className="accountIdInput-inner">{accountId}</div>
                    </div>

                    {/* Name */}
                    <div className="input-inner">
                        <span>Name</span>
                        <input type="text" onChange={(event) => setName(event.target.value)} required placeholder="Name" value={name}/>
                    </div>

                    {/* Current PassWord */}
                    <div className="input-inner">
                        <span>Current PassWord</span>
                        <input
                            type="password"
                            className={isOldPasswordMismatch ? "old-input on" : "old-input"}
                            onChange={(event) => setOldPassword(event.target.value)}
                            required
                            placeholder="Current PassWord"
                            value={oldpassword}
                        />
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
                            <input
                                type="password"
                                className={isPasswordMismatch ? "check-input on" : "check-input"}
                                onChange={(event) => setPasswordConfirm(event.target.value)}
                                required
                                placeholder="New PassWord Confirmation"
                                value={passwordConfirm}
                            />
                            <span className="input-check-icon">
                                <BsCheck
                                    className={isPasswordMatch ? "bsicon-check show" : "bsicon-check"}
                                />
                            </span>
                            <span className="input-check-icon">
                                <BsX
                                    className={isPasswordMismatch ? "bsicon-x show" : "bsicon-x"}
                                />
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
                                src='../../../public/images/default_profile_image.jpg'
                            />
                        )}
                    </div>
                    <div className="imageEditBtn">
                        <label>
                            이미지선택
                            <input type="file" onChange={handleImageChange} accept="image/*" ref={profileImageRef}/>
                        </label>
                        <button onClick={handleDefaultImageChange}>이미지삭제</button>
                    </div>
                </div>
            </div>

            <div className="underEditInputs-Inner">
                <div className="underEditInputs">

                    {/* Email */}
                    <div className="input-inner">
                        <span>Email</span>
                        <input type="Email" onChange={(event) => setEmail(event.target.value)} required placeholder="Email" value={email}/>
                    </div>

                    {/* BirthDate */}
                    <div className="input-inner">
                        <span>BirthDate</span>
                        <label name="BirthDate">
                            <input type="date" onChange={(event) => setBirthDate(event.target.value)} required name="BirthDate" placeholder="BirthDate" value={birthDate}/>
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