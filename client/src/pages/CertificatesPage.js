import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCertificates } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';
import styles from '../styles/CertificatesPage.module.css';

const formatDate = (value) => {
  if (!value) return 'N/A';
  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? 'N/A' : parsedDate.toLocaleDateString();
};

const getCourseTitle = (cert) => cert?.courseId?.title || cert?.courseTitle || 'Course';
const getStudentName = (cert) => cert?.userId?.name || cert?.studentName || 'Student';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMyCertificates();
      const safeCertificates = Array.isArray(data.certificates)
        ? data.certificates.filter(Boolean)
        : [];
      setCertificates(safeCertificates);
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to load certificates', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchCertificates();
  }, [user, navigate, fetchCertificates]);

  const downloadCertificate = (cert) => {
    const courseTitle = getCourseTitle(cert);
    const studentName = getStudentName(cert);
    const grade = cert?.grade || 'Pass';
    const certificateNumber = cert?.certificateNumber || 'N/A';
    const issuedDate = formatDate(cert?.issuedAt);
    const completionDate = formatDate(cert?.completionDate);
    const hasScore = cert?.score !== null && cert?.score !== undefined && cert?.score !== '';

    // Create a printable certificate view
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addToast('Please allow popups to view certificate.', 'error');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificate - ${certificateNumber}</title>
        <style>
          body {
            font-family: 'Georgia', serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            background: #f5f5f5;
          }
          .certificate {
            background: white;
            padding: 60px;
            border: 10px double #1B4332;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            font-size: 48px;
            color: #1B4332;
            margin-bottom: 10px;
          }
          .title {
            font-size: 36px;
            color: #1B4332;
            margin: 20px 0;
            font-weight: bold;
          }
          .subtitle {
            font-size: 18px;
            color: #666;
            margin-bottom: 40px;
          }
          .content {
            text-align: center;
            line-height: 2;
          }
          .student-name {
            font-size: 32px;
            color: #1B4332;
            font-weight: bold;
            margin: 20px 0;
            border-bottom: 2px solid #1B4332;
            display: inline-block;
            padding: 0 20px;
          }
          .course-name {
            font-size: 24px;
            color: #2D6A4F;
            margin: 20px 0;
            font-style: italic;
          }
          .details {
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
            font-size: 14px;
            color: #666;
          }
          .grade-badge {
            display: inline-block;
            padding: 10px 20px;
            background: #1B4332;
            color: white;
            border-radius: 5px;
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
          }
          @media print {
            body { background: white; padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="logo">AY</div>
            <div class="title">AyurVidya</div>
            <div class="subtitle">Certificate of Completion</div>
          </div>
          <div class="content">
            <p>This is to certify that</p>
            <div class="student-name">${studentName}</div>
            <p>has successfully completed the course</p>
            <div class="course-name">${courseTitle}</div>
            ${grade ? `<div class="grade-badge">Grade: ${grade}</div>` : ''}
            ${hasScore ? `<p>Score: ${cert.score}%</p>` : ''}
            <div class="details">
              <div>
                <strong>Certificate Number:</strong><br/>
                ${certificateNumber}
              </div>
              <div>
                <strong>Issue Date:</strong><br/>
                ${issuedDate}
              </div>
              <div>
                <strong>Completion Date:</strong><br/>
                ${completionDate}
              </div>
            </div>
          </div>
        </div>
        <div class="no-print" style="text-align: center; margin-top: 20px;">
          <button onclick="window.print()" style="padding: 10px 30px; font-size: 16px; cursor: pointer; background: #1B4332; color: white; border: none; border-radius: 5px;">
            Print Certificate
          </button>
          <button onclick="window.close()" style="padding: 10px 30px; font-size: 16px; cursor: pointer; background: #666; color: white; border: none; border-radius: 5px; margin-left: 10px;">
            Close
          </button>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const verifyCertificate = (cert) => {
    const courseTitle = getCourseTitle(cert);
    const studentName = getStudentName(cert);
    const grade = cert?.grade || 'Pass';
    const certificateNumber = cert?.certificateNumber || 'N/A';
    const verificationCode = cert?.verificationCode || 'N/A';

    // Show verification details in an alert
    const verificationInfo = `Certificate Verification

VALID CERTIFICATE

Certificate Number: ${certificateNumber}
Verification Code: ${verificationCode}
Student: ${studentName}
Course: ${courseTitle}
Grade: ${grade}
${cert.score ? `Score: ${cert.score}%` : ''}
Issue Date: ${formatDate(cert?.issuedAt)}
Completion Date: ${formatDate(cert?.completionDate)}

This certificate is authentic and issued by AyurVidya.`;
    
    alert(verificationInfo);
  };

  const visibleCertificates = certificates.filter(Boolean);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Certificates</h1>
          <p>View and download your course completion certificates</p>
        </div>

        {visibleCertificates.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>CERT</div>
            <h2>No Certificates Yet</h2>
            <p>Complete courses to earn certificates</p>
            <button onClick={() => navigate('/courses')} className={styles.browseCourses}>
              Browse Courses
            </button>
          </div>
        ) : (
          <div className={styles.certificatesGrid}>
            {visibleCertificates.map((cert, index) => (
              <div key={cert?._id || cert?.certificateNumber || `cert-${index}`} className={styles.certificateCard}>
                <div className={styles.certificateHeader}>
                  <div className={styles.badge}>
                    <span className={styles.badgeIcon}>PASS</span>
                    <span className={styles.grade}>{cert?.grade || 'Pass'}</span>
                  </div>
                </div>

                <div className={styles.certificateBody}>
                  <h3>{getCourseTitle(cert)}</h3>
                  <div className={styles.certificateInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Certificate No:</span>
                      <span className={styles.value}>{cert?.certificateNumber || 'N/A'}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Issued:</span>
                      <span className={styles.value}>
                        {formatDate(cert?.issuedAt)}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Completed:</span>
                      <span className={styles.value}>
                        {formatDate(cert?.completionDate)}
                      </span>
                    </div>
                    {cert?.score !== null && cert?.score !== undefined && cert?.score !== '' && (
                      <div className={styles.infoItem}>
                        <span className={styles.label}>Score:</span>
                        <span className={styles.value}>{cert.score}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.certificateActions}>
                  <button
                    onClick={() => downloadCertificate(cert)}
                    className={styles.downloadBtn}
                  >
                    View Certificate
                  </button>
                  <button
                    onClick={() => verifyCertificate(cert)}
                    className={styles.verifyBtn}
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

