import React,{useState,useEffect,useMemo} from "react"

import { Style } from "./Manager.styles";
import Layout from "../../common/Layout/layout.component";
import PreDetail from "./PreDetail/PreDetail.component";
import InputDetail from "./InputDetail/InputDetail.component";
function Manager(){
    const [cstep,setCstep] = useState(0);
    const [cinfo,setCinfo] = useState({})
    const start = (info) =>{
        console.log(info)
        setCinfo(info)
        setCstep(1);
    }
    return(
        <Style.Container>
            <Layout>
                <Style.Main>
                    <Style.Content>
                        {cstep == 0 && (
                            <PreDetail start={start}/>
                        )}
                        {cstep == 1 && (
                            <InputDetail info={cinfo} />
                        )}
                    </Style.Content>
                </Style.Main>
            </Layout>
        </Style.Container>
    )
}
export default Manager