const express=require('express')
const userCtl=require('../../controllers/userController');
const router=express.Router();
const error_handler=require("../../middleware/error_handler");

const Picture_upload=require("../../middleware/multer");
const auth_validate=require("../../middleware/auth_validate");
const userValidator=require("../../controllers/validators/uservalidator")


router.post("/signup",userValidator.signupValidator,Picture_upload,userCtl.signupController,error_handler)
router.post("/login",userValidator.loginValidator,userCtl.loginController,error_handler)
router.post("/changePassword",auth_validate,userValidator.changePasswordValidator,userCtl.changePassword,error_handler)
router.post("/changePrivilege",auth_validate,userValidator.changePrivilegeValidator,userCtl.changePrivilegeController,error_handler)
router.post("/resetpassword", userCtl.resetPwdController,error_handler)
router.post("/changeProfilePicture",auth_validate,userValidator.changeProfilePicture,Picture_upload, userCtl.changeProfilePicture,error_handler)
router.post("/tokencheck", userCtl.tokenCheck,error_handler)
router.get("/getUsers",userValidator.getUsers, userCtl.getUsers,error_handler)


module.exports=router