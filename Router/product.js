const Router=require('express').Router()
const ProductController=require('../Controller/products_controller')


Router.get("/",ProductController.Get_Products)
Router.get("/:id",ProductController.Get_Product)
Router.post("/create",ProductController.Create_Product)
Router.put("/update/:id",ProductController.Update_Product)
Router.delete("/delete/:id",ProductController.Delete_Product)

module.exports=Router
