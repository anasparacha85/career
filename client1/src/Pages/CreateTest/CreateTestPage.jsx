import React, { useState } from 'react';
import Step1Details from './Components/Step1';
import Step2Questions from './Components/Step2';
import Step3GenerateLink from './Components/Step3';
import ProgressBar from './Components/Progressbar';
import './CreateTest.css';
import { Save, ChevronLeft, ChevronRight } from 'lucide-react';
import './Components/Buttons.css';

const CreateTest = () => {
  const [step, setStep] = useState(1);
  const [testDetails, setTestDetails] = useState({
    name: '',
    description: '',
    duration: '',
    passingScore: '',
    questions: []
  });

  const onSave = (e) => {
    const { name, value } = e.target;
    setTestDetails({ ...testDetails, [name]: value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const resetForm = () => {
    setStep(1);
    setTestDetails({ name: '', description: '', duration: '', passingScore: '', questions: [] });
  };

  return (
    <div id="create-test-container" className={`${step === 3 ? 'generate-link-view' : ''}`}>
      <div id="test-header">
        <div id="test-info">
          <h1>Create New Test</h1>
          <p>Build your assessment by following these simple steps</p>
        </div>
      </div>

      <ProgressBar step={step} />
     
      <div id="test-content">
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
            Save={onSave}
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
  );
};

export default CreateTest;