const Attempt = require("../Modals/AttemptSchema")
const Invitation = require("../Modals/InvitationModal")

const getAllInvites=async(req,res)=>{
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

    const { score, passed, userEmail, videoUrl, test, answers, submittedAt } = attempt;

    const correctCount = answers.filter(ans => ans.isCorrect).length;
    const incorrectCount = answers.length - correctCount;
    const totalQuestions = answers.length;

    const questionDetails = answers.map(ans => ({
      questionText: ans.question?.question || "Question deleted",
      options: ans.question?.options || [],
      correctAnswer: ans.question?.correctAnswer || "",
      selectedAnswer: ans.selectedAnswer || "",
      isCorrect: ans.isCorrect
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



module.exports={getAllInvites,getAttemptsByInvitationId}