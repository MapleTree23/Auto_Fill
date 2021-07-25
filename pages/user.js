import Head from "next/head";
import User from "../components/User/User.component";
import { useSelector } from "react-redux"
import { useEffect } from 'react'
import { useRouter } from "next/router";

export default function UserPage(){
    const router = useRouter();
    const userauth = useSelector((state)=>state.auth)
    const {user} = userauth;
    console.log(user)
    useEffect(()=>{
        if(!user.username){
          router.push("/login");
        }
      },[])
    function currentComponent(){
        return (
            <div>
                <User/>
            </div>
        )
    }
    return (
        <div style={{height:'100%'}}>
            <Head>
                <title>AutoFill | UserManager</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            {currentComponent()}
        </div>
    )
}