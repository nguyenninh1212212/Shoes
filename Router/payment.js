const Router=require('express').Router()
const payment_controller=require('../Controller/payment_controller')
const middlewareController=require('../Controller/middlewareController')

Router.get("/",middlewareController.Verify_token,payment_controller.Get_Payment)
Router.post("/create",middlewareController.Verify_token,payment_controller.Create_Payment)

module.exports=Router