import {Container} from "../../Utils/Container"
import {MainSection} from '../../Utils/UtilComponents'
import Sidebar from "../../components/Sidebar/Sidebar.component"

function Layout({children}){

    return(
        <Container>
            <Sidebar dark={true} />
            {/* <Header dark={true} />  */}
            <MainSection>
                {children}
            </MainSection>
        </Container>
    )
}
export default Layout