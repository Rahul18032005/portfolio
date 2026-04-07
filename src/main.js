import './style.css';

// ═══════════════════════════════════════════════════════
// STORAGE KEYS
// ═══════════════════════════════════════════════════════
const SK = {
  PROFILE_IMG: 'rt_profile_img',
  RESUME: 'rt_resume_data',
  RESUME_NAME: 'rt_resume_name',
  EMAIL: 'rt_email',
  PHONE: 'rt_phone',
  LINKEDIN: 'rt_linkedin',
  GITHUB: 'rt_github',
};

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
let resumeData = null;

// ═══════════════════════════════════════════════════════
// PROJECT DATA
// ═══════════════════════════════════════════════════════
const projects = [
  {
    id: 'p1',
    title: 'Smart Vehicle Inspection and Mapping System',
    category: 'web',
    emoji: '🚗',
    desc: 'A smart inspection platform developed to inspect different vehicle models using mapped visual templates and Excel-based inspection data. The system identifies part conditions as OK or NG and displays them with clear visual indicators on the vehicle layout. It supports master setup, process inspection, and dashboard-based monitoring for efficient inspection workflows.',
    impact: '↑ Efficient inspection workflows with clear visual indicators',
    tags: ['React.js', 'FastAPI/Node.js', 'PostgreSQL', 'Excel Integration'],
    github: 'https://github.com/Rahul18032005/Smart-Vehicle-Inspection-and-Mapping-System.git',
    demo: null,
  },
  {
    id: 'p2',
    title: 'ScanTrack-AI',
    category: 'app',
    emoji: '📸',
    desc: 'An AI-enabled smart tracking system designed to scan barcode and QR code data, verify records from the database, and automatically create new entries when data is unavailable. The system also supports structured data storage and image-assisted verification for better tracking accuracy and record management.',
    impact: '↑ Better tracking accuracy and record management',
    tags: ['React.js', 'PostgreSQL', 'Scanner Integration', 'AI/Computer Vision'],
    github: 'https://github.com/Rahul18032005/ScanTrack-AI.git',
    demo: null,
  },
  {
    id: 'p3',
    title: 'Home Appliances E-Commerce Website',
    category: 'web',
    emoji: '🛒',
    desc: 'A full-stack responsive e-commerce web application developed for managing home appliance products, authentication, secure payments, and order tracking. The platform provides a modern shopping experience with real-time product and user management features.',
    impact: '↑ Modern shopping experience with real-time management',
    tags: ['React.js', 'MySQL', 'Firebase', 'REST APIs'],
    github: 'https://github.com',
    demo: null,
  },
  {
    id: 'p4',
    title: 'Skill Posting Platform (SkillBoard)',
    category: 'web',
    emoji: '💼',
    desc: 'An interactive web application developed for posting, browsing, and managing user skills dynamically. The platform supports secure authentication and real-time data handling using Firebase and Firestore.',
    impact: '↑ Dynamic skill matching and interactive profiles',
    tags: ['React.js', 'Firebase', 'Firestore'],
    github: 'https://github.com',
    demo: null,
  },
  {
    id: 'p5',
    title: 'Automated PDF to Excel Data Converter',
    category: 'app',
    emoji: '📄',
    desc: 'A document processing solution that extracts structured information from PDF files and converts it into organized Excel sheets. This helps reduce manual work, improve speed, and ensure better reporting accuracy.',
    impact: '↑ Reduced manual work and improved reporting accuracy',
    tags: ['Python', 'React.js', 'PDF Parsing', 'Excel Processing'],
    github: 'https://github.com/Rahul18032005/excel-pdf.git',
    demo: null,
  },
  {
    id: 'p6',
    title: 'Organization Chart Management System',
    category: 'web',
    emoji: '🏢',
    desc: 'A web-based system developed to create, manage, and visualize hierarchical organization structures. It helps users maintain employee reporting relationships and display department structures in a clean and interactive way.',
    impact: '↑ Interactive visualization of hierarchical structures',
    tags: ['React.js', 'JavaScript', 'Firebase/MySQL'],
    github: 'https://github.com/Rahul18032005/org-chart.git',
    demo: null,
  },
  {
    id: 'p7',
    title: 'Weather App',
    category: 'web',
    emoji: '🌦️',
    desc: 'A responsive weather application that fetches and displays real-time weather information for any city entered by the user. The application focuses on simple UI, speed, and live data presentation.',
    impact: '↑ Real-time live data presentation',
    tags: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Firebase'],
    github: 'https://github.com',
    demo: null,
  },
];

