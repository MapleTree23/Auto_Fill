import excuteQuery from "../../../lib/db"

export default async function handler(req, res) {
    try{
        /**
         * SELECT table112.id,table112.bval1,table112.bval2,
            table111.id,table111.aval1
            FROM table112
            RIGHT JOIN table111
            ON table112.bval1=table111.aval1;
         */
        /**
         * SELECT *
            FROM ffc_parts
            RIGHT JOIN ffc_parts_color
            ON ffc_parts.ID=ffc_parts_color.parts_id;
         */
        const result = await excuteQuery({
            query: `
                SELECT ffc_parts.ID,ffc_parts.name,ffc_parts_color.color_code
                FROM ffc_parts
                RIGHT JOIN ffc_parts_color
                ON ffc_parts.ID=ffc_parts_color.parts_id
            `
        });
        /*
        const result = await excuteQuery({
            query: 'SELECT * FROM ffc_parts'
        });
        */
        //console.log( result );
        res.status(200).json({ items: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}
  