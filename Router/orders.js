const Router=require('express').Router()
const orders_controller=require('../Controller/orders_controller')
const middlewareController=require('../Controller/middlewareController')

Router.get("/",middlewareController.Verify_token,orders_controller.Get_orders)
Router.delete("/delete",middlewareController.Verify_token,orders_controller.Delete_order)
Router.post("/create",middlewareController.Verify_token,orders_controller.Create_order)

module.exports=Router