// models/Question.js
const mongoose=require('mongoose')

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Question = new mongoose.model("Question", QuestionSchema);
module.exports= Question;
