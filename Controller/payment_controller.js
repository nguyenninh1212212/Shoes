const pool=require('../db/DB').pool
var randomstring=require('randomstring').generate()

const Payment_controller={
    Create_Payment : async(req,res)=>{
        const {payment_date,payment_status,payment_method}=req.body
        try{
            const get_id_customer=req.user.id_customer
            const get_id_order= await pool.query(`SELECT id_order FROM orders WHERE id_customer = ?`,[get_id_customer])
            var id_payment=randomstring;
            const [row]=await pool.query(`INSERT INTO payment VALUES (?,?,?,?,?)`,[id_payment,get_id_order,payment_method,payment_status,payment_date])
            res.status(200).json(row)
        }catch(err){
            console.log(err);
        }
    },
    Get_Payment : async(req,res)=>{
        try{
            const get_id_customer=req.user.id_customer
            const get_id_order= await pool.query(`SELECT id_order FROM orders WHERE id_customer = ?`,[get_id_customer])
            const [result]=await pool.query(`SELECT * FROM payment WHERE id_order = ?`,[get_id_order])
            res.status(200).json(result)
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports =Payment_controller