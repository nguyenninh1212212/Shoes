const database=require('../db/DB')
const pool=database.pool
const bcrypt=require('bcrypt')


const CustomerController={
    Get_Notes:async (req,res)=>{
        const {username,password}=req.body
        try{          
         if(username=="Admin" && password=="admin" ){
           const Admin=req.user.id_customer
            const [rows] = await pool.query(`SELECT * FROM customer`);
             res.status(200).json({data:rows,Admin: Admin }); 
         }else{
            res.json("You're not Admin")
         }
        }
        catch(err){
            console.log(err);
        }
    },

    Get_Note:async(req,res)=>{
        const id=req.params.id
        try{
            const [rows]=await pool.query(`select * from customer where id_customer = ?`,[id])
            res.status(200).json(rows)
        }
        catch(err){
            console.log(err);
        }
    },


    Create_Information: async (req, res) => {
        const { name_customer, date_of_birth, conscious, wards, district, area, number_of_phone, email } = req.body;
        try {
            if(req.user || req.user.id_customer){
                
            const id_customer = req.user.id_customer;
    
            const values = [id_customer, name_customer, date_of_birth, conscious, wards, district, area, number_of_phone, email];
            const [result] = await pool.query(`INSERT INTO information_customer (id_customer, name_customer, date_of_birth, conscious, wards, district, area, number_of_phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, values);
    
            res.status(201).json(result);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    
  
}


module.exports=CustomerController