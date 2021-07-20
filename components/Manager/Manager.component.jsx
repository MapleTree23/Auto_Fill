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
    const [cinfo,setCinfo] = useState({})
    const startInput = (info) =>{
        console.log(info)
        setCinfo(info)
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
                            <PreDetail startInput={startInput} currentDate={currentDate} setCurrentStep={setCurrentStep}/>
                        )}
                        {currentStep == StepName.InputInfo && (
                            <InputDetail info={cinfo} setCurrentStep={setCurrentStep}/>
                        )}
                        {/* <a href="/">ABCD</a> */}
                    {/* </Style.Content>
                </Style.Main> */}
            </Layout>
        </div>
    )
}
export default Manager