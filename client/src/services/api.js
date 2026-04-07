import axios from "axios";

let BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
if (BASE_URL && !BASE_URL.endsWith('/api') && !BASE_URL.endsWith('/api/')) {
  BASE_URL = BASE_URL.endsWith('/') ? `${BASE_URL}api` : `${BASE_URL}/api`;
}
const TOKEN_KEY = "ayurveda-token";
const USER_KEY = "ayurveda-user";
const LANG_KEY = "ayurveda-lang";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

const unwrap = (response) => response?.data?.data ?? response?.data;
const request = async (promise) => unwrap(await promise);
const extractApiErrorMessage = (err, fallback) => {
  const data = err?.response?.data;
  if (!data) return err?.message || fallback;
  if (Array.isArray(data.errors) && data.errors.length > 0) return data.errors[0];
  return data.message || err?.message || fallback;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const lang = localStorage.getItem(LANG_KEY) || "en";

  if (token) config.headers.Authorization = `Bearer ${token}`;

  config.params = config.params || {};
  if (!config.params.lang) {
    config.params.lang = lang;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Auth
export const register = (name, email, password) => request(api.post("/auth/register", { name, email, password }));
export const login = (email, password) => request(api.post("/auth/login", { email, password }));
export const getMe = () => request(api.get("/auth/me"));
export const updateProfile = (data) => request(api.patch("/auth/profile", data));
export const verifyEmail = (token) => request(api.post("/auth/verify-email", { token }));
export const resendOtp = (email) => request(api.post("/auth/resend-otp", { email }));
export const forgotPassword = (email) => request(api.post("/auth/forgot-password", { email }));
export const resetPassword = (token, password) => request(api.post("/auth/reset-password", { token, password }));

// Subjects & Topics
export const getSubjects = (params) => request(api.get("/subjects", { params }));
export const getSubjectBySlug = (slug, params) => request(api.get(`/subjects/${slug}`, { params }));
export const getTopics = (params) => request(api.get("/topics", { params }));
export const getTopicBySlug = (slug, params) => request(api.get(`/topics/${slug}`, { params }));
export const getTopicQuiz = (slug, lang) => request(api.get(`/topics/${slug}/quiz`, { params: { lang } }));
export const getTopicFlashcards = (slug, lang) => request(api.get(`/topics/${slug}/flashcards`, { params: { lang } }));

// Herbs
export const getHerbs = (params) => request(api.get("/herbs", { params }));
export const getHerbBySlug = (slug, params) => request(api.get(`/herbs/${slug}`, { params }));

// Progress
export const getMyProgress = (params) => request(api.get("/progress/me", { params }));
export const markComplete = (data) => request(api.post("/progress/complete", data));
export const getStreak = () => request(api.get("/progress/streak"));

// Bookmarks
export const getBookmarks = (params) => request(api.get("/bookmarks", { params }));
export const addBookmark = (topicSlug) => request(api.post("/bookmarks", { topicSlug }));
export const removeBookmark = (topicSlug) => request(api.delete(`/bookmarks/${topicSlug}`));

// Notes
export const getNote = (topicSlug) => request(api.get(`/notes/${topicSlug}`));
export const saveNote = (topicSlug, content) => request(api.post("/notes", { topicSlug, content }));
export const getNotes = () => request(api.get("/notes"));

// Quiz
export const submitQuiz = (data) => request(api.post("/quiz/submit", data));
export const getQuizStats = () => request(api.get("/quiz/stats/me"));

// Courses
export const getCourses = (params) => request(api.get("/courses", { params }));
export const getCourseBySlug = (slug, params) => request(api.get(`/courses/${slug}`, { params }));
export const getMyCourses = (params) => request(api.get("/courses/my", { params }));
export const enrollInCourse = (slug) => request(api.post(`/courses/${slug}/enroll`));
export const markLessonComplete = (slug, lessonId) => request(api.post(`/courses/${slug}/lessons/${lessonId}/complete`));
export const getCourseProgress = (slug) => request(api.get(`/courses/${slug}/progress`));

// Payment
export const createOrder = (courseId, paymentMethod) =>
  request(api.post("/payment/create-order", { courseId, paymentMethod }));
export const verifyPayment = (data) => request(api.post("/payment/verify", data));

// Admin
export const getAdminStats = () => request(api.get("/admin/stats"));
export const getAdminUsers = (params) => request(api.get("/admin/users", { params }));
export const getAdminCourses = (params) => request(api.get("/admin/courses", { params }));
export const updateUser = (id, data) => request(api.patch(`/admin/users/${id}`, data));
export const deleteUser = (id) => request(api.delete(`/admin/users/${id}`));
export const createCourse = (data) => request(api.post("/admin/courses", data));
export const updateCourse = (id, data) => request(api.put(`/admin/courses/${id}`, data));
export const deleteCourse = (id) => request(api.delete(`/admin/courses/${id}`));

// Search
export const searchContent = (params) => request(api.get("/search", { params }));

// Certificates
export const generateCertificate = (courseSlug) => request(api.post(`/certificates/generate/${courseSlug}`));
export const getMyCertificates = () => request(api.get("/certificates/my"));
export const getCourseCertificate = (courseSlug) => request(api.get(`/certificates/course/${courseSlug}`));
export const verifyCertificate = (identifier) => request(api.get(`/certificates/verify/${identifier}`));


// Razorpay checkout helper
const RAZORPAY_METHOD_KEYS = {
  upi: "upi",
  card: "card",
  netbanking: "netbanking",
  wallet: "wallet",
  emi: "emi",
  paylater: "paylater",
};

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById("razorpay-checkout-sdk");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Razorpay checkout SDK.")));
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout SDK."));
    document.body.appendChild(script);
  });
}

export async function initiateCheckout(courseId, paymentMethod, onSuccess, onFailure) {
  try {
    const normalizedMethod = paymentMethod ? String(paymentMethod).trim().toLowerCase() : "";
    const methodKey = RAZORPAY_METHOD_KEYS[normalizedMethod];
    const data = await createOrder(courseId, methodKey || undefined);
    await loadRazorpayScript();
    const options = {
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      name: "AyurvedaLearn",
      description: "Course Enrollment",
      order_id: data.razorpayOrderId,
      theme: { color: "#1B4332" },
      method: methodKey ? { [methodKey]: true } : undefined,
      handler: async (response) => {
        try {
          await verifyPayment({
            razorpayOrderId:   response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          onSuccess();
        } catch {
          onFailure("Payment verification failed. Contact support.");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (r) => onFailure(r.error.description));
    rzp.open();
  } catch (err) {
    onFailure(extractApiErrorMessage(err, "Failed to initiate payment."));
  }
}

export default api;
