import executeQuery from "../../../../lib/ProductionDB";

export default async function handler(req,res){
    try{
        const {timebreaks,shift_id} = req.body.params;
        let values = ''
        timebreaks.forEach((timebreak,index) => {
            values += ` (${shift_id},'${timebreak.end_at}','${timebreak.start_at}')`;
            if(index != timebreaks.length - 1){
                values += ","
            }
        });
        const result = await executeQuery({
            query:`INSERT INTO timebreaks (shift_id,break_out,break_in) VALUES ${values}`
        })
        res.status(200).json({ result: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}