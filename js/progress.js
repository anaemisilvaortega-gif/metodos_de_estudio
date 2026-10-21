/**
 * MINDU - Seguimiento del Aprendizaje y Bienestar
 * Métricas reflexivas que diferencian tiempo dedicado de resultados y comprensión real.
 * Cero rachas punitivas ni clasificaciones comparativas tóxicas.
 */

window.MinduProgress = (function () {
  const STORAGE_KEY_WELLBEING = 'mindu_daily_wellbeing';
  const STORAGE_KEY_METHOD_RATINGS = 'mindu_method_efficacy';

  function getWellbeingLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_WELLBEING);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading wellbeing logs:', e);
      return [];
    }
  }

  function logWellbeing(mood, energy, notes) {
    const logs = getWellbeingLogs();
    logs.unshift({
      id: `wb-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      mood, // 'tranquilo', 'animado', 'neutro', 'agobiado', 'cansado'
      energy, // 1 to 5
      notes: notes || '',
      timestamp: new Date().toISOString()
    });
    try {
      localStorage.setItem(STORAGE_KEY_WELLBEING, JSON.stringify(logs.slice(0, 30)));
    } catch (e) {
      console.warn('Error saving wellbeing log:', e);
    }
    return logs;
  }

  function getMethodRatings() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_METHOD_RATINGS);
      return data ? JSON.parse(data) : {
        'tecnica-feynman': { uses: 4, helpfulScore: 4.8 },
        'pomodoro-flexible': { uses: 8, helpfulScore: 4.9 },
        'flashcards-interactivas': { uses: 6, helpfulScore: 4.6 },
        'metodo-cornell': { uses: 3, helpfulScore: 4.2 }
      };
    } catch (e) {
      console.warn('Error reading method ratings:', e);
      return {};
    }
  }

  function rateMethod(methodId, stars) {
    const ratings = getMethodRatings();
    const current = ratings[methodId] || { uses: 0, helpfulScore: 4.5 };
    const newUses = current.uses + 1;
    const newScore = ((current.helpfulScore * current.uses) + stars) / newUses;

    ratings[methodId] = {
      uses: newUses,
      helpfulScore: Math.round(newScore * 10) / 10
    };

    try {
      localStorage.setItem(STORAGE_KEY_METHOD_RATINGS, JSON.stringify(ratings));
    } catch (e) {
      console.warn('Error saving method rating:', e);
    }
    return ratings[methodId];
  }

  function getSummaryMetrics() {
    // Calcular minutos de foco voluntariamente registrados
    let totalFocusMinutes = 0;
    try {
      const focusLogs = JSON.parse(localStorage.getItem('mindu_focus_history') || '[]');
      totalFocusMinutes = focusLogs.reduce((acc, log) => acc + (log.minutes || 0), 0);
      if (totalFocusMinutes === 0) totalFocusMinutes = 115; // Valor demo inicial inicial estimulante
    } catch (e) {
      totalFocusMinutes = 115;
    }

    // Materiales creados
    let materialsCount = 0;
    try {
      const materials = JSON.parse(localStorage.getItem('mindu_saved_materials') || '[]');
      materialsCount = materials.length;
      if (materialsCount === 0) materialsCount = 3;
    } catch (e) {
      materialsCount = 3;
    }

    // Quizzes realizados y % de acierto
    let quizAvg = 85;
    try {
      const quizLogs = JSON.parse(localStorage.getItem('mindu_quiz_history') || '[]');
      if (quizLogs.length > 0) {
        const sum = quizLogs.reduce((acc, q) => acc + (q.scorePercentage || 80), 0);
        quizAvg = Math.round(sum / quizLogs.length);
      }
    } catch (e) {
      quizAvg = 85;
    }

    // Flashcards dominadas
    let cardsDueToday = 0;
    let cardsMastered = 0;
    try {
      const deck = window.MinduPractice ? window.MinduPractice.getDeck() : [];
      const today = new Date().toISOString();
      cardsDueToday = deck.filter(c => !c.nextReviewDate || c.nextReviewDate <= today).length;
      cardsMastered = deck.filter(c => (c.repetitions || 0) >= 2).length;
    } catch (e) {
      cardsDueToday = 2;
      cardsMastered = 3;
    }

    // Métodos favoritos mejor calificados
    const ratings = getMethodRatings();
    const sortedMethods = Object.keys(ratings)
      .map(id => ({ id, ...ratings[id] }))
      .sort((a, b) => b.helpfulScore - a.helpfulScore);

    return {
      totalFocusMinutes,
      focusHoursFormatted: (totalFocusMinutes / 60).toFixed(1),
      materialsCount,
      quizAvg,
      cardsDueToday,
      cardsMastered,
      topMethods: sortedMethods.slice(0, 4),
      wellbeingLogs: getWellbeingLogs()
    };
  }

  return {
    getWellbeingLogs,
    logWellbeing,
    getMethodRatings,
    rateMethod,
    getSummaryMetrics
  };
})();
