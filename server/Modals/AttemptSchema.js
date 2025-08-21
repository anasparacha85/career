const mongoose = require('mongoose');

const AttemptSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  invitation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invitation',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
      selectedAnswer: {
        type: String,
      },
      isCorrect: {
        type: Boolean,
      },
       AnswerVideoUrl: {
        type: String, // cloudinary link for video
      },
      AnswerFileUrl: {
        type: String, // cloudinary link for uploaded PDF/DOC/etc.
      },
    }
  ],
  score: {
    type: Number,
    required: true
  },
  passed: {
    type: Boolean,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  MergedVideoUrl: {
  type: String,
  default: null
}
});

const Attempt = mongoose.model('Attempt', AttemptSchema);
module.exports = Attempt;
