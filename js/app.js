/**
 * MINDU - Controlador Principal de la Aplicación
 * Orquestación de pantallas, enrutamiento, interactividad y eventos globales.
 */

window.MinduApp = (function () {
  let currentScreen = 'home';
  let assessmentCurrentStep = 0;
  let assessmentAnswers = {};
  let currentFlashcardIndex = 0;
  let activeConverterMode = 'summary';

  // ==========================================
  // INICIALIZACIÓN
  // ==========================================
  function init() {
    // 1. Cargar accesibilidad y temas guardados
    if (window.MinduAccessibility) {
      window.MinduAccessibility.loadSettings();
    }

    // 2. Inicializar temporizador de concentración
    if (window.MinduConcentration) {
      window.MinduConcentration.init(updateTimerUI, onSessionComplete);
    }

    // 3. Configurar navegación de pantallas
    setupNavigation();

    // 4. Configurar eventos de botones y modales
    setupEventListeners();

    // 5. Cargar perfil o invitar a evaluación inicial si no existe
    const profile = window.MinduAssessment ? window.MinduAssessment.getSavedProfile() : null;
    if (!profile) {
      // Perfil demo inicial amigable
      const demoAnswers = {
        q1_difficulty: 'concentrarse',
        q2_attention_span: '20-25',
        q3_comfort_style: 'visual',
        q4_sound_preference: 'ambient',
        q5_block_trigger: 'mountain',
        q6_hard_subjects: 'exactas',
        q7_daily_time: '1to2',
        q8_break_style: 'standard',
        q9_main_goal: 'long_term'
      };
      const initialProfile = window.MinduAssessment.calculateProfile(demoAnswers);
      window.MinduAssessment.saveProfile(initialProfile);
    }

    // 6. Renderizar pantalla inicial
    updateDashboardUI();
    renderMethodsLibrary();
    renderPlannerTasks();
    renderPlannerExams();
    renderFlashcard();
    renderQuiz();
    renderProgressUI();
    syncSettingsControls();

    // Cargar preset inicial en el conversor
    loadPresetInConverter('fotosintesis');

    // Manejar hash inicial en URL si existe
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'profile', 'methods', 'converter', 'focus', 'planner', 'practice', 'progress', 'settings'].includes(hash)) {
      navigateTo(hash);
    } else {
      navigateTo('home');
    }
  }

  // ==========================================
  // NAVEGACIÓN Y ENRUTAMIENTO DE PANTALLAS
  // ==========================================
  function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetScreen = item.getAttribute('data-screen');
        if (targetScreen) {
          navigateTo(targetScreen);
        }
      });
    });

    // Menú móvil
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }

    // Cerrar sidebar al hacer clic fuera en móvil
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  function navigateTo(screenId) {
    currentScreen = screenId;
    window.location.hash = screenId;

    // Actualizar items de menú
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-screen') === screenId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Actualizar vistas de pantalla
    document.querySelectorAll('.screen-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`screen-${screenId}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Actualizar título en barra superior
    const breadcrumb = document.getElementById('topbar-breadcrumb-title');
    if (breadcrumb) {
      const titles = {
        home: 'INICIO',
        profile: 'MI PERFIL DE ESTUDIO',
        methods: 'BIBLIOTECA DE MÉTODOS',
        converter: 'CONVIERTE CUALQUIER TEMA',
        focus: 'MODO CONCENTRACIÓN',
        planner: 'MI PLANIFICADOR',
        practice: 'PRACTICAR Y RECORDAR',
        progress: 'MI PROGRESO',
        settings: 'ACCESIBILIDAD Y BIENESTAR'
      };
      breadcrumb.textContent = titles[screenId] || 'MINDU';
    }

    // Cerrar sidebar en móvil tras navegar
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');

    // Acciones específicas según pantalla
    if (screenId === 'profile') renderProfileScreen();
    if (screenId === 'progress') renderProgressUI();
    if (screenId === 'home') updateDashboardUI();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // CONFIGURACIÓN DE EVENT LISTENERS
  // ==========================================
  function setupEventListeners() {
    // Botones de acceso rápido en topbar
    const topFocus = document.getElementById('topbar-quick-focus-btn');
    if (topFocus) topFocus.addEventListener('click', () => navigateTo('focus'));

    const topConvert = document.getElementById('topbar-convert-btn');
    if (topConvert) topConvert.addEventListener('click', () => navigateTo('converter'));

    // Botones de inicio hero
    const btnHeroTest = document.getElementById('btn-hero-test');
    if (btnHeroTest) btnHeroTest.addEventListener('click', openAssessmentModal);

    const btnHeroConvert = document.getElementById('btn-hero-convert');
    if (btnHeroConvert) btnHeroConvert.addEventListener('click', () => navigateTo('converter'));

    const btnHeroExplore = document.getElementById('btn-hero-explore');
    if (btnHeroExplore) btnHeroExplore.addEventListener('click', () => navigateTo('methods'));

    const btnHomeStartBlock = document.getElementById('btn-home-start-block');
    if (btnHomeStartBlock) {
      btnHomeStartBlock.addEventListener('click', () => {
        navigateTo('focus');
        if (window.MinduConcentration) window.MinduConcentration.start();
      });
    }

    const btnHomeFivemin = document.getElementById('btn-home-fivemin');
    if (btnHomeFivemin) {
      btnHomeFivemin.addEventListener('click', () => {
        navigateTo('focus');
        if (window.MinduConcentration) window.MinduConcentration.startFiveMinuteRule();
      });
    }

    // Reevaluación
    const btnRetake = document.getElementById('btn-retake-assessment');
    if (btnRetake) btnRetake.addEventListener('click', openAssessmentModal);

    // Modal de evaluación inicial
    setupAssessmentModalEvents();

    // Pantalla de Métodos: búsqueda y filtros
    const searchInput = document.getElementById('methods-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        filterMethods();
      });
    }

    const catPills = document.querySelectorAll('.category-pill');
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        filterMethods();
      });
    });

    // Cerrar modal de método
    const btnCloseMethod = document.getElementById('btn-close-method-modal');
    if (btnCloseMethod) {
      btnCloseMethod.addEventListener('click', () => {
        closeModal('modal-method-detail');
      });
    }

    // Conversor: presets y modos
    setupConverterEvents();

    // Modo Concentración: botones
    setupFocusEvents();

    // Planificador: eventos
    setupPlannerEvents();

    // Práctica: Flashcards y Quiz
    setupPracticeEvents();

    // Progreso: Check-in
    setupProgressEvents();

    // Configuración: accesibilidad
    setupSettingsEvents();
  }

  // ==========================================
  // PANTALLA 1: DASHBOARD
  // ==========================================
  function updateDashboardUI() {
    const hour = new Date().getHours();
    let greeting = '¡Hola! Encuentra tu forma de aprender.';
    if (hour >= 6 && hour < 12) greeting = '¡Buenos días! Tu capacidad se expande hoy.';
    else if (hour >= 12 && hour < 20) greeting = '¡Buenas tardes! Avanza paso a paso a tu ritmo.';
    else greeting = '¡Buenas noches! Estudia con calma y recuerda descansar.';

    const greetingEl = document.getElementById('home-greeting');
    if (greetingEl) greetingEl.textContent = greeting;

    // Métricas en Inicio
    if (window.MinduProgress) {
      const metrics = window.MinduProgress.getSummaryMetrics();
      const elFocus = document.getElementById('home-stat-focus');
      if (elFocus) elFocus.textContent = `${metrics.focusHoursFormatted} h`;

      const elMat = document.getElementById('home-stat-materials');
      if (elMat) elMat.textContent = metrics.materialsCount;

      const elDue = document.getElementById('home-stat-due');
      if (elDue) elDue.textContent = metrics.cardsDueToday;
    }

    // Perfil en sidebar
    const profile = window.MinduAssessment ? window.MinduAssessment.getSavedProfile() : null;
    if (profile) {
      const tag = document.getElementById('sidebar-profile-tag');
      if (tag) tag.textContent = profile.profileName;
    }
  }

  // ==========================================
  // PANTALLA 2: EVALUACIÓN INICIAL & PERFIL
  // ==========================================
  function openAssessmentModal() {
    assessmentCurrentStep = 0;
    assessmentAnswers = {};
    renderAssessmentQuestion();
    openModal('modal-assessment');
  }

  function setupAssessmentModalEvents() {
    const btnClose = document.getElementById('btn-close-assessment-modal');
    if (btnClose) btnClose.addEventListener('click', () => closeModal('modal-assessment'));

    const btnNext = document.getElementById('btn-assessment-next');
    const btnPrev = document.getElementById('btn-assessment-prev');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (assessmentCurrentStep > 0) {
          assessmentCurrentStep--;
          renderAssessmentQuestion();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const currentQ = window.MinduAssessment.questions[assessmentCurrentStep];
        if (!assessmentAnswers[currentQ.id]) {
          alert('Por favor selecciona una opción para continuar.');
          return;
        }

        if (assessmentCurrentStep < window.MinduAssessment.questions.length - 1) {
          assessmentCurrentStep++;
          renderAssessmentQuestion();
        } else {
          // Finalizar evaluación
          const profile = window.MinduAssessment.calculateProfile(assessmentAnswers);
          window.MinduAssessment.saveProfile(profile);
          closeModal('modal-assessment');
          renderProfileScreen();
          navigateTo('profile');
          alert('¡Evaluación completada! Hemos generado tu perfil pedagógico personalizado.');
        }
      });
    }
  }

  function renderAssessmentQuestion() {
    const container = document.getElementById('assessment-question-container');
    const questions = window.MinduAssessment.questions;
    const q = questions[assessmentCurrentStep];
    if (!container || !q) return;

    // Actualizar barra de progreso
    const percent = Math.round(((assessmentCurrentStep + 1) / questions.length) * 100);
    const bar = document.getElementById('assessment-progress-bar');
    if (bar) bar.style.width = `${percent}%`;

    const indicator = document.getElementById('assessment-step-indicator');
    if (indicator) indicator.textContent = `Pregunta ${assessmentCurrentStep + 1} de ${questions.length}`;

    const btnPrev = document.getElementById('btn-assessment-prev');
    if (btnPrev) btnPrev.disabled = assessmentCurrentStep === 0;

    const btnNext = document.getElementById('btn-assessment-next');
    if (btnNext) {
      btnNext.textContent = assessmentCurrentStep === questions.length - 1 ? 'Finalizar y Ver Perfil' : 'Siguiente ➔';
    }

    let html = `
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">${q.title}</h3>
        <p style="font-size: 14px; color: var(--text-muted);">${q.subtitle}</p>
      </div>
      <div class="question-options-list">
    `;

    q.options.forEach(opt => {
      const isSelected = assessmentAnswers[q.id] === opt.value;
      html += `
        <div class="question-option-item ${isSelected ? 'selected' : ''}" data-value="${opt.value}" onclick="window.MinduApp.selectAssessmentOption('${q.id}', '${opt.value}')">
          <div class="option-icon">${opt.icon}</div>
          <div class="option-details">
            <div class="option-label">${opt.label}</div>
            <div class="option-tag">${opt.tag}</div>
          </div>
          <div style="font-size: 18px; color: ${isSelected ? 'var(--color-primary)' : 'var(--text-dim)'};">
            ${isSelected ? '●' : '○'}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  function selectAssessmentOption(questionId, value) {
    assessmentAnswers[questionId] = value;
    renderAssessmentQuestion();
  }

  function renderProfileScreen() {
    const area = document.getElementById('profile-display-area');
    const profile = window.MinduAssessment ? window.MinduAssessment.getSavedProfile() : null;
    if (!area || !profile) return;

    let methodsHtml = '';
    const allMethods = window.MINDU_METHODS || [];
    profile.recommendedMethodIds.slice(0, 6).forEach(id => {
      const m = allMethods.find(item => item.id === id);
      if (m) {
        methodsHtml += `
          <div class="card" style="padding: 16px; cursor: pointer;" onclick="window.MinduApp.openMethodDetail('${m.id}')">
            <span class="academic-tag" style="margin-bottom: 6px;">${m.categoryName}</span>
            <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main);">${m.title}</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${m.tagline}</p>
          </div>
        `;
      }
    });

    let planHtml = '';
    profile.initialPlan.forEach(p => {
      planHtml += `
        <div class="method-step-item">
          <div class="step-number-badge">${p.step}</div>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${p.title}</div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">${p.desc}</div>
          </div>
        </div>
      `;
    });

    area.innerHTML = `
      <div class="profile-hero">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <span class="badge badge-purple" style="font-size: 13px;">${profile.archetypeBadge}</span>
          <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-dim);">Actualizado: ${new Date(profile.timestamp).toLocaleDateString()}</span>
        </div>
        <h2 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin: 12px 0 8px;">
          ${profile.profileName}
        </h2>
        <p style="font-size: 15px; color: var(--text-main); line-height: 1.5; max-width: 800px;">
          ${profile.summaryText}
        </p>

        <div style="margin-top: 16px; padding: 14px; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1);">
          <strong style="color: var(--color-accent-cyan); font-size: 13px; font-family: var(--font-mono);">ENFOQUE PRIORITARIO:</strong>
          <span style="font-size: 14px; color: var(--text-main); margin-left: 6px;">${profile.coreFocus}</span>
        </div>
      </div>

      <div class="profile-disclaimer-box">
        <strong>⚠️ Principio pedagógico de Mindu:</strong>
        <p style="margin-top: 4px;">
          No te etiquetamos como un aprendiz puramente visual, auditivo o lector. La investigación cognitiva demuestra que el aprendizaje óptimo se logra combinando diferentes métodos según la materia y la fase del estudio. Utiliza estas sugerencias como un laboratorio personal para experimentar y medir resultados reales.
        </p>
      </div>

      <div class="grid-2" style="margin-top: 24px;">
        <!-- Radar de Afinidades -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><span>📊</span> Afinidades Cognitivas</h3>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
            Herramientas donde sientes mayor soltura inicial:
          </p>
          <div class="radar-bars-container">
            <div class="radar-bar-row">
              <div class="radar-bar-label">
                <span>Herramientas Visuales & Espaciales</span>
                <span>${profile.skillsRadar.visual}%</span>
              </div>
              <div class="radar-bar-track"><div class="radar-bar-fill" style="width: ${profile.skillsRadar.visual}%;"></div></div>
            </div>
            <div class="radar-bar-row">
              <div class="radar-bar-label">
                <span>Lectoescritura & Síntesis</span>
                <span>${profile.skillsRadar.lectoescritura}%</span>
              </div>
              <div class="radar-bar-track"><div class="radar-bar-fill" style="width: ${profile.skillsRadar.lectoescritura}%;"></div></div>
            </div>
            <div class="radar-bar-row">
              <div class="radar-bar-label">
                <span>Auditivo & Explicaciones Habladas</span>
                <span>${profile.skillsRadar.auditivo}%</span>
              </div>
              <div class="radar-bar-track"><div class="radar-bar-fill" style="width: ${profile.skillsRadar.auditivo}%;"></div></div>
            </div>
            <div class="radar-bar-row">
              <div class="radar-bar-label">
                <span>Práctica Activa & Ejercicios</span>
                <span>${profile.skillsRadar.practico}%</span>
              </div>
              <div class="radar-bar-track"><div class="radar-bar-fill" style="width: ${profile.skillsRadar.practico}%;"></div></div>
            </div>
            <div class="radar-bar-row">
              <div class="radar-bar-label">
                <span>Sesiones Ágiles & Foco Modular</span>
                <span>${profile.skillsRadar.focoAgil}%</span>
              </div>
              <div class="radar-bar-track"><div class="radar-bar-fill" style="width: ${profile.skillsRadar.focoAgil}%;"></div></div>
            </div>
          </div>
        </div>

        <!-- Plan Inicial Adaptado -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title"><span>🗓️</span> Tu Plan de Sesión Sugerido</h3>
          </div>
          <div class="method-step-list" style="margin-top: 0;">
            ${planHtml}
          </div>
        </div>
      </div>

      <div style="margin-top: 28px;">
        <h3 style="font-size: 20px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">
          Métodos Recomendados para tu Perfil
        </h3>
        <div class="grid-3">
          ${methodsHtml}
        </div>
      </div>
    `;
  }

  // ==========================================
  // PANTALLA 3: EXPLORAR MÉTODOS (BIBLIOTECA)
  // ==========================================
  function renderMethodsLibrary(methodsToRender) {
    const container = document.getElementById('methods-grid-container');
    if (!container) return;

    const methods = methodsToRender || window.MINDU_METHODS || [];

    if (methods.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          No se encontraron métodos con ese criterio de búsqueda. ¡Prueba con otro término!
        </div>
      `;
      return;
    }

    let html = '';
    methods.forEach(m => {
      const categoryColor = {
        visual: 'badge-blue',
        reading: 'badge-purple',
        audio: 'badge-cyan',
        memory: 'badge-green',
        focus: 'badge-amber',
        organization: 'badge-blue'
      }[m.category] || 'badge-blue';

      html += `
        <div class="method-card" onclick="window.MinduApp.openMethodDetail('${m.id}')">
          <div class="method-meta-row">
            <span class="badge ${categoryColor}">${m.categoryName}</span>
            <span style="font-size: 11px; font-family: var(--font-mono); color: var(--text-dim);">${m.difficulty}</span>
          </div>
          <h3 class="method-title">${m.title}</h3>
          <p class="method-tagline">${m.tagline}</p>
          <div class="method-footer">
            <span>⏱️ ${m.timeNeeded}</span>
            <span style="color: var(--color-primary); font-weight: 600;">Ver Guía y Plantilla ➔</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function filterMethods() {
    const query = (document.getElementById('methods-search-input')?.value || '').toLowerCase().trim();
    const activeCatBtn = document.querySelector('.category-pill.active');
    const selectedCat = activeCatBtn ? activeCatBtn.getAttribute('data-cat') : 'all';

    let list = window.MINDU_METHODS || [];

    if (selectedCat !== 'all') {
      list = list.filter(m => m.category === selectedCat);
    }

    if (query) {
      list = list.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.tagline.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.bestFor.toLowerCase().includes(query)
      );
    }

    renderMethodsLibrary(list);
  }

  function openMethodDetail(methodId) {
    const m = (window.MINDU_METHODS || []).find(item => item.id === methodId);
    if (!m) return;

    const catBadge = document.getElementById('modal-method-cat');
    if (catBadge) catBadge.textContent = m.categoryName;

    const titleEl = document.getElementById('modal-method-title');
    if (titleEl) titleEl.textContent = m.title;

    const timeEl = document.getElementById('modal-method-time');
    if (timeEl) timeEl.textContent = `⏱️ Tiempo recomendado: ${m.timeNeeded} | Dificultad: ${m.difficulty}`;

    const bodyEl = document.getElementById('modal-method-body');
    if (bodyEl) {
      let stepsHtml = '';
      m.steps.forEach((step, idx) => {
        stepsHtml += `
          <div class="method-step-item">
            <div class="step-number-badge">${idx + 1}</div>
            <div style="font-size: 14px; color: var(--text-main);">${step}</div>
          </div>
        `;
      });

      // Render de plantilla o ejemplo según tipo
      let templateVisual = '';
      if (m.templateType === 'cornell') {
        templateVisual = `
          <div style="margin-top: 20px;">
            <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 8px;">Plantilla Interactiva Cornell:</h4>
            <div class="cornell-grid">
              <div class="cornell-cues">
                <div style="font-weight: 700; font-size: 12px; font-family: var(--font-mono); color: var(--color-primary); margin-bottom: 6px;">INDICIOS / PREGUNTAS</div>
                <ul style="font-size: 12px; color: var(--text-muted); list-style: none; display: flex; flex-direction: column; gap: 6px;">
                  <li>• ¿Dónde ocurre?</li>
                  <li>• ¿Qué dos fases la componen?</li>
                  <li>• ¿Cuál es la ecuación química?</li>
                </ul>
              </div>
              <div class="cornell-notes">
                <div style="font-weight: 700; font-size: 12px; font-family: var(--font-mono); color: var(--color-secondary); margin-bottom: 6px;">NOTAS DE CLASE</div>
                <p style="font-size: 13px; color: var(--text-main);">
                  Proceso anabólico en cloroplastos. Clorofila absorbe luz. Fase luminosa rompe H2O y genera ATP. Fase oscura (Calvin) fija CO2 para fabricar glucosa.
                </p>
              </div>
              <div class="cornell-summary">
                <div style="font-weight: 700; font-size: 12px; font-family: var(--font-mono); color: var(--color-accent-cyan); margin-bottom: 4px;">RESUMEN DE CIERRE</div>
                <p style="font-size: 12px; color: var(--text-muted);">
                  Las plantas transforman energía lumínica en glucosa liberando oxígeno, mediante fase luminosa y ciclo de Calvin.
                </p>
              </div>
            </div>
          </div>
        `;
      } else if (m.templateType === 'feynman') {
        templateVisual = `
          <div style="margin-top: 20px; padding: 18px; background: rgba(59, 130, 246, 0.08); border: 1px solid var(--border-glow); border-radius: var(--radius-md);">
            <h4 style="font-size: 15px; font-weight: 700; color: var(--color-primary);">Ejemplo Práctico Feynman: ${m.example.topic}</h4>
            <p style="font-size: 14px; margin-top: 8px; color: var(--text-main); font-style: italic;">
              "${m.example.simpleExplanation}"
            </p>
            <div style="margin-top: 10px; font-size: 12px; font-family: var(--font-mono); color: var(--color-accent-lilac);">
              Analogía clave: ${m.example.analogy}
            </div>
          </div>
        `;
      } else if (m.example) {
        templateVisual = `
          <div style="margin-top: 20px; padding: 16px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
            <h4 style="font-size: 14px; font-weight: 700; color: var(--color-accent-cyan); margin-bottom: 6px;">Ejemplo Práctico Aplicado:</h4>
            <pre style="font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); white-space: pre-wrap; line-height: 1.5;">${typeof m.example === 'string' ? m.example : JSON.stringify(m.example, null, 2)}</pre>
          </div>
        `;
      }

      bodyEl.innerHTML = `
        <div style="margin-bottom: 20px;">
          <p style="font-size: 15px; color: var(--text-main); line-height: 1.6;">${m.description}</p>
          <div style="margin-top: 12px; font-size: 13px; color: var(--color-accent-lilac); background: rgba(139, 92, 246, 0.1); padding: 10px 14px; border-radius: var(--radius-md);">
            🎯 <strong>Cuándo utilizarlo:</strong> ${m.bestFor}
          </div>
        </div>

        <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 10px;">Instrucciones Paso a Paso:</h4>
        <div class="method-step-list">
          ${stepsHtml}
        </div>

        ${templateVisual}

        <div style="margin-top: 18px; font-size: 13px; color: var(--text-muted); background: var(--bg-input); padding: 12px; border-radius: var(--radius-md); border-left: 3px solid var(--color-warning);">
          💡 <strong>Consejo Mindu:</strong> ${m.tips}
        </div>
      `;
    }

    // Botón de acción para probar con un tema
    const btnApply = document.getElementById('btn-apply-method-now');
    if (btnApply) {
      btnApply.onclick = () => {
        closeModal('modal-method-detail');
        navigateTo('converter');
      };
    }

    // Botón de calificación
    const btnRate = document.getElementById('btn-rate-method-helpful');
    if (btnRate) {
      btnRate.onclick = () => {
        if (window.MinduProgress) {
          window.MinduProgress.rateMethod(m.id, 5);
          alert('¡Gracias por registrar tu valoración! Esto afina tus recomendaciones personalizadas.');
        }
      };
    }

    openModal('modal-method-detail');
  }

  // ==========================================
  // PANTALLA 4: CONVIERTE CUALQUIER TEMA
  // ==========================================
  function setupConverterEvents() {
    // Chips de presets
    const presetChips = document.querySelectorAll('.preset-chip');
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const presetId = chip.getAttribute('data-preset');
        loadPresetInConverter(presetId);
      });
    });

    // Modos de transformación
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeConverterMode = btn.getAttribute('data-mode');
        runTopicConversion();
      });
    });

    // Botón ejecutar
    const btnRun = document.getElementById('btn-run-conversion');
    if (btnRun) {
      btnRun.addEventListener('click', runTopicConversion);
    }

    // Acciones de salida (copiar, markdown, imprimir, guardar)
    const btnCopy = document.getElementById('btn-copy-output');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        const text = document.getElementById('converter-output-body')?.innerText || '';
        navigator.clipboard.writeText(text).then(() => {
          alert('¡Copiado al portapapeles!');
        });
      });
    }

    const btnExport = document.getElementById('btn-export-markdown');
    if (btnExport) {
      btnExport.addEventListener('click', exportOutputAsMarkdown);
    }

    const btnPrint = document.getElementById('btn-print-output');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    const btnSave = document.getElementById('btn-save-material');
    if (btnSave) {
      btnSave.addEventListener('click', saveCurrentGeneratedMaterial);
    }
  }

  function loadPresetInConverter(presetId) {
    const presets = window.MINDU_TOPIC_PRESETS || [];
    const p = presets.find(item => item.id === presetId) || presets[0];
    if (!p) return;

    const titleInput = document.getElementById('converter-topic-title');
    const textInput = document.getElementById('converter-raw-text');

    if (titleInput) titleInput.value = p.name;
    if (textInput) textInput.value = p.text;

    runTopicConversion();
  }

  let currentTransformationResult = null;

  function runTopicConversion() {
    const title = document.getElementById('converter-topic-title')?.value.trim() || 'Tema de Estudio';
    const rawText = document.getElementById('converter-raw-text')?.value.trim() || '';

    if (!rawText) {
      alert('Por favor introduce o pega algún texto para transformarlo.');
      return;
    }

    const mode = activeConverterMode || 'summary';
    const result = window.MinduConverter.transform(rawText, title, mode);
    currentTransformationResult = result;

    renderConverterOutput(result);
  }

  function renderConverterOutput(res) {
    const outputBody = document.getElementById('converter-output-body');
    const outputTitle = document.getElementById('converter-output-title');
    const outputBadge = document.getElementById('converter-output-badge');

    if (!outputBody || !res) return;

    if (outputTitle) outputTitle.textContent = res.title;
    if (outputBadge) outputBadge.textContent = res.type.toUpperCase();

    let html = '';

    switch (res.type) {
      case 'summary':
        html = `
          <div style="padding: 10px;">
            <div style="font-size: 15px; color: var(--text-main); margin-bottom: 20px; line-height: 1.6; background: rgba(59, 130, 246, 0.08); padding: 16px; border-radius: var(--radius-md); border-left: 3px solid var(--color-primary);">
              ${res.intro}
            </div>
            <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: var(--text-main);">Ideas Clave Sintetizadas:</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${res.coreIdeas.map(item => `
                <div class="method-step-item">
                  <div class="step-number-badge">${item.index}</div>
                  <div style="font-size: 14px; color: var(--text-main);">${item.text}</div>
                </div>
              `).join('')}
            </div>
            <div style="margin-top: 24px; padding: 14px; background: var(--bg-surface); border-radius: var(--radius-md); font-size: 13px; color: var(--text-muted);">
              💡 <strong>Aplicación Práctica:</strong> ${res.application}
            </div>
          </div>
        `;
        break;

      case 'mindmap':
        html = `
          <div class="mindmap-visual">
            <div class="mindmap-core">${res.centralNode}</div>
            <div class="mindmap-branches-grid">
              ${res.branches.map(b => `
                <div class="mindmap-branch-box" style="border-top: 4px solid ${b.color};">
                  <div class="branch-title" style="color: ${b.color};">🌿 ${b.title}</div>
                  <ul class="branch-items">
                    ${b.nodes.map(n => `<li>• ${n}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'conceptmap':
        html = `
          <div style="padding: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span class="mindmap-core" style="display: inline-block;">${res.mainConcept}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px; max-width: 650px; margin: 0 auto;">
              ${res.relations.map(rel => `
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; background: var(--bg-surface); padding: 12px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                  <strong style="color: var(--text-main); font-size: 14px;">${rel.from}</strong>
                  <span class="badge badge-purple" style="font-size: 11px;">[ ${rel.relation} ]</span>
                  <strong style="color: var(--color-accent-cyan); font-size: 14px;">${rel.to}</strong>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'flashcards':
        html = `
          <div style="padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span style="font-size: 14px; color: var(--text-muted);">${res.cards.length} tarjetas generadas</span>
              <button class="btn btn-primary btn-sm" onclick="window.MinduApp.importCardsToPracticeDeck()">📥 Importar al Mazo de Práctica</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
              ${res.cards.map((c, i) => `
                <div class="card" style="padding: 16px; border: 1px solid var(--border-strong);">
                  <span class="academic-tag" style="font-size: 10px;">Tarjeta #${i + 1}</span>
                  <div style="font-weight: 700; font-size: 14px; margin: 8px 0; color: var(--text-main);">${c.front}</div>
                  <div style="font-size: 13px; color: var(--text-muted); border-top: 1px dashed var(--border-color); padding-top: 8px;">${c.back}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'quiz':
        html = `
          <div style="padding: 10px;">
            <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
              Responde estas preguntas para poner a prueba tu retención inmediata:
            </div>
            <div style="display: flex; flex-direction: column; gap: 20px;">
              ${res.questions.map((q, idx) => `
                <div class="card" style="padding: 20px;">
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">
                    ${idx + 1}. ${q.question}
                  </h4>
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${q.options.map((opt, optIdx) => `
                      <button class="quiz-option-btn" onclick="window.MinduApp.checkGeneratedQuizOption(this, ${optIdx === q.correctIndex}, '${encodeURIComponent(q.explanation)}')">
                        ${opt}
                      </button>
                    `).join('')}
                  </div>
                  <div class="quiz-feedback-box"></div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'podcast':
        html = `
          <div style="padding: 10px;">
            <div class="audio-player-box">
              <div>
                <strong style="color: var(--text-main); font-size: 15px;">🎙️ Locución Guiada Mindu</strong>
                <div style="font-size: 12px; color: var(--text-muted);">Escucha la explicación con síntesis de voz Web Speech</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-primary btn-sm" id="btn-play-podcast-tts" onclick="window.MinduApp.playPodcastTTS()">
                  <span>▶</span>
                  <span id="podcast-play-label">Escuchar Cápsula</span>
                </button>
                <button class="btn btn-secondary btn-sm" onclick="window.MinduAccessibility.stopSpeaking()">⏹️ Detener</button>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${res.dialogue.map(line => `
                <div class="podcast-bubble">
                  <div class="speaker-tag">${line.speaker}</div>
                  <div style="font-size: 14px; color: var(--text-main); line-height: 1.5;">${line.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'timeline':
        html = `
          <div style="padding: 10px;">
            <div class="timeline-track">
              ${res.events.map(ev => `
                <div class="timeline-node">
                  <div class="timeline-date">${ev.date}</div>
                  <div class="timeline-node-title">${ev.title}</div>
                  <div class="timeline-node-desc">${ev.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'feynman':
        html = `
          <div style="padding: 10px;">
            <div class="card" style="background: rgba(139, 92, 246, 0.08); border-color: rgba(139, 92, 246, 0.3); margin-bottom: 20px;">
              <span class="academic-tag" style="margin-bottom: 6px;">Explicación en Palabras Simples</span>
              <p style="font-size: 16px; color: var(--text-main); line-height: 1.6; margin-top: 8px;">
                "${res.childFriendlyExplanation}"
              </p>
            </div>

            <div class="card" style="margin-bottom: 20px;">
              <h4 style="font-size: 15px; font-weight: 700; color: var(--color-accent-cyan); margin-bottom: 8px;">Analogía de la Vida Cotidiana:</h4>
              <p style="font-size: 14px; color: var(--text-muted);">${res.analogy}</p>
            </div>

            <div class="card">
              <h4 style="font-size: 15px; font-weight: 700; color: var(--color-warning); margin-bottom: 8px;">Trampas a Evitar:</h4>
              <ul style="font-size: 13px; color: var(--text-muted); list-style: disc; margin-left: 20px; display: flex; flex-direction: column; gap: 6px;">
                ${res.pitfallsToAvoid.map(p => `<li>${p}</li>`).join('')}
              </ul>
              <div style="margin-top: 16px; font-weight: 600; font-size: 13px; color: var(--color-primary);">
                ❓ Prueba de oro: ${res.checkQuestion}
              </div>
            </div>
          </div>
        `;
        break;

      case 'microlessons':
        html = `
          <div style="padding: 10px; display: flex; flex-direction: column; gap: 16px;">
            ${res.lessons.map(lesson => `
              <div class="card" style="border-left: 4px solid var(--color-primary);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span class="academic-tag">${lesson.timeToRead}</span>
                  <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-dim);">Paso ${lesson.stepNumber} de 3</span>
                </div>
                <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">${lesson.title}</h4>
                <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">${lesson.content}</p>
                <div style="margin-top: 12px; font-size: 12px; font-style: italic; color: var(--color-accent-lilac);">
                  Pregunta de consolidación: ${lesson.quickCheck}
                </div>
              </div>
            `).join('')}
          </div>
        `;
        break;

      case 'examprep':
        html = `
          <div style="padding: 10px;">
            <div class="card" style="margin-bottom: 16px;">
              <h4 style="font-size: 15px; font-weight: 700; color: var(--color-primary); margin-bottom: 10px;">Términos Críticos de Alto Rendimiento:</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${res.mustKnowConcepts.map(kw => `<span class="badge badge-blue" style="font-size: 13px;">${kw}</span>`).join('')}
              </div>
            </div>

            <div class="card" style="margin-bottom: 16px;">
              <h4 style="font-size: 15px; font-weight: 700; color: var(--color-danger); margin-bottom: 10px;">Trampas Frecuentes en Exámenes:</h4>
              <ul style="font-size: 13px; color: var(--text-muted); list-style: disc; margin-left: 20px; display: flex; flex-direction: column; gap: 6px;">
                ${res.commonTraps.map(trap => `<li>${trap}</li>`).join('')}
              </ul>
            </div>

            <div class="card">
              <h4 style="font-size: 15px; font-weight: 700; color: var(--color-success); margin-bottom: 10px;">Preguntas Clave para Repasar:</h4>
              <ol style="font-size: 13px; color: var(--text-main); margin-left: 20px; display: flex; flex-direction: column; gap: 8px;">
                ${res.highYieldQuestions.map(q => `<li>${q}</li>`).join('')}
              </ol>
              <div style="margin-top: 16px; font-size: 12px; color: var(--text-dim); border-top: 1px solid var(--border-color); padding-top: 10px;">
                💡 ${res.finalAdvice}
              </div>
            </div>
          </div>
        `;
        break;
    }

    outputBody.innerHTML = html;
  }

  function playPodcastTTS() {
    if (!currentTransformationResult || !currentTransformationResult.fullTextForTTS) return;
    const label = document.getElementById('podcast-play-label');
    if (label) label.textContent = 'Reproduciendo...';

    window.MinduAccessibility.speakText(currentTransformationResult.fullTextForTTS, null, () => {
      if (label) label.textContent = 'Escuchar Cápsula';
    });
  }

  function checkGeneratedQuizOption(btn, isCorrect, encodedExplanation) {
    const parent = btn.parentElement;
    const feedbackBox = parent.parentElement.querySelector('.quiz-feedback-box');
    const explanation = decodeURIComponent(encodedExplanation);

    parent.querySelectorAll('.quiz-option-btn').forEach(b => {
      b.disabled = true;
    });

    if (isCorrect) {
      btn.classList.add('correct');
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = 'rgba(16, 185, 129, 0.15)';
        feedbackBox.style.border = '1px solid var(--color-success)';
        feedbackBox.style.color = '#34D399';
        feedbackBox.innerHTML = `<strong>¡Correcto!</strong> ${explanation}`;
      }
    } else {
      btn.classList.add('incorrect');
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
        feedbackBox.style.border = '1px solid var(--color-danger)';
        feedbackBox.style.color = '#F87171';
        feedbackBox.innerHTML = `<strong>Opción incorrecta.</strong> ${explanation}`;
      }
    }
  }

  function importCardsToPracticeDeck() {
    if (!currentTransformationResult || !currentTransformationResult.cards) return;
    window.MinduPractice.addCardsBatch(currentTransformationResult.cards);
    alert(`¡Se importaron ${currentTransformationResult.cards.length} tarjetas con éxito a la pestaña de Práctica!`);
  }

  function saveCurrentGeneratedMaterial() {
    if (!currentTransformationResult) return;
    const saved = {
      id: `mat-${Date.now()}`,
      title: currentTransformationResult.title,
      type: currentTransformationResult.type,
      timestamp: new Date().toISOString()
    };
    window.MinduConverter.saveMaterial(saved);
    alert('¡Material guardado en tu espacio personal!');
  }

  function exportOutputAsMarkdown() {
    if (!currentTransformationResult) return;
    const text = document.getElementById('converter-output-body')?.innerText || '';
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Mindu_${currentTransformationResult.type}_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // ==========================================
  // PANTALLA 5: MODO CONCENTRACIÓN
  // ==========================================
  function setupFocusEvents() {
    const btnStart = document.getElementById('btn-timer-start-pause');
    const btnReset = document.getElementById('btn-timer-reset');
    const btnFiveMin = document.getElementById('btn-timer-fivemin');
    const btnKindReset = document.getElementById('btn-kind-reset-top');

    if (btnStart) {
      btnStart.addEventListener('click', () => {
        const state = window.MinduConcentration.getState();
        if (state.isRunning) {
          window.MinduConcentration.pause();
        } else {
          window.MinduConcentration.start();
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        window.MinduConcentration.reset();
      });
    }

    if (btnFiveMin) {
      btnFiveMin.addEventListener('click', () => {
        window.MinduConcentration.startFiveMinuteRule();
      });
    }

    if (btnKindReset) {
      btnKindReset.addEventListener('click', () => {
        window.MinduConcentration.kindReset();
        alert('🌱 ¡Reinicio sin culpa! El tiempo empieza ahora. Respira hondo y continúa desde donde te quedaste, sin penalizaciones.');
      });
    }

    // Botones de presets de duración
    const timerPresetBtns = document.querySelectorAll('.timer-preset-btn');
    timerPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        timerPresetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const workMin = parseInt(btn.getAttribute('data-work'), 10);
        const breakMin = parseInt(btn.getAttribute('data-break'), 10);
        window.MinduConcentration.setCustomDurations(workMin, breakMin);
      });
    });

    // Cambiar tarea activa
    const btnEditTask = document.getElementById('btn-edit-focus-task');
    if (btnEditTask) {
      btnEditTask.addEventListener('click', () => {
        const newTask = prompt('¿En qué tarea específica te enfocarás en este bloque?');
        if (newTask) {
          window.MinduConcentration.setCurrentTask(newTask);
        }
      });
    }

    // Cambiar compañero virtual
    const btnSwitchBuddy = document.getElementById('btn-switch-buddy');
    if (btnSwitchBuddy) {
      btnSwitchBuddy.addEventListener('click', () => {
        window.MinduConcentration.switchBuddy();
      });
    }

    // Selector de sonidos ambientales Web Audio API
    const soundBtns = document.querySelectorAll('.sound-btn');
    soundBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const soundType = btn.getAttribute('data-sound');
        const currentActive = btn.classList.contains('active');

        soundBtns.forEach(b => b.classList.remove('active'));

        if (currentActive) {
          window.MinduConcentration.stopAmbientSound();
        } else {
          btn.classList.add('active');
          window.MinduConcentration.startAmbientSound(soundType);
        }
      });
    });

    const btnStopAudio = document.getElementById('btn-stop-audio');
    if (btnStopAudio) {
      btnStopAudio.addEventListener('click', () => {
        soundBtns.forEach(b => b.classList.remove('active'));
        window.MinduConcentration.stopAmbientSound();
      });
    }

    const volumeSlider = document.getElementById('sound-volume-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        window.MinduConcentration.setVolume(parseFloat(e.target.value));
      });
    }
  }

  function updateTimerUI(state) {
    const digitsEl = document.getElementById('timer-display-digits');
    if (digitsEl) digitsEl.textContent = state.formatted;

    const playLabel = document.getElementById('timer-play-label');
    const playIcon = document.getElementById('timer-play-icon');
    if (playLabel) playLabel.textContent = state.isRunning ? 'Pausar' : 'Comenzar';
    if (playIcon) playIcon.textContent = state.isRunning ? '⏸' : '▶';

    const modeLabel = document.getElementById('timer-mode-label');
    if (modeLabel) {
      if (state.currentMode === 'work') modeLabel.textContent = 'SESIÓN DE FOCO';
      else if (state.currentMode === 'break') modeLabel.textContent = 'PAUSA Y DESCANSO';
      else if (state.currentMode === 'fivemin') modeLabel.textContent = 'REGLA DE 5 MIN';
    }

    const taskNameEl = document.getElementById('focus-task-name');
    if (taskNameEl) taskNameEl.textContent = state.currentTask;

    // Actualizar anillo SVG
    const svgCircle = document.getElementById('timer-svg-progress');
    if (svgCircle) {
      const circumference = 2 * Math.PI * 120; // ~754
      const offset = circumference * (1 - state.progress);
      svgCircle.style.strokeDashoffset = offset;
      svgCircle.style.stroke = state.currentMode === 'break' ? 'var(--color-success)' : 'var(--color-primary)';
    }

    // Actualizar Body Doubling
    if (state.currentBuddy) {
      const avatarEl = document.getElementById('buddy-avatar');
      const nameEl = document.getElementById('buddy-name');
      const taskEl = document.getElementById('buddy-task');
      if (avatarEl) avatarEl.textContent = state.currentBuddy.avatar;
      if (nameEl) nameEl.textContent = state.currentBuddy.name;
      if (taskEl) taskEl.textContent = state.currentBuddy.task;
    }
  }

  function onSessionComplete(state) {
    if (state.currentMode === 'break') {
      alert('🔔 ¡Bloque completado con éxito! Tómate un respiro de descanso, estira el cuerpo y bebe agua.');
    } else {
      alert('🔔 ¡Descanso finalizado! ¿Listo para continuar con energía renovada?');
    }
    updateDashboardUI();
  }

  // ==========================================
  // PANTALLA 6: MI PLANIFICADOR
  // ==========================================
  function setupPlannerEvents() {
    const btnGenPlan = document.getElementById('btn-generate-daily-plan');
    if (btnGenPlan) {
      btnGenPlan.addEventListener('click', () => {
        const mins = document.getElementById('planner-available-minutes')?.value;
        const energy = document.getElementById('planner-energy-select')?.value;
        const subject = document.getElementById('planner-subject-input')?.value;

        const plan = window.MinduPlanner.generateDailyPlan(mins, energy, subject);
        renderGeneratedDailyPlan(plan);
      });
    }

    const btnGuiltFree = document.getElementById('btn-guilt-free-reschedule');
    if (btnGuiltFree) {
      btnGuiltFree.addEventListener('click', () => {
        const res = window.MinduPlanner.guiltFreeReschedule();
        renderPlannerTasks();
        alert(`🌱 ${res.message}`);
      });
    }

    // Modal de Tareas
    const btnOpenAddTask = document.getElementById('btn-open-add-task-modal');
    if (btnOpenAddTask) btnOpenAddTask.addEventListener('click', () => openModal('modal-add-task'));

    const btnCloseTask = document.getElementById('btn-close-task-modal');
    if (btnCloseTask) btnCloseTask.addEventListener('click', () => closeModal('modal-add-task'));

    const btnCancelTask = document.getElementById('btn-cancel-task');
    if (btnCancelTask) btnCancelTask.addEventListener('click', () => closeModal('modal-add-task'));

    const btnConfirmTask = document.getElementById('btn-confirm-add-task');
    if (btnConfirmTask) {
      btnConfirmTask.addEventListener('click', () => {
        const title = document.getElementById('task-input-title')?.value.trim();
        const subject = document.getElementById('task-input-subject')?.value.trim() || 'General';
        const mins = document.getElementById('task-input-minutes')?.value || 25;
        const energy = document.getElementById('task-input-energy')?.value || 'media';

        if (!title) {
          alert('Por favor escribe el título de la tarea.');
          return;
        }

        window.MinduPlanner.addTask({
          title,
          subject,
          estimatedMinutes: mins,
          energyNeeded: energy
        });

        closeModal('modal-add-task');
        renderPlannerTasks();
      });
    }

    // Modal de Exámenes
    const btnOpenAddExam = document.getElementById('btn-add-exam-btn');
    if (btnOpenAddExam) btnOpenAddExam.addEventListener('click', () => openModal('modal-add-exam'));

    const btnCloseExam = document.getElementById('btn-close-exam-modal');
    if (btnCloseExam) btnCloseExam.addEventListener('click', () => closeModal('modal-add-exam'));

    const btnCancelExam = document.getElementById('btn-cancel-exam');
    if (btnCancelExam) btnCancelExam.addEventListener('click', () => closeModal('modal-add-exam'));

    const btnConfirmExam = document.getElementById('btn-confirm-add-exam');
    if (btnConfirmExam) {
      btnConfirmExam.addEventListener('click', () => {
        const title = document.getElementById('exam-input-title')?.value.trim();
        const subject = document.getElementById('exam-input-subject')?.value.trim() || 'General';
        const date = document.getElementById('exam-input-date')?.value;

        if (!title || !date) {
          alert('Por favor completa el nombre del examen y la fecha.');
          return;
        }

        window.MinduPlanner.addExam({
          title,
          subject,
          date
        });

        closeModal('modal-add-exam');
        renderPlannerExams();
      });
    }
  }

  function renderPlannerTasks() {
    const container = document.getElementById('planner-tasks-container');
    if (!container) return;

    const tasks = window.MinduPlanner.getTasks();

    if (tasks.length === 0) {
      container.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--text-dim); font-size: 13px;">
          No tienes tareas pendientes. ¡Excelente momento para descansar o crear un tema nuevo!
        </div>
      `;
      return;
    }

    let html = '';
    tasks.forEach(t => {
      html += `
        <div class="task-item ${t.completed ? 'completed' : ''}">
          <input type="checkbox" class="task-checkbox" ${t.completed ? 'checked' : ''} onchange="window.MinduApp.toggleTaskItem('${t.id}')">
          <div class="task-info">
            <div class="task-title">${t.title}</div>
            <div class="task-meta">
              <span>📚 ${t.subject}</span>
              <span>⏱️ ${t.estimatedMinutes} min</span>
              <span>🔋 ${t.energyNeeded}</span>
            </div>
          </div>
          <button style="background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 14px;" onclick="window.MinduApp.deleteTaskItem('${t.id}')" title="Eliminar">🗑️</button>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function toggleTaskItem(id) {
    window.MinduPlanner.toggleTask(id);
    renderPlannerTasks();
  }

  function deleteTaskItem(id) {
    window.MinduPlanner.deleteTask(id);
    renderPlannerTasks();
  }

  function renderPlannerExams() {
    const container = document.getElementById('planner-exams-container');
    if (!container) return;

    const exams = window.MinduPlanner.getExams();

    if (exams.length === 0) {
      container.innerHTML = `
        <div style="padding: 16px; font-size: 13px; color: var(--text-dim); text-align: center;">
          No hay exámenes próximos registrados.
        </div>
      `;
      return;
    }

    let html = '';
    exams.forEach(e => {
      const examDate = new Date(e.date);
      const today = new Date();
      const diffTime = examDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      html += `
        <div style="background: var(--bg-surface); padding: 12px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${e.title}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${e.subject} • Fecha: ${e.date}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge ${diffDays <= 3 ? 'badge-amber' : 'badge-blue'}">
              ${diffDays > 0 ? `En ${diffDays} días` : '¡Hoy!'}
            </span>
            <button style="background: none; border: none; color: var(--text-dim); cursor: pointer;" onclick="window.MinduApp.deleteExamItem('${e.id}')">✕</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function deleteExamItem(id) {
    window.MinduPlanner.deleteExam(id);
    renderPlannerExams();
  }

  function renderGeneratedDailyPlan(plan) {
    const container = document.getElementById('planner-generated-schedule');
    if (!container) return;

    container.style.display = 'block';

    let html = `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-glow); border-radius: var(--radius-md); padding: 18px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--color-primary);">Itinerario Realista (${plan.totalTimeEstimated} min)</h4>
          <span class="badge badge-purple">Energía: ${plan.energyLevel}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
    `;

    plan.schedule.forEach(item => {
      html += `
        <div style="padding: 10px; background: var(--bg-card); border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
          <div style="display: flex; justify-content: space-between; font-size: 12px; font-family: var(--font-mono); color: var(--color-accent-cyan);">
            <span>${item.time}</span>
            <span>${item.duration}</span>
          </div>
          <div style="font-weight: 600; font-size: 13px; color: var(--text-main); margin-top: 2px;">${item.title}</div>
          <div style="font-size: 12px; color: var(--text-muted);">${item.method} — <span style="font-style: italic;">${item.tip}</span></div>
        </div>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
  }

  // ==========================================
  // PANTALLA 7: PRACTICAR Y RECORDAR
  // ==========================================
  function setupPracticeEvents() {
    // Tabs de práctica
    const tabs = document.querySelectorAll('.practice-tab-content');
    const tabBtns = document.querySelectorAll('.tabs-nav .tab-btn');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetTab = btn.getAttribute('data-tab');

        tabs.forEach(t => t.style.display = 'none');
        const targetEl = document.getElementById(targetTab);
        if (targetEl) targetEl.style.display = 'block';
      });
    });

    // Volteo de flashcard interactiva 3D
    const cardEl = document.getElementById('interactive-flashcard');
    if (cardEl) {
      cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('flipped');
      });
    }

    // Botones de calificación Leitner
    const btnHard = document.getElementById('btn-fc-hard');
    const btnGood = document.getElementById('btn-fc-good');
    const btnEasy = document.getElementById('btn-fc-easy');

    if (btnHard) btnHard.addEventListener('click', () => rateCurrentCard('hard'));
    if (btnGood) btnGood.addEventListener('click', () => rateCurrentCard('good'));
    if (btnEasy) btnEasy.addEventListener('click', () => rateCurrentCard('easy'));

    // Botón añadir flashcard manual
    const btnAddFc = document.getElementById('btn-add-custom-flashcard');
    if (btnAddFc) {
      btnAddFc.addEventListener('click', () => {
        const topic = prompt('Materia o tema:');
        const front = prompt('Pregunta o concepto del anverso:');
        const back = prompt('Respuesta o definición del reverso:');
        if (front && back) {
          window.MinduPractice.addCard(topic, front, back);
          renderFlashcard();
          alert('¡Flashcard añadida con éxito!');
        }
      });
    }

    // Feynman Studio Check
    const btnFeynman = document.getElementById('btn-feynman-check');
    if (btnFeynman) {
      btnFeynman.addEventListener('click', () => {
        const concept = document.getElementById('feynman-concept-input')?.value.trim();
        const text = document.getElementById('feynman-simple-text')?.value.trim();
        const feedbackBox = document.getElementById('feynman-feedback-box');

        if (!concept || !text) {
          alert('Por favor escribe el concepto y tu explicación sencilla.');
          return;
        }

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.className = 'card';
          feedbackBox.style.background = 'rgba(16, 185, 129, 0.1)';
          feedbackBox.style.borderColor = 'var(--color-success)';
          feedbackBox.innerHTML = `
            <h4 style="font-size: 15px; font-weight: 700; color: var(--color-success); margin-bottom: 6px;">
              ¡Excelente trabajo de elaboración cognitiva!
            </h4>
            <p style="font-size: 13px; color: var(--text-main);">
              Has obligado a tu cerebro a codificar "${concept}" con tu propio vocabulario. Guardamos esta explicación en tu historial de comprensión.
            </p>
          `;
        }
      });
    }
  }

  function renderFlashcard() {
    const deck = window.MinduPractice ? window.MinduPractice.getDeck() : [];
    if (deck.length === 0) return;

    if (currentFlashcardIndex >= deck.length) currentFlashcardIndex = 0;
    const card = deck[currentFlashcardIndex];

    const cardEl = document.getElementById('interactive-flashcard');
    if (cardEl) cardEl.classList.remove('flipped');

    const counterTag = document.getElementById('fc-counter-tag');
    if (counterTag) counterTag.textContent = `Tarjeta ${currentFlashcardIndex + 1} de ${deck.length}`;

    const topicLabel = document.getElementById('fc-topic-label');
    if (topicLabel) topicLabel.textContent = card.topic || 'General';

    const frontText = document.getElementById('fc-front-text');
    if (frontText) frontText.textContent = card.front;

    const backText = document.getElementById('fc-back-text');
    if (backText) backText.textContent = card.back;
  }

  function rateCurrentCard(rating) {
    const deck = window.MinduPractice.getDeck();
    if (deck.length === 0) return;

    const card = deck[currentFlashcardIndex];
    window.MinduPractice.reviewCard(card.id, rating);

    // Pasar a la siguiente tarjeta con animación suave
    currentFlashcardIndex = (currentFlashcardIndex + 1) % deck.length;
    renderFlashcard();
    updateDashboardUI();
  }

  function renderQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container || !window.MinduPractice) return;

    const quizzes = window.MinduPractice.getQuizzes();
    let html = '';

    quizzes.forEach((q, idx) => {
      html += `
        <div style="margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span class="academic-tag">Pregunta ${idx + 1}</span>
            <span style="font-size: 12px; color: var(--text-muted);">${q.topic}</span>
          </div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">
            ${q.question}
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${q.options.map((opt, optIdx) => `
              <button class="quiz-option-btn" onclick="window.MinduApp.checkQuizOption(this, ${optIdx === q.correctIndex}, '${encodeURIComponent(q.explanation)}')">
                ${opt}
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback-box"></div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function checkQuizOption(btn, isCorrect, encodedExplanation) {
    const parent = btn.parentElement;
    const feedbackBox = parent.parentElement.querySelector('.quiz-feedback-box');
    const explanation = decodeURIComponent(encodedExplanation);

    parent.querySelectorAll('.quiz-option-btn').forEach(b => {
      b.disabled = true;
    });

    if (isCorrect) {
      btn.classList.add('correct');
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = 'rgba(16, 185, 129, 0.15)';
        feedbackBox.style.border = '1px solid var(--color-success)';
        feedbackBox.style.color = '#34D399';
        feedbackBox.innerHTML = `<strong>¡Correcto!</strong> ${explanation}`;
      }
      if (window.MinduPractice) window.MinduPractice.logQuizAttempt('quiz-run', 100, 1, 1);
    } else {
      btn.classList.add('incorrect');
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
        feedbackBox.style.border = '1px solid var(--color-danger)';
        feedbackBox.style.color = '#F87171';
        feedbackBox.innerHTML = `<strong>Atención a la trampa:</strong> ${explanation}`;
      }
      if (window.MinduPractice) window.MinduPractice.logQuizAttempt('quiz-run', 0, 0, 1);
    }
  }

  // ==========================================
  // PANTALLA 8: MI PROGRESO
  // ==========================================
  function setupProgressEvents() {
    let selectedMood = 'tranquilo';
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        moodBtns.forEach(b => b.classList.remove('btn-primary'));
        btn.classList.add('btn-primary');
        selectedMood = btn.getAttribute('data-mood');
      });
    });

    const btnSaveWb = document.getElementById('btn-save-wellbeing');
    if (btnSaveWb) {
      btnSaveWb.addEventListener('click', () => {
        const notes = document.getElementById('wellbeing-notes-input')?.value;
        if (window.MinduProgress) {
          window.MinduProgress.logWellbeing(selectedMood, 4, notes);
          const msg = document.getElementById('wellbeing-status-msg');
          if (msg) {
            msg.style.display = 'block';
            setTimeout(() => { msg.style.display = 'none'; }, 4000);
          }
        }
      });
    }
  }

  function renderProgressUI() {
    if (!window.MinduProgress) return;
    const metrics = window.MinduProgress.getSummaryMetrics();

    const hoursEl = document.getElementById('progress-focus-hours');
    if (hoursEl) hoursEl.textContent = `${metrics.focusHoursFormatted} h`;

    const matEl = document.getElementById('progress-materials-count');
    if (matEl) matEl.textContent = metrics.materialsCount;

    const quizEl = document.getElementById('progress-quiz-score');
    if (quizEl) quizEl.textContent = `${metrics.quizAvg}%`;

    const cardEl = document.getElementById('progress-mastered-cards');
    if (cardEl) cardEl.textContent = metrics.cardsMastered;

    // Métodos favoritos
    const topContainer = document.getElementById('progress-top-methods-container');
    if (topContainer) {
      const allMethods = window.MINDU_METHODS || [];
      let html = '';
      metrics.topMethods.forEach(item => {
        const m = allMethods.find(x => x.id === item.id);
        const name = m ? m.title : item.id;
        html += `
          <div class="method-efficacy-row">
            <div>
              <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${name}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${item.uses} sesiones prácticas registradas</div>
            </div>
            <div class="stars-rating">★ ${item.helpfulScore} / 5.0</div>
          </div>
        `;
      });
      topContainer.innerHTML = html;
    }
  }

  // ==========================================
  // PANTALLA 9: CONFIGURACIÓN Y ACCESIBILIDAD
  // ==========================================
  function setupSettingsEvents() {
    const themeSelect = document.getElementById('setting-theme-select');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        window.MinduAccessibility.saveSettings({ theme: e.target.value });
      });
    }

    const fontSelect = document.getElementById('setting-font-size-select');
    if (fontSelect) {
      fontSelect.addEventListener('change', (e) => {
        window.MinduAccessibility.saveSettings({ fontSize: e.target.value });
      });
    }

    const contrastToggle = document.getElementById('setting-high-contrast-toggle');
    if (contrastToggle) {
      contrastToggle.addEventListener('change', (e) => {
        window.MinduAccessibility.saveSettings({ highContrast: e.target.checked });
      });
    }

    const motionToggle = document.getElementById('setting-reduced-motion-toggle');
    if (motionToggle) {
      motionToggle.addEventListener('change', (e) => {
        window.MinduAccessibility.saveSettings({ reducedMotion: e.target.checked });
      });
    }

    const speedSelect = document.getElementById('setting-tts-speed');
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        window.MinduAccessibility.saveSettings({ ttsSpeed: parseFloat(e.target.value) });
      });
    }
  }

  function syncSettingsControls() {
    if (!window.MinduAccessibility) return;
    const settings = window.MinduAccessibility.getSettings();

    const themeSelect = document.getElementById('setting-theme-select');
    if (themeSelect) themeSelect.value = settings.theme;

    const fontSelect = document.getElementById('setting-font-size-select');
    if (fontSelect) fontSelect.value = settings.fontSize;

    const contrastToggle = document.getElementById('setting-high-contrast-toggle');
    if (contrastToggle) contrastToggle.checked = !!settings.highContrast;

    const motionToggle = document.getElementById('setting-reduced-motion-toggle');
    if (motionToggle) motionToggle.checked = !!settings.reducedMotion;

    const speedSelect = document.getElementById('setting-tts-speed');
    if (speedSelect) speedSelect.value = String(settings.ttsSpeed);
  }

  // ==========================================
  // MODALES GENÉRICOS Y RECOMENDADOR RÁPIDO
  // ==========================================
  function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
  }

  function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
  }

  function openRecommendationModal(trigger) {
    if (trigger === 'dense') {
      openMethodDetail('tecnica-feynman');
    } else if (trigger === 'forget') {
      openMethodDetail('recuperacion-activa');
    } else if (trigger === 'distracted') {
      openMethodDetail('pomodoro-flexible');
    }
  }

  // Ejecutar inicialización al cargar DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    navigateTo,
    openAssessmentModal,
    selectAssessmentOption,
    openMethodDetail,
    openRecommendationModal,
    checkQuizOption,
    checkGeneratedQuizOption,
    playPodcastTTS,
    importCardsToPracticeDeck,
    toggleTaskItem,
    deleteTaskItem,
    deleteExamItem
  };
})();
