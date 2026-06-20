import React, { useState, useEffect } from 'react';

const StudyTracker = () => {
  const [subject, setSubject] = useState('');
  const [hours, setHours] = useState('');
  const [sessions, setSessions] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('studySessions') || '[]');
    setSessions(saved);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!subject.trim() || !hours || parseFloat(hours) <= 0) return;

    const newSession = {
      id: Date.now(),
      subject: subject.trim(),
      hours: parseFloat(hours),
      date: new Date().toISOString(),
    };

    const updated = [newSession, ...sessions];
    setSessions(updated);
    localStorage.setItem('studySessions', JSON.stringify(updated));

    setSubject('');
    setHours('');
    setSuccessMsg(`✅ Added ${hours}h of ${subject} successfully!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem('studySessions', JSON.stringify(updated));
  };

  const totalHours = sessions.reduce((sum, s) => sum + s.hours, 0);

  const today = new Date().toDateString();
  const hoursToday = sessions
    .filter(s => new Date(s.date).toDateString() === today)
    .reduce((sum, s) => sum + s.hours, 0);

  // Subject summary
  const subjectMap = {};
  sessions.forEach(s => {
    subjectMap[s.subject] = (subjectMap[s.subject] || 0) + s.hours;
  });
  const subjectList = Object.entries(subjectMap).sort((a, b) => b[1] - a[1]);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="study-tracker-section" className="space-y-6">
      {/* Header */}
      <div>
        <div className="section-badge bg-blue-500/10 border-blue-500/30 text-blue-400 mb-3">
          <span>📚</span> Study Tracker
        </div>
        <h2 className="section-title">Track Your Study Sessions</h2>
        <p className="text-gray-400 mt-1">Log what you study and how long. All data is saved locally.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Hours', value: `${totalHours.toFixed(1)}h`, icon: '⏱️', color: 'from-blue-600 to-indigo-600' },
          { label: 'Today', value: `${hoursToday.toFixed(1)}h`, icon: '☀️', color: 'from-amber-500 to-orange-600' },
          { label: 'Sessions', value: sessions.length, icon: '📝', color: 'from-purple-600 to-violet-700' },
          { label: 'Subjects', value: subjectList.length, icon: '📗', color: 'from-emerald-500 to-teal-600' },
        ].map((stat, i) => (
          <div key={i} id={`tracker-stat-${i}`} className={`rounded-xl bg-gradient-to-br ${stat.color} p-4 text-white`}>
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-black">{stat.value}</div>
            <div className="text-xs text-white/70 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Add Session Form */}
      <div className="card-glass p-4 sm:p-6 rounded-2xl">
        <h3 className="text-white font-bold text-lg mb-4">➕ Log a Study Session</h3>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject</label>
            <input
              id="study-subject-input"
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g., Mathematics, Physics..."
              className="input-field"
              required
            />
          </div>
          <div className="w-full sm:w-36">
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Hours Studied</label>
            <input
              id="study-hours-input"
              type="number"
              value={hours}
              onChange={e => setHours(e.target.value)}
              placeholder="e.g., 1.5"
              min="0.1"
              max="24"
              step="0.1"
              className="input-field"
              required
            />
          </div>
          <div className="flex items-end">
            <button id="add-session-btn" type="submit" className="btn-primary w-full sm:w-auto">
              <span>＋</span> Add Session
            </button>
          </div>
        </form>
        {successMsg && (
          <div className="mt-3 px-4 py-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm">
            {successMsg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session History */}
        <div className="lg:col-span-2 card-glass rounded-2xl p-4 sm:p-6">
          <h3 className="text-white font-bold text-lg mb-4">📋 Session History</h3>
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">📖</div>
              <p className="text-gray-500">No sessions logged yet.</p>
              <p className="text-gray-600 text-sm mt-1">Add your first study session above!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {sessions.map(session => (
                <div
                  key={session.id}
                  id={`session-${session.id}`}
                  className="flex items-center justify-between px-3 sm:px-4 py-3 rounded-xl bg-gray-900/60 border border-white/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-sm font-bold text-white shadow">
                      {session.subject[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{session.subject}</div>
                      <div className="text-gray-500 text-xs">{formatDate(session.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-blue-400 font-bold text-sm bg-blue-500/10 px-2.5 py-1 rounded-lg whitespace-nowrap">
                      {session.hours}h
                    </span>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="btn-danger sm:opacity-0 sm:group-hover:opacity-100"
                      title="Delete session"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject Summary */}
        <div className="card-glass rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">📊 By Subject</h3>
          {subjectList.length === 0 ? (
            <div className="text-center py-8 text-gray-600 text-sm">No data yet</div>
          ) : (
            <div className="space-y-3">
              {subjectList.map(([subj, hrs], i) => {
                const pct = totalHours > 0 ? Math.round((hrs / totalHours) * 100) : 0;
                const colors = [
                  'from-blue-500 to-indigo-600',
                  'from-purple-500 to-violet-700',
                  'from-emerald-500 to-teal-600',
                  'from-amber-500 to-orange-600',
                  'from-pink-500 to-rose-600',
                ];
                const color = colors[i % colors.length];
                return (
                  <div key={subj}>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span className="font-medium text-white">{subj}</span>
                      <span className="text-blue-400 font-semibold">{hrs.toFixed(1)}h ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudyTracker;
