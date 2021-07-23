import React,{useState,useEffect,useMemo,useRef} from "react"
import { StepName } from "../Constant"
import {
    ScreenCenterDiv,
    ManagerScreenRow,
    RowAround,
    StyledButton2,
    StyledInput,
    
} from "../../../Utils/UtilComponents"
import {
    HumanAvatar,
} from '../../../Utils/ManagerPage'
const getCurrentDate = ()=>{
    let cDate = new Date();
    cDate.setDate(cDate.getDate()-1)
    let mon = cDate.getMonth() + 1;
    let day = cDate.getDate();
    if(mon < 10){
        mon = `0${mon}`
    }
    if(day < 10){
        day = `0${day}`
    }
    return `${cDate.getFullYear()}-${mon}-${day}`
}
function CreateDay({setCurrentDate,setCurrentStep}){
    const [cdate,setCdate] = useState(getCurrentDate())
    return(
        <ScreenCenterDiv>
            <ManagerScreenRow>
                <h1>Select Date</h1>
            </ManagerScreenRow>
            <HumanAvatar src="/calender.png"/>
            <ManagerScreenRow>
                <StyledInput 
                    type="date" 
                    style={{maxWidth:'15rem'}}
                    value={cdate}
                    onChange={(e)=>{
                     
                        let selDate = new Date(e.target.value)
                        let nowDate = new Date()
                     
                        selDate.setHours(0)
                        selDate.setMinutes(0)
                        selDate.setSeconds(0)
                        selDate.setMilliseconds(0)

                        nowDate.setHours(0)
                        nowDate.setMinutes(0)
                        nowDate.setSeconds(0)
                        nowDate.setMilliseconds(0)
                        if(selDate < nowDate)
                        {
                            setCdate(e.target.value)
                        }
                        

                    }}
                ></StyledInput>
                <StyledButton2 style={{width:'15rem',marginTop:'2rem'}} onClick={()=>{
                    setCurrentDate(cdate);
                    setCurrentStep(StepName.SelectPerson)
                }}> 
                    CREATE DAY
                </StyledButton2>
            </ManagerScreenRow>
            
        </ScreenCenterDiv>
    )
}
export default CreateDay