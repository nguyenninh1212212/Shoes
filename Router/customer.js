const Router=require('express').Router()
const CustomerController=require("../Controller/customer_controller")
const middlewareController=require("../Controller/middlewareController")

Router.get("/",middlewareController.Verify_token,CustomerController.Get_Notes)
Router.get("/:id",middlewareController.Verify_User,CustomerController.Get_Note)
Router.post("/addInfor",middlewareController.Verify_token,CustomerController.Create_Information)


module.exports=Router