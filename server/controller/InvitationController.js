const Attempt = require("../Modals/AttemptSchema");
const Invitation = require("../Modals/InvitationModal");
const Test = require("../Modals/TestModal");
const { v4: uuidv4 } = require('uuid');

const Question = require('../Modals/QuestionModal');
const cloudinary = require('../config/CloudinaryConfig');

// Save individual question answer
const saveQuestion = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);


    const { token, questionId, answer } = req.body;
    console.log(answer);
    
    const answerFile = req.files?.file?.[0]; // uploaded answer file
    const videoFile = req.files?.video?.[0]; // video chunk
    console.log("i am answer", answerFile);

    console.log("i am video", videoFile);


    if (!token || !questionId) {
      return res.status(400).json({ FailureMessage: "Token and questionId are required" });
    }

    // Find invitation
    const invitation = await Invitation.findOne({ token });
    if (!invitation) {
      return res.status(404).json({ FailureMessage: "Invalid or expired token" });
    }

    if (invitation.status === 'completed') {
      return res.status(400).json({ FailureMessage: "Test already completed" });
    }
    const userEmail = 'amiranas7612gmail.com'
    // Find or create attempt
    let attempt = await Attempt.findOne({ invitation: invitation._id });
    if (!attempt) {
      const test = await Test.findById(invitation.test);
      attempt = new Attempt({
        test: test._id,
        invitation: invitation._id,
        userEmail: userEmail,
        answers: [],
        score: 0,
        passed: false
      });
    }

    // Find the question
    const question = await Question.findById(questionId);
    console.log("i am question",question);
    
    if (!question) {
      return res.status(404).json({ FailureMessage: "Question not found" });
    }

    // Upload files to Cloudinary if present
    let answerFileUrl = null;
    let answerVideoUrl = null;

   
    // Calculate if answer is correct (only for MCQ and image questions)
    let isCorrect = null;
    if (question.type === 'mcq' || question.type === 'image') {
      isCorrect = question.correctAnswer === answer;
    }
    // For file/input questions, we don't calculate correctness yet

    // Find existing answer for this question or create new one
    const existingAnswerIndex = attempt.answers.findIndex(
      ans => ans.question.toString() === questionId
    );
    let selectedAnswer=''
    if(question.type==='input' || question.type==='file' ){
      selectedAnswer=''
    }
    else{
      selectedAnswer=answer || ''
    }

    const answerData = {
      question: questionId,
      selectedAnswer: selectedAnswer,
      isCorrect,
       AnswerFileUrl: answerFile?.path || '',
      AnswerVideoUrl: videoFile.path || ''
    };

    if (existingAnswerIndex >= 0) {
      // Update existing answer
      attempt.answers[existingAnswerIndex] = answerData;
    } else {
      // Add new answer
      attempt.answers.push(answerData);
    }

    // Recalculate score (only count MCQ and image questions)
    const scorableQuestions = attempt.answers.filter(ans => ans.isCorrect !== null);
    const correctAnswers = scorableQuestions.filter(ans => ans.isCorrect === true);
    const totalScorable = await Question.countDocuments({
      _id: { $in: attempt.answers.map(ans => ans.question) },
      type: { $in: ['mcq', 'image'] }
    });

    if (totalScorable > 0) {
      attempt.score = (correctAnswers.length / totalScorable) * 100;
    }

    await attempt.save();

    res.status(200).json({
      SuccessMessage: "Answer saved successfully",
      answerId: answerData.question
    });

  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({
      FailureMessage: "Internal Server Error",
      error: error.message
    });
  }
};

