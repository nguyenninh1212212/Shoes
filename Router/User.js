const Router=require('express').Router()
const middlewareController=require('../Controller/middlewareController')
const UserController=require('../Controller/user')

Router.post('/',UserController.Login);
Router.post('/create',UserController.Create_Account)
Router.put('/update/:id',middlewareController.Verify_User,UserController.Update_Account)
Router.delete('/delete/:id',middlewareController.Verify_User,UserController.Delete_Account)

module.exports=Router