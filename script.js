// Nav background after scrolling past the hero top
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');
const setMenu = open => {
  links.classList.toggle('open', open);
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
};
toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Cause list date = today, like a real court list
document.getElementById('listDate').textContent =
  new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

// Course filter
const filters = document.querySelectorAll('.filter');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => { b.classList.toggle('is-on', b === btn); b.setAttribute('aria-pressed', b === btn); });
  const f = btn.dataset.filter;
  document.querySelectorAll('.row[data-cat]').forEach(r => { r.hidden = f !== 'all' && r.dataset.cat !== f; });
}));

// "Enquire" pre-selects the course in the form
const courseSelect = document.getElementById('courseSelect');
document.querySelectorAll('.enquire').forEach(a => a.addEventListener('click', () => {
  courseSelect.value = a.dataset.course;
}));

// Scroll reveal
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.section h2, .row, .grounds li, .person, .quotes figure, .form')
  .forEach(el => { el.classList.add('reveal'); io.observe(el); });

// Enquiry form (demo only — no backend yet)
const form = document.getElementById('enquiryForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('input, select')];
  fields.forEach(f => f.classList.toggle('invalid', !f.checkValidity()));
  const bad = fields.find(f => !f.checkValidity());
  if (bad) {
    msg.className = 'form-msg err';
    msg.textContent = bad.name === 'phone' ? 'Enter a 10-digit mobile number.'
      : bad.name === 'course' ? 'Choose a course.' : 'Enter your full name.';
    bad.focus();
    return;
  }
  msg.className = 'form-msg ok';
  msg.textContent = `Demo class booked, ${form.name.value.trim()}. A counsellor will call you within 24 hours.`;
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
