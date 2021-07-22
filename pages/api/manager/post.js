import executeQuery from "../../../lib/ProductionDB";

export default async function handler(req,res){
    try{
        const {totalList} = req.body.params;
        let values = ''
        console.log(values)
        totalList.forEach((item,index) => {
            values += `(${item.shift_id},${item.item_id},${item.task_id},'${item.start}','${item.end}',${item.qty},'${item.qc}')`
            if(index != totalList.length - 1){
                values += ","
            }
        });
    
        const result = await executeQuery({
            query:`INSERT INTO timesheets (shift_id,item_id,task_id,start,end,qty,qc) VALUES ${values}`
        })
        console.log(result)
        res.status(200).json({ result: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}