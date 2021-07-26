import React,{useState,useEffect,useMemo,useRef} from "react"
import Layout from "../../common/Layout/layout.component";
import ReactTable from 'react-table-6';
import axios from 'axios'
import "react-table-6/react-table.css";
import { 
    UserPageDiv,
    UserTableHeaderColumn,
    UserTableBodyColumn,
} from "../../Utils/UserPageContent";
import { 
    StyledButton2,
    StyledInput,
    StyledInputItem,
    StyledSelect,
    StyleInputLabel
} from "../../Utils/UtilComponents";

import { MenuListByRole,AlertMsgStatus } from "../../Utils/constant";
import Alert from "../../UIUtils/Alert";
import Modal from "../../UIUtils/Modal";

import { 
    OkayButton,
    ErrorButton
} from "../../Utils/UtilComponents";

function User(){
    const tableref = useRef(null)
    const [users,setUsers] = useState([])
    const [pages,setPages] = useState(0)


    const [showModal,setShowModal] = useState(false)
    const [currentRow,setCurrentRow] = useState("")

    const [success,setSuccess] = useState(AlertMsgStatus.null)
    const [msg,setMsg] = useState("");

    const fetchdata = async (state,instance) =>{
        let result  = await axios.get("/api/user/getUsers",{
            params:{
                pgsize  :state.pageSize,
                pg      :state.page
            }
        })
        //console.log(result)
        setUsers(result.data.users)
        setPages(result.data.count)
    }
    const saveUserInfo = async ()=>{
        
        let result = await axios.put("/api/user/updateUser",{
            params:currentRow
        })
        if(result.data.result == 'success')
        {
            fetchdata(tableref.current.state,0)
            setSuccess(AlertMsgStatus.null)
            setMsg("")
            setShowModal(false)
        }else{
            setSuccess(AlertMsgStatus.error)
            setMsg("Save failed")
        }        
    }
    const deleteUser = async ()=>{
        let result = await axios.delete("/api/user/deleteUser",{
            params:currentRow
        })
        if(result.data.result == 'success')
        {
            fetchdata(tableref.current.state,0)
            setSuccess(AlertMsgStatus.null)
            setMsg("")
            setShowModal(false)
        }else{
            setSuccess(AlertMsgStatus.error)
            setMsg("Save failed")
        }   
    }
    return(
        <Layout>
           <UserPageDiv>
                <Modal
                    close={() => {
                        setShowModal(false)
                        setSuccess(AlertMsgStatus.null)
                        setMsg("")
                    }}
                    isShow={showModal}
                    Okay={()=>{
                        saveUserInfo()
                    }}
                    headerName={currentRow.username}
                    >
                    {currentRow && (
                        <div style={{padding:'2rem'}}>
                            <StyledInputItem>
                                <StyleInputLabel>
                                    UserRole
                                </StyleInputLabel>
                                <StyledSelect name="role" value={currentRow.role} onChange={(e)=>{
                                    setCurrentRow({
                                        ...currentRow,
                                        role:e.target.value
                                    })
                                }}>
                                    {MenuListByRole.map((role,index)=>{
                                        let roleNames = ""
                                        for(let i = 0;i < role.length;i++){
                                            roleNames += role[i].menuname;
                                            if(i != role.length - 1){
                                                roleNames += ","
                                            }
                                        }
                                        return(
                                            <option key={index} value={index}>{roleNames}</option>
                                        )
                                    })}
                                </StyledSelect>
                            </StyledInputItem>
                            <StyledInputItem>
                                <StyleInputLabel>
                                    UserAllow
                                </StyleInputLabel>
                                <StyledSelect name="allow" value={currentRow.allow} onChange={(e)=>{
                                    setCurrentRow({
                                        ...currentRow,
                                        allow:e.target.value
                                    })
                                }}>
                                    <option value={0}>Pending</option>
                                    <option value={1}>Allow</option>
                                </StyledSelect>
                            </StyledInputItem>
                            <StyledInputItem>
                                <Alert style={{width:'100%'}} success={success} msg={msg}/>
                            </StyledInputItem>
                            <StyledInputItem style={{justifyContent:'space-around'}}>
                                <ErrorButton
                                    onClick={deleteUser}
                                >Delete</ErrorButton>
                                <OkayButton
                                    onClick={saveUserInfo}
                                >Okay</OkayButton>
                            </StyledInputItem>
                        </div>
                    )}
                </Modal>
                <ReactTable
                    ref = {tableref}
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    if(!showModal){
                                        setCurrentRow(rowInfo.original)
                                        setShowModal(true)
                                    }
                                }
                            }
                        }
                    }}
                    columns={[
                        {
                            Header:function nameItemHeader(){
                                return(
                                    <UserTableHeaderColumn>Name</UserTableHeaderColumn>
                                )
                            },
                            accessor:"username",
                            
                            Cell:function nameItemBody(t){
                                return (
                                    <UserTableBodyColumn>
                                        {t.value}
                                    </UserTableBodyColumn>

                                )
                            }
                        },
                        {
                            Header:function roleItemHeader(){
                                return(
                                    <UserTableHeaderColumn>Role</UserTableHeaderColumn>
                                )
                            },
                            accessor:"role",
                            
                            Cell:function roleItemBody(t){
                                return (
                                    <UserTableBodyColumn>
                                        {MenuListByRole[parseInt(t.value)].map((role,index)=>{
                                            return(
                                                <span key={index}>
                                                    {` ${role.menuname} `}
                                                </span>
                                            )
                                        })}
                                        
                                    </UserTableBodyColumn>
                                )
                            }
                        },
                        {
                            Header:function allowItemHeader(){
                                return(
                                    <UserTableHeaderColumn>Allow</UserTableHeaderColumn>
                                )
                            },
                            accessor:"allow",
                            
                            Cell:function allowItemBody(t){
                                return (
                                    <UserTableBodyColumn>
                                        {t.value == "1" && (
                                            <span className="allow">Allowed</span>
                                        )}
                                        {t.value == "0" && (
                                            <span className="pending">Pending</span>
                                        )}
                                    </UserTableBodyColumn>
                                )
                            }
                        },
                    ]}
                    defaultPageSize={10}
                    manual
                    noDataText="No contents found"
                    pages={pages}

                    data={users}
                    onFetchData={fetchdata}
                    NextComponent={({...props})=>{
                        return(
                            <div>
                            <StyledButton2 style={{maxWidth:'10rem'}} {...props}>Next</StyledButton2>
                            </div>
                        )
                    }}
                    PreviousComponent={({...props})=>{
                        return(
                            <div style={{textAlign:'-webkit-right'}}>
                            <StyledButton2  style={{maxWidth:'10rem'}}  {...props}>Previous</StyledButton2>
                            </div>
                        )
                    }}
                />
            </UserPageDiv>
        </Layout>
    )
}
export default User