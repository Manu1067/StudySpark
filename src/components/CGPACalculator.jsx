import React, { useState } from 'react';

const CGPACalculator = () => {
  const [currentCGPA, setCurrentCGPA] = useState('');
  const [creditsCompleted, setCreditsCompleted] = useState('');
  const [semesterCredits, setSemesterCredits] = useState('');
  const [targetCGPA, setTargetCGPA] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();

    const cgpa = parseFloat(currentCGPA);
    const credits = parseFloat(creditsCompleted);
    const semCredits = parseFloat(semesterCredits);
    const target = parseFloat(targetCGPA);

    if (isNaN(cgpa) || isNaN(credits) || isNaN(semCredits) || isNaN(target)) return;

    // Formula: RequiredSGPA = (Target * (Credits + SemCredits) - CurrentCGPA * Credits) / SemCredits
    const totalCreditsAfter = credits + semCredits;
    const requiredSGPA = (target * totalCreditsAfter - cgpa * credits) / semCredits;

    setResult({
      requiredSGPA: Math.round(requiredSGPA * 100) / 100,
      achievable: requiredSGPA <= 10,
      totalCredits: totalCreditsAfter,
    });
  };

  const reset = () => {
    setCurrentCGPA('');
    setCreditsCompleted('');
    setSemesterCredits('');
    setTargetCGPA('');
    setResult(null);
  };

  const getAchievabilityInfo = (sgpa, achievable) => {
    if (!achievable) return {
      color: 'from-red-600 to-rose-700',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      icon: '⚠️',
      message: 'Difficult',
      subtext: 'This target may be very challenging. Consider setting a more achievable CGPA goal.',
      badge: 'bg-red-500/20 text-red-300 border border-red-500/30',
    };
    if (sgpa >= 9) return {
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      icon: '🏆',
      message: 'Achievable (Challenging)',
      subtext: 'This is a high bar but achievable with dedicated effort!',
      badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    };
    return {
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
      icon: '✅',
      message: 'Achievable',
      subtext: 'Great news! This target is well within your reach. Keep up the good work!',
      badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    };
  };

  const inputFields = [
    {
      id: 'current-cgpa-input',
      label: 'Current CGPA',
      value: currentCGPA,
      setter: setCurrentCGPA,
      placeholder: 'e.g., 7.5',
      min: 0, max: 10, step: 0.01,
      icon: '📊',
      hint: 'Your CGPA up to last semester'
    },
    {
      id: 'credits-completed-input',
      label: 'Credits Completed',
      value: creditsCompleted,
      setter: setCreditsCompleted,
      placeholder: 'e.g., 80',
      min: 0, step: 1,
      icon: '🎓',
      hint: 'Total credits earned so far'
    },
    {
      id: 'semester-credits-input',
      label: 'Current Semester Credits',
      value: semesterCredits,
      setter: setSemesterCredits,
      placeholder: 'e.g., 22',
      min: 1, step: 1,
      icon: '📅',
      hint: 'Credits in this semester'
    },
    {
      id: 'target-cgpa-input',
      label: 'Target CGPA',
      value: targetCGPA,
      setter: setTargetCGPA,
      placeholder: 'e.g., 8.0',
      min: 0, max: 10, step: 0.01,
      icon: '🎯',
      hint: 'Your desired CGPA after this semester'
    },
  ];

  return (
    <section id="cgpa-calculator-section" className="space-y-6">
      {/* Header */}
      <div>
        <div className="section-badge bg-emerald-500/10 border-emerald-500/30 text-emerald-400 mb-3">
          <span>🎯</span> CGPA Calculator
        </div>
        <h2 className="section-title">CGPA Goal Calculator</h2>
        <p className="text-gray-400 mt-1">
          Find the required SGPA this semester to hit your target CGPA.
        </p>
      </div>

      {/* Formula info */}
      <div className="rounded-xl bg-blue-900/20 border border-blue-500/20 p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-xl">ℹ️</span>
          <div>
            <div className="text-blue-300 font-semibold text-sm mb-1">How it's calculated</div>
            <div className="text-gray-400 text-xs font-mono bg-gray-900/50 px-3 py-2 rounded-lg mt-1 break-words leading-relaxed">
              Required SGPA = (Target CGPA × Total Credits − Current CGPA × Credits Completed) ÷ Semester Credits
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="card-glass rounded-2xl p-4 sm:p-6">
          <h3 className="text-white font-bold text-lg mb-5">Enter Your Details</h3>
          <form onSubmit={calculate} className="space-y-4">
            {inputFields.map(field => (
              <div key={field.id}>
                <label className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1.5">
                  <span>{field.icon}</span>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type="number"
                  value={field.value}
                  onChange={e => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="input-field"
                  required
                />
                <div className="text-gray-600 text-xs mt-1">{field.hint}</div>
              </div>
            ))}

            <div className="flex flex-col xs:flex-row gap-3 pt-2">
              <button id="calculate-cgpa-btn" type="submit" className="btn-primary w-full">
                ⚡ Calculate Required SGPA
              </button>
              <button
                id="reset-cgpa-btn"
                type="button"
                onClick={reset}
                className="w-full xs:w-auto px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-all border border-white/10"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Result Panel */}
        <div className="card-glass rounded-2xl p-4 sm:p-6 flex flex-col">
          <h3 className="text-white font-bold text-lg mb-5">📈 Result</h3>

          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-4xl mb-4">
                🧮
              </div>
              <p className="text-gray-400">Fill in your details and click Calculate.</p>
              <p className="text-gray-600 text-sm mt-1">Your result will appear here.</p>
            </div>
          ) : (() => {
            const info = getAchievabilityInfo(result.requiredSGPA, result.achievable);
            return (
              <div className="flex-1 flex flex-col gap-5 animate-fade-in-up">
                {/* Required SGPA Big Display */}
                <div className={`rounded-2xl bg-gradient-to-br ${info.color} p-6 text-center shadow-lg`}>
                  <div className="text-white/70 text-sm font-medium mb-1">Required SGPA</div>
                  <div className="text-6xl font-black text-white tracking-tight mb-2">
                    {result.requiredSGPA > 10 ? '>10' : result.requiredSGPA < 0 ? '<0' : result.requiredSGPA.toFixed(2)}
                  </div>
                  <div className="text-white/70 text-xs">out of 10.0</div>
                </div>

                {/* Achievability Badge */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${info.bgColor} border ${info.borderColor}`}>
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <div className={`font-bold text-base ${info.textColor}`}>{info.message}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{info.subtext}</div>
                  </div>
                </div>

                {/* Summary table */}
                <div className="rounded-xl bg-gray-900/50 border border-white/5 p-4 space-y-2">
                  {[
                    { label: 'Current CGPA', value: parseFloat(currentCGPA).toFixed(2) },
                    { label: 'Credits Completed', value: creditsCompleted },
                    { label: 'Semester Credits', value: semesterCredits },
                    { label: 'Total Credits After', value: result.totalCredits },
                    { label: 'Target CGPA', value: parseFloat(targetCGPA).toFixed(2) },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{row.label}</span>
                      <span className="text-white font-medium">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default CGPACalculator;
