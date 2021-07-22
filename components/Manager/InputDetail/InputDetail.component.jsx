import React,{useState,useEffect,useMemo,useRef} from "react"
import { Style } from "./InputDetail.styles"
import * as Crud from "../Crud"
import { StepName } from "../Constant"
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
    ManagerTable,
    ManagerTableHeader,
    ManagerTableRow,
    ManagerTableItem,
    ManagerTableInput
} from '../../../Utils/ManagerPage'

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}
function InputDetail({
            personInfo,
            setCurrentStep,
            completedList,
            setCompletedList
        }){
    const [inputRef, setInputFocus] = useFocus()
    const [scheduleList,setScheduleList] = useState([])
    const [itemLists,setItemLists] = useState([])
    const [itemNames,setItemNames] = useState([])

    const [taskOriginList,setTaskOriginList] = useState([])
    const [taskNewList,setTaskNewList] = useState([])
    const [tempRow,setTempRow] = useState({
        task:"",
        item_name:"",
        item_color:"",
        start:"",
        end:"",
        qty:"",
        qc:""
    })

    const [isItemNameValid,setIsItemNameValid] = useState(true)
    const [isItemColorValid,setIsItemColorValid] = useState(true)

    const [isSaving,setIsSaving] = useState(false)
    const change = (e) =>{
        
        let temp = {...tempRow}
        temp[`${e.target.name}`] = e.target.value
        setTempRow(temp)
        
    }
   
    useEffect(async()=>{
        let result = await Crud.getItemInfoList();
       // console.log(result)
        setItemLists(result)
        let nametemps = [];
        for(let i = 0;i < result.length;i++){
            if(nametemps.filter(item=>item == result[i].name).length == 0){
                nametemps = [
                    ...nametemps,
                    result[i].name
                ]
            }
        }
        setItemNames(nametemps)
       // console.log(info)
    },[])

    useEffect(()=>{
        Crud.getTaskList()
        .then(response=>{
            //console.log(response)
            setTaskOriginList(response.data.tasks)
        })
        //console.log('init')
        //console.log(scheduleList)
    },[])

    const addNewRow = () =>{
        console.log(tempRow)
        if(isSaving){
            alert("Saving now")
            return
        }
        if(tempRow.task == "" || !isItemNameValid || !isItemColorValid || tempRow.start == "" || tempRow.end == "" || !tempRow.qty){
            alert("Invalid Input")
            return
        }

        /*TaskPart */
        if(taskOriginList.filter((task)=>task.task_name == tempRow.task).length == 0){
            if(taskNewList.filter(task=>task == tempRow.task).length == 0){
                setTaskNewList([
                    ...taskNewList,
                    tempRow.task
                ])
            }
        }
        /**TaskPart--- */
        setScheduleList([
            ...scheduleList,
            tempRow
        ])
        setTempRow({
            task:"",
            item_name:"",
            item_color:"",
            start:"",
            end:"",
            qty:"",
            qc:""
        })
        setInputFocus()
    }
    const saveInfo = async () =>{
        if(scheduleList.length == 0){
            alert("You need to input at least 1")
            return
        }
        if(isSaving){
            alert("Saving now")
            return
        }
        setIsSaving(true)
        /**TASK */
        let existTaskList = await Crud.SaveNewTask(taskNewList,taskOriginList)
        
        setTaskOriginList(existTaskList)
        setTaskNewList([])
        console.log("taskList:",existTaskList)

        /**TASK---- */
        /**ITEM */
        let existItemList = await Crud.getItemList()
        let newItemList = []
        for(let i = 0;i < scheduleList.length;i++){
            if(existItemList.filter(item=>item.name == scheduleList[i].item_name && item.color == scheduleList[i].item_color).length == 0){
                let item_Color = itemLists.filter(itemcolor=>itemcolor.name == scheduleList[i].item_name && itemcolor.color_code == scheduleList[i].item_color)[0];
                newItemList = [
                    ...newItemList,
                    {
                        parts_id:item_Color.ID,
                        color_id:item_Color.color_ID,
                        name:item_Color.name,
                        color:item_Color.color_code
                    }
                ]
            }
        }
        console.log("newItemList:",newItemList)
        existItemList = await Crud.SaveNewItemList(newItemList)
        console.log("existItemList:",existItemList)

        /**---ITEM */
        /**Shift */
        let shift_id = await Crud.SaveShift(personInfo);
        /**--Shift */
        /**total */

        let totalList = [];
        for(let i = 0;i < scheduleList.length;i++){
            let schedule = scheduleList[i]
            let item_id = existItemList.filter(item=>item.name == schedule.item_name && item.color == schedule.item_color)[0].id;
            let task_id = existTaskList.filter(task=>task.task_name == schedule.task)[0].id
            totalList = [
                ...totalList,
                {
                    shift_id:shift_id,
                    item_id:item_id,
                    task_id:task_id,
                    start:schedule.start,
                    end:schedule.end,
                    qty:schedule.qty,
                    qc:schedule.qc,
                }
            ]
        }
        let totalResult = await Crud.SaveTotalInfo(totalList)
        console.log("totalResult:",totalResult)
        setIsSaving(false)
        
        setCompletedList([
            ...completedList,
            personInfo
        ])
        setCurrentStep(StepName.SelectPerson)

    }
    return(
        <ScreenCenterDiv>
             <ManagerScreenRow>
                {/* <div className="button"
                    onClick={()=>{
                        setCurrentStep(StepName.SelectPerson)
                    }}
                >
                    Back
                </div> */}
                <h1>Input Detail</h1>
            </ManagerScreenRow>
            <ManagerScreenRow>
                <div className="row justify-space-around">
                    <div>
                        Name:{`${personInfo.first_name} ${personInfo.last_name}`}
                    </div>
                    <div>
                        Date:{`${personInfo.clock_in.substring(0,10)}`}
                    </div>
                </div>
                <div>
                    <ManagerTable>
                        <ManagerTableHeader>
                            <ManagerTableItem>Task</ManagerTableItem>
                            <ManagerTableItem>Item_Name</ManagerTableItem>
                            <ManagerTableItem>Item_Color</ManagerTableItem>
                            <ManagerTableItem>Start</ManagerTableItem>
                            <ManagerTableItem>End</ManagerTableItem>
                            <ManagerTableItem>QTY</ManagerTableItem>
                            <ManagerTableItem>QC</ManagerTableItem>
                            <ManagerTableItem>Action</ManagerTableItem>

                        </ManagerTableHeader>
                        
                        {scheduleList.map((item,index)=>{
                            return(
                                <ManagerTableRow key={index}>
                                    <ManagerTableItem>{item.task}</ManagerTableItem>
                                    <ManagerTableItem>{item.item_name}</ManagerTableItem>
                                    <ManagerTableItem>{item.item_color}</ManagerTableItem>
                                    <ManagerTableItem>{item.start}</ManagerTableItem>
                                    <ManagerTableItem>{item.end}</ManagerTableItem>
                                    <ManagerTableItem>{item.qty}</ManagerTableItem>
                                    <ManagerTableItem>{item.qc}</ManagerTableItem>
                                    <ManagerTableItem><a style={{cursor:'pointer'}} onClick={()=>{
                                        let tem = [...scheduleList]
                                        tem.splice(index,1)
                                        console.log(tem)
                                        setScheduleList(tem)
                                    }}>Delete</a></ManagerTableItem>

                                </ManagerTableRow>
                            )
                        })}
                        <ManagerTableRow>
                                <ManagerTableItem><ManagerTableInput ref={inputRef} list="tasks" selectBoxOptions="Canada;Denmark;Finland;Germany;Mexico" value={tempRow.task} name="task" onChange={change}/>
                                <datalist id="tasks">
                                    { 
                                        taskOriginList.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.task_name}/>
                                            )
                                        })
                                    }
                                    {
                                        taskNewList.map((task,index)=>{
                                            return(
                                                <option key={`n_${index}`} value={task}/>
                                            )
                                        })
                                    }
                                </datalist>
                                </ManagerTableItem>
                                <ManagerTableItem>
                                    <ManagerTableInput list="itemNames" value={tempRow.item_name} name="item_name" onChange={(e)=>{
                                        setIsItemNameValid(itemNames.indexOf(e.target.value) != -1)
                                        change(e)
                                    }}
                                        style={{
                                            color:isItemNameValid?'white':'red'
                                        }}
                                    />
                                    <datalist id="itemNames">
                                        {
                                            itemNames.map((name,index)=>{
                                                return(
                                                    <option key={index} value={name}>{`${name}`}</option>
                                                )
                                            })
                                        }
                                    </datalist>
                                </ManagerTableItem>
                                
                                <ManagerTableItem><ManagerTableInput list="itemColors" value={tempRow.item_color} name="item_color" onChange={(e)=>{
                                    setIsItemColorValid(itemLists.filter(item=>item.name == tempRow.item_name).filter(item=>item.color_code == e.target.value).length != 0)
                                    change(e)
                                }}
                                    style={{
                                        color:isItemColorValid?'white':'red'
                                    }}
                                />
                                <datalist id="itemColors">
                                    {
                                        itemLists.filter(item=>item.name == tempRow.item_name).map((item,index)=>{
                                            return(
                                                <option key={index} value={item.color_code}>{item.color_code}</option>
                                            )
                                        })
                                    }
                                </datalist>
                                </ManagerTableItem>
                                
                                <ManagerTableItem><ManagerTableInput type="time" value={tempRow.start} name="start" onChange={change}/></ManagerTableItem>
                                <ManagerTableItem><ManagerTableInput type="time" value={tempRow.end} name="end" onChange={change}/></ManagerTableItem>
                                <ManagerTableItem><ManagerTableInput type="number" value={tempRow.qty}  name="qty" onChange={change}/></ManagerTableItem>
                                <ManagerTableItem><ManagerTableInput type="text" value={tempRow.qc}  name="qc" onChange={change} onKeyPress={(e)=>{
                                    if(e.charCode == 13){
                                        addNewRow();
                                    }
                                }}/></ManagerTableItem>
                                <ManagerTableItem onClick={()=>{
                                        addNewRow();
                                }}><StyledButton2>Add</StyledButton2></ManagerTableItem>
                        </ManagerTableRow>
                    </ManagerTable>
                </div>
                <div className="row justify-space-around">
                        <div>
                            Clock In:{`${personInfo.clock_in.substring(11,19)}`}
                        </div>
                        <div>
                            Clock Out:{`${personInfo.clock_out.substring(11,19)}`}
                        </div>
                </div>
            </ManagerScreenRow>
            <ManagerScreenRow>
                <div className="row justify-space-around">
                    <StyledButton2 onClick={()=>{
                        setCurrentStep(StepName.SelectPerson)
                    }} style={{minWidth:'150px'}}>Back</StyledButton2>
                    <StyledButton2 style={{minWidth:'150px'}}
                        onClick={saveInfo}
                    >Save</StyledButton2>
                </div>
            </ManagerScreenRow>
        </ScreenCenterDiv>
    )
}
export default InputDetail