const express=require('express')
const TestRouter=express.Router()
const TestController=require('../controller/TestController')
TestRouter.route('/createTest').post(TestController.createTest)
TestRouter.route('/test-link/:token').get(TestController.getTestByToken)
TestRouter.route('/all-tests').get(TestController.getAllTest)
module.exports=TestRouter