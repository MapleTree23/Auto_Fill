import React,{useState,useEffect,useMemo} from "react"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { setUser } from "../../store/Slice/auth.slice";
import { 
    SideBarDiv,
    SideBarSpace,
    SideBarUl,
    SideBarMark,
    SideBarMarkImg
} from "../../Utils/SideBarContent"
import { MenuListByRole } from "../../Utils/constant";

function Sidebar(){
    const dispatch = useDispatch();

    const router = useRouter();
    const userauth = useSelector((state)=>state.auth)
    const {user} = userauth;
    if(user){
        return(
            <SideBarDiv>
                <SideBarMark>
                    <SideBarMarkImg src="/calender.png"/>
                    <h1>Dailyinput</h1>
                </SideBarMark>
                <SideBarSpace/>
                <SideBarUl>
                    {
                        user.role >= 0 && (
                            <>
                                {
                                    MenuListByRole[user.role].map((menu,index)=>{
                                        // console.log(router.pathname == menu.url)
                                        let selected = router.pathname == menu.url;
                                        // console.log(selected)
                                        return(
                                            <li key={index} className={`${selected}`}><span onClick={()=>{
                                                router.push(menu.url)
                                            }}>{menu.menuname}</span></li>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                    <li onClick={()=>{
                        dispatch(setUser({}))
                        router.push("/")
                    }}>Logout(<small>{user.username}</small>)</li>
                </SideBarUl>
            </SideBarDiv>
        )
    }else{
        return(
            <>
            </>
        )
    }
}
export default Sidebar