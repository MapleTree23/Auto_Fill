import {Container} from "../../Utils/Container"
import { AuthSection} from "../../Utils/UtilComponents"

function AuthLayout ({children}){
    return(
        <Container>
            <AuthSection>
                {children}
            </AuthSection>
        </Container>
    )
}
export default AuthLayout