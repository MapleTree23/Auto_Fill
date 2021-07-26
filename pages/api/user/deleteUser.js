import executeQuery from "../../../lib/ProductionDB";
import bcrypt from 'bcrypt';

export default async function handler(req,res){
    try{
     //   console.log(bcrypt)
        const {id,username,password,role,allow} = req.query;
        console.log(req.query)
        
        const result = await executeQuery({
            query:`DELETE from users where id=${id}`
        })
        if(result.error){
            res.status(200).json({ result:'fail'})
        }else{
            res.status(200).json({ result:'success'})
        }
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}