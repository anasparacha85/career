// models/Question.js
const mongoose=require('mongoose')

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String },

  // 👇 new fields
  type: { type: String }, // mcq, image, file, input
  answerType: { type: String }, // MCQs, input, etc.
  category: { type: String },
  subcategory: { type: String },
  part: { type: String },
  source: { type: String }, // custom/template
  difficulty: { type: String },

  questionFile: { type: String }, // agar file upload hogi to iska URL ya path
  answerFile: { type: String },   // user ka uploaded answer file
  image: { type: String },        // base64 ya file ka URL
  inputRequired: [{ type: String }] // jaise tumhare input tasks mai h
}, { timestamps: true });


const Question = new mongoose.model("Question", QuestionSchema);
module.exports= Question;
