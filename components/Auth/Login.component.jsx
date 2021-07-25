import React,{useState,useEffect,useMemo} from "react"
import { useRouter } from "next/router";

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

function Login(){
    const router = useRouter();
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [isLogging,setIsLogging] = useState(false)
    const [success,setSuccess] = useState(AlertMsgStatus.null)
    const [msg,setMsg] = useState("");
    
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
            <StyledButton2 
                style={{marginTop:'2rem'}}
                onClick={()=>{
                    
                }}
            >Login</StyledButton2>
        </AuthLayout>
    )
}
export default Login