// Submit final test and merge videos
const submitTestFinal = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ FailureMessage: "Token is required" });
    }

    // Find invitation and attempt
    const invitation = await Invitation.findOne({ token });
    if (!invitation) {
      return res.status(404).json({ FailureMessage: "Invalid or expired token" });
    }

    if (invitation.status === 'completed') {
      return res.status(400).json({ FailureMessage: "Test already completed" });
    }

    const attempt = await Attempt.findOne({ invitation: invitation._id });
    if (!attempt) {
      return res.status(404).json({ FailureMessage: "No attempt found" });
    }

    // Get all video URLs from answers
    // const videoUrls = attempt.answers
    //   .filter(answer => answer.AnswerVideoUrl)
    //   .map(answer => answer.AnswerVideoUrl);

    // let mergedVideoUrl = null;

    // // Merge videos if there are any
    // if (videoUrls.length > 0) {
    //   try {
    //     mergedVideoUrl = await mergeVideos(videoUrls, token);
    //   } catch (error) {
    //     console.error('Error merging videos:', error);
    //     // Continue with submission even if video merge fails
    //   }
    // }

    // Calculate final score and passing status
    const test = await Test.findById(invitation.test).populate('questions');
    const scorableAnswers = attempt.answers.filter(ans => ans.isCorrect !== null);
    const correctAnswers = scorableAnswers.filter(ans => ans.isCorrect === true);
    const totalquestions=test.questions.filter((question)=>{return (question.type==='mcq' || question.type==='image')})
    console.log("hi i am total questions",totalquestions);
    

    let finalScore = 0;
    if (totalquestions.length > 0) {
      finalScore = (correctAnswers.length / totalquestions.length) * 100;
    }

    const passed = finalScore >= (test.passingScore || 50);

    // Update attempt with final data
    await Attempt.updateOne(
      { _id: attempt._id },
      {
        $set: {
          score: finalScore,
          passed: passed,
          // MergedVideoUrl: mergedVideoUrl,
          submittedAt: new Date()
        }
      }
    );

    // Mark invitation as completed
    await Invitation.updateOne(
      { _id: invitation._id },
      {
        $set: {
          status: 'completed',
          completedAt: new Date()
        }
      }
    );

    res.status(200).json({
      SuccessMessage: "Test submitted successfully",
      score: finalScore,
      passed: passed,
      attemptId: attempt._id,
      // mergedVideoUrl: mergedVideoUrl
    });

  } catch (error) {
    console.error('Error in submitTestFinal:', error);
    res.status(500).json({
      FailureMessage: "Internal Server Error",
      error: error.message
    });
  }
};

// Helper function to merge videos using Cloudinary
const mergeVideos = async (videoUrls, token) => {
  try {
    if (videoUrls.length === 0) return null;
    if (videoUrls.length === 1) return videoUrls[0];

    // Extract public IDs from Cloudinary URLs
    const publicIds = videoUrls.map(url => {
      const parts = url.split('/');
      const fileWithExt = parts[parts.length - 1];
      return fileWithExt.split('.')[0];
    });

    // Create concatenation transformation
    let transformation = '';
    publicIds.forEach((id, index) => {
      if (index === 0) {
        transformation = `video:${id}`;
      } else {
        transformation += `/du_5/video:${id}`;
      }
    });

    // Generate merged video URL
    const mergedPublicId = `merged_test_${token}_${Date.now()}`;

    // Upload merged video to Cloudinary
    const mergedUrl = cloudinary.url(mergedPublicId, {
      resource_type: 'video',
      format: 'mp4',
      transformation: [
        { flags: 'splice', overlay: transformation }
      ]
    });

    // Actually create the merged video by uploading
    const mergeResult = await cloudinary.uploader.upload(mergedUrl, {
      resource_type: 'video',
      public_id: mergedPublicId,
      overwrite: true
    });

    return mergeResult.secure_url;

  } catch (error) {
    console.error('Error merging videos:', error);
    throw error;
  }
};

// Get invitation status
// const getInvitationStatus = async (req, res) => {
//   try {
//     const { token } = req.params;

//     const invitation = await Invitation.findOne({ token });
//     if (!invitation) {
//       return res.status(404).json({ FailureMessage: "Invalid token" });
//     }

//     res.status(200).json({
//       status: invitation.status,
//       completedAt: invitation.completedAt
//     });
//   } catch (error) {
//     console.error('Error getting invitation status:', error);
//     res.status(500).json({
//       FailureMessage: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Get all attempts (existing function)
// const getAllAttempts = async (req, res) => {
//   try {
//     const attempts = await Attempt.find()
//       .populate('test', 'name description')
//       .populate('invitation', 'userEmail')
//       .populate({
//         path: 'answers.question',
//         select: 'question type part'
//       })
//       .sort({ submittedAt: -1 });

//     res.status(200).json({
//       SuccessMessage: "Attempts retrieved successfully",
//       attempts: attempts
//     });
//   } catch (error) {
//     console.error('Error getting attempts:', error);
//     res.status(500).json({
//       FailureMessage: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// Send invitation (existing function - assuming it exists)
// const sendInvitation = async (req, res) => {
//   try {
//     // Your existing send invitation logic here
//     res.status(200).json({ SuccessMessage: "Invitation sent successfully" });
//   } catch (error) {
//     console.error('Error sending invitation:', error);
//     res.status(500).json({
//       FailureMessage: "Internal Server Error",
//       error: error.message
//     });
//   }
// };



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

