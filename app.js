(() => {
  const STORAGE_KEY = 'kpi-planner-data-v1';
  const LANG_KEY = 'kpi-planner-lang';
  const PALETTE = ['#3f6f9c', '#a8681f', '#2e7d5b', '#b04a45', '#6b5ca5', '#2c7f8c', '#a4508b', '#6b7280'];

  // ---------- i18n ----------
  // 화면에 보이는 모든 문구는 여기 한 곳에 모아 두고 t()로 꺼내 씁니다.
  // {0}, {1}은 t('key', 값1, 값2) 로 채워집니다.
  const STRINGS = {
    ko: {
      'app.title': '데일리 플래너',
      'app.pageTitle': '데일리 플래너 | 일간·주간·월간 계획표, 공부·업무 목표 관리 무료 웹',
      'app.subtitle': '일간 · 주간 · 월간 계획을 한 곳에서',
      'app.metaDesc': '설치도 회원가입도 없이 브라우저에서 바로 쓰는 무료 플래너. 일간·주간·월간 계획표, 공부 계획, 업무 일정과 KPI 목표까지 한 화면에서 관리하세요.',
      'tab.kpi': '연간 KPI',
      'tab.calendar': '달력',
      'tab.daily': '일간',
      'tab.weekly': '주간',
      'tab.monthly': '월간',
      'nav.today': '오늘',
      'nav.thisWeek': '이번 주',
      'nav.thisMonth': '이번 달',
      'btn.help': '사용 안내',
      'btn.settings': '설정',
      'btn.addKpi': '+ 새 KPI',
      'btn.addEvent': '+ 일정 추가',
      'btn.addTask': '+ 할 일 추가',
      'btn.cancel': '취소',
      'btn.confirm': '확인',
      'btn.save': '저장',
      'btn.add': '추가',
      'btn.create': '등록',
      'btn.close': '닫기',
      'btn.delete': '삭제',
      'btn.edit': '수정',
      'section.undated': '날짜 미정 · 장기 준비 업무',
      'lang.aria': '언어 선택',
      'side.title': '구분별 보기',
      'side.all': '전체',
      'side.aria': '구분 필터',

      'def.construction': '공사',
      'def.other': '기타일정',
      'def.work': '생산 및 업무',
      'def.she': 'SHE',
      'tag.deleted': '(삭제된 구분)',
      'tag.newItem': '새 항목',

      'prof.personal': '개인',
      'prof.personalDesc': '일상 · 건강 · 집안일처럼 개인적인 할 일 위주',
      'prof.work': '회사',
      'prof.workDesc': '업무와 회의 중심. KPI 목표 관리도 켤 수 있어요',
      'prof.study': '공부',
      'prof.studyDesc': '과제 · 시험 준비 · 강의 일정 관리',
      'prof.project': '프로젝트',
      'prof.projectDesc': '기획 · 작업 · 마일스톤 단위로 진행 관리',

      'cat.life': '일상',
      'cat.health': '건강',
      'cat.chore': '집안일',
      'cat.work': '업무',
      'cat.meeting': '회의',
      'cat.study': '공부 · 과제',
      'cat.exam': '시험 준비',
      'cat.plan': '기획',
      'cat.build': '작업 · 개발',
      'evt.appointment': '약속',
      'evt.workSchedule': '업무 일정',
      'evt.exam': '시험',
      'evt.deadline': '과제 마감',
      'evt.milestone': '마일스톤',
      'evt.meeting': '회의',

      'ob.title': '어떤 용도로 사용하시나요?',
      'ob.intro': '선택한 용도에 맞게 기본 구분(카테고리)을 준비해 드려요. 나중에 [설정]에서 언제든 바꿀 수 있습니다.',
      'ob.kpiQ': 'KPI 목표 관리 기능 사용하기',
      'ob.kpiHint': '연간 목표(KPI)와 가중치, 평가등급표를 관리하는 탭이 추가됩니다. 필요 없으면 꺼두세요.',
      'ob.start': '시작하기',

      'set.title': '설정',
      'set.profile': '사용 용도',
      'set.profileHint': '용도를 바꿔도 지금까지 입력한 할 일과 일정은 그대로 남습니다.',
      'set.kpiKeep': 'KPI를 꺼도 등록해둔 KPI는 지워지지 않고, 다시 켜면 그대로 보입니다.',
      'set.resetCats': '기본 구분을 선택한 용도에 맞게 바꾸기',
      'set.resetCatsHint': '지금 쓰고 있는 구분 목록이 지워지고 새로 만들어집니다. 기존 할 일에 지정된 구분은 "구분 없음"이 됩니다.',

      'alarm.m1': '한 달 전',
      'alarm.w2': '2주 전',
      'alarm.w1': '1주 전',
      'alarm.d3': '3일 전',
      'alarm.d1': '1일 전',

      'date.daily': '{0}년 {1}월 {2}일 ({3})',
      'date.today': ' (오늘)',
      'date.weeklySame': '{0}년 {1}월 {2}일 ~ {3}일',
      'date.weeklyCross': '{0}년 {1}월 {2}일 ~ {3}월 {4}일',
      'date.monthly': '{0}년 {1}월',
      'date.dayTitle': '{0}년 {1}월 {2}일 ({3})',

      'kpi.summary': 'KPI <b>{0}개</b> · 평균 진척도 <b>{1}%</b>',
      'kpi.weightSum': ' · 가중치 합계 <b style="color:{0}">{1}%</b>',
      'kpi.weightHint': ' (100%가 되도록 맞춰보세요)',
      'kpi.empty': '아직 등록된 KPI가 없습니다. "+ 새 KPI"로 올해 목표를 등록해보세요.',
      'kpi.yearGoal': '{0}년 목표',
      'kpi.weightSuffix': ' · 가중치 {0}%',
      'kpi.linked': '연결된 업무 {0}개 중 {1}개 완료',
      'kpi.noLinked': '연결된 업무 없음',
      'kpi.modeManual': '수동 설정',
      'kpi.modeAuto': '자동 계산',
      'kpi.records': '실적 관리 ({0}건)',
      'kpi.rubricManage': '등급표 관리',
      'kpi.rubricAdd': '+ 평가등급표',
      'kpi.gradeNone': '평가등급: 아직 선택된 기준이 없음',
      'kpi.gradeSummary': '종합 등급: ',
      'kpi.gradeDetail': ' (평가 {0}/{1}건, 평균 {2}점)',
      'kpi.deleteConfirm': '"{0}" KPI를 삭제할까요? 연결된 업무의 KPI 태그도 함께 해제됩니다.',

      'kpi.modalNew': '새 KPI 등록',
      'kpi.modalEdit': 'KPI 수정',
      'kpi.fTitle': '제목',
      'kpi.fTitlePh': '예: 신규 고객 30% 증가',
      'kpi.fYear': '목표 연도',
      'kpi.fWeight': '가중치 (%) — 전체 KPI 중 이 KPI의 비중, 선택사항',
      'kpi.fWeightPh': '예: 25',
      'kpi.fDesc': '설명 (선택)',
      'kpi.fDescPh': '세부 목표나 지표를 적어두세요',

      'rec.title': '실적 기록 - {0}',
      'rec.empty': '등록된 실적이 없습니다.',
      'rec.hint': '실적을 클릭하면 내용을 수정할 수 있습니다.',
      'rec.fDate': '날짜',
      'rec.fValue': '실적 내용',
      'rec.fValuePh': '예: 수율 97.2% 달성',
      'rec.fNote': '메모 (선택)',
      'rec.fNotePh': '세부 내용',
      'rec.cancelEdit': '수정 취소',
      'rec.saveEdit': '실적 수정 저장',
      'rec.addBtn': '실적 추가',
      'rec.deleteConfirm': '이 실적 기록을 삭제할까요?',

      'rub.title': '평가 등급표 - {0}',
      'rub.gradesHead': '등급 (좋음 → 나쁨 순, 이름은 자유롭게 바꿀 수 있어요)',
      'rub.gradeUp': '앞으로',
      'rub.gradeDown': '뒤로',
      'rub.addGrade': '+ 등급 추가',
      'rub.newGrade': '새 등급',
      'rub.critHead': '평가 기준 (행마다 등급 하나를 클릭해서 선택하세요)',
      'rub.colCrit': '기준',
      'rub.weightPh': '배점%',
      'rub.cellPh': '기준 내용',
      'rub.selected': '선택됨',
      'rub.select': '선택',
      'rub.addCrit': '+ 평가 기준 추가',
      'rub.newCrit': '새 평가 기준',
      'rub.critDefault': '평가 기준 1',
      'rub.weightVsKpi': '평가 기준 배점 합계: {0}% / KPI 가중치: {1}%',
      'rub.weightMatch': ' ✓',
      'rub.weightMismatch': ' — 합계를 KPI 가중치와 맞추면 더 정확해요',
      'rub.weightOnly': '평가 기준 배점 합계: {0}% (KPI 수정에서 가중치를 설정하면 목표 합계를 알려드려요)',
      'rub.resultDetail': '평균 {0}점 · 평가 {1}/{2}개 기준 선택됨',
      'rub.resultNone': '아직 선택된 평가 기준이 없습니다.',
      'rub.minGrade': '등급은 최소 1개 이상 있어야 합니다.',
      'rub.deleteGrade': '이 등급을 삭제할까요?',
      'rub.deleteCrit': '이 평가 기준을 삭제할까요?',

      'task.empty': '등록된 할 일이 없습니다.',
      'task.emptyFiltered': '"{0}"에 해당하는 항목이 없습니다.',
      'task.summary': '총 <b>{0}개</b> · 완료 <b>{1}개</b> ({2}%)',
      'task.dragTip': '드래그해서 순서 바꾸기',
      'task.dueTitle': '목표 시간',
      'task.carryTitle': '원래 날짜: {0}',
      'task.carry': '이월',
      'task.noCategory': '구분 없음',
      'task.splitWeekly': '주간 분배',
      'task.splitWeeklyTip': '주간에 나눠 담기',
      'task.splitDaily': '일간 분배',
      'task.splitDailyTip': '일간에 나눠 담기',
      'task.modalEdit': '업무 수정',
      'task.modalNew': '{0} 할 일 추가',
      'task.fTitle': '제목',
      'task.fTitlePh': '할 일을 입력하세요',
      'task.fKpi': '연결할 KPI (선택)',
      'task.fKpiNone': '연결 안 함',
      'task.fNote': '메모 (선택)',
      'task.fNotePh': '세부 내용이나 참고사항을 적어두세요',
      'task.fDue': '목표 시간 (선택, ~까지 완료)',
      'task.fPriority': '우선순위 (숫자, 작을수록 먼저 표시 · 목록에서 드래그로도 바꿀 수 있어요)',
      'task.fCategory': '구분 (선택)',
      'task.fCategoryNone': '선택 안 함',
      'task.manageCategories': '구분 관리',
      'task.categoryHint': '구분을 선택하지 않으면 금요일 주간 업무 요약에는 표시되지 않습니다.',
      'task.fDate': '날짜',
      'task.fWeek': '주 (해당 주의 아무 날짜나 선택)',
      'task.fMonth': '월',
      'task.fRecurrence': '반복',
      'task.recNone': '반복 없음',
      'task.recDaily': '매일 반복 (30일)',
      'task.recWeeklySameDay': '매주 반복 (같은 요일, 12주)',
      'task.recWeekly': '매주 반복 (12주)',
      'task.recMonthly': '매월 반복 (6개월)',
      'task.addTo': '{0}에 추가됩니다.',
      'task.deleteConfirm': '이 업무를 삭제할까요?',

      'split.title': '{0}에 나눠 담기 추천',
      'split.hint': '"{0}"을(를) 아래에 나눠 등록합니다. (규칙 기반 자동 분배이며, 실제 업무량을 분석한 결과는 아닙니다. 필요한 항목만 선택하세요.)',
      'split.weekOption': '{0}주차 ({1})',
      'split.dayOption': '{0}요일 ({1})',

      'sum.show': '업무 요약 보기',
      'sum.hide': '업무 요약 닫기',
      'sum.head': '주간 업무 요약',
      'sum.range': '({0}, 평일 기준 · 구분 미선택 업무는 제외)',
      'sum.count': '{0}/{1}건 완료',
      'sum.empty': '완료된 업무가 없습니다.',
      'sum.pending': '미완료 {0}건',

      'cal.monthCount': '이번 달 일정 <b>{0}건</b>',
      'cal.more': '+{0}개',
      'cal.addEventTip': '일정 추가',
      'cal.alarmTitle': '오늘의 일정 알림 ({0}건)',
      'cal.alarmLead': '{0} 알림',
      'cal.alarmScheduled': ' 예정 · ',
      'cal.undatedEmpty': '등록된 미정 업무가 없습니다.',
      'cal.editEvent': '날짜/내용 수정',
      'cal.addToPlanner': '내 일정에 추가',
      'cal.deleteEventConfirm': '"{0}" 항목을 삭제할까요?',
      'cal.dayTitleSuffix': ' 일정',

      'ev.modalNew': '새 일정 추가',
      'ev.modalEdit': '일정 수정',
      'ev.fTitle': '제목',
      'ev.fTitlePh': '예: OO동 소방설비 공사',
      'ev.fType': '구분',
      'ev.manageTypes': '구분 관리',
      'ev.undated': '날짜 미정 (장기 준비 업무로 등록)',
      'ev.fStartDate': '시작일',
      'ev.fEndDate': '종료일 (선택, 여러 날 지속되는 일정만)',
      'ev.fStartTime': '시작 시간 (선택)',
      'ev.fEndTime': '종료 시간 (선택)',
      'ev.fNote': '메모 (선택)',
      'ev.fNotePh': '세부 내용을 적어두세요',
      'ev.alarmsOn': '알람 사용',
      'ev.deleteConfirm': '"{0}" 일정을 삭제할까요?',
      'ev.needStart': '시작일을 입력하거나 "날짜 미정"을 선택하세요.',
      'ev.endBeforeStart': '종료일은 시작일보다 빠를 수 없습니다.',

      'atp.title': '내 일정에 추가',
      'atp.hint': '"{0}"을(를) 추가할 위치를 선택하세요.',
      'atp.where': '추가할 위치',

      'tag.eventTypes': '일정 구분 관리',
      'tag.taskCategories': '구분(카테고리) 관리',
      'tag.addItem': '+ 항목 추가',
      'tag.minOne': '최소 1개 이상 있어야 합니다.',
      'tag.deleteConfirm': '이 항목을 삭제할까요?',

      'help.title': '사용 안내',
      'help.intro': '각 탭이 어떤 역할을 하는지, 어떤 기능을 쓸 수 있는지 정리했습니다.',
      'help.h1': '연간 KPI',
      'help.p1': '올해 달성하고 싶은 목표를 KPI로 등록합니다. "+ 새 KPI"를 눌러 제목, 목표 연도, 설명을 입력하세요.',
      'help.l1a': '<b>진행률</b>: KPI에 업무를 연결하면 완료한 업무 비율로 자동 계산돼요. "수동 설정"으로 바꾸면 슬라이더로 직접 % 조정도 가능해요.',
      'help.l1b': '<b>가중치(%)</b>: 여러 KPI 중 이 KPI가 차지하는 비중을 정할 수 있어요. 전체 KPI 가중치 합이 100%가 되도록 맞추면 좋아요.',
      'help.l1c': '<b>실적 관리</b>: 실제로 달성한 실적을 날짜별로 기록해두는 곳이에요. 기록을 클릭하면 내용을 수정할 수 있어요.',
      'help.l1d': '<b>평가등급표</b>: S·A·B·C처럼 등급 이름을 자유롭게 정하고, 평가 기준마다 등급을 선택해 종합 등급을 계산해요. 평가 기준마다 배점(%)을 입력하면 KPI 가중치에 맞춰 더 정교하게 계산돼요.',
      'help.h2': '달력',
      'help.p2': '공사, 기타일정 등 원하는 구분을 직접 만들어 일정을 등록하고 관리합니다.',
      'help.l2a': '<b>구분 관리</b>: 일정 추가 화면의 "구분 관리" 버튼으로 구분 이름과 색상을 자유롭게 추가·수정·삭제할 수 있어요.',
      'help.l2b': '<b>기간이 있는 일정</b>: 시작일과 종료일을 다르게 지정하면 여러 날에 걸쳐 달력에 이어서 표시돼요. 시작·종료 시간도 선택적으로 넣을 수 있어요.',
      'help.l2c': '<b>알림</b>: 한 달 전 ~ 하루 전까지 원하는 시점에 알림을 받을 수 있고, 알림별로 켜고 끌 수 있어요.',
      'help.l2d': '<b>날짜 미정</b>: 아직 날짜를 못 정한 장기 준비 업무는 "날짜 미정"으로 등록하면 [일간] 탭 아래쪽 목록에 모아서 보여줘요.',
      'help.l2e': '일정의 "내 일정에 추가" 버튼으로 일간·주간·월간 할 일로 바로 옮길 수 있어요.',
      'help.h3': '일간 · 주간 · 월간',
      'help.p3': '실제 할 일을 날짜/주/월 단위로 계획하고 체크합니다.',
      'help.l3a': '<b>순서 바꾸기</b>: 항목 왼쪽 손잡이(점 여섯 개)를 누른 채 위아래로 드래그하면 순서가 바뀌어요. 숫자를 직접 정하고 싶으면 항목을 클릭해 우선순위 칸에 숫자를 입력해도 돼요.',
      'help.l3b': '<b>메모 · 목표 시간</b>: 항목을 클릭하면 메모와 "몇 시까지 끝낼지" 목표 시간을 넣을 수 있어요. 둘 다 선택 사항이고, 입력하면 목록에 함께 표시돼요.',
      'help.l3c': '<b>구분</b>: 각 항목의 구분(예: SHE, 생산 및 업무)을 목록에서 바로 드롭다운으로 바꿀 수 있어요. "구분 관리"로 구분 종류 자체도 자유롭게 추가·이름변경·삭제할 수 있어요.',
      'help.l3d': '<b>반복 업무</b>: 할 일을 추가할 때 매일/매주/매월 반복을 선택하면 앞으로의 일정에 자동으로 채워져요.',
      'help.l3e': '<b>자동 이월</b>: 어제까지 완료하지 못한 일간 업무는 오늘로 자동으로 넘어와요. "이월" 표시로 확인할 수 있어요.',
      'help.l3f': '<b>수정 · 완료 후 이월</b>: 항목을 클릭하면 언제든 수정할 수 있고, 완료된 업무도 클릭해서 날짜를 다른 날로 옮길 수 있어요.',
      'help.l3g': '<b>나눠 담기</b>: 월간 업무의 "주간 분배", 주간 업무의 "일간 분배" 버튼을 누르면 각 주/일에 나눠 등록하도록 추천해줘요.',
      'help.l3h': '<b>주간 업무 요약</b>: [주간] 탭에서 "업무 요약 보기"를 누르면 그 주 구분별 완료 현황을 한눈에 볼 수 있어요. (구분을 선택하지 않은 업무는 요약에서 제외돼요)',
      'help.h4': '설정 · 사용 용도',
      'help.p4': '헤더의 [설정]에서 사용 용도(개인 · 회사 · 공부 · 프로젝트)를 언제든 바꿀 수 있습니다. 용도에 맞는 기본 구분을 새로 받아올 수도 있고, 회사 용도에서는 KPI 탭을 켜고 끌 수 있습니다.',
      'help.h5': '데이터 보관',
      'help.p5': '입력한 내용은 이 브라우저 안에만 저장됩니다. 서버로 전송되지 않으니 다른 사람이 볼 수 없지만, 브라우저 데이터를 지우면 함께 사라집니다. 기기를 바꿀 때는 새 기기에서 다시 입력해야 합니다.',

      'footer.usesTitle': '이렇게 쓸 수 있어요',
      'footer.u1': '공부 계획표 — 하루 공부량, 주간 학습 계획, 시험·과제 마감 D-day 관리',
      'footer.u2': '업무 플래너 — 일간·주간·월간 업무 계획, 회의 일정, 연간 목표(KPI)와 평가등급표',
      'footer.u3': '개인 일정 관리 — 오늘 할 일, 약속과 기념일, 매일 반복되는 습관 체크',
      'footer.u4': '프로젝트 관리 — 작업 분배, 마일스톤 D-day, 주간 진행 상황 정리',
      'footer.privacy': '설치나 회원가입이 필요 없고, 입력한 내용은 이 브라우저에만 저장되어 외부로 전송되지 않습니다.',

      'up.dday': 'D-DAY',
      'up.ddayLeft': 'D-{0}',
      'up.ddayPast': 'D+{0}',
    },
    en: {
      'app.title': 'Daily Planner',
      'app.pageTitle': 'Daily Planner | Free daily, weekly and monthly planner for study and work',
      'app.subtitle': 'Daily · weekly · monthly plans in one place',
      'app.metaDesc': 'A free planner that runs in your browser with no install and no sign-up. Keep daily, weekly and monthly plans, study schedules, work events and KPI goals on one screen.',
      'tab.kpi': 'Annual KPIs',
      'tab.calendar': 'Calendar',
      'tab.daily': 'Daily',
      'tab.weekly': 'Weekly',
      'tab.monthly': 'Monthly',
      'nav.today': 'Today',
      'nav.thisWeek': 'This week',
      'nav.thisMonth': 'This month',
      'btn.help': 'Guide',
      'btn.settings': 'Settings',
      'btn.addKpi': '+ New KPI',
      'btn.addEvent': '+ Add event',
      'btn.addTask': '+ Add task',
      'btn.cancel': 'Cancel',
      'btn.confirm': 'OK',
      'btn.save': 'Save',
      'btn.add': 'Add',
      'btn.create': 'Create',
      'btn.close': 'Close',
      'btn.delete': 'Delete',
      'btn.edit': 'Edit',
      'section.undated': 'Undated · long-term preparation',
      'lang.aria': 'Language',
      'side.title': 'By category',
      'side.all': 'All',
      'side.aria': 'Category filter',

      'def.construction': 'Construction',
      'def.other': 'Other',
      'def.work': 'Production & work',
      'def.she': 'SHE',
      'tag.deleted': '(deleted category)',
      'tag.newItem': 'New item',

      'prof.personal': 'Personal',
      'prof.personalDesc': 'Everyday life, health and errands',
      'prof.work': 'Work',
      'prof.workDesc': 'Tasks and meetings. KPI goal tracking is optional',
      'prof.study': 'Study',
      'prof.studyDesc': 'Assignments, exam prep and class schedules',
      'prof.project': 'Project',
      'prof.projectDesc': 'Planning, build work and milestones',

      'cat.life': 'Everyday',
      'cat.health': 'Health',
      'cat.chore': 'Errands',
      'cat.work': 'Work',
      'cat.meeting': 'Meetings',
      'cat.study': 'Study & assignments',
      'cat.exam': 'Exam prep',
      'cat.plan': 'Planning',
      'cat.build': 'Build & dev',
      'evt.appointment': 'Appointment',
      'evt.workSchedule': 'Work schedule',
      'evt.exam': 'Exam',
      'evt.deadline': 'Deadline',
      'evt.milestone': 'Milestone',
      'evt.meeting': 'Meeting',

      'ob.title': 'What will you use this for?',
      'ob.intro': 'We\'ll set up matching categories for you. You can change this any time under Settings.',
      'ob.kpiQ': 'Use KPI goal tracking',
      'ob.kpiHint': 'Adds a tab for annual goals with weighting and a rating rubric. Leave it off if you don\'t need it.',
      'ob.start': 'Get started',

      'set.title': 'Settings',
      'set.profile': 'Used for',
      'set.profileHint': 'Changing this keeps every task and event you have already entered.',
      'set.kpiKeep': 'Turning KPIs off hides the tab but keeps your KPIs — turn it back on and they reappear.',
      'set.resetCats': 'Replace categories with the ones for this use',
      'set.resetCatsHint': 'Your current category list is deleted and rebuilt. Tasks that used the old categories become uncategorised.',

      'alarm.m1': '1 month before',
      'alarm.w2': '2 weeks before',
      'alarm.w1': '1 week before',
      'alarm.d3': '3 days before',
      'alarm.d1': '1 day before',

      'date.daily': '{3}, {1} {2}, {0}',
      'date.today': ' (Today)',
      'date.weeklySame': '{1} {2} – {3}, {0}',
      'date.weeklyCross': '{1} {2} – {3} {4}, {0}',
      'date.monthly': '{1} {0}',
      'date.dayTitle': '{3}, {1} {2}, {0}',

      'kpi.summary': '<b>{0}</b> KPIs · average progress <b>{1}%</b>',
      'kpi.weightSum': ' · weight total <b style="color:{0}">{1}%</b>',
      'kpi.weightHint': ' (aim for 100%)',
      'kpi.empty': 'No KPIs yet. Use "+ New KPI" to add this year\'s goals.',
      'kpi.yearGoal': '{0} goal',
      'kpi.weightSuffix': ' · weight {0}%',
      'kpi.linked': '{1} of {0} linked tasks done',
      'kpi.noLinked': 'No linked tasks',
      'kpi.modeManual': 'Manual',
      'kpi.modeAuto': 'Automatic',
      'kpi.records': 'Results ({0})',
      'kpi.rubricManage': 'Edit rubric',
      'kpi.rubricAdd': '+ Rating rubric',
      'kpi.gradeNone': 'Rating: no criteria selected yet',
      'kpi.gradeSummary': 'Overall rating: ',
      'kpi.gradeDetail': ' ({0}/{1} criteria rated, average {2})',
      'kpi.deleteConfirm': 'Delete the KPI "{0}"? Linked tasks will lose their KPI tag.',

      'kpi.modalNew': 'New KPI',
      'kpi.modalEdit': 'Edit KPI',
      'kpi.fTitle': 'Title',
      'kpi.fTitlePh': 'e.g. Grow new customers by 30%',
      'kpi.fYear': 'Target year',
      'kpi.fWeight': 'Weight (%) — this KPI\'s share of the total, optional',
      'kpi.fWeightPh': 'e.g. 25',
      'kpi.fDesc': 'Description (optional)',
      'kpi.fDescPh': 'Note the detailed target or metric',

      'rec.title': 'Results — {0}',
      'rec.empty': 'No results recorded yet.',
      'rec.hint': 'Click a result to edit it.',
      'rec.fDate': 'Date',
      'rec.fValue': 'Result',
      'rec.fValuePh': 'e.g. Yield reached 97.2%',
      'rec.fNote': 'Note (optional)',
      'rec.fNotePh': 'Details',
      'rec.cancelEdit': 'Cancel edit',
      'rec.saveEdit': 'Save changes',
      'rec.addBtn': 'Add result',
      'rec.deleteConfirm': 'Delete this result?',

      'rub.title': 'Rating rubric — {0}',
      'rub.gradesHead': 'Grades (best → worst; rename them freely)',
      'rub.gradeUp': 'Move up',
      'rub.gradeDown': 'Move down',
      'rub.addGrade': '+ Add grade',
      'rub.newGrade': 'New grade',
      'rub.critHead': 'Criteria (click one grade per row)',
      'rub.colCrit': 'Criterion',
      'rub.weightPh': 'Weight %',
      'rub.cellPh': 'Describe this level',
      'rub.selected': 'Selected',
      'rub.select': 'Select',
      'rub.addCrit': '+ Add criterion',
      'rub.newCrit': 'New criterion',
      'rub.critDefault': 'Criterion 1',
      'rub.weightVsKpi': 'Criteria weight total: {0}% / KPI weight: {1}%',
      'rub.weightMatch': ' ✓',
      'rub.weightMismatch': ' — matching the KPI weight gives a more accurate score',
      'rub.weightOnly': 'Criteria weight total: {0}% (set a KPI weight to see the target total)',
      'rub.resultDetail': 'Average {0} · {1}/{2} criteria selected',
      'rub.resultNone': 'No criteria selected yet.',
      'rub.minGrade': 'At least one grade is required.',
      'rub.deleteGrade': 'Delete this grade?',
      'rub.deleteCrit': 'Delete this criterion?',

      'task.empty': 'No tasks yet.',
      'task.emptyFiltered': 'Nothing in "{0}".',
      'task.summary': '<b>{0}</b> total · <b>{1}</b> done ({2}%)',
      'task.dragTip': 'Drag to reorder',
      'task.dueTitle': 'Finish by',
      'task.carryTitle': 'Originally: {0}',
      'task.carry': 'Carried over',
      'task.noCategory': 'No category',
      'task.splitWeekly': 'Split by week',
      'task.splitWeeklyTip': 'Spread across weeks',
      'task.splitDaily': 'Split by day',
      'task.splitDailyTip': 'Spread across days',
      'task.modalEdit': 'Edit task',
      'task.modalNew': 'Add {0} task',
      'task.fTitle': 'Title',
      'task.fTitlePh': 'What needs to be done?',
      'task.fKpi': 'Linked KPI (optional)',
      'task.fKpiNone': 'Not linked',
      'task.fNote': 'Note (optional)',
      'task.fNotePh': 'Details or anything worth remembering',
      'task.fDue': 'Finish by (optional)',
      'task.fPriority': 'Priority (lower shows first · you can also drag rows in the list)',
      'task.fCategory': 'Category (optional)',
      'task.fCategoryNone': 'None',
      'task.manageCategories': 'Manage categories',
      'task.categoryHint': 'Tasks without a category are left out of the weekly summary.',
      'task.fDate': 'Date',
      'task.fWeek': 'Week (pick any date in that week)',
      'task.fMonth': 'Month',
      'task.fRecurrence': 'Repeat',
      'task.recNone': 'No repeat',
      'task.recDaily': 'Every day (30 days)',
      'task.recWeeklySameDay': 'Every week, same weekday (12 weeks)',
      'task.recWeekly': 'Every week (12 weeks)',
      'task.recMonthly': 'Every month (6 months)',
      'task.addTo': 'Will be added to {0}.',
      'task.deleteConfirm': 'Delete this task?',

      'split.title': 'Suggested split into {0}',
      'split.hint': '"{0}" will be added to the entries you pick below. (This is a simple rule-based split, not an analysis of actual workload.)',
      'split.weekOption': 'Week {0} ({1})',
      'split.dayOption': '{0} ({1})',

      'sum.show': 'Show weekly summary',
      'sum.hide': 'Hide weekly summary',
      'sum.head': 'Weekly summary',
      'sum.range': '({0}, weekdays only · uncategorised tasks excluded)',
      'sum.count': '{0}/{1} done',
      'sum.empty': 'Nothing completed yet.',
      'sum.pending': '{0} still open',

      'cal.monthCount': '<b>{0}</b> events this month',
      'cal.more': '+{0} more',
      'cal.addEventTip': 'Add event',
      'cal.alarmTitle': 'Reminders for today ({0})',
      'cal.alarmLead': '{0}',
      'cal.alarmScheduled': ' · ',
      'cal.undatedEmpty': 'Nothing undated yet.',
      'cal.editEvent': 'Edit date/details',
      'cal.addToPlanner': 'Add to my plan',
      'cal.deleteEventConfirm': 'Delete "{0}"?',
      'cal.dayTitleSuffix': '',

      'ev.modalNew': 'New event',
      'ev.modalEdit': 'Edit event',
      'ev.fTitle': 'Title',
      'ev.fTitlePh': 'e.g. Fire system work, Building A',
      'ev.fType': 'Category',
      'ev.manageTypes': 'Manage categories',
      'ev.undated': 'Date not decided (keep as long-term prep)',
      'ev.fStartDate': 'Start date',
      'ev.fEndDate': 'End date (optional, for multi-day events)',
      'ev.fStartTime': 'Start time (optional)',
      'ev.fEndTime': 'End time (optional)',
      'ev.fNote': 'Note (optional)',
      'ev.fNotePh': 'Details',
      'ev.alarmsOn': 'Reminders on',
      'ev.deleteConfirm': 'Delete the event "{0}"?',
      'ev.needStart': 'Enter a start date, or tick "Date not decided".',
      'ev.endBeforeStart': 'The end date cannot be before the start date.',

      'atp.title': 'Add to my plan',
      'atp.hint': 'Choose where to add "{0}".',
      'atp.where': 'Add to',

      'tag.eventTypes': 'Event categories',
      'tag.taskCategories': 'Task categories',
      'tag.addItem': '+ Add item',
      'tag.minOne': 'At least one item is required.',
      'tag.deleteConfirm': 'Delete this item?',

      'help.title': 'Guide',
      'help.intro': 'What each tab is for, and what you can do in it.',
      'help.h1': 'Annual KPIs',
      'help.p1': 'Register the goals you want to hit this year. Press "+ New KPI" and fill in a title, target year and description.',
      'help.l1a': '<b>Progress</b>: link tasks to a KPI and progress is calculated from how many are done. Switch to "Manual" to set the percentage yourself with a slider.',
      'help.l1b': '<b>Weight (%)</b>: how much this KPI counts relative to the others. Aim for 100% across all KPIs.',
      'help.l1c': '<b>Results</b>: a dated log of what you actually achieved. Click an entry to edit it.',
      'help.l1d': '<b>Rating rubric</b>: name your grades however you like (S·A·B·C, etc.), pick a grade per criterion, and the overall rating is calculated for you. Give each criterion a weight (%) for a more precise score.',
      'help.h2': 'Calendar',
      'help.p2': 'Create your own categories and register events against them.',
      'help.l2a': '<b>Categories</b>: the "Manage categories" button in the event form lets you add, rename, recolour and delete categories.',
      'help.l2b': '<b>Multi-day events</b>: give an event a different end date and it will run continuously across the calendar. Start and end times are optional.',
      'help.l2c': '<b>Reminders</b>: get a heads-up anywhere from a month to a day before, and switch each one on or off.',
      'help.l2d': '<b>Undated</b>: work with no date yet can be filed as "Date not decided" and appears in a list at the bottom of the Daily tab.',
      'help.l2e': 'The "Add to my plan" button moves an event straight into your daily, weekly or monthly list.',
      'help.h3': 'Daily · Weekly · Monthly',
      'help.p3': 'Plan and tick off the actual work, by day, week or month.',
      'help.l3a': '<b>Reordering</b>: grab the handle (six dots) on the left of a row and drag it up or down. You can also click a row and type a priority number.',
      'help.l3b': '<b>Note and finish-by time</b>: click a row to add a note and a target time. Both are optional and show up in the list once filled in.',
      'help.l3c': '<b>Category</b>: change a row\'s category straight from the dropdown in the list. "Manage categories" lets you add, rename and delete the categories themselves.',
      'help.l3d': '<b>Repeating work</b>: choose a daily, weekly or monthly repeat when adding a task and future entries are filled in automatically.',
      'help.l3e': '<b>Automatic carry-over</b>: unfinished daily tasks roll forward to today and are marked "Carried over".',
      'help.l3f': '<b>Editing and rescheduling</b>: click any row to edit it — including completed ones, which you can move to another date.',
      'help.l3g': '<b>Splitting</b>: "Split by week" on a monthly task and "Split by day" on a weekly task suggest how to spread the work out.',
      'help.l3h': '<b>Weekly summary</b>: press "Show weekly summary" in the Weekly tab to see that week\'s completion by category. (Uncategorised tasks are excluded.)',
      'help.h4': 'Settings and use case',
      'help.p4': 'Use the Settings button in the header to switch what you use the planner for (personal, work, study or project). You can pull in fresh categories to match, and on the work profile you can turn the KPI tab on or off.',
      'help.h5': 'Where your data lives',
      'help.p5': 'Everything you enter stays in this browser only. Nothing is sent to a server, so nobody else can see it — but clearing your browser data also clears the planner, and a new device starts empty.',

      'footer.usesTitle': 'What people use it for',
      'footer.u1': 'A study planner — daily study load, weekly plans, and a countdown to every exam and deadline',
      'footer.u2': 'A work planner — daily, weekly and monthly task plans, meetings, annual KPI goals and rating rubrics',
      'footer.u3': 'Personal planning — today\'s to-dos, appointments and birthdays, and daily habits to tick off',
      'footer.u4': 'Project tracking — splitting up work, milestone countdowns and weekly progress',
      'footer.privacy': 'No install and no sign-up, and everything you enter stays in this browser — it is never sent to a server.',

      'up.dday': 'D-DAY',
      'up.ddayLeft': 'D-{0}',
      'up.ddayPast': 'D+{0}',
    },
  };

  // 사용 용도별로 달라지는 문구. 같은 화면이라도 부르는 이름과 예시가 달라야
  // "회사용 도구"처럼 보이지 않습니다. pt()로 꺼내 쓰고, 없으면 work를 씁니다.
  const PROFILE_STRINGS = {
    ko: {
      personal: {
        subtitle: '오늘 할 일과 약속을 한 곳에서',
        addTask: '+ 할 일 추가',
        taskEmpty: '오늘 할 일이 없습니다. "+ 할 일 추가"로 적어보세요.',
        taskTitlePh: '예: 장보기, 30분 걷기',
        eventTitlePh: '예: 치과 예약, 친구 생일',
        sumHead: '이번 주 돌아보기',
        upTitle: '다가오는 약속',
        upEmpty: '예정된 약속이 없습니다.',
        footerTitle: '개인 일정 관리용 무료 플래너',
        footerDesc: '데일리 플래너는 오늘 할 일, 이번 주 계획, 약속과 기념일을 한 화면에서 관리하는 무료 웹 플래너입니다. 앱 설치나 회원가입 없이 브라우저에서 바로 쓸 수 있고, 적어둔 내용은 이 브라우저에만 저장되어 외부로 나가지 않습니다.',
        footerItems: ['일상 · 건강 · 집안일 구분으로 나눠 담는 할 일 목록', '약속과 기념일을 한눈에 보는 달력', '못 끝낸 일은 다음 날로 자동 이월', '매일 · 매주 반복되는 일 자동 등록'],
      },
      work: {
        subtitle: '업무 일정과 목표를 한 곳에서',
        addTask: '+ 업무 추가',
        taskEmpty: '등록된 업무가 없습니다. "+ 업무 추가"로 오늘 할 일을 적어보세요.',
        taskTitlePh: '예: 주간 보고서 작성',
        eventTitlePh: '예: 부서 정기회의, 설비 점검',
        sumHead: '주간 업무 요약',
        upTitle: '다가오는 일정',
        upEmpty: '예정된 일정이 없습니다.',
        footerTitle: '업무 일정과 KPI를 함께 쓰는 무료 플래너',
        footerDesc: '데일리 플래너는 일간·주간·월간 업무 계획과 일정, 연간 목표(KPI)를 한 화면에서 관리하는 무료 웹 플래너입니다. 제조업 생산현장의 SHE 업무나 수율 관리처럼 세부 지표를 다루는 업무에도 맞고, 설치나 회원가입 없이 바로 쓸 수 있습니다.',
        footerItems: ['연간 목표(KPI) 등록과 가중치 · 평가등급표 관리', '여러 날에 걸친 일정도 이어서 보여주는 달력', '구분별 주간 업무 요약으로 한 주 실적 정리', '실적 기록 및 수정'],
      },
      study: {
        subtitle: '과제와 시험 준비를 한 곳에서',
        addTask: '+ 할 일 추가',
        taskEmpty: '오늘 공부할 내용이 없습니다. "+ 할 일 추가"로 계획을 세워보세요.',
        taskTitlePh: '예: 3단원 복습, 과제 초안 쓰기',
        eventTitlePh: '예: 중간고사, 리포트 제출',
        sumHead: '주간 학습 요약',
        upTitle: '시험 · 마감 D-day',
        upEmpty: '등록된 시험이나 마감이 없습니다. [달력]에서 추가해보세요.',
        footerTitle: '공부 계획표로 쓰는 무료 웹 플래너',
        footerDesc: '데일리 플래너는 하루 공부량, 주간 학습 계획, 시험과 과제 마감을 한 화면에서 관리하는 무료 스터디 플래너입니다. 시험까지 며칠 남았는지 D-day로 바로 보여주고, 앱 설치나 회원가입 없이 브라우저에서 바로 쓸 수 있습니다.',
        footerItems: ['시험 · 과제 마감까지 남은 날짜를 D-day로 표시', '과목이나 공부 · 시험 준비로 나눠 담는 할 일 목록', '월간 계획을 주간으로, 주간을 일간으로 나눠 담기', '한 주 동안 실제로 끝낸 공부량 요약'],
      },
      project: {
        subtitle: '작업과 마일스톤을 한 곳에서',
        addTask: '+ 작업 추가',
        taskEmpty: '등록된 작업이 없습니다. "+ 작업 추가"로 할 일을 쪼개보세요.',
        taskTitlePh: '예: 화면 설계 초안, 1차 QA',
        eventTitlePh: '예: 1차 릴리스, 중간 점검 회의',
        sumHead: '주간 진행 요약',
        upTitle: '다가오는 마일스톤',
        upEmpty: '등록된 마일스톤이 없습니다. [달력]에서 추가해보세요.',
        footerTitle: '프로젝트 일정 관리용 무료 플래너',
        footerDesc: '데일리 플래너는 프로젝트 작업과 마일스톤, 일간·주간·월간 진행 계획을 한 화면에서 관리하는 무료 웹 플래너입니다. 마감까지 남은 날짜를 D-day로 보여주고, 설치나 회원가입 없이 브라우저에서 바로 쓸 수 있습니다.',
        footerItems: ['마일스톤까지 남은 날짜를 D-day로 표시', '기획 · 작업 구분으로 나눠 담는 작업 목록', '월간 작업을 주 단위로, 주간 작업을 일 단위로 분배', '한 주 동안 끝낸 작업 진행 요약'],
      },
    },
    en: {
      personal: {
        subtitle: 'Today\'s to-dos and plans in one place',
        addTask: '+ Add task',
        taskEmpty: 'Nothing for today yet. Use "+ Add task" to jot something down.',
        taskTitlePh: 'e.g. Groceries, 30 min walk',
        eventTitlePh: 'e.g. Dentist, a friend\'s birthday',
        sumHead: 'Your week in review',
        upTitle: 'Coming up',
        upEmpty: 'Nothing coming up.',
        footerTitle: 'A free planner for everyday life',
        footerDesc: 'Daily Planner keeps today\'s to-dos, this week\'s plans, appointments and birthdays on one screen. There is no app to install and no sign-up — everything you write stays in this browser and never leaves it.',
        footerItems: ['To-do lists split into everyday, health and errands', 'A calendar for appointments and birthdays', 'Unfinished tasks roll over to the next day on their own', 'Repeating daily and weekly tasks filled in for you'],
      },
      work: {
        subtitle: 'Work schedule and goals in one place',
        addTask: '+ Add task',
        taskEmpty: 'No tasks yet. Use "+ Add task" to plan your day.',
        taskTitlePh: 'e.g. Write the weekly report',
        eventTitlePh: 'e.g. Team meeting, equipment check',
        sumHead: 'Weekly summary',
        upTitle: 'Coming up',
        upEmpty: 'Nothing coming up.',
        footerTitle: 'A free planner for work schedules and KPIs',
        footerDesc: 'Daily Planner keeps daily, weekly and monthly work plans, your schedule and annual KPI goals on one screen. It suits teams tracking detailed metrics — production, SHE or yield work included — and needs no install or sign-up.',
        footerItems: ['Annual KPI goals with weighting and a rating rubric', 'A calendar that shows multi-day events continuously', 'A weekly summary of finished work by category', 'A dated log of results you can edit any time'],
      },
      study: {
        subtitle: 'Assignments and exam prep in one place',
        addTask: '+ Add task',
        taskEmpty: 'Nothing to study today. Use "+ Add task" to plan it out.',
        taskTitlePh: 'e.g. Review chapter 3, draft the essay',
        eventTitlePh: 'e.g. Midterm exam, report due',
        sumHead: 'Weekly study summary',
        upTitle: 'Exams and deadlines',
        upEmpty: 'No exams or deadlines yet. Add them from the Calendar tab.',
        footerTitle: 'A free study planner in your browser',
        footerDesc: 'Daily Planner keeps your daily study load, weekly study plan, exams and assignment deadlines on one screen. It counts down the days to each exam, and needs no app install and no sign-up.',
        footerItems: ['A countdown to every exam and assignment deadline', 'To-do lists split by subject or by study and exam prep', 'Split a monthly plan into weeks, and a week into days', 'A summary of what you actually finished each week'],
      },
      project: {
        subtitle: 'Tasks and milestones in one place',
        addTask: '+ Add task',
        taskEmpty: 'No tasks yet. Use "+ Add task" to break the work down.',
        taskTitlePh: 'e.g. Draft the screen layout, first QA pass',
        eventTitlePh: 'e.g. First release, checkpoint review',
        sumHead: 'Weekly progress summary',
        upTitle: 'Upcoming milestones',
        upEmpty: 'No milestones yet. Add them from the Calendar tab.',
        footerTitle: 'A free planner for project schedules',
        footerDesc: 'Daily Planner keeps project tasks, milestones and daily, weekly and monthly progress plans on one screen. It counts down the days to every deadline, and needs no install and no sign-up.',
        footerItems: ['A countdown to every milestone', 'Task lists split into planning and build work', 'Split monthly work into weeks, and weekly work into days', 'A weekly summary of what actually shipped'],
      },
    },
  };

  let lang = localStorage.getItem(LANG_KEY);
  if (lang !== 'ko' && lang !== 'en') {
    lang = (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  }

  function t(key) {
    const table = STRINGS[lang] || STRINGS.en;
    let s = table[key];
    if (s == null) s = STRINGS.en[key];
    if (s == null) return key;
    for (let i = 1; i < arguments.length; i++) {
      s = s.split('{' + (i - 1) + '}').join(String(arguments[i]));
    }
    return s;
  }

  // 현재 사용 용도에 맞는 문구. state가 아직 없는 시점에는 호출하지 않습니다.
  function pt(key) {
    const byLang = PROFILE_STRINGS[lang] || PROFILE_STRINGS.en;
    const p = state && state.profile;
    const v = (byLang[p] || byLang.work)[key];
    return v != null ? v : (PROFILE_STRINGS.en[p] || PROFILE_STRINGS.en.work)[key];
  }

  const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MONTHS_EN_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const WEEKDAYS = {
    ko: { sun: ['일', '월', '화', '수', '목', '금', '토'], mon: ['월', '화', '수', '목', '금', '토', '일'] },
    en: { sun: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], mon: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  };
  // 요일 이름 (0=일요일). 달력 헤더는 월요일 시작이라 별도 배열을 씁니다.
  const wd = i => WEEKDAYS[lang].sun[i];
  const monthName = m => (lang === 'ko' ? m + 1 : MONTHS_EN[m]);
  const monthNameShort = m => (lang === 'ko' ? m + 1 : MONTHS_EN_SHORT[m]);

  // 온보딩에서 고르는 "사용 용도". 용도마다 기본 구분(카테고리)이 다릅니다.
  const PROFILE_IDS = ['personal', 'work', 'study', 'project'];
  const PROFILES = {
    // landingTab: 처음 열 때 보여줄 탭 / weeklySummary: 주간 요약 패널 사용 여부
    // countdown: 다가오는 일정을 D-day로 보여줄지 (시험·마감이 중요한 용도만)
    personal: {
      taskCategories: [['life', 'cat.life', '#3f6f9c'], ['health', 'cat.health', '#2e7d5b'], ['chore', 'cat.chore', '#6b7280']],
      eventTypes: [['appointment', 'evt.appointment', '#a4508b'], ['other', 'def.other', '#6b5ca5']],
      landingTab: 'daily', weeklySummary: false, countdown: false,
    },
    work: {
      taskCategories: [['work', 'cat.work', '#3f6f9c'], ['meeting', 'cat.meeting', '#2c7f8c']],
      eventTypes: [['workSchedule', 'evt.workSchedule', '#a8681f'], ['other', 'def.other', '#6b5ca5']],
      landingTab: null, weeklySummary: true, countdown: false,
    },
    study: {
      taskCategories: [['study', 'cat.study', '#3f6f9c'], ['exam', 'cat.exam', '#b04a45']],
      eventTypes: [['exam', 'evt.exam', '#b04a45'], ['deadline', 'evt.deadline', '#a8681f']],
      landingTab: 'daily', weeklySummary: true, countdown: true,
    },
    project: {
      taskCategories: [['plan', 'cat.plan', '#6b5ca5'], ['build', 'cat.build', '#3f6f9c']],
      eventTypes: [['milestone', 'evt.milestone', '#2e7d5b'], ['meeting', 'evt.meeting', '#2c7f8c']],
      landingTab: 'monthly', weeklySummary: true, countdown: true,
    },
  };
  const profileOf = p => PROFILES[p] || PROFILES.work;
  const tagsFrom = defs => defs.map(([id, key, color]) => ({ id, label: t(key), color }));
  const DEFAULT_EVENT_TYPES = p => tagsFrom(profileOf(p).eventTypes);
  const DEFAULT_TASK_CATEGORIES = p => tagsFrom(profileOf(p).taskCategories);

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
    { key: 'm1', apply: d => addMonths(d, -1) },
    { key: 'w2', apply: d => addDays(d, -14) },
    { key: 'w1', apply: d => addDays(d, -7) },
    { key: 'd3', apply: d => addDays(d, -3) },
    { key: 'd1', apply: d => addDays(d, -1) },
  ];
  const alarmLabel = def => t('alarm.' + def.key);
  const state = loadState();
  const pointers = {
    daily: new Date(),
    weekly: new Date(),
    monthly: new Date(),
    calendar: new Date(),
  };
  let weeklySummaryOpen = (new Date().getDay() === 5); // 금요일이면 기본으로 펼침
  let activeTabName = 'kpi';

  // 왼쪽 구분 필터. 빈 값이면 전체, FILTER_NONE이면 구분을 지정하지 않은 항목만.
  const FILTER_NONE = '__none__';
  function taskMatchesFilter(task) {
    const f = state.filterCategory;
    if (!f) return true;
    if (f === FILTER_NONE) return !task.category;
    return task.category === f;
  }
  // 필터로 잡아둔 구분이 삭제됐으면 전체로 되돌립니다. 목록을 그리기 전에 불러야
  // 지워진 구분으로 걸러진 빈 목록이 잠깐 보이는 일이 없습니다.
  function pruneFilter() {
    const f = state.filterCategory;
    if (f && f !== FILTER_NONE && !state.taskCategories.some(c => c.id === f)) {
      state.filterCategory = null;
    }
  }
  function activeFilterLabel() {
    const f = state.filterCategory;
    if (f === FILTER_NONE) return t('task.noCategory');
    const cat = state.taskCategories.find(c => c.id === f);
    return cat ? cat.label : t('side.all');
  }

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && Array.isArray(raw.kpis) && Array.isArray(raw.tasks)) {
        // 온보딩이 생기기 전부터 쓰던 사용자는 지금 화면 그대로 (회사 + KPI 사용).
        if (!PROFILES[raw.profile]) raw.profile = 'work';
        if (raw.useKpi == null) raw.useKpi = true;
        if (raw.onboarded == null) raw.onboarded = true;
        if (!Array.isArray(raw.events)) raw.events = [];
        if (!Array.isArray(raw.eventTypes) || raw.eventTypes.length === 0) raw.eventTypes = DEFAULT_EVENT_TYPES(raw.profile);
        if (!Array.isArray(raw.taskCategories) || raw.taskCategories.length === 0) raw.taskCategories = DEFAULT_TASK_CATEGORIES(raw.profile);
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
    // 완전히 처음 여는 경우. onboarded=false이면 첫 화면에서 용도 선택 모달이 뜹니다.
    return {
      kpis: [], tasks: [], events: [],
      eventTypes: DEFAULT_EVENT_TYPES('work'),
      taskCategories: DEFAULT_TASK_CATEGORIES('work'),
      profile: 'work', useKpi: true, onboarded: false, filterCategory: null,
    };
  }

  // 용도를 적용합니다. resetTags가 true면 기본 구분 목록도 새로 만듭니다.
  function applyProfile(profile, useKpi, resetTags) {
    state.profile = PROFILES[profile] ? profile : 'work';
    state.useKpi = !!useKpi;
    if (resetTags) {
      state.taskCategories = DEFAULT_TASK_CATEGORIES(state.profile);
      state.eventTypes = DEFAULT_EVENT_TYPES(state.profile);
    }
  }

  // 헤더 문구와 "추가" 버튼 이름은 용도마다 다릅니다.
  function applyProfileChrome() {
    const sub = document.querySelector('.brand-sub');
    if (sub) sub.textContent = pt('subtitle');
    document.querySelectorAll('[data-add]').forEach(b => { b.textContent = pt('addTask'); });
  }

  function goToTab(name) {
    const btn = document.querySelector(`.tab-btn[data-tab="${name}"]`);
    if (!btn || btn.classList.contains('hidden')) return;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${name}`));
    activeTabName = name;
  }

  // KPI를 쓰지 않는 용도에서는 KPI 탭 자체를 감춥니다.
  function applyKpiVisibility() {
    const show = state.useKpi !== false;
    const tabBtn = document.querySelector('.tab-btn[data-tab="kpi"]');
    const panel = document.getElementById('tab-kpi');
    if (!tabBtn || !panel) return;
    tabBtn.classList.toggle('hidden', !show);
    if (show || !tabBtn.classList.contains('active')) return;
    tabBtn.classList.remove('active');
    panel.classList.remove('active');
    document.querySelector('.tab-btn[data-tab="daily"]').classList.add('active');
    document.getElementById('tab-daily').classList.add('active');
    activeTabName = 'daily';
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function uid() {
    return (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2));
  }

  function eventTypeById(id) {
    return state.eventTypes.find(x => x.id === id) || { id, label: t('tag.deleted'), color: '#8a8f98' };
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
  function monthMatrix(d) {
    const firstOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    const start = mondayOf(firstOfMonth);
    const cells = [];
    for (let i = 0; i < 42; i++) cells.push(addDays(start, i));
    return cells;
  }

  function fmtDaily(d) {
    const today = dateStr(new Date()) === dateStr(d) ? t('date.today') : '';
    return t('date.daily', d.getFullYear(), monthName(d.getMonth()), d.getDate(), wd(d.getDay())) + today;
  }
  function fmtWeekly(mon) {
    const sun = addDays(mon, 6);
    const sameMonth = mon.getMonth() === sun.getMonth();
    return sameMonth
      ? t('date.weeklySame', mon.getFullYear(), monthName(mon.getMonth()), mon.getDate(), sun.getDate())
      : t('date.weeklyCross', mon.getFullYear(), monthName(mon.getMonth()), mon.getDate(), monthName(sun.getMonth()), sun.getDate());
  }
  function fmtMonthly(d) {
    return t('date.monthly', d.getFullYear(), monthName(d.getMonth()));
  }

  // ---------- overdue daily task carry-over ----------
  function carryOverOverdueDailyTasks() {
    const todayKey = dateStr(new Date());
    const moved = [];
    state.tasks.forEach(t => {
      if (t.planType === 'daily' && !t.done && t.scopeKey < todayKey) {
        if (!t.carriedFrom) t.carriedFrom = t.scopeKey;
        t.scopeKey = todayKey;
        t.dueTime = null; // 어제 기준 목표 시간은 의미가 없으므로 비웁니다.
        moved.push(t);
      }
    });
    if (moved.length === 0) return;
    // 넘어온 업무를 1번부터 채우고, 원래 오늘 있던 업무를 그 뒤로 밉니다.
    const movedIds = new Set(moved.map(t => t.id));
    const already = tasksIn('daily', todayKey).filter(t => !movedIds.has(t.id)).sort(byPriority);
    moved.sort(byPriority).forEach((t, i) => { t.priority = i + 1; });
    already.forEach((t, i) => { t.priority = moved.length + i + 1; });
    normalizePriorities('daily', todayKey);
    saveState();
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
    const criteria = [{ id: uid(), label: t('rub.critDefault'), cells: {}, selected: null, weight: null }];
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
  const byPriority = (a, b) => (a.priority ?? Infinity) - (b.priority ?? Infinity) || a.createdAt - b.createdAt;

  function tasksIn(planType, scopeKey) {
    return state.tasks.filter(t => t.planType === planType && t.scopeKey === scopeKey);
  }

  // 한 날짜(또는 주/월) 안의 번호를 1..n으로 다시 매깁니다. 끝낸 업무가 앞 번호를
  // 그대로 차지하므로, 1·2번을 끝냈다면 남은 업무는 3번부터 이어집니다.
  function normalizePriorities(planType, scopeKey) {
    const list = tasksIn(planType, scopeKey);
    const done = list.filter(t => t.done).sort(byPriority);
    const open = list.filter(t => !t.done).sort(byPriority);
    done.concat(open).forEach((t, i) => { t.priority = i + 1; });
  }

  function defaultNextPriorityFor(planType, scopeKey) {
    return tasksIn(planType, scopeKey).length + 1;
  }
  function scopeKeyFor(planType) {
    const pointer = pointers[planType];
    if (planType === 'daily') return dateStr(pointer);
    if (planType === 'weekly') return dateStr(mondayOf(pointer));
    return monthStr(pointer);
  }
  function defaultNextPriority(planType) {
    return defaultNextPriorityFor(planType, scopeKeyFor(planType));
  }

  // 이미 쓰고 있는 번호를 지정하면 그 자리에 끼워 넣고 뒤 업무를 한 칸씩 밉니다.
  function insertAtPriority(task, wanted) {
    const others = tasksIn(task.planType, task.scopeKey).filter(t => t.id !== task.id).sort(byPriority);
    const pos = Math.min(Math.max(Number(wanted) || 1, 1), others.length + 1);
    others.splice(pos - 1, 0, task);
    others.forEach((t, i) => { t.priority = i + 1; });
    normalizePriorities(task.planType, task.scopeKey);
  }

  function reorderTask(taskId, targetId, placeAfter) {
    const task = state.tasks.find(t => t.id === taskId);
    const target = state.tasks.find(t => t.id === targetId);
    if (!task || !target || task.id === target.id) return;
    const siblings = tasksIn(task.planType, task.scopeKey).filter(t => !t.done).sort(byPriority);
    const without = siblings.filter(t => t.id !== task.id);
    const targetIdx = without.findIndex(t => t.id === target.id);
    if (targetIdx === -1) return;
    without.splice(placeAfter ? targetIdx + 1 : targetIdx, 0, task);
    without.forEach((t, i) => { t.priority = i + 1; });
    normalizePriorities(task.planType, task.scopeKey);
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
      ? t('kpi.weightSum', weightOk ? 'var(--success)' : 'var(--warn)', weightSum) + (weightOk ? '' : t('kpi.weightHint'))
      : '';
    el.innerHTML = t('kpi.summary', state.kpis.length, avg) + weightHtml;
  }

  function kpiRubricSummaryHtml(kpi) {
    const res = computeRubricResult(kpi.rubric);
    if (!res || !res.grade) return `<div class="kpi-linked-stat">${t('kpi.gradeNone')}</div>`;
    return `<div class="kpi-linked-stat">${t('kpi.gradeSummary')}<span class="rubric-grade-badge" style="background:${res.color}">${escapeHtml(res.grade.name)}</span>${t('kpi.gradeDetail', res.count, res.total, res.avg.toFixed(1))}</div>`;
  }

  function renderKpis() {
    renderKpiSummary();
    const list = document.getElementById('kpi-list');
    if (state.kpis.length === 0) {
      list.innerHTML = `<div class="empty-state" style="grid-column:1/-1">${t('kpi.empty')}</div>`;
      return;
    }
    list.innerHTML = state.kpis.map(kpi => {
      const pct = kpiProgress(kpi);
      const linked = linkedTasks(kpi.id);
      const done = linked.filter(x => x.done).length;
      const linkedInfo = linked.length ? t('kpi.linked', linked.length, done) : t('kpi.noLinked');
      const recordCount = (kpi.records || []).length;
      return `
      <div class="kpi-card" data-id="${kpi.id}">
        <div class="kpi-card-top">
          <div>
            <div class="kpi-title">${escapeHtml(kpi.title)}</div>
            <div class="kpi-year">${t('kpi.yearGoal', kpi.year)}${kpi.weight ? t('kpi.weightSuffix', kpi.weight) : ''}</div>
          </div>
          <div class="kpi-actions">
            <button class="icon-btn" data-act="edit-kpi" title="${t('btn.edit')}">${ICON.edit}</button>
            <button class="icon-btn" data-act="delete-kpi" title="${t('btn.delete')}">${ICON.trash}</button>
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
          <span class="mode-toggle" data-act="toggle-mode">${kpi.mode === 'manual' ? t('kpi.modeManual') : t('kpi.modeAuto')}</span>
        </div>
        <div class="kpi-extra-row">
          <button class="btn small" data-act="open-records">${t('kpi.records', recordCount)}</button>
          <button class="btn small" data-act="open-rubric">${kpi.rubric ? t('kpi.rubricManage') : t('kpi.rubricAdd')}</button>
        </div>
        ${kpi.rubric ? kpiRubricSummaryHtml(kpi) : ''}
      </div>`;
    }).join('');
  }

  // 일간·주간·월간 탭에서만 쓰는 구분 필터 사이드바.
  function renderSidebar() {
    const el = document.getElementById('sidebar');
    if (!el) return;
    const isPlanner = ['daily', 'weekly', 'monthly'].includes(activeTabName);
    el.classList.toggle('hidden', !isPlanner);
    if (!isPlanner) { el.innerHTML = ''; return; }
    pruneFilter();
    const list = tasksIn(activeTabName, scopeKeyFor(activeTabName));
    const openCount = fn => list.filter(x => !x.done && fn(x)).length;
    const rows = [
      { key: '', label: t('side.all'), color: null, count: openCount(() => true) },
      ...state.taskCategories.map(c => ({ key: c.id, label: c.label, color: c.color, count: openCount(x => x.category === c.id) })),
      { key: FILTER_NONE, label: t('task.noCategory'), color: null, count: openCount(x => !x.category) },
    ];
    el.innerHTML = `
      <div class="side-head">${t('side.title')}</div>
      <div class="side-list">
        ${rows.map(r => `
          <button type="button" class="side-item ${(state.filterCategory || '') === r.key ? 'active' : ''}" data-cat="${escapeHtml(r.key)}">
            <span class="side-dot" style="background:${r.color || 'var(--border-strong)'}"></span>
            <span class="side-label">${escapeHtml(r.label)}</span>
            <span class="side-count">${r.count}</span>
          </button>`).join('')}
      </div>
      <button type="button" class="btn small side-manage" data-act="manage-categories">${t('task.manageCategories')}</button>`;
  }

  function renderPlanner(type) {
    pruneFilter();
    const pointer = pointers[type];
    let scopeKey, titleText;
    if (type === 'daily') { scopeKey = dateStr(pointer); titleText = fmtDaily(pointer); }
    else if (type === 'weekly') { const mon = mondayOf(pointer); scopeKey = dateStr(mon); titleText = fmtWeekly(mon); }
    else { scopeKey = monthStr(pointer); titleText = fmtMonthly(pointer); }

    document.getElementById(`${type}-title`).textContent = titleText;

    const tasks = tasksIn(type, scopeKey).filter(taskMatchesFilter);
    const doneCount = tasks.filter(x => x.done).length;
    const summaryEl = document.getElementById(`${type}-summary`);
    summaryEl.innerHTML = tasks.length
      ? t('task.summary', tasks.length, doneCount, Math.round(doneCount / tasks.length * 100))
      : '';

    const listEl = document.getElementById(`${type}-list`);
    if (tasks.length === 0) {
      const msg = state.filterCategory
        ? t('task.emptyFiltered', escapeHtml(activeFilterLabel()))
        : escapeHtml(pt('taskEmpty'));
      listEl.innerHTML = `<div class="empty-state">${msg}</div>`;
      renderSidebar();
      return;
    }
    const sorted = [...tasks].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      const pa = a.priority ?? Infinity;
      const pb = b.priority ?? Infinity;
      if (pa !== pb) return pa - pb;
      return a.createdAt - b.createdAt;
    });
    listEl.innerHTML = sorted.map(task => {
      const kpi = task.kpiId ? state.kpis.find(k => k.id === task.kpiId) : null;
      const canReorder = !task.done;
      const cat = task.category ? taskCategoryById(task.category) : null;
      const catOptions = state.taskCategories.map(c => `<option value="${c.id}" ${task.category === c.id ? 'selected' : ''}>${escapeHtml(c.label)}</option>`).join('');
      const kpiColor = kpi ? colorForKpi(kpi.id) : null;
      return `
      <li class="task-row ${task.done ? 'done' : ''}" data-id="${task.id}">
        ${canReorder ? `<span class="drag-handle" draggable="true" title="${t('task.dragTip')}">${ICON.grip}</span>` : `<span class="drag-handle-spacer"></span>`}
        <input type="checkbox" class="task-checkbox" data-act="toggle-task" ${task.done ? 'checked' : ''}>
        <div class="task-main">
          <div class="task-line">
            ${task.priority ? `<span class="priority-badge">${task.priority}</span>` : ''}
            <span class="task-title">${escapeHtml(task.title)}</span>
            ${task.dueTime ? `<span class="meta-badge due" title="${t('task.dueTitle')}">${ICON.clock}${task.dueTime}</span>` : ''}
            ${task.carriedFrom ? `<span class="meta-badge carry" title="${t('task.carryTitle', task.carriedFrom)}">${ICON.carry}${t('task.carry')}</span>` : ''}
            ${kpi ? `<span class="kpi-tag" style="color:${kpiColor};background:${kpiColor}14;border-color:${kpiColor}40">${escapeHtml(kpi.title)}</span>` : ''}
          </div>
          ${task.note ? `<div class="task-note">${escapeHtml(task.note)}</div>` : ''}
        </div>
        <select class="inline-category-select" data-act="inline-category" style="color:${cat ? cat.color : 'var(--text-muted)'};background:${cat ? cat.color + '14' : 'var(--surface)'};border-color:${cat ? cat.color + '40' : 'var(--border)'}">
          <option value="" ${!task.category ? 'selected' : ''}>${t('task.noCategory')}</option>
          ${catOptions}
        </select>
        ${type === 'monthly' ? `<button class="btn small" data-act="split-suggest" title="${t('task.splitWeeklyTip')}">${t('task.splitWeekly')}</button>` : ''}
        ${type === 'weekly' ? `<button class="btn small" data-act="split-suggest" title="${t('task.splitDailyTip')}">${t('task.splitDaily')}</button>` : ''}
        <button class="icon-btn" data-act="delete-task" title="${t('btn.delete')}">${ICON.trash}</button>
      </li>`;
    }).join('');
    renderSidebar();
  }

  function renderWeeklySummaryPanel() {
    const panel = document.getElementById('weekly-summary-panel');
    const btn = document.getElementById('btn-weekly-summary-toggle');
    // 개인 용도에서는 주간 요약을 쓰지 않아 버튼째 숨깁니다.
    if (!profileOf(state.profile).weeklySummary) {
      btn.classList.add('hidden');
      panel.classList.add('hidden');
      panel.innerHTML = '';
      return;
    }
    btn.classList.remove('hidden');
    if (!weeklySummaryOpen) {
      panel.classList.add('hidden');
      panel.innerHTML = '';
      btn.textContent = t('sum.show');
      return;
    }
    btn.textContent = t('sum.hide');
    panel.classList.remove('hidden');

    const monday = mondayOf(pointers.weekly);
    const weekdays = [0, 1, 2, 3, 4].map(i => addDays(monday, i));
    const weekdayKeys = weekdays.map(dateStr);
    const weekTasks = state.tasks.filter(t => t.planType === 'daily' && weekdayKeys.includes(t.scopeKey) && t.category);

    const section = (title, tasks) => {
      const doneTasks = tasks.filter(x => x.done).sort((a, b) => a.scopeKey.localeCompare(b.scopeKey));
      const pending = tasks.length - doneTasks.length;
      const items = doneTasks.length
        ? doneTasks.map(x => {
            const d = new Date(x.scopeKey + 'T00:00:00');
            const label = `${monthNameShort(d.getMonth())} ${d.getDate()} (${wd(d.getDay())})`;
            return `<li><span>${escapeHtml(x.title)}</span><span class="summary-date">${label}</span></li>`;
          }).join('')
        : `<li class="summary-empty">${t('sum.empty')}</li>`;
      return `
        <div class="summary-section">
          <div class="summary-section-head">
            <span>${title}</span>
            <span class="summary-count">${t('sum.count', doneTasks.length, tasks.length)}</span>
          </div>
          <ul class="summary-items">${items}</ul>
          ${pending > 0 ? `<div class="summary-pending">${t('sum.pending', pending)}</div>` : ''}
        </div>`;
    };

    const fri = addDays(monday, 4);
    const rangeLabel = `${monthNameShort(monday.getMonth())} ${monday.getDate()} - ${monthNameShort(fri.getMonth())} ${fri.getDate()}`;
    const sectionsHtml = state.taskCategories.map((c, i) => section(`${i + 1}. ${escapeHtml(c.label)}`, weekTasks.filter(x => x.category === c.id))).join('');
    panel.innerHTML = `
      <div class="summary-panel-head">${escapeHtml(pt('sumHead'))}<span class="summary-range">${t('sum.range', rangeLabel)}</span></div>
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
        <div class="alarm-banner-title">${t('cal.alarmTitle', hits.length)}</div>
        ${hits.map(h => {
          const type = eventTypeById(h.ev.type);
          const rangeSuffix = h.ev.endDate && h.ev.endDate !== h.ev.startDate ? ' ~ ' + h.ev.endDate : '';
          return `
          <div class="alarm-item">
            <span class="calendar-chip" style="cursor:default;background:${type.color}">${escapeHtml(type.label)}</span>
            <b>${escapeHtml(h.ev.title)}</b> — ${h.ev.startDate}${h.ev.startTime ? ' ' + h.ev.startTime : ''}${rangeSuffix}${t('cal.alarmScheduled')}<span class="alarm-lead">${t('cal.alarmLead', alarmLabel(h.def))}</span>
          </div>`;
        }).join('')}
      </div>`;
  }

  // ---------- upcoming events (D-day) ----------
  function ddayLabel(dateKey) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const n = Math.round((new Date(dateKey + 'T00:00:00') - today) / 86400000);
    if (n === 0) return { text: t('up.dday'), soon: true };
    if (n > 0) return { text: t('up.ddayLeft', n), soon: n <= 7 };
    return { text: t('up.ddayPast', -n), soon: false };
  }

  // 시험·마감이 중요한 용도(공부/프로젝트)에서만 [일간] 탭 위에 D-day를 띄웁니다.
  function renderUpcomingEvents() {
    const section = document.getElementById('upcoming-section');
    if (!section) return;
    if (!profileOf(state.profile).countdown) {
      section.classList.add('hidden');
      section.innerHTML = '';
      return;
    }
    section.classList.remove('hidden');
    const todayKey = dateStr(new Date());
    const upcoming = state.events
      .filter(ev => ev.startDate && (ev.endDate || ev.startDate) >= todayKey)
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .slice(0, 5);
    const rows = upcoming.length
      ? upcoming.map(ev => {
          const type = eventTypeById(ev.type);
          const d = ddayLabel(ev.startDate);
          return `
          <div class="upcoming-row" data-id="${ev.id}">
            <span class="dday-badge ${d.soon ? 'soon' : ''}">${d.text}</span>
            <span class="calendar-chip" style="cursor:default;background:${type.color}">${escapeHtml(type.label)}</span>
            <span class="upcoming-title">${escapeHtml(ev.title)}</span>
            <span class="summary-date">${ev.startDate}</span>
          </div>`;
        }).join('')
      : `<div class="empty-state">${pt('upEmpty')}</div>`;
    section.innerHTML = `
      <div class="section-divider"></div>
      <div class="panel-head"><h2 class="section-title">${escapeHtml(pt('upTitle'))}</h2></div>
      <div class="upcoming-list">${rows}</div>`;
  }

  // 소개란도 용도에 따라 바뀝니다. (index.html의 기본 문구는 크롤러용 고정 문구)
  function renderFooter() {
    const titleEl = document.getElementById('footer-title');
    if (!titleEl) return;
    titleEl.textContent = pt('footerTitle');
    document.getElementById('footer-desc').textContent = pt('footerDesc');
    document.getElementById('footer-features').innerHTML =
      pt('footerItems').map(x => `<li>${escapeHtml(x)}</li>`).join('');
  }

  function renderUndatedEvents() {
    const list = document.getElementById('undated-events-list');
    const undated = state.events.filter(ev => !ev.startDate).sort((a, b) => a.createdAt - b.createdAt);
    if (undated.length === 0) {
      list.innerHTML = `<div class="empty-state">${t('cal.undatedEmpty')}</div>`;
      return;
    }
    list.innerHTML = undated.map(ev => {
      const type = eventTypeById(ev.type);
      return `
      <div class="undated-row" data-id="${ev.id}">
        <span class="calendar-chip" style="cursor:default;background:${type.color}">${escapeHtml(type.label)}</span>
        <span class="undated-title">${escapeHtml(ev.title)}</span>
        <div class="undated-actions">
          <button class="btn small" data-act="edit-event">${t('cal.editEvent')}</button>
          <button class="btn small" data-act="add-to-planner">${t('cal.addToPlanner')}</button>
          <button class="icon-btn" data-act="delete-event" title="${t('btn.delete')}">${ICON.trash}</button>
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
      ? t('cal.monthCount', monthEventCount)
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
    const weekdayHeader = WEEKDAYS[lang].mon.map(w => `<div class="calendar-weekday">${w}</div>`).join('');
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
      const more = extra > 0 ? `<div class="calendar-more" data-act="open-day" data-date="${key}">${t('cal.more', extra)}</div>` : '';
      return `
        <div class="calendar-cell ${outside ? 'outside' : ''} ${isToday ? 'today' : ''}">
          <div class="calendar-cell-head">
            <span class="calendar-day-num">${cellDate.getDate()}</span>
            <button class="calendar-add-btn" data-act="add-event-day" data-date="${key}" title="${t('cal.addEventTip')}">${ICON.plus}</button>
          </div>
          ${chips}
          ${more}
        </div>`;
    }).join('');

    document.getElementById('calendar-grid').innerHTML = weekdayHeader + cellsHtml;

    renderUndatedEvents();
    renderUpcomingEvents();
    renderAlarmBanner();
  }

  function renderAll() {
    renderKpis();
    renderPlanner('daily');
    renderPlanner('weekly');
    renderWeeklySummaryPanel();
    renderPlanner('monthly');
    renderCalendar();
    renderUpcomingEvents();
    renderFooter();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ---------- static (index.html) i18n ----------
  // index.html에 있는 고정 문구는 data-i18n / data-i18n-attr 속성으로 표시해두고
  // 여기서 한 번에 채워 넣습니다. 언어를 바꾸면 페이지를 새로고침해서 다시 채웁니다.
  function applyStaticI18n() {
    document.documentElement.lang = lang;
    document.title = t('app.pageTitle');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(',').forEach(pair => {
        const [attr, key] = pair.split(':');
        el.setAttribute(attr, t(key));
      });
    });
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = lang;
  }

  // ---------- modal ----------
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');

  // locked 모달(온보딩)은 바깥 클릭이나 Esc로 닫히지 않습니다.
  let modalLocked = false;

  function openModal(html, onMount, extraClass, locked) {
    modalLocked = !!locked;
    modal.className = 'modal' + (extraClass ? ' ' + extraClass : '');
    modal.innerHTML = html;
    overlay.classList.remove('hidden');
    if (onMount) onMount(modal);
    const first = modal.querySelector('input, textarea, select');
    if (first) first.focus();
  }
  function closeModal() {
    if (modalLocked) return;
    forceCloseModal();
  }
  function forceCloseModal() {
    modalLocked = false;
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
    const confirmLabel = opts.confirmLabel || t('btn.confirm');
    const cancelLabel = opts.cancelLabel || t('btn.cancel');
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
      <h2>${isEdit ? t('kpi.modalEdit') : t('kpi.modalNew')}</h2>
      <form id="kpi-form">
        <div class="field">
          <label>${t('kpi.fTitle')}</label>
          <input type="text" name="title" required value="${isEdit ? escapeHtml(existing.title) : ''}" placeholder="${t('kpi.fTitlePh')}">
        </div>
        <div class="field">
          <label>${t('kpi.fYear')}</label>
          <input type="number" name="year" required value="${isEdit ? existing.year : thisYear}">
        </div>
        <div class="field">
          <label>${t('kpi.fWeight')}</label>
          <input type="number" name="weight" min="0" max="100" step="0.1" value="${isEdit && existing.weight != null ? existing.weight : ''}" placeholder="${t('kpi.fWeightPh')}">
        </div>
        <div class="field">
          <label>${t('kpi.fDesc')}</label>
          <textarea name="description" placeholder="${t('kpi.fDescPh')}">${isEdit ? escapeHtml(existing.description || '') : ''}</textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn" data-act="cancel">${t('btn.cancel')}</button>
          <button type="submit" class="btn primary">${isEdit ? t('btn.save') : t('btn.create')}</button>
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
      <h2>${t('rec.title', escapeHtml(kpi.title))}</h2>
      <div class="records-list">
        ${records.length ? records.map(r => `
          <div class="record-row ${r.id === editingId ? 'editing' : ''}" data-id="${r.id}">
            <div class="record-main">
              <span class="record-date">${r.date}</span>
              <span class="record-value">${escapeHtml(r.value)}</span>
            </div>
            ${r.note ? `<div class="record-note">${escapeHtml(r.note)}</div>` : ''}
            <button class="icon-btn" data-act="delete-record" title="${t('btn.delete')}">${ICON.trash}</button>
          </div>`).join('') : `<div class="empty-state">${t('rec.empty')}</div>`}
      </div>
      ${records.length ? `<div class="field-hint" style="margin-bottom:8px">${t('rec.hint')}</div>` : ''}
      <div class="section-divider"></div>
      <form id="record-form">
        <div class="field"><label>${t('rec.fDate')}</label><input type="date" name="date" required value="${editing ? editing.date : dateStr(new Date())}"></div>
        <div class="field"><label>${t('rec.fValue')}</label><input type="text" name="value" required placeholder="${t('rec.fValuePh')}" value="${editing ? escapeHtml(editing.value) : ''}"></div>
        <div class="field"><label>${t('rec.fNote')}</label><textarea name="note" placeholder="${t('rec.fNotePh')}">${editing ? escapeHtml(editing.note || '') : ''}</textarea></div>
        <div class="modal-actions">
          <button type="button" class="btn" data-act="close">${t('btn.close')}</button>
          ${editing ? `<button type="button" class="btn" data-act="cancel-edit">${t('rec.cancelEdit')}</button>` : ''}
          <button type="submit" class="btn primary">${editing ? t('rec.saveEdit') : t('rec.addBtn')}</button>
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
          openConfirmDialog(t('rec.deleteConfirm'), { danger: true, confirmLabel: t('btn.delete'), onConfirm: () => {
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
      <h2>${t('rub.title', escapeHtml(kpi.title))}</h2>
      <div class="rubric-section">
        <div class="rubric-section-head">${t('rub.gradesHead')}</div>
        <div class="rubric-chip-list">
          ${grades.map((g, i) => `
            <div class="rubric-chip" style="border-color:${gradeColor(i, N)}">
              <input type="text" class="rubric-chip-input" data-field="grade-name" data-id="${g.id}" value="${escapeHtml(g.name)}">
              <span class="rubric-chip-btns">
                <button type="button" data-act="grade-up" data-id="${g.id}" title="${t('rub.gradeUp')}" ${i === 0 ? 'disabled' : ''}>${ICON.chevU}</button>
                <button type="button" data-act="grade-down" data-id="${g.id}" title="${t('rub.gradeDown')}" ${i === grades.length - 1 ? 'disabled' : ''}>${ICON.chevD}</button>
                <button type="button" data-act="grade-remove" data-id="${g.id}" title="${t('btn.delete')}">${ICON.close}</button>
              </span>
            </div>`).join('')}
        </div>
        <button type="button" class="btn small" data-act="add-grade">${t('rub.addGrade')}</button>
      </div>

      <div class="rubric-section">
        <div class="rubric-section-head">${t('rub.critHead')}</div>
        <div class="rubric-table-wrap">
          <table class="rubric-table">
            <thead>
              <tr>
                <th>${t('rub.colCrit')}</th>
                ${grades.map((g, i) => `<th style="color:${gradeColor(i, N)}">${escapeHtml(g.name)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${rubric.criteria.map(c => `
                <tr>
                  <td>
                    <input type="text" class="rubric-crit-label" data-id="${c.id}" value="${escapeHtml(c.label)}">
                    <input type="number" class="rubric-crit-weight" data-id="${c.id}" min="0" step="0.1" placeholder="${t('rub.weightPh')}" value="${c.weight != null ? c.weight : ''}">
                  </td>
                  ${grades.map((g, i) => `
                    <td class="rubric-cell ${c.selected === g.id ? 'selected' : ''}" style="${c.selected === g.id ? `border-color:${gradeColor(i, N)};background:${gradeColor(i, N)}22` : ''}">
                      <textarea class="rubric-cell-text" data-crit="${c.id}" data-grade="${g.id}" placeholder="${t('rub.cellPh')}">${escapeHtml(c.cells[g.id] || '')}</textarea>
                      <button type="button" class="rubric-select-btn" data-act="select-cell" data-crit="${c.id}" data-grade="${g.id}" style="background:${gradeColor(i, N)}">${c.selected === g.id ? t('rub.selected') : t('rub.select')}</button>
                    </td>`).join('')}
                  <td><button type="button" class="icon-btn" data-act="remove-criterion" data-id="${c.id}" title="${t('btn.delete')}">${ICON.trash}</button></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <button type="button" class="btn small" data-act="add-criterion" style="margin-top:10px">${t('rub.addCrit')}</button>
        ${(() => {
          const weightSum = Math.round(rubric.criteria.reduce((a, c) => a + (c.weight || 0), 0) * 100) / 100;
          if (kpi.weight != null) {
            const ok = Math.abs(weightSum - kpi.weight) < 0.01;
            return `<div class="rubric-weight-check ${ok ? 'ok' : 'warn'}">${t('rub.weightVsKpi', weightSum, kpi.weight)}${ok ? t('rub.weightMatch') : t('rub.weightMismatch')}</div>`;
          }
          return `<div class="rubric-weight-check">${t('rub.weightOnly', weightSum)}</div>`;
        })()}
      </div>

      <div class="rubric-result">
        ${res && res.grade
          ? `${t('kpi.gradeSummary')}<span class="rubric-grade-badge" style="background:${res.color}">${escapeHtml(res.grade.name)}</span><span class="rubric-result-detail">${t('rub.resultDetail', res.avg.toFixed(2), res.count, res.total)}</span>`
          : `<span class="rubric-result-detail">${t('rub.resultNone')}</span>`}
      </div>
      <div class="modal-actions">
        <button type="button" class="btn primary" data-act="close">${t('btn.close')}</button>
      </div>
    `;
  }

  function openRubricModal(kpi) {
    if (!kpi.rubric) kpi.rubric = defaultRubric();
    function render() {
      openModal(rubricModalHtml(kpi), root => {
        root.querySelector('[data-act="close"]').addEventListener('click', () => { closeModal(); renderKpis(); });
        root.querySelector('[data-act="add-grade"]').addEventListener('click', () => {
          kpi.rubric.grades.push({ id: uid(), name: t('rub.newGrade') });
          saveState(); render();
        });
        root.querySelectorAll('[data-act="grade-remove"]').forEach(btn => btn.addEventListener('click', () => {
          if (kpi.rubric.grades.length <= 1) { showToast(t('rub.minGrade')); return; }
          const id = btn.dataset.id;
          openConfirmDialog(t('rub.deleteGrade'), { danger: true, confirmLabel: t('btn.delete'), onConfirm: () => {
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
          kpi.rubric.criteria.push({ id: uid(), label: t('rub.newCrit'), cells: {}, selected: null, weight: null });
          saveState(); render();
        });
        root.querySelectorAll('[data-act="remove-criterion"]').forEach(btn => btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          openConfirmDialog(t('rub.deleteCrit'), { danger: true, confirmLabel: t('btn.delete'), onConfirm: () => {
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
    const typeLabel = { daily: t('tab.daily'), weekly: t('tab.weekly'), monthly: t('tab.monthly') }[planType];
    const kpiOptions = state.kpis.map(k => `<option value="${k.id}" ${isEdit && existingTask.kpiId === k.id ? 'selected' : ''}>${escapeHtml(k.title)}</option>`).join('');

    let dateFieldHtml = '';
    if (isEdit) {
      if (planType === 'daily') {
        dateFieldHtml = `<div class="field"><label>${t('task.fDate')}</label><input type="date" name="rescheduleDate" value="${existingTask.scopeKey}"></div>`;
      } else if (planType === 'weekly') {
        dateFieldHtml = `<div class="field"><label>${t('task.fWeek')}</label><input type="date" name="rescheduleDate" value="${existingTask.scopeKey}"></div>`;
      } else {
        dateFieldHtml = `<div class="field"><label>${t('task.fMonth')}</label><input type="month" name="rescheduleMonth" value="${existingTask.scopeKey}"></div>`;
      }
    }

    // 왼쪽에서 특정 구분만 보고 있으면 새 항목도 그 구분으로 미리 잡아둡니다.
    const presetCategory = isEdit ? existingTask.category
      : (state.filterCategory && state.filterCategory !== FILTER_NONE ? state.filterCategory : null);
    const categoryOptions = state.taskCategories.map(c => `<option value="${c.id}" ${presetCategory === c.id ? 'selected' : ''}>${escapeHtml(c.label)}</option>`).join('');
    const commonFields = `
        <div class="field">
          <label>${t('task.fPriority')}</label>
          <input type="number" name="priority" min="1" value="${isEdit ? (existingTask.priority ?? defaultNextPriority(planType)) : defaultNextPriority(planType)}">
        </div>
        <div class="field">
          <label>${t('task.fCategory')}</label>
          <div style="display:flex;gap:8px;align-items:center">
            <select name="category" style="flex:1">
              <option value="" ${!presetCategory ? 'selected' : ''}>${t('task.fCategoryNone')}</option>
              ${categoryOptions}
            </select>
            <button type="button" class="btn small" data-act="manage-categories">${t('task.manageCategories')}</button>
          </div>
          <div class="field-hint">${t('task.categoryHint')}</div>
        </div>`;

    const recurrenceOptionsByType = {
      daily: `<option value="none">${t('task.recNone')}</option><option value="daily">${t('task.recDaily')}</option><option value="weekly">${t('task.recWeeklySameDay')}</option>`,
      weekly: `<option value="none">${t('task.recNone')}</option><option value="weekly">${t('task.recWeekly')}</option>`,
      monthly: `<option value="none">${t('task.recNone')}</option><option value="monthly">${t('task.recMonthly')}</option>`,
    };
    const recurrenceField = !isEdit ? `
        <div class="field">
          <label>${t('task.fRecurrence')}</label>
          <select name="recurrence">${recurrenceOptionsByType[planType]}</select>
        </div>` : '';

    openModal(`
      <h2>${isEdit ? t('task.modalEdit') : t('task.modalNew', typeLabel)}</h2>
      <form id="task-form">
        <div class="field">
          <label>${t('task.fTitle')}</label>
          <input type="text" name="title" required value="${isEdit ? escapeHtml(existingTask.title) : ''}" placeholder="${escapeHtml(pt('taskTitlePh'))}">
        </div>
        ${state.useKpi !== false ? `
        <div class="field">
          <label>${t('task.fKpi')}</label>
          <select name="kpiId">
            <option value="">${t('task.fKpiNone')}</option>
            ${kpiOptions}
          </select>
        </div>` : ''}
        <div class="field">
          <label>${t('task.fNote')}</label>
          <textarea name="note" placeholder="${t('task.fNotePh')}">${isEdit ? escapeHtml(existingTask.note || '') : ''}</textarea>
        </div>
        <div class="field">
          <label>${t('task.fDue')}</label>
          <input type="time" name="dueTime" value="${isEdit ? (existingTask.dueTime || '') : ''}">
        </div>
        ${commonFields}
        ${dateFieldHtml}
        ${recurrenceField}
        ${!isEdit ? `<div class="field-hint">${t('task.addTo', label)}</div>` : ''}
        <div class="modal-actions" style="justify-content:space-between">
          ${isEdit ? `<button type="button" class="btn danger" data-act="delete">${t('btn.delete')}</button>` : '<span></span>'}
          <div style="display:flex;gap:8px">
            <button type="button" class="btn" data-act="cancel">${t('btn.cancel')}</button>
            <button type="submit" class="btn primary">${isEdit ? t('btn.save') : t('btn.add')}</button>
          </div>
        </div>
      </form>
    `, (root) => {
      root.querySelector('[data-act="cancel"]').addEventListener('click', closeModal);
      root.querySelector('[data-act="manage-categories"]').addEventListener('click', () => openTaskCategoryModal());
      if (isEdit) {
        root.querySelector('[data-act="delete"]').addEventListener('click', () => {
          openConfirmDialog(t('task.deleteConfirm'), { danger: true, confirmLabel: t('btn.delete'), onConfirm: () => {
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
          // KPI 기능이 꺼져 있으면 입력칸이 없으므로 기존 연결을 그대로 둡니다.
          if (state.useKpi !== false) existingTask.kpiId = fd.get('kpiId') || null;
          existingTask.note = fd.get('note').trim();
          existingTask.dueTime = fd.get('dueTime') || null;
          existingTask.category = fd.get('category') || null;
          const fromScope = existingTask.scopeKey;
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
          // 날짜를 옮겼으면 떠난 쪽 번호도 메워줍니다.
          insertAtPriority(existingTask, fd.get('priority'));
          if (fromScope !== existingTask.scopeKey) normalizePriorities(planType, fromScope);
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
          priority: null,
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
        // 지정한 번호 자리에 끼워 넣고 그 뒤 업무들을 한 칸씩 뒤로 밉니다.
        insertAtPriority(base, fd.get('priority') || defaultNextPriorityFor(planType, scopeKey));
        newTasks.filter(x => x !== base).forEach(x => {
          x.priority = null;
          insertAtPriority(x, defaultNextPriorityFor(x.planType, x.scopeKey));
        });
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
      options = mondayKeys.map((mon, i) => ({ key: mon, label: t('split.weekOption', i + 1, fmtWeekly(new Date(mon + 'T00:00:00'))) }));
    } else {
      const monday = mondayOf(new Date(task.scopeKey + 'T00:00:00'));
      options = [0, 1, 2, 3, 4].map(i => {
        const d = addDays(monday, i);
        return { key: dateStr(d), label: t('split.dayOption', wd(d.getDay()), `${monthNameShort(d.getMonth())} ${d.getDate()}`) };
      });
    }
    openModal(`
      <h2>${t('split.title', targetType === 'weekly' ? t('tab.weekly') : t('tab.daily'))}</h2>
      <div class="field-hint" style="margin-bottom:14px">${t('split.hint', escapeHtml(task.title))}</div>
      <form id="split-form">
        ${options.map(o => `<label class="checkbox-label" style="margin-bottom:10px"><input type="checkbox" name="opt" value="${o.key}" checked> ${o.label}</label><br>`).join('')}
        <div class="modal-actions">
          <button type="button" class="btn" data-act="cancel">${t('btn.cancel')}</button>
          <button type="submit" class="btn primary">${t('btn.create')}</button>
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
      <h2>${isEdit ? t('ev.modalEdit') : t('ev.modalNew')}</h2>
      <form id="event-form">
        <div class="field">
          <label>${t('ev.fTitle')}</label>
          <input type="text" name="title" required value="${isEdit ? escapeHtml(existing.title) : ''}" placeholder="${escapeHtml(pt('eventTitlePh'))}">
        </div>
        <div class="field">
          <label>${t('ev.fType')}</label>
          <div style="display:flex;gap:8px;align-items:center">
            <select name="type" style="flex:1">${typeOptions}</select>
            <button type="button" class="btn small" data-act="manage-types">${t('ev.manageTypes')}</button>
          </div>
        </div>
        <div class="field">
          <label class="checkbox-label"><input type="checkbox" name="undated" id="ev-undated" ${isUndated ? 'checked' : ''}> ${t('ev.undated')}</label>
        </div>
        <div class="field ${isUndated ? 'hidden' : ''}" id="ev-date-field">
          <label>${t('ev.fStartDate')}</label>
          <input type="date" name="startDate" value="${startDateVal}">
          <label style="margin-top:8px">${t('ev.fEndDate')}</label>
          <input type="date" name="endDate" value="${endDateVal}">
        </div>
        <div class="field ${isUndated ? 'hidden' : ''}" id="ev-time-field">
          <label>${t('ev.fStartTime')}</label>
          <input type="time" name="startTime" value="${isEdit ? (existing.startTime || '') : ''}">
          <label style="margin-top:8px">${t('ev.fEndTime')}</label>
          <input type="time" name="endTime" value="${isEdit ? (existing.endTime || '') : ''}">
        </div>
        <div class="field">
          <label>${t('ev.fNote')}</label>
          <textarea name="note" placeholder="${t('ev.fNotePh')}">${isEdit ? escapeHtml(existing.note || '') : ''}</textarea>
        </div>
        <div class="field ${isUndated ? 'hidden' : ''}" id="ev-alarm-field">
          <label class="checkbox-label"><input type="checkbox" name="alarmsOn" id="ev-alarms-on" ${alarmsOn ? 'checked' : ''}> ${t('ev.alarmsOn')}</label>
          <div class="alarm-checks">
            ${ALARM_DEFS.map(def => `
              <label class="checkbox-label small"><input type="checkbox" name="alarm-${def.key}" ${alarms[def.key] !== false ? 'checked' : ''}> ${alarmLabel(def)}</label>
            `).join('')}
          </div>
        </div>
        <div class="modal-actions" style="justify-content:space-between">
          ${isEdit ? `<button type="button" class="btn danger" data-act="delete">${t('btn.delete')}</button>` : '<span></span>'}
          <div style="display:flex;gap:8px">
            <button type="button" class="btn" data-act="cancel">${t('btn.cancel')}</button>
            ${isEdit ? `<button type="button" class="btn" data-act="add-to-planner">${t('cal.addToPlanner')}</button>` : ''}
            <button type="submit" class="btn primary">${isEdit ? t('btn.save') : t('btn.create')}</button>
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

      // 시작을 고르면 종료가 따라옵니다. 종료가 비었거나 시작보다 앞설 때만 손댑니다.
      const startDateInput = root.querySelector('[name="startDate"]');
      const endDateInput = root.querySelector('[name="endDate"]');
      const startTimeInput = root.querySelector('[name="startTime"]');
      const endTimeInput = root.querySelector('[name="endTime"]');
      startDateInput.addEventListener('change', () => {
        const v = startDateInput.value;
        if (!v) return;
        if (!endDateInput.value || endDateInput.value < v) endDateInput.value = v;
        endDateInput.min = v;
      });
      startTimeInput.addEventListener('change', () => {
        const v = startTimeInput.value;
        if (!v) return;
        const sameDay = !endDateInput.value || endDateInput.value === startDateInput.value;
        if (!sameDay) return; // 여러 날 일정이면 종료 시간은 건드리지 않습니다.
        if (endTimeInput.value && endTimeInput.value > v) return;
        const [h, m] = v.split(':').map(Number);
        endTimeInput.value = h >= 23 ? '23:59' : `${pad(h + 1)}:${pad(m)}`;
      });
      if (startDateInput.value) endDateInput.min = startDateInput.value;
      root.querySelector('[data-act="manage-types"]').addEventListener('click', () => openEventTypeModal());
      root.querySelector('[data-act="cancel"]').addEventListener('click', closeModal);
      if (isEdit) {
        root.querySelector('[data-act="delete"]').addEventListener('click', () => {
          openConfirmDialog(t('ev.deleteConfirm', existing.title), { danger: true, confirmLabel: t('btn.delete'), onConfirm: () => {
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
        if (!undated && !startDate) { showToast(t('ev.needStart')); return; }
        if (!undated && endDate < startDate) { showToast(t('ev.endBeforeStart')); return; }
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
    const label = t('date.dayTitle', d.getFullYear(), monthName(d.getMonth()), d.getDate(), wd(d.getDay()));
    openModal(`
      <h2>${label}${t('cal.dayTitleSuffix')}</h2>
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
        <button type="button" class="btn" data-act="close">${t('btn.close')}</button>
        <button type="button" class="btn primary" data-act="add">${t('btn.addEvent')}</button>
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
      <h2>${t('atp.title')}</h2>
      <form id="add-to-planner-form">
        <div class="field-hint" style="margin-bottom:14px">${t('atp.hint', escapeHtml(ev.title))}</div>
        <div class="field">
          <label>${t('atp.where')}</label>
          <select name="planType" id="atp-plantype">
            <option value="daily">${t('tab.daily')}</option>
            <option value="weekly">${t('tab.weekly')}</option>
            <option value="monthly">${t('tab.monthly')}</option>
          </select>
        </div>
        <div class="field" id="atp-date-field">
          <label>${t('task.fDate')}</label>
          <input type="date" name="date" value="${defaultDate}">
        </div>
        <div class="field hidden" id="atp-month-field">
          <label>${t('task.fMonth')}</label>
          <input type="month" name="month" value="${defaultMonth}">
        </div>
        <div class="modal-actions">
          <button type="button" class="btn" data-act="cancel">${t('btn.cancel')}</button>
          <button type="submit" class="btn primary">${t('btn.add')}</button>
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
        ${list.map(item => `
          <div class="type-manage-row" data-id="${item.id}">
            <input type="color" class="type-color-input" data-id="${item.id}" value="${item.color}">
            <input type="text" class="type-label-input" data-id="${item.id}" value="${escapeHtml(item.label)}">
            <button type="button" class="icon-btn" data-act="remove-tag" data-id="${item.id}" title="${t('btn.delete')}">${ICON.trash}</button>
          </div>`).join('')}
      </div>
      <button type="button" class="btn small" data-act="add-tag">${t('tag.addItem')}</button>
      <div class="modal-actions">
        <button type="button" class="btn primary" data-act="close">${t('btn.close')}</button>
      </div>`;
  }
  function openTagManagerModal(title, list, onClose) {
    function render() {
      openModal(tagManagerModalHtml(title, list), root => {
        root.querySelector('[data-act="close"]').addEventListener('click', () => { closeModal(); onClose(); });
        root.querySelector('[data-act="add-tag"]').addEventListener('click', () => {
          list.push({ id: uid(), label: t('tag.newItem'), color: PALETTE[list.length % PALETTE.length] });
          saveState(); render();
        });
        root.querySelectorAll('[data-act="remove-tag"]').forEach(btn => btn.addEventListener('click', () => {
          if (list.length <= 1) { showToast(t('tag.minOne')); return; }
          const id = btn.dataset.id;
          openConfirmDialog(t('tag.deleteConfirm'), { danger: true, confirmLabel: t('btn.delete'), onConfirm: () => {
            const idx = list.findIndex(x => x.id === id);
            if (idx !== -1) list.splice(idx, 1);
            saveState(); render();
          }});
        }));
        root.querySelectorAll('.type-label-input').forEach(inp => inp.addEventListener('input', () => {
          const item = list.find(x => x.id === inp.dataset.id);
          if (item) { item.label = inp.value; saveState(); }
        }));
        root.querySelectorAll('.type-color-input').forEach(inp => inp.addEventListener('input', () => {
          const item = list.find(x => x.id === inp.dataset.id);
          if (item) { item.color = inp.value; saveState(); }
        }));
      });
    }
    render();
  }
  function openEventTypeModal() { openTagManagerModal(t('tag.eventTypes'), state.eventTypes, renderCalendar); }
  function openTaskCategoryModal() { openTagManagerModal(t('tag.taskCategories'), state.taskCategories, renderAll); }

  // ---------- onboarding / settings ----------
  function profileCardsHtml(selected) {
    return `<div class="onb-grid">${PROFILE_IDS.map(p => `
      <button type="button" class="onb-card ${p === selected ? 'selected' : ''}" data-profile="${p}">
        <span class="onb-card-title">${t('prof.' + p)}</span>
        <span class="onb-card-desc">${t('prof.' + p + 'Desc')}</span>
      </button>`).join('')}</div>`;
  }

  // 카드 선택 + "회사일 때만 KPI 토글 노출" 동작은 온보딩/설정이 똑같아서 함께 씁니다.
  function wireProfilePicker(root, initial, onPick) {
    let picked = initial;
    const kpiField = root.querySelector('[data-role="kpi-field"]');
    const sync = () => { if (kpiField) kpiField.classList.toggle('hidden', picked !== 'work'); };
    root.querySelectorAll('.onb-card').forEach(card => card.addEventListener('click', () => {
      picked = card.dataset.profile;
      root.querySelectorAll('.onb-card').forEach(c => c.classList.toggle('selected', c === card));
      sync();
      if (onPick) onPick(picked);
    }));
    sync();
    return () => picked;
  }

  function kpiFieldHtml(checked) {
    return `
      <div class="field" data-role="kpi-field">
        <label class="checkbox-label"><input type="checkbox" name="useKpi" ${checked ? 'checked' : ''}> ${t('ob.kpiQ')}</label>
        <div class="field-hint">${t('ob.kpiHint')}</div>
      </div>`;
  }

  function openOnboardingModal() {
    openModal(`
      <h2>${t('ob.title')}</h2>
      <p class="help-intro">${t('ob.intro')}</p>
      ${profileCardsHtml(null)}
      ${kpiFieldHtml(true)}
      <div class="modal-actions">
        <button type="button" class="btn primary" data-act="start" disabled>${t('ob.start')}</button>
      </div>
    `, root => {
      const startBtn = root.querySelector('[data-act="start"]');
      const getPicked = wireProfilePicker(root, null, () => { startBtn.disabled = false; });
      startBtn.addEventListener('click', () => {
        const profile = getPicked();
        if (!profile) return;
        const useKpi = profile === 'work' && root.querySelector('[name="useKpi"]').checked;
        applyProfile(profile, useKpi, true);
        state.onboarded = true;
        saveState();
        forceCloseModal();
        applyKpiVisibility();
        applyProfileChrome();
        if (profileOf(profile).landingTab) goToTab(profileOf(profile).landingTab);
        renderAll();
      });
    }, 'modal-onboarding', true);
  }

  function openSettingsModal() {
    openModal(`
      <h2>${t('set.title')}</h2>
      <form id="settings-form">
        <div class="field">
          <label>${t('set.profile')}</label>
          ${profileCardsHtml(state.profile)}
          <div class="field-hint">${t('set.profileHint')}</div>
        </div>
        ${kpiFieldHtml(state.useKpi !== false)}
        <div class="field-hint" style="margin:-6px 0 14px">${t('set.kpiKeep')}</div>
        <div class="field">
          <label class="checkbox-label"><input type="checkbox" name="resetTags"> ${t('set.resetCats')}</label>
          <div class="field-hint">${t('set.resetCatsHint')}</div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn" data-act="cancel">${t('btn.cancel')}</button>
          <button type="submit" class="btn primary">${t('btn.save')}</button>
        </div>
      </form>
    `, root => {
      const getPicked = wireProfilePicker(root, state.profile);
      root.querySelector('[data-act="cancel"]').addEventListener('click', closeModal);
      root.querySelector('#settings-form').addEventListener('submit', e => {
        e.preventDefault();
        const profile = getPicked();
        const useKpi = profile === 'work' && root.querySelector('[name="useKpi"]').checked;
        applyProfile(profile, useKpi, root.querySelector('[name="resetTags"]').checked);
        saveState();
        closeModal();
        applyKpiVisibility();
        applyProfileChrome();
        renderAll();
      });
    });
  }

  // ---------- help ----------
  function helpModalHtml() {
    // KPI를 쓰지 않는 용도면 KPI 설명은 빼고, 번호는 남은 항목 기준으로 다시 매깁니다.
    const sections = [
      state.useKpi !== false && { key: 'h1', p: 'p1', items: ['l1a', 'l1b', 'l1c', 'l1d'] },
      { key: 'h2', p: 'p2', items: ['l2a', 'l2b', 'l2c', 'l2d', 'l2e'] },
      { key: 'h3', p: 'p3', items: ['l3a', 'l3b', 'l3c', 'l3d', 'l3e', 'l3f', 'l3g', 'l3h'] },
      { key: 'h4', p: 'p4', items: [] },
      { key: 'h5', p: 'p5', items: [] },
    ].filter(Boolean);
    return `
      <h2>${t('help.title')}</h2>
      <p class="help-intro">${t('help.intro')}</p>
      <div class="help-content">
        ${sections.map((s, i) => `
        <section class="help-section">
          <h3>${i + 1}. ${t('help.' + s.key)}</h3>
          <p>${t('help.' + s.p)}</p>
          ${s.items.length ? `<ul>${s.items.map(k => `<li>${t('help.' + k)}</li>`).join('')}</ul>` : ''}
        </section>`).join('')}
      </div>
      <div class="modal-actions">
        <button type="button" class="btn primary" data-act="close">${t('btn.close')}</button>
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
    activeTabName = btn.dataset.tab;
    renderSidebar();
  });

  document.getElementById('sidebar').addEventListener('click', e => {
    if (e.target.closest('[data-act="manage-categories"]')) { openTaskCategoryModal(); return; }
    const item = e.target.closest('.side-item');
    if (!item) return;
    state.filterCategory = item.dataset.cat || null;
    saveState();
    ['daily', 'weekly', 'monthly'].forEach(renderPlanner);
  });

  document.getElementById('btn-add-kpi').addEventListener('click', () => openKpiModal(null));
  document.getElementById('btn-help').addEventListener('click', openHelpModal);
  document.getElementById('btn-settings').addEventListener('click', openSettingsModal);

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
      openConfirmDialog(t('cal.deleteEventConfirm', ev.title), { danger: true, confirmLabel: t('btn.delete'), onConfirm: () => {
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
      openConfirmDialog(t('kpi.deleteConfirm', kpi.title), { danger: true, confirmLabel: t('btn.delete'), onConfirm: () => {
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

  const langSelectEl = document.getElementById('lang-select');
  if (langSelectEl) {
    langSelectEl.addEventListener('change', () => {
      localStorage.setItem(LANG_KEY, langSelectEl.value);
      location.reload();
    });
  }

  applyStaticI18n();
  applyKpiVisibility();
  applyProfileChrome();
  if (profileOf(state.profile).landingTab) goToTab(profileOf(state.profile).landingTab);
  carryOverOverdueDailyTasks();
  renderAll();
  if (!state.onboarded) openOnboardingModal();
})();
