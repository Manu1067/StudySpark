import React, { useEffect, useState } from 'react';

const StatCard = ({ icon, label, value, subtitle, gradient, id }) => (
  <div
    id={id}
    className={`relative overflow-hidden rounded-2xl p-6 ${gradient} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-inner">
          {icon}
        </div>
        <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
      </div>
      <div className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight break-words">{value}</div>
      <div className="text-sm font-semibold text-white/80">{label}</div>
      {subtitle && <div className="text-xs text-white/60 mt-1">{subtitle}</div>}
    </div>
    {/* Decorative circle */}
    <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
    <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-white/5" />
  </div>
);

const Dashboard = () => {
  const [streak, setStreak] = useState(0);
  const [hoursToday, setHoursToday] = useState(0);
  const [upcomingExams, setUpcomingExams] = useState(0);

  useEffect(() => {
    // Load study sessions from localStorage
    const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(s => new Date(s.date).toDateString() === today);
    const totalHoursToday = todaySessions.reduce((sum, s) => sum + parseFloat(s.hours || 0), 0);
    setHoursToday(totalHoursToday.toFixed(1));

    // Calculate streak
    let currentStreak = 0;
    const dateSet = new Set(sessions.map(s => new Date(s.date).toDateString()));
    const checkDate = new Date();
    // Check if studied today or yesterday to start streak
    if (dateSet.has(checkDate.toDateString())) {
      while (dateSet.has(checkDate.toDateString())) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } else {
      checkDate.setDate(checkDate.getDate() - 1);
      while (dateSet.has(checkDate.toDateString())) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }
    setStreak(currentStreak);

    // Load exams
    const exams = JSON.parse(localStorage.getItem('exams') || '[]');
    const now = new Date();
    const upcoming = exams.filter(e => new Date(e.date) > now);
    setUpcomingExams(upcoming.length);
  }, []);

  return (
    <section id="dashboard-section" className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Live Dashboard
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Welcome Back!{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨
          </span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto px-2">
          Here's a snapshot of your academic progress today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          id="streak-card"
          icon="🔥"
          label="Current Study Streak"
          value={`${streak} ${streak === 1 ? 'Day' : 'Days'}`}
          subtitle={streak > 0 ? "Keep it going!" : "Start studying to begin your streak"}
          gradient="bg-gradient-to-br from-orange-500 to-pink-600"
        />
        <StatCard
          id="hours-today-card"
          icon="⏱️"
          label="Study Hours Today"
          value={`${hoursToday}h`}
          subtitle="Time well invested"
          gradient="bg-gradient-to-br from-blue-500 to-indigo-700"
        />
        <StatCard
          id="upcoming-exams-card"
          icon="📋"
          label="Upcoming Exams"
          value={upcomingExams}
          subtitle={upcomingExams === 0 ? "No upcoming exams" : `${upcomingExams} exam${upcomingExams > 1 ? 's' : ''} scheduled`}
          gradient="bg-gradient-to-br from-purple-500 to-violet-700"
        />
      </div>

      {/* Motivational Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 p-5 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="relative z-10 text-center space-y-2">
          <div className="text-4xl sm:text-5xl">🚀</div>
          <h2 className="text-lg sm:text-2xl font-bold text-white">
            "The secret of getting ahead is getting started."
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">— Mark Twain</p>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '📖', title: 'Consistent Study', tip: 'Study at least 2 hours daily to build momentum.' },
          { icon: '🎯', title: 'Set Clear Goals', tip: 'Define what you want to achieve this semester.' },
          { icon: '⏰', title: 'Time Boxing', tip: 'Use 25-minute Pomodoro sessions for deep focus.' },
        ].map((tip, i) => (
          <div
            key={i}
            id={`tip-card-${i}`}
            className="rounded-xl bg-gray-900/50 border border-white/10 p-5 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="text-2xl mb-2">{tip.icon}</div>
            <div className="text-white font-semibold text-sm mb-1">{tip.title}</div>
            <div className="text-gray-400 text-xs">{tip.tip}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
