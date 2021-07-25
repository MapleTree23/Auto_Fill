import Head from "next/head";
import Login from "../components/Auth/Login.component"
export default function LoginPage(){

    function currentComponent(){
        return (
            <div>
                <Login/>
            </div>
        )
    }
    return (
        <div style={{height:'100%'}}>
            <Head>
                <title>AutoFill | Login</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            {currentComponent()}
        </div>
    )
}