import React, { useState, useEffect,useRef } from "react";
import styled from 'styled-components'
import { AlertMsgStatus } from "../Utils/constant";

const AlertBoxDiv = styled.div`
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border:1px solid ${({theme,status})=>status == AlertMsgStatus.success ? theme.outline201 :
                                        status == AlertMsgStatus.info ? theme.outline202 :
                                        theme.outline203
    };
    color:${({theme,status})=>status == AlertMsgStatus.success ? theme.outline201 :
        status == AlertMsgStatus.info ? theme.outline202 :
        theme.outline203
    };
    background:${({theme,status})=>status == AlertMsgStatus.success ? theme.bg201 :
        status == AlertMsgStatus.info ? theme.bg202 :
        theme.bg203
    };
`
const Alert = ({success,msg,...props})=>{
    if(success == AlertMsgStatus.null){
        return (
            <></>
        )
    }else{
        return (
            <AlertBoxDiv status={success} {...props}>
                {msg}
            </AlertBoxDiv>
        )
    }
}
export default Alert