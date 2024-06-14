const db=require('../db/DB')
const pool=db.pool  
var randomstring=require('randomstring').generate()

const order_Detail_Controller={
    Get_order_detail : async(req,res)=>{
        try{
            const get_id_order=await pool.query(`SELECT id_order FROM orders WHERE id_customer = ?`,[req.user.id_customer])
            const getOrderDetail=await pool.query(`SELECT * FROM order_detail WHERE id_order = ?`,[get_id_order])
            res.status(200).json(getOrderDetail)
        }
        catch(err){
            console.log(err);
        }
    },

    Create_order_detail : async(req,res)=>{
        const {id_product,quantity,price}=req.body
        try{
            const get_id_order=await pool.query(`SELECT id_order FROM orders WHERE id_customer = ?`,[req.user.id_customer])
            var id_order_detail="".concat("ODD",randomstring)
            const getOrderDetail=await pool.query(`INSERT INTO order_detail VALUES (?,?,?,?,?)`,[id_order_detail,get_id_order,id_product,quantity,price])
            res.status(200).json(getOrderDetail)
        }
        catch(err){
            console.log(err);
        }
    },

    Delete_order_detail : async(req,res)=>{
        try{
            const get_id_order=await pool.query(`SELECT id_order FROM orders WHERE id_customer = ?`,[req.user.id_customer])
            const getOrderDetail=await pool.query(`DELETE FROM order_detail WHERE id_order = ?`,[get_id_order])
            res.status(200).json(getOrderDetail)
        }
        catch(err){
            console.log(err);
        }
    },
}

module.exports=order_Detail_Controller