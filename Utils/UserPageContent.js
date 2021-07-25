import styled from 'styled-components'
export const UserPageDiv = styled.div`
    color:white;
`;
export const UserTableHeaderColumn = styled.div`
    //border-bottom:1px solid ${({theme})=>theme.bg101};
    color:${({theme})=>theme.bg101};

    padding: 0.5rem;
    font-size: 1.7rem;
`;
export const UserTableBodyColumn = styled.div`
     text-align:center;
     cursor:pointer;
     .allow{
         color:${({theme})=>theme.bg101};
     }
     .pending{
        color:${({theme})=>theme.outline203};
     }
`;