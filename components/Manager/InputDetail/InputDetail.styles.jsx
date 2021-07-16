import styled from "styled-components";
export const Style = {
    Container:styled.div`
        font-size:20px;
    `,
    Header:styled.div`
        text-align:center;
        padding-bottom:30px;
        padding-top:30px;

    `,
    Content:styled.div`
        padding-bottom:50px;
    `,
    Table:styled.div`
        padding-top:30px;
        padding-bottom:30px;
    `,
    TableHeader:styled.div`
        display:flex;
        /*justify-content:space-around;*/
        /*margin-bottom:30px;*/
        padding:5px;
        font-size:25px;

        border:1px solid black;
    `,
    TableRow:styled.div`
        display:flex;
        justify-content:space-between;
        margin-top:20px;
    `,
    TableItem:styled.div`
        width:calc(100% / 6);
        text-align:center;
        margin:5px;
    `,
    TableInput:styled.input`
        height:40px;
        font-size:20px;
        width:100%;
        border:1px solid #999;
    `
};