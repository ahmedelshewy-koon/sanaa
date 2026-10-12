const embedded = new URLSearchParams(location.search).has('embed');
document.documentElement.classList.toggle('embed-mode', embedded);

const tasks = [
  {title:'تجهيز خطة إطلاق المنتج', project:'إطلاق المنصة', owner:'أحمد الشمري', due:'15 أكتوبر', priority:'عالية', state:'قيد التنفيذ'},
  {title:'مراجعة تصميم صفحة التسجيل', project:'تطوير الموقع', owner:'سارة العتيبي', due:'13 أكتوبر', priority:'متوسطة', state:'قيد التنفيذ'},
  {title:'اعتماد محتوى الحملة', project:'الحملة التسويقية', owner:'نورة القحطاني', due:'14 أكتوبر', priority:'عالية', state:'للمراجعة'},
  {title:'اختبار تجربة الهاتف', project:'تطوير الموقع', owner:'محمد الغامدي', due:'16 أكتوبر', priority:'متوسطة', state:'لم تبدأ'},
  {title:'تحديث قائمة العملاء', project:'إطلاق المنصة', owner:'ريم المطيري', due:'18 أكتوبر', priority:'منخفضة', state:'لم تبدأ'},
  {title:'إعداد تقرير التقدم الأسبوعي', project:'إطلاق المنصة', owner:'أحمد الشمري', due:'12 أكتوبر', priority:'متوسطة', state:'مكتملة'},
];
const projects = [
  {name:'إطلاق المنصة', description:'تنسيق خطوات الإطلاق بين فرق المنتج والتسويق.', done:72, count:'18 من 25 مهمة'},
  {name:'تطوير الموقع', description:'تحسين تجربة الموقع وصفحات التسجيل.', done:58, count:'11 من 19 مهمة'},
  {name:'الحملة التسويقية', description:'إعداد المواد ومراجعة محتوى الحملة.', done:36, count:'5 من 14 مهمة'},
];
const views = {dashboard:'لوحة التحكم', projects:'المشاريع', tasks:'كل المهام', board:'لوحة العمل', mine:'مهامي'};
const content = document.querySelector('#demo-content');
const navLinks = [...document.querySelectorAll('.demo-nav a')];
const stateStyle = value => value === 'لم تبدأ' ? 'neutral' : value === 'للمراجعة' ? 'warning' : value === 'مكتملة' ? '' : 'warning';
const status = value => `<span class="status ${stateStyle(value)}">${value}</span>`;
const header = (title, description, action = '') => `<div class="page-head"><div><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
const stat = (label, value, detail, icon) => `<article class="stat-card"><div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon" aria-hidden="true">${icon}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
const action = label => `<button class="primary-btn" type="button" data-demo-action="${label}">${label}</button>`;
const taskItem = task => `<div class="task-item"><span class="task-check" aria-hidden="true">${task.state === 'مكتملة' ? '✓' : '◇'}</span><span class="task-copy"><b>${task.title}</b><small>${task.project} · ${task.owner} · ${task.due}</small></span>${status(task.state)}</div>`;
const progress = project => `<div class="progress-row"><div class="progress-head"><span>${project.count}</span><strong>${project.done}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${project.done}%"></div></div></div>`;

