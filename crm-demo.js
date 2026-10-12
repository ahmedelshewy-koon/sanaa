const embedded = new URLSearchParams(location.search).has('embed');
document.documentElement.classList.toggle('embed-mode', embedded);

const contacts = [
  {name:'شركة الأفق الرقمية', segment:'تقنية', contact:'سارة العتيبي', owner:'أحمد الشمري', status:'نشط'},
  {name:'مؤسسة النخبة التجارية', segment:'تجارة', contact:'خالد الدوسري', owner:'نورة القحطاني', status:'نشط'},
  {name:'مجموعة روافد', segment:'خدمات', contact:'ريم المطيري', owner:'أحمد الشمري', status:'متابعة'},
  {name:'شركة المدار اللوجستية', segment:'لوجستيات', contact:'محمد الغامدي', owner:'سارة العتيبي', status:'نشط'},
  {name:'حلول البناء الحديثة', segment:'مقاولات', contact:'عبدالله الشهري', owner:'نورة القحطاني', status:'محتمل'},
  {name:'منصة مدار التعليمية', segment:'تعليم', contact:'أمل الحربي', owner:'أحمد الشمري', status:'نشط'},
];
const opportunities = [
  {name:'اشتراك المنصة السنوي', customer:'شركة الأفق الرقمية', value:'48,000 ر.س', owner:'أحمد الشمري', stage:'تفاوض'},
  {name:'توسعة باقة الفريق', customer:'مؤسسة النخبة التجارية', value:'24,000 ر.س', owner:'نورة القحطاني', stage:'عرض سعر'},
  {name:'أتمتة المبيعات', customer:'مجموعة روافد', value:'36,000 ر.س', owner:'أحمد الشمري', stage:'جديدة'},
  {name:'ربط فرق التشغيل', customer:'شركة المدار اللوجستية', value:'18,000 ر.س', owner:'سارة العتيبي', stage:'تفاوض'},
  {name:'تجديد الاشتراك', customer:'منصة مدار التعليمية', value:'30,000 ر.س', owner:'أحمد الشمري', stage:'مغلقة'},
];
const activities = [
  {title:'مكالمة متابعة مع شركة الأفق الرقمية', detail:'اليوم · 10:30 ص · أحمد الشمري', status:'قادم'},
  {title:'إرسال عرض سعر لمؤسسة النخبة', detail:'اليوم · 12:00 م · نورة القحطاني', status:'قادم'},
  {title:'اجتماع استكشافي مع مجموعة روافد', detail:'غدًا · 11:00 ص · أحمد الشمري', status:'مجدول'},
  {title:'مراجعة احتياجات شركة المدار', detail:'أمس · سارة العتيبي', status:'مكتمل'},
];
const views = {dashboard:'لوحة التحكم',contacts:'العملاء',opportunities:'الفرص البيعية',activities:'الأنشطة',reports:'التقارير'};
const content = document.querySelector('#demo-content');
const navLinks = [...document.querySelectorAll('.demo-nav a')];
const statusClass = value => ['متابعة','تفاوض','عرض سعر','قادم'].includes(value) ? 'warning' : ['محتمل','جديدة','مجدول'].includes(value) ? 'neutral' : '';
const status = value => `<span class="status ${statusClass(value)}">${value}</span>`;
const header = (title,description,action='') => `<div class="page-head"><div><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
const stat = (label,value,detail,icon) => `<article class="stat-card"><div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon" aria-hidden="true">${icon}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
const action = label => `<button class="primary-btn" type="button" data-demo-action="${label}">${label}</button>`;

