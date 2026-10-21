/**
 * MINDU - Herramienta «Convierte cualquier tema»
 * Transforma apuntes o temas en 10 formatos interactivos de estudio:
 * Resumen, Mapa Mental, Mapa Conceptual, Preguntas de Práctica, Flashcards,
 * Guion de Podcast con TTS, Línea de Tiempo, Feynman, Cuestionario y Guía de Repaso.
 */

window.MinduConverter = (function () {
  const STORAGE_KEY = 'mindu_saved_materials';

  function getSavedMaterials() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading materials:', e);
      return [];
    }
  }

  function saveMaterial(material) {
    const list = getSavedMaterials();
    const existingIndex = list.findIndex(m => m.id === material.id);
    if (existingIndex >= 0) {
      list[existingIndex] = material;
    } else {
      list.unshift(material);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Error saving material:', e);
    }
    return list;
  }

  function deleteMaterial(id) {
    let list = getSavedMaterials();
    list = list.filter(m => m.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Error deleting material:', e);
    }
    return list;
  }

  /**
   * Extrae oraciones y entidades básicas de un texto libre
   */
  function analyzeText(rawText, topicTitle) {
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const paragraphs = rawText.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
    const sentences = rawText.match(/[^.!?]+[.!?]+/g) || [rawText];
    const cleanedSentences = sentences.map(s => s.trim()).filter(s => s.length > 8);

    // Detección de posibles listas o viñetas
    const bullets = lines.filter(l => /^[-*•\d+.]\s+/.test(l)).map(l => l.replace(/^[-*•\d+.]\s+/, '').trim());

    // Palabras destacadas o en mayúsculas / entre paréntesis
    const keywordMatches = rawText.match(/\b[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{3,}\b/g) || [];
    const uniqueKeywords = Array.from(new Set(keywordMatches)).slice(0, 12);

    return {
      title: topicTitle || (lines[0] ? lines[0].slice(0, 50) : 'Tema de Estudio'),
      lines,
      paragraphs,
      sentences: cleanedSentences,
      bullets,
      keywords: uniqueKeywords
    };
  }

  /**
   * Genera las 10 transformaciones posibles a partir del análisis
   */
  function transform(rawText, topicTitle, mode) {
    const parsed = analyzeText(rawText, topicTitle);
    const title = parsed.title;

    switch (mode) {
      case 'summary':
        return generateSummary(parsed);
      case 'mindmap':
        return generateMindmap(parsed);
      case 'conceptmap':
        return generateConceptmap(parsed);
      case 'flashcards':
        return generateFlashcards(parsed);
      case 'quiz':
        return generateQuiz(parsed);
      case 'podcast':
        return generatePodcast(parsed);
      case 'timeline':
        return generateTimeline(parsed);
      case 'feynman':
        return generateFeynman(parsed);
      case 'microlessons':
        return generateMicroLessons(parsed);
      case 'examprep':
        return generateExamPrep(parsed);
      default:
        return generateSummary(parsed);
    }
  }

  function generateSummary(p) {
    const keyPoints = p.bullets.length >= 3 ? p.bullets.slice(0, 6) : p.sentences.slice(0, 5);
    return {
      type: 'summary',
      title: `Resumen Estructurado: ${p.title}`,
      intro: p.paragraphs[0] || 'Visión general sintetizada del tema analizado.',
      coreIdeas: keyPoints.map((item, idx) => ({
        index: idx + 1,
        text: item
      })),
      application: `¿Por qué es importante dominar esto? Permite conectar los principios de ${p.title} con problemas del mundo real y razonar con soltura en evaluaciones.`
    };
  }

  function generateMindmap(p) {
    const branches = [];
    const subCount = Math.min(Math.max(p.paragraphs.length, 3), 5);

    for (let i = 0; i < subCount; i++) {
      const sourcePara = p.paragraphs[i] || p.sentences[i] || `Aspecto clave ${i + 1}`;
      const firstLine = sourcePara.split(/[.:]/)[0] || `Rama ${i + 1}`;
      const branchTitle = firstLine.length > 35 ? firstLine.slice(0, 32) + '...' : firstLine;

      const subItems = (p.bullets[i] ? [p.bullets[i]] : p.sentences.slice(i * 2, i * 2 + 2))
        .map(s => s.length > 60 ? s.slice(0, 57) + '...' : s);

      branches.push({
        id: `branch-${i}`,
        title: branchTitle,
        color: ['#3B82F6', '#8B5CF6', '#10B981', '#06B6D4', '#F59E0B'][i % 5],
        nodes: subItems.length > 0 ? subItems : ['Detalle conceptual', 'Ejemplo práctico']
      });
    }

    return {
      type: 'mindmap',
      title: `Mapa Mental: ${p.title}`,
      centralNode: p.title,
      branches
    };
  }

  function generateConceptmap(p) {
    const nodes = [];
    const mainConcept = p.title;

    nodes.push({ from: mainConcept, relation: 'se fundamenta en', to: p.keywords[0] || 'Principios Nucleares' });
    nodes.push({ from: mainConcept, relation: 'se divide o clasifica en', to: p.keywords[1] || 'Fases o Componentes' });
    nodes.push({ from: p.keywords[1] || 'Fases o Componentes', relation: 'produce o da origen a', to: p.keywords[2] || 'Resultados / Efectos' });
    nodes.push({ from: p.keywords[0] || 'Principios Nucleares', relation: 'está regulado por', to: p.keywords[3] || 'Leyes o Mecanismos' });
    nodes.push({ from: mainConcept, relation: 'tiene aplicación directa en', to: 'Casos Reales y Práctica' });

    return {
      type: 'conceptmap',
      title: `Mapa Conceptual Jerárquico: ${p.title}`,
      mainConcept,
      relations: nodes
    };
  }

  function generateFlashcards(p) {
    const cards = [];
    const sources = p.bullets.length >= 3 ? p.bullets : p.sentences;

    sources.slice(0, 6).forEach((item, idx) => {
      let q = '';
      let a = '';

      if (item.includes(':')) {
        const parts = item.split(':');
        q = `¿Qué define o caracteriza a "${parts[0].trim()}"?`;
        a = parts.slice(1).join(':').trim();
      } else if (item.includes(' - ')) {
        const parts = item.split(' - ');
        q = `¿Cuál es el significado de "${parts[0].trim()}"?`;
        a = parts.slice(1).join(' - ').trim();
      } else {
        q = `Pregunta clave #${idx + 1} sobre ${p.title}:`;
        a = item;
      }

      cards.push({
        id: `fc-${Date.now()}-${idx}`,
        front: q,
        back: a,
        topic: p.title,
        level: 'new', // new, learning, mastered
        interval: 1
      });
    });

    if (cards.length === 0) {
      cards.push({
        id: `fc-${Date.now()}-0`,
        front: `¿Cuál es la idea central de ${p.title}?`,
        back: p.paragraphs[0] || 'Concepto principal a retener.',
        topic: p.title,
        level: 'new',
        interval: 1
      });
    }

    return {
      type: 'flashcards',
      title: `Mazo de Flashcards: ${p.title}`,
      cards
    };
  }

  function generateQuiz(p) {
    const questions = [];
    const items = p.bullets.length >= 3 ? p.bullets : p.sentences;

    for (let i = 0; i < Math.min(items.length, 4); i++) {
      const source = items[i];
      const snippet = source.slice(0, 80);
      const kw = p.keywords[i] || 'el concepto central';

      questions.push({
        id: `q-${i + 1}`,
        question: `En relación con ${p.title}, ¿cuál de las siguientes afirmaciones describe con mayor precisión lo ocurrido o fundamentado en este tema?`,
        options: [
          `Opción A: ${snippet}`,
          `Opción B: Es un proceso puramente estático que prescinde de la interacción con el entorno.`,
          `Opción C: Solo aplica de manera aislada sin consecuencias en otros sistemas afines.`,
          `Opción D: Se produce de manera espontánea sin ningún requerimiento de energía ni condiciones previas.`
        ],
        correctIndex: 0,
        explanation: `La opción A es la correcta porque refleja fielmente los principios explicados en el temario: "${snippet}". Las demás opciones son trampas habituales de distracción que simplifican o distorsionan el proceso.`
      });
    }

    return {
      type: 'quiz',
      title: `Cuestionario Autoevaluativo: ${p.title}`,
      questions
    };
  }

  function generatePodcast(p) {
    const lines = [];
    lines.push({
      speaker: 'Alex (Mindu Host)',
      text: `¡Hola a todos! Bienvenidos a esta cápsula de estudio exprés. Hoy vamos a desentrañar un tema fascinante: ${p.title}.`
    });
    lines.push({
      speaker: 'Mía (Co-host)',
      text: `Exacto, Alex. Mucha gente se agobia con este tema porque cree que es puramente memorístico, pero cuando entiendes el mecanismo de fondo, ¡todo cobra un sentido perfecto!`
    });

    if (p.paragraphs[0]) {
      lines.push({
        speaker: 'Alex (Mindu Host)',
        text: `Fíjate en esto: ${p.paragraphs[0].slice(0, 200)}... ¿Ves la lógica?`
      });
    }

    if (p.paragraphs[1] || p.bullets[0]) {
      const nextIdea = p.bullets[0] || (p.paragraphs[1] ? p.paragraphs[1].slice(0, 180) : 'Aquí entra la segunda pieza del rompecabezas.');
      lines.push({
        speaker: 'Mía (Co-host)',
        text: `Totalmente. Y no solo eso, fíjate en un detalle que siempre cae en los exámenes: ${nextIdea}.`
      });
    }

    lines.push({
      speaker: 'Alex (Mindu Host)',
      text: `La clave inolvidable para hoy: si recuerdas este principio, tienes el 80% del tema ganado. ¡Buen estudio y nos escuchamos en la siguiente cápsula!`
    });

    return {
      type: 'podcast',
      title: `Guion de Audio-Podcast: ${p.title}`,
      dialogue: lines,
      fullTextForTTS: lines.map(l => `${l.speaker.split(' ')[0]}: ${l.text}`).join(' ')
    };
  }

  function generateTimeline(p) {
    const timelineItems = [];
    const dateMatches = p.lines.filter(l => /\b(1\d{3}|20\d{2}|fase|etapa|paso|siglo|año)\b/i.test(l));

    if (dateMatches.length >= 2) {
      dateMatches.slice(0, 6).forEach((item, idx) => {
        const match = item.match(/\b(1\d{3}|20\d{2}|fase \d+|etapa \d+|paso \d+|siglo [IVXLCDM]+)\b/i);
        timelineItems.push({
          date: match ? match[0] : `Hito ${idx + 1}`,
          title: item.slice(0, 50),
          desc: item
        });
      });
    } else {
      // Si no hay fechas explícitas, estructurar como secuencia lógica de fases
      const phases = ['Fase Inicial / Detonante', 'Desarrollo / Mecanismo Central', 'Culminación / Estado Final', 'Consecuencia y Trascendencia'];
      phases.forEach((phase, idx) => {
        timelineItems.push({
          date: `Momento ${idx + 1}`,
          title: phase,
          desc: p.sentences[idx] || `Proceso secuencial clave en ${p.title}.`
        });
      });
    }

    return {
      type: 'timeline',
      title: `Línea Secuencial y Cronológica: ${p.title}`,
      events: timelineItems
    };
  }

  function generateFeynman(p) {
    return {
      type: 'feynman',
      title: `Explicación Estilo Feynman: ${p.title}`,
      targetAudience: 'Para un amigo sin conocimientos previos o un niño de 10 años',
      childFriendlyExplanation: `Imagina que ${p.title} es como una gran fábrica en miniatura. En vez de usar palabras difíciles, piensa que hay tres cosas pasando al mismo tiempo: primero entra el material básico, luego una serie de pequeños trabajadores lo transforman, y al final sale un producto útil y limpio.`,
      analogy: `Es exactamente como hornear una tarta: no puedes saltarte meter la masa al horno ni esperar que la tarta se haga sola sin calor.`,
      pitfallsToAvoid: [
        'Evitar recitar definiciones de memoria sin saber qué significa cada término.',
        'No usar palabras técnicas como "anabólico" o "estocástico" sin poner un ejemplo visual.',
        'Verificar si eres capaz de dibujarlo en una servilleta de papel en 30 segundos.'
      ],
      checkQuestion: `¿Podrías contarle esto a alguien en el desayuno sin mirar tus notas?`
    };
  }

  function generateMicroLessons(p) {
    const lessons = [];
    const chunkCount = 3;

    for (let i = 0; i < chunkCount; i++) {
      const partText = p.paragraphs[i] || p.sentences.slice(i * 2, i * 2 + 2).join(' ') || `Contenido de la microlección ${i + 1}`;
      lessons.push({
        stepNumber: i + 1,
        title: `Píldora ${i + 1}: ${i === 0 ? 'Los Cimientos' : i === 1 ? 'El Mecanismo en Acción' : 'Impacto y Consecuencias'}`,
        content: partText,
        timeToRead: '2 min',
        quickCheck: `¿Qué idea central te llevas de este bloque?`
      });
    }

    return {
      type: 'microlessons',
      title: `Micro-Lecciones Digestivas: ${p.title}`,
      lessons
    };
  }

  function generateExamPrep(p) {
    return {
      type: 'examprep',
      title: `Guía Exprés de Repaso para Examen: ${p.title}`,
      mustKnowConcepts: p.keywords.slice(0, 5),
      commonTraps: [
        'Confundir las causas originales con las consecuencias posteriores.',
        'Olvidar las unidades de medida o las condiciones iniciales.',
        'Asumir que un proceso ocurre en una sola dirección sin considerar la retroalimentación.'
      ],
      highYieldQuestions: [
        `¿Cuál es la diferencia crítica entre este proceso y su contraparte directa?`,
        `Si tuvieras que explicar la fórmula o principio de ${p.title} en un solo renglón, ¿qué dirías?`,
        `¿Qué ocurriría en el sistema si eliminamos uno de sus factores clave?`
      ],
      finalAdvice: 'No repases la noche anterior hasta la madrugada. Dormir al menos 7 horas consolida la memoria en el hipocampo.'
    };
  }

  return {
    getSavedMaterials,
    saveMaterial,
    deleteMaterial,
    analyzeText,
    transform
  };
})();
