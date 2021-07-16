import Head from "next/head";
import Manager from "../components/Manager/Manager.component";
export default function ManagerPage(){

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