(function(){
  const root = document.documentElement;
  const body = document.body;

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav){
    menuBtn.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  // Theme toggle with persistence
  const themeKey = 'bmc_theme';
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme === 'dark') root.classList.add('dark');
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn){
    themeBtn.addEventListener('click', ()=>{
      root.classList.toggle('dark');
      localStorage.setItem(themeKey, root.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Language toggle and i18n
  const langKey = 'bmc_lang';
  const i18n = getI18nMap();
  let lang = localStorage.getItem(langKey) || document.documentElement.lang || 'ar';
  applyLang(lang);

  const langBtn = document.getElementById('langToggle');
  if (langBtn){
    langBtn.addEventListener('click', ()=>{
      lang = (lang === 'ar') ? 'en' : 'ar';
      localStorage.setItem(langKey, lang);
      applyLang(lang);
    });
  }

  function applyLang(l){
    const dir = (l === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
    document.documentElement.setAttribute('dir', dir);
    // Update toggle button label
    if (langBtn) langBtn.textContent = (l === 'ar') ? 'EN' : 'ع';
    // Swap nav labels and all i18n tags
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const text = i18n[l][key];
      if (typeof text === 'string'){
        el.textContent = text;
      }
    });
    // Update placeholders for inputs if needed
    const search = document.getElementById('blogSearch');
    if (search){
      search.placeholder = (l === 'ar') ? '...' : 'Search...';
    }
    // Update page titles
    const titles = {
      home: { ar: 'BMC | الرئيسية', en: 'BMC | Home' },
      services: { ar: 'BMC | الخدمات المهنية', en: 'BMC | Professional Services' },
      'ai-transform': { ar: 'BMC | تطوير المؤسسات بالذكاء الاصطناعي', en: 'BMC | AI Transformation Services' },
      protocols: { ar: 'BMC | البروتوكولات الطبية', en: 'BMC | Medical Protocols' },
      'ai-healthcare': { ar: 'BMC | الذكاء الاصطناعي في الطب', en: 'BMC | AI in Healthcare' },
      blog: { ar: 'BMC | المدونة الطبية', en: 'BMC | BMC Blog' },
      contact: { ar: 'BMC | تواصل معنا', en: 'BMC | Contact' },
    };
    const pageId = body.getAttribute('data-page');
    if (titles[pageId]) document.title = titles[pageId][l];
    // Adjust table text-align in LTR via CSS already
  }

  function getI18nMap(){
    return {
      ar: {
        brand: 'Best Medical Community (BMC)',
        nav_home: 'الصفحة الرئيسية',
        nav_services: 'الخدمات المهنية',
        nav_ai_transform: 'تطوير المؤسسات بالذكاء الاصطناعي',
        nav_protocols: 'البروتوكولات الطبية',
        nav_ai_healthcare: 'الذكاء الاصطناعي في الطب',
        nav_blog: 'المدونة',
        nav_contact: 'تواصل معنا',

        hero_title: 'نساعد الأفراد والمؤسسات على الارتقاء بالممارسات الطبية عبر الوثائق المهنية والتحول الذكي.',
        cta_services: 'استكشف الخدمات المهنية',
        cta_ai: 'ابدأ تطوير مؤسستك الآن',

        quick_title: 'روابط رئيسية',
        quick_services_desc: 'حلول عملية لتطوير المسار المهني للأطباء والكوادر الصحية.',
        quick_protocols_desc: 'تصميم بروتوكولات وسياسات متوافقة مع معايير منظمة الصحة العالمية.',
        quick_ai_desc: 'تحول رقمي ذكي للصحة والتعليم والحوكمة.',
        quick_ai_healthcare_desc: 'تعريف، ورش تدريبية، ونماذج تسجيل.',

        services_preview_title: 'خدمات مختارة',
        svc_cv_title: 'تصميم السير الذاتية والخطابات المهنية',
        svc_cv_desc: 'إعداد سيرة ذاتية وخطابات توصية احترافية للأطباء والكوادر الصحية.',
        order_whatsapp: 'اطلب عبر واتساب',
        more: 'المزيد',
        contact_direct: 'تواصل مباشر',
        svc_protocols_title: 'إعداد البروتوكولات والسياسات الطبية',
        svc_protocols_desc: 'تطوير بروتوكولات لجميع الأقسام وفق معايير WHO.',
        svc_consult_title: 'الاستشارات المهنية',
        svc_consult_desc: 'دعم الكوادر والمؤسسات في التنظيم الإداري والمهني',
        svc_ai_title: 'تطوير المؤسسات بالذكاء الاصطناعي',
        svc_ai_desc: 'انتقل إلى صفحة الخدمة الجديدة للتفاصيل.',
        svc_cv_more: 'نماذج حديثة متوافقة مع أنظمة التوظيف ATS وإخراج احترافي.',
        svc_protocols_more: 'تحليل فجوات، مواءمة مع WHO ووزارة الصحة، تسليم ملفات قابلة للتطبيق.',
        svc_consult_more: 'حزم استشارية مرنة: جلسة واحدة، شهري، أو مشروع كامل.',
        svc_ai_more: 'خارطة طريق، سياسات، تدريب، ومشاريع تجريبية.',

        news_title: 'الأخبار الطبية',
        news_note: 'مصدر وهمي قابل للاستبدال لاحقاً بـ API حقيقي',

        testimonials_title: 'آراء العملاء',
        t1: 'خدمة احترافية وسريعة ساعدتنا في تنظيم بروتوكولات الطوارئ.',
        t2: 'التحول الذكي حسّن مؤشرات الأداء لدينا خلال 3 أشهر.',
        cta_bottom_title: 'جاهز للارتقاء بمؤسستك؟',

        footer_msg: 'BMC — وثائق مهنية، بروتوكولات طبية، وتحول ذكي.',
        footer_links: 'روابط',
        footer_contact: 'التواصل',

        services_title: 'الخدمات المهنية',
        services_sub: 'حلول عملية لتطوير المسار المهني للأطباء والكوادر الصحية.',
        services_table_caption: 'جدول الخدمات المهنية',
        service: 'الخدمة', description: 'الوصف', order: 'طريقة الطلب',

        ai_page_title: 'تطوير المؤسسات الصحية والأكاديمية لتبنّي الذكاء الاصطناعي بكفاءة',
        ai_page_sub: 'استشارات متخصصة لتحقيق التحول الرقمي في الإدارة والتعليم والرعاية الصحية.',
        ai_desc_title: '1) وصف الخدمة',
        ai_desc: 'نقدم استشارات للمنشآت الصحية والجامعات والمعاهد والوزارات لتبني حلول الذكاء الاصطناعي ودمجها في العمليات بفعالية.',
        ai_scope_title: '2) نطاق الخدمة',
        ai_scope_hosp: 'في المستشفيات والمؤسسات الصحية',
        ai_scope_h1: 'تحليل جاهزية المؤسسة للتحول الرقمي.',
        ai_scope_h2: 'بناء نظم دعم القرار السريري (CDSS).',
        ai_scope_h3: 'تحسين إدارة البيانات والتحليلات (AI Analytics).',
        ai_scope_h4: 'تطوير بروتوكولات الذكاء الاصطناعي الآمن والامتثال التنظيمي.',
        ai_scope_uni: 'في الجامعات والمعاهد العلمية',
        ai_scope_u1: 'دمج الذكاء الاصطناعي في المناهج الطبية والتعليم الإلكتروني.',
        ai_scope_u2: 'تطوير معامل تدريب افتراضية (Simulation & AI Labs).',
        ai_scope_u3: 'تأهيل الكوادر الأكاديمية لاستخدام أدوات الذكاء الاصطناعي.',
        ai_scope_min: 'في الوزارات والهيئات',
        ai_scope_m1: 'تصميم سياسات وطنية لتوظيف الذكاء الاصطناعي في القطاع الصحي.',
        ai_scope_m2: 'بناء مؤشرات أداء قائمة على البيانات (AI-Based KPIs).',
        ai_scope_m3: 'تطوير أنظمة مراقبة وتحليل للأداء المؤسسي.',
        ai_outputs_title: '3) المخرجات المتوقعة',
        ai_out_1: 'خطة تنفيذ واضحة (AI Implementation Roadmap).',
        ai_out_2: 'سياسات وتشريعات داخلية للتكامل الآمن.',
        ai_out_3: 'تدريب الكوادر وإطلاق نماذج تجريبية (Pilot Projects).',
        ai_out_4: 'تقارير تقييم جاهزية (Readiness Reports).',
        ai_features_title: '4) مميزات الخدمة',
        ai_feat_1: 'منهج تطبيقي قائم على الخبرة في الصحة الرقمية.',
        ai_feat_2: 'توافق كامل مع معايير WHO ووزارة الصحة.',
        ai_feat_3: 'حلول قابلة للتنفيذ باستخدام أدوات مجانية ومفتوحة المصدر.',
        ai_steps_title: '5) خطوات الطلب',
        ai_step_1: 'التواصل عبر واتساب أو البريد الرسمي.',
        ai_step_2: 'إرسال وصف للمؤسسة والمجال المطلوب تطويره.',
        ai_step_3: 'عقد اجتماع استكشافي لتحديد الأهداف.',
        ai_step_4: 'تقديم عرض فني ومالي مفصل.',
        ai_step_5: 'بدء التنفيذ ومتابعة النتائج.',
        faq_title: 'أسئلة شائعة',
        faq_q1: 'كم تستغرق مدة التنفيذ؟',
        faq_a1: 'عادة بين 6–16 أسبوعاً حسب حجم المؤسسة ونطاق العمل.',
        faq_q2: 'ما المتطلبات الأساسية للبدء؟',
        faq_a2: 'وصف موجز للأنظمة الحالية وفرق العمل والأهداف المرجوة.',
        faq_q3: 'هل تدعمون الامتثال والحوكمة؟',
        faq_a3: 'نعم، نراعي معايير الخصوصية والأمان والاعتماد وفق الإرشادات الوطنية والدولية.',

        protocols_title:'كتابة السياسات والبروتوكولات الطبية',
        protocols_sub:'منهجية معتمدة، قابلة للتطبيق، ومتوافقة مع WHO ووزارة الصحة.',
        protocols_method:'المنهجية',
        pm_1:'تحليل فجوات السياسات والإجراءات الحالية.',
        pm_2:'مواءمة مع المعايير الوطنية والدولية.',
        pm_3:'صياغة وثائق قابلة للتنفيذ مع مسارات الموافقات.',
        pm_4:'تدريب الفرق على التطبيق والمتابعة.',
        protocols_examples:'أمثلة الأقسام',
        pe_er:'الطوارئ', pe_er_d:'بروتوكولات الفرز، الإنعاش، وإدارة الأزمات.',
        pe_icu:'العناية المكثفة', pe_icu_d:'تهوية ميكانيكية، مكافحة العدوى، وخطط الأدوية عالية الخطورة.',
        pe_lab:'المختبر', pe_lab_d:'سلسلة العينة، ضمان الجودة، وإدارة الأجهزة.',
        pe_admin:'الإدارة', pe_admin_d:'حوكمة، إدارة مخاطر، وتوثيق.',
        cta_protocols:'اطلب عرضاً لصياغة بروتوكولات مخصصة لقسمك',
        contact_us:'تواصل معنا',

        aih_title:'الذكاء الاصطناعي السريري — تعريف وورش',
        aih_sub:'تعريف مبسط بالذكاء الاصطناعي، وورش عملية مع نموذج تسجيل مباشر.',
        aih_def_title:'تعريف مبسط',
        aih_def:'الذكاء الاصطناعي في الرعاية الصحية يشمل خوارزميات تعلم الآلة، معالجة الصور والنصوص، ونظم دعم القرار السريري لتحسين الجودة والسلامة.',
        aih_workshops_title:'الورش التدريبية',
        ws1_title:'أساسيات الذكاء الاصطناعي للأطباء',
        ws1_o1:'مفاهيم أساسية وتطبيقات عملية.',
        ws1_o2:'أمثلة سريرية ونماذج مصغرة.',
        ws1_o3:'مدة: 6 ساعات.',
        ws2_title:'بناء CDSS باستخدام أدوات مفتوحة المصدر',
        ws2_o1:'تصميم المسارات السريرية.',
        ws2_o2:'تقييم الأداء والاعتماد.',
        ws2_o3:'مدة: يومان.',
        aih_register_title:'نموذج التسجيل',

        blog_title:'المدونة الطبية',
        blog_sub:'مقالات وفيديوهات وبودكاست — تطوير مهني، بروتوكولات طبية، ذكاء اصطناعي.',
        category:'التصنيف', search:'بحث', all:'الكل',
        cat_career:'تطوير مهني', cat_protocols:'بروتوكولات طبية', cat_ai:'ذكاء اصطناعي',

        contact_title:'تواصل معنا',
        contact_sub:'نسعد بخدمتك — أرسل طلبك أو راسلنا مباشرة.',
        name:'الاسم الكامل', email:'البريد الإلكتروني', phone:'رقم الجوال',
        service_type:'نوع الخدمة', other:'أخرى', message:'رسالتك',
        send:'إرسال', reset:'إعادة ضبط',
        direct_contact:'تواصل مباشر', customer_reviews:'تقييمات العملاء',
        r1:'★★★★★ تنظيم احترافي وسريع الاستجابة.',
        r2:'★★★★★ جودة محتوى وسياسات قابلة للتطبيق.',
      },
      en: {
        brand: 'Best Medical Community (BMC)',
        nav_home: 'Home',
        nav_services: 'Professional Services',
        nav_ai_transform: 'AI Transformation Services',
        nav_protocols: 'Medical Protocols',
        nav_ai_healthcare: 'AI in Healthcare',
        nav_blog: 'Blog',
        nav_contact: 'Contact',

        hero_title: 'We help individuals and organizations elevate medical practice through professional documentation and smart transformation.',
        cta_services: 'Explore Professional Services',
        cta_ai: 'Start Your AI Transformation',

        quick_title: 'Quick Links',
        quick_services_desc: 'Practical solutions for healthcare professionals’ career development.',
        quick_protocols_desc: 'Design of protocols and policies aligned with WHO standards.',
        quick_ai_desc: 'Smart digital transformation for health, education, and governance.',
        quick_ai_healthcare_desc: 'Definition, training workshops, and registration forms.',

        services_preview_title: 'Featured Services',
        svc_cv_title: 'CV Design and Professional Letters',
        svc_cv_desc: 'Professional CVs and recommendation letters for healthcare staff.',
        order_whatsapp: 'Order via WhatsApp',
        more: 'More',
        contact_direct: 'Direct Contact',
        svc_protocols_title: 'Medical Protocols and Policies',
        svc_protocols_desc: 'Develop protocols for all departments aligned with WHO.',
        svc_consult_title: 'Professional Consulting',
        svc_consult_desc: 'Support for administrative and professional organization.',
        svc_ai_title: 'AI Transformation for Institutions',
        svc_ai_desc: 'Go to the new service page for details.',
        svc_cv_more: 'Modern, ATS-friendly templates with professional output.',
        svc_protocols_more: 'Gap analysis, alignment with WHO/MOH, actionable files.',
        svc_consult_more: 'Flexible plans: single session, monthly, or full project.',
        svc_ai_more: 'Roadmap, policies, training, and pilot projects.',

        news_title: 'Medical News',
        news_note: 'Mock source to be replaced later with a real API',

        testimonials_title: 'Client Testimonials',
        t1: 'Professional and swift service that organized our ER protocols.',
        t2: 'Smart transformation improved our KPIs within 3 months.',
        cta_bottom_title: 'Ready to elevate your institution?',

        footer_msg: 'BMC — Professional documentation, medical protocols, and smart transformation.',
        footer_links: 'Links',
        footer_contact: 'Contact',

        services_title: 'Professional Services',
        services_sub: 'Practical solutions for healthcare professionals.',
        services_table_caption: 'Professional Services Table',
        service: 'Service', description: 'Description', order: 'How to order',

        ai_page_title: 'Transform health and academic institutions to adopt AI efficiently',
        ai_page_sub: 'Specialized consulting for digital transformation in management, education, and healthcare.',
        ai_desc_title: '1) Service Description',
        ai_desc: 'We provide consulting to healthcare facilities, universities, institutes, and ministries to adopt AI solutions.',
        ai_scope_title: '2) Service Scope',
        ai_scope_hosp: 'Hospitals and Healthcare Institutions',
        ai_scope_h1: 'Assess digital transformation readiness.',
        ai_scope_h2: 'Build Clinical Decision Support Systems (CDSS).',
        ai_scope_h3: 'Improve data management and AI analytics.',
        ai_scope_h4: 'Develop safe AI protocols and regulatory compliance.',
        ai_scope_uni: 'Universities and Institutes',
        ai_scope_u1: 'Integrate AI into medical curricula and e-learning.',
        ai_scope_u2: 'Develop simulation and AI training labs.',
        ai_scope_u3: 'Train faculty to use AI tools in teaching and research.',
        ai_scope_min: 'Ministries and Authorities',
        ai_scope_m1: 'Design national policies for AI in health sector.',
        ai_scope_m2: 'Build AI-based KPIs.',
        ai_scope_m3: 'Develop performance monitoring and analytics systems.',
        ai_outputs_title: '3) Expected Outputs',
        ai_out_1: 'AI implementation roadmap.',
        ai_out_2: 'Internal policies for safe integration.',
        ai_out_3: 'Staff training and pilot projects.',
        ai_out_4: 'Readiness assessment reports.',
        ai_features_title: '4) Service Features',
        ai_feat_1: 'Hands-on approach based on digital health expertise.',
        ai_feat_2: 'Full compliance with WHO and MOH standards.',
        ai_feat_3: 'Actionable solutions using free/open-source tools.',
        ai_steps_title: '5) How to Request',
        ai_step_1: 'Contact via WhatsApp or official email.',
        ai_step_2: 'Send a description of your institution and scope.',
        ai_step_3: 'Hold a discovery meeting to define objectives.',
        ai_step_4: 'Receive a detailed technical and financial proposal.',
        ai_step_5: 'Start implementation and monitor outcomes.',
        faq_title: 'FAQs',
        faq_q1: 'How long does it take?',
        faq_a1: 'Typically 6–16 weeks depending on size and scope.',
        faq_q2: 'What are the prerequisites?',
        faq_a2: 'A brief of current systems, teams, and desired outcomes.',
        faq_q3: 'Do you support governance and compliance?',
        faq_a3: 'Yes, we follow privacy, security, and accreditation guidelines.',

        protocols_title:'Medical Policies and Protocols Writing',
        protocols_sub:'Accredited, actionable methodology aligned with WHO and MOH.',
        protocols_method:'Methodology',
        pm_1:'Gap analysis of current policies and procedures.',
        pm_2:'Alignment with national and international standards.',
        pm_3:'Actionable documents with approval workflows.',
        pm_4:'Training teams on implementation and follow-up.',
        protocols_examples:'Department Examples',
        pe_er:'Emergency', pe_er_d:'Triage, resuscitation, crisis management.',
        pe_icu:'ICU', pe_icu_d:'Mechanical ventilation, infection control, high-alert meds.',
        pe_lab:'Laboratory', pe_lab_d:'Sample chain, quality assurance, equipment management.',
        pe_admin:'Administration', pe_admin_d:'Governance, risk management, documentation.',
        cta_protocols:'Request a tailored protocols package for your department',
        contact_us:'Contact us',

        aih_title:'Clinical AI — Overview and Workshops',
        aih_sub:'A simple overview of AI with hands-on workshops and registration.',
        aih_def_title:'Simple Definition',
        aih_def:'AI in healthcare includes ML algorithms, imaging/NLP, and CDSS to improve quality and safety.',
        aih_workshops_title:'Training Workshops',
        ws1_title:'AI Fundamentals for Clinicians',
        ws1_o1:'Core concepts and practical applications.',
        ws1_o2:'Clinical examples and mini projects.',
        ws1_o3:'Duration: 6 hours.',
        ws2_title:'Building CDSS with Open-Source Tools',
        ws2_o1:'Design clinical pathways.',
        ws2_o2:'Performance evaluation and accreditation.',
        ws2_o3:'Duration: 2 days.',
        aih_register_title:'Registration Form',

        blog_title:'BMC Blog',
        blog_sub:'Articles, videos, and podcasts — Career, Protocols, AI.',
        category:'Category', search:'Search', all:'All',
        cat_career:'Career Development', cat_protocols:'Medical Protocols', cat_ai:'Artificial Intelligence',

        contact_title:'Contact',
        contact_sub:'We are glad to help — send your request or contact us directly.',
        name:'Full Name', email:'Email', phone:'Phone',
        service_type:'Service Type', other:'Other', message:'Message',
        send:'Send', reset:'Reset',
        direct_contact:'Direct Contact', customer_reviews:'Customer Reviews',
        r1:'★★★★★ Professional, responsive organization.',
        r2:'★★★★★ High-quality, actionable policies.',
      }
    };
  }

  // News mock fetch (replaceable API)
  const NEWS_API_URL = 'news.json'; // replace later with real API endpoint
  const newsFeed = document.getElementById('newsFeed');
  if (newsFeed){
    fetch(NEWS_API_URL).then(r=>r.json()).then(items=>{
      renderNews(items);
    }).catch(()=>{
      newsFeed.innerHTML = '<div class="muted">Failed to load news.</div>';
    });
  }
  function renderNews(items){
    newsFeed.innerHTML = '';
    items.slice(0,6).forEach(item=>{
      const a = document.createElement('a');
      a.href = item.url || '#';
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'news-item';
      a.innerHTML = `
        <strong>${item.title}</strong>
        <p class="muted">${item.summary || ''}</p>
        <time datetime="${item.date || ''}">${new Date(item.date).toLocaleDateString()}</time>
      `;
      newsFeed.appendChild(a);
    });
  }

  // Blog mock list
  const blogList = document.getElementById('blogList');
  if (blogList){
    const posts = [
      { id:1, title:{ar:'كيف تجعل سيرتك الذاتية متوافقة مع ATS',en:'Make Your CV ATS-Friendly'}, cat:'career', excerpt:{ar:'خطوات عملية ونماذج جاهزة.',en:'Practical steps and templates.'}},
      { id:2, title:{ar:'بروتوكولات الطوارئ: أفضل الممارسات',en:'ER Protocols: Best Practices'}, cat:'protocols', excerpt:{ar:'منهجية تطبيقية مختصرة.',en:'A concise applied methodology.'}},
      { id:3, title:{ar:'CDSS: من الفكرة إلى التجربة',en:'CDSS: From Idea to Pilot'}, cat:'ai', excerpt:{ar:'خارطة طريق مختصرة.',en:'A concise roadmap.'}},
    ];
    const lang = localStorage.getItem(langKey) || 'ar';
    const render = ()=>{
      const filter = document.getElementById('blogCategory').value;
      const q = (document.getElementById('blogSearch').value || '').toLowerCase();
      blogList.innerHTML = '';
      posts.filter(p => (filter==='all'||p.cat===filter) && (p.title[lang].toLowerCase().includes(q) || p.excerpt[lang].toLowerCase().includes(q)))
        .forEach(p=>{
          const card = document.createElement('article');
          card.className = 'card';
          card.innerHTML = `
            <h3>${p.title[lang]}</h3>
            <p class="muted">${p.excerpt[lang]}</p>
            <div class="row">
              <a class="btn small outline" href="#" aria-disabled="true">Read</a>
            </div>
          `;
          blogList.appendChild(card);
        });
    };
    document.getElementById('blogCategory').addEventListener('change', render);
    document.getElementById('blogSearch').addEventListener('input', render);
    render();
  }

  // Contact form -> WhatsApp fallback (no backend)
  const contactForm = document.getElementById('contactForm');
  if (contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm));
      const text = `BMC Contact Request:%0AName: ${data.name}%0AEmail: ${data.email}%0APhone: ${data.phone||'-'}%0AService: ${data.service}%0AMessage: ${encodeURIComponent(data.message||'')}`;
      const url = `https://wa.me/249906933335?text=${text}`;
      const status = document.getElementById('formStatus');
      status.textContent = (document.documentElement.lang === 'ar')
        ? 'سيتم فتح واتساب لإرسال الرسالة...'
        : 'WhatsApp will open to send your message...';
      window.open(url, '_blank');
    });
  }
})();