import './RegistrationFormSelf.css';
import {useState} from "react"
import {event} from "next/dist/build/output/log";

 function RegistrationFormSelf() {
    const [accountId, setAccountId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    const signupSubmit = async (event) => {
        //form에서 submit을 누를시 이벤트가 발생하기위한 함수
        event.preventDefault();
        //이벤트가 발생시에 페이지가 초기화되는것을 방지함

        const user = {
            accountId,
            password,
            name,
            birthDate,
            gender,
            email
        }
        //submit클릭시 입력한 각 데이터를 user라는 객체로 저장함

        try {
            const response = await fetch("/api/user-accounts-self", {
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
                            AccountId
                            <input type="text" onChange={(event)=> setAccountId(event.target.value)} required placeholder="AccountId" value={accountId}/>
                        </div>

                        <div className="input-inner">
                            Password
                            <input type="password" onChange={(event) => setPassword(event.target.value)} required placeholder="Password" value={password}/>
                        </div>

                        <div className="input-inner">
                            ConfirmPassword
                            <input type="password" onChange={(event) => setConfirmPassword(event.target.value)} required placeholder="ConfirmPassword" value={confirmPassword}/>
                        </div>

                        <div className="input-inner">
                            Name
                            <input type="text" onChange={(event) => setName(event.target.value)} required placeholder="Name" value={name}/>
                        </div>

                        <div className="input-inner">
                            BirthDate
                            <label name="BirthDate">
                                <input type="date" onChange={(event) => setBirthDate(event.target.value)} required name="BirthDate" placeholder="BirthDate" value={birthDate}/>
                            </label>
                        </div>

                        <div className="gender-Inner">
                            Gender
                            <div>
                                <label><input type="radio" onChange={(event) => setGender(event.target.value)} name="gender" value={gender}/><span>Male</span></label>
                                <label><input type="radio" onChange={(event) => setGender(event.target.value)} name="gender" value={gender}/><span>Female</span></label>
                            </div>
                        </div>

                        <div className="input-inner">
                            Email
                            <input type="text" onChange={(event) => setEmail(event.target.value)} required placeholder="Email" value={email}/>
                        </div>

                        <input className="submitBtn" type="submit" value="Sign Up"/>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default RegistrationFormSelf;
