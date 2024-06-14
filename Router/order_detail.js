const Router=require('express').Router()
const order_detail_controller=require('../Controller/order_detail_controller')
const middlewareController=require('../Controller/middlewareController')

Router.get("/",middlewareController.Verify_token,order_detail_controller.Get_order_detail)
Router.delete("/delete",middlewareController.Verify_token,order_detail_controller.Delete_order_detail)
Router.post("/create",middlewareController.Verify_token,order_detail_controller.Create_order_detail)

module.exports=Router