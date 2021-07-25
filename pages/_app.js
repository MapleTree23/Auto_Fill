//import '../styles/globals.css'
import React from "react";
import ThemeProvider,{GlobalStyle} from "../styles/GlobalStyle";
import "./_app.css";
import { Provider } from "react-redux"
import store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
      <>
        <GlobalStyle/>
        <Component {...pageProps} />
      </>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
