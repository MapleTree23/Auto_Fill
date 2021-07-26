import executeQuery from "../../../lib/ProductionDB";
import bcrypt from 'bcrypt';

export default async function handler(req,res){
    try{
     //   console.log(bcrypt)
        const {username,password} = req.query;
        console.log(username)

        const result = await executeQuery({
            query:`SELECT * FROM users WHERE username='${username}' AND allow=1`
        })
        if(result.length){
            if(bcrypt.compareSync(password,result[0].password)){
                res.status(200).json({ result:true,user:{
                    username:result[0].username,
                    role:result[0].role
                }})
            }else{
                res.status(200).json({ result: false,reason:'pwd'})
            }
        }else{
            res.status(200).json({ result: false,reason:'sign'})
        }
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}