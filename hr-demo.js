const embedded = new URLSearchParams(location.search).has('embed');
document.documentElement.classList.toggle('embed-mode', embedded);
const employees = [
  {name:'أحمد خالد الشمري', id:'EMP-001', role:'مدير الموارد البشرية', department:'الموارد البشرية', joined:'15 يناير 2023', status:'على رأس العمل'},
  {name:'سارة محمد العتيبي', id:'EMP-002', role:'أخصائية توظيف', department:'الموارد البشرية', joined:'08 مارس 2024', status:'على رأس العمل'},
  {name:'نورة عبدالله القحطاني', id:'EMP-003', role:'مصممة تجربة المستخدم', department:'التقنية', joined:'22 يونيو 2023', status:'إجازة'},
  {name:'خالد علي الدوسري', id:'EMP-004', role:'محاسب أول', department:'المالية', joined:'10 سبتمبر 2022', status:'على رأس العمل'},
  {name:'أمل إبراهيم الحربي', id:'EMP-005', role:'مديرة المشاريع', department:'العمليات', joined:'03 فبراير 2024', status:'على رأس العمل'},
  {name:'محمد فهد الغامدي', id:'EMP-006', role:'مطور واجهات', department:'التقنية', joined:'17 أبريل 2025', status:'عن بعد'},
  {name:'ريم صالح المطيري', id:'EMP-007', role:'مسؤولة خدمة العملاء', department:'العمليات', joined:'11 يوليو 2024', status:'على رأس العمل'},
  {name:'عبدالله راشد الشهري', id:'EMP-008', role:'محلل بيانات', department:'المالية', joined:'29 نوفمبر 2023', status:'على رأس العمل'}
];
const attendance = [
  ['أحمد خالد الشمري','08:02 ص','04:35 م','8 س 33 د','حاضر'],
  ['سارة محمد العتيبي','08:13 ص','04:40 م','8 س 27 د','حاضر'],
  ['نورة عبدالله القحطاني','—','—','—','إجازة'],
  ['خالد علي الدوسري','08:51 ص','05:10 م','8 س 19 د','متأخر'],
  ['أمل إبراهيم الحربي','08:05 ص','04:31 م','8 س 26 د','حاضر'],
  ['محمد فهد الغامدي','08:20 ص','04:50 م','8 س 30 د','عن بعد']
];
const leaves = [
  ['سارة محمد العتيبي','إجازة سنوية','18–21 أكتوبر 2026','4 أيام','قيد الانتظار'],
  ['نورة عبدالله القحطاني','إجازة سنوية','12–16 أكتوبر 2026','5 أيام','معتمد'],
  ['خالد علي الدوسري','إجازة اضطرارية','24 أكتوبر 2026','يوم واحد','قيد الانتظار'],
  ['ريم صالح المطيري','إجازة مرضية','09 أكتوبر 2026','يوم واحد','معتمد'],
  ['عبدالله راشد الشهري','إجازة سنوية','04–06 نوفمبر 2026','3 أيام','مرفوض']
];
const views = {dashboard:'لوحة التحكم',employees:'الموظفون',attendance:'الحضور والانصراف',leaves:'إدارة الإجازات',portal:'بوابة الموظف'};
const content = document.querySelector('#demo-content');
const navLinks = [...document.querySelectorAll('.demo-nav a')];
const status = value => `<span class="status ${['متأخر','قيد الانتظار','إجازة'].includes(value)?'warning':['مرفوض','غائب'].includes(value)?'danger':value==='عن بعد'?'neutral':''}">${value}</span>`;
const initials = name => name.split(' ').slice(0,2).map(part=>part[0]).join('');
const person = (name,id='') => `<span class="person"><span class="person-avatar">${initials(name)}</span><span>${name}${id?`<small>${id}</small>`:''}</span></span>`;
const header = (title,description,action='') => `<div class="page-head"><div><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
const stat = (label,value,detail,icon) => `<article class="stat-card"><div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon" aria-hidden="true">${icon}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
const table = (head,rows) => `<div class="table-wrap"><table class="data-table"><thead><tr>${head.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
const demoAction = label => `<button class="primary-btn" type="button" data-demo-action="${label}">${label}</button>`;

function dashboardView(){
  const bars=[72,88,80,95,91,76,84];
  return `<section class="content">${header('لوحة التحكم','صورة واضحة عن فريقك وما يحتاج متابعة اليوم.',`<a class="soft-btn" href="#employees">عرض الموظفين ←</a>`)}
    <div class="stats">${stat('إجمالي الموظفين','128','+ 8 موظفين هذا الشهر','♙')}${stat('في الموعد','112','من أصل 128 موظفًا','✓')}${stat('طلبات قيد المراجعة','6','تحتاج إلى موافقتك','▤')}${stat('في إجازة اليوم','4','إجازات معتمدة','◷')}</div>
    <div class="dashboard-grid"><section class="panel"><div class="panel-title"><h2>مهامي اليوم</h2><a href="#portal">عرض بوابة الموظف ←</a></div><div class="action-grid">
      <a class="action-card" href="#leaves"><span class="action-symbol">▤</span><span><b>مراجعة طلبات الإجازة</b><br><span>طلبان بانتظار الموافقة</span></span></a>
      <a class="action-card" href="#attendance"><span class="action-symbol">◷</span><span><b>اعتماد حضور اليوم</b><br><span>سجل واحد يحتاج مراجعة</span></span></a>
      <a class="action-card" href="#employees"><span class="action-symbol">♙</span><span><b>ملفات الموظفين</b><br><span>حدّث بيانات الفريق</span></span></a>
    </div></section><section class="panel"><div class="panel-title"><h2>حالة الطلبات</h2><a href="#leaves">كل الطلبات ←</a></div><div class="summary-list"><div class="summary-row"><span>طلبات معتمدة</span><strong>72</strong></div><div class="summary-row"><span>قيد الانتظار</span><strong>34</strong></div><div class="summary-row"><span>طلبات مرفوضة</span><strong>22</strong></div></div></section></div>
    <section class="panel wide-panel"><div class="panel-title"><h2>ملخص الحضور هذا الأسبوع</h2><a href="#attendance">تفاصيل الحضور ←</a></div><div class="mini-bars" aria-label="نسب الحضور خلال أيام الأسبوع">${bars.map((n,i)=>`<div class="bar-wrap"><div class="bar" style="height:${n}%"></div><small>${['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'][i]}</small></div>`).join('')}</div></section>
  </section>`;
}
function employeesView(){
  return `<section class="content">${header('الموظفون','تعرّف على فريقك وابحث في الملفات والوظائف والأقسام.',demoAction('إضافة موظف'))}
    <div class="stats">${stat('إجمالي الموظفين','128','جميع الأقسام','♙')}${stat('على رأس العمل','119','موظفون نشطون','✓')}${stat('عن بعد','5','اليوم','⌂')}${stat('في إجازة','4','اليوم','▤')}</div>
    <section class="panel"><div class="panel-title"><h2>دليل الموظفين</h2><span class="sample-label">${employees.length} سجلات توضيحية</span></div><div class="table-tools"><input class="search" id="employee-search" type="search" placeholder="ابحث بالاسم أو الوظيفة أو القسم" aria-label="بحث الموظفين"><select class="filter" id="employee-department" aria-label="تصفية حسب القسم"><option value="">كل الأقسام</option>${[...new Set(employees.map(e=>e.department))].map(d=>`<option>${d}</option>`).join('')}</select></div><div id="employees-table"></div></section>
  </section>`;
}
function renderEmployeesTable(){
  const query=document.querySelector('#employee-search')?.value.trim().toLocaleLowerCase('ar')||'';
  const department=document.querySelector('#employee-department')?.value||'';
  const rows=employees.filter(e=>(!department||e.department===department)&&`${e.name} ${e.role} ${e.department}`.toLocaleLowerCase('ar').includes(query)).slice(0,embedded?5:employees.length).map(e=>`<tr><td>${person(e.name,e.id)}</td><td>${e.role}</td><td>${e.department}</td><td>${e.joined}</td><td>${status(e.status)}</td></tr>`);
  document.querySelector('#employees-table').innerHTML=rows.length?table(['الموظف','الوظيفة','القسم','تاريخ الانضمام','الحالة'],rows):'<div class="empty-state">لا توجد نتائج مطابقة للبحث.</div>';
}
function attendanceView(){
  return `<section class="content">${header('الحضور والانصراف','تابع أوقات دوام الفريق وسجلات اليوم.',demoAction('تصدير التقرير'))}
    <div class="stats">${stat('في الموعد','112','88% من الفريق','✓')}${stat('متأخر','6','يحتاجون متابعة','◷')}${stat('عن بعد','5','يعملون خارج المكتب','⌂')}${stat('غائب أو إجازة','5','اليوم','–')}</div>
    <div class="split-grid"><section class="panel"><div class="panel-title"><h2>سجل الحضور اليوم</h2><span class="sample-label">بيانات تجريبية</span></div>${table(['الموظف','الحضور','الانصراف','مدة العمل','الحالة'],attendance.slice(0,embedded?4:attendance.length).map(a=>`<tr><td>${person(a[0])}</td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td>${status(a[4])}</td></tr>`))}</section><section class="panel"><div class="panel-title"><h2>مؤشرات الحضور</h2></div><div class="progress-row"><div class="progress-head"><span>الالتزام بوقت الدوام</span><strong>88%</strong></div><div class="progress-track"><div class="progress-fill" style="width:88%"></div></div></div><div class="progress-row"><div class="progress-head"><span>سجلات الحضور المكتملة</span><strong>94%</strong></div><div class="progress-track"><div class="progress-fill" style="width:94%"></div></div></div><div class="progress-row"><div class="progress-head"><span>العمل عن بعد</span><strong>12%</strong></div><div class="progress-track"><div class="progress-fill" style="width:12%"></div></div></div></section></div>
  </section>`;
}
function leavesView(){
  return `<section class="content">${header('إدارة الإجازات','كل الطلبات وأرصدة الإجازات في مكان واحد.',demoAction('طلب إجازة'))}
    <div class="stats">${stat('إجمالي الطلبات','128','منذ بداية السنة','▤')}${stat('قيد الانتظار','6','تحتاج مراجعة','◷')}${stat('معتمدة','100','حتى اليوم','✓')}${stat('الرصيد المتوسط','18 يوم','لكل موظف','◇')}</div>
    <section class="panel"><div class="panel-title"><h2>طلبات الإجازة</h2><span class="sample-label">سجلات توضيحية</span></div><div class="table-tools"><select class="filter" id="leave-filter" aria-label="تصفية حسب حالة الطلب"><option value="">كل الحالات</option><option>قيد الانتظار</option><option>معتمد</option><option>مرفوض</option></select></div><div id="leaves-table"></div></section>
  </section>`;
}
function renderLeavesTable(){
  const filter=document.querySelector('#leave-filter')?.value||'';
  const rows=leaves.filter(l=>!filter||l[4]===filter).map(l=>`<tr><td>${person(l[0])}</td><td>${l[1]}</td><td>${l[2]}</td><td>${l[3]}</td><td>${status(l[4])}</td></tr>`);
  document.querySelector('#leaves-table').innerHTML=rows.length?table(['الموظف','نوع الإجازة','الفترة','المدة','الحالة'],rows):'<div class="empty-state">لا توجد طلبات بهذه الحالة.</div>';
}
function portalView(){
  return `<section class="content">${header('بوابة الموظف','مساحة الموظف للوصول السريع إلى بياناته وطلباته.',demoAction('طلب جديد'))}
    <div class="stats">${stat('رصيد الإجازات','21 يوم','من أصل 30 يومًا','▤')}${stat('طلبات مفتوحة','2','بانتظار المراجعة','◷')}${stat('أيام الحضور','19 يوم','هذا الشهر','✓')}${stat('مهام مطلوبة','3','إجراءات تحتاج إكمالًا','◇')}</div>
    <div class="portal-grid"><article class="portal-card"><span class="action-symbol">♙</span><h2>ملفي الشخصي</h2><p>البيانات الوظيفية وطرق التواصل.</p><a href="#employees">استعراض الموظفين ←</a></article><article class="portal-card"><span class="action-symbol">▤</span><h2>إجازاتي وطلباتي</h2><p>تابع الطلبات والرصيد المتاح.</p><a href="#leaves">عرض الطلبات ←</a></article><article class="portal-card"><span class="action-symbol">◷</span><h2>سجل الدوام</h2><p>أوقات الحضور والانصراف اليومية.</p><a href="#attendance">عرض الحضور ←</a></article></div>
    <section class="panel wide-panel"><div class="panel-title"><h2>هذا الأسبوع</h2><span class="sample-label">جدول توضيحي</span></div><div class="calendar-week">${['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'].map((d,i)=>`<div class="calendar-day ${i===1?'today':''}"><span>${d}</span><b>${11+i}</b></div>`).join('')}</div></section>
  </section>`;
}
const renderers={dashboard:dashboardView,employees:employeesView,attendance:attendanceView,leaves:leavesView,portal:portalView};
function render(){
  const view=location.hash.slice(1);
  const key=Object.hasOwn(views,view)?view:'dashboard';
  document.title=`${views[key]} | معاينة سنع HR`;
  document.querySelector('#current-view-title').textContent=views[key];
  navLinks.forEach(link=>{const active=link.dataset.view===key;link.classList.toggle('active',active);active?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current')});
  content.innerHTML=renderers[key]()+`<div class="notice" id="demo-notice" hidden role="status"></div>`;
  if(key==='employees')renderEmployeesTable();
  if(key==='leaves')renderLeavesTable();
  document.querySelector('#sidebar').classList.remove('open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'instant'});
}
document.querySelector('#today-date').textContent=new Intl.DateTimeFormat('ar-SA',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());
document.querySelector('#menu-toggle').addEventListener('click',event=>{const opened=document.querySelector('#sidebar').classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(opened));event.currentTarget.setAttribute('aria-label',opened?'إغلاق القائمة':'فتح القائمة')});
document.addEventListener('input',event=>{if(event.target.id==='employee-search')renderEmployeesTable()});
document.addEventListener('change',event=>{if(event.target.id==='employee-department')renderEmployeesTable();if(event.target.id==='leave-filter')renderLeavesTable()});
document.addEventListener('click',event=>{const action=event.target.closest('[data-demo-action]');if(!action)return;const notice=document.querySelector('#demo-notice');notice.hidden=false;notice.textContent=`${action.dataset.demoAction}: هذه معاينة ببيانات توضيحية. يمكنك تجربة التبويبات والبحث والتصفية.`;notice.scrollIntoView({block:'nearest',behavior:'smooth'})});
window.addEventListener('hashchange',render);
render();
