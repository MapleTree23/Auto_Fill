import React,{useState,useEffect,useMemo} from "react"
import { Style } from "./PreDetail.styles"
import * as Crud from "../Crud"

function PreDetail({start}){
    const [currentDate,setCurrentDate] = useState("")
    const [department,setDepartment] = useState([
        {
            name:'Fluffer',
            roles:[]
        },
        {
            name:'Industrial',
            roles:[]
        },
        {
            name:'Production',
            roles:[]
        },
    ])
    const [currentDepartmentName,setCurrentDepartmentName] = useState("")
    const [roleList,setRoleList] = useState([])
    const [currentRoleName,setCurrentRoleName] = useState("")
    
    const [personList,setPersonList] = useState([])
    const [currentPersonName,setCurrentPersonName] = useState("")
    const [currentPerson,setCurrentPerson] = useState({})

   
    useEffect(async ()=>{
        console.log(currentDate)
        if(currentDate != ""){
            let result = await Crud.getDaySchedule(currentDate);          
            let deparmenttemp = [
                {
                    name:'Fluffer',
                    roles:result.filter(item=>item.department=="Fluffer")
                },
                {
                    name:'Industrial',
                    roles:result.filter(item=>item.department=="Industrial")
                },
                {
                    name:'Production',
                    roles:result.filter(item=>item.department=="Production")
                },
            ]
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
        <Style.Container>
            <Style.Header>
                <h1>Select Information</h1>
            </Style.Header>
            <Style.Content>
                <div className="row justify-space-around">
                    <Style.InputPart>
                        <Style.InputItem>
                            <Style.InputLabel>
                                Date:
                            </Style.InputLabel>
                            <Style.Input 
                                type="date"
                                value={currentDate}
                                onChange={(e) => {
                                    setCurrentDate(e.target.value)
                                }}
                            />
                        </Style.InputItem>
                        <Style.InputItem>
                            <Style.InputLabel>
                                Deparment:
                            </Style.InputLabel>
                            <Style.Select
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
                            </Style.Select>
                        </Style.InputItem>
                        <Style.InputItem>
                            <Style.InputLabel>
                                Roles:
                            </Style.InputLabel>
                            <Style.Select
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
                            </Style.Select>
                        </Style.InputItem>
                        <Style.InputItem>
                            <Style.InputLabel>
                                Persons:
                            </Style.InputLabel>
                            <Style.Select
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
                            </Style.Select>
                        </Style.InputItem>
                    </Style.InputPart>
                    <Style.StartPart>
                        <Style.StartButton
                            onClick={()=>{
                                start(currentPerson)
                            }}
                        >
                            Start
                        </Style.StartButton>
                    </Style.StartPart>
                </div>
            </Style.Content>
        </Style.Container>
    )
}
export default PreDetail