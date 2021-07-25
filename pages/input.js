import Head from "next/head";
import Manager from "../components/Manager/Manager.component";
import { useRouter } from "next/router";
import { useEffect } from 'react'
import { useSelector } from "react-redux"
export default function InputPage(){
    const router = useRouter();
    const userauth = useSelector((state)=>state.auth)
    const {user} = userauth;
    console.log(user)
    useEffect(()=>{
        if(!user.username){
          router.push("/login");
        }else{
          router.push("/input")
        }
        
      },[])
    function currentComponent(){
        return <Manager/>
    }

    return (
        <div style={{ height: "100%" }}>
            <Head>
                <title>AutoFill | Manager</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            {currentComponent()}
        </div>
    )
}