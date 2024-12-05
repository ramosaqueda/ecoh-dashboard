import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const {DB_USER, DB_PASSWORD, DB_CONNECT_STRING} = process.env;

export async function initialize () {
    try {
        await oracledb.createPool ({
            user: DB_USER,
            password: DB_PASSWORD,
            connectString: DB_CONNECT_STRING
        });
        console.log("Conexión a ORACLE exitosa");
    } catch (err) {
        console.error('Error al conectar a ORACLE: ', err);
    }
}

export async function executeQuery(query: String) {
    let connection;

    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(query);
        return result.rows;
        
    } catch (err) {
        console.error('Error al conectar a ORACLE: ', err);
    } finally {
        if (connection) {
           try {
            await connection.close();
           } catch (err) {
            console.error("Error al cerrar la conexión: ", err);
           }
        }
    }
}

