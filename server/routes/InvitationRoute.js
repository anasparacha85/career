const express = require('express')
const InvitationController = require('../controller/InvitationController')
const upload = require('../config/CloudinaryConfig')

const InvitationRouter = express.Router()
InvitationRouter.route('/sendInvite').post(InvitationController.sendInvitation)

InvitationRouter.route('/getAllAttempts').get(InvitationController.getAllAttempts)
InvitationRouter.route('/submitTest').post(
    upload.single('video'),
    InvitationController.submitAttempt
);
 InvitationRouter.route('/delete').delete(InvitationController.deleteAllAttempts)
InvitationRouter.route('/getInviteStatus/:token').get(InvitationController.getInvitationStatus)
module.exports = InvitationRouter