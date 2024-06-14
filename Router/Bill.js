const Router=require('express').Router()
const BillController=require('../Controller/Bill_controller')
const MiddlewareController=require('../Controller/middlewareController')

Router.get("/",BillController.Get_bills)
Router.get("/:id",MiddlewareController.Verify_User,BillController.Get_bill)
Router.post("/create",BillController.Create_bill)
Router.get("/delete/:id",MiddlewareController.Verify_User,BillController.Delete_Bill)

module.exports=Router