import styled from 'styled-components'
export const SelectPersonPart = styled.div`
`
export const HumanInfoPart = styled.div`
    
`
export const HumanAvatar = styled.img`
    width:250px;
`
export const HumanAvatarName = styled.div`
    margin-top:1rem;
`
export const HumanCompletedSpan =  styled.span`
    color:${({ theme }) => (theme.text10 )};

`
export const ActionPart = styled.div`
`

export const ManagerTable = styled.div`
    margin-top:2rem;
    margin-bottom:2rem;
    border:1px solid  ${({ theme }) => (theme.bg101 )};

`
export const ManagerTableHeader=styled.div`
    display:flex;
    padding:0.5rem;
    font-size:25px;
    
    border-bottom:1px solid  ${({ theme }) => (theme.bg101 )};
    color:${({ theme }) => (theme.text10 )};

`
export const ManagerTableRow=styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:1rem;
    margin-bottom:1rem;

`
export const ManagerTableItem=styled.div`
    width:calc(100% / 6);
    text-align:center;
    margin:0.3rem;
    :nth-child(1){
        width:30%;
    }
    :nth-child(2){
        width:25%;
    }
    :nth-child(3){
        width:25%;
    }
`
export const ManagerTableInput = styled.input`
    height:2.5rem;
    font-size:20px;
    width:95%;
    border:1px solid  #2f634b;
    background-color: black;
    color: white;
`


export const ManagerCompletedTable = styled.div`
    margin-top:2rem;
    margin-bottom:2rem;
    border:1px solid  ${({ theme }) => (theme.bg101 )};

`
export const ManagerCompletedTableHeader=styled.div`
    display:flex;
    padding:0.5rem;
    font-size:25px;
    
    border-bottom:1px solid  ${({ theme }) => (theme.bg101 )};
    color:${({ theme }) => (theme.text10 )};

`
export const ManagerCompletedTableRow=styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:1rem;
    margin-bottom:1rem;

`
export const ManagerCompletedTableItem=styled.div`
    width:calc(100% / 3);
    text-align:center;
    margin:0.3rem;
 
`