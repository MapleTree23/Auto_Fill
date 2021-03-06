import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
//import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";
import { useSelector } from "react-redux"

export default function Home() {
  const router = useRouter();
  const userauth = useSelector((state)=>state.auth)
  const {user} = userauth;
  

  useEffect(()=>{
    if(!user.username){
      router.push("/login");
    }else{
      router.push("/input")
    }
    
  },[])
  return (
    <div>
      <Head>
        <title>AutoFill</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
