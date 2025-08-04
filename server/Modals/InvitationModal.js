const mongoose=require('mongoose')

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    require:true

  },
  position:{
    type:String,
    require:true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  invitedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  }
});

const Invitation =new mongoose.model('Invitation', invitationSchema);
module.exports=Invitation;
