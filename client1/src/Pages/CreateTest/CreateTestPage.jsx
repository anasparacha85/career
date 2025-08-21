import React, { useState, useEffect } from 'react';
import Step1Details from './Components/Step1';
import Step2Questions from './Components/Step2';
import Step3GenerateLink from './Components/Step3';
import ProgressBar from './Components/Progressbar';
import './CreateTest.css';

const CreateTest = () => {
  const [step, setStep] = useState(() => {
    return parseInt(localStorage.getItem("step")) || 1;
  });

  const [testDetails, setTestDetails] = useState(() => {
    const savedData = localStorage.getItem("testDetails");
    return savedData
      ? JSON.parse(savedData)
      : { name: '', description: '', duration: '', passingScore: '', questions: [] };
  });

  // jab bhi step ya details change hon to localStorage mai save kardo
  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem("testDetails", JSON.stringify(testDetails));
  }, [testDetails]);

  const onSave = (e) => {
    const { name, value } = e.target;
    setTestDetails({ ...testDetails, [name]: value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const resetForm = () => {
    setStep(1);
    setTestDetails({ name: '', description: '', duration: '', passingScore: '', questions: [] });
    localStorage.removeItem("step");
    localStorage.removeItem("testDetails");
  };

  return (
    <div className="create-test-container">
      <div className="create-test-wrapper">
        {/* Header */}
        <div className="create-test-header">
          <h1 className="create-test-title">Create New Test</h1>
          <p className="create-test-subtitle">
            Build your assessment by following these simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar step={step} />

        {/* Content */}
        <div className="create-test-content">
          {step === 1 && (
            <Step1Details
              testDetails={testDetails}
              setTestDetails={setTestDetails}
              nextStep={nextStep}
            />
          )}

          {step === 2 && (
            <Step2Questions
              testDetails={testDetails}
              setTestDetails={setTestDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}

          {step === 3 && (
            <Step3GenerateLink
              onBack={prevStep}
              onReset={resetForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
