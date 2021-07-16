import React,{useState,useEffect,useMemo,useRef} from "react"
import { Style } from "./InputDetail.styles"
const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
}
function InputDetail({info}){
    const [inputRef, setInputFocus] = useFocus()
    const [tableInfo,setTableInfo] = useState([])
    const [cIndex,setCIndex] = useState(0)
    const [tempRow,setTempRow] = useState({
        task:"",
        item:"",
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
    const saveTemp = () =>{
        setTableInfo([
            ...tableInfo,
            tempRow
        ])
    }
    return(
        <Style.Container>
             <Style.Header>
                <h1>Input Detail</h1>
            </Style.Header>
            <Style.Content>
                <div className="row justify-space-around">
                    <div>
                        Name:{`${info.first_name} ${info.last_name}`}
                    </div>
                    <div>
                        Date:{`${info.clock_in.substring(0,10)}`}
                    </div>
                </div>
                <div>
                    <Style.Table>
                        <Style.TableHeader>
                            <Style.TableItem>Task</Style.TableItem>
                            <Style.TableItem>Item</Style.TableItem>
                            <Style.TableItem>Start</Style.TableItem>
                            <Style.TableItem>End</Style.TableItem>
                            <Style.TableItem>QTY</Style.TableItem>
                            <Style.TableItem>QC</Style.TableItem>
                            <Style.TableItem>Action</Style.TableItem>

                        </Style.TableHeader>
                        
                        {tableInfo.map((item,index)=>{
                            return(
                                <Style.TableRow key={index}>
                                    <Style.TableItem>{item.task}</Style.TableItem>
                                    <Style.TableItem>{item.item}</Style.TableItem>
                                    <Style.TableItem>{item.start}</Style.TableItem>
                                    <Style.TableItem>{item.end}</Style.TableItem>
                                    <Style.TableItem>{item.qty}</Style.TableItem>
                                    <Style.TableItem>{item.qc}</Style.TableItem>
                                    <Style.TableItem><a onClick={()=>{
                                        let tem = [...tableInfo]
                                        tem.splice(index,1)
                                        console.log(tem)
                                        setTableInfo(tem)
                                    }}>Delete</a></Style.TableItem>

                                </Style.TableRow>
                            )
                        })}
                        <Style.TableRow>
                                <Style.TableItem><Style.TableInput ref={inputRef} type="text" value={tempRow.task} name="task" onChange={change}/></Style.TableItem>
                                <Style.TableItem><Style.TableInput type="text" value={tempRow.item}  name="item" onChange={change}/></Style.TableItem>
                                <Style.TableItem><Style.TableInput type="text" value={tempRow.start} name="start" onChange={change}/></Style.TableItem>
                                <Style.TableItem><Style.TableInput type="text" value={tempRow.end} name="end" onChange={change}/></Style.TableItem>
                                <Style.TableItem><Style.TableInput type="text" value={tempRow.qty}  name="qty" onChange={change}/></Style.TableItem>
                                <Style.TableItem><Style.TableInput type="text" value={tempRow.qc}  name="qc" onChange={change} onKeyPress={(e)=>{
                                    if(e.charCode == 13){
                                        saveTemp();
                                        setTempRow({
                                            task:"",
                                            item:"",
                                            start:"",
                                            end:"",
                                            qty:"",
                                            qc:""
                                        })
                                        setInputFocus()
                                    }
                                }}/></Style.TableItem>
                                <Style.TableItem>*</Style.TableItem>
                        </Style.TableRow>
                    </Style.Table>
                </div>
                <div className="row justify-space-around">
                    {/* <div className="row justify-space-around"> */}
                        <div>
                            Clock In:{`${info.clock_in.substring(11,19)}`}
                        </div>
                        <div>
                            Clock Out:{`${info.clock_out.substring(11,19)}`}
                        </div>
                    {/* </div> */}
                    {/* <div className="row justify-space-around">
                    </div> */}
                </div>
            </Style.Content>
        </Style.Container>
    )
}
export default InputDetail