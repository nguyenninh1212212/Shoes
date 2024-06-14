var mysql=require('mysql2')

const dotenv=require('dotenv')
dotenv.config()

var pool=mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
}).promise()

async function checkConnection() {
    try {
        await pool.query('SELECT 1');
        console.log('Connected to the MySQL database successfully.');
    } catch (error) {
        console.error('Unable to connect to the MySQL database:', error);
    }
}




module.exports={checkConnection,pool}