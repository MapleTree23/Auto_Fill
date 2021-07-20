import React,{useState,useEffect,useMemo} from "react"
import { Style } from "./PreDetail.styles"
import * as Crud from "../Crud"
import {
    ScreenCenterDiv,
    ManagerScreenRow,
    StyledButton,
    StyledInput,
    StyledSelect,
    StyledButton2,
    StyledInputItem,
    StyleInputLabel

} from '../../../Utils/UtilComponents'
import {
    SelectPersonPart,
    HumanInfoPart,
    HumanAvatar,
    HumanAvatarName,
    ActionPart
} from '../../../Utils/ManagerPage'
import {StepName} from '../Constant'

function PreDetail({startInput,currentDate,setCurrentStep}){
    //const [currentDate,setCurrentDate] = useState("")
    const [department,setDepartment] = useState([
        // {
        //     name:'Fluffer',
        //     roles:[]
        // },
        // {
        //     name:'Industrial',
        //     roles:[]
        // },
        // {
        //     name:'Production',
        //     roles:[]
        // },
    ])
    const [currentDepartmentName,setCurrentDepartmentName] = useState("")
    const [roleList,setRoleList] = useState([])
    const [currentRoleName,setCurrentRoleName] = useState("")
    
    const [personList,setPersonList] = useState([])
    const [currentPersonName,setCurrentPersonName] = useState("")
    const [currentPerson,setCurrentPerson] = useState({})

   
    useEffect(async ()=>{
        //console.log(currentDate)
        if(currentDate != ""){
            let result = await Crud.getDaySchedule(currentDate);  
            console.log(result)
            let departments = []
            let deparmenttemp = []
            for(let i = 0;i < result.length;i++){
                if(departments.indexOf(result[i].department) == -1){
                    departments = [
                        ...departments,
                        result[i].department
                    ]
                    deparmenttemp = [
                        ...deparmenttemp,
                        {
                            name:result[i].department,
                            roles:result.filter(item=>item.department==result[i].department)        
                        }
                    ]
                }
            }
         
            setDepartment(deparmenttemp);
        }
    },[currentDate])

    useEffect(()=>{
        if(currentDepartmentName != ""){
            
            let currentDepart = [...department.filter(depart=>depart.name == currentDepartmentName)[0].roles]
            let newRoleNames = [];
            for(let i = 0;i < currentDepart.length;i++){
                let roleName = currentDepart[i].role;
                //console.log(currentDepart[i].role)
                if(newRoleNames.indexOf(roleName) == -1){
                    newRoleNames = [
                        ...newRoleNames,
                        roleName
                    ]
                }
            }
            setRoleList(newRoleNames)
        }else{
            setRoleList([])
            setCurrentRoleName("")
        }
    },[currentDepartmentName,department])

    useEffect(()=>{
        if(roleList.length > 0){
            setCurrentRoleName(roleList[0])
        }else{
            setCurrentRoleName("")
        }
    },[roleList])

    useEffect(()=>{
        if(currentRoleName != ""){
            let currentDepart = [...department.filter(depart=>depart.name == currentDepartmentName)[0].roles]
            let currentPeople = currentDepart.filter(depart=>depart.role==currentRoleName)
            setPersonList(currentPeople)
            setCurrentPersonName(`${currentPeople[0].first_name}_${currentPeople[0].last_name}`)
        }else{
            setPersonList([])
            setCurrentPersonName("")
        }
    },[currentRoleName])

    useEffect(()=>{
        if(currentPersonName != ""){
            let currnetPersonTemp = personList.filter(person=> `${person.first_name}_${person.last_name}` == currentPersonName)[0]
            // console.log(currnetPersonTemp)
            setCurrentPerson(currnetPersonTemp)
        }
    },[currentPersonName])
    return(
        <ScreenCenterDiv>
            <ManagerScreenRow>
                <h1>Select Person</h1><small>{currentDate}</small>
            </ManagerScreenRow>
            <ManagerScreenRow>
                <div className="row justify-space-around">
                    <SelectPersonPart>
                        <StyledInputItem>
                            <StyleInputLabel>
                                Deparment:
                            </StyleInputLabel>
                            <StyledSelect
                                value={currentDepartmentName}
                                onChange={(e) => {
                                    setCurrentDepartmentName(e.target.value);
                                }}
                            >
                                 {department.map((depart,index)=>{
                                    return(
                                        <option key={index} value={depart.name}>{depart.name}</option>
                                    )    
                                })}
                            </StyledSelect>
                        </StyledInputItem>
                        <StyledInputItem>
                            <StyleInputLabel>
                                Roles:
                            </StyleInputLabel>
                            <StyledSelect
                                 value={currentRoleName}
                                 onChange={(e) => {
                                     setCurrentRoleName(e.target.value);
                                 }}
                            >
                                {roleList.map((role,index)=>{
                                        return(
                                            <option key={index} value={role}>{role}</option>
                                        )    
                                })}
                            </StyledSelect>
                        </StyledInputItem>
                        <StyledInputItem>
                            <StyleInputLabel>
                                Persons:
                            </StyleInputLabel>
                            <StyledSelect
                                value={currentPersonName}
                                onChange={(e) => {
                                    setCurrentPersonName(e.target.value);
                                }}
                            >
                                {personList.map((person,index)=>{
                                    return(
                                        <option key={index} value={`${person.first_name}_${person.last_name}`}>{`${person.first_name} ${person.last_name}`}</option>
                                    )    
                                })}
                            </StyledSelect>
                        </StyledInputItem>
                    </SelectPersonPart>
                    <HumanInfoPart>
                        <HumanAvatar src="/human.png"/>
                        <HumanAvatarName>
                            {currentPersonName}
                        </HumanAvatarName>
                    </HumanInfoPart>
                </div>
               
            </ManagerScreenRow>
            <ManagerScreenRow>
                <div className="row justify-space-around">
                    <StyledButton2 onClick={()=>{
                        setCurrentStep(StepName.CreateDay)
                    }} style={{minWidth:'150px'}}>Back</StyledButton2>
                    <StyledButton2 style={{minWidth:'150px'}} onClick={()=>{
                            if(currentPersonName != "")
                            {
                                startInput(currentPerson)
                            }else{
                                alert("Select Person")
                            }
                        }}>Start</StyledButton2>
                </div>
            </ManagerScreenRow>

        </ScreenCenterDiv>
    )
}
export default PreDetail