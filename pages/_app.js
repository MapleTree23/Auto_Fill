//import '../styles/globals.css'
import React from "react";
import { Provider } from "react-redux";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import "./_app.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
