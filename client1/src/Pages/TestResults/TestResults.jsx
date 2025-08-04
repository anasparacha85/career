import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Award, BookOpen, Percent, Clock as TimeIcon } from 'lucide-react';
import './TestResults.css';

const TestResultsPage = () => {
  // Dummy data for test results
  const [results] = useState({
    score: 85.5,
    passed: true,
    correctCount: 17,
    incorrectCount: 3,
    totalQuestions: 20,
    passingScore: 70,
    testName: 'JavaScript Fundamentals',
    completionDate: new Date().toLocaleDateString(),
    timeTaken: '12:45',
    questionDetails: [
      {
        questionText: 'What is the correct way to declare a variable in JavaScript?',
        options: ['var x = 5;', 'variable x = 5;', 'x := 5;', 'int x = 5;'],
        correctAnswer: 'var x = 5;',
        selectedAnswer: 'var x = 5;',
        isCorrect: true
      },
      {
        questionText: 'Which method adds new items to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'push()',
        selectedAnswer: 'pop()',
        isCorrect: false
      },
      {
        questionText: 'What does the "=== " operator check for?',
        options: ['Value equality', 'Type equality', 'Both value and type equality', 'Assignment'],
        correctAnswer: 'Both value and type equality',
        selectedAnswer: 'Both value and type equality',
        isCorrect: true
      },
      {
        questionText: 'Which of these is NOT a JavaScript data type?',
        options: ['String', 'Boolean', 'Number', 'Float'],
        correctAnswer: 'Float',
        selectedAnswer: 'Float',
        isCorrect: true
      }
    ]
  });

  return (
    <div id="results-page-container">
      <div id="results-page-header">
        <div id="results-page-info">
          <h1 id="results-page-title">Test Results: {results.testName}</h1>
          <p id="results-page-description">Detailed performance report for your attempt</p>
        </div>
        <div id="results-page-meta">
          <div id="results-completion-date">
            <Clock size={16} />
            Completed on: {results.completionDate}
          </div>
        </div>
      </div>

      <div id="results-page-content">
        <div id="results-summary-panel">
          <div id={`results-score-card-${results.passed ? 'passed' : 'failed'}`}>
            <div id="results-score-value">{results.score.toFixed(1)}%</div>
            <div id="results-score-label">Overall Score</div>
            <div id="results-score-status">
              {results.passed ? (
                <>
                  <CheckCircle size={16} /> Passed
                </>
              ) : (
                <>
                  <XCircle size={16} /> Failed
                </>
              )}
            </div>
            <div id="results-passing-info">
              <Percent size={14} /> Passing Score: {results.passingScore}%
            </div>
          </div>

          <div id="results-stats-grid">
            <div id="results-correct-stat" className="results-stat-card">
              <div className="results-stat-icon">
                <Award size={20} />
              </div>
              <div className="results-stat-value">{results.correctCount}</div>
              <div className="results-stat-label">Correct</div>
            </div>
            <div id="results-incorrect-stat" className="results-stat-card">
              <div className="results-stat-icon">
                <XCircle size={20} />
              </div>
              <div className="results-stat-value">{results.incorrectCount}</div>
              <div className="results-stat-label">Incorrect</div>
            </div>
            <div id="results-total-stat" className="results-stat-card">
              <div className="results-stat-icon">
                <BookOpen size={20} />
              </div>
              <div className="results-stat-value">{results.totalQuestions}</div>
              <div className="results-stat-label">Total Questions</div>
            </div>
            <div id="results-time-stat" className="results-stat-card">
              <div className="results-stat-icon">
                <TimeIcon size={20} />
              </div>
              <div className="results-stat-value">{results.timeTaken}</div>
              <div className="results-stat-label">Time Taken</div>
            </div>
          </div>
        </div>

        <div id="results-details-panel">
          <h2 id="results-breakdown-title" className="results-section-title">
            <TimeIcon size={20} /> Question Breakdown
          </h2>
          
          <div id="results-questions-list">
            {results.questionDetails.map((question, index) => (
              <div 
                key={index} 
                id={`results-question-${index}`} 
                className={`results-question ${question.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="results-question-meta">
                  <span className="results-question-number">Q{index + 1}</span>
                  <span className="results-question-status">
                    {question.isCorrect ? (
                      <CheckCircle size={16} color="#10b981" />
                    ) : (
                      <XCircle size={16} color="#ef4444" />
                    )}
                    {question.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div className="results-question-text">{question.questionText}</div>
                <div className="results-answer-comparison">
                  <div className="results-answer-section">
                    <span className="results-answer-label">Your answer:</span>
                    <span className={`results-selected-answer ${!question.isCorrect ? 'wrong' : ''}`}>
                      {question.selectedAnswer}
                    </span>
                  </div>
                  {!question.isCorrect && (
                    <div className="results-answer-section">
                      <span className="results-answer-label">Correct answer:</span>
                      <span className="results-correct-answer">
                        {question.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="results-actions-panel">
        <button id="results-review-btn" className="results-action-btn primary">
          <BookOpen size={18} /> Review Answers
        </button>
      </div>
    </div>
  );
};

export default TestResultsPage;