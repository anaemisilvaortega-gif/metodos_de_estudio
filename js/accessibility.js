/**
 * MINDU - Accesibilidad, Síntesis de Voz (TTS) y Bienestar
 * Ajustes de tamaño de letra, modo bajo estímulo, alto contraste,
 * reducción de movimiento y locutor Web Speech API.
 */

window.MinduAccessibility = (function () {
  const STORAGE_KEY_SETTINGS = 'mindu_accessibility_settings';

  const defaultSettings = {
    theme: 'dark', // 'dark', 'light', 'low_stimulus'
    fontSize: 'normal', // 'normal', 'large', 'xlarge'
    highContrast: false,
    reducedMotion: false,
    ttsSpeed: 1.0, // 0.8, 1.0, 1.25, 1.5
    selectedVoiceURI: null
  };

  let currentSettings = { ...defaultSettings };
  let synth = window.speechSynthesis || null;
  let currentUtterance = null;
  let isSpeaking = false;

  function loadSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (data) {
        currentSettings = { ...defaultSettings, ...JSON.parse(data) };
      }
    } catch (e) {
      currentSettings = { ...defaultSettings };
    }
    applySettingsToDOM();
    return currentSettings;
  }

  function saveSettings(newSettings) {
    currentSettings = { ...currentSettings, ...newSettings };
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(currentSettings));
    } catch (e) {
      console.warn('Error saving accessibility settings:', e);
    }
    applySettingsToDOM();
    return currentSettings;
  }

  function applySettingsToDOM() {
    const root = document.documentElement;

    // Tema
    root.setAttribute('data-theme', currentSettings.theme);

    // Tamaño de fuente
    root.setAttribute('data-font-size', currentSettings.fontSize);

    // Alto contraste
    if (currentSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Movimiento reducido
    if (currentSettings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }

  // ==========================================
  // SÍNTESIS DE VOZ REAL CON WEB SPEECH API
  // ==========================================

  function getAvailableVoices() {
    if (!synth) return [];
    const voices = synth.getVoices() || [];
    // Priorizar voces en español
    return voices.filter(v => v.lang.startsWith('es') || v.lang.startsWith('en'));
  }

  function speakText(text, onBoundary, onEnd) {
    if (!synth) {
      alert('Tu navegador no soporta síntesis de voz Web Speech API.');
      return;
    }

    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = currentSettings.ttsSpeed || 1.0;
    utterance.pitch = 1.0;

    // Buscar voz en español
    const voices = synth.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') && (currentSettings.selectedVoiceURI ? v.voiceURI === currentSettings.selectedVoiceURI : true)) ||
      voices.find(v => v.lang.startsWith('es')) ||
      voices[0];

    if (esVoice) {
      utterance.voice = esVoice;
      utterance.lang = esVoice.lang;
    }

    utterance.onend = () => {
      isSpeaking = false;
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('TTS error:', e);
      isSpeaking = false;
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    if (onBoundary) {
      utterance.onboundary = onBoundary;
    }

    currentUtterance = utterance;
    isSpeaking = true;
    synth.speak(utterance);
  }

  function stopSpeaking() {
    if (synth && synth.speaking) {
      synth.cancel();
    }
    isSpeaking = false;
    currentUtterance = null;
  }

  function getSpeakingState() {
    return isSpeaking;
  }

  return {
    loadSettings,
    saveSettings,
    getSettings: () => currentSettings,
    speakText,
    stopSpeaking,
    getSpeakingState,
    getAvailableVoices
  };
})();
