const express=require('express')
const TestRouter=express.Router()
const TestController=require('../controller/TestController')
const upload = require('../config/CloudinaryConfig'); // tumhara multer-cloudinary wala config

TestRouter.route('/createTest').post(
  upload.any(),   // 👈 allow multiple different fields
  TestController.createTest
);

TestRouter.route('/test-link/:token').get(TestController.getTestByToken)
TestRouter.route('/all-tests').get(TestController.getAllTest)
module.exports=TestRouter