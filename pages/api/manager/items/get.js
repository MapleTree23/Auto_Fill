import executeQuery from "../../../../lib/ProductionDB";

export default async function handler(req,res){
    try{
        const result = await executeQuery({
            query:`SELECT * FROM items`
        })
        res.status(200).json({ items: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}