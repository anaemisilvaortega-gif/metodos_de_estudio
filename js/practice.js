/**
 * MINDU - Practicar y Recordar
 * Sistema de Flashcards interactivas con Repetición Espaciada (algoritmo Leitner),
 * Motor de Quizzes con retroalimentación argumentada y Taller Feynman interactivo.
 */

window.MinduPractice = (function () {
  const STORAGE_KEY_FLASHCARDS = 'mindu_flashcards_deck';
  const STORAGE_KEY_QUIZ_STATS = 'mindu_quiz_history';

  // Mazo predeterminado de alta calidad si no hay datos en localStorage
  const defaultFlashcards = [
    {
      id: 'dfc-1',
      topic: 'Biología Celular',
      front: '¿Cuál es la función principal de la Mitocondria y qué molécula sintetiza?',
      back: 'Actúa como la central energética de la célula: realiza la respiración celular y sintetiza ATP (adenosín trifosfato).',
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString()
    },
    {
      id: 'dfc-2',
      topic: 'Historia Universal',
      front: '¿En qué año se firmó la Declaración de los Derechos del Hombre y del Ciudadano y qué proclamó?',
      back: 'En 1789 durante la Revolución Francesa. Proclamó la igualdad ante la ley, la libertad individual y la soberanía popular frente al absolutismo.',
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString()
    },
    {
      id: 'dfc-3',
      topic: 'Matemáticas',
      front: '¿Cuál es la fórmula del Teorema de Pitágoras y para qué tipo de triángulos aplica?',
      back: 'c² = a² + b² (la suma de los cuadrados de los catetos es igual al cuadrado de la hipotenusa). Aplica exclusivamente a triángulos rectángulos (con un ángulo de 90°).',
      interval: 2,
      repetitions: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString()
    },
    {
      id: 'dfc-4',
      topic: 'Metodología de Estudio',
      front: '¿En qué consiste el principio de "Active Recall" frente a la relectura pasiva?',
      back: 'En forzar al cerebro a recuperar la información de memoria sin mirar el texto. Es el esfuerzo cognitivo de extracción el que consolida la memoria a largo plazo.',
      interval: 3,
      repetitions: 2,
      easeFactor: 2.6,
      nextReviewDate: new Date().toISOString()
    },
    {
      id: 'dfc-5',
      topic: 'Química',
      front: '¿Qué es el número atómico (Z) y en qué se diferencia del número másico (A)?',
      back: 'Z es el número de protones en el núcleo y define la identidad del elemento. A es la suma de protones más neutrones.',
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString()
    }
  ];

  // Banco de preguntas de evaluación interactiva
  const defaultQuizzes = [
    {
      id: 'quiz-bio-1',
      topic: 'Biología: Procesos Celulares',
      question: '¿Por qué la fotosíntesis en las plantas produce oxígeno como subproducto?',
      options: [
        'Porque la planta necesita deshacerse del oxígeno del CO2 atmosférico.',
        'Porque en la fase luminosa se rompen moléculas de agua (H2O) mediante fotólisis para obtener electrones y protones.',
        'Porque el ciclo de Calvin descompone la glucosa para liberar calor.',
        'Porque las mitocondrias expulsan oxígeno sobrante durante la noche.'
      ],
      correctIndex: 1,
      explanation: 'En la fase fotoquímica (luminosa) de la fotosíntesis, el agua se escinde (fotólisis del H2O) para donar electrones a la clorofila excitada. El oxígeno molecular (O2) queda como subproducto liberado al aire.'
    },
    {
      id: 'quiz-hist-1',
      topic: 'Historia: Movimientos Sociales',
      question: '¿Cuál fue una de las causas económicas determinantes para el estallido de la Revolución Francesa en 1789?',
      options: [
        'El exceso de oro traído de las colonias americanas.',
        'La bancarrota del Estado francés y las malas cosechas que dispararon el precio del pan.',
        'La invasión militar de Prusia sobre París.',
        'La eliminación de todos los impuestos a la burguesía.'
      ],
      correctIndex: 1,
      explanation: 'Francia arrastraba una deuda colosal agravada por la Guerra de los Siete Años y el apoyo a la revolución americana, a lo que se sumó una crisis climática y agrícola que provocó hambrunas y descontento masivo.'
    },
    {
      id: 'quiz-math-1',
      topic: 'Geometría: Triángulos Rectángulos',
      question: 'Si en un triángulo rectángulo los catetos miden 6 cm y 8 cm, ¿cuánto mide la hipotenusa?',
      options: [
        '14 cm',
        '10 cm',
        '12 cm',
        '48 cm'
      ],
      correctIndex: 1,
      explanation: 'Aplicando Pitágoras: c² = 6² + 8² = 36 + 64 = 100. Por lo tanto, c = √100 = 10 cm (es una ampliación de la terna clásica 3-4-5).'
    },
    {
      id: 'quiz-neuro-1',
      topic: 'Neurociencia del Aprendizaje',
      question: '¿Por qué la "Repetición Espaciada" es significativamente más efectiva que estudiar 8 horas seguidas la víspera del examen?',
      options: [
        'Porque el cerebro solo puede aprender de día y no de noche.',
        'Porque repasar en el momento de mayor vulnerabilidad al olvido refuerza la mielinización de las sinapsis y transfiere datos a la memoria de largo plazo.',
        'Porque estudiar en maratones quema físicamente las neuronas de forma irreversible.',
        'Porque las materias no se pueden mezclar bajo ninguna circunstancia.'
      ],
      correctIndex: 1,
      explanation: 'Al dejar pasar un intervalo controlado, el esfuerzo de reactivar el recuerdo debilita la curva del olvido de Ebbinghaus, consolidando la huella mnémica de forma duradera.'
    }
  ];

  function getDeck() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_FLASHCARDS);
      return data ? JSON.parse(data) : defaultFlashcards;
    } catch (e) {
      console.warn('Error reading flashcards:', e);
      return defaultFlashcards;
    }
  }

  function saveDeck(deck) {
    try {
      localStorage.setItem(STORAGE_KEY_FLASHCARDS, JSON.stringify(deck));
    } catch (e) {
      console.warn('Error saving deck:', e);
    }
  }

  function addCard(topic, front, back) {
    const deck = getDeck();
    const newCard = {
      id: `fc-${Date.now()}`,
      topic: topic || 'General',
      front,
      back,
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString()
    };
    deck.unshift(newCard);
    saveDeck(deck);
    return newCard;
  }

  function addCardsBatch(cards) {
    const deck = getDeck();
    cards.forEach(c => {
      deck.unshift({
        id: c.id || `fc-${Date.now()}-${Math.random()}`,
        topic: c.topic || 'Importado',
        front: c.front,
        back: c.back,
        interval: 1,
        repetitions: 0,
        easeFactor: 2.5,
        nextReviewDate: new Date().toISOString()
      });
    });
    saveDeck(deck);
  }

  function deleteCard(id) {
    let deck = getDeck();
    deck = deck.filter(c => c.id !== id);
    saveDeck(deck);
    return deck;
  }

  /**
   * Actualiza el intervalo según el algoritmo Leitner simplificado
   * rating: 'easy' (+intervalo grande), 'good' (+intervalo medio), 'hard' (resetea a 1)
   */
  function reviewCard(cardId, rating) {
    const deck = getDeck();
    const card = deck.find(c => c.id === cardId);
    if (!card) return;

    if (rating === 'easy') {
      card.repetitions = (card.repetitions || 0) + 1;
      card.interval = Math.round((card.interval || 1) * 2.5) + 1;
    } else if (rating === 'good') {
      card.repetitions = (card.repetitions || 0) + 1;
      card.interval = Math.round((card.interval || 1) * 1.8) + 1;
    } else {
      // 'hard'
      card.repetitions = 0;
      card.interval = 1;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + card.interval);
    card.nextReviewDate = nextDate.toISOString();
    card.lastReviewed = new Date().toISOString();

    saveDeck(deck);
    logPracticeResult('flashcard', rating, card.topic);
    return card;
  }

  function getQuizzes() {
    return defaultQuizzes;
  }

  function logQuizAttempt(quizId, scorePercentage, correctCount, totalCount) {
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEY_QUIZ_STATS) || '[]');
      history.unshift({
        id: `quiz-run-${Date.now()}`,
        quizId,
        scorePercentage,
        correctCount,
        totalCount,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY_QUIZ_STATS, JSON.stringify(history.slice(0, 50)));
    } catch (e) {
      console.warn('Error saving quiz log:', e);
    }
  }

  function logPracticeResult(type, outcome, topic) {
    try {
      const logs = JSON.parse(localStorage.getItem('mindu_practice_logs') || '[]');
      logs.unshift({
        id: `prac-${Date.now()}`,
        type,
        outcome,
        topic,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('mindu_practice_logs', JSON.stringify(logs.slice(0, 100)));
    } catch (e) {
      console.warn('Error saving practice log:', e);
    }
  }

  return {
    getDeck,
    saveDeck,
    addCard,
    addCardsBatch,
    deleteCard,
    reviewCard,
    getQuizzes,
    logQuizAttempt
  };
})();
