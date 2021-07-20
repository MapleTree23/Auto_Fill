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
function InputDetail({info,setCurrentStep}){
    const [inputRef, setInputFocus] = useFocus()
    const [tableInfo,setTableInfo] = useState([])
    const [cIndex,setCIndex] = useState(0)
    const [itemLists,setItemLists] = useState([])
    const [itemNames,setItemNames] = useState([])
    const [tempRow,setTempRow] = useState({
        task:"",
        item_name:"",
        item_color:"",
        start:"",
        end:"",
        qty:"",
        qc:""
    })
    const change = (e) =>{
        console.log(e.target.name)
        let temp = {...tempRow}
        temp[`${e.target.name}`] = e.target.value
        setTempRow(temp)
        console.log(temp)
    }
   
    useEffect(async()=>{
        let result = await Crud.getItemList();
        setItemLists(result)
        let nametemps = [];
        for(let i = 0;i < result.length;i++){
            if(nametemps.indexOf(result[i].name) == -1){
                nametemps = [
                    ...nametemps,
                    result[i].name
                ]
            }
        }
        setItemNames(nametemps)
    },[])
    const addNewRow = () =>{
        
        setTableInfo([
            ...tableInfo,
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
                        Name:{`${info.first_name} ${info.last_name}`}
                    </div>
                    <div>
                        Date:{`${info.clock_in.substring(0,10)}`}
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
                        
                        {tableInfo.map((item,index)=>{
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
                                        let tem = [...tableInfo]
                                        tem.splice(index,1)
                                        console.log(tem)
                                        setTableInfo(tem)
                                    }}>Delete</a></ManagerTableItem>

                                </ManagerTableRow>
                            )
                        })}
                        <ManagerTableRow>
                                <ManagerTableItem><ManagerTableInput ref={inputRef} list="tasks" selectBoxOptions="Canada;Denmark;Finland;Germany;Mexico" value={tempRow.task} name="task" onChange={change}/>
                                <datalist id="tasks">
                                    {
                                        tableInfo.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.task}/>
                                            )
                                        })
                                    }
                                </datalist>
                                </ManagerTableItem>
                                {/* <ManagerTableItem><ManagerTableInput list="items" value={tempRow.item}  name="item" onChange={change}/></ManagerTableItem>
                                <datalist id="items">
                                    {
                                        itemLists.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.name}>{`${item.name}  ${item.color_code}`}</option>
                                            )
                                        })
                                    }
                                </datalist> */}
                                <ManagerTableItem><ManagerTableInput list="itemNames" value={tempRow.item_name} name="item_name" onChange={change}/>
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
                                
                                <ManagerTableItem><ManagerTableInput list="itemColors" value={tempRow.item_color} name="item_color" onChange={change}/>
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
                                
                                <ManagerTableItem><ManagerTableInput type="text" value={tempRow.start} name="start" onChange={change}/></ManagerTableItem>
                                <ManagerTableItem><ManagerTableInput type="text" value={tempRow.end} name="end" onChange={change}/></ManagerTableItem>
                                <ManagerTableItem><ManagerTableInput type="text" value={tempRow.qty}  name="qty" onChange={change}/></ManagerTableItem>
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
                            Clock In:{`${info.clock_in.substring(11,19)}`}
                        </div>
                        <div>
                            Clock Out:{`${info.clock_out.substring(11,19)}`}
                        </div>
                </div>
            </ManagerScreenRow>
            <ManagerScreenRow>
                <div className="row justify-space-around">
                    <StyledButton2 onClick={()=>{
                        setCurrentStep(StepName.SelectPerson)
                    }} style={{minWidth:'150px'}}>Back</StyledButton2>
                    <StyledButton2 style={{minWidth:'150px'}}>Save</StyledButton2>
                </div>
            </ManagerScreenRow>
        </ScreenCenterDiv>
    )
}
export default InputDetail