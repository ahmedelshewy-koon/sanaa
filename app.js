// Content below comes from the supplied Figma design; plans and prices come
// live from Sana when it answers (see "Live pricing from Sana").
// Set a real contact URL when the site is connected to your production service.
// appUrl: where "تسجيل الدخول" and the plan buttons go. apiBase: where the
// plans are read — sanaasystems.com/api reaches Sana's server, so '' (same
// site). Served from localhost, both point at a local Sana.
const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
const config = {
  contactUrl: null,
  appUrl: local ? 'http://localhost:5180' : 'https://app.sanaasystems.com',
  apiBase: local ? 'http://localhost:3010' : '',
};
const asset = name => `public/assets/${name}`;
const products = [
  { id: 'CRM', icon: 'crm-icon.png', preview: 'crm-card-preview.png', previewWidth: 1600, previewHeight: 899, detailIcon: 'crm-detail.png', title: 'العملاء، المبيعات والفرص', short: 'رتّب عملاءك، تابع فرص البيع، واعرف وين وصلت كل صفقة بدون ملفات ورسائل متفرقة.', description: 'تتبع كل تفاعل، إدارة مراحل مسار الصفقات، وتعميق العلاقات التجارية.', features: ['المتابعات والأنشطة', 'الفرص البيعية', 'سجل تواصل كامل', 'مراحل المبيعات', 'إدارة العملاء', 'تقارير أداء المبيعات'] },
  { id: 'HR', icon: 'hr-icon.png', preview: 'hr-card-preview.png', previewWidth: 1672, previewHeight: 941, detailIcon: 'hr-detail.png', title: 'فريقك يستاهل إدارة أسهل', short: 'كل تفاصيل فريقك من الموظفين والحضور إلى الإجازات والطلبات، مرتبة قدامك.', description: 'كل تفاصيل فريقك من الموظفين والحضور إلى الإجازات والطلبات، مرتبة قدامك.', features: ['ملفات الموظفين', 'الحضور والانصراف', 'الإجازات', 'الرواتب', 'الطلبات والموافقات', 'تقييم الأداء'] },
  { id: 'ERP', icon: 'erp-icon.png', preview: 'erp-card-preview.png', previewWidth: 1600, previewHeight: 812, detailIcon: 'erp-detail.png', title: 'كل عملياتك المالية والتشغيلية', short: 'المبيعات، المشتريات، المخزون والحسابات في نظام واحد يخليك شايف عملياتك بشكل أوضح.', description: 'سنع ERP يساعدك تعرف وش يصير في شركتك لحظة بلحظة.', features: ['إدارة المبيعات والمشتريات', 'المخزون والمنتجات', 'الفواتير والحسابات', 'المصروفات والإيرادات', 'التقارير المالية', 'متابعة العمليات'] },
  { id: 'TASKS', icon: 'tasks-icon.png', preview: 'tasks-card-preview.png', previewWidth: 1672, previewHeight: 941, detailIcon: 'tasks-icon.png', title: 'خلّ الشغل واضح للجميع', short: 'وزّع المهام، حدّد الأولويات، وتابع إنجاز الفريق بدون ما يضيع الشغل بين المحادثات.', description: 'مع سنع Tasks كل شخص يعرف وش عليه، وش الأولوية، ومتى لازم يخلص.', features: ['إنشاء وتوزيع المهام', 'تحديد الأولويات', 'المواعيد النهائية', 'متابعة حالة العمل', 'المشاريع والفرق', 'التعليقات والتحديثات'] }
];
const productDemos = { CRM:'crm-demo', HR:'hr-demo', ERP:'erp-demo', TASKS:'tasks-demo' };
const demoDialogIds = new Set(Object.values(productDemos).map(name => `${name}-dialog`));
const benefits = [
  ['simple', 'تجربة استخدام بسيطة', 'واجهة واضحة ومريحة ترفع إنتاجية موظفيك وتقلل وقت التدريب للصفر تقريباً.'],
  ['connected', 'بيانات مترابطة بين الأنظمة', 'أي تغيير في قسم ينعكس على البقية مباشرة وبدون تكرار الإدخال.'],
  ['platform', 'منصة وحدة لكل أعمالك', 'تغنيك عن الاشتراك في تطبيقات متعددة وفواتير متفرقة ودعم فني متباعد.'],
  ['growth', 'نظام قابل للتوسع', 'جاهز لمواكبة نمو أعمالك من ٥ موظفين إلى آلاف المستخدمين بدون تأخير.'],
  ['reports', 'تقارير واضحة', 'لوحات مؤشرات ذكية تقدم لك الأرقام الحقيقية عشان تاخذ قرارات تجارية سليمة.'],
  ['permissions', 'صلاحيات حسب كل مستخدم', 'تحكم دقيق في من يرى البيانات المالية، ملفات العملاء، أو تفاصيل الموظفين.']
];
document.querySelector('#product-grid').innerHTML = products.map(p => `
  <a class="product-card" href="${productDemos[p.id]}.html" data-dialog="${productDemos[p.id]}-dialog" aria-label="استكشف ${p.id}">
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

// Live pricing from Sana. The design's pricing above stays as it is until
// Sana answers (and if it never does). Once GET /api/public/plans returns
// plans, the section switches to Sana's own pricing cards: one monthly /
// yearly switch, each tab shows that system's plans then the bundles that
// include it, the "الأكثر طلباً" plan framed, and every card has its own
// button straight into Sana on that plan. Change plans in Sana's admin; this
// page needs no edit.
const SYSTEM_KEYS = { CRM:'crm', HR:'hr', ERP:'erp', TASKS:'tasks' };
const SYSTEM_NAMES = { crm:'CRM', hr:'HR', erp:'ERP', tasks:'Tasks' };
const live = { plans: null, cycle: 'monthly' };
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => Number(n).toLocaleString('en');
const saving = p => (p.priceMonthly && p.priceYearly && p.priceYearly < p.priceMonthly * 12 ? Math.round((1 - p.priceYearly / (p.priceMonthly * 12)) * 100) : 0);
const livePrice = p => (live.cycle === 'yearly' ? p.priceYearly : p.priceMonthly);
const checkIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';
const heartIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2 0 3.4 1.1 4.3 2.4.9-1.3 2.3-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';

function liveCard(p, offset) {
  const price = livePrice(p);
  const save = live.cycle === 'yearly' ? saving(p) : 0;
  const features = [...(p.isBundle ? [`<li class="strong">${checkIcon}<span>يشمل: <bdi>${p.productKeys.map(k => SYSTEM_NAMES[k] || k).join(' · ')}</bdi></span></li>`] : []), ...(p.features?.ar || []).map(f => `<li>${checkIcon}<span>${esc(f)}</span></li>`)];
  const cta = price == null && !p.trialDays ? 'تواصل معنا' : p.trialDays ? 'ابدأ التجربة المجانية' : 'اشترك الآن';
  return `
  <div class="live-plan ${p.isFeatured ? 'featured' : ''} ${offset ? 'offset' : ''}">
    ${p.isFeatured ? `<div class="live-band">الأكثر طلباً ${heartIcon}</div>` : ''}
    <article class="live-card">
      <h3>${esc(p.name?.ar)}</h3>
      ${p.desc?.ar ? `<p class="live-desc">${esc(p.desc.ar)}</p>` : ''}
      <div class="live-price">${price == null ? '<strong class="on-request">السعر عند الطلب</strong>' : price === 0 ? '<strong>مجاناً</strong>' : `<strong>${money(price)}</strong><span>ر.س / ${live.cycle === 'yearly' ? 'سنة' : 'شهر'}</span>`}</div>
      <div class="live-chips">${save > 0 ? `<span class="ok">وفّر ${save}%</span>` : ''}${p.trialDays ? `<span class="info">تجربة مجانية ${p.trialDays} يوم</span>` : ''}</div>
      <hr>
      <ul>${features.join('')}</ul>
      <button class="live-cta" data-live-plan="${esc(p.id)}">${cta}</button>
    </article>
  </div>`;
}
// A tab with no plans in Sana yet (Tasks today): one card that leads to the contact form.
const soonCard = () => `
  <div class="live-plan">
    <article class="live-card">
      <h3>سنع ${esc(SYSTEM_NAMES[SYSTEM_KEYS[state.product]] || state.product)}</h3>
      <p class="live-desc">تواصل معنا ونرتّب لك الباقة المناسبة.</p>
      <div class="live-price"><strong class="on-request">السعر عند الطلب</strong></div>
      <div class="live-chips"></div><hr><ul></ul>
      <button class="live-cta" data-live-contact>تواصل معنا</button>
    </article>
  </div>`;

function renderLive() {
  if(!live.plans) return;
  const key = SYSTEM_KEYS[state.product];
  const plans = live.plans.filter(p => p.productKeys.includes(key)).sort((a,b) => a.isBundle - b.isBundle);
  const anyFeatured = plans.some(p => p.isFeatured);
  const best = Math.max(0, ...live.plans.map(saving));
  document.querySelector('#live-cycle').innerHTML = ['monthly','yearly'].map(c => `<button type="button" data-live-cycle="${c}" class="${live.cycle===c?'active':''}" aria-pressed="${live.cycle===c}">${c==='monthly'?'شهري':'سنوي'}${c==='yearly'&&best>0?` <span>وفّر حتى ${best}%</span>`:''}</button>`).join('');
  const grid = document.querySelector('#pricing-grid');
  const n = Math.max(1, plans.length);
  grid.style.setProperty('--plans', String(Math.min(n, 4)));
  grid.style.setProperty('--plans-md', String(Math.min(n, n === 4 ? 2 : 3)));
  grid.style.setProperty('--plans-sm', String(Math.min(n, 2)));
  grid.innerHTML = plans.length ? plans.map(p => liveCard(p, anyFeatured && !p.isFeatured)).join('') : soonCard();
}
function goLive(plans) {
  live.plans = plans;
  const section = document.querySelector('#pricing');
  section.classList.add('live');
  const cycle = document.createElement('div');
  cycle.id = 'live-cycle'; cycle.className = 'live-cycle'; cycle.setAttribute('role','group'); cycle.setAttribute('aria-label','دورة الاشتراك');
  section.querySelector('.product-filter').after(cycle);
  renderLive();
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', renderLive));
document.querySelector('#pricing').addEventListener('click', e => {
  const c = e.target.closest('[data-live-cycle]');
  if(c) { live.cycle = c.dataset.liveCycle; renderLive(); return; }
  if(e.target.closest('[data-live-contact]')) { openContact(e.target.closest('[data-live-contact]'), `أرغب في معرفة باقات سنع ${state.product}.`); return; }
  const b = e.target.closest('[data-live-plan]');
  if(!b) return;
  const plan = live.plans.find(p => String(p.id) === b.dataset.livePlan);
  if(plan && livePrice(plan) == null && !plan.trialDays) { openContact(b, `أرغب في الاشتراك في باقة ${plan.name?.ar}.\nالدورة المطلوبة: ${live.cycle==='yearly'?'سنوية':'شهرية'}`); return; }
  // system: the tab's system — if the plan is gone by then, Sana opens that system's plans.
  window.location.assign(`${config.appUrl}/?plan=${encodeURIComponent(b.dataset.livePlan)}&cycle=${live.cycle}&system=${SYSTEM_KEYS[state.product]}`);
});
document.querySelectorAll('.login-button').forEach(a => { a.href = config.appUrl; });
fetch(`${config.apiBase}/api/public/plans`, { signal: AbortSignal.timeout(8000) })
  .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
  .then(({ plans }) => { if(Array.isArray(plans) && plans.length) goLive(plans); })
  .catch(() => { /* keep the design's pricing */ });

let dialogTrigger = null;
function openDialog(id, trigger) {
  dialogTrigger = trigger || document.activeElement;
  if(demoDialogIds.has(id)) document.body.classList.add('hr-modal-open');
  document.getElementById(id).showModal();
}
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click',e=> { if(e.target===dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
  dialog.addEventListener('close',()=>{ if(demoDialogIds.has(dialog.id)) document.body.classList.remove('hr-modal-open'); dialogTrigger?.focus(); });
});
document.addEventListener('click', e => {
  const close = e.target.closest('[data-close]');
  if(close) close.closest('dialog').close();
  const trigger = e.target.closest('[data-dialog]');
  if(trigger) { if(trigger.matches('a')) e.preventDefault(); openDialog(trigger.dataset.dialog,trigger); }
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
const introScreen=document.querySelector('#intro-screen');
const introVideo=document.querySelector('#intro-video');
const introSound=document.querySelector('#intro-sound');
const introSkip=document.querySelector('#intro-skip');
const pageElements=[...document.body.children].filter(element=>element!==introScreen);
document.body.classList.add('intro-active');
pageElements.forEach(element=>element.inert=true);
introSkip.focus({preventScroll:true});
function closeIntro() {
  if(introScreen.hidden) return;
  introVideo.pause();
  introScreen.hidden=true;
  document.body.classList.remove('intro-active');
  pageElements.forEach(element=>element.inert=false);
  document.querySelector('.brand').focus({preventScroll:true});
  syncHeroVideo();
}
introSkip.addEventListener('click',closeIntro);
introVideo.addEventListener('ended',closeIntro);
introVideo.addEventListener('error',closeIntro);
introSound.addEventListener('click',async()=> {
  introVideo.muted=false;
  try {
    await introVideo.play();
    introSound.hidden=true;
  } catch {
    introSound.textContent='اضغط لتشغيل الفيديو';
  }
});
async function playIntro() {
  try {
    introVideo.muted=false;
    await introVideo.play();
  } catch {
    if(introScreen.hidden) return;
    introVideo.muted=true;
    introSound.hidden=false;
    try { await introVideo.play(); }
    catch { introSound.textContent='اضغط لتشغيل الفيديو بالصوت'; }
  }
}
function syncHeroVideo() {
  if(!introScreen.hidden || reducedMotion.matches || document.hidden) { heroVideo.pause(); return; }
  heroVideo.play().catch(()=>heroVideo.classList.add('is-unavailable'));
}
heroVideo.addEventListener('error',()=>heroVideo.classList.add('is-unavailable'));
reducedMotion.addEventListener('change',syncHeroVideo);
document.addEventListener('visibilitychange',syncHeroVideo);
syncHeroVideo();
playIntro();
