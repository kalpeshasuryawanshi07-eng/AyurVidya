import { useEffect, useMemo, useState } from "react";
import { getStreak } from "../../services/api";
import styles from "../../styles/Dashboard.module.css";

function buildCalendarCells(currentStreak) {
  const cells = [];
  const today = new Date();
  const streakDays = Math.max(0, Number(currentStreak) || 0);

  for (let i = 364; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const daysFromToday = i;

    let level = 0;
    if (daysFromToday < streakDays) {
      level = 3;
      if (daysFromToday < 7) level = 4;
    }

    cells.push({
      date: date.toISOString().split("T")[0],
      level,
    });
  }

  return cells;
}

export default function StreakCalendar() {
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, lastActivity: null });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        setError("");
        const data = await getStreak();
        setStreak(data.streak || { currentStreak: 0, longestStreak: 0, lastActivity: null });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load streak.");
      }
    };

    fetchStreak();
  }, []);

  const cells = useMemo(() => buildCalendarCells(streak.currentStreak), [streak.currentStreak]);
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
      <div className={styles.calendarMonths}>
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
      <div className="streak-grid">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`streak-cell${cell.level ? ` level-${cell.level}` : ""}`}
            title={`${cell.date}: ${cell.level ? "Studied" : "No activity"}`}
          />
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
