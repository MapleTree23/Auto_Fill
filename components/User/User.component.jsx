import React,{useState,useEffect,useMemo} from "react"
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

} from "../../Utils/UtilComponents";
import { MenuListByRole } from "../../Utils/constant";
function User(){

    const [users,setUsers] = useState([])
    const [pages,setPages] = useState(0)

    const fetchdata = async (state,instance) =>{
        let result  = await axios.get("/api/user/getUsers",{
            params:{
                pgsize  :state.pageSize,
                pg      :state.page
            }
        })
        console.log(result)
        setUsers(result.data.users)
        setPages(result.data.count)
    }
    return(
        <Layout>
           <UserPageDiv>
            <ReactTable
                
                className="InvoiceTable"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                                console.log(rowInfo.original)
                            }
                        }
                    }
                }}
                columns={[
                    {
                        Header:()=>{
                            return(
                                <UserTableHeaderColumn>Name</UserTableHeaderColumn>
                            )
                        },
                        accessor:"username",
                        
                        Cell:t=>{
                            return (
                                <UserTableBodyColumn>
                                    {t.value}
                                </UserTableBodyColumn>

                            )
                        }
                    },
                    {
                        Header:()=>{
                            return(
                                <UserTableHeaderColumn>Role</UserTableHeaderColumn>
                            )
                        },
                        accessor:"role",
                        
                        Cell:t=>{
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
                        Header:()=>{
                            return(
                                <UserTableHeaderColumn>Allow</UserTableHeaderColumn>
                            )
                        },
                        accessor:"accept",
                        
                        Cell:t=>{
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
                        <StyledButton2 {...props}>Next</StyledButton2>
                    )
                }}
                PreviousComponent={({...props})=>{
                    return(
                        <StyledButton2 {...props}>Previous</StyledButton2>
                    )
                }}
            />
            </UserPageDiv>
        </Layout>
    )
}
export default User