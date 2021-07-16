import styled from "styled-components";

export const Style = {
  Container: styled.div`
    height: auto;
    display: flex;
    flex-direction: row;
    width: 100%;

    @media (max-width: 1001px) {
      display: none;
    }
  `,
  Main:styled.div`
    width: 100%;
    padding-top: 80px;
    height:100%;
  `,
  Content:styled.div`
    margin:20px;
    
  `
};