const sendBulkInvitations = async (req, res) => {
  try {
    const { candidates, testId } = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ FailureMessage: 'Test not found' });
    }

    // sab ke liye token aur invitation banao
    const invitations = await Promise.all(
      candidates.map(async (candidate) => {
        const token = uuidv4();
        const newInvitation = new Invitation({
          email: candidate.email,
          name: candidate.name,
          position: candidate.position,
          test: testId,
          token,
        });
        await newInvitation.save();

        return {
          ...newInvitation.toObject(),
          testLink: `http://localhost:5173/test-link/${token}`,
        };
      })
    );
    console.log(invitations);
    

    res.status(201).json({
      SuccessMessage: 'Bulk invitations sent successfully',
      invitations,
    });
  } catch (error) {
    console.error('Error sending bulk invitations:', error);
    res.status(500).json({ FailureMessage: 'Internal Server Error' });
  }
};


// const submitAttempt = async (req, res) => {
//   try {
//     console.log('Request Body:', req.body);
//     console.log('Request File:', req.file);


//     // Get data from form

//     const token = req.body.token;
//     const answers = JSON.parse(req.body.answers)

//     const videoFile = req.file; // This contains the uploaded video info

//     if (!token || !answers) {
//       return res.status(400).json({ FailureMessage: "Token and answers are required" });
//     }

//     const userEmail = 'amiranas761@gmail.com'; // You might want to get this dynamically

//     // Token to Test + Invitation
//     const invitation = await Invitation.findOne({ token });
//     if (!invitation) return res.status(404).json({ FailureMessage: "Invalid or expired token" });

//     if (invitation.status === 'completed') {
//       return res.status(400).json({ FailureMessage: "You have already completed the test" });
//     }

//     const test = await Test.findById(invitation.test).populate('questions');
//     if (!test) return res.status(404).json({ FailureMessage: "Test not found" });

//     // Evaluate Answers
//     let correctCount = 0;
//     const answerArray = [];

//     for (const question of test.questions) {
//       const selectedAnswer = answers[question._id];
//       const isCorrect = question.correctAnswer === selectedAnswer;

//       if (isCorrect) correctCount++;

//       answerArray.push({
//         question: question._id,
//         selectedAnswer,
//         isCorrect,
//       });
//     }

//     const score = (correctCount / test.questions.length) * 100;
//     const passed = score >= test.passingScore;

//     // Get video URL from Cloudinary
//     const videoUrl = req.file?.path || null;

//     const attempt = new Attempt({
//       test: test._id,
//       invitation: invitation._id,
//       userEmail,
//       answers: answerArray,
//       score,
//       passed,
//       videoUrl
//     });

//     await attempt.save();
//     await Invitation.updateOne({ _id: invitation._id }, {
//       $set: {
//         status: 'completed',
//         completedAt: new Date()
//       }
//     });

//     res.status(200).json({
//       SuccessMessage: "Attempt submitted successfully",
//       score,
//       passed,
//       attemptId: attempt._id,
//       videoUrl,
//     });
//   } catch (err) {
//     console.error('Error in submitAttempt:', err);
//     res.status(500).json({
//       FailureMessage: "Internal Server Error",
//       error: err.message
//     });
//   }
// };


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
// const deleteAllAttempts = async (req, res) => {
//   try {
//     const attempts = await Attempt.find();

//     // Use Promise.all to handle multiple async deletions
//     await Promise.all(
//       attempts.map((value) =>
//         Attempt.deleteOne({ _id: value._id })
//       )
//     );

//     res.status(200).json({ message: 'Deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const getInvitationStatus = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(400).json({ FailureMessage: "No invite found" })
    }
    const status = await Invitation.findOne({ token: token }, { status: 1, _id: 0 })
    res.status(200).json(status)
  } catch (error) {
    res.status(500).jsn({ FailureMessage: "Internal Server error" })

  }
}



module.exports = { sendInvitation, saveQuestion, submitTestFinal, mergeVideos, getAllAttempts, getInvitationStatus ,sendBulkInvitations}
