import Head from "next/head";
import Signup from "../components/Auth/Signup.component";

export default function SignupPage(){
    function currentComponent(){
        return (
            <div>
                <Signup/>
            </div>
        )
    }
    return (
        <div style={{height:'100%'}}>
            <Head>
                <title>AutoFill | Signup</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            {currentComponent()}
        </div>
    )
}