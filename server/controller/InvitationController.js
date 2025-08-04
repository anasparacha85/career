const Attempt = require("../Modals/AttemptSchema");
const Invitation = require("../Modals/InvitationModal");
const Test = require("../Modals/TestModal");
const { v4: uuidv4 } = require('uuid'); 


const sendInvitation = async (req, res) => {
  try {
    const { email,name,position, testId } = req.body;

    const test = await Test.findOne({_id:testId});
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
    const { token, answers } = req.body;
    userEmail='amiranas761@gmail.com'

    //   Get testId from token via Invitation collection
    const invitation = await Invitation.findOne({ token });

    if (!invitation) return res.status(404).json({ FailureMessage: "Invalid or expired token" });
    // checking whether the test already submitted or not
    if(invitation.status==='completed'){
        return res.status(400).json({FailureMessage:"you have already completed the test"})
    }
    const test = await Test.findById(invitation.test).populate('questions');
    if (!test) return res.status(404).json({ FailureMessage: "Test not found" });

    //   Check answers
    let correctCount = 0;
    const answerArray = [];

    for (const question of test.questions) {
      const selectedAnswer = answers[question._id];
      const isCorrect = question.correctAnswer === selectedAnswer;

      if (isCorrect) correctCount++;

      answerArray.push({
        question: question._id,
        selectedAnswer,
        isCorrect
      });
    }

    const score = (correctCount / test.questions.length) * 100;
    const passed = score >= test.passingScore;

    const attempt = new Attempt({
      test: test._id,
      userEmail,
      answers: answerArray,
      score,
      passed
    });

    await attempt.save();
    await Invitation.updateOne({_id:invitation._id},{$set:{status:'completed',completedAt: new Date()}})

    res.status(200).json({
      SuccessMessage: "Attempt submitted",
      score,
      passed,
      attemptId: attempt._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ FailureMessage: "Internal Server error" });
  }
};

const getAllInvitations=async(req,res)=>{
    try {
        const invitations=await Invitation.find()
        if(invitations.length<=0){
            return res.status(404).json({FailureMessage:"No Invitation found"})
        }
        res.status(200).json(invitations)
    } catch (error) {
        res.status(500).json({FailureMessage:"Internal Server Error"})
        
    }
}

const getAllAttempts=async(req,res)=>{
    try {
        const attempts=await Attempt.find()
        if(attempts.length<=0){
            return res.status(400).json({FailureMessage:"No Attempts found"})


        }
        res.status(200).json(attempts)
    } catch (error) {
        res.status(500).json({FailureMessage:"Internal server error"})
        
    }
    
    }

module.exports={sendInvitation,submitAttempt,getAllInvitations,getAllAttempts}
