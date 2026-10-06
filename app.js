const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];

// ---------------- Tema claro / oscuro ----------------
const themeToggle = qs('#themeToggle');
const themeIcon = qs('#themeIcon');
const savedTheme = localStorage.getItem('g5-theme');
const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  localStorage.setItem('g5-theme', theme);
}
applyTheme(savedTheme || (preferredDark ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

// ---------------- Tabs de integrantes ----------------
qsa('.speaker-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    qsa('.speaker-tab').forEach(t => t.classList.remove('active'));
    qsa('.speaker-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    qs(`[data-panel="${tab.dataset.speaker}"]`).classList.add('active');
  });
});



// ---------------- Exposición interactiva y preguntas ----------------
qsa('.reveal-quiz').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = qs(`#${btn.dataset.target}`);
    if (!panel) return;

    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const willOpen = !isOpen;

    btn.setAttribute('aria-expanded', String(willOpen));
    panel.hidden = !willOpen;
    panel.style.display = willOpen ? 'grid' : 'none';
    btn.innerHTML = willOpen ? '🙈 Ocultar preguntas' : '🧠 Practicar preguntas';

    if (willOpen) {
      requestAnimationFrame(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    }
  });
});

function launchBurst() {
  const burst = document.createElement('div');
  burst.className = 'burst';
  const colors = ['#7c3aed', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#ec4899'];
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement('span');
    piece.className = 'burst-piece';
    const angle = (Math.PI * 2 * i) / 24;
    const distance = 120 + Math.random() * 150;
    piece.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    piece.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 100}ms`;
    burst.appendChild(piece);
  }
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 1050);
}

qsa('.quiz-card').forEach(card => {
  const correct = card.dataset.correct;
  let attempts = Number(card.dataset.attempts || 3);
  const feedback = qs('.quiz-feedback', card);
  const badge = qs('.attempts-badge', card);
  const buttons = qsa('.quiz-options button', card);
  let finished = false;

  const updateBadge = () => {
    if (!badge) return;
    badge.textContent = `${attempts} ${attempts === 1 ? 'intento' : 'intentos'}`;
    badge.classList.toggle('danger', attempts === 1);
  };

  const finishQuestion = (success) => {
    finished = true;
    buttons.forEach(b => {
      b.disabled = true;
      if (b.dataset.option === correct) b.classList.add('correct-answer');
    });
    if (success) {
      card.classList.remove('wrong');
      card.classList.add('correct');
      feedback.className = 'quiz-feedback success';
      feedback.textContent = '¡Correcto! 🎉 Esa es la respuesta que deben defender.';
      launchBurst();
    } else {
      card.classList.add('wrong');
      feedback.className = 'quiz-feedback error';
      feedback.textContent = 'Se acabaron los 3 intentos. La respuesta correcta quedó marcada en verde para repasarla.';
    }
  };

  updateBadge();

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (finished || btn.disabled) return;
      const chosen = btn.dataset.option;

      if (chosen === correct) {
        finishQuestion(true);
        return;
      }

      attempts -= 1;
      btn.disabled = true;
      btn.classList.add('wrong-answer');
      card.classList.add('wrong');
      updateBadge();

      if (attempts <= 0) {
        finishQuestion(false);
      } else {
        feedback.className = 'quiz-feedback error';
        feedback.textContent = `Respuesta incorrecta. Te ${attempts === 1 ? 'queda' : 'quedan'} ${attempts} ${attempts === 1 ? 'intento' : 'intentos'}.`;
        setTimeout(() => card.classList.remove('wrong'), 450);
      }
    });
  });
});

// ---------------- Persistencia simple de inputs ----------------
function persistInputs() {
  qsa('input, select').forEach((el, index) => {
    const key = `g5-field-${index}`;
    const saved = localStorage.getItem(key);
    if (saved !== null) el.value = saved;
    el.addEventListener('input', () => localStorage.setItem(key, el.value));
    el.addEventListener('change', () => localStorage.setItem(key, el.value));
  });
}

// ---------------- Métricas de usabilidad ----------------
function calculateMetrics() {
  const rows = qsa('#taskTableBody tr');
  const values = rows.map(row => ({
    success: Number(qs('[data-field="success"]', row).value),
    time: Number(qs('[data-field="time"]', row).value || 0),
    errors: Number(qs('[data-field="errors"]', row).value || 0),
    attempts: Number(qs('[data-field="attempts"]', row).value || 0)
  }));

  const successes = values.reduce((a, v) => a + v.success, 0);
  const totalTime = values.reduce((a, v) => a + v.time, 0);
  const errors = values.reduce((a, v) => a + v.errors, 0);
  const attempts = values.reduce((a, v) => a + v.attempts, 0);
  const rate = values.length ? (successes / values.length) * 100 : 0;
  const avg = values.length ? totalTime / values.length : 0;

  qs('#successRate').textContent = `${rate.toFixed(1)}%`;
  qs('#avgTime').textContent = `${avg.toFixed(1)} s`;
  qs('#totalErrors').textContent = errors;
  qs('#totalAttempts').textContent = attempts;

  let insight = 'Los resultados son favorables, pero deben contrastarse con observaciones y heurísticas.';
  if (rate < 60) insight = 'La tasa de éxito es baja. El flujo necesita revisión prioritaria antes de considerarse validado.';
  else if (rate < 85) insight = 'La tasa de éxito es moderada. Conviene revisar las tareas con más errores y mayor tiempo antes de considerar el flujo como validado.';
  else if (errors > 3) insight = 'La tasa de éxito es alta, pero existen errores frecuentes. Revisen prevención de errores, etiquetas y feedback.';
  else insight = 'La tasa de éxito es alta y los errores son bajos. Verifiquen ahora la evidencia heurística para confirmar el resultado.';
  qs('#metricsInsight').textContent = insight;
}
qs('#calculateMetrics').addEventListener('click', calculateMetrics);
qsa('#taskTableBody input, #taskTableBody select').forEach(el => el.addEventListener('change', calculateMetrics));

// ---------------- Heurísticas ----------------
const heuristics = [
  'Visibilidad del estado del sistema',
  'Correspondencia entre sistema y mundo real',
  'Control y libertad del usuario',
  'Consistencia y estándares',
  'Prevención de errores',
  'Reconocimiento antes que recuerdo',
  'Flexibilidad y eficiencia de uso',
  'Diseño estético y minimalista',
  'Reconocer, diagnosticar y recuperarse de errores',
  'Ayuda y documentación'
];

const heuristicBody = qs('#heuristicBody');
heuristics.forEach((name, index) => {
  const tr = document.createElement('tr');
  const defaultSeverity = [1,0,0,1,2,1,0,1,3,0][index];
  const defaultNote = [
    'El feedback posterior a ciertas acciones puede reforzarse.', '', '',
    'Algunos elementos usan patrones visuales distintos.',
    'Faltan validaciones preventivas en un punto del flujo.',
    'Una etiqueta obliga a recordar el significado.', '',
    'Hay elementos secundarios que compiten por atención.',
    'El mensaje de error no indica cómo continuar.', ''
  ][index];
  tr.innerHTML = `
    <td>${index + 1}</td>
    <td><strong>${name}</strong></td>
    <td>
      <select class="heuristic-severity">
        ${[0,1,2,3,4].map(n => `<option value="${n}" ${n === defaultSeverity ? 'selected' : ''}>${n}</option>`).join('')}
      </select>
    </td>
    <td><input class="heuristic-note" value="${defaultNote}" placeholder="Describa evidencia o problema" /></td>
  `;
  heuristicBody.appendChild(tr);
});

function calculateHeuristics() {
  const rows = qsa('#heuristicBody tr');
  const values = rows.map((row, i) => ({
    name: heuristics[i],
    severity: Number(qs('.heuristic-severity', row).value)
  }));
  const avg = values.reduce((a, v) => a + v.severity, 0) / values.length;
  const high = values.filter(v => v.severity >= 3).length;
  const top = [...values].sort((a,b) => b.severity - a.severity)[0];
  qs('#avgSeverity').textContent = avg.toFixed(1);
  qs('#highSeverityCount').textContent = high;
  qs('#topHeuristic').textContent = top && top.severity > 0 ? top.name : '—';
}
qs('#calculateHeuristics').addEventListener('click', calculateHeuristics);
qsa('#heuristicBody select').forEach(el => el.addEventListener('change', calculateHeuristics));

// ---------------- Backlog automático ----------------
function priorityFromSeverity(s) {
  if (s >= 3) return 'Alta';
  if (s === 2) return 'Media';
  return 'Baja';
}
function generateBacklog() {
  const rows = qsa('#findingsBody tr');
  const items = rows.map(row => {
    const cells = qsa('td', row);
    const id = cells[0].textContent.trim();
    const owner = cells[1].textContent.trim();
    const hallazgo = qs('input', cells[2]).value;
    const severity = Number(qs('.severity-select', row).value);
    const mejora = qs('input', cells[6]).value;
    return { id, owner, hallazgo, severity, mejora, priority: priorityFromSeverity(severity) };
  }).sort((a,b) => b.severity - a.severity);

  const list = qs('#backlogList');
  list.innerHTML = '';
  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'backlog-item';
    div.innerHTML = `
      <span class="priority ${item.priority.toLowerCase()}">${item.priority}</span>
      <div><strong>${item.mejora}</strong><small>${item.id} · ${item.hallazgo} · Responsable: ${item.owner}</small></div>
      <span class="issue-chip">UX-${String(index + 1).padStart(2,'0')} · Sev. ${item.severity}</span>
    `;
    list.appendChild(div);
  });
}
qs('#generateBacklog').addEventListener('click', generateBacklog);
qsa('#findingsBody input, #findingsBody select').forEach(el => el.addEventListener('change', generateBacklog));

// ---------------- Rúbrica ----------------
const rubricDefaults = [0.45, 0.70, 0.70, 0.35, 0.55];
function calculateRubric() {
  const rows = qsa('#rubricBody tr');
  let total = 0;
  rows.forEach(row => {
    const max = Number(qs('.max-score', row).textContent);
    const input = qs('.rubric-input', row);
    let value = Number(input.value || 0);
    if (value > max) { value = max; input.value = max.toFixed(2); }
    if (value < 0) { value = 0; input.value = '0'; }
    total += value;
    qs('.rubric-percent', row).textContent = `${Math.round((value / max) * 100)}%`;
  });
  const pct = (total / 3) * 100;
  qs('#rubricTotal').textContent = total.toFixed(2);
  qs('#rubricProgress').style.width = `${Math.min(100, pct)}%`;
  let msg = 'Resultado en desarrollo. Revisen los criterios con menor porcentaje.';
  if (pct >= 90) msg = 'Nivel muy alto. Revisen los criterios con menor porcentaje antes de exponer.';
  else if (pct >= 80) msg = 'Buen nivel. Refuercen evidencia técnica y defensa para acercarse al máximo.';
  else if (pct >= 70) msg = 'Nivel aceptable. Hay varios criterios que necesitan evidencia adicional.';
  else msg = 'Resultado bajo. Prioricen aplicación real, evidencia y claridad de defensa.';
  qs('#rubricMessage').textContent = msg;
}
qsa('.rubric-input').forEach(el => el.addEventListener('input', calculateRubric));
qs('#resetRubric').addEventListener('click', () => {
  qsa('.rubric-input').forEach((el, i) => el.value = rubricDefaults[i]);
  calculateRubric();
});

// Inicialización
persistInputs();
calculateMetrics();
calculateHeuristics();
generateBacklog();
calculateRubric();
