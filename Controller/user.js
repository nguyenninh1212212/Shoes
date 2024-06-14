const database = require('../db/DB');
const pool = database.pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const randomstring=require('randomstring').generate()
dotenv.config();

async function hash(password){
    const salt =await bcrypt.genSalt(10)
    const hash =await bcrypt.hash(password,salt)
    return hash
}

const generateToken = (id_customer) => {
    return jwt.sign({ id_customer }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

const UserController = {
    Login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const [a_user] = await pool.query(`SELECT username, password, id_customer FROM customer WHERE username = ?`, [username]);

            if (!a_user || a_user.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const storedPassword = a_user[0].password;
            const isPasswordValid = await bcrypt.compare(password, storedPassword);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Wrong password" });
            }

            const id_customer = a_user[0].id_customer;
            const token = generateToken(id_customer);

            return res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    Create_Account:async(req,res)=>{
        const {username,password}=req.body;

        try{
            const hashedPassword = await hash(password)
            var id_customer = "".concat("User",randomstring)
            const [result]=await pool.query(`INSERT INTO customer VALUES(?,?,?)`,[id_customer,username,hashedPassword])


            res.status(201).json(result)
        }
        catch(err){
            console.log(err);
        }
    },

    Delete_Account:async(req,res)=>{
        const id=req.params.id
        try{
            const [result]=await pool.query(`DELETE FROM customer WHERE id_customer=?`,[id])
            res.status(204).json(result)
        }
        catch(err){
            console.log(err);
        }
    },

    Update_Account: async (req, res) => {
        const id = req.params.id;
        const { column } = req.body;
        let value=req.body
    
        try {
            
            if (column === "password") {
                if(typeof hashedPassword !=='string'){
                    value = await hash(value.toString());
                }else{
                    value = await hash(value);
                }
            }
    
            const [result] = await pool.query(`UPDATE customer SET ?? = ? WHERE id_customer = ?`, [column, value, id]);
            res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server error' });
        }
    }


};

module.exports = UserController;
