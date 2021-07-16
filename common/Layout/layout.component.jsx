import { Style } from "./layout.styles";
import Header from "../Header/header.component";

function Layout({children}){

    return(
        <Style.Container dark={false}>
            {/* <Sidebar dark={true} />*/}
            <Header dark={true} /> 
            <div className="page-content">{children}</div>
        </Style.Container>
    )
}
export default Layout