const Attempt = require("../Modals/AttemptSchema")
const Invitation = require("../Modals/InvitationModal")
const Test = require("../Modals/TestModal")

const getInvitesByTestId=async(req,res)=>{
   try {
    const id=req.params.testid
    const invitations = await Invitation.find({test:id})
    if (invitations.length <= 0) {
      return res.status(404).json({ FailureMessage: "No Invitation found" })
    }
    res.status(200).json(invitations)
  } catch (error) {
    
    res.status(500).json({ FailureMessage: "Internal Server Error" })

  }
}
// for admin and HR purpose
const getAllTest=async(req,res)=>{
  try {
    const userId=req.user._id
    const TestData=await Test.find({_id:userId});
    if(TestData.length<=0){
      return res.status(400).json({FailureMessage:"No Tests Found"})
    }
    res.status(200).json(TestData);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({FailureMessage:"Internal Server error"})
    
  }
}


const getAttemptsByInvitationId = async (req, res) => {
  try {
    const inviteId = req.params.inviteId;
    if (!inviteId) {
      return res.status(403).json({ FailureMessage: "No id found" });
    }

    // Find attempt and populate test + answers.question
    const attempt = await Attempt.findOne({ invitation: inviteId })
      .populate('test')
      .populate('answers.question');

    if (!attempt) {
      return res.status(403).json({ FailureMessage: "No Attempt found" });
    }
    console.log(attempt);
    

    const { score, passed, userEmail, videoUrl, test, answers, submittedAt } = attempt;

    const correctCount = answers.filter(ans => ans.isCorrect).length;
    const incorrectCount = null;
    const totalQuestions = answers.length;

    const questionDetails = answers.map(ans => ({
      questionText: ans.question?.question || "Question deleted",
      questionFile:ans.question.questionFile || "no file",
      referenceFile:ans.question.answerFile || "no file",
      options: ans.question?.options || [],
      correctAnswer: ans.question?.correctAnswer || "",
      selectedAnswer: ans.selectedAnswer || "",
      isCorrect: ans.isCorrect,
      AnswerFileUrl:ans.AnswerFileUrl || "",
      AnswerVideoUrl:ans.AnswerVideoUrl || "",
      questionType:ans.question.type || "",
      questionImage:ans.question.image || "no image"

    }));

    const formattedAttempt = {
      userEmail,
      videoUrl,
      score,
      passed,
      correctCount,
      incorrectCount,
      totalQuestions,
      passingScore: test.passingScore,
      testName: test.name,
      completionDate: new Date(submittedAt).toLocaleDateString(),
      timeTaken: "N/A", // You can calculate if you have start/end timestamps
      questionDetails
    };

    return res.status(200).json(formattedAttempt);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ FailureMessage: "Internal Server error" });
  }
};

const getTestbyId=async(req,res)=>{
  try {
    const id=req.params.id;
    if(!id){
      res.status(403).json({FailureMessage:"Invalid test id"})
    }
    const testdata=await Test.findOne({_id:id}).populate('questions')
    if(!testdata){
      return res.status(400).json({FailureMessage:"Can't found test"})
    }
    res.status(200).json(testdata)
  } catch (error) {
    console.log(error);
    res.status(500).json({FailureMessage:"Internal server error"})
    
  }

}


module.exports={getInvitesByTestId,getAttemptsByInvitationId,getTestbyId}