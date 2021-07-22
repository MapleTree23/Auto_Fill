import executeQuery from "../../../../lib/ProductionDB";

export default async function handler(req,res){
    try{
        const {params} = req.body;
//        let values = `('${params.shift.first_name}','${params.shift.last_name}','${params.shift.clock_in}','${params.shift.timebreaks[0].end_at}','${params.shift.timebreaks[0].created_at}','${params.shift.clock_out}','${params.shift.department}','${params.shift.role}')`
        let values = `('${params.shift.first_name}','${params.shift.last_name}','${params.shift.clock_in}','${params.shift.clock_in}','${params.shift.clock_in}','${params.shift.clock_out}','${params.shift.department}','${params.shift.role}')`

        console.log(values)
        /*
        params.items.forEach((item,index) => {
            values += ` (${item.parts_id},${item.color_id},'${item.name}','${item.color}')`;
            if(index != params.items.length - 1){
                values += ","
            }
        });
        */
        
        const result = await executeQuery({
            query:`INSERT INTO shifts (first_name,last_name,clock_in,break_out,break_in,clock_out,department,role) VALUES ${values}`
        })
        console.log(result)
        res.status(200).json({ result: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}