// ═══════════════════════════════════════════════════════
// STORAGE HELPERS
// ═══════════════════════════════════════════════════════
function store(key, value) {
  try { localStorage.setItem(key, value); return true; }
  catch { showToast('Storage full – file may be too large', 'error'); return false; }
}
const retrieve = (key) => localStorage.getItem(key);
const forget = (key) => localStorage.removeItem(key);

// ═══════════════════════════════════════════════════════
// RENDER PROJECTS
// ═══════════════════════════════════════════════════════
function renderProjects(filter = 'all') {
  const list = document.getElementById('project-list');
  if (!list) return;
  list.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  filtered.forEach(p => {
    const catLabel = { web: 'Web', iot: 'IoT', app: 'Application' }[p.category];
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.dataset.category = p.category;
    card.id = p.id;
    card.innerHTML = `
      <div class="project-thumb" data-emoji="${p.emoji}">
        <span class="project-cat-badge cat-${p.category}">${catLabel}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <p class="project-impact">${p.impact}</p>
        <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            GitHub
          </a>
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="project-link primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
            Live Demo</a>` : ''}
        </div>
      </div>`;
    list.appendChild(card);
  });
  setTimeout(() => {
    document.querySelectorAll('.project-card.reveal').forEach(el => {
      if (isInViewport(el)) el.classList.add('visible');
    });
    observeRevealElements();
  }, 50);
}

function initProjectFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
}

// ═══════════════════════════════════════════════════════
// TYPED TEXT
// ═══════════════════════════════════════════════════════
function initTypedText() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrases = ['CS Engineering Student', 'Frontend Developer', 'Full Stack Developer', 'Problem Solver', 'Software Developer'];
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const cur = phrases[pi];
    el.textContent = cur.substring(0, deleting ? ci - 1 : ci + 1);
    deleting ? ci-- : ci++;
    let delay = deleting ? 60 : 100;
    if (!deleting && ci === cur.length) { delay = 2200; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
    setTimeout(type, delay);
  }
  type();
}

// ═══════════════════════════════════════════════════════
// NAVIGATION – smooth scroll + active state + mobile
// ═══════════════════════════════════════════════════════
function initNav() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky + active link on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  }, { passive: true });

  // Smooth scroll for ALL anchor links (nav, hero buttons, footer)
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('mobile-nav')?.classList.remove('open');
    }
  });

  // Mobile toggle
  document.getElementById('mobile-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-nav')?.classList.toggle('open');
  });
}

// ═══════════════════════════════════════════════════════
// PROFILE IMAGE
// ═══════════════════════════════════════════════════════
function initProfileImage() {
  const img = document.getElementById('profile-img');
  if (!img) return;
  const saved = retrieve(SK.PROFILE_IMG);
  if (saved) img.src = saved;

  // Build hover overlay (shown only in edit-mode via CSS)
  const wrapper = img.closest('.image-wrapper');
  if (!wrapper) return;
  const overlay = document.createElement('div');
  overlay.className = 'img-edit-overlay';
  overlay.innerHTML = `
    <label class="img-overlay-btn" for="photo-file-input" title="Change Photo">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
      Change
    </label>
    <button class="img-overlay-btn danger" id="remove-photo-btn" title="Remove Photo">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      Remove
    </button>
    <input type="file" id="photo-file-input" accept="image/*" hidden />`;
  wrapper.appendChild(overlay);
  wrapper.style.position = 'relative';

  document.getElementById('photo-file-input')?.addEventListener('change', e => {
    if (e.target.files[0]) uploadPhoto(e.target.files[0]);
  });
  document.getElementById('remove-photo-btn')?.addEventListener('click', () => {
    forget(SK.PROFILE_IMG);
    img.src = '/avatar.webp';
    showToast('Profile photo removed');
  });
}

function uploadPhoto(file) {
  if (!file.type.startsWith('image/')) { showToast('Please select an image file', 'error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    if (store(SK.PROFILE_IMG, e.target.result)) {
      document.getElementById('profile-img').src = e.target.result;
      showToast('✓ Profile photo updated!');
    }
  };
  reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════════════════
// RESUME
// ═══════════════════════════════════════════════════════
function initResume() {
  const saved = retrieve(SK.RESUME);
  const name = retrieve(SK.RESUME_NAME);
  if (saved) resumeData = { base64: saved, name: name || 'Resume.pdf' };

  document.getElementById('hero-download-resume')?.addEventListener('click', e => {
    e.preventDefault();
    if (!resumeData) {
      showToast('No resume uploaded yet. Open "Edit Portfolio" to upload.', 'info');
      return;
    }
    const a = document.createElement('a');
    a.href = resumeData.base64;
    a.download = resumeData.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Downloading ${resumeData.name}…`);
  });
}