function dashboardView() {
  return `<section class="content">${header('لوحة التحكم','صورة واضحة عن عملائك وفرص البيع وما يحتاج متابعة اليوم.',action('عميل جديد'))}
    <div class="stats">${stat('إجمالي العملاء','248','في سجل العملاء','♙')}${stat('فرص مفتوحة','18','في مراحل البيع','◇')}${stat('عروض قيد المتابعة','6','تنتظر رد العميل','▤')}${stat('أنشطة اليوم','9','مكالمات واجتماعات','◷')}</div>
    <div class="portal-grid"><article class="portal-card"><span class="action-symbol">♙</span><h2>العملاء</h2><p>اعرف بيانات العملاء وآخر حالة لهم.</p><a href="#contacts">عرض العملاء ←</a></article><article class="portal-card"><span class="action-symbol">◇</span><h2>الفرص البيعية</h2><p>تابع الصفقات من أول تواصل للإغلاق.</p><a href="#opportunities">عرض الفرص ←</a></article><article class="portal-card"><span class="action-symbol">◷</span><h2>الأنشطة</h2><p>مكالماتك واجتماعاتك القادمة.</p><a href="#activities">عرض الأنشطة ←</a></article></div>
    <section class="panel wide-panel"><div class="panel-title"><h2>فرص تحتاج متابعة</h2><a href="#opportunities">كل الفرص ←</a></div><div class="crm-list">${opportunities.filter(item => item.stage === 'تفاوض' || item.stage === 'عرض سعر').map(item => `<div class="crm-list-item"><span class="crm-item-copy"><b>${item.name}</b><small>${item.customer} · ${item.value}</small></span>${status(item.stage)}</div>`).join('')}</div></section>
  </section>`;
}
function contactsView() {
  return `<section class="content">${header('العملاء','كل بيانات العملاء ومسؤولي الحسابات في مكان واحد.',action('عميل جديد'))}
    <div class="stats">${stat('إجمالي العملاء','248','في السجل','♙')}${stat('عملاء نشطون','184','يتعاملون معنا','✓')}${stat('يحتاجون متابعة','22','بانتظار تواصل','◷')}${stat('عملاء محتملون','42','فرص جديدة','◇')}</div>
    <section class="panel"><div class="panel-title"><h2>دليل العملاء</h2><span class="sample-label">سجلات توضيحية</span></div><div class="table-tools"><input class="search" id="contact-search" type="search" placeholder="ابحث بالعميل أو جهة الاتصال أو القطاع" aria-label="بحث العملاء"><select class="filter" id="contact-status" aria-label="تصفية حسب حالة العميل"><option value="">كل الحالات</option><option>نشط</option><option>متابعة</option><option>محتمل</option></select></div><div id="contacts-table"></div></section>
  </section>`;
}
function renderContactsTable() {
  const query = document.querySelector('#contact-search')?.value.trim().toLocaleLowerCase('ar') || '';
  const filter = document.querySelector('#contact-status')?.value || '';
  const rows = contacts.filter(item => (!filter || item.status === filter) && `${item.name} ${item.contact} ${item.segment} ${item.owner}`.toLocaleLowerCase('ar').includes(query));
  document.querySelector('#contacts-table').innerHTML = rows.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">العميل</th><th scope="col">القطاع</th><th scope="col">جهة الاتصال</th><th scope="col">مسؤول الحساب</th><th scope="col">الحالة</th></tr></thead><tbody>${rows.map(item => `<tr><td>${item.name}</td><td>${item.segment}</td><td>${item.contact}</td><td>${item.owner}</td><td>${status(item.status)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state">لا يوجد عملاء مطابقون للبحث.</div>';
}
function opportunitiesView() {
  return `<section class="content">${header('الفرص البيعية','تابع كل صفقة من المرحلة الأولى حتى الإغلاق.',action('فرصة جديدة'))}
    <div class="stats">${stat('فرص مفتوحة','18','في مسار المبيعات','◇')}${stat('قيمة الفرص','126 ألف','ريال سعودي','▤')}${stat('في التفاوض','5','تحتاج متابعة','◷')}${stat('مغلقة هذا الشهر','7','صفقات مكتملة','✓')}</div>
    <section class="panel"><div class="panel-title"><h2>مسار الفرص</h2><span class="sample-label">بيانات توضيحية</span></div><div class="table-tools"><select class="filter" id="opportunity-stage" aria-label="تصفية حسب مرحلة الفرصة"><option value="">كل المراحل</option><option>جديدة</option><option>عرض سعر</option><option>تفاوض</option><option>مغلقة</option></select></div><div id="opportunities-table"></div></section>
  </section>`;
}
function renderOpportunitiesTable() {
  const filter = document.querySelector('#opportunity-stage')?.value || '';
  const rows = opportunities.filter(item => !filter || item.stage === filter);
  document.querySelector('#opportunities-table').innerHTML = rows.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">الفرصة</th><th scope="col">العميل</th><th scope="col">القيمة</th><th scope="col">المسؤول</th><th scope="col">المرحلة</th></tr></thead><tbody>${rows.map(item => `<tr><td>${item.name}</td><td>${item.customer}</td><td>${item.value}</td><td>${item.owner}</td><td>${status(item.stage)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state">لا توجد فرص في هذه المرحلة.</div>';
}
function activitiesView() {
  return `<section class="content">${header('الأنشطة','مواعيد التواصل والاجتماعات المرتبطة بعملائك.',action('نشاط جديد'))}
    <div class="stats">${stat('أنشطة اليوم','9','مجدولة للفريق','◷')}${stat('مكالمات','5','خلال اليوم','▤')}${stat('اجتماعات','3','مع العملاء','♙')}${stat('أنشطة مكتملة','14','هذا الأسبوع','✓')}</div>
    <section class="panel"><div class="panel-title"><h2>قائمة الأنشطة</h2><span class="sample-label">بيانات توضيحية</span></div><div class="crm-list">${activities.map(item => `<div class="crm-list-item"><span class="crm-item-copy"><b>${item.title}</b><small>${item.detail}</small></span>${status(item.status)}</div>`).join('')}</div></section>
  </section>`;
}
function reportsView() {
  const reports = [
    ['تحقيق هدف العملاء الجدد','هذا الشهر',72],
    ['الفرص التي وصلت للتفاوض','من جميع الفرص المفتوحة',45],
    ['اكتمال أنشطة المتابعة','هذا الأسبوع',88],
    ['الصفقات المغلقة','من المستهدف الشهري',64],
  ];
  return `<section class="content">${header('التقارير','مؤشرات سريعة تساعدك تتابع تقدم المبيعات.',`<a class="soft-btn" href="#opportunities">عرض الفرص ←</a>`)}
    <div class="stats">${stat('عملاء جدد','12','هذا الشهر','♙')}${stat('فرص جديدة','8','هذا الشهر','◇')}${stat('صفقات مغلقة','7','هذا الشهر','✓')}${stat('معدل المتابعة','88%','هذا الأسبوع','◷')}</div>
    <div class="report-grid">${reports.map(([title,detail,value]) => `<article class="report-card"><h2>${title}</h2><p>${detail}</p><div class="progress-row"><div class="progress-head"><span>التقدم</span><strong>${value}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${value}%"></div></div></div></article>`).join('')}</div>
  </section>`;
}
const renderers = {dashboard:dashboardView,contacts:contactsView,opportunities:opportunitiesView,activities:activitiesView,reports:reportsView};
function render() {
  const requested = location.hash.slice(1);
  const key = Object.hasOwn(views, requested) ? requested : 'dashboard';
  document.title = `${views[key]} | معاينة سنع CRM`;
  document.querySelector('#current-view-title').textContent = views[key];
  navLinks.forEach(link => {const active = link.dataset.view === key;link.classList.toggle('active',active);active ? link.setAttribute('aria-current','page') : link.removeAttribute('aria-current')});
  content.innerHTML = renderers[key]() + '<div class="notice" id="demo-notice" hidden role="status"></div>';
  if (key === 'contacts') renderContactsTable();
  if (key === 'opportunities') renderOpportunitiesTable();
  document.querySelector('#sidebar').classList.remove('open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'instant'});
}
document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('ar-SA',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());
document.querySelector('#menu-toggle').addEventListener('click', event => {const opened = document.querySelector('#sidebar').classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(opened));event.currentTarget.setAttribute('aria-label',opened?'إغلاق القائمة':'فتح القائمة')});
document.addEventListener('input', event => {if (event.target.id === 'contact-search') renderContactsTable()});
document.addEventListener('change', event => {if (event.target.id === 'contact-status') renderContactsTable();if (event.target.id === 'opportunity-stage') renderOpportunitiesTable()});
document.addEventListener('click', event => {const trigger = event.target.closest('[data-demo-action]');if (!trigger) return;const notice = document.querySelector('#demo-notice');notice.hidden = false;notice.textContent = `${trigger.dataset.demoAction}: هذه معاينة ببيانات توضيحية. يمكنك تجربة التبويبات والبحث والتصفية.`;notice.scrollIntoView({block:'nearest',behavior:'smooth'})});
window.addEventListener('hashchange', render);
render();
