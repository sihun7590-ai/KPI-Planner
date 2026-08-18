(() => {
  const STORAGE_KEY = 'kpi-planner-data-v1';
  const PALETTE = ['#3f6f9c', '#a8681f', '#2e7d5b', '#b04a45', '#6b5ca5', '#2c7f8c', '#a4508b', '#6b7280'];
  const DEFAULT_EVENT_TYPES = [
    { id: 'construction', label: '공사', color: '#a8681f' },
    { id: 'other', label: '기타일정', color: '#6b5ca5' },
  ];
  const DEFAULT_TASK_CATEGORIES = [
    { id: 'work', label: '생산 및 업무', color: '#3f6f9c' },
    { id: 'she', label: 'SHE', color: '#2c7f8c' },
  ];

  // 인라인 SVG 아이콘 (이모지 대신 사용해 어느 기기에서나 동일하게 보이도록)
  const svg = (body, size) => `<svg class="ic" viewBox="0 0 16 16" width="${size || 14}" height="${size || 14}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const ICON = {
    edit: svg('<path d="M11.3 2.4a1.55 1.55 0 0 1 2.2 2.2L5.4 12.7l-3 .8.8-3z"/>'),
    trash: svg('<path d="M2.6 4h10.8M6 4V2.6h4V4M12.4 4l-.6 9a1 1 0 0 1-1 .95H5.2a1 1 0 0 1-1-.95L3.6 4M6.5 6.8v4.4M9.5 6.8v4.4"/>'),
    close: svg('<path d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"/>'),
    plus: svg('<path d="M8 3.4v9.2M3.4 8h9.2"/>'),
    grip: '<svg class="ic" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><circle cx="6" cy="3.6" r="1.15"/><circle cx="10" cy="3.6" r="1.15"/><circle cx="6" cy="8" r="1.15"/><circle cx="10" cy="8" r="1.15"/><circle cx="6" cy="12.4" r="1.15"/><circle cx="10" cy="12.4" r="1.15"/></svg>',
    clock: svg('<circle cx="8" cy="8" r="5.7"/><path d="M8 4.7V8l2.3 1.4"/>', 12),
    carry: svg('<path d="M2.9 6.6A5.2 5.2 0 0 1 11.6 4M13.1 9.4A5.2 5.2 0 0 1 4.4 12M11.9 1.9v2.2H9.7M4.1 14.1v-2.2h2.2"/>', 12),
    chevL: svg('<path d="M10 3.2 5.2 8 10 12.8"/>', 16),
    chevR: svg('<path d="M6 3.2 10.8 8 6 12.8"/>', 16),
    chevU: svg('<path d="M3.4 10 8 5.4 12.6 10"/>', 12),
    chevD: svg('<path d="M3.4 6 8 10.6 12.6 6"/>', 12),
    arrowR: svg('<path d="M3 8h9M8.6 4.6 12 8l-3.4 3.4"/>', 13),
  };
  const ALARM_DEFS = [
    { key: 'm1', label: '한 달 전', apply: d => addMonths(d, -1) },
    { key: 'w2', label: '2주 전', apply: d => addDays(d, -14) },
    { key: 'w1', label: '1주 전', apply: d => addDays(d, -7) },
    { key: 'd3', label: '3일 전', apply: d => addDays(d, -3) },
    { key: 'd1', label: '1일 전', apply: d => addDays(d, -1) },
  ];
  const state = loadState();
  const pointers = {
    daily: new Date(),
    weekly: new Date(),
    monthly: new Date(),
    calendar: new Date(),
  };
  let weeklySummaryOpen = (new Date().getDay() === 5); // 금요일이면 기본으로 펼침

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && Array.isArray(raw.kpis) && Array.isArray(raw.tasks)) {
        if (!Array.isArray(raw.events)) raw.events = [];
        if (!Array.isArray(raw.eventTypes) || raw.eventTypes.length === 0) raw.eventTypes = DEFAULT_EVENT_TYPES.map(t => ({ ...t }));
        if (!Array.isArray(raw.taskCategories) || raw.taskCategories.length === 0) raw.taskCategories = DEFAULT_TASK_CATEGORIES.map(c => ({ ...c }));
        raw.events.forEach(ev => {
          if (!ev.startDate) {
            ev.startDate = ev.date || null;
            ev.endDate = ev.date || null;
            ev.startTime = ev.time || null;
            ev.endTime = null;
          }
          if (ev.endDate == null) ev.endDate = ev.startDate;
        });
        return raw;
      }
    } catch (e) { /* ignore */ }
    return { kpis: [], tasks: [], events: [], eventTypes: DEFAULT_EVENT_TYPES.map(t => ({ ...t })), taskCategories: DEFAULT_TASK_CATEGORIES.map(c => ({ ...c })) };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function uid() {
    return (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2));
  }

  function eventTypeById(id) {
    return state.eventTypes.find(t => t.id === id) || { id, label: '(삭제된 구분)', color: '#8a8f98' };
  }
  function taskCategoryById(id) {
    return state.taskCategories.find(c => c.id === id) || null;
  }

  function colorForKpi(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return PALETTE[hash % PALETTE.length];
  }

  function progressColor(pct) {
    if (pct >= 70) return 'var(--success)';
    if (pct >= 35) return 'var(--warn)';
    return 'var(--danger)';
  }

  // ---------- date helpers ----------
  const pad = n => String(n).padStart(2, '0');
  const dateStr = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const monthStr = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  function mondayOf(d) {
    const nd = new Date(d);
    const day = nd.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    nd.setDate(nd.getDate() + diff);
    nd.setHours(0, 0, 0, 0);
    return nd;
  }
  const addDays = (d, n) => { const nd = new Date(d); nd.setDate(nd.getDate() + n); return nd; };
  const addMonths = (d, n) => { const nd = new Date(d); nd.setMonth(nd.getMonth() + n); return nd; };
  const WEEKDAY_KR = ['일', '월', '화', '수', '목', '금', '토'];
  const WEEKDAY_KR_MON = ['월', '화', '수', '목', '금', '토', '일'];
  function monthMatrix(d) {
    const firstOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    const start = mondayOf(firstOfMonth);
    const cells = [];
    for (let i = 0; i < 42; i++) cells.push(addDays(start, i));
    return cells;
  }

  function fmtDaily(d) {
    const today = dateStr(new Date()) === dateStr(d) ? ' (오늘)' : '';
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEKDAY_KR[d.getDay()]})${today}`;
  }
  function fmtWeekly(mon) {
    const sun = addDays(mon, 6);
    const sameMonth = mon.getMonth() === sun.getMonth();
    const left = `${mon.getMonth() + 1}월 ${mon.getDate()}일`;
    const right = sameMonth ? `${sun.getDate()}일` : `${sun.getMonth() + 1}월 ${sun.getDate()}일`;
    return `${mon.getFullYear()}년 ${left} ~ ${right}`;
  }
  function fmtMonthly(d) {
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
  }

  // ---------- overdue daily task carry-over ----------
  function carryOverOverdueDailyTasks() {
    const todayKey = dateStr(new Date());
    let changed = false;
    state.tasks.forEach(t => {
      if (t.planType === 'daily' && !t.done && t.scopeKey < todayKey) {
        if (!t.carriedFrom) t.carriedFrom = t.scopeKey;
        t.scopeKey = todayKey;
        changed = true;
      }
    });
    if (changed) saveState();
  }

  // ---------- KPI progress ----------
  function linkedTasks(kpiId) {
    return state.tasks.filter(t => t.kpiId === kpiId);
  }
  function kpiProgress(kpi) {
    if (kpi.mode === 'manual') return kpi.progress;
    const linked = linkedTasks(kpi.id);
    if (linked.length === 0) return kpi.progress || 0;
    const done = linked.filter(t => t.done).length;
    return Math.round((done / linked.length) * 100);
  }

  // ---------- KPI grading rubric ----------
  function defaultRubric() {
    const gradeNames = ['U', 'N', 'M', 'E', 'O'];
    const grades = gradeNames.map(n => ({ id: uid(), name: n }));
    const criteria = [{ id: uid(), label: '평가 기준 1', cells: {}, selected: null, weight: null }];
    return { grades, criteria };
  }

  function gradeColor(i, total) {
    if (total <= 1) return 'hsl(145,55%,42%)';
    const t = i / (total - 1); // 0=best..1=worst
    const hue = 145 - t * 145;
    return `hsl(${hue.toFixed(0)},60%,45%)`;
  }

  function computeRubricResult(rubric) {
    const N = rubric.grades.length;
    if (N === 0) return null;
    const selected = rubric.criteria
      .filter(c => c.selected)
      .map(c => {
        const idx = rubric.grades.findIndex(g => g.id === c.selected);
        if (idx === -1) return null;
        return { score: N - idx, weight: (c.weight != null && c.weight > 0) ? c.weight : 1 };
      })
      .filter(s => s !== null);
    if (selected.length === 0) return { avg: null, count: 0, total: rubric.criteria.length, grade: null, color: null };
    const weightSum = selected.reduce((a, s) => a + s.weight, 0);
    const avg = selected.reduce((a, s) => a + s.score * s.weight, 0) / weightSum;
    let bestIdx = 0, bestDiff = Infinity;
    rubric.grades.forEach((g, i) => {
      const diff = Math.abs((N - i) - avg);
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i; }
    });
    return { avg, count: selected.length, total: rubric.criteria.length, grade: rubric.grades[bestIdx], color: gradeColor(bestIdx, N) };
  }

  // ---------- priority helpers ----------
  function defaultNextPriorityFor(planType, scopeKey) {
    const count = state.tasks.filter(t => t.planType === planType && t.scopeKey === scopeKey).length;
    return count + 1;
  }
  function defaultNextPriority(planType) {
    const pointer = pointers[planType];
    let scopeKey;
    if (planType === 'daily') scopeKey = dateStr(pointer);
    else if (planType === 'weekly') scopeKey = dateStr(mondayOf(pointer));
    else scopeKey = monthStr(pointer);
    return defaultNextPriorityFor(planType, scopeKey);
  }
  function reorderTask(taskId, targetId, placeAfter) {
    const task = state.tasks.find(t => t.id === taskId);
    const target = state.tasks.find(t => t.id === targetId);
    if (!task || !target || task.id === target.id) return;
    const siblings = state.tasks
      .filter(t => t.planType === task.planType && t.scopeKey === task.scopeKey && !t.done)
      .sort((a, b) => (a.priority ?? Infinity) - (b.priority ?? Infinity) || a.createdAt - b.createdAt);
    const without = siblings.filter(t => t.id !== task.id);
    const targetIdx = without.findIndex(t => t.id === target.id);
    if (targetIdx === -1) return;
    const insertAt = placeAfter ? targetIdx + 1 : targetIdx;
    without.splice(insertAt, 0, task);
    without.forEach((t, i) => { t.priority = i + 1; });
    saveState();
    renderPlanner(task.planType);
    if (task.planType === 'daily') renderWeeklySummaryPanel();
  }

  // ---------- recurrence ----------
  function generateRecurrences(base, planType, recurrence, pointerDate) {
    const results = [];
    const clone = (scopeKey) => ({ ...base, id: uid(), scopeKey, createdAt: Date.now() });
    if (planType === 'daily' && recurrence === 'daily') {
      for (let i = 1; i <= 29; i++) results.push(clone(dateStr(addDays(pointerDate, i))));
    } else if (planType === 'daily' && recurrence === 'weekly') {
      for (let i = 1; i <= 11; i++) results.push(clone(dateStr(addDays(pointerDate, i * 7))));
    } else if (planType === 'weekly' && recurrence === 'weekly') {
      const startMonday = mondayOf(pointerDate);
      for (let i = 1; i <= 11; i++) results.push(clone(dateStr(addDays(startMonday, i * 7))));
    } else if (planType === 'monthly' && recurrence === 'monthly') {
      for (let i = 1; i <= 5; i++) results.push(clone(monthStr(addMonths(pointerDate, i))));
    }
    return results;
  }

  // ---------- rendering ----------
  function renderKpiSummary() {
    const el = document.getElementById('kpi-summary');
    if (state.kpis.length === 0) { el.textContent = ''; return; }
    const avg = Math.round(state.kpis.reduce((s, k) => s + kpiProgress(k), 0) / state.kpis.length);
    const weightSum = state.kpis.reduce((s, k) => s + (k.weight || 0), 0);
    const anyWeight = state.kpis.some(k => k.weight);
    const weightOk = Math.abs(weightSum - 100) < 0.01;
    const weightHtml = anyWeight
      ? ` · 가중치 합계 <b style="color:${weightOk ? 'var(--success)' : 'var(--warn)'}">${weightSum}%</b>${weightOk ? '' : ' (100%가 되도록 맞춰보세요)'}`
      : '';
    el.innerHTML = `KPI <b>${state.kpis.length}개</b> · 평균 진척도 <b>${avg}%</b>${weightHtml}`;
  }

  function kpiRubricSummaryHtml(kpi) {
    const res = computeRubricResult(kpi.rubric);
    if (!res || !res.grade) return `<div class="kpi-linked-stat">평가등급: 아직 선택된 기준이 없음</div>`;
    return `<div class="kpi-linked-stat">종합 등급: <span class="rubric-grade-badge" style="background:${res.color}">${escapeHtml(res.grade.name)}</span> (평가 ${res.count}/${res.total}건, 평균 ${res.avg.toFixed(1)}점)</div>`;
  }

  function renderKpis() {
    renderKpiSummary();
    const list = document.getElementById('kpi-list');
    if (state.kpis.length === 0) {
      list.innerHTML = `<div class="empty-state" style="grid-column:1/-1">아직 등록된 KPI가 없습니다. "+ 새 KPI"로 올해 목표를 등록해보세요.</div>`;
      return;
    }
    list.innerHTML = state.kpis.map(kpi => {
      const pct = kpiProgress(kpi);
      const linked = linkedTasks(kpi.id);
      const done = linked.filter(t => t.done).length;
      const linkedInfo = linked.length
        ? `연결된 업무 ${linked.length}개 중 ${done}개 완료`
        : `연결된 업무 없음`;
      const recordCount = (kpi.records || []).length;
      return `
      <div class="kpi-card" data-id="${kpi.id}">
        <div class="kpi-card-top">
          <div>
            <div class="kpi-title">${escapeHtml(kpi.title)}</div>
            <div class="kpi-year">${kpi.year}년 목표${kpi.weight ? ` · 가중치 ${kpi.weight}%` : ''}</div>
          </div>
          <div class="kpi-actions">
            <button class="icon-btn" data-act="edit-kpi" title="수정">${ICON.edit}</button>
            <button class="icon-btn" data-act="delete-kpi" title="삭제">${ICON.trash}</button>
          </div>
        </div>
        ${kpi.description ? `<div class="kpi-desc">${escapeHtml(kpi.description)}</div>` : ''}
        <div class="progress-row">
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%;background:${progressColor(pct)}"></div></div>
          <div class="progress-pct">${pct}%</div>
        </div>
        ${kpi.mode === 'manual' ? `<input type="range" min="0" max="100" value="${kpi.progress}" class="progress-slider" data-act="slider">` : ''}
        <div class="kpi-mode-row">
          <span class="kpi-linked-stat">${linkedInfo}</span>
          <span class="mode-toggle" data-act="toggle-mode">${kpi.mode === 'manual' ? '수동 설정' : '자동 계산'}</span>
        </div>
        <div class="kpi-extra-row">
          <button class="btn small" data-act="open-records">실적 관리 (${recordCount}건)</button>
          <button class="btn small" data-act="open-rubric">${kpi.rubric ? '등급표 관리' : '+ 평가등급표'}</button>
        </div>
        ${kpi.rubric ? kpiRubricSummaryHtml(kpi) : ''}
      </div>`;
    }).join('');
  }

  function renderPlanner(type) {
    const pointer = pointers[type];
    let scopeKey, titleText;
    if (type === 'daily') { scopeKey = dateStr(pointer); titleText = fmtDaily(pointer); }
    else if (type === 'weekly') { const mon = mondayOf(pointer); scopeKey = dateStr(mon); titleText = fmtWeekly(mon); }
    else { scopeKey = monthStr(pointer); titleText = fmtMonthly(pointer); }

    document.getElementById(`${type}-title`).textContent = titleText;

    const tasks = state.tasks.filter(t => t.planType === type && t.scopeKey === scopeKey);
    const doneCount = tasks.filter(t => t.done).length;
    const summaryEl = document.getElementById(`${type}-summary`);
    summaryEl.innerHTML = tasks.length
      ? `총 <b>${tasks.length}개</b> · 완료 <b>${doneCount}개</b> (${Math.round(doneCount / tasks.length * 100)}%)`
      : '';

    const listEl = document.getElementById(`${type}-list`);
    if (tasks.length === 0) {
      listEl.innerHTML = `<div class="empty-state">등록된 할 일이 없습니다.</div>`;
      return;
    }
    const sorted = [...tasks].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      const pa = a.priority ?? Infinity;
      const pb = b.priority ?? Infinity;
      if (pa !== pb) return pa - pb;
      return a.createdAt - b.createdAt;
    });
    listEl.innerHTML = sorted.map(t => {
      const kpi = t.kpiId ? state.kpis.find(k => k.id === t.kpiId) : null;
      const canReorder = !t.done;
      const cat = t.category ? taskCategoryById(t.category) : null;
      const catOptions = state.taskCategories.map(c => `<option value="${c.id}" ${t.category === c.id ? 'selected' : ''}>${escapeHtml(c.label)}</option>`).join('');
      const kpiColor = kpi ? colorForKpi(kpi.id) : null;
      return `
      <li class="task-row ${t.done ? 'done' : ''}" data-id="${t.id}">
        ${canReorder ? `<span class="drag-handle" draggable="true" title="드래그해서 순서 바꾸기">${ICON.grip}</span>` : `<span class="drag-handle-spacer"></span>`}
        <input type="checkbox" class="task-checkbox" data-act="toggle-task" ${t.done ? 'checked' : ''}>
        <div class="task-main">
          <div class="task-line">
            ${t.priority ? `<span class="priority-badge">${t.priority}</span>` : ''}
            <span class="task-title">${escapeHtml(t.title)}</span>
            ${t.dueTime ? `<span class="meta-badge due" title="목표 시간">${ICON.clock}${t.dueTime}</span>` : ''}
            ${t.carriedFrom ? `<span class="meta-badge carry" title="원래 날짜: ${t.carriedFrom}">${ICON.carry}이월</span>` : ''}
            ${kpi ? `<span class="kpi-tag" style="color:${kpiColor};background:${kpiColor}14;border-color:${kpiColor}40">${escapeHtml(kpi.title)}</span>` : ''}
          </div>
          ${t.note ? `<div class="task-note">${escapeHtml(t.note)}</div>` : ''}
        </div>
        <select class="inline-category-select" data-act="inline-category" style="color:${cat ? cat.color : 'var(--text-muted)'};background:${cat ? cat.color + '14' : 'var(--surface)'};border-color:${cat ? cat.color + '40' : 'var(--border)'}">
          <option value="" ${!t.category ? 'selected' : ''}>구분 없음</option>
          ${catOptions}
        </select>
        ${type === 'monthly' ? `<button class="btn small" data-act="split-suggest" title="주간에 나눠 담기">주간 분배</button>` : ''}
        ${type === 'weekly' ? `<button class="btn small" data-act="split-suggest" title="일간에 나눠 담기">일간 분배</button>` : ''}
        <button class="icon-btn" data-act="delete-task" title="삭제">${ICON.trash}</button>
      </li>`;
    }).join('');
  }

  function renderWeeklySummaryPanel() {
    const panel = document.getElementById('weekly-summary-panel');
    const btn = document.getElementById('btn-weekly-summary-toggle');
    if (!weeklySummaryOpen) {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.textContent = '업무 요약 보기';
      return;
    }
    btn.textContent = '업무 요약 닫기';
    panel.classList.remove('hidden');

    const monday = mondayOf(pointers.weekly);
    const weekdays = [0, 1, 2, 3, 4].map(i => addDays(monday, i));
    const weekdayKeys = weekdays.map(dateStr);
    const weekTasks = state.tasks.filter(t => t.planType === 'daily' && weekdayKeys.includes(t.scopeKey) && t.category);

    const section = (title, tasks) => {
      const doneTasks = tasks.filter(t => t.done).sort((a, b) => a.scopeKey.localeCompare(b.scopeKey));
      const pending = tasks.length - doneTasks.length;
      const items = doneTasks.length
        ? doneTasks.map(t => {
            const d = new Date(t.scopeKey + 'T00:00:00');
            const label = `${d.getMonth() + 1}/${d.getDate()}(${WEEKDAY_KR[d.getDay()]})`;
            return `<li><span>${escapeHtml(t.title)}</span><span class="summary-date">${label}</span></li>`;
          }).join('')
        : `<li class="summary-empty">완료된 업무가 없습니다.</li>`;
      return `
        <div class="summary-section">
          <div class="summary-section-head">
            <span>${title}</span>
            <span class="summary-count">${doneTasks.length}/${tasks.length}건 완료</span>
          </div>
          <ul class="summary-items">${items}</ul>
          ${pending > 0 ? `<div class="summary-pending">미완료 ${pending}건</div>` : ''}
        </div>`;
    };

    const fri = addDays(monday, 4);
    const rangeLabel = `${monday.getMonth() + 1}/${monday.getDate()} ~ ${fri.getMonth() + 1}/${fri.getDate()}`;
    const sectionsHtml = state.taskCategories.map((c, i) => section(`${i + 1}. ${c.label}`, weekTasks.filter(t => t.category === c.id))).join('');
    panel.innerHTML = `
      <div class="summary-panel-head">주간 업무 요약<span class="summary-range">(${rangeLabel}, 평일 기준 · 구분 미선택 업무는 제외)</span></div>
      ${sectionsHtml}
    `;
  }

  function computeTodaysAlarms() {
    const todayKey = dateStr(new Date());
    const hits = [];
    state.events.forEach(ev => {
      if (!ev.startDate || ev.alarmsOn === false) return;
      const eventDate = new Date(ev.startDate + 'T00:00:00');
      ALARM_DEFS.forEach(def => {
        if (!ev.alarms || !ev.alarms[def.key]) return;
        if (dateStr(def.apply(eventDate)) === todayKey) hits.push({ ev, def });
      });
    });
    return hits;
  }

  function renderAlarmBanner() {
    const el = document.getElementById('alarm-banner');
    const badge = document.getElementById('calendar-tab-badge');
    const hits = computeTodaysAlarms();
    if (hits.length === 0) {
      el.innerHTML = '';
      badge.classList.add('hidden');
      return;
    }
    badge.textContent = hits.length;
    badge.classList.remove('hidden');
    el.innerHTML = `
      <div class="alarm-banner">
        <div class="alarm-banner-title">오늘의 일정 알림 (${hits.length}건)</div>
        ${hits.map(h => {
          const type = eventTypeById(h.ev.type);
          const rangeSuffix = h.ev.endDate && h.ev.endDate !== h.ev.startDate ? ' ~ ' + h.ev.endDate : '';
          return `
          <div class="alarm-item">
            <span class="calendar-chip" style="cursor:default;background:${type.color}">${escapeHtml(type.label)}</span>
            <b>${escapeHtml(h.ev.title)}</b> — ${h.ev.startDate}${h.ev.startTime ? ' ' + h.ev.startTime : ''}${rangeSuffix} 예정 · <span class="alarm-lead">${h.def.label} 알림</span>
          </div>`;
        }).join('')}
      </div>`;
  }

  function renderUndatedEvents() {
    const list = document.getElementById('undated-events-list');
    const undated = state.events.filter(ev => !ev.startDate).sort((a, b) => a.createdAt - b.createdAt);
    if (undated.length === 0) {
      list.innerHTML = `<div class="empty-state">등록된 미정 업무가 없습니다.</div>`;
      return;
    }
    list.innerHTML = undated.map(ev => {
      const type = eventTypeById(ev.type);
      return `
      <div class="undated-row" data-id="${ev.id}">
        <span class="calendar-chip" style="cursor:default;background:${type.color}">${escapeHtml(type.label)}</span>
        <span class="undated-title">${escapeHtml(ev.title)}</span>
        <div class="undated-actions">
          <button class="btn small" data-act="edit-event">날짜/내용 수정</button>
          <button class="btn small" data-act="add-to-planner">내 일정에 추가</button>
          <button class="icon-btn" data-act="delete-event" title="삭제">${ICON.trash}</button>
        </div>
        ${ev.note ? `<div class="undated-note">${escapeHtml(ev.note)}</div>` : ''}
      </div>`;
    }).join('');
  }

  function renderCalendar() {
    const pointer = pointers.calendar;
    document.getElementById('calendar-title').textContent = fmtMonthly(pointer);

    const monthKey = monthStr(pointer);
    const monthEventCount = state.events.filter(ev => ev.startDate && ev.startDate.slice(0, 7) === monthKey).length;
    document.getElementById('calendar-summary').innerHTML = monthEventCount
      ? `이번 달 일정 <b>${monthEventCount}건</b>`
      : '';

    const eventsByDate = {};
    state.events.forEach(ev => {
      if (!ev.startDate) return;
      const start = new Date(ev.startDate + 'T00:00:00');
      const end = new Date((ev.endDate || ev.startDate) + 'T00:00:00');
      for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
        const key = dateStr(d);
        (eventsByDate[key] = eventsByDate[key] || []).push({
          ev,
          isStart: key === ev.startDate,
          isEnd: key === (ev.endDate || ev.startDate),
        });
      }
    });
    Object.values(eventsByDate).forEach(list => list.sort((a, b) => (a.ev.startTime || '99:99').localeCompare(b.ev.startTime || '99:99')));

    const todayKey = dateStr(new Date());
    const weekdayHeader = WEEKDAY_KR_MON.map(w => `<div class="calendar-weekday">${w}</div>`).join('');
    const cellsHtml = monthMatrix(pointer).map(cellDate => {
      const key = dateStr(cellDate);
      const outside = cellDate.getMonth() !== pointer.getMonth();
      const isToday = key === todayKey;
      const dayEvents = eventsByDate[key] || [];
      const shown = dayEvents.slice(0, 3);
      const extra = dayEvents.length - shown.length;
      const chips = shown.map(({ ev, isStart, isEnd }) => {
        const type = eventTypeById(ev.type);
        const segClass = isStart && isEnd ? '' : isStart ? 'seg-start' : isEnd ? 'seg-end' : 'seg-mid';
        const arrowPrefix = !isStart ? '‹ ' : '';
        const timeLabel = isStart && ev.startTime ? escapeHtml(ev.startTime) + ' ' : '';
        return `<div class="calendar-chip ${segClass}" style="background:${type.color}" data-act="open-event" data-id="${ev.id}" title="${escapeHtml(type.label)} · ${escapeHtml(ev.title)}">${arrowPrefix}${timeLabel}${escapeHtml(ev.title)}</div>`;
      }).join('');
      const more = extra > 0 ? `<div class="calendar-more" data-act="open-day" data-date="${key}">+${extra}개</div>` : '';
      return `
        <div class="calendar-cell ${outside ? 'outside' : ''} ${isToday ? 'today' : ''}">
          <div class="calendar-cell-head">
            <span class="calendar-day-num">${cellDate.getDate()}</span>
            <button class="calendar-add-btn" data-act="add-event-day" data-date="${key}" title="일정 추가">${ICON.plus}</button>
          </div>
          ${chips}
          ${more}
        </div>`;
    }).join('');

    document.getElementById('calendar-grid').innerHTML = weekdayHeader + cellsHtml;

    renderUndatedEvents();
    renderAlarmBanner();
  }

  function renderAll() {
    renderKpis();
    renderPlanner('daily');
    renderPlanner('weekly');
    renderWeeklySummaryPanel();
    renderPlanner('monthly');
    renderCalendar();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ---------- modal ----------
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');

  function openModal(html, onMount, extraClass) {
    modal.className = 'modal' + (extraClass ? ' ' + extraClass : '');
    modal.innerHTML = html;
    overlay.classList.remove('hidden');
    if (onMount) onMount(modal);
    const first = modal.querySelector('input, textarea, select');
    if (first) first.focus();
  }
  function closeModal() {
    overlay.classList.add('hidden');
    modal.innerHTML = '';
  }
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeModal();
    confirmOverlay.classList.add('hidden');
  });

  // ---------- custom confirm / toast ----------
  // Native confirm()/alert() are silently blocked when this page is embedded in a
  // sandboxed iframe without "allow-modals" (e.g. published as a web link), so we
  // use our own in-app dialogs instead — these work the same everywhere.
  const confirmOverlay = document.getElementById('confirm-overlay');
  const confirmBox = document.getElementById('confirm-box');

  function openConfirmDialog(message, opts) {
    opts = opts || {};
    const confirmLabel = opts.confirmLabel || '확인';
    const cancelLabel = opts.cancelLabel || '취소';
    const showCancel = opts.showCancel !== false;
    const danger = !!opts.danger;
    confirmBox.innerHTML = `
      <p class="confirm-message">${escapeHtml(message)}</p>
      <div class="confirm-actions">
        ${showCancel ? `<button type="button" class="btn" data-act="confirm-cancel">${escapeHtml(cancelLabel)}</button>` : ''}
        <button type="button" class="btn ${danger ? 'danger' : 'primary'}" data-act="confirm-ok">${escapeHtml(confirmLabel)}</button>
      </div>`;
    confirmOverlay.classList.remove('hidden');
    const close = () => confirmOverlay.classList.add('hidden');
    const cancelBtn = confirmBox.querySelector('[data-act="confirm-cancel"]');
    if (cancelBtn) cancelBtn.addEventListener('click', close);
    confirmBox.querySelector('[data-act="confirm-ok"]').addEventListener('click', () => {
      close();
      if (opts.onConfirm) opts.onConfirm();
    });
  }
  confirmOverlay.addEventListener('click', e => { if (e.target === confirmOverlay) confirmOverlay.classList.add('hidden'); });

  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast hidden';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 2800);
  }

  function openKpiModal(existing) {
    const isEdit = !!existing;
    const thisYear = new Date().getFullYear();
    openModal(`
      <h2>${isEdit ? 'KPI 수정' : '새 KPI 등록'}</h2>
      <form id="kpi-form">
        <div class="field">
          <label>제목</label>
          <input type="text" name="title" required value="${isEdit ? escapeHtml(existing.title) : ''}" placeholder="예: 신규 고객 30% 증가">
        </div>
        <div class="field">
          <label>목표 연도</label>
          <input type="number" name="year" required value="${isEdit ? existing.year : thisYear}">
        </div>
        <div class="field">
          <label>가중치 (%) — 전체 KPI 중 이 KPI의 비중, 선택사항</label>
          <input type="number" name="weight" min="0" max="100" step="0.1" value="${isEdit && existing.weight != null ? existing.weight : ''}" placeholder="예: 25">
        </div>
        <div class="field">
          <label>설명 (선택)</label>
          <textarea name="description" placeholder="세부 목표나 지표를 적어두세요">${isEdit ? escapeHtml(existing.description || '') : ''}</textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn" data-act="cancel">취소</button>
          <button type="submit" class="btn primary">${isEdit ? '저장' : '등록'}</button>
        </div>
      </form>
    `, (root) => {
      root.querySelector('[data-act="cancel"]').addEventListener('click', closeModal);
      root.querySelector('#kpi-form').addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const title = fd.get('title').trim();
        if (!title) return;
        const weight = fd.get('weight') !== '' ? Number(fd.get('weight')) : null;
        if (isEdit) {
          existing.title = title;
          existing.year = Number(fd.get('year'));
          existing.weight = weight;
          existing.description = fd.get('description').trim();
        } else {
          state.kpis.push({
            id: uid(),
            title,
            year: Number(fd.get('year')),
            weight,
            description: fd.get('description').trim(),
            mode: 'auto',
            progress: 0,
            records: [],
            rubric: null,
            createdAt: Date.now(),
          });
        }
        saveState();
        closeModal();
        renderAll();
      });
    });
  }

  function recordsModalHtml(kpi, editingId) {
    const records = [...(kpi.records || [])].sort((a, b) => b.date.localeCompare(a.date));
    const editing = editingId ? kpi.records.find(r => r.id === editingId) : null;
    return `
      <h2>실적 기록 - ${escapeHtml(kpi.title)}</h2>
      <div class="records-list">
        ${records.length ? records.map(r => `
          <div class="record-row ${r.id === editingId ? 'editing' : ''}" data-id="${r.id}">
            <div class="record-main">
              <span class="record-date">${r.date}</span>
              <span class="record-value">${escapeHtml(r.value)}</span>
            </div>
            ${r.note ? `<div class="record-note">${escapeHtml(r.note)}</div>` : ''}
            <button class="icon-btn" data-act="delete-record" title="삭제">${ICON.trash}</button>
          </div>`).join('') : `<div class="empty-state">등록된 실적이 없습니다.</div>`}
      </div>
      ${records.length ? `<div class="field-hint" style="margin-bottom:8px">실적을 클릭하면 내용을 수정할 수 있습니다.</div>` : ''}
      <div class="section-divider"></div>
      <form id="record-form">
        <div class="field"><label>날짜</label><input type="date" name="date" required value="${editing ? editing.date : dateStr(new Date())}"></div>
        <div class="field"><label>실적 내용</label><input type="text" name="value" required placeholder="예: 수율 97.2% 달성" value="${editing ? escapeHtml(editing.value) : ''}"></div>
        <div class="field"><label>메모 (선택)</label><textarea name="note" placeholder="세부 내용">${editing ? escapeHtml(editing.note || '') : ''}</textarea></div>
        <div class="modal-actions">
          <button type="button" class="btn" data-act="close">닫기</button>
          ${editing ? `<button type="button" class="btn" data-act="cancel-edit">수정 취소</button>` : ''}
          <button type="submit" class="btn primary">${editing ? '실적 수정 저장' : '실적 추가'}</button>
        </div>
      </form>`;
  }

  function openRecordsModal(kpi) {
    if (!kpi.records) kpi.records = [];
    let editingId = null;
    function render() {
      openModal(recordsModalHtml(kpi, editingId), root => {
        root.querySelector('[data-act="close"]').addEventListener('click', closeModal);
        const cancelEditBtn = root.querySelector('[data-act="cancel-edit"]');
        if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => { editingId = null; render(); });
        root.querySelectorAll('.record-row').forEach(row => {
          row.addEventListener('click', e => {
            if (e.target.closest('[data-act="delete-record"]')) return;
            editingId = row.dataset.id;
            render();
          });
        });
        root.querySelectorAll('[data-act="delete-record"]').forEach(btn => btn.addEventListener('click', e => {
          e.stopPropagation();
          const row = btn.closest('.record-row');
          openConfirmDialog('이 실적 기록을 삭제할까요?', { danger: true, confirmLabel: '삭제', onConfirm: () => {
            kpi.records = kpi.records.filter(r => r.id !== row.dataset.id);
            if (editingId === row.dataset.id) editingId = null;
            saveState();
            renderKpis();
            render();
          }});
        }));
        root.querySelector('#record-form').addEventListener('submit', e => {
          e.preventDefault();
          const fd = new FormData(e.target);
          if (editingId) {
            const r = kpi.records.find(x => x.id === editingId);
            if (r) {
              r.date = fd.get('date');
              r.value = fd.get('value').trim();
              r.note = fd.get('note').trim();
            }
            editingId = null;
          } else {
            kpi.records.push({ id: uid(), date: fd.get('date'), value: fd.get('value').trim(), note: fd.get('note').trim(), createdAt: Date.now() });
          }
          saveState();
          renderKpis();
          render();
        });
      });
    }
    render();
  }

  function rubricModalHtml(kpi) {
    const rubric = kpi.rubric;
    const grades = rubric.grades;
    const N = grades.length;
    const res = computeRubricResult(rubric);
    return `
      <h2>평가 등급표 - ${escapeHtml(kpi.title)}</h2>
      <div class="rubric-section">
        <div class="rubric-section-head">등급 (좋음 → 나쁨 순, 이름은 자유롭게 바꿀 수 있어요)</div>
        <div class="rubric-chip-list">
          ${grades.map((g, i) => `
            <div class="rubric-chip" style="border-color:${gradeColor(i, N)}">
              <input type="text" class="rubric-chip-input" data-field="grade-name" data-id="${g.id}" value="${escapeHtml(g.name)}">
              <span class="rubric-chip-btns">
                <button type="button" data-act="grade-up" data-id="${g.id}" title="앞으로" ${i === 0 ? 'disabled' : ''}>${ICON.chevU}</button>
                <button type="button" data-act="grade-down" data-id="${g.id}" title="뒤로" ${i === grades.length - 1 ? 'disabled' : ''}>${ICON.chevD}</button>
                <button type="button" data-act="grade-remove" data-id="${g.id}" title="삭제">${ICON.close}</button>
              </span>
            </div>`).join('')}
        </div>
        <button type="button" class="btn small" data-act="add-grade">+ 등급 추가</button>
      </div>

      <div class="rubric-section">
        <div class="rubric-section-head">평가 기준 (행마다 등급 하나를 클릭해서 선택하세요)</div>
        <div class="rubric-table-wrap">
          <table class="rubric-table">
            <thead>
              <tr>
                <th>기준</th>
                ${grades.map((g, i) => `<th style="color:${gradeColor(i, N)}">${escapeHtml(g.name)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${rubric.criteria.map(c => `
                <tr>
                  <td>
                    <input type="text" class="rubric-crit-label" data-id="${c.id}" value="${escapeHtml(c.label)}">
                    <input type="number" class="rubric-crit-weight" data-id="${c.id}" min="0" step="0.1" placeholder="배점%" value="${c.weight != null ? c.weight : ''}">
                  </td>
                  ${grades.map((g, i) => `
                    <td class="rubric-cell ${c.selected === g.id ? 'selected' : ''}" style="${c.selected === g.id ? `border-color:${gradeColor(i, N)};background:${gradeColor(i, N)}22` : ''}">
                      <textarea class="rubric-cell-text" data-crit="${c.id}" data-grade="${g.id}" placeholder="기준 내용">${escapeHtml(c.cells[g.id] || '')}</textarea>
                      <button type="button" class="rubric-select-btn" data-act="select-cell" data-crit="${c.id}" data-grade="${g.id}" style="background:${gradeColor(i, N)}">${c.selected === g.id ? '선택됨' : '선택'}</button>
                    </td>`).join('')}
                  <td><button type="button" class="icon-btn" data-act="remove-criterion" data-id="${c.id}" title="삭제">${ICON.trash}</button></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <button type="button" class="btn small" data-act="add-criterion" style="margin-top:10px">+ 평가 기준 추가</button>
        ${(() => {
          const weightSum = Math.round(rubric.criteria.reduce((a, c) => a + (c.weight || 0), 0) * 100) / 100;
          if (kpi.weight != null) {
            const ok = Math.abs(weightSum - kpi.weight) < 0.01;
            return `<div class="rubric-weight-check ${ok ? 'ok' : 'warn'}">평가 기준 배점 합계: ${weightSum}% / KPI 가중치: ${kpi.weight}%${ok ? ' ✓' : ' — 합계를 KPI 가중치와 맞추면 더 정확해요'}</div>`;
          }
          return `<div class="rubric-weight-check">평가 기준 배점 합계: ${weightSum}% (KPI 수정에서 가중치를 설정하면 목표 합계를 알려드려요)</div>`;
        })()}
      </div>

      <div class="rubric-result">
        ${res && res.grade
          ? `종합 등급: <span class="rubric-grade-badge" style="background:${res.color}">${escapeHtml(res.grade.name)}</span><span class="rubric-result-detail">평균 ${res.avg.toFixed(2)}점 · 평가 ${res.count}/${res.total}개 기준 선택됨</span>`
          : `<span class="rubric-result-detail">아직 선택된 평가 기준이 없습니다.</span>`}
      </div>
      <div class="modal-actions">
        <button type="button" class="btn primary" data-act="close">닫기</button>
      </div>
    `;
  }

  function openRubricModal(kpi) {
    if (!kpi.rubric) kpi.rubric = defaultRubric();
    function render() {
      openModal(rubricModalHtml(kpi), root => {
        root.querySelector('[data-act="close"]').addEventListener('click', () => { closeModal(); renderKpis(); });
        root.querySelector('[data-act="add-grade"]').addEventListener('click', () => {
          kpi.rubric.grades.push({ id: uid(), name: '새 등급' });
          saveState(); render();
        });
        root.querySelectorAll('[data-act="grade-remove"]').forEach(btn => btn.addEventListener('click', () => {
          if (kpi.rubric.grades.length <= 1) { showToast('등급은 최소 1개 이상 있어야 합니다.'); return; }
          const id = btn.dataset.id;
          openConfirmDialog('이 등급을 삭제할까요?', { danger: true, confirmLabel: '삭제', onConfirm: () => {
            kpi.rubric.grades = kpi.rubric.grades.filter(g => g.id !== id);
            kpi.rubric.criteria.forEach(c => { delete c.cells[id]; if (c.selected === id) c.selected = null; });
            saveState(); render();
          }});
        }));
        root.querySelectorAll('[data-act="grade-up"]').forEach(btn => btn.addEventListener('click', () => {
          const idx = kpi.rubric.grades.findIndex(g => g.id === btn.dataset.id);
          if (idx > 0) { const [g] = kpi.rubric.grades.splice(idx, 1); kpi.rubric.grades.splice(idx - 1, 0, g); saveState(); render(); }
        }));
        root.querySelectorAll('[data-act="grade-down"]').forEach(btn => btn.addEventListener('click', () => {
          const idx = kpi.rubric.grades.findIndex(g => g.id === btn.dataset.id);
          if (idx < kpi.rubric.grades.length - 1) { const [g] = kpi.rubric.grades.splice(idx, 1); kpi.rubric.grades.splice(idx + 1, 0, g); saveState(); render(); }
        }));
        root.querySelectorAll('[data-field="grade-name"]').forEach(inp => inp.addEventListener('input', () => {
          const g = kpi.rubric.grades.find(x => x.id === inp.dataset.id);
          if (g) { g.name = inp.value; saveState(); }
        }));
        root.querySelector('[data-act="add-criterion"]').addEventListener('click', () => {
          kpi.rubric.criteria.push({ id: uid(), label: '새 평가 기준', cells: {}, selected: null, weight: null });
          saveState(); render();
        });
        root.querySelectorAll('[data-act="remove-criterion"]').forEach(btn => btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          openConfirmDialog('이 평가 기준을 삭제할까요?', { danger: true, confirmLabel: '삭제', onConfirm: () => {
            kpi.rubric.criteria = kpi.rubric.criteria.filter(c => c.id !== id);
            saveState(); render();
          }});
        }));
        root.querySelectorAll('.rubric-crit-label').forEach(inp => inp.addEventListener('input', () => {
          const c = kpi.rubric.criteria.find(x => x.id === inp.dataset.id);
          if (c) { c.label = inp.value; saveState(); }
        }));
        root.querySelectorAll('.rubric-crit-weight').forEach(inp => inp.addEventListener('change', () => {
          const c = kpi.rubric.criteria.find(x => x.id === inp.dataset.id);
          if (c) { c.weight = inp.value === '' ? null : Number(inp.value); saveState(); render(); }
        }));
        root.querySelectorAll('.rubric-cell-text').forEach(ta => ta.addEventListener('input', () => {
          const c = kpi.rubric.criteria.find(x => x.id === ta.dataset.crit);
          if (c) { c.cells[ta.dataset.grade] = ta.value; saveState(); }
        }));
        root.querySelectorAll('[data-act="select-cell"]').forEach(btn => btn.addEventListener('click', () => {
          const c = kpi.rubric.criteria.find(x => x.id === btn.dataset.crit);
          if (c) { c.selected = (c.selected === btn.dataset.grade) ? null : btn.dataset.grade; saveState(); render(); }
        }));
      }, 'modal-wide');
    }
    render();
  }

  function openTaskModal(planType, existingTask) {
    const isEdit = !!existingTask;
    const pointer = pointers[planType];
    const label = planType === 'daily' ? fmtDaily(pointer) : planType === 'weekly' ? fmtWeekly(mondayOf(pointer)) : fmtMonthly(pointer);
    const typeLabel = { daily: '일간', weekly: '주간', monthly: '월간' }[planType];
    const kpiOptions = state.kpis.map(k => `<option value="${k.id}" ${isEdit && existingTask.kpiId === k.id ? 'selected' : ''}>${escapeHtml(k.title)}</option>`).join('');

    let dateFieldHtml = '';
    if (isEdit) {
      if (planType === 'daily') {
        dateFieldHtml = `<div class="field"><label>날짜</label><input type="date" name="rescheduleDate" value="${existingTask.scopeKey}"></div>`;
      } else if (planType === 'weekly') {
        dateFieldHtml = `<div class="field"><label>주 (해당 주의 아무 날짜나 선택)</label><input type="date" name="rescheduleDate" value="${existingTask.scopeKey}"></div>`;
      } else {
        dateFieldHtml = `<div class="field"><label>월</label><input type="month" name="rescheduleMonth" value="${existingTask.scopeKey}"></div>`;
      }
    }

    const categoryOptions = state.taskCategories.map(c => `<option value="${c.id}" ${isEdit && existingTask.category === c.id ? 'selected' : ''}>${escapeHtml(c.label)}</option>`).join('');
    const commonFields = `
        <div class="field">
          <label>우선순위 (숫자, 작을수록 먼저 표시 · 목록에서 드래그로도 바꿀 수 있어요)</label>
          <input type="number" name="priority" min="1" value="${isEdit ? (existingTask.priority ?? defaultNextPriority(planType)) : defaultNextPriority(planType)}">
        </div>
        <div class="field">
          <label>구분 (선택)</label>
          <div style="display:flex;gap:8px;align-items:center">
            <select name="category" style="flex:1">
              <option value="" ${(!isEdit || !existingTask.category) ? 'selected' : ''}>선택 안 함</option>
              ${categoryOptions}
            </select>
            <button type="button" class="btn small" data-act="manage-categories">구분 관리</button>
          </div>
          <div class="field-hint">구분을 선택하지 않으면 금요일 주간 업무 요약에는 표시되지 않습니다.</div>
        </div>`;

    const recurrenceOptionsByType = {
      daily: `<option value="none">반복 없음</option><option value="daily">매일 반복 (30일)</option><option value="weekly">매주 반복 (같은 요일, 12주)</option>`,
      weekly: `<option value="none">반복 없음</option><option value="weekly">매주 반복 (12주)</option>`,
      monthly: `<option value="none">반복 없음</option><option value="monthly">매월 반복 (6개월)</option>`,
    };
    const recurrenceField = !isEdit ? `
        <div class="field">
          <label>반복</label>
          <select name="recurrence">${recurrenceOptionsByType[planType]}</select>
        </div>` : '';

    openModal(`
      <h2>${isEdit ? '업무 수정' : `${typeLabel} 할 일 추가`}</h2>
      <form id="task-form">
        <div class="field">
          <label>제목</label>
          <input type="text" name="title" required value="${isEdit ? escapeHtml(existingTask.title) : ''}" placeholder="할 일을 입력하세요">
        </div>
        <div class="field">
          <label>연결할 KPI (선택)</label>
          <select name="kpiId">
            <option value="">연결 안 함</option>
            ${kpiOptions}
          </select>
        </div>
        <div class="field">
          <label>메모 (선택)</label>
          <textarea name="note" placeholder="세부 내용이나 참고사항을 적어두세요">${isEdit ? escapeHtml(existingTask.note || '') : ''}</textarea>
        </div>
        <div class="field">
          <label>목표 시간 (선택, ~까지 완료)</label>
          <input type="time" name="dueTime" value="${isEdit ? (existingTask.dueTime || '') : ''}">
        </div>
        ${commonFields}
        ${dateFieldHtml}
        ${recurrenceField}
        ${!isEdit ? `<div class="field-hint">${label}에 추가됩니다.</div>` : ''}
        <div class="modal-actions" style="justify-content:space-between">
          ${isEdit ? `<button type="button" class="btn danger" data-act="delete">삭제</button>` : '<span></span>'}
          <div style="display:flex;gap:8px">
            <button type="button" class="btn" data-act="cancel">취소</button>
            <button type="submit" class="btn primary">${isEdit ? '저장' : '추가'}</button>
          </div>
        </div>
      </form>
    `, (root) => {
      root.querySelector('[data-act="cancel"]').addEventListener('click', closeModal);
      root.querySelector('[data-act="manage-categories"]').addEventListener('click', () => openTaskCategoryModal());
      if (isEdit) {
        root.querySelector('[data-act="delete"]').addEventListener('click', () => {
          openConfirmDialog('이 업무를 삭제할까요?', { danger: true, confirmLabel: '삭제', onConfirm: () => {
            state.tasks = state.tasks.filter(t => t.id !== existingTask.id);
            saveState();
            closeModal();
            renderAll();
          }});
        });
      }
      root.querySelector('#task-form').addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const title = fd.get('title').trim();
        if (!title) return;

        if (isEdit) {
          existingTask.title = title;
          existingTask.kpiId = fd.get('kpiId') || null;
          existingTask.note = fd.get('note').trim();
          existingTask.dueTime = fd.get('dueTime') || null;
          existingTask.priority = Number(fd.get('priority')) || 1;
          existingTask.category = fd.get('category') || null;
          if (planType === 'daily') {
            const dv = fd.get('rescheduleDate');
            if (dv && dv !== existingTask.scopeKey) { existingTask.scopeKey = dv; existingTask.carriedFrom = null; }
          } else if (planType === 'weekly') {
            const dv = fd.get('rescheduleDate');
            if (dv) {
              const newScope = dateStr(mondayOf(new Date(dv + 'T00:00:00')));
              if (newScope !== existingTask.scopeKey) { existingTask.scopeKey = newScope; existingTask.carriedFrom = null; }
            }
          } else {
            const mv = fd.get('rescheduleMonth');
            if (mv && mv !== existingTask.scopeKey) { existingTask.scopeKey = mv; existingTask.carriedFrom = null; }
          }
          saveState();
          closeModal();
          renderAll();
          return;
        }

        let scopeKey;
        if (planType === 'daily') scopeKey = dateStr(pointer);
        else if (planType === 'weekly') scopeKey = dateStr(mondayOf(pointer));
        else scopeKey = monthStr(pointer);

        const base = {
          id: uid(),
          title,
          kpiId: fd.get('kpiId') || null,
          note: fd.get('note').trim(),
          dueTime: fd.get('dueTime') || null,
          planType,
          scopeKey,
          done: false,
          priority: Number(fd.get('priority')) || defaultNextPriority(planType),
          category: fd.get('category') || null,
          createdAt: Date.now(),
        };

        const recurrence = fd.get('recurrence') || 'none';
        const newTasks = [base];
        if (recurrence !== 'none') {
          const recurrenceId = uid();
          base.recurrenceId = recurrenceId;
          const extra = generateRecurrences(base, planType, recurrence, pointer);
          extra.forEach(t => { t.recurrenceId = recurrenceId; });
          newTasks.push(...extra);
        }
        state.tasks.push(...newTasks);
        saveState();
        closeModal();
        renderAll();
      });
    });
  }

  function openSplitSuggestModal(sourceType, task) {
    const targetType = sourceType === 'monthly' ? 'weekly' : 'daily';
    let options;
    if (sourceType === 'monthly') {
      const [y, m] = task.scopeKey.split('-').map(Number);
      const first = new Date(y, m - 1, 1);
      const last = new Date(y, m, 0);
      const mondayKeys = [];
      for (let d = new Date(first); d <= last; d = addDays(d, 1)) {
        const mon = dateStr(mondayOf(d));
        if (!mondayKeys.includes(mon)) mondayKeys.push(mon);
      }
      options = mondayKeys.map((mon, i) => ({ key: mon, label: `${i + 1}주차 (${fmtWeekly(new Date(mon + 'T00:00:00'))})` }));
    } else {
      const monday = mondayOf(new Date(task.scopeKey + 'T00:00:00'));
      options = [0, 1, 2, 3, 4].map(i => {
        const d = addDays(monday, i);
        return { key: dateStr(d), label: `${WEEKDAY_KR[d.getDay()]}요일 (${d.getMonth() + 1}/${d.getDate()})` };
      });
    }
    openModal(`
      <h2>${targetType === 'weekly' ? '주간' : '일간'}에 나눠 담기 추천</h2>
      <div class="field-hint" style="margin-bottom:14px">"${escapeHtml(task.title)}"을(를) 아래에 나눠 등록합니다. (규칙 기반 자동 분배이며, 실제 업무량을 분석한 결과는 아닙니다. 필요한 항목만 선택하세요.)</div>
      <form id="split-form">
        ${options.map(o => `<label class="checkbox-label" style="margin-bottom:10px"><input type="checkbox" name="opt" value="${o.key}" checked> ${o.label}</label><br>`).join('')}
        <div class="modal-actions">
          <button type="button" class="btn" data-act="cancel">취소</button>
          <button type="submit" class="btn primary">등록</button>
        </div>
      </form>
    `, (root) => {
      root.querySelector('[data-act="cancel"]').addEventListener('click', closeModal);
      root.querySelector('#split-form').addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const chosen = fd.getAll('opt');
        chosen.forEach(scopeKey => {
          state.tasks.push({
            id: uid(),
            title: task.title,
            kpiId: task.kpiId || null,
            planType: targetType,
            scopeKey,
            done: false,
            priority: defaultNextPriorityFor(targetType, scopeKey),
            category: null,
            createdAt: Date.now(),
          });
        });
        saveState();
        closeModal();
        renderAll();
      });
    });
  }

  function openEventModal(existing, prefillDateKey) {
    const isEdit = !!existing;
    const startDateVal = isEdit ? (existing.startDate || '') : (prefillDateKey || '');
    const endDateVal = isEdit ? (existing.endDate || existing.startDate || '') : (prefillDateKey || '');
    const isUndated = isEdit ? !existing.startDate : false;
    const alarms = (isEdit && existing.alarms) || { m1: true, w2: true, w1: true, d3: true, d1: true };
    const alarmsOn = isEdit ? existing.alarmsOn !== false : true;
    const typeVal = isEdit ? existing.type : (state.eventTypes[0] && state.eventTypes[0].id);
    const typeOptions = state.eventTypes.map(t => `<option value="${t.id}" ${typeVal === t.id ? 'selected' : ''}>${escapeHtml(t.label)}</option>`).join('');

    openModal(`
      <h2>${isEdit ? '일정 수정' : '새 일정 추가'}</h2>
      <form id="event-form">
        <div class="field">
          <label>제목</label>
          <input type="text" name="title" required value="${isEdit ? escapeHtml(existing.title) : ''}" placeholder="예: OO동 소방설비 공사">
        </div>
        <div class="field">
          <label>구분</label>
          <div style="display:flex;gap:8px;align-items:center">
            <select name="type" style="flex:1">${typeOptions}</select>
            <button type="button" class="btn small" data-act="manage-types">구분 관리</button>
          </div>
        </div>
        <div class="field">
          <label class="checkbox-label"><input type="checkbox" name="undated" id="ev-undated" ${isUndated ? 'checked' : ''}> 날짜 미정 (장기 준비 업무로 등록)</label>
        </div>
        <div class="field ${isUndated ? 'hidden' : ''}" id="ev-date-field">
          <label>시작일</label>
          <input type="date" name="startDate" value="${startDateVal}">
          <label style="margin-top:8px">종료일 (선택, 여러 날 지속되는 일정만)</label>
          <input type="date" name="endDate" value="${endDateVal}">
        </div>
        <div class="field ${isUndated ? 'hidden' : ''}" id="ev-time-field">
          <label>시작 시간 (선택)</label>
          <input type="time" name="startTime" value="${isEdit ? (existing.startTime || '') : ''}">
          <label style="margin-top:8px">종료 시간 (선택)</label>
          <input type="time" name="endTime" value="${isEdit ? (existing.endTime || '') : ''}">
        </div>
        <div class="field">
          <label>메모 (선택)</label>
          <textarea name="note" placeholder="세부 내용을 적어두세요">${isEdit ? escapeHtml(existing.note || '') : ''}</textarea>
        </div>
        <div class="field ${isUndated ? 'hidden' : ''}" id="ev-alarm-field">
          <label class="checkbox-label"><input type="checkbox" name="alarmsOn" id="ev-alarms-on" ${alarmsOn ? 'checked' : ''}> 알람 사용</label>
          <div class="alarm-checks">
            ${ALARM_DEFS.map(def => `
              <label class="checkbox-label small"><input type="checkbox" name="alarm-${def.key}" ${alarms[def.key] !== false ? 'checked' : ''}> ${def.label}</label>
            `).join('')}
          </div>
        </div>
        <div class="modal-actions" style="justify-content:space-between">
          ${isEdit ? `<button type="button" class="btn danger" data-act="delete">삭제</button>` : '<span></span>'}
          <div style="display:flex;gap:8px">
            <button type="button" class="btn" data-act="cancel">취소</button>
            ${isEdit ? `<button type="button" class="btn" data-act="add-to-planner">내 일정에 추가</button>` : ''}
            <button type="submit" class="btn primary">${isEdit ? '저장' : '등록'}</button>
          </div>
        </div>
      </form>
    `, (root) => {
      const undatedCb = root.querySelector('#ev-undated');
      const dateField = root.querySelector('#ev-date-field');
      const timeField = root.querySelector('#ev-time-field');
      const alarmField = root.querySelector('#ev-alarm-field');
      undatedCb.addEventListener('change', () => {
        dateField.classList.toggle('hidden', undatedCb.checked);
        timeField.classList.toggle('hidden', undatedCb.checked);
        alarmField.classList.toggle('hidden', undatedCb.checked);
      });
      root.querySelector('[data-act="manage-types"]').addEventListener('click', () => openEventTypeModal());
      root.querySelector('[data-act="cancel"]').addEventListener('click', closeModal);
      if (isEdit) {
        root.querySelector('[data-act="delete"]').addEventListener('click', () => {
          openConfirmDialog(`"${existing.title}" 일정을 삭제할까요?`, { danger: true, confirmLabel: '삭제', onConfirm: () => {
            state.events = state.events.filter(x => x.id !== existing.id);
            saveState();
            closeModal();
            renderCalendar();
          }});
        });
        root.querySelector('[data-act="add-to-planner"]').addEventListener('click', () => {
          closeModal();
          openAddToPlannerModal(existing);
        });
      }
      root.querySelector('#event-form').addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const title = fd.get('title').trim();
        if (!title) return;
        const undated = fd.get('undated') === 'on';
        const startDate = undated ? null : (fd.get('startDate') || null);
        let endDate = undated ? null : (fd.get('endDate') || startDate);
        if (!undated && !startDate) { showToast('시작일을 입력하거나 "날짜 미정"을 선택하세요.'); return; }
        if (!undated && endDate < startDate) { showToast('종료일은 시작일보다 빠를 수 없습니다.'); return; }
        const newAlarms = {};
        ALARM_DEFS.forEach(def => { newAlarms[def.key] = fd.get(`alarm-${def.key}`) === 'on'; });
        const payload = {
          title,
          type: fd.get('type'),
          startDate,
          endDate,
          startTime: undated ? null : (fd.get('startTime') || null),
          endTime: undated ? null : (fd.get('endTime') || null),
          note: fd.get('note').trim(),
          alarmsOn: fd.get('alarmsOn') === 'on',
          alarms: newAlarms,
        };
        if (isEdit) {
          Object.assign(existing, payload);
        } else {
          state.events.push({ id: uid(), ...payload, createdAt: Date.now() });
        }
        saveState();
        closeModal();
        renderCalendar();
      });
    });
  }

  function openDayEventsModal(dateKey) {
    const evs = state.events.filter(e => e.startDate && dateKey >= e.startDate && dateKey <= (e.endDate || e.startDate))
      .sort((a, b) => (a.startTime || '99:99').localeCompare(b.startTime || '99:99'));
    const d = new Date(dateKey + 'T00:00:00');
    const label = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEKDAY_KR[d.getDay()]})`;
    openModal(`
      <h2>${label} 일정</h2>
      <div class="day-events-list">
        ${evs.map(ev => {
          const type = eventTypeById(ev.type);
          return `
          <div class="day-event-row" data-id="${ev.id}">
            <span class="calendar-chip" style="cursor:default;background:${type.color}">${escapeHtml(type.label)}</span>
            ${ev.startTime ? `<span class="summary-date">${ev.startTime}${ev.endTime ? '~' + ev.endTime : ''}</span>` : ''}
            <span class="task-title">${escapeHtml(ev.title)}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="modal-actions">
        <button type="button" class="btn" data-act="close">닫기</button>
        <button type="button" class="btn primary" data-act="add">+ 일정 추가</button>
      </div>
    `, (root) => {
      root.querySelector('[data-act="close"]').addEventListener('click', closeModal);
      root.querySelector('[data-act="add"]').addEventListener('click', () => { closeModal(); openEventModal(null, dateKey); });
      root.querySelectorAll('.day-event-row').forEach(row => {
        row.addEventListener('click', () => {
          const ev = state.events.find(x => x.id === row.dataset.id);
          closeModal();
          if (ev) openEventModal(ev);
        });
      });
    });
  }

  function openAddToPlannerModal(ev) {
    const todayKey = dateStr(new Date());
    const defaultDate = ev.startDate || todayKey;
    const defaultMonth = (ev.startDate || todayKey).slice(0, 7);
    openModal(`
      <h2>내 일정에 추가</h2>
      <form id="add-to-planner-form">
        <div class="field-hint" style="margin-bottom:14px">"${escapeHtml(ev.title)}"을(를) 추가할 위치를 선택하세요.</div>
        <div class="field">
          <label>추가할 위치</label>
          <select name="planType" id="atp-plantype">
            <option value="daily">일간</option>
            <option value="weekly">주간</option>
            <option value="monthly">월간</option>
          </select>
        </div>
        <div class="field" id="atp-date-field">
          <label>날짜</label>
          <input type="date" name="date" value="${defaultDate}">
        </div>
        <div class="field hidden" id="atp-month-field">
          <label>월</label>
          <input type="month" name="month" value="${defaultMonth}">
        </div>
        <div class="modal-actions">
          <button type="button" class="btn" data-act="cancel">취소</button>
          <button type="submit" class="btn primary">추가</button>
        </div>
      </form>
    `, (root) => {
      const typeSel = root.querySelector('#atp-plantype');
      const dateField = root.querySelector('#atp-date-field');
      const monthField = root.querySelector('#atp-month-field');
      typeSel.addEventListener('change', () => {
        const isMonthly = typeSel.value === 'monthly';
        dateField.classList.toggle('hidden', isMonthly);
        monthField.classList.toggle('hidden', !isMonthly);
      });
      root.querySelector('[data-act="cancel"]').addEventListener('click', closeModal);
      root.querySelector('#add-to-planner-form').addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const planType = fd.get('planType');
        let scopeKey;
        if (planType === 'monthly') {
          scopeKey = fd.get('month');
          if (!scopeKey) return;
        } else {
          const dateVal = fd.get('date');
          if (!dateVal) return;
          scopeKey = planType === 'weekly' ? dateStr(mondayOf(new Date(dateVal + 'T00:00:00'))) : dateVal;
        }
        state.tasks.push({
          id: uid(),
          title: ev.title,
          kpiId: null,
          planType,
          scopeKey,
          done: false,
          priority: defaultNextPriorityFor(planType, scopeKey),
          category: null,
          createdAt: Date.now(),
        });
        saveState();
        closeModal();
        renderAll();
      });
    });
  }

  // ---------- tag managers (event types / task categories) ----------
  function tagManagerModalHtml(title, list) {
    return `
      <h2>${escapeHtml(title)}</h2>
      <div class="type-manage-list">
        ${list.map(t => `
          <div class="type-manage-row" data-id="${t.id}">
            <input type="color" class="type-color-input" data-id="${t.id}" value="${t.color}">
            <input type="text" class="type-label-input" data-id="${t.id}" value="${escapeHtml(t.label)}">
            <button type="button" class="icon-btn" data-act="remove-tag" data-id="${t.id}" title="삭제">${ICON.trash}</button>
          </div>`).join('')}
      </div>
      <button type="button" class="btn small" data-act="add-tag">+ 항목 추가</button>
      <div class="modal-actions">
        <button type="button" class="btn primary" data-act="close">닫기</button>
      </div>`;
  }
  function openTagManagerModal(title, list, onClose) {
    function render() {
      openModal(tagManagerModalHtml(title, list), root => {
        root.querySelector('[data-act="close"]').addEventListener('click', () => { closeModal(); onClose(); });
        root.querySelector('[data-act="add-tag"]').addEventListener('click', () => {
          list.push({ id: uid(), label: '새 항목', color: PALETTE[list.length % PALETTE.length] });
          saveState(); render();
        });
        root.querySelectorAll('[data-act="remove-tag"]').forEach(btn => btn.addEventListener('click', () => {
          if (list.length <= 1) { showToast('최소 1개 이상 있어야 합니다.'); return; }
          const id = btn.dataset.id;
          openConfirmDialog('이 항목을 삭제할까요?', { danger: true, confirmLabel: '삭제', onConfirm: () => {
            const idx = list.findIndex(x => x.id === id);
            if (idx !== -1) list.splice(idx, 1);
            saveState(); render();
          }});
        }));
        root.querySelectorAll('.type-label-input').forEach(inp => inp.addEventListener('input', () => {
          const t = list.find(x => x.id === inp.dataset.id);
          if (t) { t.label = inp.value; saveState(); }
        }));
        root.querySelectorAll('.type-color-input').forEach(inp => inp.addEventListener('input', () => {
          const t = list.find(x => x.id === inp.dataset.id);
          if (t) { t.color = inp.value; saveState(); }
        }));
      });
    }
    render();
  }
  function openEventTypeModal() { openTagManagerModal('일정 구분 관리', state.eventTypes, renderCalendar); }
  function openTaskCategoryModal() { openTagManagerModal('구분(카테고리) 관리', state.taskCategories, renderAll); }

  // ---------- help ----------
  function helpModalHtml() {
    return `
      <h2>사용 안내</h2>
      <p class="help-intro">각 탭이 어떤 역할을 하는지, 어떤 기능을 쓸 수 있는지 정리했습니다.</p>
      <div class="help-content">
        <section class="help-section">
          <h3>1. 연간 KPI</h3>
          <p>올해 달성하고 싶은 목표를 KPI로 등록합니다. "+ 새 KPI"를 눌러 제목, 목표 연도, 설명을 입력하세요.</p>
          <ul>
            <li><b>진행률</b>: KPI에 업무를 연결하면 완료한 업무 비율로 자동 계산돼요. "수동 설정"으로 바꾸면 슬라이더로 직접 % 조정도 가능해요.</li>
            <li><b>가중치(%)</b>: 여러 KPI 중 이 KPI가 차지하는 비중을 정할 수 있어요. 전체 KPI 가중치 합이 100%가 되도록 맞추면 좋아요.</li>
            <li><b>실적 관리</b>: 실제로 달성한 실적을 날짜별로 기록해두는 곳이에요. 기록을 클릭하면 내용을 수정할 수 있어요.</li>
            <li><b>평가등급표</b>: S·A·B·C처럼 등급 이름을 자유롭게 정하고, 평가 기준마다 등급을 선택해 종합 등급을 계산해요. 평가 기준마다 배점(%)을 입력하면 KPI 가중치에 맞춰 더 정교하게 계산돼요.</li>
          </ul>
        </section>
        <section class="help-section">
          <h3>2. 달력</h3>
          <p>공사, 기타일정 등 원하는 구분을 직접 만들어 일정을 등록하고 관리합니다.</p>
          <ul>
            <li><b>구분 관리</b>: 일정 추가 화면의 "구분 관리" 버튼으로 구분 이름과 색상을 자유롭게 추가·수정·삭제할 수 있어요.</li>
            <li><b>기간이 있는 일정</b>: 시작일과 종료일을 다르게 지정하면 여러 날에 걸쳐 달력에 이어서 표시돼요. 시작·종료 시간도 선택적으로 넣을 수 있어요.</li>
            <li><b>알림</b>: 한 달 전 ~ 하루 전까지 원하는 시점에 알림을 받을 수 있고, 알림별로 켜고 끌 수 있어요.</li>
            <li><b>날짜 미정</b>: 아직 날짜를 못 정한 장기 준비 업무는 "날짜 미정"으로 등록하면 [일간] 탭 아래쪽 목록에 모아서 보여줘요.</li>
            <li>일정의 "내 일정에 추가" 버튼으로 일간·주간·월간 할 일로 바로 옮길 수 있어요.</li>
          </ul>
        </section>
        <section class="help-section">
          <h3>3. 일간 · 주간 · 월간</h3>
          <p>실제 할 일을 날짜/주/월 단위로 계획하고 체크합니다.</p>
          <ul>
            <li><b>순서 바꾸기</b>: 항목 왼쪽 손잡이(점 여섯 개)를 누른 채 위아래로 드래그하면 순서가 바뀌어요. 숫자를 직접 정하고 싶으면 항목을 클릭해 우선순위 칸에 숫자를 입력해도 돼요.</li>
            <li><b>메모 · 목표 시간</b>: 항목을 클릭하면 메모와 "몇 시까지 끝낼지" 목표 시간을 넣을 수 있어요. 둘 다 선택 사항이고, 입력하면 목록에 함께 표시돼요.</li>
            <li><b>구분</b>: 각 항목의 구분(예: SHE, 생산 및 업무)을 목록에서 바로 드롭다운으로 바꿀 수 있어요. "구분 관리"로 구분 종류 자체도 자유롭게 추가·이름변경·삭제할 수 있어요.</li>
            <li><b>반복 업무</b>: 할 일을 추가할 때 매일/매주/매월 반복을 선택하면 앞으로의 일정에 자동으로 채워져요.</li>
            <li><b>자동 이월</b>: 어제까지 완료하지 못한 일간 업무는 오늘로 자동으로 넘어와요. "이월" 표시로 확인할 수 있어요.</li>
            <li><b>수정 · 완료 후 이월</b>: 항목을 클릭하면 언제든 수정할 수 있고, 완료된 업무도 클릭해서 날짜를 다른 날로 옮길 수 있어요.</li>
            <li><b>나눠 담기</b>: 월간 업무의 "주간 분배", 주간 업무의 "일간 분배" 버튼을 누르면 각 주/일에 나눠 등록하도록 추천해줘요.</li>
            <li><b>주간 업무 요약</b>: [주간] 탭에서 "업무 요약 보기"를 누르면 그 주 구분별 완료 현황을 한눈에 볼 수 있어요. (구분을 선택하지 않은 업무는 요약에서 제외돼요)</li>
          </ul>
        </section>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn primary" data-act="close">닫기</button>
      </div>`;
  }
  function openHelpModal() {
    openModal(helpModalHtml(), root => {
      root.querySelector('[data-act="close"]').addEventListener('click', closeModal);
    }, 'modal-wide');
  }

  // ---------- event delegation ----------
  document.getElementById('tabs').addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${btn.dataset.tab}`));
  });

  document.getElementById('btn-add-kpi').addEventListener('click', () => openKpiModal(null));
  document.getElementById('btn-help').addEventListener('click', openHelpModal);

  document.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => openTaskModal(btn.dataset.add));
  });

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [type, delta] = btn.dataset.nav.split(':');
      const n = Number(delta);
      if (n === 0) {
        pointers[type] = new Date();
      } else if (type === 'daily') {
        pointers[type] = addDays(pointers[type], n);
      } else if (type === 'weekly') {
        pointers[type] = addDays(pointers[type], n * 7);
      } else if (type === 'monthly' || type === 'calendar') {
        pointers[type] = addMonths(pointers[type], n);
      }
      if (type === 'calendar') { renderCalendar(); return; }
      renderPlanner(type);
      if (type === 'weekly') renderWeeklySummaryPanel();
    });
  });

  document.getElementById('btn-weekly-summary-toggle').addEventListener('click', () => {
    weeklySummaryOpen = !weeklySummaryOpen;
    renderWeeklySummaryPanel();
  });

  document.getElementById('btn-add-event').addEventListener('click', () => {
    openEventModal(null, dateStr(new Date()));
  });

  document.getElementById('calendar-grid').addEventListener('click', e => {
    const chip = e.target.closest('[data-act="open-event"]');
    if (chip) {
      const ev = state.events.find(x => x.id === chip.dataset.id);
      if (ev) openEventModal(ev);
      return;
    }
    const more = e.target.closest('[data-act="open-day"]');
    if (more) { openDayEventsModal(more.dataset.date); return; }
    const addBtn = e.target.closest('[data-act="add-event-day"]');
    if (addBtn) { openEventModal(null, addBtn.dataset.date); return; }
  });

  document.getElementById('undated-events-list').addEventListener('click', e => {
    const row = e.target.closest('.undated-row');
    if (!row) return;
    const ev = state.events.find(x => x.id === row.dataset.id);
    if (!ev) return;
    const act = (e.target.closest('[data-act]') || {}).dataset?.act;
    if (act === 'edit-event') {
      openEventModal(ev);
    } else if (act === 'add-to-planner') {
      openAddToPlannerModal(ev);
    } else if (act === 'delete-event') {
      openConfirmDialog(`"${ev.title}" 항목을 삭제할까요?`, { danger: true, confirmLabel: '삭제', onConfirm: () => {
        state.events = state.events.filter(x => x.id !== ev.id);
        saveState();
        renderCalendar();
      }});
    }
  });

  document.getElementById('kpi-list').addEventListener('click', e => {
    const card = e.target.closest('.kpi-card');
    if (!card) return;
    const kpi = state.kpis.find(k => k.id === card.dataset.id);
    if (!kpi) return;
    const act = (e.target.closest('[data-act]') || {}).dataset?.act;
    if (act === 'edit-kpi') {
      openKpiModal(kpi);
    } else if (act === 'delete-kpi') {
      openConfirmDialog(`"${kpi.title}" KPI를 삭제할까요? 연결된 업무의 KPI 태그도 함께 해제됩니다.`, { danger: true, confirmLabel: '삭제', onConfirm: () => {
        state.kpis = state.kpis.filter(k => k.id !== kpi.id);
        state.tasks.forEach(t => { if (t.kpiId === kpi.id) t.kpiId = null; });
        saveState();
        renderAll();
      }});
    } else if (act === 'toggle-mode') {
      if (kpi.mode === 'manual') {
        kpi.mode = 'auto';
      } else {
        kpi.progress = kpiProgress(kpi);
        kpi.mode = 'manual';
      }
      saveState();
      renderKpis();
    } else if (act === 'open-records') {
      openRecordsModal(kpi);
    } else if (act === 'open-rubric') {
      openRubricModal(kpi);
    }
  });

  document.getElementById('kpi-list').addEventListener('input', e => {
    if (e.target.dataset.act !== 'slider') return;
    const card = e.target.closest('.kpi-card');
    const kpi = state.kpis.find(k => k.id === card.dataset.id);
    kpi.progress = Number(e.target.value);
    saveState();
    const pct = kpiProgress(kpi);
    card.querySelector('.progress-bar-fill').style.width = pct + '%';
    card.querySelector('.progress-bar-fill').style.background = progressColor(pct);
    card.querySelector('.progress-pct').textContent = pct + '%';
    renderKpiSummary();
  });

  ['daily', 'weekly', 'monthly'].forEach(type => {
    const listEl = document.getElementById(`${type}-list`);
    let draggingId = null;

    listEl.addEventListener('click', e => {
      const row = e.target.closest('.task-row');
      if (!row) return;
      const task = state.tasks.find(t => t.id === row.dataset.id);
      if (!task) return;
      const actEl = e.target.closest('[data-act]');
      const act = actEl ? actEl.dataset.act : undefined;
      if (act === 'inline-category') return;
      if (act === 'toggle-task') {
        task.done = actEl.checked;
        saveState();
        renderPlanner(type);
        renderKpis();
        if (type === 'daily') renderWeeklySummaryPanel();
        return;
      }
      if (act === 'delete-task') {
        state.tasks = state.tasks.filter(t => t.id !== task.id);
        saveState();
        renderPlanner(type);
        renderKpis();
        if (type === 'daily') renderWeeklySummaryPanel();
        return;
      }
      if (act === 'split-suggest') { openSplitSuggestModal(type, task); return; }
      openTaskModal(type, task);
    });

    listEl.addEventListener('change', e => {
      if (e.target.dataset.act !== 'inline-category') return;
      const row = e.target.closest('.task-row');
      const task = state.tasks.find(t => t.id === row.dataset.id);
      if (!task) return;
      task.category = e.target.value || null;
      saveState();
      const cat = task.category ? taskCategoryById(task.category) : null;
      e.target.style.background = cat ? cat.color + '14' : 'var(--surface)';
      e.target.style.color = cat ? cat.color : 'var(--text-muted)';
      e.target.style.borderColor = cat ? cat.color + '40' : 'var(--border)';
      if (type === 'daily') renderWeeklySummaryPanel();
    });

    listEl.addEventListener('dragstart', e => {
      const handle = e.target.closest('.drag-handle');
      if (!handle) { e.preventDefault(); return; }
      const row = handle.closest('.task-row');
      draggingId = row.dataset.id;
      row.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    listEl.addEventListener('dragend', () => {
      listEl.querySelectorAll('.task-row').forEach(r => r.classList.remove('dragging', 'drag-over-top', 'drag-over-bottom'));
      draggingId = null;
    });
    listEl.addEventListener('dragover', e => {
      if (!draggingId) return;
      const row = e.target.closest('.task-row');
      if (!row || row.dataset.id === draggingId) return;
      e.preventDefault();
      const rect = row.getBoundingClientRect();
      const before = (e.clientY - rect.top) < rect.height / 2;
      listEl.querySelectorAll('.task-row').forEach(r => r.classList.remove('drag-over-top', 'drag-over-bottom'));
      row.classList.add(before ? 'drag-over-top' : 'drag-over-bottom');
    });
    listEl.addEventListener('drop', e => {
      if (!draggingId) return;
      const row = e.target.closest('.task-row');
      if (!row || row.dataset.id === draggingId) return;
      e.preventDefault();
      const rect = row.getBoundingClientRect();
      const before = (e.clientY - rect.top) < rect.height / 2;
      reorderTask(draggingId, row.dataset.id, !before);
    });
  });

  carryOverOverdueDailyTasks();
  renderAll();
})();
