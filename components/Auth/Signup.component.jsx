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

function Signup(){
    const dispatch = useDispatch();
    
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPwd,setConfirmPwd] = useState("")
    const [isSaving,setIsSaving] = useState(false)
    const [success,setSuccess] = useState(AlertMsgStatus.null)
    const [msg,setMsg] = useState("");
    const router = useRouter();

    const signup = async() => {
        if(userName == "" ){
            setSuccess(AlertMsgStatus.error)
            setMsg("username input failed")
            return;
        }
        if(password != confirmPwd){
            setSuccess(AlertMsgStatus.error)
            setMsg("password mismatch")
            return;
        }
        setIsSaving(true)
        let result = await axios.post("/api/auth/post",{
            params:{
                username:userName,
                password:password
            }
        })
        setIsSaving(false)
        if(result.data.result == 'fail'){
            setSuccess(AlertMsgStatus.error)
            setMsg("signUp error")
            return;
        }else{
            setSuccess(AlertMsgStatus.success)
            setMsg("signUp success")

        }
        console.log(result)
    }
    return(
        <AuthLayout>
            <AuthTitle>
                <AuthTitleSubTitle><a onClick={()=>{
                    router.push("/login");
                }}>Login/</a></AuthTitleSubTitle>
                <AuthTitleMainTitle>Signup</AuthTitleMainTitle>
            </AuthTitle>
            <StyledInputItem>
                <StyleInputLabel>
                    Username
                </StyleInputLabel>
                <StyledInput type="text" name="username" value={userName} onChange={e=>setUserName(e.target.value)}/>
            </StyledInputItem>
            <StyledInputItem>
                <StyleInputLabel>
                    Password
                </StyleInputLabel>
                <StyledInput type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </StyledInputItem>
            <StyledInputItem>
                <StyleInputLabel>
                    ConfirmPassword
                </StyleInputLabel>
                <StyledInput type="password" value={confirmPwd} onChange={e=>setConfirmPwd(e.target.value)}/>
            </StyledInputItem>
            <Alert success={success} msg={msg}/>
            <StyledButton2 
                style={{marginTop:'2rem'}}
                onClick={signup}
                disable={isSaving}
            >Signup</StyledButton2>
        </AuthLayout>
    )
}
export default Signup