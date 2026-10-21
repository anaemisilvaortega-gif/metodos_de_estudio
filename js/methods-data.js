/**
 * MINDU - Base de Datos de Métodos de Estudio
 * Contiene más de 30 métodos estructurados en 6 categorías, con explicaciones,
 * pasos interactivos, ejemplos prácticos y plantillas listas para usar.
 */

window.MINDU_METHODS = [
  // ==========================================
  // CATEGORÍA A: MÉTODOS VISUALES Y CREATIVOS
  // ==========================================
  {
    id: 'mapas-mentales',
    category: 'visual',
    categoryName: 'Visuales y Creativos',
    title: 'Mapas Mentales',
    tagline: 'Estructura ideas radialmente a partir de un núcleo central.',
    difficulty: 'Fácil',
    timeNeeded: '15 - 30 min',
    bestFor: 'Lluvias de ideas, conectar conceptos dispersos, visión global de un tema.',
    description: 'Un mapa mental organiza la información imitando la forma en que el cerebro asocia ideas: parte de un nodo central y se ramifica hacia subtemas mediante palabras clave, colores y símbolos.',
    steps: [
      'Coloca el tema principal o pregunta en el centro de tu espacio de trabajo.',
      'Dibuja ramas principales que representen los pilares fundamentales (máximo 4 a 6 ramas).',
      'Añade sub-ramas con detalles concretos, datos o ejemplos usando palabras clave cortas.',
      'Usa colores distintos por rama y añade iconos o símbolos visuales para anclar la memoria.'
    ],
    example: {
      topic: 'El Ciclo del Agua',
      central: 'Ciclo Hidrológico',
      branches: [
        { title: 'Evaporación', details: ['Calor solar', 'Agua líquida a vapor', 'Océanos y ríos'] },
        { title: 'Condensación', details: ['Enfriamiento en altura', 'Formación de nubes', 'Microgotas'] },
        { title: 'Precipitación', details: ['Lluvia, nieve o granizo', 'Gravedad actúa', 'Retorno a tierra'] },
        { title: 'Infiltración', details: ['Absorción por el suelo', 'Acuíferos subterráneos', 'Nutrición vegetal'] }
      ]
    },
    templateType: 'mindmap',
    tips: 'No escribas párrafos largos en los nodos; utiliza palabras detonantes (palabras que al leerlas activen todo el concepto en tu mente).'
  },
  {
    id: 'mapas-conceptuales',
    category: 'visual',
    categoryName: 'Visuales y Creativos',
    title: 'Mapas Conceptuales',
    tagline: 'Jerarquías estrictas unidas por palabras enlace con significado.',
    difficulty: 'Media',
    timeNeeded: '20 - 40 min',
    bestFor: 'Comprender relaciones de causa-efecto, clasificaciones científicas y jerarquías.',
    description: 'A diferencia de los mapas mentales, los mapas conceptuales van de arriba hacia abajo (de lo más general a lo específico) y conectan conceptos mediante verbos o palabras de enlace (ej: "produce", "compuesto por", "regulado por").',
    steps: [
      'Identifica el concepto más general y sitúalo en la cúspide superior.',
      'Desglosa los conceptos intermedios en el siguiente nivel.',
      'Escribe frases de enlace sobre las flechas (ej: "da origen a", "requiere de").',
      'Crea enlaces cruzados entre ramas diferentes para evidenciar conexiones profundas.'
    ],
    example: {
      topic: 'Sistema Circulatorio',
      nodes: [
        { from: 'Sistema Circulatorio', link: 'está compuesto por', to: 'Corazón, Sangre y Vasos' },
        { from: 'Corazón', link: 'bombea hacia', to: 'Arterias' },
        { from: 'Sangre', link: 'transporta', to: 'Oxígeno y Nutrientes' },
        { from: 'Vasos', link: 'se dividen en', to: 'Arterias, Venas y Capilares' }
      ]
    },
    templateType: 'conceptmap',
    tips: 'Si una línea no tiene palabra de enlace, la relación queda ambigua. El valor del mapa conceptual radica en obligarte a definir el verbo que las une.'
  },
  {
    id: 'cuadros-sinopticos',
    category: 'visual',
    categoryName: 'Visuales y Creativos',
    title: 'Cuadros Sinópticos',
    tagline: 'Estructuración horizontal mediante llaves y niveles.',
    difficulty: 'Fácil',
    timeNeeded: '15 - 25 min',
    bestFor: 'Taxonomías, clasificaciones gramaticales, géneros literarios y ordenamiento legal.',
    description: 'Organiza la información de izquierda a derecha abriendo llaves {...} que agrupan categorías, subcategorías y ejemplos concretos de forma limpia y geométrica.',
    steps: [
      'Escribe la idea general en el extremo izquierdo.',
      'Abre una llave grande para contener las ideas principales.',
      'Abre llaves secundarias para cada una de las ideas principales.',
      'Termina en el extremo derecho con detalles, fórmulas o ejemplos puntuales.'
    ],
    example: {
      topic: 'Tipos de Rocas',
      tree: {
        root: 'Rocas de la Tierra',
        branches: [
          { name: 'Ígneas', items: ['Plutónicas (Granito)', 'Volcánicas (Basalto)'] },
          { name: 'Sedimentarias', items: ['Dentríticas (Arenisca)', 'Químicas (Caliza)'] },
          { name: 'Metamórficas', items: ['Foliadas (Pizarra)', 'No foliadas (Mármol)'] }
        ]
      }
    },
    templateType: 'synoptic',
    tips: 'Ideal para repasar justo antes de un examen porque permite escanear de un vistazo todas las clasificaciones posibles.'
  },
  {
    id: 'infografias-educativas',
    category: 'visual',
    categoryName: 'Visuales y Creativos',
    title: 'Infografías Educativas',
    tagline: 'Sintetiza datos complejos con tarjetas visuales, cifras e iconos.',
    difficulty: 'Media',
    timeNeeded: '25 - 45 min',
    bestFor: 'Procesos de varios pasos, comparaciones históricas o resúmenes de impacto.',
    description: 'Transforma una lección densa en un poster estructurado con 3 o 4 secciones visuales: estadísticas destacadas, tarjetas de resumen y llamadas de atención.',
    steps: [
      'Selecciona los 3 o 4 puntos más trascendentales del tema.',
      'Asigna un dato numérico o una palabra clave a cada punto.',
      'Acompaña cada bloque con un icono o analogía visual.',
      'Añade un cuadro de conclusión práctica al final.'
    ],
    example: {
      topic: 'Energías Renovables',
      cards: [
        { stat: 'Solar', desc: 'Fotones a electricidad mediante celdas fotovoltaicas.', tag: 'Inagotable' },
        { stat: 'Eólica', desc: 'Energía cinética del viento mueve aerogeneradores.', tag: 'Bajo impacto' },
        { stat: 'Hidroeléctrica', desc: 'Potencial de caída de agua transforma turbinas.', tag: 'Alta potencia' }
      ]
    },
    templateType: 'infographic',
    tips: 'Menos texto es más comprensión: intenta que el 60% del espacio sea aire visual o icono, y solo el 40% texto.'
  },
  {
    id: 'lineas-de-tiempo',
    category: 'visual',
    categoryName: 'Visuales y Creativos',
    title: 'Líneas de Tiempo',
    tagline: 'Secuencia cronológica de causas, sucesos y consecuencias.',
    difficulty: 'Fácil',
    timeNeeded: '15 - 30 min',
    bestFor: 'Historia, biografías, evolución de teorías científicas y literatura.',
    description: 'Ordena los hitos temporalmente para entender no solo "qué pasó cuándo", sino cómo un evento condujo inexorablemente al siguiente.',
    steps: [
      'Define el rango temporal (fecha de inicio y fecha de cierre).',
      'Elige los 5 a 8 eventos decisivos (descarta los secundarios para no saturar).',
      'Para cada evento, anota: Fecha + Hecho clave + Consecuencia inmediata.',
      'Conecta con flechas causa-efecto entre los hitos.'
    ],
    example: {
      topic: 'Revolución Francesa (Hitos iniciales)',
      events: [
        { date: 'Mayo 1789', title: 'Estados Generales', desc: 'Convocatoria del rey ante la crisis financiera.' },
        { date: 'Julio 1789', title: 'Toma de la Bastilla', desc: 'Insurrección popular símbolo del fin del absolutismo.' },
        { date: 'Agosto 1789', title: 'Declaración de Derechos', desc: 'Libertad, igualdad y fraternidad consagradas.' },
        { date: '1791', title: 'Primera Constitución', desc: 'Francia pasa a ser una monarquía constitucional.' }
      ]
    },
    templateType: 'timeline',
    tips: 'Añade una pequeña etiqueta que clasifique cada hito (ej: [Político], [Económico], [Bélico]). Te ayudará a responder preguntas complejas en exámenes.'
  },
  {
    id: 'diagramas-flujo',
    category: 'visual',
    categoryName: 'Visuales y Creativos',
    title: 'Diagramas de Flujo',
    tagline: 'Algoritmos paso a paso con toma de decisiones.',
    difficulty: 'Media',
    timeNeeded: '20 - 35 min',
    bestFor: 'Resolución de problemas matemáticos, protocolos médicos, gramática y programación.',
    description: 'Estructura un proceso mediante cajas de acción y rombos de decisión (¿Ocurre X? Sí -> Paso A; No -> Paso B) garantizando que siempre sepas qué hacer frente a un ejercicio.',
    steps: [
      'Identifica el punto de partida (ej: "Tienes una ecuación cuadrática").',
      'Formula la primera pregunta de verificación o bifurcación (ej: "¿Falta el término independiente?").',
      'Dibuja dos caminos: [SÍ] factor común; [NO] aplicar fórmula general.',
      'Concluye en el resultado final o solución comprobada.'
    ],
    example: {
      topic: 'Diagnóstico de una Ecuación Cuadrática',
      flow: [
        'Inicio: ax² + bx + c = 0',
        '¿b = 0? -> SÍ: Despejar x = ±√(-c/a) | NO: Siguiente paso',
        '¿c = 0? -> SÍ: Factorizar x(ax + b) = 0 | NO: Siguiente paso',
        'Calcular discriminante D = b² - 4ac -> Determinar nº de raíces reales'
      ]
    },
    templateType: 'flowchart',
    tips: 'Excelente para personas que se bloquean ante problemas matemáticos o de física. Te da una receta a prueba de dudas.'
  },
  {
    id: 'esquemas-colores',
    category: 'visual',
    categoryName: 'Visuales y Creativos',
    title: 'Esquemas con Código de Colores',
    tagline: 'Neuroarquitectura cromática para apuntes limpios.',
    difficulty: 'Fácil',
    timeNeeded: '10 - 20 min',
    bestFor: 'Textos teóricos extensos, leyes, artículos y notas de clase.',
    description: 'Asigna un rol cognitivo estricto a 4 colores específicos para que tu ojo sepa exactamente qué jerarquía tiene cada palabra sin necesidad de releer.',
    steps: [
      'Azul / Cian: Títulos, conceptos primarios y definiciones centrales.',
      'Violeta / Morado: Ideas secundarias y explicaciones de soporte.',
      'Verde / Lima: Ejemplos prácticos, analogías cotidianas y casos reales.',
      'Ámbar / Naranja: Fechas clave, nombres propios, advertencias y dudas pendientes.'
    ],
    example: {
      topic: 'Código Cromático Mindu',
      palette: [
        { color: '#3B82F6', label: 'Azul Eléctrico', role: 'Concepto madre / Tesis' },
        { color: '#8B5CF6', label: 'Violeta', role: 'Argumentación / Por qué ocurre' },
        { color: '#10B981', label: 'Verde Esmeralda', role: 'Ejemplo del mundo real' },
        { color: '#F59E0B', label: 'Ámbar', role: 'Alerta de examen / Excepción a la regla' }
      ]
    },
    templateType: 'colorcoding',
    tips: 'No uses más de 4 colores. Usar 8 rotuladores convierte el apunte en un arcoíris caótico que fatiga el cerebro en vez de ordenarlo.'
  },
  {
    id: 'fichas-visuales',
    category: 'visual',
    categoryName: 'Visuales y Creativos',
    title: 'Fichas Visuales (Sketchnotes)',
    tagline: 'Micro-tarjetas con icono, concepto clave y fórmula.',
    difficulty: 'Media',
    timeNeeded: '15 - 25 min',
    bestFor: 'Vocabulario, anatomía, fórmulas de física y conceptos abstractos.',
    description: 'Combina un dibujo simplificado con una definición ultra condensada. El dibujo no tiene que ser una obra de arte; simples palotes o diagramas geométricos activan el doble canal de codificación (dual-coding theory).',
    steps: [
      'Toma una tarjeta cuadrada o rectangular pequeña.',
      'En la mitad superior dibuja un icono o metáfora del concepto.',
      'En la mitad inferior anota la definición en una sola frase potente.',
      'Añade un ejemplo ultra concreto en la esquina.'
    ],
    example: {
      topic: 'Mitocondria',
      visual: '⚡ [Dibujo de cápsula con crestas interiores]',
      definition: 'La central eléctrica de la célula: sintetiza ATP mediante respiración celular.',
      mnemonic: 'Mito = Motor de energía'
    },
    templateType: 'visualcard',
    tips: 'El cerebro recuerda 6 veces mejor una combinación de palabra + imagen simple que solo la palabra aislada.'
  },

  // ==========================================
  // CATEGORÍA B: LECTURA Y ESCRITURA
  // ==========================================
  {
    id: 'metodo-cornell',
    category: 'reading',
    categoryName: 'Lectura y Escritura',
    title: 'Método Cornell',
    tagline: 'El estándar de oro para tomar apuntes y autoevaluarse.',
    difficulty: 'Fácil',
    timeNeeded: 'Durante la clase o lectura',
    bestFor: 'Clases teóricas, conferencias, lectura de capítulos de libros y preparación de exámenes.',
    description: 'Divide la página en 3 zonas: una columna ancha para notas de clase, una columna lateral izquierda para preguntas detonantes / palabras clave, y un pie inferior para un resumen de 2 frases.',
    steps: [
      'Zona Derecha (Notas): Anota ideas principales durante la clase usando abreviaturas.',
      'Zona Izquierda (Indicios): Tras la clase, escribe preguntas que se respondan con esas notas.',
      'Tapa la zona derecha e intenta responder las preguntas de la izquierda de memoria.',
      'Zona Inferior (Resumen): Escribe un resumen de 2-3 líneas con la idea fundamental.'
    ],
    example: {
      topic: 'La Fotosíntesis',
      notes: 'Proceso anabólico en cloroplastos. Clorofila absorbe luz solar. Transforma CO2 y H2O en Glucosa + O2 libre. Consta de fase luminosa (tilacoides) y fase oscura o Ciclo de Calvin (estroma).',
      cues: ['¿Dónde ocurre?', '¿Qué insumos requiere?', '¿Qué dos fases la componen?', '¿Cuál es el desecho beneficioso?'],
      summary: 'La fotosíntesis permite a las plantas convertir luz, agua y CO2 en energía química (glucosa) liberando oxígeno, dividida en fase luminosa y ciclo de Calvin.'
    },
    templateType: 'cornell',
    tips: 'La clave mágica está en la columna de indicios: convierte tus apuntes en un simulador de examen automático.'
  },
  {
    id: 'tecnica-feynman',
    category: 'reading',
    categoryName: 'Lectura y Escritura',
    title: 'Técnica Feynman',
    tagline: 'Si no puedes explicárselo a un niño de 10 años, no lo has entendido.',
    difficulty: 'Media',
    timeNeeded: '15 - 30 min',
    bestFor: 'Conceptos difíciles, física, economía, filosofía y algoritmos.',
    description: 'Popularizada por el premio Nobel Richard Feynman. Consiste en explicar el tema con el vocabulario más sencillo posible, sin tecnicismos pretenciosos, para destapar lagunas de comprensión.',
    steps: [
      'Paso 1: Escribe el nombre del concepto en la parte superior de una hoja en blanco.',
      'Paso 2: Explícalo con tus propias palabras como si se lo contaras a un amigo que nunca lo ha visto.',
      'Paso 3: Identifica los momentos en que te trabas o tienes que recurrir a jerga técnica.',
      'Paso 4: Vuelve a la fuente original, aclara la laguna y reformula con una analogía cotidiana.'
    ],
    example: {
      topic: 'La Gravedad según Einstein',
      simpleExplanation: 'Imagina una cama elástica estirada. Si dejas caer una bola pesada de boliche en el medio, la tela se hunde. Si lanzas una canica pequeña alrededor, no es atraída por un "imán invisible", sino que simplemente rueda por la curva que la bola pesada creó en la tela. Eso hace la masa con el espacio.',
      analogy: 'Cama elástica elástica y bola de boliche = curvatura del espacio-tiempo.'
    },
    templateType: 'feynman',
    tips: 'Regla de oro: Si usas una palabra técnica que no sabrías definir en un segundo, táchala y usa una metáfora cotidiana.'
  },
  {
    id: 'resumenes-efectivos',
    category: 'reading',
    categoryName: 'Lectura y Escritura',
    title: 'Resúmenes Efectivos (3 Pasadas)',
    tagline: 'Sintetiza sin transcribir ni copiar párrafos del libro.',
    difficulty: 'Fácil',
    timeNeeded: '20 - 40 min',
    bestFor: 'Temarios densos, manuales universitarios y humanidades.',
    description: 'El peor error es resumir leyendo con el bolígrafo en la mano. El método de 3 pasadas obliga a procesar antes de escribir una sola línea.',
    steps: [
      'Pasada 1 (Exploración): Lee el texto completo sin subrayar ni escribir nada, entendiendo el panorama general.',
      'Pasada 2 (Extracción): Identifica solo la frase tesis de cada párrafo.',
      'Cierra el libro o apaga la pantalla.',
      'Pasada 3 (Redacción activa): Escribe el resumen de memoria y solo abre el libro para comprobar cifras o nombres exactos.'
    ],
    example: {
      topic: 'La Revolución Industrial',
      badSummary: 'La revolución industrial fue un proceso que empezó en el siglo XVIII donde hubo muchas máquinas como la de vapor creada por Watt y la gente fue del campo a la ciudad...',
      effectiveSummary: 'Transformación del trabajo manual en mecanizado (Reino Unido, s. XVIII). Motor: máquina de vapor y carbón. Consecuencias: migración masiva a las ciudades (urbanización), nacimiento de la clase obrera y aumento exponencial de la producción global.'
    },
    templateType: 'summary',
    tips: 'Un buen resumen debe tener como máximo el 20% al 25% de la longitud del texto original.'
  },
  {
    id: 'metodo-preguntas-respuestas',
    category: 'reading',
    categoryName: 'Lectura y Escritura',
    title: 'Interrogación Elaborativa (Q&A)',
    tagline: 'Transforma afirmaciones pasivas en preguntas activas de "¿Por qué?".',
    difficulty: 'Media',
    timeNeeded: '15 - 30 min',
    bestFor: 'Comprender causas profundas, medicina, derecho e historia.',
    description: 'En lugar de memorizar "El evento X ocurrió en el año Y", te preguntas constantemente "¿Por qué tiene sentido que ocurriera X?" y "¿Qué consecuencias causó?".',
    steps: [
      'Toma una afirmación de tu temario.',
      'Formula una pregunta que comience por "¿Por qué ocurre esto?", "¿Cómo se relaciona con...?" o "¿Qué pasaría si no existiera?".',
      'Escribe una respuesta argumentada fundamentándote en la lógica del sistema.',
      'Comprueba si tu respuesta resiste una segunda repregunta.'
    ],
    example: {
      topic: 'Respiración Celular Anaeróbica',
      assertion: 'En ausencia de oxígeno, los músculos producen ácido láctico.',
      question: '¿Por qué la célula recurre al ácido láctico en vez de detenerse por completo?',
      answer: 'Porque necesita reciclar urgentemente el NAD+ para que la glucólisis siga generando los 2 ATP mínimos de supervivencia rápida, aunque sea a costa de acumular lactato.'
    },
    templateType: 'qa',
    tips: 'Investigaciones de neurociencia demuestran que preguntarse el "por qué" duplica la retención frente a la lectura pasiva.'
  },
  {
    id: 'lectura-activa-sq3r',
    category: 'reading',
    categoryName: 'Lectura y Escritura',
    title: 'Lectura Activa (SQ3R)',
    tagline: 'Inspeccionar, Preguntar, Leer, Recitar y Repasar.',
    difficulty: 'Media',
    timeNeeded: '30 - 60 min',
    bestFor: 'Capítulos enteros de libros de texto y artículos científicos.',
    description: 'Estructura sistemática que evita el "leer en piloto automático" donde llegas al final de la página sin recordar lo que acabas de leer.',
    steps: [
      'Survey (Inspeccionar): Revisa títulos, subtítulos, gráficos y negritas durante 2 minutos.',
      'Question (Preguntar): Convierte los subtítulos en preguntas que esperas responder.',
      'Read (Leer): Lee con el objetivo explícito de responder a esas preguntas.',
      'Recite (Recitar): Al terminar cada sección, aparta la mirada y responde en voz alta.',
      'Review (Repasar): Al final del capítulo, revisa tus preguntas y pon a prueba tus respuestas.'
    ],
    example: {
      topic: 'Capítulo sobre Genética Mendeliana',
      surveyNotes: 'Títulos vistos: Leyes de Mendel, Cuadro de Punnett, Herencia ligada al sexo.',
      questionFormulated: '¿En qué se diferencia la 1ª ley de Mendel (segregación) de la 2ª (transmisión independiente)?',
      recitedAnswer: 'La 1ª habla de alelos del mismo gen; la 2ª de genes situados en cromosomas distintos.'
    },
    templateType: 'sq3r',
    tips: 'No empieces a leer el primer párrafo sin haber ojeado primero las conclusiones y el índice del capítulo.'
  },
  {
    id: 'subrayado-estrategico',
    category: 'reading',
    categoryName: 'Lectura y Escritura',
    title: 'Subrayado Estratégico',
    tagline: 'Subraya solo lo que usarías para reconstruir el texto.',
    difficulty: 'Fácil',
    timeNeeded: '15 - 25 min',
    bestFor: 'Artículos, fotocopias y preparación de esquemas posteriores.',
    description: 'El subrayado excesivo (pintar la página de amarillo fluorescente) da una falsa sensación de maestría pero desactiva el procesamiento crítico.',
    steps: [
      'Regla inflexible: Nunca subrayes en la primera lectura.',
      'En la segunda lectura, subraya como máximo 1 o 2 líneas por párrafo.',
      'Subraya solo sustantivos y verbos nucleares; omite conectores obvios.',
      'Añade anotaciones marginales con signos (ej: [?] para duda, [!] para examen, [*] para clave).'
    ],
    example: {
      topic: 'El Método Científico',
      sampleText: 'El método científico es un conjunto ordenado de procedimientos sistemáticos mediante los cuales los investigadores construyen conocimiento empírico comprobable.',
      underlined: 'conjunto ordenado procedimientos sistemáticos conocimiento empírico comprobable'
    },
    templateType: 'highlight',
    tips: 'Prueba la prueba del telegrama: Si lees solo lo subrayado en voz alta, ¿se entiende el mensaje telegráfico?'
  },

  // ==========================================
  // CATEGORÍA C: MÉTODOS AUDITIVOS Y AUDIOVISUALES
  // ==========================================
  {
    id: 'podcasts-educativos',
    category: 'audio',
    categoryName: 'Auditivos y Audiovisuales',
    title: 'Podcasts Educativos y Guiones',
    tagline: 'Transforma lecciones teóricas en episodios de audio dinámicos.',
    difficulty: 'Fácil',
    timeNeeded: '15 - 30 min',
    bestFor: 'Estudiar mientras caminas, viajas en transporte o descansas la vista.',
    description: 'Convierte apuntes densos en un diálogo fluido entre dos locutores o en un monólogo apasionado, y reprodúcelo con voz sintética o grábate a ti mismo.',
    steps: [
      'Define el gancho inicial: una pregunta intrigante o curiosidad.',
      'Desarrolla el nudo en 3 actos explicativos con analogías auditivas.',
      'Cierra con un "takeaway" o conclusión inolvidable de 30 segundos.',
      'Escúchalo a 1.25x mientras realizas tareas mecánicas o paseas.'
    ],
    example: {
      topic: 'La Teoría de la Relatividad Especial',
      script: `[LOCUTOR 1]: ¿Alguna vez te has preguntado qué pasaría si viajas en un tren a la velocidad de la luz y enciendes una linterna hacia adelante?
[LOCUTOR 2]: ¡Parece una paradoja! Tu instinto dice que la luz iría al doble de velocidad, pero Einstein descubrió que la velocidad de la luz nunca cambia: ¡es el tiempo el que se frena para ti!
[LOCUTOR 1]: Exacto. Para alguien que te mira desde el andén, tu reloj avanza en cámara lenta. Bienvenido a la dilatación temporal.`
    },
    templateType: 'podcast',
    tips: 'Usa frases cortas y tono coloquial. Lo que suena bien leído en silencio no siempre suena bien hablado en voz alta.'
  },
  {
    id: 'grabacion-propia',
    category: 'audio',
    categoryName: 'Auditivos y Audiovisuales',
    title: 'Grabaciones de Explicaciones Propias',
    tagline: 'Grábate con el micrófono, escúchate y corrige tus vacilaciones.',
    difficulty: 'Fácil',
    timeNeeded: '5 - 15 min',
    bestFor: 'Exposiciones orales, defensas de tesis, idiomas y fijar argumentos.',
    description: 'El acto de vocalizar una explicación sin mirar la pantalla activa zonas motrices y auditivas del cerebro que la simple lectura deja inactivas.',
    steps: [
      'Elige un concepto y ponte un temporizador de 2 minutos.',
      'Pulsa grabar y explícalo de corrido sin detenerte ante errores.',
      'Reproduce tu grabación con el texto oficial delante.',
      'Anota qué conceptos omitiste o en qué puntos utilizaste muletillas de duda.'
    ],
    example: {
      topic: 'Explicación del Proceso de Selección Natural',
      targetKeywords: ['Variabilidad genética', 'Presión ambiental', 'Reproducción diferencial', 'Herencia adaptativa'],
      evaluationChecklist: ['¿Mencioné que la mutación es aleatoria pero la selección no?', '¿Evité decir que el animal "quiere" cambiar?']
    },
    templateType: 'audiorecorder',
    tips: 'La primera vez que te escuchas suele dar vergüenza. Es completamente normal. Recuerda que no buscas perfección de locutor, sino claridad conceptual.'
  },
  {
    id: 'lectura-en-voz-alta',
    category: 'audio',
    categoryName: 'Auditivos y Audiovisuales',
    title: 'Lectura en Voz Alta con Ritmo',
    tagline: 'Focaliza la atención mediante la entonación y pausas dramáticas.',
    difficulty: 'Fácil',
    timeNeeded: '10 - 20 min',
    bestFor: 'Textos poéticos, leyes, discursos históricos y cuando la mente divaga.',
    description: 'Cuando la vista se cansa y lees sin entender, leer en voz alta obliga a tu aparato fonador a articular cada fonema, frenando el ritmo de lectura y forzando la atención.',
    steps: [
      'Adopta una postura erguida para facilitar la respiración.',
      'Lee pausadamente enfatizando las palabras clave con mayor volumen.',
      'Haz pausas deliberadas de 2 segundos en cada punto y coma.',
      'Parafrasea la frase al terminar el párrafo con tu propia entonación.'
    ],
    example: {
      topic: 'Artículo Constitucional',
      sample: 'Todos los ciudadanos tienen derecho a la educación (pausa). Los poderes públicos garantizan el ejercicio de este derecho mediante una programación general (énfasis).'
    },
    templateType: 'readaloud',
    tips: 'Ideal para momentos de somnolencia después de comer: ponerte de pie y leer en voz alta disipa el sueño de inmediato.'
  },
  {
    id: 'dialogo-socratico',
    category: 'audio',
    categoryName: 'Auditivos y Audiovisuales',
    title: 'Conversación Simulada Profesor-Estudiante',
    tagline: 'Un diálogo socrático que te desafía con repreguntas.',
    difficulty: 'Media',
    timeNeeded: '15 - 25 min',
    bestFor: 'Filosofía, debates éticos, derecho y ciencias sociales.',
    description: 'Escribe o simula una conversación donde un estudiante curioso pregunta y un mentor paciente responde mediante preguntas reflexivas.',
    steps: [
      'Establece la duda del estudiante (ej: "¿Por qué no podemos imprimir más dinero para acabar con la pobreza?").',
      'Formula la respuesta del profesor señalando la consecuencia no intuitiva (ej: "¿Qué pasa si hay 100 manzanas y todo el mundo tiene 1 millón de euros?").',
      'Desarrolla el debate hasta que la verdad surja de la deducción lógica.'
    ],
    example: {
      topic: 'La Paradoja de la Inflación',
      dialogue: [
        { role: 'Estudiante', text: 'Si el Estado emite la moneda, ¿por qué no imprime millones para cada familia?' },
        { role: 'Profesor', text: 'Imagina que en una isla solo hay 10 sacos de arroz y 10 monedas. Cada saco vale 1 moneda. Si de repente imprimimos 100 monedas pero sigue habiendo solo 10 sacos, ¿cuánto cobrará el dueño del arroz por cada saco?' },
        { role: 'Estudiante', text: 'Cobrará 10 monedas por saco... ¡así que el arroz no aumentó, solo el precio!' },
        { role: 'Profesor', text: 'Exacto. El dinero no es riqueza en sí, sino un vale de intercambio sobre los bienes que realmente existen.' }
      ]
    },
    templateType: 'socratic',
    tips: 'Ver el conocimiento como una conversación humana elimina la frialdad de los manuales teóricos.'
  },

  // ==========================================
  // CATEGORÍA D: MEMORIZAR Y COMPRENDER
  // ==========================================
  {
    id: 'recuperacion-activa',
    category: 'memory',
    categoryName: 'Memorizar y Comprender',
    title: 'Recuperación Activa (Active Recall)',
    tagline: 'El esfuerzo mental de recordar es lo que crea conexiones neuronales.',
    difficulty: 'Media',
    timeNeeded: '15 - 30 min',
    bestFor: 'Cualquier materia con exámenes de desarrollo, test o resolución de problemas.',
    description: 'Releer es una ilusión de competencia: tu cerebro reconoce la información y cree que la sabe. La recuperación activa consiste en cerrar el libro y forzarte a extraer los datos de tu memoria.',
    steps: [
      'Estudia un bloque breve durante 10 minutos.',
      'Cierra completamente el material y aparta apuntes.',
      'En una hoja en blanco (Brain Dump), anota TODO lo que recuerdes sin mirar.',
      'Abre el material y con un bolígrafo rojo marca lo que olvidaste o confundiste.',
      'Ese contenido en rojo es exactamente en lo que debes enfocarte en tu siguiente sesión.'
    ],
    example: {
      topic: 'Componentes de la Sangre',
      retrieved: ['Glóbulos rojos (transportan oxígeno)', 'Plaquetas (coagulación)', 'Glóbulos blancos (defensa inmune)'],
      missed: ['Plasma sanguíneo (55% del volumen, agua, sales, proteínas) -> [Identificado como laguna y reforzado]']
    },
    templateType: 'activerecall',
    tips: 'Sentir que "cuesta trabajo recordar" no es síntoma de mala memoria: es la señal biológica de que la memoria se está consolidando.'
  },
  {
    id: 'repeticion-espaciada',
    category: 'memory',
    categoryName: 'Memorizar y Comprender',
    title: 'Repetición Espaciada (Spaced Repetition)',
    tagline: 'Repasa justo en el momento en que estás a punto de olvidar.',
    difficulty: 'Media',
    timeNeeded: '10 - 20 min al día',
    bestFor: 'Vocabulario de idiomas, medicina, fórmulas, fechas y definiciones clave.',
    description: 'Basado en la Curva del Olvido de Hermann Ebbinghaus. Si repasas a intervalos crecientes (Día 1, Día 3, Día 7, Día 16, Día 35), la curva se aplana y la memoria pasa al largo plazo.',
    steps: [
      'Crea un lote de preguntas o flashcards.',
      'Repaso 0: Inmediato al aprender.',
      'Repaso 1: A las 24 horas (Día 1).',
      'Repaso 2: A los 3 días (Día 4).',
      'Repaso 3: A la semana siguiente (Día 11).',
      'Repaso 4: Al mes (Día 35).'
    ],
    example: {
      topic: 'Calendario de Repaso Óptimo Leitner',
      boxes: [
        { box: 'Caja 1 (Diario)', items: 'Tarjetas nuevas o falladas ayer' },
        { box: 'Caja 2 (Cada 3 días)', items: 'Tarjetas acertadas 1 vez' },
        { box: 'Caja 3 (Semanal)', items: 'Tarjetas acertadas 2 veces consecutivas' },
        { box: 'Caja 4 (Mensual)', items: 'Memoria consolidada' }
      ]
    },
    templateType: 'spacedrep',
    tips: 'Dedica 10 minutos diarios constantes antes que maratones de 8 horas la noche previa al examen.'
  },
  {
    id: 'flashcards-interactivas',
    category: 'memory',
    categoryName: 'Memorizar y Comprender',
    title: 'Flashcards (Tarjetas de Memoria)',
    tagline: 'Pregunta en el anverso, respuesta concisa en el reverso.',
    difficulty: 'Fácil',
    timeNeeded: '10 - 25 min',
    bestFor: 'Terminología, idiomas, capitales, elementos químicos y fórmulas.',
    description: 'Tarjetas de doble cara donde intentas responder la pregunta antes de voltear la tarjeta para calificar tu nivel de dominio (Fácil, Medio o Difícil).',
    steps: [
      'Crea preguntas atómicas: una sola pregunta por tarjeta, nunca una lista de 10 cosas.',
      'Lee la pregunta e intenta responder en voz alta o escribirla mentalmente.',
      'Voltea la tarjeta para comprobar.',
      'Si fallaste, colócala de nuevo al principio del mazo para que vuelva a salir en 2 minutos.'
    ],
    example: {
      topic: 'Química Orgánica',
      front: '¿Cuál es el grupo funcional de los Aldehídos y en qué posición se ubica?',
      back: 'Grupo carbonilo (-C=O) situado siempre en el extremo terminal de la cadena de carbono.',
      rating: 'Fácil / Medio / Difícil'
    },
    templateType: 'flashcards',
    tips: 'No pongas más de 1 dato por tarjeta. Si una tarjeta tiene 4 respuestas, fallarás una y dudarás de si la sabías o no.'
  },
  {
    id: 'cuestionarios-practica',
    category: 'memory',
    categoryName: 'Memorizar y Comprender',
    title: 'Cuestionarios de Práctica Explicados',
    tagline: 'Simula el entorno del examen con retroalimentación inmediata.',
    difficulty: 'Media',
    timeNeeded: '15 - 30 min',
    bestFor: 'Exámenes tipo test, selectividad, oposiciones y certificación.',
    description: 'Responder preguntas con opciones múltiples o respuestas cortas donde cada opción incorrecta tiene una explicación del por qué es una trampa o error común.',
    steps: [
      'Responde sin consultar libros ni notas.',
      'Revisa la solución argumentada inmediatamente después.',
      'Lee la explicación de por qué las otras opciones no eran correctas.',
      'Lleva un registro de los fallos por categoría.'
    ],
    example: {
      question: '¿Cuál es la función principal de los ribosomas en la célula?',
      options: [
        'A) Sintetizar ATP',
        'B) Fabricar proteínas a partir de ARNm',
        'C) Digerir residuos celulares',
        'D) Almacenar material genético'
      ],
      correct: 1,
      explanation: 'Los ribosomas ensamblan aminoácidos siguiendo las instrucciones del ARN mensajero. La opción A corresponde a la mitocondria, la C al lisosoma y la D al núcleo.'
    },
    templateType: 'quiz',
    tips: 'Hacer exámenes de años anteriores es el predictor estadístico número 1 del rendimiento académico.'
  },
  {
    id: 'mnemotecnias-asociaciones',
    category: 'memory',
    categoryName: 'Memorizar y Comprender',
    title: 'Mnemotecnias e Historias Inverosímiles',
    tagline: 'Ancla datos abstractos a imágenes absurdas e inolvidables.',
    difficulty: 'Fácil',
    timeNeeded: '10 - 20 min',
    bestFor: 'Listas ordenadas, taxonomía biológica, números y excepciones gramaticales.',
    description: 'El cerebro humano no evolucionó para recordar números o listas abstractas, sino historias vívidas, espaciales y con carga emocional o humorística.',
    steps: [
      'Toma la primera letra de cada elemento que necesitas memorizar.',
      'Forma una palabra o frase disparatada usando esas iniciales.',
      'Visualiza mentalmente la escena con colores brillantes o acción exagerada.',
      'Verifica que puedas reconstruir la lista original a partir del acrónimo.'
    ],
    example: {
      topic: 'Fases de la Mitosis (Profase, Metafase, Anafase, Telofase)',
      acronym: 'PROMETE a ANA TEJER (PRO-MET-ANA-TEL)',
      visualStory: 'Un caballero le PROMETE a su novia ANA TEJERle una bufanda mientras las células se dividen.'
    },
    templateType: 'mnemonic',
    tips: 'Cuanto más ridícula, graciosa o extraña sea la imagen mental, más rápido se grabará en tu memoria.'
  },
  {
    id: 'practica-intercalada',
    category: 'memory',
    categoryName: 'Memorizar y Comprender',
    title: 'Práctica Intercalada (Interleaving)',
    tagline: 'Alterna diferentes tipos de problemas en una misma sesión.',
    difficulty: 'Difícil',
    timeNeeded: '30 - 50 min',
    bestFor: 'Matemáticas, física, sintaxis y resolución de casos clínicos.',
    description: 'En vez de hacer 20 ejercicios iguales del Tema 1 (práctica en bloque), mezcla ejercicios del Tema 1, 2 y 3. Esto entrena al cerebro para identificar qué fórmula o método aplicar en cada caso.',
    steps: [
      'Selecciona 2 o 3 temas relacionados que suelas confundir.',
      'Toma 2 ejercicios de cada tema y barájalos aleatoriamente.',
      'En cada ejercicio, dedica el primer minuto a diagnosticar: "¿De qué tipo es este problema?" antes de calcular.',
      'Resuelve y compara las diferencias entre las estrategias elegidas.'
    ],
    example: {
      topic: 'Cálculo de Áreas y Volúmenes',
      sequence: ['Problema de Cono (Volumen)', 'Problema de Trapecio (Área)', 'Problema de Cilindro (Superficie lateral)', 'Problema de Esfera (Volumen)'],
      cognitiveSkill: 'Discriminar qué fórmula usar sin que el encabezado del capítulo te dé la pista.'
    },
    templateType: 'interleaving',
    tips: 'Al principio se siente más difícil y cometerás más errores, pero la retención real a largo plazo es hasta un 43% superior a la práctica en bloque.'
  },

  // ==========================================
  // CATEGORÍA E: ESTUDIA A TU RITMO (CONCENTRACIÓN / TDAH-FRIENDLY)
  // ==========================================
  {
    id: 'pomodoro-flexible',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Pomodoro Flexible',
    tagline: 'Temporizadores adaptados a tu capacidad de atención real.',
    difficulty: 'Fácil',
    timeNeeded: '10 a 25 min ajustables',
    bestFor: 'Días con fatiga, dificultad para mantener el foco o tareas que provocan resistencia.',
    description: 'El Pomodoro clásico de 25 minutos no siempre se ajusta a todos los cerebros. Si tu concentración se rompe a los 12 minutos, fuerza sesiones de 10 o 15 minutos con descansos de 3 o 5 minutos.',
    steps: [
      'Elige tu intervalo de confort para hoy: 10 min, 15 min, 20 min o 25 min.',
      'Define UNA sola micro-tarea que completarás en ese lapso.',
      'Inicia el temporizador. Si tu mente divaga, anota la distracción en un bloc de notas y regresa suavemente.',
      'Suena la campana: levántate y aléjate de la pantalla durante el descanso.'
    ],
    example: {
      mode: 'Micro-Pomodoro de 15 min',
      work: '15 min de lectura de 2 páginas',
      break: '3 min de estiramiento y beber agua'
    },
    templateType: 'flexiblepomodoro',
    tips: 'No prolongues la sesión de trabajo aunque sientas que vas con buen ritmo. Respetar el descanso evita el agotamiento cerebral 2 horas más tarde.'
  },
  {
    id: 'microestudio',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Microestudio (Píldoras de 3 a 5 min)',
    tagline: 'Vence la montaña dividiéndola en granos de arena.',
    difficulty: 'Fácil',
    timeNeeded: '3 - 5 min',
    bestFor: 'Procrastinación severa, días abrumadores y falta total de motivación.',
    description: 'Cuando una tarea parece tan gigantesca que ni siquiera puedes abrir el libro, comprométete solo con una acción de 3 minutos. Reducir el umbral de entrada anula la respuesta de amenaza en la amígdala.',
    steps: [
      'Toma tu tema pendiente y extrae la acción más pequeña posible (ej: leer solo 1 párrafo).',
      'Pon un reloj de 3 minutos.',
      'Realiza solo esa acción.',
      'Al terminar los 3 minutos tienes permiso absoluto de parar si quieres. Si tienes inercia, puedes continuar.'
    ],
    example: {
      topic: 'Estudiar Historia Universal',
      hugeTask: 'Estudiar las 40 páginas de la Segunda Guerra Mundial',
      microTask: 'Leer únicamente el cuadro resumen de las causas en la página 12'
    },
    templateType: 'microstudy',
    tips: 'El 80% de las veces, una vez que comienzas y pasan los primeros 3 minutos, el cerebro supera la fricción y decide continuar.'
  },
  {
    id: 'regla-cinco-minutos',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Regla de los 5 Minutos',
    tagline: 'Un pacto honesto contigo mismo: solo 300 segundos.',
    difficulty: 'Fácil',
    timeNeeded: '5 min',
    bestFor: 'Cuando sientes pereza física o parálisis por análisis.',
    description: 'Dile a tu cerebro: "Solo voy a trabajar en esto durante 5 minutos de reloj. Si tras 5 minutos me siento miserable, puedo dejarlo con la conciencia tranquila".',
    steps: [
      'Prepara tu espacio y abre el archivo o cuaderno.',
      'Activa el contador de 5 minutos.',
      'Trabaja sin juzgar la calidad de lo que estás produciendo.',
      'Al sonar la alarma, evalúa sinceramente tu nivel de energía.'
    ],
    example: {
      deal: 'Solo redactaré la frase de introducción del ensayo. Si tras 5 minutos no tengo ideas, cierro la laptop sin culpa.'
    },
    templateType: 'fiveminutes',
    tips: 'La pereza suele ser miedo al esfuerzo total acumulado. Al negociar solo 5 minutos, el cerebro deja de sentir amenaza.'
  },
  {
    id: 'estudio-por-bloques',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Estudio por Bloques (Single-Tasking)',
    tagline: 'Una sola ventana abierta, un solo objetivo a la vez.',
    difficulty: 'Fácil',
    timeNeeded: '20 - 45 min',
    bestFor: 'Personas propensas a la multitarea destructiva y al picoteo de pestañas.',
    description: 'La multitarea no existe en el cerebro humano: lo que ocurre es un "coste de cambio de contexto" constante que drena tu glucosa cerebral y te hace sentir agotado sin haber avanzado.',
    steps: [
      'Cierra todas las pestañas del navegador excepto la que estás usando.',
      'Pon el teléfono en otra habitación o en modo avión boca abajo.',
      'Escribe en grande en un papel adhesivo tu ÚNICO objetivo del bloque.',
      'Si recuerdas algo urgente no relacionado (ej: comprar leche), escríbelo en una lista de pendientes externos y no lo hagas ahora.'
    ],
    example: {
      currentSingleTask: 'Resolver los ejercicios impares de trigonometría (del 1 al 9)',
      externalDistractionSheet: ['Llamar a Carlos', 'Ver fecha del concierto', 'Comprar tinta para impresora']
    },
    templateType: 'singletask',
    tips: 'La lista de distracciones actúa como una válvula de escape: tu mente se tranquiliza porque sabe que no olvidarás el recado, pero te permite seguir estudiando.'
  },
  {
    id: 'body-doubling',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Body Doubling (Compañero de Estudio)',
    tagline: 'La presencia de otro ser humano reduce la dispersión y la soledad.',
    difficulty: 'Fácil',
    timeNeeded: 'Variable (20 - 60 min)',
    bestFor: 'Estudiantes que se dispersan en soledad o estudiantes con TDAH.',
    description: 'Tener a alguien en la misma sala física o en un entorno virtual estudiando en silencio contigo actúa como un ancla social que normaliza el acto de trabajar sin distracciones.',
    steps: [
      'Conecta con un compañero o activa el simulador de Body Doubling de Mindu.',
      'Declaren al inicio su meta del bloque: "En los próximos 25 min voy a resolver 3 problemas".',
      'Trabajen en silencio con sonido ambiental compartido (lluvia, biblioteca o cafetería).',
      'Al terminar el tiempo, compartan brevemente: "¿Pudiste completar la meta?".'
    ],
    example: {
      virtualCompanion: 'Alex (Mindu Buddy)',
      status: 'Repasando apuntes de Biología Celular en silencio a tu lado'
    },
    templateType: 'bodydoubling',
    tips: 'En Mindu incluimos compañeros virtuales y sonidos ambientales para que nunca sientas la frialdad de estudiar en aislamiento.'
  },
  {
    id: 'pausas-activas',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Pausas Activas y Respiración Guiada',
    tagline: 'Descomprime el sistema nervioso, estira y resetea la vista.',
    difficulty: 'Fácil',
    timeNeeded: '3 - 5 min',
    bestFor: 'Entre sesiones de estudio, tensión cervical y fatiga visual.',
    description: 'Mirar una pantalla o libro durante horas tensa los músculos oculares y eleva el cortisol. Las pausas activas reactivan la circulación y descansan la mente.',
    steps: [
      'Regla 20-20-20: Cada 20 minutos, mira a un punto a 20 pies (6 metros) de distancia durante 20 segundos.',
      'Respiración en Caja (Box Breathing 4-4-4-4): Inhala en 4s, sostén en 4s, exhala en 4s, pausa en 4s.',
      'Movimientos suaves: Círculos con los hombros, estiramiento de antebrazos y cuello.',
      'Bebe un vaso de agua antes de volver a sentarte.'
    ],
    example: {
      routine: '30s cuello + 60s respiración guiada + 30s mirar por la ventana + vaso de agua'
    },
    templateType: 'activepause',
    tips: 'Evita pasar el descanso mirando redes sociales en el móvil; tu cerebro no descansa, solo cambia un estímulo visual denso por otro aún más estimulante.'
  },
  {
    id: 'estudio-baja-energia',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Estudio de Baja Energía (Modo 20%)',
    tagline: 'Avanza en tus días difíciles sin quemarte ni culparte.',
    difficulty: 'Muy Fácil',
    timeNeeded: '10 - 20 min',
    bestFor: 'Días con dolor de cabeza, cansancio tras jornada larga o desánimo.',
    description: 'Hay días en los que tu energía está al 20%. Exigirte un rendimiento del 100% solo genera frustración. El modo de baja energía selecciona tareas que requieren mínimo esfuerzo cognitivo.',
    steps: [
      'Acepta tu estado fisiológico sin juzgarte: hoy no es día de demostraciones heroicas.',
      'Elige una actividad pasiva o de bajo esfuerzo: escuchar un podcast del tema, ordenar apuntes o repasar 5 flashcards.',
      'Reduce la iluminación ambiental y el volumen.',
      'Felicítate por haber hecho algo en vez de haber abandonado por completo.'
    ],
    example: {
      lowEnergyTasks: [
        'Escuchar un audio resumen de 10 min tumbado en el sofá',
        'Organizar las carpetas de la asignatura y borrar archivos duplicados',
        'Ver un documental corto sobre el periodo histórico',
        'Repasar 8 tarjetas de vocabulario fáciles'
      ]
    },
    templateType: 'lowenergy',
    tips: 'Hacer un 10% en un mal día vale infinitamente más que hacer un 0% y sentir culpa durante el resto de la tarde.'
  },
  {
    id: 'objetivos-minimos-viables',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Objetivos Mínimos Viables (OMV)',
    tagline: 'La meta tan pequeña que es matemáticamente imposible fracasar.',
    difficulty: 'Fácil',
    timeNeeded: '1 - 2 min de planteamiento',
    bestFor: 'Empezar proyectos grandes y vencer la sobrecarga mental.',
    description: 'En lugar de planear "Estudiar Álgebra Lineal", define el OMV: "Escribir la fórmula de la matriz transpuesta en una ficha". Al cumplirlo, el cerebro experimenta dopamina por tarea completada.',
    steps: [
      'Pregúntate: "¿Cuál es la acción más diminuta que cuenta como progreso hoy?".',
      'Escríbela en tu tablero de Mindu.',
      'Ejecútala de inmediato.',
      'Si deseas seguir, define el siguiente OMV. Si no, tu cuota de hoy está cumplida.'
    ],
    example: {
      topic: 'Ensayo de Filosofía',
      standardGoal: 'Escribir el ensayo de 5 páginas (Abromador -> Procrastinación)',
      OMV: 'Escribir solo el título y los 3 subtítulos en el documento en blanco (Fácil -> Éxito inmediato)'
    },
    templateType: 'omv',
    tips: 'La inercia positiva es real: el primer milímetro es el más difícil de mover.'
  },
  {
    id: 'asistente-desbloqueo',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Lista de Siguientes Pasos (Botón de Desbloqueo)',
    tagline: '¿Te sientes paralizado? Este asistente te dice qué hacer segundo a segundo.',
    difficulty: 'Fácil',
    timeNeeded: '2 min',
    bestFor: 'Bloqueo mental, parálisis ejecutiva y confusión sobre por dónde arrancar.',
    description: 'Cuando la mente se bloquea, no necesita motivación abstracta: necesita instrucciones mecánicas paso a paso de bajo nivel.',
    steps: [
      'Paso 1: Pon los pies firmes en el suelo y bebe un trago de agua.',
      'Paso 2: Abre tu mochila o tu carpeta y saca únicamente el temario de la materia.',
      'Paso 3: Ve a la última página que leíste y busca la primera palabra en negrita.',
      'Paso 4: Cópiala en tu libreta y busca su significado. ¡Ya has empezado!'
    ],
    example: {
      prompt: '¿No sabes por dónde empezar tu informe de laboratorio?',
      script: '1. Abre el procesador de textos. 2. Escribe tu nombre y la fecha. 3. Copia el título del experimento. 4. Escribe una sola frase diciendo qué material usaste.'
    },
    templateType: 'unblock',
    tips: 'La acción precede a la motivación, no al revés. Haz el movimiento físico y la concentración vendrá detrás.'
  },
  {
    id: 'entorno-concentracion',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Entorno de Concentración (Checklist de Preparación)',
    tagline: 'Diseña tu espacio exterior para proteger tu mente interior.',
    difficulty: 'Fácil',
    timeNeeded: '5 min antes de estudiar',
    bestFor: 'Antes de iniciar cualquier sesión de estudio importante.',
    description: 'El autocontrol es un recurso agotable; diseñar un entorno libre de fricciones y tentaciones ahorra energía mental antes de siquiera empezar.',
    steps: [
      'Superficie despejada: retira todo lo que no uses en los próximos 40 minutos.',
      'Agua a mano: ten una botella llena para no tener la excusa de levantarte a la cocina.',
      'Notificaciones silenciadas: activa el modo enfoque en el móvil o déjalo fuera del alcance visual.',
      'Materiales listos: bolígrafos, cuaderno y calculadora a punto antes de sentarte.'
    ],
    example: {
      checklist: [
        'Mesa despejada (solo el material de la sesión actual)',
        'Botella de agua llena',
        'Teléfono fuera de la línea de visión',
        'Luz adecuada orientada al papel/pantalla',
        'Sonido ambiental o silencio configurado'
      ]
    },
    templateType: 'environment',
    tips: 'Si tienes que resistir la tentación de mirar el teléfono 10 veces en una hora, te quedarás sin energía para comprender el tema complejo.'
  },
  {
    id: 'plan-antiprocrastinacion',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Plan Antiprocrastinación (Diagnóstico de Fricción)',
    tagline: 'Identifica la verdadera causa del aplazamiento y desactívala.',
    difficulty: 'Media',
    timeNeeded: '5 min',
    bestFor: 'Cuando llevas días o semanas posponiendo una tarea concreta.',
    description: 'Procrastinar no es vagancia: es un mecanismo de regulación emocional frente al aburrimiento, la incertidumbre o el miedo a no hacerlo perfecto.',
    steps: [
      'Identifica tu monstruo de fricción: ¿Es Aburrimiento? ¿Miedo al fracaso? ¿Falta de claridad?',
      'Si es Aburrimiento: Gamifica la tarea (ponte un reto de tiempo con un cronómetro).',
      'Si es Miedo: Permítete hacer un "primer borrador pésimo" que nadie verá.',
      'Si es Confusión: Desglosa la tarea hasta encontrar el primer paso evidente.'
    ],
    example: {
      task: 'Estudiar para el examen de Química Orgánica',
      frictionIdentified: 'Miedo al fracaso (las fórmulas parecen jeroglíficos incomprensibles)',
      antidote: 'Hacer el ejercicio 1 sabiendo que puedo equivocarme, con la solución al lado para aprender del fallo.'
    },
    templateType: 'antiprocrastination',
    tips: 'La frase clave es: "Mejor hecho que perfecto". El borrador imperfecto se puede corregir; la hoja en blanco no.'
  },
  {
    id: 'sistema-reinicio-sin-culpa',
    category: 'focus',
    categoryName: 'Estudia a tu Ritmo',
    title: 'Sistema de Reinicio sin Culpa (Reset Amable)',
    tagline: '¿Te distrajiste durante 40 minutos? Cero drama: pulsa reiniciar y continúa.',
    difficulty: 'Fácil',
    timeNeeded: '30 segundos',
    bestFor: 'Cuando caíste en el agujero negro de las redes sociales o perdiste el hilo.',
    description: 'El castigo y la culpa tras una distracción prolongada aumentan la ansiedad, lo que paradójicamente empuja al cerebro a buscar más distracción para escapar del malestar. El reset amable rompe ese ciclo tóxico.',
    steps: [
      'Nota que te has distraído sin insultarte ni decirte "otra vez arruiné la tarde".',
      'Respira hondo una vez: el tiempo pasado ya no existe, el presente empieza ahora.',
      'Pulsa el botón "Reinicio sin culpa" en Mindu.',
      'Retoma exactamente la frase donde te habías quedado con una sonrisa.'
    ],
    example: {
      mindsetBefore: '¡Llevo 1 hora en TikTok! Ya es tarde, mejor lo dejo para mañana porque soy un desastre.',
      mindsetMindu: 'Me distraje 1 hora, mi cerebro necesitaba desconectar. No pasa nada. Voy a estudiar 20 minutos con foco ahora mismo y habré avanzado.'
    },
    templateType: 'kindreset',
    tips: 'Lo que define a los estudiantes exitosos no es nunca distraerse, sino la rapidez compasiva con la que regresan al foco sin flagelarse.'
  },

  // ==========================================
  // CATEGORÍA F: ORGANIZACIÓN DEL ESTUDIO
  // ==========================================
  {
    id: 'matriz-eisenhower',
    category: 'organization',
    categoryName: 'Organización del Estudio',
    title: 'Matriz de Priorización (Urgente vs Importante)',
    tagline: 'Diferencia las emergencias ruidosas de lo que de verdad construye tu futuro.',
    difficulty: 'Fácil',
    timeNeeded: '10 - 15 min',
    bestFor: 'Semanas de exámenes múltiples, entregas de trabajos y sobrecarga de tareas.',
    description: 'Divide tus tareas en 4 cuadrantes: 1) Urgente e Importante (hacer ya); 2) No urgente pero Importante (planificar con tiempo, ¡aquí está el verdadero aprendizaje!); 3) Urgente no importante (delegar o simplificar); 4) Ni urgente ni importante (eliminar).',
    steps: [
      'Haz una lista con todo lo que tienes pendiente esta semana.',
      'Coloca cada tarea en uno de los 4 cuadrantes.',
      'Dedica tu mejor bloque de energía mental matutino al Cuadrante 2 (Importante no urgente).',
      'Despacha las urgencias del Cuadrante 1 sin procrastinar.'
    ],
    example: {
      q1: 'Entrega del trabajo que vence mañana a las 9 am',
      q2: 'Estudiar 30 min diarios de Matemáticas para el examen del mes que viene',
      q3: 'Responder mensajes de grupos de clase no críticos',
      q4: 'Navegar sin rumbo por redes sociales buscando plantillas de apuntes'
    },
    templateType: 'eisenhower',
    tips: 'Los estudiantes que viven permanentemente en el Cuadrante 1 sufren agotamiento constante. El secreto del éxito tranquilo es invertir tiempo a diario en el Cuadrante 2.'
  },
  {
    id: 'desglose-proyectos',
    category: 'organization',
    categoryName: 'Organización del Estudio',
    title: 'Desglose de Proyectos Grandes (WBS)',
    tagline: 'Convierte un monstruo de 30 días en 6 misiones manejables de 2 horas.',
    difficulty: 'Media',
    timeNeeded: '20 - 30 min',
    bestFor: 'Trabajos de fin de grado, memorias de prácticas, monografías y lecturas de libros densos.',
    description: 'Estructura de Desglose de Trabajo (Work Breakdown Structure): fragmenta el objetivo final en fases cronológicas cerradas con entregables verificables.',
    steps: [
      'Define el producto terminado con claridad (ej: "Monografía de 15 páginas sobre el Cambio Climático").',
      'Divide en 4 fases: Investigación/Fuentes, Estructura/Índice, Redacción del borrador, Revisión y formato.',
      'Asigna una fecha límite a cada fase.',
      'No comiences la fase de redacción hasta haber cerrado la fase de investigación para evitar reescrituras.'
    ],
    example: {
      project: 'Monografía de Historia',
      phases: [
        { phase: 'Semana 1', deliverable: 'Selección de 5 libros/artículos y esquema de 4 capítulos' },
        { phase: 'Semana 2', deliverable: 'Borrador del Capítulo 1 y 2 (6 páginas)' },
        { phase: 'Semana 3', deliverable: 'Borrador del Capítulo 3 y Conclusiones' },
        { phase: 'Semana 4', deliverable: 'Bibliografía APA, corrección ortográfica y portada' }
      ]
    },
    templateType: 'projectbreakdown',
    tips: 'Celebra el cierre de cada fase: te dará la inyección anímica necesaria para encarar la siguiente.'
  },
  {
    id: 'planificador-semanal',
    category: 'organization',
    categoryName: 'Organización del Estudio',
    title: 'Planificador Semanal Realista',
    tagline: 'Horarios con aire: programa primero tus descansos y luego tu estudio.',
    difficulty: 'Fácil',
    timeNeeded: '15 min cada domingo/lunes',
    bestFor: 'Equilibrar vida personal, clases, deporte y horas de estudio.',
    description: 'El error habitual al planificar es rellenar cada hora del día de 8:00 a 22:00 con tareas de estudio. El primer imprevisto desmorona el castillo. Un horario realista deja al menos un 25% de tiempo libre de reserva.',
    steps: [
      'Bloquea primero tus necesidades básicas: sueño reparador, comidas y ejercicio/paseo.',
      'Introduce los horarios fijos inamovibles (clases presenciales, transporte).',
      'Asigna bloques de estudio de máximo 90 minutos para las materias más complejas.',
      'Deja los viernes o domingos por la tarde un bloque "Comodín" para absorber imprevistos sin frustración.'
    ],
    example: {
      mondaySchedule: [
        '08:00 - 14:00: Clases del instituto / universidad',
        '14:00 - 15:30: Comida y descanso real',
        '15:30 - 17:00: Bloque 1: Matemáticas (Técnica Feynman + problemas)',
        '17:00 - 17:45: Deporte o paseo activo',
        '17:45 - 19:00: Bloque 2: Historia (Flashcards y línea temporal)',
        '19:00+: Tiempo libre personal desconectado'
      ]
    },
    templateType: 'weeklyplanner',
    tips: 'Si no puedes cumplir el horario un día, no trates de meter 4 horas extra al día siguiente. Ajusta el comodín del fin de semana o simplifica las metas.'
  }
];

