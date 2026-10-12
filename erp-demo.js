const embedded = new URLSearchParams(location.search).has('embed');
document.documentElement.classList.toggle('embed-mode', embedded);

const sales = [
  {number:'INV-1042', customer:'شركة الأفق الرقمية', date:'12 أكتوبر 2026', amount:'24,000 ر.س', state:'مدفوعة'},
  {number:'INV-1043', customer:'مؤسسة النخبة التجارية', date:'11 أكتوبر 2026', amount:'18,500 ر.س', state:'بانتظار السداد'},
  {number:'INV-1044', customer:'مجموعة روافد', date:'09 أكتوبر 2026', amount:'12,000 ر.س', state:'مدفوعة'},
  {number:'INV-1045', customer:'شركة المدار اللوجستية', date:'06 أكتوبر 2026', amount:'8,500 ر.س', state:'متأخرة'},
  {number:'INV-1046', customer:'منصة مدار التعليمية', date:'04 أكتوبر 2026', amount:'30,000 ر.س', state:'مدفوعة'},
];
const purchases = [
  {number:'PO-308', supplier:'شركة التقنية المتقدمة', item:'أجهزة مكتبية', amount:'16,800 ر.س', state:'قيد التوريد'},
  {number:'PO-309', supplier:'مؤسسة حلول الشبكات', item:'معدات شبكة', amount:'9,200 ر.س', state:'بانتظار الاعتماد'},
  {number:'PO-310', supplier:'شركة المدار للخدمات', item:'صيانة دورية', amount:'5,500 ر.س', state:'مكتمل'},
  {number:'PO-311', supplier:'مورد البرامج العربية', item:'تراخيص برامج', amount:'12,000 ر.س', state:'قيد التوريد'},
];
const inventory = [
  {code:'SKU-101', name:'جهاز نقاط البيع', category:'أجهزة', quantity:'8', state:'منخفض'},
  {code:'SKU-102', name:'قارئ الباركود', category:'أجهزة', quantity:'42', state:'متوفر'},
  {code:'SKU-103', name:'رخصة النظام السنوية', category:'تراخيص', quantity:'120', state:'متوفر'},
  {code:'SKU-104', name:'طابعة إيصالات', category:'أجهزة', quantity:'5', state:'منخفض'},
  {code:'SKU-105', name:'ملصقات المنتجات', category:'مستلزمات', quantity:'260', state:'متوفر'},
  {code:'SKU-106', name:'جهاز لوحي', category:'أجهزة', quantity:'3', state:'منخفض'},
];
const transactions = [
  {title:'تحصيل فاتورة INV-1042', detail:'شركة الأفق الرقمية · 12 أكتوبر 2026', value:'+24,000 ر.س', state:'إيراد'},
  {title:'طلب شراء PO-310', detail:'شركة المدار للخدمات · 10 أكتوبر 2026', value:'−5,500 ر.س', state:'مصروف'},
  {title:'تحصيل فاتورة INV-1044', detail:'مجموعة روافد · 09 أكتوبر 2026', value:'+12,000 ر.س', state:'إيراد'},
  {title:'مصروف تشغيل', detail:'الخدمات المكتبية · 07 أكتوبر 2026', value:'−2,400 ر.س', state:'مصروف'},
];
const views = {dashboard:'لوحة التحكم',sales:'المبيعات',purchases:'المشتريات',inventory:'المخزون',accounts:'الحسابات',reports:'التقارير'};
const content = document.querySelector('#demo-content');
const navLinks = [...document.querySelectorAll('.demo-nav a')];
const statusClass = value => ['بانتظار السداد','قيد التوريد','بانتظار الاعتماد','منخفض'].includes(value) ? 'warning' : value === 'متأخرة' ? 'danger' : value === 'مصروف' ? 'neutral' : '';
const status = value => `<span class="status ${statusClass(value)}">${value}</span>`;
const header = (title,description,action='') => `<div class="page-head"><div><h1>${title}</h1><p>${description}</p></div>${action}</div>`;
const stat = (label,value,detail,icon) => `<article class="stat-card"><div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon" aria-hidden="true">${icon}</span></div><strong>${value}</strong><small>${detail}</small></article>`;
const action = label => `<button class="primary-btn" type="button" data-demo-action="${label}">${label}</button>`;
const table = (head,rows) => `<div class="table-wrap"><table class="data-table"><thead><tr>${head.map(label => `<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;

