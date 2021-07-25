import { useEffect } from 'react'
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux"


export default function MainPage(){
    const router = useRouter();
    const userauth = useSelector((state)=>state.auth)
    const {user} = userauth;

    useEffect(()=>{
        if(!user.username){
          router.push("/login");
        }else{
          router.push("/main")
        }
        
    },[])

    function currentComponent(){
        return(
            <div>Main</div>
        )
    }
    return(
        <div style={{height:'100%'}}>
        <Head>
            <title>AutoFill | Login</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        {currentComponent()}
    </div>
    )
}
