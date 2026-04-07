import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getTopicQuiz, submitQuiz, getQuizStats } from "../../services/api";
import Loader from "../common/Loader";
import styles from "../../styles/Quiz.module.css";

export default function QuizBlock({ topicSlug }) {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!topicSlug) return;
      try {
        setLoading(true);
        setError("");
        const data = await getTopicQuiz(topicSlug, lang);
        setQuestions(data.questions || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [topicSlug, lang]);

  const handleSelect = (index) => {
    setSelected(index);
  };

  const goNext = async () => {
    if (selected === null) return;

    const currentQuestion = questions[current];
    const updatedAnswers = {
      ...answers,
      [currentQuestion.questionId]: selected,
    };
    setAnswers(updatedAnswers);

    const isLastQuestion = current + 1 >= questions.length;
    if (!isLastQuestion) {
      setCurrent((value) => value + 1);
      setSelected(null);
      return;
    }

    setFinished(true);
    if (!user) return;

    try {
      setSubmitting(true);
      const payloadAnswers = questions.map((question) => ({
        questionId: question.questionId,
        selectedOption: updatedAnswers[question.questionId],
      }));

      const submitResponse = await submitQuiz({
        topicSlug,
        answers: payloadAnswers,
      });
      setResult(submitResponse.result || null);

      const statsResponse = await getQuizStats();
      setStats(statsResponse.stats || null);
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to submit quiz.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers({});
    setFinished(false);
    setSubmitting(false);
    setResult(null);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">?</div>
        <h3>{error}</h3>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">?</div>
        <h3>No quiz questions available for this topic.</h3>
      </div>
    );
  }

  if (finished) {
    return (
      <div className={styles.quizResult}>
        <h3>Quiz Complete</h3>
        {submitting && <p>Submitting your quiz...</p>}
        {!user && <p>Login to save this quiz attempt and view score analytics.</p>}
        {result && (
          <>
            <div className={styles.resultScore}>
              {result.correctAnswers} / {result.totalQuestions}
            </div>
            <div className={styles.resultPct}>{result.score}%</div>
          </>
        )}
        {stats && (
          <p style={{ color: "var(--color-text-secondary)" }}>
            Your average score: {stats.averageScore}% across {stats.totalQuizzes} attempts.
          </p>
        )}
        <button className="btn btn-primary" onClick={handleRetry}>
          Retry Quiz
        </button>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className={styles.quizBlock}>
      <div className={styles.quizHeader}>
        <span className={styles.quizProgress}>
          Question {current + 1} of {questions.length}
        </span>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${(current / questions.length) * 100}%` }} />
      </div>
      <div className={styles.question}>{question.question}</div>
      <div className={styles.options}>
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`quiz-option${selected === index ? " selected" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
            {option}
          </button>
        ))}
      </div>
      <div className={styles.explanation}>
        <button
          className="btn btn-primary btn-sm"
          onClick={goNext}
          disabled={selected === null}
          style={{ marginTop: "0.75rem" }}
        >
          {current + 1 >= questions.length ? "Finish Quiz" : "Next Question ->"}
        </button>
      </div>
    </div>
  );
}