function uploadResume(file) {
  if (!file.name.toLowerCase().endsWith('.pdf')) { showToast('Please upload a PDF file', 'error'); return; }
  if (file.size > 4 * 1024 * 1024) { showToast('File too large – max 4 MB', 'error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    if (store(SK.RESUME, e.target.result) && store(SK.RESUME_NAME, file.name)) {
      resumeData = { base64: e.target.result, name: file.name };
      syncResumeStatus();
      showToast(`✓ Resume "${file.name}" uploaded!`);
    }
  };
  reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════════════════
// SOCIAL LINKS
// ═══════════════════════════════════════════════════════
function initSocialLinks() {
  applySocialLinks({
    email: retrieve(SK.EMAIL) || 'rahul18032005@gmail.com',
    phone: retrieve(SK.PHONE) || '+91 9361031944',
    linkedin: retrieve(SK.LINKEDIN) || 'www.linkedin.com/in/rahul-t-ba35432a1',
    github: retrieve(SK.GITHUB) || 'https://github.com/Rahul18032005',
  });
}

function applySocialLinks({ email, phone, linkedin, github }) {
  const set = (id, href, text) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = href;
    const span = el.querySelector('span');
    if (span && text) span.textContent = text;
  };
  set('hero-linkedin', linkedin);
  set('hero-github', github);
  set('hero-email', `mailto:${email}`);
  set('contact-email', `mailto:${email}`, email);
  set('contact-phone', `tel:${phone.replace(/\s/g, '')}`, phone);
  set('contact-linkedin', linkedin, linkedin.replace('https://', ''));
  set('contact-github', github, github.replace('https://', ''));
  set('footer-linkedin', linkedin);
  set('footer-github', github);
  set('footer-email', `mailto:${email}`);
}

