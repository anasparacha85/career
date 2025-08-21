const express = require('express');
const InvitationController = require('../controller/InvitationController');
const upload = require('../config/CloudinaryConfig');

const InvitationRouter = express.Router();

// Send invitation
InvitationRouter.route('/sendInvite').post(InvitationController.sendInvitation);
// Send Bulk Invitation
InvitationRouter.route('/sendBulkInvites').post(InvitationController.sendBulkInvitations)
// Get all attempts
InvitationRouter.route('/getAllAttempts').get(InvitationController.getAllAttempts);

// Save individual question answer (new route)
InvitationRouter.route('/saveQuestion').post(
  upload.fields([
    { name: 'file', maxCount: 1 },    // answer file
    { name: 'video', maxCount: 1 }    // video chunk
  ]),
  InvitationController.saveQuestion
);

// Submit final test
InvitationRouter.route('/submitTestFinal').post(
  InvitationController.submitTestFinal
);

// Get invitation status
InvitationRouter.route('/getInviteStatus/:token').get(InvitationController.getInvitationStatus);

// Delete all attempts (commented out as in original)
// InvitationRouter.route('/delete').delete(InvitationController.deleteAllAttempts);

module.exports = InvitationRouter;