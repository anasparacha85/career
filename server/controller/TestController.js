const Invitation = require("../Modals/InvitationModal");
const  Question  = require("../Modals/QuestionModal");
const Test = require("../Modals/TestModal");


const createTest = async (req, res) => {
  try {
    // formData ke andar testData stringified aya tha
    const testData = JSON.parse(req.body.testData);
    let { name, description, duration, passingScore, questions } = testData;

    if (!name || !description || !duration || !passingScore || !questions.length) {
      return res.status(400).json({ FailureMessage: "please fill all the fields" });
    }

    // 🔹 step1: uploaded files ko map karo
    const fileMap = {};
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        fileMap[`__UPLOAD__${file.fieldname}`] = file.path; // cloudinary url
      });
    }

    // 🔹 step2: questions update karo
    const processedQuestions = questions.map((q) => {
      if (fileMap[q.questionFile]) {
        q.questionFile = fileMap[q.questionFile];
      }
      if (fileMap[q.answerFile]) {
        q.answerFile = fileMap[q.answerFile];
      }
      if (fileMap[q.image]) {
        q.image = fileMap[q.image];
      }
      return q;
    });

    // 🔹 step3: pehle questions save karo
    const questionDocs = await Question.insertMany(
      processedQuestions.map((q) => ({
        question: q.question,
        options: q.options || [],
        correctAnswer: q.correct,
        questionFile: q.questionFile || null,
        answerFile: q.answerFile || null,
        image: q.image || null,
        category: q.category,
        subcategory: q.subcategory,
        part: q.part,
        type: q.type,
        answerType: q.answerType,
        inputRequired:q.inputRequired || []
      }))
    );

    const questionIds = questionDocs.map((q) => q._id);

    // 🔹 step4: test create karo
    const newTest = new Test({
      name,
      description,
      duration,
      passingScore,
      questions: questionIds,
    });

    await newTest.save();

    res.status(201).json({ SuccessMessage: "Test Created Successfully", test: newTest });
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
// for admin and HR purpose
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