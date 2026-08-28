/* 마일스톤 탭 — app.js를 건드리지 않는 독립 모듈.
   저장은 브라우저 localStorage('planner-milestones')에만 이루어집니다. */
(function () {
  'use strict';

  var KEY = 'planner-milestones';
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var ORDER = { done: 'active', active: 'todo', todo: 'done' };

  var I18N = {
    ko: {
      nav: '탐색', filter: '필터', all: '전체', active: '진행·예정', done: '완료',
      crumb: '마일스톤', title: '프로젝트 마일스톤', sub: '지금까지의 여정',
      completed: '완료', placeholder: '새 마일스톤 이름', add: '추가',
      tagDone: '완료', tagActive: '진행 중', tagTodo: '예정',
      newDesc: '새로 추가한 마일스톤입니다. 카드를 눌러 상태를 바꿀 수 있습니다.',
      empty: '표시할 마일스톤이 없습니다.', remove: '삭제',
      overview: '개요', timeline: '타임라인',
    },
    en: {
      nav: 'MAIN NAV', filter: 'FILTER', all: 'All', active: 'In progress', done: 'Completed',
      crumb: 'Milestones', title: 'Project milestones', sub: 'The journey so far',
      completed: 'COMPLETED', placeholder: 'New milestone name', add: 'Add',
      tagDone: 'Done', tagActive: 'In progress', tagTodo: 'Planned',
      newDesc: 'A new milestone. Click the card to change its status.',
      empty: 'No milestones to show.', remove: 'Delete',
      overview: 'Overview', timeline: 'Timeline',
    },
  };

  var SEED = [
    { id: 1, title: '제품 로드맵 확정', desc: '상반기 목표와 지표 정의를 마무리했습니다.', mon: 'Feb', day: '12', year: '2026', status: 'done' },
    { id: 2, title: '베타 릴리스', desc: '초대 사용자 500명 대상 비공개 베타를 오픈했습니다.', mon: 'Apr', day: '03', year: '2026', status: 'done' },
    { id: 3, title: '유료 플랜 도입', desc: '결제 연동과 요금제 3종을 출시했습니다.', mon: 'Jun', day: '21', year: '2026', status: 'done' },
    { id: 4, title: 'MAU 20만 돌파', desc: '채널별 유입 확대와 온보딩 개선을 진행 중입니다.', mon: 'Sep', day: '16', year: '2026', status: 'active' },
    { id: 5, title: '글로벌 언어 확장', desc: '영어·일본어 지원과 현지 결제 수단을 추가합니다.', mon: 'Nov', day: '30', year: '2026', status: 'todo' },
  ];

  var items = load();
  var filter = 'all';
  var draft = '';

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return SEED.slice();
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : SEED.slice();
    } catch (e) { return SEED.slice(); }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  }

  function lang() {
    var sel = document.getElementById('lang-select');
    return sel && sel.value === 'en' ? 'en' : 'ko';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function counts() {
    var done = items.filter(function (m) { return m.status === 'done'; }).length;
    return { all: items.length, done: done, active: items.length - done };
  }

  function visible() {
    if (filter === 'all') return items;
    if (filter === 'done') return items.filter(function (m) { return m.status === 'done'; });
    return items.filter(function (m) { return m.status !== 'done'; });
  }

  function render() {
    var host = document.getElementById('tab-milestone');
    if (!host) return;
    var t = I18N[lang()];
    var c = counts();
    var list = visible();

    var sideItem = function (key, label, count) {
      return '<button class="ms-side-item' + (filter === key ? ' active' : '') + '" data-ms-filter="' + key + '">' +
        '<span>' + esc(label) + '</span><span class="ms-side-count">' + count + '</span></button>';
    };

    var rows = list.length ? list.map(function (m, i) {
      var tagCls = m.status;
      var tagText = m.status === 'done' ? t.tagDone : m.status === 'active' ? t.tagActive : t.tagTodo;
      return '<div class="ms-row ' + (i % 2 === 0 ? 'left' : 'right') + '">' +
        '<div class="ms-slot">' +
          '<button class="ms-card" data-ms-toggle="' + m.id + '">' +
            '<span class="ms-card-body">' +
              '<span class="ms-card-title">' + esc(m.title) + '</span>' +
              '<span class="ms-card-desc">' + esc(m.desc) + '</span>' +
              '<span class="ms-tag ' + tagCls + '">' + esc(tagText) + '</span>' +
            '</span>' +
            '<span class="ms-card-date">' +
              '<span class="ms-card-mon">' + esc(m.mon) + '</span>' +
              '<span class="ms-card-day">' + esc(m.day) + '</span>' +
              '<span class="ms-card-year">' + esc(m.year) + '</span>' +
            '</span>' +
          '</button>' +
          '<button class="ms-remove" data-ms-remove="' + m.id + '" title="' + esc(t.remove) + '" aria-label="' + esc(t.remove) + '">&times;</button>' +
        '</div>' +
        '<div class="ms-node"><span class="ms-dot ' + m.status + '"></span></div>' +
      '</div>';
    }).join('') : '<p class="ms-empty">' + esc(t.empty) + '</p>';

    var tabBtn = document.getElementById('tab-btn-milestone');
    if (tabBtn) tabBtn.textContent = t.crumb;

    host.innerHTML =
      '<div class="ms-shell">' +
        '<aside class="ms-side">' +
          '<div class="ms-side-head"><span class="ms-side-mark">K</span><span>KPI PLANNER</span></div>' +
          '<div class="ms-side-label">' + esc(t.nav) + '</div>' +
          '<button class="ms-side-item" data-ms-tab="kpi"><span>' + esc(t.overview) + '</span></button>' +
          '<button class="ms-side-item active"><span>' + esc(t.timeline) + '</span></button>' +
          '<div class="ms-side-label">' + esc(t.filter) + '</div>' +
          sideItem('all', t.all, c.all) +
          sideItem('active', t.active, c.active) +
          sideItem('done', t.done, c.done) +
        '</aside>' +
        '<div class="ms-main">' +
          '<div class="ms-topbar">' +
            '<div class="ms-crumb">' +
              '<span class="ms-crumb-title">' + esc(t.crumb) + '</span>' +
              '<span class="ms-crumb-path">PAGES → TIMELINE</span>' +
            '</div>' +
            '<div class="ms-topbar-actions">' +
              '<input class="ms-input" id="ms-draft" type="text" placeholder="' + esc(t.placeholder) + '" value="' + esc(draft) + '">' +
              '<button class="ms-btn" id="ms-add">' + esc(t.add) + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="ms-body">' +
            '<div class="ms-heading">' +
              '<h2>' + esc(t.title) + '</h2>' +
              '<p>' + esc(t.sub) + ' · ' + c.done + ' / ' + c.all + ' ' + esc(t.completed) + '</p>' +
            '</div>' +
            '<div class="ms-timeline">' + rows + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function addFromDraft() {
    var input = document.getElementById('ms-draft');
    var value = input ? input.value.trim() : '';
    if (!value) { if (input) input.focus(); return; }
    var now = new Date();
    items.push({
      id: Date.now(),
      title: value,
      desc: I18N[lang()].newDesc,
      mon: MON[now.getMonth()],
      day: String(now.getDate()).padStart(2, '0'),
      year: String(now.getFullYear()),
      status: 'todo',
    });
    draft = '';
    save();
    render();
  }

  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-ms-filter]');
    if (f) { filter = f.dataset.msFilter; render(); return; }

    var jump = e.target.closest('[data-ms-tab]');
    if (jump) {
      var btn = document.querySelector('.tab-btn[data-tab="' + jump.dataset.msTab + '"]');
      if (btn) btn.click();
      return;
    }

    var rm = e.target.closest('[data-ms-remove]');
    if (rm) {
      var rid = Number(rm.dataset.msRemove);
      items = items.filter(function (m) { return m.id !== rid; });
      save(); render();
      return;
    }

    var tg = e.target.closest('[data-ms-toggle]');
    if (tg) {
      var tid = Number(tg.dataset.msToggle);
      items = items.map(function (m) {
        return m.id === tid ? Object.assign({}, m, { status: ORDER[m.status] || 'done' }) : m;
      });
      save(); render();
      return;
    }

    if (e.target.closest('#ms-add')) addFromDraft();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.id === 'ms-draft') { e.preventDefault(); addFromDraft(); }
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'ms-draft') draft = e.target.value;
  });

  document.addEventListener('change', function (e) {
    if (e.target.id === 'lang-select') render();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
