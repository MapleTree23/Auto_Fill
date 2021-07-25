import React,{useState,useEffect,useMemo} from "react"
import { useRouter } from "next/router";
import { useSelector } from "react-redux"
import { 
    SideBarDiv,
    SdieBarUl
} from "../../Utils/SideBarContent"
import { MenuListByRole } from "../../Utils/constant";

function Sidebar(){
    const router = useRouter();
    const userauth = useSelector((state)=>state.auth)
    const {user} = userauth;
    // console.log(user)
    // console.log(router.pathname)

    return(
        <SideBarDiv>
            <SdieBarUl>
                {
                    user.role >= 0 && (
                        <>
                            {
                                MenuListByRole[user.role].map(menu=>{
                                    // console.log(router.pathname == menu.url)
                                    let selected = router.pathname == menu.url;
                                    // console.log(selected)
                                    return(
                                        <li className={`${selected}`}><span onClick={()=>{
                                            router.push(menu.url)
                                        }}>{menu.menuname}</span></li>
                                    )
                                })
                            }
                        </>
                    )
                }
               
                
                
            </SdieBarUl>
        </SideBarDiv>
    )
}
export default Sidebar