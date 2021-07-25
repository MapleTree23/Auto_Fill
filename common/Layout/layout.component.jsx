import {Container} from "../../Utils/Container"
import {MainSection} from '../../Utils/UtilComponents'

function Layout({children}){

    return(
        <Container>
            {/* <Sidebar dark={true} />*/}
            {/* <Header dark={true} />  */}
            <MainSection>
                {children}
            </MainSection>
        </Container>
    )
}
export default Layout