function dashboardView() {
  return `<section class="content">${header('لوحة التحكم','صورة واضحة عن مشاريع فريقك وما يحتاج متابعة اليوم.',action('مهمة جديدة'))}
    <div class="stats">${stat('مهام قيد التنفيذ','12','في جميع المشاريع','▤')}${stat('تحتاج مراجعة','4','بانتظار اعتمادك','◷')}${stat('مكتملة هذا الأسبوع','19','من إجمالي مهام الفريق','✓')}${stat('مشاريع نشطة','3','يجري العمل عليها','◇')}</div>
    <div class="portal-grid"><article class="portal-card"><span class="action-symbol">▤</span><h2>مشاريعي</h2><p>تابع تقدم المشاريع ومهام الفريق.</p><a href="#projects">عرض المشاريع ←</a></article><article class="portal-card"><span class="action-symbol">✓</span><h2>كل المهام</h2><p>ابحث عن المهام وتابع حالتها وأولويتها.</p><a href="#tasks">عرض المهام ←</a></article><article class="portal-card"><span class="action-symbol">◷</span><h2>لوحة العمل</h2><p>اعرف ما بدأ وما ينتظر المراجعة.</p><a href="#board">فتح اللوحة ←</a></article></div>
    <section class="panel wide-panel"><div class="panel-title"><h2>مهام تحتاج متابعة</h2><a href="#mine">عرض مهامي ←</a></div><div class="task-list">${tasks.filter(task => task.state === 'للمراجعة' || task.priority === 'عالية').map(taskItem).join('')}</div></section>
  </section>`;
}
function projectsView() {
  return `<section class="content">${header('المشاريع','تقدم كل مشروع وأعمال الفريق في مكان واحد.',action('مشروع جديد'))}
    <div class="stats">${stat('مشاريع نشطة','3','تحت التنفيذ','▤')}${stat('إجمالي المهام','58','في المشاريع الحالية','◇')}${stat('مهام مكتملة','34','عبر كل المشاريع','✓')}${stat('تحتاج متابعة','7','قريبة من الموعد','◷')}</div>
    <div class="project-list">${projects.map(project => `<article class="project-card"><h2>${project.name}</h2><p>${project.description}</p>${progress(project)}</article>`).join('')}</div>
  </section>`;
}
function tasksView() {
  return `<section class="content">${header('كل المهام','ابحث في المهام وصفِّ النتائج حسب الحالة.',action('مهمة جديدة'))}
    <section class="panel"><div class="panel-title"><h2>قائمة المهام</h2><span class="sample-label">بيانات توضيحية</span></div><div class="table-tools"><input class="search" id="task-search" type="search" placeholder="ابحث باسم المهمة أو المشروع أو المسؤول" aria-label="بحث المهام"><select class="filter" id="task-state" aria-label="تصفية حسب حالة المهمة"><option value="">كل الحالات</option><option>لم تبدأ</option><option>قيد التنفيذ</option><option>للمراجعة</option><option>مكتملة</option></select></div><div id="tasks-table"></div></section>
  </section>`;
}
function renderTasksTable() {
  const query = document.querySelector('#task-search')?.value.trim().toLocaleLowerCase('ar') || '';
  const filter = document.querySelector('#task-state')?.value || '';
  const rows = tasks.filter(task => (!filter || task.state === filter) && `${task.title} ${task.project} ${task.owner}`.toLocaleLowerCase('ar').includes(query));
  const target = document.querySelector('#tasks-table');
  target.innerHTML = rows.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">المهمة</th><th scope="col">المشروع</th><th scope="col">المسؤول</th><th scope="col">الموعد</th><th scope="col">الأولوية</th><th scope="col">الحالة</th></tr></thead><tbody>${rows.map(task => `<tr><td>${task.title}</td><td>${task.project}</td><td>${task.owner}</td><td>${task.due}</td><td>${task.priority}</td><td>${status(task.state)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state">لا توجد مهام مطابقة للبحث.</div>';
}
function boardView() {
  const columns = ['لم تبدأ','قيد التنفيذ','للمراجعة'];
  return `<section class="content">${header('لوحة العمل','تابع انتقال المهام بين مراحل التنفيذ.',`<a class="soft-btn" href="#tasks">عرض القائمة ←</a>`)}
    <div class="board-grid">${columns.map(column => {const items = tasks.filter(task => task.state === column);return `<section class="board-column"><h2>${column}<span>${items.length}</span></h2>${items.map(task => `<article class="board-task"><b>${task.title}</b><small>${task.project} · ${task.owner}<br>الموعد: ${task.due}</small></article>`).join('')}</section>`}).join('')}</div>
  </section>`;
}
function mineView() {
  const mine = tasks.filter(task => task.owner === 'أحمد الشمري');
  return `<section class="content">${header('مهامي','كل ما كُلّفت به ومواعيده في مكان واحد.',action('مهمة جديدة'))}
    <div class="stats">${stat('مهامي المفتوحة','1','تحتاج إلى إكمال','◇')}${stat('قيد التنفيذ','1','أعمل عليها الآن','◷')}${stat('مكتملة','1','هذا الأسبوع','✓')}${stat('مشاريعي','1','مشروع نشط','▤')}</div>
    <section class="panel"><div class="panel-title"><h2>المهام المسندة إليّ</h2><a href="#tasks">كل المهام ←</a></div><div class="task-list">${mine.map(taskItem).join('')}</div></section>
  </section>`;
}
const renderers = {dashboard:dashboardView, projects:projectsView, tasks:tasksView, board:boardView, mine:mineView};
function render() {
  const requested = location.hash.slice(1);
  const key = Object.hasOwn(views, requested) ? requested : 'dashboard';
  document.title = `${views[key]} | معاينة سنع Tasks`;
  document.querySelector('#current-view-title').textContent = views[key];
  navLinks.forEach(link => {const active = link.dataset.view === key; link.classList.toggle('active',active); active ? link.setAttribute('aria-current','page') : link.removeAttribute('aria-current')});
  content.innerHTML = renderers[key]() + '<div class="notice" id="demo-notice" hidden role="status"></div>';
  if (key === 'tasks') renderTasksTable();
  document.querySelector('#sidebar').classList.remove('open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'instant'});
}
document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('ar-SA',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());
document.querySelector('#menu-toggle').addEventListener('click', event => {const opened = document.querySelector('#sidebar').classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(opened));event.currentTarget.setAttribute('aria-label',opened?'إغلاق القائمة':'فتح القائمة')});
document.addEventListener('input', event => {if (event.target.id === 'task-search') renderTasksTable()});
document.addEventListener('change', event => {if (event.target.id === 'task-state') renderTasksTable()});
document.addEventListener('click', event => {const trigger = event.target.closest('[data-demo-action]');if (!trigger) return;const notice = document.querySelector('#demo-notice');notice.hidden = false;notice.textContent = `${trigger.dataset.demoAction}: هذه معاينة ببيانات توضيحية. يمكنك تجربة التبويبات والبحث والتصفية.`;notice.scrollIntoView({block:'nearest',behavior:'smooth'})});
window.addEventListener('hashchange', render);
render();
