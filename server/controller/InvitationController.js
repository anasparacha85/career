const Attempt = require("../Modals/AttemptSchema");
const Invitation = require("../Modals/InvitationModal");
const Test = require("../Modals/TestModal");
const { v4: uuidv4 } = require('uuid');


const sendInvitation = async (req, res) => {
  try {
    const { email, name, position, testId } = req.body;

    const test = await Test.findOne({ _id: testId });
    if (!test) {
      return res.status(404).json({ FailureMessage: 'Test not found' });
    }

    const token = uuidv4(); // unique token

    const newInvitation = new Invitation({
      email,
      name,
      position,
      test: testId,
      token,
    });

    await newInvitation.save();

    const testLink = `http://localhost:5173/test-link/${token}`;

    // (Optional) Send this link via email

    res.status(201).json({
      SuccessMessage: 'Invitation sent successfully',
      invitation: newInvitation,
      testLink,
    });
  } catch (error) {
    console.error('Error sending invitation:', error);
    res.status(500).json({ FailureMessage: 'Internal Server Error' });
  }
};

const submitAttempt = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);


    // Get data from form
    
    const token=req.body.token;
    const answers=JSON.parse(req.body.answers)
    
    const videoFile = req.file; // This contains the uploaded video info

    if (!token || !answers) {
      return res.status(400).json({ FailureMessage: "Token and answers are required" });
    }

    const userEmail = 'amiranas761@gmail.com'; // You might want to get this dynamically

    // Token to Test + Invitation
    const invitation = await Invitation.findOne({ token });
    if (!invitation) return res.status(404).json({ FailureMessage: "Invalid or expired token" });

    if (invitation.status === 'completed') {
      return res.status(400).json({ FailureMessage: "You have already completed the test" });
    }

    const test = await Test.findById(invitation.test).populate('questions');
    if (!test) return res.status(404).json({ FailureMessage: "Test not found" });

    // Evaluate Answers
    let correctCount = 0;
    const answerArray = [];

    for (const question of test.questions) {
      const selectedAnswer = answers[question._id];
      const isCorrect = question.correctAnswer === selectedAnswer;

      if (isCorrect) correctCount++;

      answerArray.push({
        question: question._id,
        selectedAnswer,
        isCorrect,
      });
    }

    const score = (correctCount / test.questions.length) * 100;
    const passed = score >= test.passingScore;

    // Get video URL from Cloudinary
    const videoUrl = req.file?.path || null;

    const attempt = new Attempt({
      test: test._id,
      invitation: invitation._id,
      userEmail,
      answers: answerArray,
      score,
      passed,
      videoUrl
    });

    await attempt.save();
    await Invitation.updateOne({ _id: invitation._id }, { 
      $set: { 
        status: 'completed', 
        completedAt: new Date() 
      } 
    });

    res.status(200).json({
      SuccessMessage: "Attempt submitted successfully",
      score,
      passed,
      attemptId: attempt._id,
      videoUrl,
    });
  } catch (err) {
    console.error('Error in submitAttempt:', err);
    res.status(500).json({ 
      FailureMessage: "Internal Server Error",
      error: err.message 
    });
  }
};


const getAllAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find()
    if (attempts.length <= 0) {
      return res.status(400).json({ FailureMessage: "No Attempts found" })


    }
    res.status(200).json(attempts)
  } catch (error) {
    res.status(500).json({ FailureMessage: "Internal server error" })

  }

}
const deleteAllAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find();
    
    // Use Promise.all to handle multiple async deletions
    await Promise.all(
      attempts.map((value) =>
        Attempt.deleteOne({ _id: value._id })
      )
    );

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getInvitationStatus=async(req,res)=>{
  try {
    const token=req.params.token;
    if(!token){
      return res.status(400).json({FailureMessage:"No invite found"})
    }
    const status=await Invitation.findOne({token:token},{status:1,_id:0})
    res.status(200).json(status)
  } catch (error) {
    res.status(500).jsn({FailureMessage:"Internal Server error"})
    
  }
}



module.exports = { sendInvitation, submitAttempt,  getAllAttempts ,deleteAllAttempts,getInvitationStatus}
