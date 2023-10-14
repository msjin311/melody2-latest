import './RegistrationForm.css';
import {useState} from "react"
import {event} from "next/dist/build/output/log";
import {BsCheck, BsX} from "react-icons/bs"

function RegistrationForm() {
    const [name, setName] = useState('');
    const [accountId, setAccountId] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [userHashtags, setUserHashtags] = useState('');

    //비밀번호 확인
    if(password && passwordConfirm !== ""){
        //비밀번호 불일치
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
            //비밀번호 일치
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

    const signupSubmit = async (event) => {
        //form에서 submit을 누를시 이벤트가 발생하기위한 함수
        event.preventDefault();
        //이벤트가 발생시에 페이지가 초기화되는것을 방지함

        //비밀번호 불일치시
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

        const user = {
            name,
            accountId,
            birthDate,
            email,
            gender,
            password,
            userHashtags
        };
        //submit클릭시 입력한 각 데이터를 user라는 객체로 저장함

        try {
            const response = await fetch("/api/user-accounts", {
                //fetch = 자바스크립트 함수로 웹에서 서버로 HTTP요청을 보내기위해 사용함
                //아래과정으로 만들어지는 Json데이터를 서버로 보낼것을 의미
                method: 'POST',
                //POST = HTTP요청을 보내는 형식중 하나로 생성을 의미함 위에서 만든 user객체를 아래과정으로 JSON형식으로 만들것을 의미
                headers: {//headers = 요청을 보낼때 그 요청에대한 정보
                    'Content-Type': 'application/json',
                    //Content-Type = headers에 종류중 하나
                    //application타입 / json문자열임을 의미
                },
                body: JSON.stringify(user),
                //stringify = 자바스크립트 메서드이며 객체나 값을 문자열로 변형함
                //위에서 객체로 감싼 user를 JSON형식으로 변형함
            });

            if(response.ok){ //위에 try, catch문이 정상적으로 (ok=200) 작동되었음
                console.log(user)
                alert("회원가입 완료")
            }
            else{ //위에 try, catch문이 정상적으로 작동되지않았음
                alert("회원가입 정보를 정확하게 입력해주세요.")
            }
        }
        catch (error){
            console.error("error : ", error);
            //콘솔창에 작동되지 않은 오류의 이유를 표시
        }
    };

    return(
        <div className="container">
            <section className="signUp">
                <div className="section-Inner">
                    <form className="signupform" onSubmit={signupSubmit}>
                        <h1>Sign Up</h1>
                        <div className="input-inner">
                            <span>AccountId</span>
                            <input type="text" onChange={(event)=> setAccountId(event.target.value)} required placeholder="AccountId" value={accountId}/>
                        </div>

                        <div className="input-inner">
                            <span>PassWord</span>
                            <label className="input-icon-inner" >
                                <input type="password" onChange={(event) => setPassword(event.target.value)} required placeholder="Password" value={password}/>
                            </label>
                        </div>

                        <div className="input-inner">
                            <span>ConfirmPassWord</span>
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

                        <div className="input-inner">
                            <span>Name</span>
                            <input type="text" onChange={(event) => setName(event.target.value)} required placeholder="Name" value={name}/>
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
                            <span>Email</span>
                            <input type="text" onChange={(event) => setEmail(event.target.value)} required placeholder="Email" value={email}/>
                        </div>

                        <div className="input-inner">
                            <span>HashTag</span>
                            <input type="text" onChange={(event) => setUserHashtags(event.target.value)} required placeholder="HashTag" value={userHashtags}/>
                        </div>

                        <input className="submitBtn" type="submit" value="Sign Up"/>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default RegistrationForm;
