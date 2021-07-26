import React,{useState,useEffect,useMemo} from "react"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from 'axios'
import Alert from "../../UIUtils/Alert";
import { AlertMsgStatus } from "../../Utils/constant";

import {
    StyledButton2,
    StyledInput,
    StyledInputItem,
    StyleInputLabel
} from "../../Utils/UtilComponents"
import {
    AuthTitle,
    AuthTitleMainTitle,
    AuthTitleSubTitle
} from "../../Utils/AuthPageContent"
import AuthLayout from "../../common/AuthLayout/authlayout.component"

import { setUser } from "../../store/Slice/auth.slice";

function Login(){
    const router = useRouter();
    const dispatch = useDispatch();

    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [isLogging,setIsLogging] = useState(false)
    const [success,setSuccess] = useState(AlertMsgStatus.null)
    const [msg,setMsg] = useState("");
    
    const login = async() => {
        let result  = await axios.get("/api/auth/get",{
            params:{
                username:userName,
                password:password
            }
        })
        if(result.data.result){
            dispatch(setUser(result.data.user))
            router.push("/")
        }else{
            setSuccess(AlertMsgStatus.error)
            if(result.data.reason == "pwd")
            {
                setMsg("Password Incorrect")
            }
            if(result.data.reason == "sign")
            {
                setMsg("User not found")
            }
        }
    }
    return(
        <AuthLayout>
            <AuthTitle>
                <AuthTitleMainTitle>Login</AuthTitleMainTitle>
                <AuthTitleSubTitle><a onClick={()=>{
                    router.push("/signup");
                }}>/SignUp</a></AuthTitleSubTitle>
            </AuthTitle>
            <StyledInputItem>
                <StyleInputLabel>
                    Username
                </StyleInputLabel>
                <StyledInput type="text" name="username" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            </StyledInputItem>
            <StyledInputItem>
                <StyleInputLabel>
                    Password
                </StyleInputLabel>
                <StyledInput type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </StyledInputItem>
            <Alert success={success} msg={msg}/>

            <StyledButton2 
                style={{marginTop:'2rem'}}
                onClick={login}
                disable={false}
            >Login</StyledButton2>
        </AuthLayout>
    )
}
export default Login