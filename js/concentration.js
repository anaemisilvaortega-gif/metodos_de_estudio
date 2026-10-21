/**
 * MINDU - Modo Concentración y «Estudia a tu Ritmo»
 * Temporizador Pomodoro Flexible, Generador de Sonidos Ambientales con Web Audio API pura,
 * Compañero Virtual de Body Doubling, Pausas Activas Interactivas y Reinicio sin Culpa.
 */

window.MinduConcentration = (function () {
  // Estado interno del temporizador
  let timerInterval = null;
  let remainingSeconds = 25 * 60;
  let totalSessionSeconds = 25 * 60;
  let isRunning = false;
  let currentMode = 'work'; // 'work' | 'break' | 'fivemin'
  let currentTask = 'Lectura comprensiva y toma de notas';

  // Configuración de tiempos
  let workDurationMinutes = 20;
  let breakDurationMinutes = 5;

  // Estado de audio Web Audio API
  let audioCtx = null;
  let activeSound = null; // 'rain' | 'binaural' | 'whitenoise' | 'ambient' | null
  let soundNodes = [];
  let currentVolume = 0.3;

  // Compañeros virtuales de Body Doubling
  const studyBuddies = [
    {
      id: 'alex',
      name: 'Alex',
      avatar: '👨‍💻',
      task: 'Repasando apuntes de Biología con técnica Cornell',
      status: 'En concentración profunda',
      color: '#3B82F6'
    },
    {
      id: 'mia',
      name: 'Mía',
      avatar: '👩‍🔬',
      task: 'Resolviendo ejercicios prácticos de Química Orgánica',
      status: 'Conectada en silencio contigo',
      color: '#8B5CF6'
    },
    {
      id: 'lucas',
      name: 'Lucas',
      avatar: '🧑‍🎓',
      task: 'Escribiendo la introducción de su monografía',
      status: 'Foco sostenido',
      color: '#10B981'
    },
    {
      id: 'sofia',
      name: 'Sofía',
      avatar: '👩‍🎨',
      task: 'Diseñando un mapa mental de Historia Contemporánea',
      status: 'Avanzando paso a paso',
      color: '#06B6D4'
    }
  ];

  let currentBuddyIndex = 0;

  // Callbacks para UI
  let onTickCallback = null;
  let onCompleteCallback = null;

  function init(onTick, onComplete) {
    onTickCallback = onTick;
    onCompleteCallback = onComplete;
    remainingSeconds = workDurationMinutes * 60;
    totalSessionSeconds = remainingSeconds;
  }

  function setCustomDurations(workMin, breakMin) {
    workDurationMinutes = workMin;
    breakDurationMinutes = breakMin;
    if (!isRunning) {
      currentMode = 'work';
      remainingSeconds = workDurationMinutes * 60;
      totalSessionSeconds = remainingSeconds;
      if (onTickCallback) onTickCallback(getState());
    }
  }

  function setCurrentTask(taskName) {
    currentTask = taskName || 'Sesión de enfoque libre';
    if (onTickCallback) onTickCallback(getState());
  }

  function start() {
    if (isRunning) return;
    isRunning = true;

    // Asegurar contexto de audio si hay sonido activado
    if (activeSound && !audioCtx) {
      startAmbientSound(activeSound);
    }

    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        if (onTickCallback) onTickCallback(getState());
      } else {
        completeSession();
      }
    }, 1000);

    if (onTickCallback) onTickCallback(getState());
  }

  function pause() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    if (onTickCallback) onTickCallback(getState());
  }

  function reset() {
    pause();
    currentMode = 'work';
    remainingSeconds = workDurationMinutes * 60;
    totalSessionSeconds = remainingSeconds;
    if (onTickCallback) onTickCallback(getState());
  }

  /**
   * Sistema de Reinicio sin Culpa:
   * Si el estudiante se distrajo, no se penaliza ni se pierde el progreso.
   * Se restablece el bloque con un mensaje cálido y motivador.
   */
  function kindReset() {
    pause();
    currentMode = 'work';
    remainingSeconds = workDurationMinutes * 60;
    totalSessionSeconds = remainingSeconds;
    // Loguear evento compasivo en el progreso
    logFocusEvent('reinicio_amable', 'Reinicio sin culpa realizado con éxito.');
    if (onTickCallback) onTickCallback({ ...getState(), wasKindReset: true });
  }

  /**
   * Regla de los 5 Minutos:
   * Activa una micro-sesión de 300 segundos para vencer la inercia.
   */
  function startFiveMinuteRule() {
    pause();
    currentMode = 'fivemin';
    remainingSeconds = 5 * 60;
    totalSessionSeconds = 5 * 60;
    start();
  }

  function completeSession() {
    pause();
    playGentleChime();

    if (currentMode === 'work' || currentMode === 'fivemin') {
      const minutesCompleted = Math.round(totalSessionSeconds / 60);
      logFocusEvent('estudio_completado', `Completados ${minutesCompleted} min de foco en: "${currentTask}".`, minutesCompleted);

      // Pasar a modo descanso
      currentMode = 'break';
      remainingSeconds = breakDurationMinutes * 60;
      totalSessionSeconds = remainingSeconds;
    } else {
      // Fin del descanso
      currentMode = 'work';
      remainingSeconds = workDurationMinutes * 60;
      totalSessionSeconds = remainingSeconds;
    }

    if (onCompleteCallback) onCompleteCallback(getState());
    if (onTickCallback) onTickCallback(getState());
  }

  function getState() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const progress = totalSessionSeconds > 0 ? (1 - remainingSeconds / totalSessionSeconds) : 0;

    return {
      minutes,
      seconds,
      formatted,
      progress,
      isRunning,
      currentMode,
      currentTask,
      workDurationMinutes,
      breakDurationMinutes,
      activeSound,
      currentVolume,
      currentBuddy: studyBuddies[currentBuddyIndex]
    };
  }

  function switchBuddy(index) {
    if (index !== undefined) {
      currentBuddyIndex = index % studyBuddies.length;
    } else {
      currentBuddyIndex = (currentBuddyIndex + 1) % studyBuddies.length;
    }
    if (onTickCallback) onTickCallback(getState());
    return studyBuddies[currentBuddyIndex];
  }

  // ==========================================
  // SÍNTESIS DE AUDIO REAL CON WEB AUDIO API
  // Genera lluvia, ruido blanco, ondas binaurales y campana suave
  // ==========================================

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function stopAmbientSound() {
    soundNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // Ignorar si ya estaba desconectado
      }
    });
    soundNodes = [];
    activeSound = null;
    if (onTickCallback) onTickCallback(getState());
  }

  function setVolume(val) {
    currentVolume = Math.max(0, Math.min(1, val));
    soundNodes.forEach(node => {
      if (node instanceof GainNode) {
        node.gain.setValueAtTime(currentVolume, audioCtx ? audioCtx.currentTime : 0);
      }
    });
    if (onTickCallback) onTickCallback(getState());
  }

  function startAmbientSound(type) {
    stopAmbientSound();
    const ctx = getAudioContext();
    if (!ctx) return;

    activeSound = type;

    if (type === 'rain') {
      createRainSound(ctx);
    } else if (type === 'whitenoise') {
      createNoiseSound(ctx, 'white');
    } else if (type === 'binaural') {
      createBinauralBeats(ctx);
    } else if (type === 'ambient') {
      createAmbientPad(ctx);
    }

    if (onTickCallback) onTickCallback(getState());
  }

  /**
   * Genera sonido procedimental de lluvia usando ruido rosa filtrado
   */
  function createRainSound(ctx) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Algoritmo de Paul Kellet para ruido rosa / marrón suave
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Filtro paso bajo para emular gotas de lluvia
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(currentVolume * 0.8, ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start();
    soundNodes.push(noiseSource, filter, gainNode);
  }

  /**
   * Genera ruido blanco o marrón puro
   */
  function createNoiseSound(ctx, type) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Ruido marrón cálido (integración suave)
      lastOut = (lastOut + (0.02 * white)) / 1.02;
      data[i] = lastOut * 3.5;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(currentVolume * 0.5, ctx.currentTime);

    noiseSource.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start();
    soundNodes.push(noiseSource, gainNode);
  }

  /**
   * Ondas binaurales Alfa (10 Hz):
   * Canal izquierdo 210 Hz, canal derecho 200 Hz
   * Estimula el estado de concentración relajada
   */
  function createBinauralBeats(ctx) {
    const oscLeft = ctx.createOscillator();
    const oscRight = ctx.createOscillator();

    oscLeft.type = 'sine';
    oscRight.type = 'sine';

    oscLeft.frequency.setValueAtTime(210, ctx.currentTime); // 210 Hz
    oscRight.frequency.setValueAtTime(200, ctx.currentTime); // 200 Hz -> Diferencia = 10 Hz (Alfa)

    const merger = ctx.createChannelMerger(2);
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(currentVolume * 0.25, ctx.currentTime);

    oscLeft.connect(merger, 0, 0);  // Canal izquierdo
    oscRight.connect(merger, 0, 1); // Canal derecho

    merger.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscLeft.start();
    oscRight.start();
    soundNodes.push(oscLeft, oscRight, merger, gainNode);
  }

  /**
   * Murmullo de estudio armónico relajante (Drone ambiental)
   */
  function createAmbientPad(ctx) {
    const freqs = [130.81, 196.00, 261.63, 329.63]; // Acorde C mayor suave
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(currentVolume * 0.2, ctx.currentTime);

    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gainNode);
      osc.start();
      soundNodes.push(osc, filter);
    });

    gainNode.connect(ctx.destination);
    soundNodes.push(gainNode);
  }

  /**
   * Campana suave de finalización de bloque
   */
  function playGentleChime() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.15); // C6

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.8);
  }

  function logFocusEvent(type, description, minutes = 0) {
    try {
      const logs = JSON.parse(localStorage.getItem('mindu_focus_history') || '[]');
      logs.unshift({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type,
        description,
        minutes
      });
      localStorage.setItem('mindu_focus_history', JSON.stringify(logs.slice(0, 100)));
    } catch (e) {
      console.warn('Error saving focus log:', e);
    }
  }

  return {
    init,
    start,
    pause,
    reset,
    kindReset,
    startFiveMinuteRule,
    setCustomDurations,
    setCurrentTask,
    getState,
    switchBuddy,
    studyBuddies,
    startAmbientSound,
    stopAmbientSound,
    setVolume,
    playGentleChime
  };
})();