// ═══════════════════════════════════════════════════════
// EDIT MODE – floating button + right-side settings panel
// ═══════════════════════════════════════════════════════
function buildEditUI() {
  /* ── Floating button ── */
  const btn = document.createElement('button');
  btn.id = 'edit-fab';
  btn.className = 'edit-fab';
  btn.setAttribute('aria-label', 'Edit Portfolio');
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg><span>Edit Portfolio</span>`;
  btn.addEventListener('click', () => togglePanel());
  document.body.appendChild(btn);

  /* ── Settings panel ── */
  const panel = document.createElement('aside');
  panel.id = 'settings-panel';
  panel.className = 'settings-panel';
  panel.setAttribute('aria-label', 'Portfolio editor');
  panel.innerHTML = `
    <div class="sp-head">
      <span class="sp-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        Edit Portfolio
      </span>
      <button id="sp-close" class="sp-close-btn" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="sp-body">

      <!-- PHOTO -->
      <div class="sp-section">
        <p class="sp-section-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Profile Photo
        </p>
        <p class="sp-hint">Hover over your photo and click <strong>Change</strong> when editing is active.</p>
        <div class="sp-row">
          <label class="sp-upload-btn" for="sp-photo-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Upload Photo
          </label>
          <input type="file" id="sp-photo-input" accept="image/*" hidden />
          <button class="sp-danger-btn" id="sp-remove-photo">Remove</button>
        </div>
      </div>

      <!-- RESUME -->
      <div class="sp-section">
        <p class="sp-section-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Resume (PDF only · max 4 MB)
        </p>
        <div class="sp-resume-status" id="sp-resume-status">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>No resume uploaded</span>
        </div>
        <div class="sp-row">
          <label class="sp-upload-btn" for="sp-resume-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Upload Resume
          </label>
          <input type="file" id="sp-resume-input" accept=".pdf,application/pdf" hidden />
          <button class="sp-danger-btn" id="sp-remove-resume" style="display:none">Remove</button>
        </div>
      </div>

      <!-- CONTACT INFO -->
      <div class="sp-section">
        <p class="sp-section-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Contact Information
        </p>
        <div class="sp-inputs">
          <div class="sp-field"><label for="sp-email">Email</label><input type="email" id="sp-email" placeholder="your@email.com" /></div>
          <div class="sp-field"><label for="sp-phone">Phone</label><input type="tel" id="sp-phone" placeholder="+91 98765 43210" /></div>
          <div class="sp-field"><label for="sp-linkedin">LinkedIn URL</label><input type="url" id="sp-linkedin" placeholder="https://linkedin.com/in/..." /></div>
          <div class="sp-field"><label for="sp-github">GitHub URL</label><input type="url" id="sp-github" placeholder="https://github.com/..." /></div>
        </div>
        <button class="sp-save-btn" id="sp-save-links">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save Contact Info
        </button>
      </div>
    </div>`;
  document.body.appendChild(panel);

  // ── Wire events ──
  document.getElementById('sp-close').addEventListener('click', () => closePanel());

  // Photo
  document.getElementById('sp-photo-input').addEventListener('change', e => {
    if (e.target.files[0]) uploadPhoto(e.target.files[0]);
  });
  document.getElementById('sp-remove-photo').addEventListener('click', () => {
    forget(SK.PROFILE_IMG);
    const img = document.getElementById('profile-img');
    if (img) img.src = '/avatar.webp';
    showToast('Profile photo removed');
  });

  // Resume
  document.getElementById('sp-resume-input').addEventListener('change', e => {
    if (e.target.files[0]) uploadResume(e.target.files[0]);
  });
  document.getElementById('sp-remove-resume').addEventListener('click', () => {
    forget(SK.RESUME); forget(SK.RESUME_NAME);
    resumeData = null;
    syncResumeStatus();
    showToast('Resume removed');
  });

  // Save links
  document.getElementById('sp-save-links').addEventListener('click', () => {
    const data = {
      email: document.getElementById('sp-email').value.trim(),
      phone: document.getElementById('sp-phone').value.trim(),
      linkedin: document.getElementById('sp-linkedin').value.trim(),
      github: document.getElementById('sp-github').value.trim(),
    };
    if (data.email) store(SK.EMAIL, data.email);
    if (data.phone) store(SK.PHONE, data.phone);
    if (data.linkedin) store(SK.LINKEDIN, data.linkedin);
    if (data.github) store(SK.GITHUB, data.github);
    applySocialLinks(data);
    showToast('✓ Contact info saved!');
  });

  // Pre-fill saved values
  document.getElementById('sp-email').value = retrieve(SK.EMAIL) || '';
  document.getElementById('sp-phone').value = retrieve(SK.PHONE) || '';
  document.getElementById('sp-linkedin').value = retrieve(SK.LINKEDIN) || '';
  document.getElementById('sp-github').value = retrieve(SK.GITHUB) || '';

  // Close when clicking outside panel
  document.addEventListener('click', e => {
    const panel = document.getElementById('settings-panel');
    const fab = document.getElementById('edit-fab');
    if (panel?.classList.contains('open') && !panel.contains(e.target) && !fab?.contains(e.target)) {
      closePanel();
    }
  });
}

function togglePanel() {
  document.getElementById('settings-panel')?.classList.contains('open') ? closePanel() : openPanel();
}
function openPanel() {
  document.getElementById('settings-panel')?.classList.add('open');
  document.getElementById('edit-fab')?.classList.add('active');
  document.body.classList.add('edit-mode');
  syncResumeStatus();
}
function closePanel() {
  document.getElementById('settings-panel')?.classList.remove('open');
  document.getElementById('edit-fab')?.classList.remove('active');
  document.body.classList.remove('edit-mode');
}

function syncResumeStatus() {
  const el = document.getElementById('sp-resume-status');
  const rem = document.getElementById('sp-remove-resume');
  if (!el) return;
  if (resumeData) {
    el.className = 'sp-resume-status has-resume';
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>${resumeData.name}</span>`;
    if (rem) rem.style.display = 'inline-flex';
  } else {
    el.className = 'sp-resume-status no-resume';
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>No resume uploaded</span>`;
    if (rem) rem.style.display = 'none';
  }
}

// ═══════════════════════════════════════════════════════
// TOAST NOTIFICATIONS
// ═══════════════════════════════════════════════════════
function showToast(message, type = 'success') {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || '✓'}</span><span>${message}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3500);
}

// ═══════════════════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════════════════
function isInViewport(el) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.9 && r.bottom > 0;
}
function observeRevealElements() {
  const els = document.querySelectorAll('.reveal:not(.visible), .reveal-right:not(.visible)');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => { if (isInViewport(el)) el.classList.add('visible'); });
  }
}

// ═══════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();
    if (!name || !email || !message) { showToast('Please fill in all required fields', 'error'); return; }
    const btn = form.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.innerHTML = orig;
      btn.disabled = false;
      document.getElementById('form-success')?.classList.add('show');
      showToast("Message sent! I'll get back to you soon.");
      setTimeout(() => document.getElementById('form-success')?.classList.remove('show'), 5000);
    }, 1200);
  });
}

// ═══════════════════════════════════════════════════════
// LUCIDE ICONS
// ═══════════════════════════════════════════════════════
function initLucide() {
  const tryInit = () => window.lucide?.createIcons();
  tryInit();
  setTimeout(tryInit, 500);
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  initProjectFilter();
  initTypedText();
  initNav();
  initProfileImage();
  initResume();
  initSocialLinks();
  buildEditUI();
  initContactForm();
  observeRevealElements();
  initLucide();
  window.addEventListener('scroll', observeRevealElements, { passive: true });
  setTimeout(initLucide, 300);
});
