import styled from 'styled-components'
export const AuthTitle = styled.div`
    margin-top:1rem;
    margin-bottom:1rem;
`
export const AuthTitleMainTitle = styled.span`
    font-size:2.5rem;
    font-weight:bold;
`
export const AuthTitleSubTitle = styled.span`
    font-size: 1.5rem;
    margin-top: 1.2rem;
    a{
        color:#61a083;
        :hover{
            color:${({ theme }) => (theme.bg101 )};
            cursor:pointer;
        }
    }
`