function dashboardView() {
  return `<section class="content">${header('لوحة التحكم','صورة واضحة عن المبيعات والمشتريات وما يحتاج متابعة اليوم.',action('فاتورة جديدة'))}
    <div class="stats">${stat('مبيعات الشهر','186 ألف','ريال سعودي','▤')}${stat('مشتريات الشهر','74 ألف','ريال سعودي','◇')}${stat('فواتير معلقة','8','بانتظار السداد','◷')}${stat('منتجات منخفضة','3','تحتاج إعادة طلب','▥')}</div>
    <div class="portal-grid"><article class="portal-card"><span class="action-symbol">▤</span><h2>المبيعات</h2><p>الفواتير والتحصيلات في مكان واحد.</p><a href="#sales">عرض المبيعات ←</a></article><article class="portal-card"><span class="action-symbol">◇</span><h2>المشتريات</h2><p>تابع طلبات الشراء والتوريد.</p><a href="#purchases">عرض المشتريات ←</a></article><article class="portal-card"><span class="action-symbol">▥</span><h2>المخزون</h2><p>اعرف أرصدة المنتجات وما أوشك على النفاد.</p><a href="#inventory">عرض المخزون ←</a></article></div>
    <section class="panel wide-panel"><div class="panel-title"><h2>عناصر تحتاج متابعة</h2><a href="#accounts">عرض الحسابات ←</a></div><div class="erp-list"><div class="erp-list-item"><span class="erp-item-copy"><b>الفاتورة INV-1045</b><small>شركة المدار اللوجستية · موعد السداد متأخر</small></span>${status('متأخرة')}</div><div class="erp-list-item"><span class="erp-item-copy"><b>جهاز نقاط البيع</b><small>المتبقي 8 وحدات في المخزون</small></span>${status('منخفض')}</div></div></section>
  </section>`;
}
function salesView() {
  return `<section class="content">${header('المبيعات','الفواتير وحالات السداد من مكان واحد.',action('فاتورة جديدة'))}
    <div class="stats">${stat('مبيعات الشهر','186 ألف','ريال سعودي','▤')}${stat('فواتير مدفوعة','32','هذا الشهر','✓')}${stat('بانتظار السداد','8','فواتير مفتوحة','◷')}${stat('متأخرة','2','تحتاج متابعة','◇')}</div>
    <section class="panel"><div class="panel-title"><h2>فواتير المبيعات</h2><span class="sample-label">سجلات توضيحية</span></div><div class="table-tools"><input class="search" id="sale-search" type="search" placeholder="ابحث برقم الفاتورة أو العميل" aria-label="بحث فواتير المبيعات"><select class="filter" id="sale-state" aria-label="تصفية حسب حالة السداد"><option value="">كل الحالات</option><option>مدفوعة</option><option>بانتظار السداد</option><option>متأخرة</option></select></div><div id="sales-table"></div></section>
  </section>`;
}
function renderSalesTable() {
  const query = document.querySelector('#sale-search')?.value.trim().toLocaleLowerCase('ar') || '';
  const filter = document.querySelector('#sale-state')?.value || '';
  const rows = sales.filter(item => (!filter || item.state === filter) && `${item.number} ${item.customer}`.toLocaleLowerCase('ar').includes(query));
  document.querySelector('#sales-table').innerHTML = rows.length ? table(['الفاتورة','العميل','التاريخ','القيمة','الحالة'],rows.map(item => `<tr><td>${item.number}</td><td>${item.customer}</td><td>${item.date}</td><td>${item.amount}</td><td>${status(item.state)}</td></tr>`)) : '<div class="empty-state">لا توجد فواتير مطابقة للبحث.</div>';
}
function purchasesView() {
  return `<section class="content">${header('المشتريات','طلبات الشراء والموردون وحالة التوريد.',action('طلب شراء جديد'))}
    <div class="stats">${stat('مشتريات الشهر','74 ألف','ريال سعودي','◇')}${stat('طلبات مفتوحة','6','في مراحل الشراء','◷')}${stat('قيد التوريد','4','بانتظار التسليم','▤')}${stat('موردون نشطون','12','نتعامل معهم','✓')}</div>
    <section class="panel"><div class="panel-title"><h2>طلبات الشراء</h2><span class="sample-label">سجلات توضيحية</span></div><div class="table-tools"><input class="search" id="purchase-search" type="search" placeholder="ابحث برقم الطلب أو المورد" aria-label="بحث طلبات الشراء"><select class="filter" id="purchase-state" aria-label="تصفية حسب حالة طلب الشراء"><option value="">كل الحالات</option><option>بانتظار الاعتماد</option><option>قيد التوريد</option><option>مكتمل</option></select></div><div id="purchases-table"></div></section>
  </section>`;
}
function renderPurchasesTable() {
  const query = document.querySelector('#purchase-search')?.value.trim().toLocaleLowerCase('ar') || '';
  const filter = document.querySelector('#purchase-state')?.value || '';
  const rows = purchases.filter(item => (!filter || item.state === filter) && `${item.number} ${item.supplier} ${item.item}`.toLocaleLowerCase('ar').includes(query));
  document.querySelector('#purchases-table').innerHTML = rows.length ? table(['الطلب','المورد','البند','القيمة','الحالة'],rows.map(item => `<tr><td>${item.number}</td><td>${item.supplier}</td><td>${item.item}</td><td>${item.amount}</td><td>${status(item.state)}</td></tr>`)) : '<div class="empty-state">لا توجد طلبات مطابقة للبحث.</div>';
}
function inventoryView() {
  return `<section class="content">${header('المخزون','كميات المنتجات وحالة توفرها.',action('منتج جديد'))}
    <div class="stats">${stat('إجمالي المنتجات','126','منتجًا مسجلًا','▥')}${stat('متوفرة','118','جاهزة للبيع','✓')}${stat('مخزون منخفض','3','تحتاج إعادة طلب','◷')}${stat('حركات اليوم','14','إضافة وصرف','◇')}</div>
    <section class="panel"><div class="panel-title"><h2>قائمة المنتجات</h2><span class="sample-label">سجلات توضيحية</span></div><div class="table-tools"><input class="search" id="inventory-search" type="search" placeholder="ابحث باسم المنتج أو الرمز" aria-label="بحث المنتجات"><select class="filter" id="inventory-state" aria-label="تصفية حسب حالة المخزون"><option value="">كل الحالات</option><option>متوفر</option><option>منخفض</option></select></div><div id="inventory-table"></div></section>
  </section>`;
}
function renderInventoryTable() {
  const query = document.querySelector('#inventory-search')?.value.trim().toLocaleLowerCase('ar') || '';
  const filter = document.querySelector('#inventory-state')?.value || '';
  const rows = inventory.filter(item => (!filter || item.state === filter) && `${item.code} ${item.name} ${item.category}`.toLocaleLowerCase('ar').includes(query));
  document.querySelector('#inventory-table').innerHTML = rows.length ? table(['الرمز','المنتج','الفئة','الكمية','الحالة'],rows.map(item => `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.category}</td><td>${item.quantity}</td><td>${status(item.state)}</td></tr>`)) : '<div class="empty-state">لا توجد منتجات مطابقة للبحث.</div>';
}
function accountsView() {
  return `<section class="content">${header('الحسابات','تابع الإيرادات والمصروفات وحركة الحساب.',`<a class="soft-btn" href="#reports">عرض التقارير ←</a>`)}
    <div class="stats">${stat('الإيرادات','186 ألف','ريال هذا الشهر','▤')}${stat('المصروفات','74 ألف','ريال هذا الشهر','◇')}${stat('صافي الحركة','112 ألف','ريال هذا الشهر','✓')}${stat('قيود معلقة','3','تحتاج مراجعة','◷')}</div>
    <section class="panel"><div class="panel-title"><h2>أحدث الحركات</h2><span class="sample-label">بيانات توضيحية</span></div><div class="erp-list">${transactions.map(item => `<div class="erp-list-item"><span class="erp-item-copy"><b>${item.title}</b><small>${item.detail}</small></span><strong>${item.value}</strong>${status(item.state)}</div>`).join('')}</div></section>
  </section>`;
}
function reportsView() {
  const reports = [
    ['هدف المبيعات الشهري','نسبة الإنجاز من المستهدف',76],
    ['تحصيل الفواتير','من الفواتير المستحقة',84],
    ['طلبات الشراء المكتملة','من جميع الطلبات',68],
    ['توفر المخزون','من المنتجات النشطة',94],
  ];
  return `<section class="content">${header('التقارير','مؤشرات مبسطة لأداء المبيعات والمشتريات والمخزون.',`<a class="soft-btn" href="#accounts">عرض الحسابات ←</a>`)}
    <div class="stats">${stat('المبيعات','186 ألف','ريال هذا الشهر','▤')}${stat('المشتريات','74 ألف','ريال هذا الشهر','◇')}${stat('صافي الحركة','112 ألف','ريال هذا الشهر','✓')}${stat('فواتير معلقة','8','بانتظار السداد','◷')}</div>
    <div class="report-grid">${reports.map(([title,detail,value]) => `<article class="report-card"><h2>${title}</h2><p>${detail}</p><div class="progress-row"><div class="progress-head"><span>التقدم</span><strong>${value}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${value}%"></div></div></div></article>`).join('')}</div>
  </section>`;
}
const renderers = {dashboard:dashboardView,sales:salesView,purchases:purchasesView,inventory:inventoryView,accounts:accountsView,reports:reportsView};
function render() {
  const requested = location.hash.slice(1);
  const key = Object.hasOwn(views, requested) ? requested : 'dashboard';
  document.title = `${views[key]} | معاينة سنع ERP`;
  document.querySelector('#current-view-title').textContent = views[key];
  navLinks.forEach(link => {const active = link.dataset.view === key;link.classList.toggle('active',active);active ? link.setAttribute('aria-current','page') : link.removeAttribute('aria-current')});
  content.innerHTML = renderers[key]() + '<div class="notice" id="demo-notice" hidden role="status"></div>';
  if (key === 'sales') renderSalesTable();
  if (key === 'purchases') renderPurchasesTable();
  if (key === 'inventory') renderInventoryTable();
  document.querySelector('#sidebar').classList.remove('open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'instant'});
}
document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('ar-SA',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());
document.querySelector('#menu-toggle').addEventListener('click', event => {const opened = document.querySelector('#sidebar').classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(opened));event.currentTarget.setAttribute('aria-label',opened?'إغلاق القائمة':'فتح القائمة')});
document.addEventListener('input', event => {if (event.target.id === 'sale-search') renderSalesTable();if (event.target.id === 'purchase-search') renderPurchasesTable();if (event.target.id === 'inventory-search') renderInventoryTable()});
document.addEventListener('change', event => {if (event.target.id === 'sale-state') renderSalesTable();if (event.target.id === 'purchase-state') renderPurchasesTable();if (event.target.id === 'inventory-state') renderInventoryTable()});
document.addEventListener('click', event => {const trigger = event.target.closest('[data-demo-action]');if (!trigger) return;const notice = document.querySelector('#demo-notice');notice.hidden = false;notice.textContent = `${trigger.dataset.demoAction}: هذه معاينة ببيانات توضيحية. يمكنك تجربة التبويبات والبحث والتصفية.`;notice.scrollIntoView({block:'nearest',behavior:'smooth'})});
window.addEventListener('hashchange', render);
render();
