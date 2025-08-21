const express=require('express')
const AdminRouter=express.Router()
const AdminController=require('../controller/AdminController')
AdminRouter.route('/getInvite/:testid').get(AdminController.getInvitesByTestId)
AdminRouter.route('/attemptByInvite/:inviteId').get(AdminController.getAttemptsByInvitationId)
AdminRouter.route('/getTestById/:id').get(AdminController.getTestbyId)
module.exports=AdminRouter