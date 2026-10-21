/**
 * MINDU - Planificador Inteligente
 * Planificación adaptable con metas pequeñas, descansos programados,
 * adaptación al nivel de energía del día y reorganización sin culpa.
 */

window.MinduPlanner = (function () {
  const STORAGE_KEY_TASKS = 'mindu_planner_tasks';
  const STORAGE_KEY_EXAMS = 'mindu_planner_exams';

  const defaultTasks = [
    {
      id: 'task-1',
      title: 'Técnica Feynman: Explicar el ciclo celular a un amigo',
      subject: 'Biología',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      estimatedMinutes: 25,
      energyNeeded: 'media', // baja, media, alta
      priority: 'importante', // urgente_importante, importante, urgente, baja
      completed: false
    },
    {
      id: 'task-2',
      title: 'Crear 10 flashcards de fórmulas trigonométricas',
      subject: 'Matemáticas',
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      estimatedMinutes: 20,
      energyNeeded: 'baja',
      priority: 'importante',
      completed: false
    },
    {
      id: 'task-3',
      title: 'Línea de tiempo: Hitos de la Revolución Francesa (1789-1794)',
      subject: 'Historia',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      estimatedMinutes: 30,
      energyNeeded: 'media',
      priority: 'urgente_importante',
      completed: true
    }
  ];

  const defaultExams = [
    {
      id: 'exam-1',
      title: 'Examen Parcial de Historia Moderna',
      subject: 'Historia',
      date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      priority: 'alta'
    },
    {
      id: 'exam-2',
      title: 'Evaluación de Geometría Analítica',
      subject: 'Matemáticas',
      date: new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0],
      priority: 'media'
    }
  ];

  function getTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_TASKS);
      return data ? JSON.parse(data) : defaultTasks;
    } catch (e) {
      console.warn('Error reading tasks:', e);
      return defaultTasks;
    }
  }

  function saveTasks(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Error saving tasks:', e);
    }
  }

  function addTask(task) {
    const tasks = getTasks();
    const newTask = {
      id: `task-${Date.now()}`,
      title: task.title,
      subject: task.subject || 'General',
      dueDate: task.dueDate || new Date().toISOString().split('T')[0],
      estimatedMinutes: parseInt(task.estimatedMinutes, 10) || 25,
      energyNeeded: task.energyNeeded || 'media',
      priority: task.priority || 'importante',
      completed: false
    };
    tasks.unshift(newTask);
    saveTasks(tasks);
    return newTask;
  }

  function toggleTask(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasks(tasks);
    }
    return tasks;
  }

  function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    return tasks;
  }

  function getExams() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_EXAMS);
      return data ? JSON.parse(data) : defaultExams;
    } catch (e) {
      console.warn('Error reading exams:', e);
      return defaultExams;
    }
  }

  function saveExams(exams) {
    try {
      localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(exams));
    } catch (e) {
      console.warn('Error saving exams:', e);
    }
  }

  function addExam(exam) {
    const exams = getExams();
    const newExam = {
      id: `exam-${Date.now()}`,
      title: exam.title,
      subject: exam.subject || 'General',
      date: exam.date || new Date().toISOString().split('T')[0],
      priority: exam.priority || 'media'
    };
    exams.push(newExam);
    saveExams(exams);
    return newExam;
  }

  function deleteExam(id) {
    let exams = getExams();
    exams = exams.filter(e => e.id !== id);
    saveExams(exams);
    return exams;
  }

  /**
   * Generador de Plan Diario Inteligente y Empático
   * Ajustado según minutos disponibles y energía del día
   */
  function generateDailyPlan(availableMinutes, energyLevel, targetSubject) {
    const minutes = parseInt(availableMinutes, 10) || 60;
    const energy = energyLevel || 'media';
    const plan = [];

    let sessionLength = 25;
    let breakLength = 5;

    if (energy === 'baja') {
      sessionLength = 15;
      breakLength = 5;
    } else if (energy === 'alta') {
      sessionLength = 35;
      breakLength = 7;
    }

    const possibleBlocks = Math.max(1, Math.floor(minutes / (sessionLength + breakLength)));

    // Bloque 1: Arranque amigable
    plan.push({
      time: '00:00 - Bloque 1',
      title: `Arranque de baja fricción en ${targetSubject || 'tu materia clave'}`,
      duration: `${sessionLength} min`,
      method: energy === 'baja' ? 'Revisión ligera de flashcards o audio resumen' : 'Lectura activa o técnica Cornell',
      tip: 'Objetivo único: no mires todo el temario, céntrate solo en los primeros 2 conceptos.'
    });

    plan.push({
      time: 'Pausa intermedia',
      title: 'Pausa Activa & Descompresión',
      duration: `${breakLength} min`,
      method: 'Respiración guiada o mirar por la ventana (regla 20-20-20)',
      tip: 'Levántate de la silla, bebe agua y no abras redes sociales.'
    });

    if (possibleBlocks >= 2) {
      plan.push({
        time: 'Bloque 2',
        title: `Consolidación activa`,
        duration: `${sessionLength} min`,
        method: energy === 'baja' ? 'Esquema visual con colores o mapa mental' : 'Active Recall (Brain dump en blanco) o resolución de ejercicios',
        tip: 'Intenta recordar lo del Bloque 1 sin mirar los apuntes.'
      });

      if (possibleBlocks >= 3) {
        plan.push({
          time: 'Pausa intermedia',
          title: 'Segunda Pausa Activa',
          duration: `${breakLength} min`,
          method: 'Estiramiento suave de muñecas y hombros',
          tip: 'Respira hondo para resetear la fatiga postural.'
        });

        plan.push({
          time: 'Bloque 3',
          title: `Cierre y autocomprobación`,
          duration: `${Math.min(sessionLength, 20)} min`,
          method: 'Cuestionario de 3 preguntas o Técnica Feynman rápida',
          tip: 'Escribe en una frase lo más importante que aprendiste hoy.'
        });
      }
    }

    // Margen comodín
    plan.push({
      time: 'Cierre del día',
      title: 'Reserva Comodín & Cierre Tranquilo',
      duration: '10 min',
      method: 'Organizar apuntes para mañana y felicitarse por el avance',
      tip: 'Hacer el 70% de un plan realista supera al 100% de un plan imposible.'
    });

    return {
      totalTimeEstimated: minutes,
      energyLevel: energy,
      blocksCount: possibleBlocks,
      schedule: plan
    };
  }

  /**
   * Reorganización sin culpa:
   * Si el estudiante no pudo cumplir hoy, pospone suavemente las tareas
   * redistribuyéndolas en los días siguientes sin acumular montañas imposibles.
   */
  function guiltFreeReschedule() {
    const tasks = getTasks();
    const todayStr = new Date().toISOString().split('T')[0];
    let rescheduledCount = 0;

    tasks.forEach(task => {
      if (!task.completed && task.dueDate <= todayStr) {
        // Mover 1 o 2 días adelante con reparto espaciado
        const currentDue = new Date();
        currentDue.setDate(currentDue.getDate() + (rescheduledCount % 3) + 1);
        task.dueDate = currentDue.toISOString().split('T')[0];
        rescheduledCount++;
      }
    });

    saveTasks(tasks);
    return {
      rescheduledCount,
      message: rescheduledCount > 0
        ? `Reorganizamos ${rescheduledCount} tareas sin acumular presión. ¡Respira hondo y retoma a tu ritmo!`
        : '¡Tu calendario está al día y equilibrado!'
    };
  }

  return {
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
    getExams,
    addExam,
    deleteExam,
    generateDailyPlan,
    guiltFreeReschedule
  };
})();
