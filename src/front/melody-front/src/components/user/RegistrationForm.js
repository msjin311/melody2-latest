import './RegistrationForm.css';
import {useEffect, useState} from "react"
import {BsCheck, BsX} from "react-icons/bs"
import {data} from "autoprefixer";


function RegistrationForm() {
    const [name, setName] = useState('');
    const [accountId, setAccountId] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [userHashtags, setUserHashtags] = useState('');
    const [userAccountIdList, setUserAccountIdList] = useState([]);

    //아이디 공백 및 중복확인시 css 클래스 작업
    const [isAccountId, setIsAccountId] = useState(false);

    //아이디 중복확인
    useEffect(() => {
        // if (accountId !== "" || accountId !== null) {
        //     setIsAccountId(false);
        //     if (userNameList.includes(accountId)) {
        //         setIsAccountId(true);
        //     } else {
        //         setIsAccountId(false);
        //     }
        // } else {
        //     setIsAccountId(true);
        // }
    }, [userAccountIdList, accountId]);

    //비밀번호 공백 및 중복확인시 css 클래스 작업
    const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);

    //비밀번호 중복확인 및 공백확인
    useEffect(() => {
        // if (password && passwordConfirm !== "" || password && passwordConfirm !== null){
        //     if (password !== passwordConfirm) {
        //         setIsPasswordMismatch(true);
        //         setIsPasswordMatch(false);
        //     } else {
        //         setIsPasswordMismatch(false);
        //         setIsPasswordMatch(true);
        //     }
        // }
    }, [password, passwordConfirm]);

    //기존 유저 accounId목록 가져오기
    const getAllUserAccounts = async () => {
        try{
            const response = await fetch (`/api/user-accounts`);
            if(response.ok){
                const data = await response.json();
                const userAccountIds = await data.map(user => user.accountId);
                console.log(userAccountIds);
                setUserAccountIdList(userAccountIds);
            }else{
                return null;
            }
        }catch (error){
            console.log('error : ', error)
        }
    }
    //아이디 중복확인버튼
    const handleIdCheck = async (event) => {
        event.preventDefault();

        await getAllUserAccounts();
        if(accountId === "" || accountId === null){
            alert('사용할 ID를 입력해주세요.')
            setIsAccountId(true);
        }else if(userAccountIdList.includes(accountId)){
            alert('이미 사용중인 ID입니다.')
            setIsAccountId(true);
        }else{
            alert('사용 가능한 ID입니다.')
            setIsAccountId(false);
        }
    }

    //회원가입 버튼
    const signupSubmit = async (event) => {
        //이벤트가 발생시에 페이지가 초기화되는것을 방지함
        event.preventDefault();

        //아이디 중복체크
        if(accountId === "" || accountId === null){
            alert('사용할 ID를 입력해주세요.')
            setIsAccountId(true);
            return;
        }else if(userAccountIdList.includes(accountId)){
            alert('이미 사용중인 ID입니다.')
            setIsAccountId(true);
            return;
        }else{
            setIsAccountId(false);
        }

        //비밀번호 불일치시
        if(password !== passwordConfirm) {
            alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.')
            setIsPasswordMismatch(true)
            return;
        }else{
            setIsPasswordMismatch(false)
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
                window.location.href = '/';
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
        <div className="section-Inner">
            <form className="signupform" onSubmit={signupSubmit}>
                <h1>Sign Up</h1>

                {/* AccountId */}
                <div className="input-inner">
                    <span>AccountId</span>
                    <div className="accountIdInner">
                        <input
                            type="text"
                            className={isAccountId ? "accountId-check-input on" : "accountId-check-input"}
                            onChange={(event)=> setAccountId(event.target.value)}
                            required
                            placeholder="AccountId"
                            value={accountId}
                        />
                        <button onClick={handleIdCheck}>중복확인</button>
                    </div>
                </div>

                {/* PassWord */}
                <div className="input-inner">
                    <span>PassWord</span>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} required placeholder="Password" value={password}/>
                </div>

                {/* ConfirmPassWord */}
                <div className="input-inner">
                    <span>ConfirmPassWord</span>
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

                {/* Name */}
                <div className="input-inner">
                    <span>Name</span>
                    <input type="text" onChange={(event) => setName(event.target.value)} required placeholder="Name" value={name}/>
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

                {/* Email */}
                <div className="input-inner">
                    <span>Email</span>
                    <input type="Email" onChange={(event) => setEmail(event.target.value)} required placeholder="Email" value={email}/>
                </div>

                {/* HashTag */}
                <div className="input-inner">
                    <span>HashTag</span>
                    <input type="text" onChange={(event) => setUserHashtags(event.target.value)} required placeholder="HashTag" value={userHashtags}/>
                </div>

                <input className="submitBtn" type="submit" value="Sign Up"/>
            </form>
        </div>
    )
}

export default RegistrationForm;