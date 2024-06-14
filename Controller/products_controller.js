const database=require('../db/DB');
let randomstring=require('randomstring').generate()
const pool=database.pool;
const ProductController={
    Get_Product :async(req,res)=>{
        const ID=req.params.id;
        try{
            const [result]=await pool.query(`SELECT * FROM product WHERE id_product  = ?`,[ID])
            res.status(201).json(result)
        }
        catch(err){
            console.log(err);
        }
    },

    Get_Products :async(req,res)=>{
        try{
            const [result]=await pool.query(`SELECT * FROM product `)
            res.status(201).json(result)
        }
        catch(err){
            console.log(err);
        }
    },

    Create_Product :async(req,res)=>{
        const {name_product,price,detail,origin,size,image_product,quantity}=req.body
        try{
            let id_product="".concat("Product",randomstring)
            const [result]=await pool.query(`INSERT INTO product VALUES(?,?,?,?,?,?,?,?)`,[id_product,name_product,price,detail,origin,size,image_product,quantity])
            res.status(201).json(result)
        }
        catch(err){
            console.log(err);
        }
    },

    Update_Product :async(req,res)=>{
        const ID=req.params.id
        const {column,value}=req.body
        try{
            const [result]=await pool.query(`UPDATE product SET ?? = ? WHERE id_product  = ?  `,[column,value,ID])
            res.status(204).json(result)
        }
        catch(err){
            console.log(err);
        }
    },

    Delete_Product :async(req,res)=>{
        const ID=req.params.id
        try{
            const [result]=await pool.query(`DELETE FROM product WHERE id_product = ?`,[ID])
            res.status(204).json(result)
        }
        catch(err){
            console.log(err);
        }
    },
   

}

module.exports=ProductController