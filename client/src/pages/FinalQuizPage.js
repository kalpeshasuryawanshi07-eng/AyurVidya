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
      <>
        <Navbar />
        <div className={styles.container}>
          <Loader />
        </div>
        <Footer />
      </>
    );
  }

  // Result View
  if (result) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={`${styles.results} ${result.passed ? styles.passed : styles.failed}`}>
            <h2>Final Exam Results</h2>
            <div className={styles.scoreCircle}>
              {result.score}%
            </div>
            
            {result.passed ? (
              <>
                <h3 style={{ color: '#10b981', marginBottom: '10px' }}>Congratulations! You Passed!</h3>
                <p>You have successfully completed the course and earned your certificate!</p>
                <div className={styles.actions}>
                  <button onClick={() => navigate('/certificates')} className={`${styles.btn} ${styles.certBtn}`}>
                    View My Certificates
                  </button>
                  <button onClick={() => navigate(`/courses/${slug}`)} className={styles.btn}>
                    Back to Course
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ color: '#ef4444', marginBottom: '10px' }}>You did not pass the exam.</h3>
                <p>You need at least 70% to pass. Please review the course materials and try again.</p>
                <div className={styles.actions}>
                  <button onClick={() => { setHasStarted(false); fetchQuiz(); }} className={`${styles.retryBtn}`}>
                    Retry Exam
                  </button>
                  <button onClick={() => navigate(`/courses/${slug}`)} className={styles.btn}>
                    Back to Course
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
          <div className={styles.results} style={{ textAlign: 'left', padding: '40px 60px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1B4332' }}>Final Course Exam Rules</h2>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#333', marginBottom: '40px' }}>
              <li>📝 This is a mandatory <strong>Final Exam</strong> that draws continuously from every topic you have covered.</li>
              <li>🎯 You must score <strong>70% or above</strong> to unlock and generate your final course certificate.</li>
              <li>⏰ There is no time limit, but please do not refresh the page or all progress will be lost.</li>
              <li>🚫 <strong>Do not cheat.</strong> This means no looking up answers in other tabs. We test your true knowledge.</li>
              <li>🔄 If you fail, you can always retry, however question groupings will be randomized each attempt.</li>
            </ul>
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => setHasStarted(true)} className={`${styles.btn} ${styles.submitBtn}`} style={{ padding: '15px 40px', fontSize: '1.2rem', borderRadius: '50px' }}>
                I Understand, Start Quiz
              </button>
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
          <h1>Final Course Certification Exam</h1>
          <p>You must score at least 70% to earn the certificate.</p>
        </div>

        <div className={styles.info}>
          <p><strong>Total Questions:</strong> {questions.length}</p>
          <p>Please review your answers before submitting the entire exam.</p>
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
              className={`${styles.btn} ${styles.prevBtn}`} 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            
            {currentIndex === questions.length - 1 ? (
              <button 
                className={`${styles.btn} ${styles.submitBtn}`} 
                onClick={handleSubmit}
                disabled={submitting || Object.keys(answers).length < questions.length}
              >
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            ) : (
              <button 
                className={`${styles.btn} ${styles.nextBtn}`} 
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>

        <div className={styles.progress}>
          Question {currentIndex + 1} of {questions.length} | Answered: {Object.keys(answers).length}
        </div>
      </div>
      <Footer />
    </>
  );
}
