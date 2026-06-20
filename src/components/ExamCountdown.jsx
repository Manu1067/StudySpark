import React, { useState, useEffect } from 'react';

const ExamCountdown = () => {
  const [exams, setExams] = useState([]);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('exams') || '[]');
    setExams(saved);

    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!examName.trim() || !examDate) return;

    const newExam = {
      id: Date.now(),
      name: examName.trim(),
      date: examDate,
    };

    const updated = [...exams, newExam].sort((a, b) => new Date(a.date) - new Date(b.date));
    setExams(updated);
    localStorage.setItem('exams', JSON.stringify(updated));

    setExamName('');
    setExamDate('');
    setSuccessMsg(`📅 "${examName}" exam added!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id) => {
    const updated = exams.filter(e => e.id !== id);
    setExams(updated);
    localStorage.setItem('exams', JSON.stringify(updated));
  };

  const getDaysRemaining = (dateStr) => {
    const examDay = new Date(dateStr);
    examDay.setHours(23, 59, 59, 999);
    const diff = examDay - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getUrgencyStyle = (days) => {
    if (days < 0) return { bg: 'bg-gray-700/40', badge: 'bg-gray-600 text-gray-300', icon: '✅', label: 'Completed' };
    if (days === 0) return { bg: 'bg-red-900/30 border-red-500/30', badge: 'bg-red-600 text-white', icon: '🚨', label: 'Today!' };
    if (days <= 3) return { bg: 'bg-red-900/20 border-red-500/20', badge: 'bg-red-500/80 text-white', icon: '🔴', label: `${days}d left` };
    if (days <= 7) return { bg: 'bg-amber-900/20 border-amber-500/20', badge: 'bg-amber-500/80 text-white', icon: '🟡', label: `${days}d left` };
    if (days <= 30) return { bg: 'bg-blue-900/20 border-blue-500/20', badge: 'bg-blue-600/80 text-white', icon: '🔵', label: `${days}d left` };
    return { bg: 'bg-purple-900/20 border-purple-500/20', badge: 'bg-purple-600/80 text-white', icon: '🟣', label: `${days}d left` };
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const upcoming = exams.filter(e => getDaysRemaining(e.date) >= 0);
  const past = exams.filter(e => getDaysRemaining(e.date) < 0);

  return (
    <section id="exam-countdown-section" className="space-y-6">
      {/* Header */}
      <div>
        <div className="section-badge bg-purple-500/10 border-purple-500/30 text-purple-400 mb-3">
          <span>⏰</span> Exam Countdown
        </div>
        <h2 className="section-title">Never Miss an Exam</h2>
        <p className="text-gray-400 mt-1">Schedule your exams and track the countdown in real-time.</p>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm font-medium">
          📋 {upcoming.length} Upcoming
        </span>
        <span className="px-4 py-2 rounded-full bg-gray-700/40 border border-white/10 text-gray-400 text-sm font-medium">
          ✅ {past.length} Completed
        </span>
      </div>

      {/* Add Exam Form */}
      <div className="card-glass p-4 sm:p-6 rounded-2xl">
        <h3 className="text-white font-bold text-lg mb-4">➕ Schedule an Exam</h3>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Exam Name</label>
            <input
              id="exam-name-input"
              type="text"
              value={examName}
              onChange={e => setExamName(e.target.value)}
              placeholder="e.g., Mathematics Final, Physics Mid-term..."
              className="input-field"
              required
            />
          </div>
          <div className="w-full sm:w-48">
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Exam Date</label>
            <input
              id="exam-date-input"
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              min={todayStr}
              className="input-field"
              required
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div className="flex items-end">
            <button id="add-exam-btn" type="submit" className="btn-primary w-full sm:w-auto">
              <span>＋</span> Add Exam
            </button>
          </div>
        </form>
        {successMsg && (
          <div className="mt-3 px-4 py-2.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 text-sm">
            {successMsg}
          </div>
        )}
      </div>

      {/* Upcoming Exams */}
      {upcoming.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-base flex items-center gap-2">
            <span className="text-purple-400">📅</span> Upcoming Exams
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upcoming.map(exam => {
              const days = getDaysRemaining(exam.date);
              const style = getUrgencyStyle(days);
              const examDateObj = new Date(exam.date);
              const formattedDate = examDateObj.toLocaleDateString('en-IN', {
                weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
              });

              return (
                <div
                  key={exam.id}
                  id={`exam-${exam.id}`}
                  className={`relative overflow-hidden rounded-xl border p-5 ${style.bg} transition-all hover:-translate-y-0.5 hover:shadow-lg group`}
                >
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="flex-shrink-0 text-xl">{style.icon}</span>
                      <h4 className="text-white font-bold text-base truncate">{exam.name}</h4>
                    </div>
                    <button
                      onClick={() => handleDelete(exam.id)}
                      className="btn-danger flex-shrink-0 sm:opacity-0 sm:group-hover:opacity-100 text-xs"
                      title="Delete exam"
                    >
                      🗑
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">{formattedDate}</div>
                      <div className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}>
                        {style.label}
                      </div>
                    </div>

                    {/* Large countdown display */}
                    <div className="text-right">
                      {days === 0 ? (
                        <div className="text-3xl font-black text-red-400 animate-pulse">NOW!</div>
                      ) : (
                        <div>
                          <div className="text-3xl font-black text-white">{days}</div>
                          <div className="text-gray-400 text-xs">days</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar based on days */}
                  <div className="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
                      style={{ width: `${Math.max(5, Math.min(100, 100 - (days / 90) * 100))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Past Exams */}
      {past.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-base flex items-center gap-2">
            <span>✅</span> Completed Exams
          </h3>
          <div className="space-y-2">
            {past.map(exam => {
              const examDateObj = new Date(exam.date);
              const formattedDate = examDateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
              return (
                <div
                  key={exam.id}
                  id={`past-exam-${exam.id}`}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-900/40 border border-white/5 opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">✅</span>
                    <div>
                      <span className="text-gray-300 text-sm font-medium line-through">{exam.name}</span>
                      <div className="text-gray-600 text-xs">{formattedDate}</div>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(exam.id)} className="btn-danger text-xs">
                    🗑
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {exams.length === 0 && (
        <div className="text-center py-16 card-glass rounded-2xl">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-white font-semibold mb-1">No Exams Scheduled</h3>
          <p className="text-gray-500 text-sm">Add your upcoming exams using the form above.</p>
        </div>
      )}
    </section>
  );
};

export default ExamCountdown;
