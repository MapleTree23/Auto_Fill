import mysql from 'serverless-mysql';
/**
 * username = doadmin
password = cswhmcrv8jh78q29
host = ffc-production-db-do-user-1560502-0-7ffb.b.db.ondigitalocean.com
port = 25060
database = defaultdb
sslmode = REQUIRED
 */

const db = mysql({
    config: {
        host: "ffc-production-db-do-user-1560502-0-7ffb.b.db.ondigitalocean.com",
        port: 25060,
        database: "ffc-production",
        user: "doadmin",
        password: "cswhmcrv8jh78q29",
        //insecureAuth : true
        sslmode:"REQUIRED"
      }
})

/*
const db = mysql({
  config: {
      host: "localhost",
      port: 3306,
      database: "michael",
      user: "root",
      password: "",
    }
})
*/
export default async function executeQuery({query,values}){
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
      } catch (error) {
        return { error };
      }
}