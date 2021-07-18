import styled from "styled-components";

export const Style = {
  Container: styled.div`
    width: 100vw;
    height: auto;
    width: 100%;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#151928" : "#f4f4f4;")};
    display: flex;
    flex-direction: column;
    height: auto;

    .page-content {
      width: calc(100vw );
      min-height: 100vh;
    }

   
  `,
};
/**
 *  @media (max-width: 1001px) {
      display: none;
    }
 */