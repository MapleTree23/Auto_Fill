import executeQuery from "../../../lib/ProductionDB";
import bcrypt from 'bcrypt';

const saltRound = 10;
export default async function handler(req,res){
    try{
        //console.log(bcrypt)
        const {username,password} = req.body.params;
        
        let hash = await bcrypt.hashSync(password,saltRound)
        console.log(hash)
        let values = `('${username}','${hash}',0,0)`

        
        const result = await executeQuery({
            query:`INSERT INTO users (username,password,role,allow) VALUES ${values}`
        })
        console.log(result)
        if(result.error){
            res.status(200).json({ result: "fail"})
        }
        else{
            res.status(200).json({ result: "success"})
        }
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}