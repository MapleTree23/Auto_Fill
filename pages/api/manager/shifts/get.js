import executeQuery from "../../../../lib/ProductionDB";

export default async function handler(req,res){
    try{
        // const {params} = req.query;
        console.log(req.query)
        const result = await executeQuery({
            query:`SELECT * FROM shifts WHERE clock_in LIKE '${req.query.cdate}%'`
        })
        res.status(200).json({ completed: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}