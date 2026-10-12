// All content and displayed prices below come from the supplied Figma design.
// Set a real contact URL when the site is connected to your production service.
const config = { contactUrl: null };
const asset = name => `public/assets/${name}`;
const products = [
  { id: 'CRM', icon: 'crm-icon.png', preview: 'crm-card-preview.png', previewWidth: 1600, previewHeight: 899, detailIcon: 'crm-detail.png', title: 'العملاء، المبيعات والفرص', short: 'رتّب عملاءك، تابع فرص البيع، واعرف وين وصلت كل صفقة بدون ملفات ورسائل متفرقة.', description: 'تتبع كل تفاعل، إدارة مراحل مسار الصفقات، وتعميق العلاقات التجارية.', features: ['المتابعات والأنشطة', 'الفرص البيعية', 'سجل تواصل كامل', 'مراحل المبيعات', 'إدارة العملاء', 'تقارير أداء المبيعات'] },
  { id: 'HR', icon: 'hr-icon.png', preview: 'hr-card-preview.png', previewWidth: 1672, previewHeight: 941, detailIcon: 'hr-detail.png', title: 'فريقك يستاهل إدارة أسهل', short: 'كل تفاصيل فريقك من الموظفين والحضور إلى الإجازات والطلبات، مرتبة قدامك.', description: 'كل تفاصيل فريقك من الموظفين والحضور إلى الإجازات والطلبات، مرتبة قدامك.', features: ['ملفات الموظفين', 'الحضور والانصراف', 'الإجازات', 'الرواتب', 'الطلبات والموافقات', 'تقييم الأداء'] },
  { id: 'ERP', icon: 'erp-icon.png', preview: 'erp-card-preview.png', previewWidth: 1600, previewHeight: 812, detailIcon: 'erp-detail.png', title: 'كل عملياتك المالية والتشغيلية', short: 'المبيعات، المشتريات، المخزون والحسابات في نظام واحد يخليك شايف عملياتك بشكل أوضح.', description: 'سنع ERP يساعدك تعرف وش يصير في شركتك لحظة بلحظة.', features: ['إدارة المبيعات والمشتريات', 'المخزون والمنتجات', 'الفواتير والحسابات', 'المصروفات والإيرادات', 'التقارير المالية', 'متابعة العمليات'] },
  { id: 'TASKS', icon: 'tasks-icon.png', preview: 'tasks-card-preview.png', previewWidth: 1672, previewHeight: 941, detailIcon: 'crm-detail.png', title: 'خلّ الشغل واضح للجميع', short: 'وزّع المهام، حدّد الأولويات، وتابع إنجاز الفريق بدون ما يضيع الشغل بين المحادثات.', description: 'مع سنع Tasks كل شخص يعرف وش عليه، وش الأولوية، ومتى لازم يخلص.', features: ['إنشاء وتوزيع المهام', 'تحديد الأولويات', 'المواعيد النهائية', 'متابعة حالة العمل', 'المشاريع والفرق', 'التعليقات والتحديثات'] }
];
const benefits = [
  ['simple', 'تجربة استخدام بسيطة', 'واجهة واضحة ومريحة ترفع إنتاجية موظفيك وتقلل وقت التدريب للصفر تقريباً.'],
  ['connected', 'بيانات مترابطة بين الأنظمة', 'أي تغيير في قسم ينعكس على البقية مباشرة وبدون تكرار الإدخال.'],
  ['platform', 'منصة وحدة لكل أعمالك', 'تغنيك عن الاشتراك في تطبيقات متعددة وفواتير متفرقة ودعم فني متباعد.'],
  ['growth', 'نظام قابل للتوسع', 'جاهز لمواكبة نمو أعمالك من ٥ موظفين إلى آلاف المستخدمين بدون تأخير.'],
  ['reports', 'تقارير واضحة', 'لوحات مؤشرات ذكية تقدم لك الأرقام الحقيقية عشان تاخذ قرارات تجارية سليمة.'],
  ['permissions', 'صلاحيات حسب كل مستخدم', 'تحكم دقيق في من يرى البيانات المالية، ملفات العملاء، أو تفاصيل الموظفين.']
];
document.querySelector('#product-grid').innerHTML = products.map(p => `
  <a class="product-card" href="${p.id === 'HR' ? 'https://hr.sanaasystems.com/#top' : `#detail-${p.id}`}" aria-label="استكشف ${p.id}">
    <div class="product-card-top"><div class="product-icon"><img src="${asset(p.icon)}" width="48" height="41" alt="" loading="lazy"></div><div><h3>${p.id}</h3><p>${p.short}</p></div></div>
    <span class="product-link">استكشف ${p.id}<img src="${asset('arrow.svg')}" width="16" height="16" alt="" loading="lazy"></span>
    <div class="product-device product-preview"><img src="${asset(p.preview)}" width="${p.previewWidth}" height="${p.previewHeight}" alt="" loading="lazy"></div>
  </a>`).join('');
document.querySelector('#benefit-grid').innerHTML = benefits.map(([icon, title, text]) => `
  <article class="benefit-card"><img src="${asset(icon+'.svg')}" width="48" height="48" alt="" loading="lazy"><div><h3>${title}</h3><p>${text}</p></div></article>`).join('');
const detailOrder = ['CRM','HR','TASKS','ERP'];
document.querySelector('#detail-grid').innerHTML = detailOrder.map(id => {
  const p = products.find(p => p.id === id);
  return `<article class="detail-card" id="detail-${id}"><div class="detail-head"><img src="${asset(p.detailIcon)}" width="61" height="52" alt="" loading="lazy"><div><h3>${p.title}</h3><p>${p.description}</p></div><span class="detail-label">${id === 'TASKS' ? 'Tasks' : id}</span></div><div class="feature-tags">${p.features.map(f=>`<span>${f}</span>`).join('')}</div></article>`;
}).join('');

// Figma supplies four visual instances of the same complete-platform plan.
// Keep their source wording and price; do not invent commercial plan tiers.
const state = { product: 'CRM', selectedPlan: 3, periods: ['monthly','monthly','monthly','monthly'] };
document.querySelector('#pricing-grid').innerHTML = Array.from({length:4},(_,i)=>`
  <article class="plan-card ${i===3?'selected':''}" data-plan="${i}">
    <div class="plan-card-top"><div class="plan-icon"><img src="${asset('crm-detail.png')}" width="48" height="41" alt="" loading="lazy"></div><input class="plan-select" type="radio" name="plan" value="${i}" aria-label="اختيار منصة سنع الكاملة، الخيار ${i+1}" ${i===3?'checked':''}></div>
    <div class="billing-toggle" role="group" aria-label="دورة الاشتراك للخيار ${i+1}"><button class="active" data-period="monthly" aria-pressed="true">شهري</button><button data-period="annual" aria-pressed="false">سنوي</button></div>
    <h3>منصة سنع الكاملة</h3><p class="plan-description">كل أنظمة سنع مترابطة تحت حساب واحد، عشان تشوف شركتك كاملة بدون أنظمة وبيانات متفرقة.</p>
    <p class="plan-price"><strong>549</strong><span>ريال / شهري</span></p>
    <ul class="plan-features"><li>سنع ERP</li><li>سنع CRM</li><li>سنع HR</li><li>سنع Tasks</li></ul>
    <button class="button" data-select-plan="${i}" aria-label="اختيار الخيار ${i+1}">إضافة</button>
  </article>`).join('');
function updateSummary() {
  const period = state.periods[state.selectedPlan];
  document.querySelector('#summary-tags').textContent = '';
  const tag = document.createElement('span');
  tag.textContent = `${state.product} / ${period==='annual'?'طلب اشتراك سنوي':'شهري'}`;
  document.querySelector('#summary-tags').append(tag);
  document.querySelector('#total-price').textContent = '549';
}
function selectPlan(index) {
  state.selectedPlan = index;
  document.querySelectorAll('.plan-card').forEach((card,i) => {
    card.classList.toggle('selected', i===index);
    card.querySelector('.plan-select').checked = i===index;
  });
  updateSummary();
}
document.querySelector('#pricing-grid').addEventListener('change', e => {
  if(e.target.matches('.plan-select')) selectPlan(Number(e.target.value));
});
document.querySelector('#pricing-grid').addEventListener('click', e => {
  const add = e.target.closest('[data-select-plan]');
  if(add) selectPlan(Number(add.dataset.selectPlan));
  const toggle = e.target.closest('[data-period]');
  if(toggle) {
    const card = toggle.closest('.plan-card');
    const index = Number(card.dataset.plan);
    state.periods[index] = toggle.dataset.period;
    card.querySelectorAll('[data-period]').forEach(b => {
      const active = b === toggle; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active));
    });
    updateSummary();
  }
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  state.product = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => {
    const active = b===button; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active));
  });
  const product = products.find(p=>p.id===state.product);
  document.querySelectorAll('.plan-icon img').forEach(img => { img.src=asset(product.detailIcon); });
  updateSummary();
}));
updateSummary();

let dialogTrigger = null;
function openDialog(id, trigger) {
  dialogTrigger = trigger || document.activeElement;
  document.getElementById(id).showModal();
}
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click',e=> { if(e.target===dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
  dialog.addEventListener('close',()=>dialogTrigger?.focus());
});
document.addEventListener('click', e => {
  const close = e.target.closest('[data-close]');
  if(close) close.closest('dialog').close();
  const trigger = e.target.closest('[data-dialog]');
  if(trigger) openDialog(trigger.dataset.dialog,trigger);
  const contact = e.target.closest('[data-contact]');
  if(contact) openContact(contact);
  const info = e.target.closest('[data-info]');
  if(info) showInfo(info.dataset.info,info);
});
function openContact(trigger, message='') {
  if(config.contactUrl) { window.location.assign(config.contactUrl); return; }
  const form = document.querySelector('#contact-form');
  form.elements.message.value=message;
  document.querySelector('#form-status').textContent='';
  openDialog('contact-dialog',trigger);
}
document.querySelector('#subscribe').addEventListener('click',e=> {
  const period = state.periods[state.selectedPlan];
  openContact(e.currentTarget,`أرغب في التواصل بشأن منصة سنع الكاملة.\nالنظام الذي يهمني: ${state.product}\nالدورة المطلوبة: ${period==='annual'?'سنوية (أرجو توضيح السعر السنوي)':'شهرية'}\nالسعر الشهري المعروض في التصميم: 549 ريال.`);
});
document.querySelector('#contact-form').addEventListener('submit',e=> {
  e.preventDefault();
  const form=e.currentTarget;
  if(!form.reportValidity()) return;
  const values=new FormData(form);
  const text=`طلب تواصل — سنع\n\nالاسم: ${values.get('name')}\nالبريد الإلكتروني: ${values.get('email')}\nالشركة: ${values.get('company')}\n\n${values.get('message')}\n`;
  const blob=new Blob(['\uFEFF',text],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='Sanaa-inquiry.txt';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  document.querySelector('#form-status').textContent='تم تنزيل طلب التواصل. يمكنك الآن مشاركته مع فريق سنع.';
});
function showInfo(type,trigger) {
  const info = {
    notifications:['الإشعارات','الإشعارات متاحة داخل أنظمة سنع بعد الدخول إلى حسابك.'],
    language:['اللغة','هذه الصفحة متاحة باللغة العربية.'],
    help:['مركز المساعدة','استكشف الأقسام لمعرفة وظائف كل نظام، أو استخدم «تواصل معنا» لتجهيز تفاصيل طلبك.'],
    faq:['الأسئلة الشائعة','هل أقدر أبدأ بنظام واحد؟ نعم، اختر النظام الذي تحتاجه وأضف الأنظمة الأخرى مع نمو أعمالك.\n\nهل الأنظمة مترابطة؟ صُممت الأنظمة للعمل معاً ولتقليل تكرار إدخال البيانات.\n\nما السعر السنوي؟ التصميم يعرض 549 ريال شهرياً؛ اطلب تفاصيل الاشتراك السنوي من فريق سنع.']
  }[type];
  document.querySelector('#info-title').textContent=info[0];
  const content=document.querySelector('#info-content');content.textContent='';
  info[1].split('\n\n').forEach(text=> {const p=document.createElement('p');p.textContent=text;content.append(p);});
  openDialog('info-dialog',trigger);
}
const menuToggle=document.querySelector('.mobile-toggle');
menuToggle.addEventListener('click',()=> {
  const expanded=menuToggle.getAttribute('aria-expanded')==='true';
  menuToggle.setAttribute('aria-expanded',String(!expanded));
  menuToggle.setAttribute('aria-label',expanded?'فتح القائمة':'إغلاق القائمة');
  document.querySelector('#main-nav').classList.toggle('open',!expanded);
});
document.querySelector('#main-nav').addEventListener('click',e=> {
  if(e.target.closest('a,button')) { menuToggle.setAttribute('aria-expanded','false'); document.querySelector('#main-nav').classList.remove('open'); }
});
document.addEventListener('keydown',e=> {
  if(e.key==='Escape') { menuToggle.setAttribute('aria-expanded','false'); document.querySelector('#main-nav').classList.remove('open'); }
});
const observer=new IntersectionObserver(entries=> {
  entries.forEach(entry=> {
    if(!entry.isIntersecting) return;
    document.querySelectorAll('#main-nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
  });
},{rootMargin:'-10% 0px -60% 0px'});
['home','systems'].forEach(id=>observer.observe(document.getElementById(id)));

const heroVideo=document.querySelector('.hero-video');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function syncHeroVideo() {
  if(reducedMotion.matches || document.hidden) { heroVideo.pause(); return; }
  heroVideo.play().catch(()=>heroVideo.classList.add('is-unavailable'));
}
heroVideo.addEventListener('error',()=>heroVideo.classList.add('is-unavailable'));
reducedMotion.addEventListener('change',syncHeroVideo);
document.addEventListener('visibilitychange',syncHeroVideo);
syncHeroVideo();
