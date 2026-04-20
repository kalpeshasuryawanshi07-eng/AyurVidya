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
            <h2 className={styles.zenithTitle}>Certification Protocol Results</h2>
            <div className={styles.scoreCircle}>
              {result.score}%
            </div>
            
            {result.passed ? (
              <>
                <h3 style={{ color: '#52b788', marginBottom: '15px', fontSize: '1.8rem' }}>Master Status Achieved</h3>
                <p style={{ color: '#b7e4c7', fontSize: '1.1rem', marginBottom: '30px' }}>You have successfully synchronized with the course knowledge. Your certificate is generating.</p>
                <div className={styles.actions}>
                  <button onClick={() => navigate('/certificates')} className={`${styles.btn} ${styles.certBtn}`}>
                    Access Certificate
                  </button>
                  <button onClick={() => navigate(`/courses/${slug}`)} className={`${styles.btn} ${styles.prevBtn}`}>
                    Course Dashboard
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ color: '#ef4444', marginBottom: '15px', fontSize: '1.8rem' }}>Synchronization Failed</h3>
                <p style={{ color: '#b7e4c7', fontSize: '1.1rem', marginBottom: '30px' }}>Minimum 70% required for certification. Review the sacred texts and attempt the link again.</p>
                <div className={styles.actions}>
                  <button onClick={() => { setHasStarted(false); fetchQuiz(); }} className={`${styles.retryBtn}`}>
                    Retry Protocol
                  </button>
                  <button onClick={() => navigate(`/courses/${slug}`)} className={`${styles.btn} ${styles.prevBtn}`}>
                    Abort to Dashboard
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
          <div className={styles.results} style={{ textAlign: 'left', padding: '50px 70px', maxWidth: '850px' }}>
            <h2 className={styles.zenithTitle} style={{ textAlign: 'center', marginBottom: '30px', color: '#52b788' }}>Certification Protocol</h2>
            <ul style={{ lineHeight: '2.5', fontSize: '1.2rem', color: '#b7e4c7', marginBottom: '45px', listStyleType: 'none', padding: 0 }}>
              <li><span style={{ color: '#52b788', marginRight: '15px' }}>◈</span> Mandatory final assessment for course mastery.</li>
              <li><span style={{ color: '#52b788', marginRight: '15px' }}>◈</span> <strong>70% Score</strong> required to unlock the Diamond-Edge certificate.</li>
              <li><span style={{ color: '#52b788', marginRight: '15px' }}>◈</span> Immersive environment - do not leave or refresh the session.</li>
              <li><span style={{ color: '#52b788', marginRight: '15px' }}>◈</span> Question logic pulls from all verified course knowledge.</li>
            </ul>
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => setHasStarted(true)} className={`${styles.btn} ${styles.submitBtn}`} style={{ padding: '20px 60px', fontSize: '1.3rem', borderRadius: '50px', width: 'auto' }}>
                Initiate Link
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
        {/* Progress Bar Aura */}
        <div className={styles.progressContainer} style={{ width: '100%', maxWidth: '800px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginBottom: '30px', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${((currentIndex + 1) / questions.length) * 100}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #2d6a4f, #52b788)',
              boxShadow: '0 0 15px #52b788',
              transition: 'width 0.4s ease'
            }} 
          />
        </div>

        <div className={styles.header}>
          <h1>Final Certification Exam</h1>
          <p>Master Ayurvedic Knowledge. Score 70%+ to unlock your certificate.</p>
        </div>

        <div className={styles.info}>
          <p><strong>Quest Progress:</strong> {currentIndex + 1} of {questions.length}</p>
          <p><strong>Status:</strong> {Object.keys(answers).length} / {questions.length} Answered</p>
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
                {submitting ? 'Authenticating...' : 'Submit Certification'}
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
          AyurVidya Certification Protocol | Neural Link Active
        </div>
      </div>
      <Footer />
    </>
  );
}
