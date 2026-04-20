import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseFinalQuiz, submitCourseFinalQuiz } from '../services/api';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';
import { useToast } from '../context/ToastContext';
import styles from '../styles/FinalQuizPage.module.css';

export default function FinalQuizPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const fetchQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCourseFinalQuiz(slug);
      
      if (!res.questions || res.questions.length === 0) {
        addToast('No questions available for this course.', 'error');
        navigate(`/courses/${slug}`);
        return;
      }
      
      setQuestions(res.questions);
      setAnswers({});
      setCurrentIndex(0);
      setResult(null);
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to load exam', 'error');
      navigate(`/courses/${slug}`);
    } finally {
      setLoading(false);
    }
  }, [slug, addToast, navigate]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleOptionSelect = (optionIndex) => {
    if (result) return; // Prevent changing after submission
    setAnswers(prev => ({
      ...prev,
      [questions[currentIndex].questionId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      addToast('Please answer all questions before submitting.', 'warning');
      return;
    }

    try {
      setSubmitting(true);
      const answersArray = Object.entries(answers).map(([qId, optIdx]) => ({
        questionId: qId,
        selectedOption: optIdx
      }));

      const res = await submitCourseFinalQuiz(slug, answersArray);
      setResult(res);
      window.scrollTo(0, 0);

      if (res.passed) {
        addToast(`Congratulations! You passed with ${res.score}%.`, 'success');
      } else {
        addToast(`You scored ${res.score}%. Minimum passing score is 70%.`, 'error');
      }

    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to submit exam', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Navbar />
        <Loader />
        <Footer />
      </div>
    );
  }

  // Result View
  if (result) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={`${styles.results} ${result.passed ? styles.passed : styles.failed}`}>
            <h2>Exam Results</h2>
            <div className={styles.scoreCircle}>
              {result.score}%
            </div>
            
            {result.passed ? (
              <>
                <h3 className="mb-2" style={{ color: 'var(--color-success)' }}>Certification Achieved</h3>
                <p className="mb-3">Congratulations! You have successfully mastered the course content. Your certificate is now available.</p>
                <div className={styles.actions}>
                  <button onClick={() => navigate('/certificates')} className="btn btn-primary">
                    View Certificate
                  </button>
                  <button onClick={() => navigate(`/courses/${slug}`)} className="btn btn-outline">
                    Return to Course
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="mb-2" style={{ color: 'var(--color-error)' }}>Assessment Not Passed</h3>
                <p className="mb-3">You need a minimum score of 70% to receive certification. Please review the course materials and try again.</p>
                <div className={styles.actions}>
                  <button onClick={() => { setHasStarted(false); fetchQuiz(); }} className="btn btn-primary">
                    Retry Exam
                  </button>
                  <button onClick={() => navigate(`/courses/${slug}`)} className="btn btn-outline">
                    Back to Dashboard
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!hasStarted) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.results}>
            <h2>Course Certification Exam</h2>
            <div className={styles.introContent}>
              <p className="mb-3">To earn your official certificate, please complete this final assessment. This ensures you have a comprehensive understanding of the course materials.</p>
              <ul className={styles.introList}>
                <li>A minimum score of <strong>70%</strong> is required for certification.</li>
                <li>The exam covers all modules and topics within this course.</li>
                <li>Please do not refresh or navigate away from this page during the exam.</li>
                <li>Multiple attempts are allowed if needed.</li>
              </ul>
              <div className="text-center mt-3">
                <button onClick={() => setHasStarted(true)} className="btn btn-primary btn-lg">
                  Begin Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const selectedOpt = answers[currentQ.questionId];

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Certification Exam</h1>
          <p>Complete the assessment to verify your mastery of this knowledge.</p>
        </div>

        <div className={styles.info}>
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Object.keys(answers).length} / {questions.length} Answered</span>
        </div>

        <div className={styles.questionCard}>
          <h3 className={styles.questionText}>
            {currentIndex + 1}. {currentQ.question}
          </h3>

          <div className={styles.optionsGrid}>
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                className={`${styles.option} ${selectedOpt === idx ? styles.selected : ''}`}
                onClick={() => handleOptionSelect(idx)}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className={styles.navigation}>
            <button 
              className="btn btn-outline"
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            
            {currentIndex === questions.length - 1 ? (
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={submitting || Object.keys(answers).length < questions.length}
              >
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next Question
              </button>
            )}
          </div>
        </div>

        <div className={styles.progressFooter}>
          {slug.replace(/-/g, ' ')} | Certification Assessment
        </div>
      </div>
      <Footer />
    </>
  );
}
