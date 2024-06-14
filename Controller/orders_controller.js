const pool=require('../db/DB').pool
var randomstring=require('randomstring').generate()

const orders_controller={
    Create_order :async(req,res)=>{
        const {id_customer,status,total_amount}=req.body
        try{
            var id_order="".concat("OD",randomstring);
            const [rows]=await pool.query(`INSERT INTO orders(id_order,id_customer,status,total_amount) VALUES(?,?,?,?)`,[id_order,id_customer,status,total_amount])
            res.status(200).json(rows)
        }
        catch(err){
            console.log(err);
        }
    },
    Get_orders :async(req,res)=>{
        try{
            const [rows]=await pool.query(`SELECT * FROM orders`)
            res.status(200).json(rows)
        }
        catch(err){
            console.log(err);
        }
    },
    Delete_order :async(req,res)=>{
        try{
            const id_customer=req.user.id_customer
            const [rows]=await pool.query(`DELETE FROM orders WHERE id_customer = ?`,[id_customer])
            res.status(200).json(rows)
        }
        catch(err){
            console.log(err);
        }
    },
}

module.exports = orders_controller