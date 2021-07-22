import excuteQuery from "../../../lib/PurchaseSystemDB"

export default async function handler(req, res) {
    try{
        const result = await excuteQuery({
            query: `
                SELECT ffc_parts.ID,ffc_parts.name,ffc_parts_color.ID as color_ID, ffc_parts_color.color_code
                FROM ffc_parts
                RIGHT JOIN ffc_parts_color
                ON ffc_parts.ID=ffc_parts_color.parts_id
            `
        });
        res.status(200).json({ items: result})
    }catch(e){
        res.status(400).json({ success: false, error: e });
        throw e;
    }
}
  