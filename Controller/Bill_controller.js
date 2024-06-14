const DB=require('../db/DB')
var randomstring=require('randomstring').generate()
const pool=DB.pool

const BillController={
    Get_bills: async(req,res)=>{
        try{
            const [a_bill]=await pool.query(`SELECT * FROM bill`)
            res.status(200).json(a_bill)
        }catch(err){
            console.log(err);
        }
    },
    Get_bill: async(req,res)=>{
        const id_bill=req.params.id
        try{
            const [a_bill]=await pool.query(`SELECT * FROM bill WHERE id_bill = ?`,[id_bill])
            res.status(200).json(a_bill)
        }catch(err){
            console.log(err);
        }
    },
    Create_bill: async(req,res)=>{
        const {id_customer,id_product}=req.body
        try{
            var id_bill="".concat("Bill",randomstring)
            const product=await pool.query(`SELECT name_product FROM product WHERE id_product = ?`,[id_product]);
            const customer=await pool.query(`SELECT name_customer customer WHERE id_customer = ?`,[id_customer]);
            const name_product=product.name_customer
            const name_customer=customer.name_customer
            const [a_bill]=await pool.query(`INSERT INTO bill VALUES (?,?,?,?,?)`,[id_bill,name_product,name_customer,id_product,id_customer])
            res.status(200).json(a_bill)
        }catch(err){
            console.log(err);
        }
    },

    Delete_Bill: async(req,res)=>{
        const id_bill=req.params.id
        try{
            const [result]=await pool.query(`DELETE FROM bill WHERE id_bill = ?`,[id_bill])
            res.status(204).json(result);
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports=BillController