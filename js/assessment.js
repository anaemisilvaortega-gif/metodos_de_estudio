/**
 * MINDU - Evaluación Inicial Personalizada
 * Diagnóstico interactivo de 9 preguntas con cálculo de perfil de aprendizaje
 * sin encasillamientos rígidos, promoviendo la combinación experimental de métodos.
 */

window.MinduAssessment = (function () {
  const STORAGE_KEY = 'mindu_student_profile';

  const questions = [
    {
      id: 'q1_difficulty',
      title: '1. ¿Qué te cuesta más al momento de estudiar?',
      subtitle: 'Identificar tu principal punto de fricción nos permite elegir la herramienta precisa.',
      type: 'single',
      options: [
        { value: 'comprender', label: 'Comprender conceptos abstractos o complejos', icon: '🧠', tag: 'Comprensión profunda' },
        { value: 'memorizar', label: 'Memorizar fórmulas, listas, nombres o fechas', icon: '📋', tag: 'Retención de datos' },
        { value: 'concentrarse', label: 'Mantener la concentración sin distraerme con el móvil o pensamientos', icon: '🎯', tag: 'Foco y atención' },
        { value: 'empezar', label: 'Empezar a estudiar (dar el primer paso me cuesta un mundo)', icon: '⏳', tag: 'Vencer la pereza' },
        { value: 'recordar', label: 'Recordar lo estudiado días o semanas después en el examen', icon: '🔄', tag: 'Memoria a largo plazo' }
      ]
    },
    {
      id: 'q2_attention_span',
      title: '2. ¿Cuánto tiempo puedes estudiar con foco antes de cansarte o dispersarte?',
      subtitle: 'Sé completamente honesto. No hay respuestas buenas ni malas.',
      type: 'single',
      options: [
        { value: '10-15', label: '10 a 15 minutos (me disperso con rapidez)', icon: '⚡', tag: 'Micro-sesiones' },
        { value: '20-25', label: '20 a 25 minutos (el ritmo clásico Pomodoro)', icon: '🍅', tag: 'Intervalos medios' },
        { value: '40-50', label: '40 a 50 minutos (puedo sumergirme un buen rato)', icon: '🌊', tag: 'Bloques sostenidos' },
        { value: '60+', label: 'Más de 1 hora (prefiero entrar en flujo continuo)', icon: '🚀', tag: 'Maratón profunda' }
      ]
    },
    {
      id: 'q3_comfort_style',
      title: '3. ¿Qué te resulta más cómodo o natural al interactuar con información nueva?',
      subtitle: 'Selecciona la opción con la que sientas mayor afinidad natural.',
      type: 'single',
      options: [
        { value: 'visual', label: 'Observar esquemas, mapas, gráficos, diagramas y colores', icon: '👁️', tag: 'Visual y espacial' },
        { value: 'reading', label: 'Leer textos ordenados, subrayar y tomar notas escritas', icon: '✍️', tag: 'Lectoescritura' },
        { value: 'audio', label: 'Escuchar explicaciones habladas, podcasts o debates', icon: '🎧', tag: 'Auditivo y verbal' },
        { value: 'practical', label: 'Resolver ejercicios prácticos, hacer pruebas y aplicar', icon: '🛠️', tag: 'Práctica activa' }
      ]
    },
    {
      id: 'q4_sound_preference',
      title: '4. ¿En qué entorno sonoro trabajas mejor?',
      subtitle: 'El sonido adecuado reduce la dispersión auditiva del entorno.',
      type: 'single',
      options: [
        { value: 'silence', label: 'Silencio absoluto (cualquier murmullo me distrae)', icon: '🤫', tag: 'Silencio' },
        { value: 'ambient', label: 'Sonidos ambientales suaves (lluvia, murmullo de biblioteca, ruido blanco)', icon: '🌧️', tag: 'Ruido ambiental' },
        { value: 'lofi', label: 'Música lo-fi o instrumental sin voces', icon: '🎵', tag: 'Lo-fi / Ondas Alfa' },
        { value: 'music', label: 'Música con ritmo para mantener la energía alta', icon: '🎸', tag: 'Ritmo activo' }
      ]
    },
    {
      id: 'q5_block_trigger',
      title: '5. ¿Qué situación suele detonar tu bloqueo mental?',
      subtitle: 'Reconocer el detonante es el 50% de la solución.',
      type: 'single',
      options: [
        { value: 'noise', label: 'El desorden a mi alrededor, ruidos o interrupciones constantes', icon: '📢', tag: 'Sensibilidad ambiental' },
        { value: 'mountain', label: 'Tener una montaña gigante de tareas y no saber por dónde empezar', icon: '🏔️', tag: 'Sobrecarga ejecutiva' },
        { value: 'dense', label: 'Encontrarme con un texto denso que no entiendo a la primera', icon: '📖', tag: 'Frustración conceptual' },
        { value: 'boredom', label: 'Sentir aburrimiento porque la materia me parece monótona', icon: '🥱', tag: 'Baja estimulación' }
      ]
    },
    {
      id: 'q6_hard_subjects',
      title: '6. ¿Qué materias o temáticas te resultan tradicionalmente más desafiantes?',
      subtitle: 'Selecciona el área donde más te gustaría mejorar tus técnicas.',
      type: 'single',
      options: [
        { value: 'exactas', label: 'Matemáticas, Física o Química (fórmulas y problemas)', icon: '📐', tag: 'Ciencias Exactas' },
        { value: 'humanidades', label: 'Historia, Filosofía, Literatura o Leyes (textos extensos y fechas)', icon: '🏛️', tag: 'Humanidades y Teoría' },
        { value: 'biologicas', label: 'Biología, Medicina o Anatomía (gran volumen de conceptos y nombres)', icon: '🧬', tag: 'Ciencias de la Salud' },
        { value: 'idiomas', label: 'Idiomas extranjeros (vocabulario, gramática y expresión oral)', icon: '🌍', tag: 'Lenguas Extranjeras' },
        { value: 'tecnologia', label: 'Programación, Tecnología o Lógica formal', icon: '💻', tag: 'Computación y Lógica' }
      ]
    },
    {
      id: 'q7_daily_time',
      title: '7. ¿De cuánto tiempo real dispones al día para estudiar?',
      subtitle: 'Contando clases, compromisos y tiempo de descanso saludable.',
      type: 'single',
      options: [
        { value: 'under1', label: 'Menos de 1 hora al día (muy ajustado)', icon: '⏱️', tag: 'Micro-bloques ultra enfocados' },
        { value: '1to2', label: '1 a 2 horas al día (tiempo balanceado)', icon: '⏳', tag: 'Sesión estándar' },
        { value: '2to4', label: '2 a 4 horas al día (dedicación profunda)', icon: '📚', tag: 'Intensivo estructurado' },
        { value: '4plus', label: 'Más de 4 horas al día (oposiciones o universidad intensiva)', icon: '🏛️', tag: 'Gestión de energía crítica' }
      ]
    },
    {
      id: 'q8_break_style',
      title: '8. ¿Qué estructura de descansos sientes que te ayuda a no quemarte?',
      subtitle: 'Un buen descanso consolida lo aprendido en la memoria.',
      type: 'single',
      options: [
        { value: 'frequent', label: 'Pausas muy frecuentes y breves (ej: cada 15 min parar 3 min)', icon: '☕', tag: 'Pausas ágiles' },
        { value: 'standard', label: 'Pausas intermedias cada 25 a 30 minutos (5 min descanso)', icon: '🧘', tag: 'Ritmo clásico' },
        { value: 'long', label: 'Bloques de 50 minutos con descansos generosos de 15 minutos', icon: '🚶', tag: 'Bloques de inmersión' }
      ]
    },
    {
      id: 'q9_main_goal',
      title: '9. ¿Cuál es tu objetivo primordial en este momento?',
      subtitle: 'Tu meta dicta la estrategia inmediata.',
      type: 'single',
      options: [
        { value: 'exam_soon', label: 'Tengo un examen inminente en pocos días (priorizar lo esencial y retener)', icon: '🚨', tag: 'Modo Urgencia Estratégica' },
        { value: 'long_term', label: 'Quiero aprender de verdad a largo plazo y construir hábitos duraderos', icon: '🌱', tag: 'Hábitos Sostenibles' },
        { value: 'pass_project', label: 'Debo entregar un proyecto grande, monografía o memoria', icon: '📑', tag: 'Ejecución de Proyectos' },
        { value: 'enjoy', label: 'Quiero quitarme la ansiedad del estudio y volver a disfrutar de aprender', icon: '✨', tag: 'Bienestar y Confianza' }
      ]
    }
  ];

  function getSavedProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Error reading Mindu profile from localStorage:', e);
      return null;
    }
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Error saving Mindu profile:', e);
    }
  }

  function calculateProfile(answers) {
    const diff = answers.q1_difficulty || 'concentrarse';
    const span = answers.q2_attention_span || '20-25';
    const style = answers.q3_comfort_style || 'visual';
    const sound = answers.q4_sound_preference || 'ambient';
    const block = answers.q5_block_trigger || 'mountain';
    const subject = answers.q6_hard_subjects || 'exactas';
    const time = answers.q7_daily_time || '1to2';
    const breakStyle = answers.q8_break_style || 'standard';
    const goal = answers.q9_main_goal || 'long_term';

    // Determinar arquetipo empático y no encasillante
    let profileName = 'Estratega Modular';
    let archetypeBadge = 'Aprendiz Dinámico';
    let summaryText = '';
    let coreFocus = '';

    if (diff === 'concentrarse' || span === '10-15') {
      profileName = 'Explorador por Micro-Ráfagas';
      archetypeBadge = 'Foco Ágil & Sensible';
      summaryText = 'Tu mente se satura con sesiones monótonas prolongadas, pero responde de forma brillante ante estímulos claros, tareas breves y transiciones activas.';
      coreFocus = 'Microestudio, temporizadores flexibles de 15 minutos, pausas activas y un solo objetivo visible.';
    } else if (diff === 'comprender') {
      profileName = 'Arquitecto de Conceptos';
      archetypeBadge = 'Profundidad & Lógica';
      summaryText = 'Necesitas entender los engranajes lógicos y el "por qué" de las cosas antes de memorizar datos sueltos. Cuando ves la lógica, la memoria llega sola.';
      coreFocus = 'Técnica Feynman, mapas conceptuales con relaciones causa-efecto y analogías cotidianas.';
    } else if (diff === 'memorizar' || diff === 'recordar') {
      profileName = 'Especialista en Retención Activa';
      archetypeBadge = 'Neuro-Consolidación';
      summaryText = 'Releer te hace perder tiempo valioso. Tu superpoder se activará cuando cambies el consumo pasivo por la extracción activa de información de tu mente.';
      coreFocus = 'Active Recall, repetición espaciada con flashcards y cuestionarios con respuestas argumentadas.';
    } else if (diff === 'empezar') {
      profileName = 'Navegante de Baja Fricción';
      archetypeBadge = 'Inercia Progresiva';
      summaryText = 'El mayor obstáculo no es tu capacidad intelectual, sino el arranque inicial. Una vez superado el primer paso diminuto, tu rendimiento se multiplica.';
      coreFocus = 'Regla de los 5 minutos, desglose de objetivos mínimos viables (OMV) y compañero de Body Doubling.';
    } else {
      profileName = 'Estratega Modular Multimodal';
      archetypeBadge = 'Adaptabilidad Flexible';
      summaryText = 'Tienes una base equilibrada que se potenciará al máximo combinando herramientas visuales, explicaciones orales y práctica intercalada.';
      coreFocus = 'Método Cornell, práctica intercalada y planificador semanal con reservas comodín.';
    }

    // Métodos primarios recomendados
    const recommendedMethodIds = [];

    // Según dificultad
    if (diff === 'comprender') {
      recommendedMethodIds.push('tecnica-feynman', 'mapas-conceptuales', 'metodo-preguntas-respuestas');
    } else if (diff === 'memorizar') {
      recommendedMethodIds.push('recuperacion-activa', 'flashcards-interactivas', 'mnemotecnias-asociaciones');
    } else if (diff === 'concentrarse') {
      recommendedMethodIds.push('pomodoro-flexible', 'body-doubling', 'estudio-por-bloques');
    } else if (diff === 'empezar') {
      recommendedMethodIds.push('regla-cinco-minutos', 'microestudio', 'objetivos-minimos-viables');
    } else {
      recommendedMethodIds.push('repeticion-espaciada', 'cuestionarios-practica', 'metodo-cornell');
    }

    // Según span
    if (span === '10-15') {
      recommendedMethodIds.push('microestudio');
    } else if (span === '20-25') {
      recommendedMethodIds.push('pomodoro-flexible');
    }

    // Según preferencia de estilo
    if (style === 'visual') {
      recommendedMethodIds.push('mapas-mentales', 'infografias-educativas', 'esquemas-colores');
    } else if (style === 'reading') {
      recommendedMethodIds.push('metodo-cornell', 'resumenes-efectivos', 'lectura-activa-sq3r');
    } else if (style === 'audio') {
      recommendedMethodIds.push('podcasts-educativos', 'grabacion-propia', 'dialogo-socratico');
    } else {
      recommendedMethodIds.push('practica-intercalada', 'cuestionarios-practica');
    }

    // Siempre añadir métodos de calma y organización
    recommendedMethodIds.push('sistema-reinicio-sin-culpa', 'pausas-activas', 'matriz-eisenhower');

    // Desduplicar
    const uniqueRecommendedIds = Array.from(new Set(recommendedMethodIds));

    // Radar de afinidades (0 a 100)
    const skillsRadar = {
      visual: style === 'visual' ? 90 : 65,
      lectoescritura: style === 'reading' ? 92 : 60,
      auditivo: style === 'audio' ? 88 : 55,
      practico: style === 'practical' ? 95 : 70,
      focoAgil: span === '10-15' || span === '20-25' ? 90 : 60,
      recuperacion: diff === 'memorizar' || diff === 'recordar' ? 85 : 70
    };

    const initialPlan = [
      {
        step: 1,
        title: 'Preparación del entorno sin distracciones (5 min)',
        desc: 'Mesa limpia, teléfono en silencio boca abajo y sonido ambiental configurado a tu gusto.'
      },
      {
        step: 2,
        title: `Sesión de foco inicial (${span === '10-15' ? '12 min' : span === '20-25' ? '20 min' : '30 min'})`,
        desc: 'Una única tarea concreta. Si la mente divaga, acéptalo con amabilidad y regresa al papel.'
      },
      {
        step: 3,
        title: 'Pausa activa y respiración (3 a 5 min)',
        desc: 'Levántate, mira por la ventana para descansar la vista y bebe un trago de agua.'
      },
      {
        step: 4,
        title: 'Recuperación activa o autoevaluación (10 min)',
        desc: 'Cierra el material y anota en sucio qué 3 conceptos recuerdas sin mirar antes de dar por cerrada la sesión.'
      }
    ];

    return {
      timestamp: new Date().toISOString(),
      answers,
      profileName,
      archetypeBadge,
      summaryText,
      coreFocus,
      recommendedMethodIds: uniqueRecommendedIds,
      skillsRadar,
      initialPlan,
      testedMethodsFeedback: {}
    };
  }

  return {
    questions,
    getSavedProfile,
    saveProfile,
    calculateProfile
  };
})();
