const customer=require("../Router/customer")
const product=require("../Router/product")
const user=require("../Router/User")
const bill=require("../Router/Bill")
const orders=require("../Router/orders")
const order_detail=require("../Router/order_detail")
const payment=require("../Router/payment")
const express=require('express')

function Sever(app){
    app.use(express.json())

    app.get("/",(req,res)=>{
        res.status(505).send("Welcome")     
    })
    app.use("/customer",customer)
    app.use("/products",product)
    app.use("/login",user)
    app.use("/bill",bill)
    app.use("/orders",orders)
    app.use("/order_detail",order_detail)
    app.use("/payment",payment)
}

module.exports = Sever