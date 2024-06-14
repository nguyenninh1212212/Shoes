const express=require('express')
const port =3000
const app=express()
const database=require("./db/DB")
const bodyparse=require('body-parser')
const Sever=require("./Router/Main")

app.use(express.json())
app.use(bodyparse.json())
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('something broke!')
})



database.checkConnection()

Sever(app);




app.listen(port,()=>{
    console.log(`app listen at http://localhost:${port}`);
})