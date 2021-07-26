import React from 'react';
import styled from 'styled-components'
import { StyledButton2 } from '../Utils/UtilComponents';
const ModalWrapper = styled.div`
    background: white;
    border: 1px solid ${({theme})=>theme.bg101};
    box-shadow: 0px 0px 20px 20px #3c3c3c80;
    transition: all .8s;
    width: 60%;
    
    position: absolute;
    left: 20%;
    top:25%;
    z-index:${({isShow})=>isShow?1:-1};
`
const ModalHeader = styled.div`
    background-color: black;
    height: 40px;
    line-height: 40px;
    padding: 5px 20px;
    text-align: right;

    h2{
        float: left;
        margin-top: 1rem;
        padding: 0;
    }
`
const ModalBody = styled.div`
//    background-color: ${({theme})=>theme.bg100};
    background-color: black;
    padding: 10px 15px;
    text-align: center;
    //height:200px;
`
const ModalFooter = styled.div`
    background: black;
    text-align: -webkit-right;
    padding: 1rem;
`
const CloseModalBtn = styled.span`
    cursor:pointer;
`
const Modal = ({
    isShow,
    close,
    headerName,
    children,
    Okay
}) => {
return (
    <div>
        <ModalWrapper isShow={isShow}
        style={{
            transform: isShow ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: isShow ? '1' : '0'
        }}>
            <ModalHeader>
                <h2>{headerName}</h2>
                <CloseModalBtn onClick={close}>×</CloseModalBtn>
            </ModalHeader>
            <ModalBody>
               {children}
            </ModalBody>
            {/* <ModalFooter>
            </ModalFooter> */}
        </ModalWrapper>
    </div>
    )
}

export default Modal;