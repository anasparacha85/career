const express=require('express')
const InvitationController=require('../controller/InvitationController')
const InvitationRouter=express.Router()
InvitationRouter.route('/sendInvite').post(InvitationController.sendInvitation)
InvitationRouter.route('/submitTest').post(InvitationController.submitAttempt)
InvitationRouter.route('/getAllInvites').get(InvitationController.getAllInvitations)
InvitationRouter.route('/getAllAttempts').get(InvitationController.getAllAttempts)
module.exports=InvitationRouter