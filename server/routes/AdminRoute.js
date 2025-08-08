const express=require('express')
const AdminRouter=express.Router()
const AdminController=require('../controller/AdminController')
AdminRouter.route('/getInvite/:testid').get(AdminController.getAllInvites)
AdminRouter.route('/attemptByInvite/:inviteId').get(AdminController.getAttemptsByInvitationId)
module.exports=AdminRouter