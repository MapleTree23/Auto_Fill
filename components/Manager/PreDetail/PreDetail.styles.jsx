import styled from "styled-components";
export const Style = {
    Container:styled.div`
    
    `,
    Header:styled.div`
        text-align:center;
        padding-bottom:30px;
        padding-top:30px;
    `,
    Content:styled.div`
        padding-bottom:50px;
    `,
    InputPart:styled.div`
    `,
    InputItem:styled.div`
        display:flex;
        padding-top:10px;
        place-items: center;
    `,
    InputLabel:styled.div`
        min-width:200px;
        text-align:center;
        font-size:20px;
    `,
    Input:styled.input`
        width:100%;
        min-width:300px;
        border: 1px solid #a0a0a0;
        /*border-radius: 5px;*/
        height: 40px;
        /*padding: 10px;*/
        font-size:20px;
        height:40px;


    `,
    Select:styled.select`
        width:100%;
        min-width:300px;
        border: 1px solid #a0a0a0;
        /*border-radius: 5px;*/
        height: 40px;
        /*padding: 10px;*/
        font-size:20px;
        

    `,
    StartPart:styled.div`
        align-self: center;
    `,
    StartButton:styled.button`
        font-size: 30px;
        background-color: white;
        /*border-radius: 10px;*/
        padding: 10px 50px 10px 50px;
        border: 1px solid #b3b3b3;
        cursor:pointer;
    `
};