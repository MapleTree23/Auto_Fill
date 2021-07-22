import executeQuery from "../../../../lib/ProductionDB";

export default async function handler(req,res){
    try{
        const {params} = req.body;
        let values = ''
        params.items.forEach((item,index) => {
            values += ` (${item.parts_id},${item.color_id},'${item.name}','${item.color}')`;
            if(index != params.items.length - 1){
                values += ","
            }
        });
        const result = await executeQuery({
            query:`INSERT INTO items (parts_id,color_id,name,color) VALUES ${values}`
        })
        res.status(200).json({ items: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}