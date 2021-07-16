import styled from "styled-components";

export const Style = {
  Container: styled.header`
    height: 78px;
    width: calc(100%);
    display: flex;
    align-items: center;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#1C2237;" : "#fbfbfb;")};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;

    .header-options {
      width: 142px;
      height: 54px;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#28345F" : "#ffffff")};
      box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      display: grid;
      place-items: center;
      position: absolute;
      top: 50px;
      right: calc(25% - 71px);
      z-index: 0;
      cursor: pointer;

      span {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 23px;
        text-align: center;
        transition: color 0.3s ease-in;
        color: ${({ dark }) => (dark ? "white" : "#4f4f4f")};
      }

      &:hover {
        span {
          color: black;
        }
      }
    }

    .header-author {
      width: 65%;
      height: 48px;
      display: flex;
      align-items: center;

      img {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        margin-right: 22px;
        margin-left: 35px;
      }

      .author-details {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;

        .name-wave {
          display: flex;
          align-items: center;

          h3 {
            font-family: "Circular Std";
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 23px;
            transition: color 0.3s ease-in;
            color: ${({ dark }) => (dark ? "white" : "#333333")};
            margin-right: 25px;
          }
        }

        span {
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 18px;
          transition: color 0.3s ease-in;
          color: ${({ dark }) => (dark ? "#BDBDBD" : "#828282")};
        }
      }
    }

    .notifications-area {
      width: 30%;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      z-index: 1;

      .notification {
        position: relative;
        margin-right: 45px;

        .active {
          position: absolute;
          top: -7.5px;
        }
      }

      button.theme-button {
        margin-right: 25px;
        height: 100%;
      }

      button.notif-button {
        height: 100%;
        width: 231px;
        border-radius: 10px;
        transition: background 0.3s ease-in;
        background: ${({ dark }) => (dark ? "#28345F" : "#ffffff")};
        box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.103611);
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        cursor: pointer;

        svg {
          transition: all 0.25s linear;
          transform: ${({ clicked }) =>
            clicked ? "rotate(180deg)" : "rotate(0deg)"};
        }

        span {
          font-family: "Circular Std";
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 125%;
          transition: color 0.3s ease-in;
          color: ${({ dark }) => (dark ? "white" : "#333333")};
        }
      }
    }
  `,
  T_Container: styled.header`
    height: 75px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 25px;
    position: fixed;
    top: 0;
    left: 0;
    transition: background 0.3s ease-in;
    background: ${({ dark }) => (dark ? "#1C2237;" : "")};
    backdrop-filter: blur(2px);
    z-index: 10;

    button.theme-button {
      height: 35px;
      width: 35px;
      justify-self: end;
      margin-left: 15%;
    }

    button.header-button {
      width: 76px;
      height: 35px;
      border-radius: 8px;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#28345F" : "#dee8ff;")};

      span {
        font-family: "Circular Std";
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;
        color: ${({ dark }) => (dark ? "#89AAFF" : "#2a64fa;")};
      }
    }

    .menu-options {
      width: 142px;
      height: 198px;
      transition: background 0.3s ease-in;
      background: ${({ dark }) => (dark ? "#28345F" : "#dee8ff;")};
      box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      position: absolute;
      right: 25px;
      top: 80px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
    }
  `,
  Span: styled.span`
    font-family: "Circular Std";
    transition: all 0.2s linear;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: ${({ active, dark }) =>
      active && dark ? "#2A64FA" : dark ? "#bdbdbd" : "#4F4F4F;"};
    margin-left: 15px;
  `,
};
