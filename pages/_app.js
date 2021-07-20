//import '../styles/globals.css'
import React from "react";
import { Provider } from "react-redux";
import ThemeProvider,{GlobalStyle} from "../styles/GlobalStyle";
import styled from "styled-components";
import "./_app.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
    <>
      <GlobalStyle/>
      <Component {...pageProps} />
    </>
    </ThemeProvider>
  )
}

export default MyApp
