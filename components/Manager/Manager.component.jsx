import React,{useState,useEffect,useMemo} from "react"

import { Style } from "./Manager.styles";
import Layout from "../../common/Layout/layout.component";
import CreateDay from "./CreateDay/CreateDay.component";
import PreDetail from "./PreDetail/PreDetail.component";
import InputDetail from "./InputDetail/InputDetail.component";
import {StepName} from './Constant'

import {Container} from '../../Utils/Container'

function Manager(){
    const [currentStep,setCurrentStep] = useState(StepName.CreateDay);
    const [currentDate,setCurrentDate] = useState(Date.now())
    const [currentPersonInfo,setCurrentPersonInfo] = useState({})
    const [completedList,setCompletedList] = useState([])

    useEffect(()=>{
        setCompletedList([])
    },[currentDate])
    const startInput = (pinfo) =>{
        //console.log(pinfo)
        setCurrentPersonInfo(pinfo)
        setCurrentStep(StepName.InputInfo);
    }
    
    return(
        <div>
            <Layout>
                {/* <Style.Main>
                    <Style.Content> */}
                        {currentStep == StepName.CreateDay && (
                            <CreateDay setCurrentDate={setCurrentDate} setCurrentStep={setCurrentStep}/>
                        )}
                        {currentStep == StepName.SelectPerson && (
                            <PreDetail 
                                startInput={startInput} 
                                currentDate={currentDate} 
                                setCurrentStep={setCurrentStep}
                                completedList = {completedList}
                                setCompletedList={setCompletedList}
                            />
                        )}
                        {currentStep == StepName.InputInfo && (
                            <InputDetail 
                                personInfo={currentPersonInfo} 
                                setCurrentStep={setCurrentStep}
                                completedList = {completedList}
                                setCompletedList={setCompletedList}
                            />

                        )}
                        {/* <a href="/">ABCD</a> */}
                    {/* </Style.Content>
                </Style.Main> */}
            </Layout>
        </div>
    )
}
export default Manager