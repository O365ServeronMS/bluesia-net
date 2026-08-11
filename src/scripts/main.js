/* ═══════════════════════════════════════════════════════════
   main.js — Bluesia.net Interactive Features
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ── State ──────────────────────────────────────────────────────
let currentLang = 'vi';

// ── Language Data ───────────────────────────────────────────────
const i18n = {
  vi: {
    nav_about:    'Về chúng tôi',
    nav_sectors:  'Lĩnh vực',
    nav_projects: 'Dự án',
    nav_why:      'Tại sao Bluesia',
    nav_contact:  'Liên hệ',
    nav_cta:      'Liên hệ ngay',
    hero_badge:   'Năng lượng tái tạo · Renewable Energy',
    hero_line1:   'Đầu tư vào',
    hero_line2:   'Tương lai xanh',
    hero_line3:   'của Việt Nam',
    hero_sub:     'Bluesia là nhà đầu tư tiên phong trong lĩnh vực năng lượng tái tạo tại Việt Nam, kiến tạo hạ tầng năng lượng sạch cho thế hệ tương lai.',
    hero_btn1:    'Xem dự án tiêu biểu',
    hero_btn2:    'Liên hệ với chúng tôi',
    stat1_label:  'Tổng công suất',
    stat2_label:  'Dự án triển khai',
    stat3_label:  'Tỉnh thành',
    stat4_label:  'Năm thành lập',
    about_eyebrow:'Về chúng tôi',
    about_title:  'Tiên phong xây dựng<br><strong>hạ tầng năng lượng xanh</strong><br>tại Việt Nam',
    about_body:   'Bluesia là nhà đầu tư chuyên biệt trong lĩnh vực năng lượng tái tạo, với hơn một thập kỷ kinh nghiệm phát triển, vận hành và tối ưu hóa các dự án điện mặt trời, điện gió và thủy điện trên toàn lãnh thổ Việt Nam.<br><br>Chúng tôi không chỉ đầu tư vốn — chúng tôi đầu tư vào tương lai. Mỗi dự án là cam kết dài hạn với cộng đồng địa phương, môi trường và sự phát triển bền vững của đất nước.',
    val1_title:   'Cam kết bền vững',
    val1_desc:    'Mọi khoản đầu tư đều hướng đến Net Zero vào năm 2050',
    val2_title:   'Chuyên môn sâu',
    val2_desc:    'Đội ngũ kỹ sư và chuyên gia năng lượng hàng đầu Việt Nam',
    val3_title:   'Minh bạch tài chính',
    val3_desc:    'Báo cáo ESG đầy đủ, tuân thủ chuẩn quốc tế',
    about_badge_label: 'Công suất lắp đặt',
    about_badge_value: '500+ MW',
    sec_eyebrow:  'Lĩnh vực đầu tư',
    sec_title:    'Danh mục<br><strong>năng lượng xanh</strong>',
    sec_desc:     'Đa dạng hóa danh mục đầu tư trên bốn phân khúc năng lượng tái tạo chiến lược.',
    sol_name:     'Điện Mặt Trời',
    sol_name_en:  'Solar Power',
    sol_desc:     'Trang trại điện mặt trời quy mô lớn và hệ thống mái nhà doanh nghiệp trên khắp miền Nam và miền Trung Việt Nam.',
    sol_cap:      'Công suất: <strong>280+ MW</strong>',
    wind_name:    'Điện Gió',
    wind_name_en: 'Wind Power',
    wind_desc:    'Dự án điện gió trên bờ và ngoài khơi, khai thác tiềm năng gió dồi dào của vùng duyên hải Việt Nam.',
    wind_cap:     'Công suất: <strong>140+ MW</strong>',
    hydro_name:   'Thủy Điện',
    hydro_name_en:'Hydropower',
    hydro_desc:   'Hệ thống thủy điện nhỏ và vừa tại các tỉnh miền núi phía Bắc và Tây Nguyên.',
    hydro_cap:    'Công suất: <strong>60+ MW</strong>',
    store_name:   'Lưu Trữ Năng Lượng',
    store_name_en:'Energy Storage',
    store_desc:   'Hệ thống lưu trữ pin BESS tiên tiến, tích hợp vào lưới điện quốc gia, tối ưu hóa phân phối năng lượng.',
    store_cap:    'Công suất: <strong>20+ MW</strong>',
    proj_eyebrow: 'Dự án tiêu biểu',
    proj_title:   'Công trình<br><strong>nổi bật</strong> của chúng tôi',
    p1_loc:       'Ninh Thuận, Việt Nam',
    p1_name:      'Dự án Điện Mặt Trời Ninh Thuận',
    p1_desc:      'Trang trại điện mặt trời quy mô 120MW tọa lạc tại vùng nắng gắt nhất Việt Nam, cung cấp điện cho hơn 80.000 hộ gia đình.',
    p1_cap:       '120 MW',
    p1_co2:       '145.000 tấn',
    p2_loc:       'Bình Thuận, Việt Nam',
    p2_name:      'Dự án Điện Gió Bình Thuận',
    p2_desc:      'Cụm turbine gió trên bờ 80MW tại vùng duyên hải Bình Thuận, một trong những dự án điện gió lớn nhất khu vực.',
    p2_cap:       '80 MW',
    p2_co2:       '96.000 tấn',
    p3_loc:       'Lào Cai, Việt Nam',
    p3_name:      'Thủy Điện Lào Cai',
    p3_desc:      'Nhà máy thủy điện 40MW hòa vào hệ thống sông Hồng, kết hợp du lịch sinh thái và phát triển cộng đồng địa phương.',
    p3_cap:       '40 MW',
    p3_co2:       '48.000 tấn',
    spec_cap:     'Công suất',
    spec_co2:     'CO₂ tiết kiệm/năm',
    why_eyebrow:  'Tại sao chọn Bluesia',
    why_title:    'Lợi thế<br><strong>vượt trội</strong>',
    w1_vi: 'Mạng lưới quan hệ sâu rộng',
    w1_en: 'Deep regulatory network',
    w1_d:  'Kinh nghiệm làm việc với các cơ quan nhà nước và EVN, rút ngắn thời gian phê duyệt và kết nối lưới điện.',
    w2_vi: 'Tối ưu lợi nhuận dài hạn',
    w2_en: 'Long-term yield optimization',
    w2_d:  'IRR trung bình 14–18% trên danh mục, được bảo đảm bởi FIT và hợp đồng mua điện dài hạn với EVN.',
    w3_vi: 'Quản lý rủi ro toàn diện',
    w3_en: 'Comprehensive risk management',
    w3_d:  'Đội ngũ pháp lý và kỹ thuật chuyên biệt giám sát toàn bộ vòng đời dự án từ phát triển đến vận hành.',
    w4_vi: 'Tác động ESG đo lường được',
    w4_en: 'Measurable ESG impact',
    w4_d:  'Báo cáo tác động môi trường và xã hội theo chuẩn GRI, phù hợp với yêu cầu của nhà đầu tư tổ chức quốc tế.',
    cont_eyebrow: 'Liên hệ',
    cont_title:   'Cùng xây dựng<br><strong>tương lai xanh</strong>',
    cont_body:    'Chúng tôi hoan nghênh các nhà đầu tư, đối tác chiến lược và tổ chức tài chính có cùng tầm nhìn. Hãy liên hệ để khám phá cơ hội hợp tác.',
    form_title:   'Gửi yêu cầu hợp tác',
    form_sub:     'Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.',
    f_name:       'Họ và tên',
    f_email:      'Email doanh nghiệp',
    f_company:    'Công ty / Tổ chức',
    f_interest:   'Lĩnh vực quan tâm',
    f_msg:        'Nội dung',
    f_submit:     'Gửi yêu cầu',
    f_turnstile:  'Vui lòng hoàn tất bước xác minh bảo mật.',
    f_msg_ph:     'Mô tả ngắn về kế hoạch đầu tư hoặc câu hỏi của bạn...',
    int_solar:    'Điện Mặt Trời',
    int_wind:     'Điện Gió',
    int_hydro:    'Thủy Điện',
    int_storage:  'Lưu Trữ Năng Lượng',
    int_all:      'Tất cả lĩnh vực',
    suc_title:    'Gửi thành công!',
    suc_desc:     'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong 24 giờ.',
    ft_tagline:   'Nhà đầu tư năng lượng tái tạo hàng đầu Việt Nam.',
    ft_nav:       'Điều hướng',
    ft_sectors_:  'Lĩnh vực',
    ft_legal_:    'Pháp lý',
    ft_privacy:   'Chính sách bảo mật',
    ft_terms:     'Điều khoản sử dụng',
    ft_copy:      '© 2026 Bluesia Investment Group. Tất cả quyền được bảo lưu.',
    addr_label:   'Địa chỉ',
    addr_val:     'Tòa nhà Bluesia, 123 Nguyễn Huệ, Quận 1, TP.HCM',
    email_label:  'Email',
    email_val:    'invest@bluesia.net',
    phone_label:  'Điện thoại',
    phone_val:    '+84 28 3822 0000',
  },
  en: {
    nav_about:    'About Us',
    nav_sectors:  'Sectors',
    nav_projects: 'Projects',
    nav_why:      'Why Bluesia',
    nav_contact:  'Contact',
    nav_cta:      'Contact Us',
    hero_badge:   'Renewable Energy · Năng lượng tái tạo',
    hero_line1:   'Investing in',
    hero_line2:   'A Greener Future',
    hero_line3:   'of Vietnam',
    hero_sub:     'Bluesia is a pioneering investor in Vietnam\'s renewable energy sector, building clean energy infrastructure for future generations.',
    hero_btn1:    'View Our Projects',
    hero_btn2:    'Get in Touch',
    stat1_label:  'Total Capacity',
    stat2_label:  'Projects Deployed',
    stat3_label:  'Provinces',
    stat4_label:  'Year Founded',
    about_eyebrow:'About Us',
    about_title:  'Pioneering<br><strong>green energy infrastructure</strong><br>in Vietnam',
    about_body:   'Bluesia is a specialized investor in renewable energy, with over a decade of experience developing, operating, and optimizing solar, wind, and hydropower projects across Vietnam.<br><br>We don\'t just invest capital — we invest in the future. Every project is a long-term commitment to local communities, the environment, and Vietnam\'s sustainable development.',
    val1_title:   'Sustainability Commitment',
    val1_desc:    'Every investment aligned with Net Zero by 2050',
    val2_title:   'Deep Expertise',
    val2_desc:    'Vietnam\'s leading energy engineers and specialists',
    val3_title:   'Financial Transparency',
    val3_desc:    'Full ESG reporting compliant with international standards',
    about_badge_label: 'Installed Capacity',
    about_badge_value: '500+ MW',
    sec_eyebrow:  'Investment Sectors',
    sec_title:    'Our<br><strong>green energy</strong> portfolio',
    sec_desc:     'Diversified portfolio across four strategic renewable energy segments.',
    sol_name:     'Solar Power',
    sol_name_en:  'Điện Mặt Trời',
    sol_desc:     'Large-scale solar farms and commercial rooftop systems across southern and central Vietnam.',
    sol_cap:      'Capacity: <strong>280+ MW</strong>',
    wind_name:    'Wind Power',
    wind_name_en: 'Điện Gió',
    wind_desc:    'Onshore and offshore wind projects harnessing Vietnam\'s rich coastal wind resources.',
    wind_cap:     'Capacity: <strong>140+ MW</strong>',
    hydro_name:   'Hydropower',
    hydro_name_en:'Thủy Điện',
    hydro_desc:   'Small and medium hydropower systems in the northern mountainous provinces and Central Highlands.',
    hydro_cap:    'Capacity: <strong>60+ MW</strong>',
    store_name:   'Energy Storage',
    store_name_en:'Lưu Trữ',
    store_desc:   'Advanced BESS storage systems integrated into the national grid, optimizing energy distribution.',
    store_cap:    'Capacity: <strong>20+ MW</strong>',
    proj_eyebrow: 'Featured Projects',
    proj_title:   'Our<br>flagship <strong>projects</strong>',
    p1_loc:       'Ninh Thuan, Vietnam',
    p1_name:      'Ninh Thuan Solar Farm',
    p1_desc:      'A 120MW solar farm in Vietnam\'s sunniest region, supplying electricity to over 80,000 households.',
    p1_cap:       '120 MW',
    p1_co2:       '145,000 tons',
    p2_loc:       'Binh Thuan, Vietnam',
    p2_name:      'Binh Thuan Wind Farm',
    p2_desc:      'An 80MW onshore wind cluster on the Binh Thuan coast, one of the largest wind projects in the region.',
    p2_cap:       '80 MW',
    p2_co2:       '96,000 tons',
    p3_loc:       'Lao Cai, Vietnam',
    p3_name:      'Lao Cai Hydropower Plant',
    p3_desc:      'A 40MW hydropower plant on the Red River system, combining eco-tourism and local community development.',
    p3_cap:       '40 MW',
    p3_co2:       '48,000 tons',
    spec_cap:     'Capacity',
    spec_co2:     'CO₂ saved/year',
    why_eyebrow:  'Why Choose Bluesia',
    why_title:    'Our<br><strong>key advantages</strong>',
    w1_vi: 'Deep regulatory network',
    w1_en: 'Mạng lưới quan hệ sâu rộng',
    w1_d:  'Extensive experience working with government agencies and EVN, accelerating approvals and grid connections.',
    w2_vi: 'Long-term yield optimization',
    w2_en: 'Tối ưu lợi nhuận dài hạn',
    w2_d:  'Average IRR of 14–18% across the portfolio, secured by FIT and long-term power purchase agreements with EVN.',
    w3_vi: 'Comprehensive risk management',
    w3_en: 'Quản lý rủi ro toàn diện',
    w3_d:  'Specialized legal and technical teams monitor the full project lifecycle from development to operations.',
    w4_vi: 'Measurable ESG impact',
    w4_en: 'Tác động ESG đo lường được',
    w4_d:  'GRI-standard environmental and social impact reporting, aligned with international institutional investor requirements.',
    cont_eyebrow: 'Contact',
    cont_title:   'Build the<br><strong>green future</strong> with us',
    cont_body:    'We welcome investors, strategic partners and financial institutions who share our vision. Get in touch to explore collaboration opportunities.',
    form_title:   'Send a Partnership Inquiry',
    form_sub:     'We\'ll respond within 24 business hours.',
    f_name:       'Full Name',
    f_email:      'Business Email',
    f_company:    'Company / Organization',
    f_interest:   'Area of Interest',
    f_msg:        'Message',
    f_submit:     'Send Inquiry',
    f_turnstile:  'Please complete the security verification.',
    f_msg_ph:     'Briefly describe your investment plan or question...',
    int_solar:    'Solar Power',
    int_wind:     'Wind Power',
    int_hydro:    'Hydropower',
    int_storage:  'Energy Storage',
    int_all:      'All sectors',
    suc_title:    'Sent successfully!',
    suc_desc:     'Thank you for reaching out. We will respond within 24 hours.',
    ft_tagline:   'Vietnam\'s leading renewable energy investor.',
    ft_nav:       'Navigation',
    ft_sectors_:  'Sectors',
    ft_legal_:    'Legal',
    ft_privacy:   'Privacy Policy',
    ft_terms:     'Terms of Use',
    ft_copy:      '© 2026 Bluesia Investment Group. All rights reserved.',
    addr_label:   'Address',
    addr_val:     'Bluesia Building, 123 Nguyen Hue, District 1, Ho Chi Minh City',
    email_label:  'Email',
    email_val:    'invest@bluesia.net',
    phone_label:  'Phone',
    phone_val:    '+84 28 3822 0000',
  }
};

// ── DOM Ready ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLangToggle();
  initScrollAnimations();
  initMobileNav();
  initHero();
  initCounters();
  initContactForm();
});

// ── Navbar ─────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.remove('transparent');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // close mobile nav
        const mobileNav = document.getElementById('nav-mobile');
        if (mobileNav) {
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });
}

// ── Mobile Nav ─────────────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  const navClose  = document.getElementById('nav-close');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    navClose?.focus();
  });

  const closeNav = () => {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navClose?.addEventListener('click', closeNav);

  mobileNav.addEventListener('click', e => {
    if (e.target === mobileNav) closeNav();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeNav();
  });
}

// ── Hero Init ──────────────────────────────────────────────────
function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  setTimeout(() => hero.classList.add('loaded'), 100);
}

// ── Language Toggle ────────────────────────────────────────────
function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    applyLang(currentLang);

    // Update toggle UI
    const vi = btn.querySelector('.lang-vi');
    const en = btn.querySelector('.lang-en');
    if (currentLang === 'vi') {
      vi?.classList.add('active');
      en?.classList.remove('active');
    } else {
      en?.classList.add('active');
      vi?.classList.remove('active');
    }
  });
}

function applyLang(lang) {
  const t = i18n[lang];
  const set = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  const setAttr = (id, attr, val) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, val);
  };

  set('nav-about',    t.nav_about);
  set('nav-sectors',  t.nav_sectors);
  set('nav-projects', t.nav_projects);
  set('nav-why',      t.nav_why);
  set('nav-contact',  t.nav_contact);
  set('nav-cta',      t.nav_cta);
  set('m-nav-about',    t.nav_about);
  set('m-nav-sectors',  t.nav_sectors);
  set('m-nav-projects', t.nav_projects);
  set('m-nav-why',      t.nav_why);
  set('m-nav-contact',  t.nav_contact);

  set('hero-badge',   t.hero_badge);
  set('hero-line1',   t.hero_line1);
  set('hero-line2',   t.hero_line2);
  set('hero-line3',   t.hero_line3);
  set('hero-sub',     t.hero_sub);
  set('hero-btn1',    t.hero_btn1);
  set('hero-btn2',    t.hero_btn2);

  set('stat1-label',  t.stat1_label);
  set('stat2-label',  t.stat2_label);
  set('stat3-label',  t.stat3_label);
  set('stat4-label',  t.stat4_label);

  set('about-eyebrow', t.about_eyebrow);
  set('about-title',   t.about_title);
  set('about-body',    t.about_body);
  set('val1-title',    t.val1_title);  set('val1-desc', t.val1_desc);
  set('val2-title',    t.val2_title);  set('val2-desc', t.val2_desc);
  set('val3-title',    t.val3_title);  set('val3-desc', t.val3_desc);
  set('about-badge-label', t.about_badge_label);

  set('sec-eyebrow',   t.sec_eyebrow);
  set('sec-title',     t.sec_title);
  set('sec-desc',      t.sec_desc);
  set('sol-name',      t.sol_name);    set('sol-sub',   t.sol_name_en);
  set('sol-desc',      t.sol_desc);    set('sol-cap',   t.sol_cap);
  set('wind-name',     t.wind_name);   set('wind-sub',  t.wind_name_en);
  set('wind-desc',     t.wind_desc);   set('wind-cap',  t.wind_cap);
  set('hydro-name',    t.hydro_name);  set('hydro-sub', t.hydro_name_en);
  set('hydro-desc',    t.hydro_desc);  set('hydro-cap', t.hydro_cap);
  set('store-name',    t.store_name);  set('store-sub', t.store_name_en);
  set('store-desc',    t.store_desc);  set('store-cap', t.store_cap);

  set('proj-eyebrow',  t.proj_eyebrow);
  set('proj-title',    t.proj_title);
  set('p1-loc',    t.p1_loc);  set('p1-name',  t.p1_name);  set('p1-desc', t.p1_desc);
  set('p1-cap',    t.p1_cap);  set('p1-co2',   t.p1_co2);
  set('p2-loc',    t.p2_loc);  set('p2-name',  t.p2_name);  set('p2-desc', t.p2_desc);
  set('p2-cap',    t.p2_cap);  set('p2-co2',   t.p2_co2);
  set('p3-loc',    t.p3_loc);  set('p3-name',  t.p3_name);  set('p3-desc', t.p3_desc);
  set('p3-cap',    t.p3_cap);  set('p3-co2',   t.p3_co2);
  set('spec-cap1', t.spec_cap); set('spec-cap2', t.spec_cap); set('spec-cap3', t.spec_cap);
  set('spec-co21', t.spec_co2); set('spec-co22', t.spec_co2); set('spec-co23', t.spec_co2);

  set('why-eyebrow', t.why_eyebrow);
  set('why-title',   t.why_title);
  set('w1-vi', t.w1_vi); set('w1-en', t.w1_en); set('w1-d', t.w1_d);
  set('w2-vi', t.w2_vi); set('w2-en', t.w2_en); set('w2-d', t.w2_d);
  set('w3-vi', t.w3_vi); set('w3-en', t.w3_en); set('w3-d', t.w3_d);
  set('w4-vi', t.w4_vi); set('w4-en', t.w4_en); set('w4-d', t.w4_d);

  set('cont-eyebrow', t.cont_eyebrow);
  set('cont-title',   t.cont_title);
  set('cont-body',    t.cont_body);
  set('form-title',   t.form_title);
  set('form-sub',     t.form_sub);
  set('f-name',       t.f_name);
  set('f-email',      t.f_email);
  set('f-company',    t.f_company);
  set('f-interest',   t.f_interest);
  set('f-msg-label',  t.f_msg);
  set('f-submit',     t.f_submit);
  set('suc-title',    t.suc_title);
  set('suc-desc',     t.suc_desc);
  setAttr('f-msg-input', 'placeholder', t.f_msg_ph);
  set('int-solar',   t.int_solar);
  set('int-wind',    t.int_wind);
  set('int-hydro',   t.int_hydro);
  set('int-storage', t.int_storage);
  set('int-all',     t.int_all);

  set('ft-tagline', t.ft_tagline);
  set('ft-nav',     t.ft_nav);
  set('ft-sectors', t.ft_sectors_);
  set('ft-legal',   t.ft_legal_);
  set('ft-privacy', t.ft_privacy);
  set('ft-terms',   t.ft_terms);
  set('ft-copy',    t.ft_copy);
  set('addr-label', t.addr_label); set('addr-val', t.addr_val);
  set('email-label', t.email_label); set('email-val', t.email_val);
  set('phone-label', t.phone_label); set('phone-val', t.phone_val);

  document.documentElement.lang = lang;
}

// ── Scroll Animations ─────────────────────────────────────────
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ── Animated Counters ─────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const prefix   = el.dataset.prefix || '';
  const duration = 1800;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = prefix + target + suffix;
    return;
  }

  const start = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = Math.round(eased * target);
    el.textContent = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ── Contact Form ──────────────────────────────────────────────
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('#f-submit');
    const t   = i18n[currentLang];

    // Simple validation
    const name    = form.querySelector('#input-name')?.value.trim();
    const email   = form.querySelector('#input-email')?.value.trim();
    const company = form.querySelector('#input-company')?.value.trim();

    if (!name || !email || !company) {
      highlightEmpty(form);
      return;
    }

    if (!isValidEmail(email)) {
      const emailInput = form.querySelector('#input-email');
      if (emailInput) shakeInput(emailInput);
      return;
    }

    const turnstileToken = new FormData(form).get('cf-turnstile-response');
    if (!turnstileToken) {
      const status = form.querySelector('#form-status');
      if (status) status.textContent = t.f_turnstile;
      return;
    }

    const status = form.querySelector('#form-status');
    if (status) status.textContent = '';

    // Simulate submission
    if (btn) {
      btn.disabled = true;
      btn.querySelector('span').textContent = '...';
    }

    await delay(1200);

    form.style.display = 'none';
    if (success) {
      success.removeAttribute('hidden');
      success.classList.add('show');
    }
  });
}

function highlightEmpty(form) {
  ['#input-name','#input-email','#input-company'].forEach(sel => {
    const el = form.querySelector(sel);
    if (el && !el.value.trim()) {
      el.style.borderColor = 'rgba(200,80,60,0.6)';
      el.style.boxShadow   = '0 0 0 3px rgba(200,80,60,0.08)';
      el.addEventListener('input', () => {
        el.style.borderColor = '';
        el.style.boxShadow   = '';
      }, { once: true });
    }
  });
}

function shakeInput(el) {
  el.style.animation = 'none';
  el.style.borderColor = 'rgba(200,80,60,0.6)';
  setTimeout(() => { el.style.borderColor = ''; }, 1500);
}

const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const delay = ms => new Promise(res => setTimeout(res, ms));
