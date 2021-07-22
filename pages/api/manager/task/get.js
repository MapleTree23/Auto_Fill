import executeQuery from "../../../../lib/ProductionDB";

export default async function handler(req,res){
    try{
        // const {params} = req.body;
        // let values = ''
        // params.tasks.forEach((task,index) => {
        //     values += ` ('${task}')`;
        //     if(index != params.tasks.length - 1){
        //         values += ","
        //     }
        // });
        const result = await executeQuery({
            query:`SELECT * FROM tasks`
        })
        res.status(200).json({ tasks: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';