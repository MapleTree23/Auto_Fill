import styled from 'styled-components'
export const SideBarDiv = styled.div`
    display:flex;
    justfiy-content:center;
    border-bottom:1px solid ${({theme})=>(theme.bg101)}
`
export const SideBarSpace = styled.div`
    width:100%;
`
export const SideBarUl = styled.ul`
    display: flex;
    // width: 100%;
    list-style-type: none;
    li{
        margin:1rem;
        cursor:pointer;
    }
    li:last-child{
        float:right;
    }
    .true{
        color:${({theme})=> theme.bg101}
    }
    .false{
        color:white;
    }
`
export const SideBarMark = styled.div`
    display:flex;
`
export const SideBarMarkImg = styled.img`
    width:70px;
    height:70px;
    border-radius: 50%;
    padding: 0.5rem;
    border: 1px solid #86ea59;
    margin-right:1rem;
`