import { useEffect, useMemo, useState } from "react";
import { getStreak } from "../../services/api";
import styles from "../../styles/Dashboard.module.css";

function buildMonthlyGroups(activityDatesArr = []) {
  const months = [];
  const today = new Date();
  
  // Normalize activity dates
  const activitySet = new Set(
    activityDatesArr.map(d => new Date(d).toISOString().split('T')[0])
  );
  
  // Create 12 months back from today
  for (let m = 11; m >= 0; m--) {
    const targetMonth = new Date(today.getFullYear(), today.getMonth() - m, 1);
    const monthName = targetMonth.toLocaleString('default', { month: 'short' });
    const year = targetMonth.getFullYear();
    const monthNum = targetMonth.getMonth();
    
    // Days in this month
    const daysInMonth = new Date(year, monthNum + 1, 0).getDate();
    const days = [];
    
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, monthNum, d);
      const dateStr = date.toISOString().split('T')[0];
      
      let level = 0;
      if (activitySet.has(dateStr)) {
        level = 3;
        // Check if it's very recent (last 7 days total)
        const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
        if (diffDays < 7) level = 4;
      }
      
      days.push({ date: dateStr, level, dayOfWeek: date.getDay() });
    }
    
    months.push({ name: monthName, days });
  }

  return months;
}

export default function StreakCalendar() {
  const [streak, setStreak] = useState({ 
    currentStreak: 0, 
    longestStreak: 0, 
    lastActivity: null,
    activityDates: [] 
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        setError("");
        const data = await getStreak();
        const streakData = data.streak || data;
        setStreak({
          currentStreak: streakData.currentStreak || 0,
          longestStreak: streakData.longestStreak || 0,
          lastActivity: streakData.lastActivity || null,
          activityDates: streakData.activityDates || []
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load streak.");
      }
    };

    fetchStreak();
  }, []);

  const monthlyGroups = useMemo(() => buildMonthlyGroups(streak.activityDates), [streak.activityDates]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  return (
    <div className={styles.calendarWrap}>
      <div style={{ marginBottom: "0.75rem", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
        <strong>Current:</strong> {streak.currentStreak} days | <strong>Longest:</strong> {streak.longestStreak} days
        {streak.lastActivity && (
          <>
            {" "}
            | <strong>Last Activity:</strong> {new Date(streak.lastActivity).toLocaleDateString()}
          </>
        )}
      </div>
      {error && (
        <div style={{ marginBottom: "0.75rem", color: "var(--color-error)", fontSize: "0.85rem" }}>
          {error}
        </div>
      )}
      
      <div className="streak-container">
        {monthlyGroups.map((group) => (
          <div key={group.name} className="month-island">
            <div className="month-grid">
               {/* Padding for start of month */}
               {Array.from({ length: group.days[0].dayOfWeek }).map((_, i) => (
                 <div key={`pad-${i}`} className="streak-cell-hidden" />
               ))}
               
               {group.days.map((day, idx) => (
                 <div
                   key={idx}
                   className={`streak-cell${day.level ? ` level-${day.level}` : ""}`}
                   title={`${day.date}: ${day.level ? "Studied" : "No activity"}`}
                 />
               ))}
            </div>
            <div className="month-label">{group.name}</div>
          </div>
        ))}
      </div>

      <div className={styles.calendarLegend}>

        <span>Less</span>
        <div className="streak-cell" />
        <div className="streak-cell level-1" />
        <div className="streak-cell level-2" />
        <div className="streak-cell level-3" />
        <div className="streak-cell level-4" />
        <span>More</span>
      </div>
    </div>
  );
}
