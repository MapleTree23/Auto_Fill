import styled from 'styled-components'
export const SideBarDiv = styled.div`
    display:flex;
    justfiy-content:center;
    border-bottom:1px solid ${({theme})=>(theme.bg101)}
`
export const SdieBarUl = styled.ul`
    display: flex;
    width: 100%;
    list-style-type: none;
    li{
        margin:1rem;
        cursor:pointer;
    }
    .true{
        color:${({theme})=> theme.bg101}
    }
    .false{
        color:white;
    }
`