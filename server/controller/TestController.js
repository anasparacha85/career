const Invitation = require("../Modals/InvitationModal");
const  Question  = require("../Modals/QuestionModal");
const Test = require("../Modals/TestModal");


 const createTest = async (req, res) => {
  try {
    const { name, description, duration, passingScore, questions } = req.body;
    if(!name || !description || !duration || !passingScore || !questions.length){
        return res.status(400).json({FailureMessage:"please fill all the fields"})
    }

    // Step 1: Save each question and collect its ID
    const questionDocs = await Question.insertMany(
      questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      }))
    );

    const questionIds = questionDocs.map((q) => q._id); // ObjectIds for Test

    // Step 2: Create and save the Test
    const newTest = new Test({
      name,
      description,
      duration,
      passingScore,
      questions: questionIds,
    });

    await newTest.save();
    const testLink = `http://localhost:5173/test-link/${newTest._id}`;

    res.status(201).json({ SuccessMessage:"Test Created Successfully", test: newTest ,testLink:testLink});
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getTestByToken = async (req, res) => {
    try {
        const token = req.params.token;

        if (!token) {
            return res.status(400).json({ FailureMessage: "Token is required" });
        }

        // Find the invitation with the given token
        const invitation = await Invitation.findOne({ token }).populate({
            path: 'test',
            populate: {
                path: 'questions',
            },
        });

        if (!invitation || !invitation.test) {
            return res.status(404).json({ FailureMessage: "Invalid or expired token" });
        }

        res.status(200).json(invitation.test);

    } catch (error) {
        console.error(error);
        res.status(500).json({ FailureMessage: "Internal Server Error" });
    }
};

const getAllTest=async(req,res)=>{
  try {
    const TestData=await Test.find();
    if(TestData.length<=0){
      return res.status(400).json({FailureMessage:"No Tests Found"})
    }
    res.status(200).json(TestData);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({FailureMessage:"Internal Server error"})
    
  }
}



module.exports={createTest,getTestByToken,getAllTest}