// Presets de temas listos para la herramienta "Convierte cualquier tema"
window.MINDU_TOPIC_PRESETS = [
  {
    id: 'fotosintesis',
    name: 'La Fotosíntesis y la Respiración Celular',
    category: 'Biología / Ciencias',
    text: `La fotosíntesis es el proceso bioquímico mediante el cual las plantas, algas y ciertas bacterias convierten la energía lumínica del sol en energía química en forma de azúcares (principalmente glucosa).

Ocurre principalmente en las hojas, dentro de unos orgánulos especializados llamados cloroplastos. Estos contienen un pigmento verde llamado clorofila, responsable de absorber las longitudes de onda de la luz solar.

La ecuación general de la fotosíntesis es:
6 CO2 (Dióxido de carbono) + 6 H2O (Agua) + Luz solar ---> C6H12O6 (Glucosa) + 6 O2 (Oxígeno molecular).

El proceso consta de dos fases principales:
1. Fase Luminosa (o fotoquímica): Ocurre en las membranas de los tilacoides. Requiere luz de forma directa. Los fotones excitan electrones en los fotosistemas, se rompe la molécula de agua (fotólisis del agua), se libera oxígeno a la atmósfera y se generan moléculas de alta energía: ATP y NADPH.
2. Fase Oscura o Ciclo de Calvin (fijación del carbono): Ocurre en el estroma del cloroplasto. No requiere luz directa pero sí los productos de la fase anterior (ATP y NADPH). Mediante la enzima RuBisCO, se fija el CO2 atmosférico para sintetizar fosfatos de azúcar que darán lugar a la glucosa y otros glúcidos.

Importancia ecológica: Es la base de las cadenas tróficas terrestres y acuáticas (organismos autótrofos), fija el carbono reduciendo el efecto invernadero y proporciona el oxígeno indispensable para los organismos aeróbicos.`
  },
  {
    id: 'revolucion-francesa',
    name: 'La Revolución Francesa (1789 - 1799)',
    category: 'Historia / Humanidades',
    text: `La Revolución Francesa fue un conflicto social, político e ideológico que convulsionó Francia y desmanteló las estructuras del Antiguo Régimen absolutista, extendiendo los principios de soberanía popular, igualdad y derechos humanos por toda Europa.

Causas principales:
1. Crisis económica y financiera: Deuda pública exorbitante provocada por la guerra de los Siete Años y el apoyo a la independencia de EE.UU., sumada a malas cosechas que encarecieron el pan.
2. Desigualdad estamental: El clero y la nobleza (Primer y Segundo Estado) disfrutaban de privilegios fiscales y territoriales, mientras el Tercer Estado (burguesía, campesinado y artesanos) sostenía todas las cargas impositivas sin tener representación política real.
3. Influencia de la Ilustración: Pensadores como Voltaire, Montesquieu y Rousseau difundieron ideas sobre la separación de poderes, la razón y el contrato social.

Etapas fundamentales:
- 1789: Convocatoria de los Estados Generales. La negativa del Tercer Estado desemboca en la Asamblea Nacional y el Juramento del Juego de Pelota. El 14 de julio el pueblo asalta la Bastilla. Se aprueba la Declaración de los Derechos del Hombre y del Ciudadano.
- 1791 - 1792: Monarquía Constitucional y posterior declaración de guerra a las potencias absolutistas vecinas.
- 1792 - 1794: La Convención Nacional y proclamación de la Primera República. Ejecución de Luis XVI en la guillotina. Época del Terror jacobino liderado por Robespierre.
- 1795 - 1799: El Directorio. Etapa moderada de gobierno burgués que concluye con el golpe de Estado de Napoleón Bonaparte (18 de Brumario).

Legado: Fin del feudalismo legal, consolidación de la burguesía, nacimiento del Estado laico y proclamación universal de derechos ciudadanos.`
  },
  {
    id: 'teorema-pitagoras',
    name: 'Teorema de Pitágoras y Geometría del Triángulo Rectángulo',
    category: 'Matemáticas / Geometría',
    text: `El Teorema de Pitágoras es una relación geométrica y algebraica fundamental en la geometría euclidiana que vincula los tres lados de cualquier triángulo rectángulo (aquel que posee un ángulo interior recto de exactamente 90 grados).

Enunciado formal:
"En todo triángulo rectángulo, el cuadrado de la longitud de la hipotenusa es igual a la suma de los cuadrados de las longitudes de los catetos."

Fórmula matemática:
c² = a² + b²
Donde:
- c es la Hipotenusa (el lado más largo del triángulo, situado siempre enfrente del ángulo recto de 90°).
- a y b son los Catetos (los dos lados menores que se unen formando el ángulo recto).

Despejes prácticos:
- Para hallar la hipotenusa: c = √(a² + b²)
- Para hallar un cateto desconocido: a = √(c² - b²) o b = √(c² - a²)

Ternas pitagóricas populares (números enteros que cumplen la relación exacta):
- (3, 4, 5) -> puesto que 3² + 4² = 9 + 16 = 25 = 5²
- (5, 12, 13) -> 25 + 144 = 169 = 13²
- (8, 15, 17) -> 64 + 225 = 289 = 17²

Aplicaciones en la vida cotidiana:
- Cálculo de distancias en mapas y navegación aérea/marítima mediante coordenadas cartesianas (distancia euclidiana).
- Arquitectura y construcción: verificar si una pared está perfectamente a plomo y en escuadra (la regla 3-4-5).
- Gráficos por computadora y física de vectores: descomposición de fuerzas en ejes X e Y.`
  },
  {
    id: 'inteligencia-artificial',
    name: 'Fundamentos de Inteligencia Artificial y Aprendizaje Automático',
    category: 'Tecnología / Computación',
    text: `La Inteligencia Artificial (IA) es una rama de las ciencias de la computación que se enfoca en diseñar sistemas y algoritmos capaces de realizar tareas que tradicionalmente requerirían inteligencia humana, tales como reconocer patrones visuales, comprender lenguaje natural, resolver problemas matemáticos y tomar decisiones estratégicas.

Subcampos principales:
1. Machine Learning (Aprendizaje Automático): En vez de programar reglas lógicas explícitas (si ocurre X haz Y), se suministran datos y ejemplos al algoritmo para que este aprenda las reglas estadísticas subyacentes por sí mismo.
2. Deep Learning (Aprendizaje Profundo): Utiliza redes neuronales artificiales con múltiples capas ocultas (arquitecturas profundas), inspiradas en la conectividad del córtex cerebral, excelentes para procesar audio, imágenes y texto masivo.
3. Procesamiento del Lenguaje Natural (PLN): Permite a las máquinas analizar, traducir y generar texto coherente en lenguaje humano (como los Modelos de Lenguaje Grandes o LLMs).

Tipos de entrenamiento en Machine Learning:
- Aprendizaje Supervisado: El modelo se entrena con datos etiquetados (ej: fotos marcadas como "perro" o "gato").
- Aprendizaje No Supervisado: El modelo busca agrupaciones naturales y patrones ocultos en datos sin etiquetar previa.
- Aprendizaje por Refuerzo: Un agente aprende interactuando con un entorno mediante recompensas y penalizaciones (como en el ajedrez o la robótica autónoma).

Desafíos éticos clave: Sesgos en los datos de entrenamiento, privacidad de los usuarios, consumo energético de los centros de cómputo y necesidad de transparencia algorítmica.`
  }
];
