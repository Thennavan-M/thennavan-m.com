// Page markup for the whole site.
//
// Each page is a function that returns HTML built from the data in
// src/data/site.ts. The Astro pages in src/pages/ wrap these in the shared
// layout. You should not need to edit this file to change content.

import * as S from '../data/site.ts';
import type { Article, Figure } from '../data/site.ts';
import { buildPlot } from './hysteresis.ts';

/** Turns a site path like '/research/' into an href. Astro uses paths as-is. */
export type Link = (path: string) => string;
const same: Link = (p) => p;

export const esc = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const { person, profiles } = S;
export const fullName = `${person.honorific} ${person.name}`;
const doiUrl = (doi: string) => `https://doi.org/${doi}`;
const ext = (href: string, label: string, cls = '') =>
  `<a${cls ? ` class="${cls}"` : ''} href="${esc(href)}" rel="noopener">${label}</a>`;

export const nav = [
  { href: '/', label: 'About' },
  { href: '/research/', label: 'Research' },
  { href: '/projects/', label: 'Projects' },
  { href: '/publications/', label: 'Publications' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/cv/', label: 'CV' },
  { href: '/contact/', label: 'Contact' },
];

// ---------------------------------------------------------------- icons

const svg = (body: string, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const ICON = {
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
  out: svg('<path d="M14 4h6v6"/><path d="M20 4 10.5 13.5"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>'),
  download: svg('<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>'),
  phone: svg('<path d="M5 4h3.5l2 5-2.4 1.5a11 11 0 0 0 5.4 5.4L15 13.5l5 2V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  pin: svg('<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  zoom: svg('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/><path d="M11 8.5v5M8.5 11h5"/>'),
};

// ---------------------------------------------------------------- chrome

export function headerHtml(path: string, link: Link = same) {
  const current = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));
  const items = nav
    .map((n) => `<li><a href="${esc(link(n.href))}"${current(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`)
    .join('');
  return `<header class="site-header"><div class="wrap header-inner">
<a class="site-name" href="${esc(link('/'))}">${esc(fullName)}</a>
<nav class="site-nav" aria-label="Main"><ul>${items}</ul></nav>
<details class="menu"><summary>Menu</summary><nav class="menu-panel" aria-label="Main"><ul>${items}</ul></nav></details>
</div></header>`;
}

// The profile links live on the About page and the Publications page, and
// Contact is in the menu, so the footer carries only the name and affiliation.
export function footerHtml(_link: Link = same) {
  // "Last updated" is the day the site was last published, in Indian time,
  // written as DD.MM.YYYY. It changes by itself with every upload.
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Kolkata' })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  const updated = `<time datetime="${parts.year}-${parts.month}-${parts.day}">${parts.day}.${parts.month}.${parts.year}</time>`;
  // The page-view count is filled in by uiScript; it stays hidden until GoatCounter answers.
  const views = S.goatcounter
    ? `<span class="views" data-views="https://${esc(S.goatcounter)}.goatcounter.com/counter/TOTAL.json" hidden><span class="sep" aria-hidden="true">·</span>Page views: <span class="views-n"></span></span>`
    : '';
  const motto = person.motto
    ? `<span class="foot-right motto" lang="${esc(person.motto.lang)}">${esc(person.motto.text)}</span>`
    : '<span class="foot-right"></span>';
  return `<footer class="site-footer"><div class="wrap footer-inner">
<div><p class="footer-name">${esc(fullName)}</p><p>${esc(person.department)}, ${esc(person.institution)}</p></div>
<div class="footer-small"><span class="foot-left">© ${parts.year} ${esc(fullName)}.</span><span class="foot-mid">Last updated ${updated}${views}</span>${motto}</div>
</div></footer>`;
}

// Copy buttons, the one-line specialisations, the figure viewer and the page-view count.
export const uiScript = `document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var t=b.getAttribute('data-copy');var label=b.textContent;var done=function(){b.textContent='Copied';setTimeout(function(){b.textContent=label;},1600);};var el=document.getElementById(b.getAttribute('data-target')||'');var sel=function(){if(!el)return;var s=window.getSelection();var r=document.createRange();r.selectNodeContents(el);s.removeAllRanges();s.addRange(r);};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,sel);}else{sel();}});});
(function(){var ul=document.querySelector('.profile-fields');if(!ul)return;function fit(){ul.style.fontSize='';ul.classList.remove('wrap');var card=ul.parentElement;var twoCol=getComputedStyle(card.parentElement).gridTemplateColumns.trim().split(' ').filter(Boolean).length>1;var side=twoCol?Math.max(0,Math.min(40,card.getBoundingClientRect().left-12)):0;var allowed=card.clientWidth+2*side;var size=parseFloat(getComputedStyle(ul).fontSize);var n=0;while(ul.scrollWidth>allowed&&size-0.5>=10.5&&n<24){size-=0.5;ul.style.fontSize=size+'px';n++;}if(ul.scrollWidth>allowed){ul.style.fontSize='';ul.classList.add('wrap');}}fit();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);window.addEventListener('resize',fit);})();
(function(){var lb=document.getElementById('lightbox');if(!lb||typeof lb.showModal!=='function')return;var img=lb.querySelector('img');var cap=lb.querySelector('.lb-caption');document.querySelectorAll('.fig-link').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();img.src=a.getAttribute('href');var thumb=a.querySelector('img');img.alt=thumb?thumb.alt:'';cap.textContent=a.getAttribute('data-caption')||'';lb.showModal();});});lb.addEventListener('click',function(e){if(e.target===lb)lb.close();});})();
(function(){var v=document.querySelector('[data-views]');if(!v||!window.fetch)return;fetch(v.getAttribute('data-views')).then(function(r){return r.ok?r.json():null;}).then(function(d){if(d&&d.count){v.querySelector('.views-n').textContent=d.count;v.hidden=false;}}).catch(function(){});})();`;

// ---------------------------------------------------------------- pieces

function avatarHtml(link: Link) {
  return person.photo
    ? `<img src="${esc(link(person.photo))}" alt="Portrait of ${esc(fullName)}" width="480" height="480">`
    : `<span class="initials" aria-hidden="true">${esc(person.initials)}</span>`;
}

export function plotHtml() {
  const p = buildPlot();
  const { frame, loops, note, origin } = p;
  return `<figure class="plot"><div class="plot-sheet">
<svg viewBox="0 0 ${frame.w} ${frame.h}" role="img" aria-labelledby="plot-title plot-desc">
<title id="plot-title">Force–displacement loops of a hysteretic damper</title>
<desc id="plot-desc">Three loops for displacement amplitudes of 10, 20 and 30 millimetres. Force reaches about 52 kilonewtons at 30 millimetres. The area inside the largest loop is shaded.</desc>
<path class="g-minor" d="${p.gridMinor}"></path>
<path class="g-major" d="${p.gridMajor}"></path>
<path class="loop-area" d="${loops[2]}"></path>
<path class="axis" d="${p.xAxis}"></path>
<path class="axis" d="${p.yAxis}"></path>
${p.xTicks.map((t) => `<text class="tick" x="${t.x}" y="${t.y + 16}" text-anchor="middle">${t.v}</text>`).join('')}
${p.yTicks.map((t) => `<text class="tick" x="${t.x - 6}" y="${t.y + 4}" text-anchor="end">${t.v}</text>`).join('')}
<text class="axis-title" x="${frame.right}" y="${frame.h - 9}" text-anchor="end">Displacement (mm)</text>
<text class="axis-title" x="${origin.x + 8}" y="${frame.top - 12}">Force (kN)</text>
<path class="loop" d="${loops[0]}"></path>
<path class="loop" d="${loops[1]}"></path>
<path class="loop loop-outer" d="${loops[2]}"></path>
<path class="leader" d="M${note.x + 6} ${note.startY}L${note.tipX} ${note.tipY}"></path>
<circle class="leader-dot" cx="${note.tipX}" cy="${note.tipY}" r="3"></circle>
<text class="note" x="${note.x}" y="${note.y}"><tspan x="${note.x}">Energy dissipated</tspan><tspan x="${note.x}" dy="1.25em">per cycle</tspan></text>
</svg></div>
<figcaption>Hysteresis loops of a damper cycled to 10, 20 and 30 mm, from a Bouc–Wen model. The shaded area is the energy dissipated in one cycle.</figcaption>
</figure>`;
}

function figureHtml(f: Figure, link: Link) {
  const src = esc(link(f.src));
  return `<figure class="fig">
<a class="fig-link" href="${src}" data-caption="${esc(f.caption)}" target="_blank" rel="noopener">
<img src="${src}" alt="${esc(f.alt)}" width="${f.width}" height="${f.height}" loading="lazy">
<span class="fig-zoom">${ICON.zoom}Enlarge</span>
</a>
<figcaption>${esc(f.caption)}</figcaption>
</figure>`;
}

const lightboxHtml = `<dialog class="lightbox" id="lightbox" aria-label="Figure">
<form method="dialog"><button class="lb-close" type="submit">Close</button></form>
<img alt="">
<p class="lb-caption"></p>
</dialog>`;

const pageHead = (title: string, lede = '', extra = '') =>
  `<header class="page-head"><div class="wrap"><h1>${esc(title)}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}${extra}</div></header>`;

const label = (text: string) => `<span class="label">${esc(text)}</span>`;

const highlight = (authors: string) => esc(authors).replace('Thennavan, M.', '<strong>Thennavan, M.</strong>');

function citation(a: Article) {
  const href = a.doi ? doiUrl(a.doi) : a.url;
  const title = href ? ext(href, esc(a.title), 'pub-title') : `<span class="pub-title">${esc(a.title)}</span>`;
  // Skip the trailing year when the details already give the date.
  const year = a.details && a.details.includes(String(a.year)) ? '' : `, ${a.year}`;
  return `${title}<span class="pub-authors">${highlight(a.authors)}</span><span class="pub-venue"><em>${esc(a.venue)}</em>${a.details ? `, ${esc(a.details)}` : ''}${year}</span>`;
}

// ---------------------------------------------------------------- pages

function home(link: Link) {
  const linksHtml = profiles.map((p) => `<li>${ext(p.href, esc(p.label))}</li>`).join('');
  const interests = S.areas
    .map((t) => `<li><a href="${esc(link('/research/'))}#${esc(t.id)}">${esc(t.title)}</a></li>`)
    .join('');
  // Education reads left to right as a timeline: year, then degree, field and place.
  const education = S.aboutEducation
    .map((e) => {
      const [degree, ...rest] = e.title.split(', ');
      const field = rest.join(', ');
      return `<li><span class="edu-year">${esc(e.year)}</span><div class="edu-body"><strong class="edu-degree">${esc(degree)}</strong>${field ? `<span class="edu-field">${esc(field)}</span>` : ''}<span class="edu-org">${esc(e.org)}</span></div></li>`;
    })
    .join('');
  const news = S.news.map((n) => `<li><span class="date">${esc(n.date)}</span><p>${esc(n.text)}</p></li>`).join('');
  const granted = S.patents.find((p) => p.status === 'Granted');
  const selected = [
    ...S.journalArticles.map((a) => `<li>${citation(a)}</li>`),
    granted
      ? `<li><span class="pub-title">${esc(granted.title)}</span><span class="pub-venue">${esc(granted.number)}, granted ${granted.year}</span></li>`
      : '',
  ].join('');
  const projects = S.currentProjects
    .map((p) => `<li>${label(p.status)}<p class="proj-title">${esc(p.title)}</p><p class="proj-meta">${esc(p.where)}, since ${esc(p.since)}</p></li>`)
    .join('');

  return `<section class="profile wrap" aria-label="Profile">
<div class="profile-card">
<div class="avatar">${avatarHtml(link)}</div>
<h1 class="profile-name">${esc(fullName)}</h1>
<p class="profile-role">${esc(person.role)}</p>
<p class="profile-org">${esc(person.department)}<br>${esc(person.institution)}</p>
<ul class="profile-fields" aria-label="Specialisation">${S.specialisations.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
<div class="profile-actions">
<a class="btn btn-block" href="mailto:${esc(person.email)}">${ICON.mail}Email me</a>
<ul class="profile-links">${linksHtml}</ul>
${person.cv ? `<a class="btn btn-outline btn-block" href="${esc(link(person.cv))}">${ICON.download}Download CV</a>` : ''}
</div>
</div>
<div class="profile-main">
<h2>Biography</h2>
<div class="prose bio">${person.bio.map((b) => `<p>${esc(b)}</p>`).join('')}</div>
</div>
<div class="facts">
<div class="facts-interests"><h3>Research interests</h3><ul class="interests">${interests}</ul></div>
<div class="facts-education"><h3>Education</h3><ol class="edu-line">${education}</ol></div>
</div>
</section>

<section class="band"><div class="wrap two-col">
<div><h2 class="section-title">Recent news</h2><ul class="news">${news}</ul></div>
<div><h2 class="section-title">Selected publications</h2><ul class="pubs">${selected}</ul><a class="more" href="${esc(link('/publications/'))}">All publications and patents</a></div>
</div></section>

<section class="wrap block"><div class="section-head"><h2 class="section-title">Current projects</h2><a class="more" href="${esc(link('/projects/'))}">All projects</a></div>
<ul class="proj-grid">${projects}</ul>
</section>`;
}

function research(link: Link) {
  const areas = S.areas
    .map((a) => `<li id="${esc(a.id)}"><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></li>`)
    .join('');
  const work = S.experiments
    .map((x, i) => {
      const figs = x.figures.map((f) => figureHtml(f, link)).join('');
      const visuals = x.plot ? `<div class="exp-plot">${plotHtml()}</div>` : '';
      return `<article class="exp" id="${esc(x.id)}" aria-labelledby="${esc(x.id)}-h">
<div class="exp-body${x.plot ? ' with-plot' : ''}">
<div class="exp-text">
<h3 id="${esc(x.id)}-h"><span class="exp-num">${i + 1}.</span> ${esc(x.title)}</h3>
<p class="exp-place">${esc(x.place)}, ${esc(x.period)}</p>
<p>${esc(x.text)}</p>
${x.outcomes.length ? `<ul class="outcomes">${x.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}
${x.funding ? `<dl class="exp-facts"><div><dt>Funding</dt><dd>${esc(x.funding)}</dd></div></dl>` : ''}
</div>
${visuals}
</div>
${figs ? `<div class="figs${x.figures.length > 1 ? ' figs-multi' : ''}">${figs}</div>` : ''}
</article>`;
    })
    .join('');
  const q = S.researchQuote;
  const quote = q?.text
    ? `<figure class="quote"><blockquote><p>“${esc(q.text)}”</p></blockquote>${q.by ? `<figcaption>— ${esc(q.by)}</figcaption>` : ''}</figure>`
    : '';
  return `${pageHead('Research', esc(S.researchIntro), quote)}
<section class="wrap block" aria-labelledby="areas-h"><h2 class="section-title" id="areas-h">Research areas</h2><ul class="areas">${areas}</ul></section>
<section class="wrap block" aria-labelledby="work-h"><h2 class="section-title" id="work-h">Research and experimental work</h2>${work}</section>
<section class="wrap block two-col" aria-label="Methods, tools and design codes">
<div><h2 class="section-title">Methods and tools</h2><ul class="tags">${S.methods.map((m) => `<li>${esc(m)}</li>`).join('')}</ul></div>
<div><h2 class="section-title">Design codes</h2><ul class="tags">${S.codes.map((m) => `<li>${esc(m)}</li>`).join('')}</ul></div>
</section>
${lightboxHtml}`;
}

function projects() {
  const current = S.currentProjects
    .map(
      (p) => `<li class="entry"><div class="entry-text">
${label(p.status)}
<h3>${esc(p.title)}</h3>
<p class="tagline">${esc(p.tagline)}</p>
<p>${esc(p.text)}</p>
<dl class="entry-facts">
<div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
<div><dt>Since</dt><dd>${esc(p.since)}</dd></div>
<div><dt>Where</dt><dd>${esc(p.where)}</dd></div>
<div><dt>Focus</dt><dd>${esc(p.focus)}</dd></div>
</dl></div></li>`,
    )
    .join('');
  const past = S.pastProjects
    .map(
      (p) => `<li class="entry"><div class="entry-text">
${label(p.period)}
<h3>${esc(p.title)}</h3>
<p class="tagline">${esc(p.tagline)}</p>
<p>${esc(p.text)}</p>
<dl class="entry-facts">
<div><dt>Where</dt><dd>${esc(p.where)}</dd></div>
${p.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}
</dl></div></li>`,
    )
    .join('');
  return `${pageHead('Projects', 'Current work at IIT Roorkee and on my own damper designs, and the projects behind my postdoctoral and PhD research.')}
<section class="wrap block" aria-labelledby="current"><h2 class="section-title" id="current">Current</h2><ul class="entries">${current}</ul></section>
<section class="wrap block" aria-labelledby="earlier"><h2 class="section-title" id="earlier">Earlier projects</h2><ul class="entries">${past}</ul></section>`;
}

function publications() {
  const keyed = (list: Article[], prefix: string) =>
    list
      .map((a, i) => {
        const doi = a.doi ? `<span class="pub-doi">DOI ${ext(doiUrl(a.doi), esc(a.doi))}</span>` : a.url ? `<span class="pub-doi">${ext(a.url, 'Read the paper (PDF)')}</span>` : '';
        return `<li><span class="key">${prefix}${list.length - i}</span><div>${citation(a)}${doi}</div></li>`;
      })
      .join('');
  const manuscripts = S.manuscripts
    .map(
      (m, i) => `<li><span class="key">M${S.manuscripts.length - i}</span><div>${label(m.status)}<span class="pub-title">${esc(m.title)}</span>${m.venue ? `<span class="pub-venue">Submitted to <em>${esc(m.venue)}</em></span>` : ''}</div></li>`,
    )
    .join('');
  const patents = S.patents
    .map(
      (p, i) => `<li><span class="key">P${S.patents.length - i}</span><div>${label(p.status)}<span class="pub-title">${esc(p.title)}</span><span class="pub-venue">${esc(p.note ? `${p.number}. ${p.note}` : p.number)}</span>${p.link ? `<span class="pub-doi">${ext(p.link, 'View the grant certificate')}</span>` : ''}</div></li>`,
    )
    .join('');
  const links = `<ul class="link-row">${profiles.map((p) => `<li>${ext(p.href, `${ICON.out}${esc(p.label)}`, 'btn btn-outline btn-sm')}</li>`).join('')}</ul>`;
  return `${pageHead('Publications', 'Journal articles, conference papers, manuscripts and patents. Citation counts are kept current on Google Scholar.', links)}
<section class="wrap block" aria-labelledby="journal"><h2 class="section-title" id="journal">Journal articles</h2><ol class="keyed">${keyed(S.journalArticles, 'J')}</ol></section>
${S.conferencePapers.length ? `<section class="wrap block" aria-labelledby="conference"><h2 class="section-title" id="conference">Conference papers</h2><ol class="keyed">${keyed(S.conferencePapers, 'C')}</ol></section>` : ''}
<section class="wrap block" aria-labelledby="manuscripts"><h2 class="section-title" id="manuscripts">Manuscripts under review and in preparation</h2><ol class="keyed">${manuscripts}</ol></section>
<section class="wrap block" aria-labelledby="patents"><h2 class="section-title" id="patents">Patents</h2><ol class="keyed">${patents}</ol></section>`;
}

function teaching() {
  const rows = S.courses
    .map((c) => `<li><span class="date">${esc(c.when)}</span><div><p class="proj-title">${esc(c.title)}</p><p class="proj-meta">${esc(c.role)}, ${esc(c.where)}</p><p>${esc(c.text)}</p></div></li>`)
    .join('');
  return `${pageHead('Teaching', 'Courses I have supported as a teaching assistant at the University of Naples Federico II and IIT Madras.')}
${S.teachingStatement ? `<section class="wrap block" aria-labelledby="approach"><h2 class="section-title" id="approach">Teaching approach</h2><p class="prose-p">${esc(S.teachingStatement)}</p></section>` : ''}
<section class="wrap block" aria-labelledby="courses"><h2 class="section-title" id="courses">Courses</h2><ul class="rows">${rows}</ul></section>`;
}

function cv(link: Link) {
  const rows = (items: Array<{ when: string; title: string; org: string; note?: string }>) =>
    items
      .map((i) => `<li><span class="date">${esc(i.when)}</span><div><p class="proj-title">${esc(i.title)}</p><p class="proj-meta">${esc(i.org)}</p>${i.note ? `<p class="proj-meta">${esc(i.note)}</p>` : ''}</div></li>`)
      .join('');
  const edu = S.education
    .map(
      (e) => `<li><span class="date">${esc(e.when)}</span><div><p class="proj-title">${esc(e.title)}</p><p class="proj-meta">${esc(e.org)}</p>${e.thesis ? `<p class="proj-meta">Thesis: <em>${esc(e.thesis)}</em></p>` : ''}${e.supervisor ? `<p class="proj-meta">Supervisor: ${esc(e.supervisor)}</p>` : ''}</div></li>`,
    )
    .join('');
  const simple = (items: Array<{ when: string; text: string }>) =>
    items.map((i) => `<li><span class="date">${esc(i.when)}</span><div><p>${esc(i.text)}</p></div></li>`).join('');
  const download = person.cv ? `<div class="actions"><a class="btn" href="${esc(link(person.cv))}">${ICON.download}Download full CV (PDF)</a></div>` : '';
  // Each fact appears once: supervisors and mentors are named with the degree
  // or position they belong to, and ASCE membership is listed under Memberships.
  return `${pageHead('Curriculum vitae', '', download)}
<section class="wrap block" aria-labelledby="positions"><h2 class="section-title" id="positions">Positions</h2><ul class="rows wide">${rows(S.positions)}</ul></section>
<section class="wrap block" aria-labelledby="education"><h2 class="section-title" id="education">Education</h2><ul class="rows wide">${edu}</ul></section>
<section class="wrap block" aria-labelledby="honours"><h2 class="section-title" id="honours">Honours</h2><ul class="rows wide">${simple(S.honours)}</ul></section>
<section class="wrap block" aria-labelledby="training"><h2 class="section-title" id="training">Advanced training</h2><ul class="rows wide">${simple(S.training)}</ul></section>
<section class="wrap block" aria-labelledby="memberships"><h2 class="section-title" id="memberships">Memberships</h2><ul class="bullets bullets-2">${S.memberships.map((m) => `<li>${esc(m)}</li>`).join('')}</ul></section>`;
}

function contact() {
  const tel = person.phone.replace(/[^\d+]/g, '');
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(person.mapQuery)}`;
  return `${pageHead('Contact', 'Email is the quickest way to reach me.')}
<section class="wrap block two-col">
<div>
<h2 class="section-title">Get in touch</h2>
<dl class="contact-list">
<div><dt>${ICON.mail}Email</dt><dd><span id="contact-email">${esc(person.email)}</span><span class="contact-actions"><a class="btn btn-sm" href="mailto:${esc(person.email)}">Send email</a><button class="btn btn-outline btn-sm" type="button" data-copy="${esc(person.email)}" data-target="contact-email">Copy</button></span></dd></div>
${person.showPhone && person.phone ? `<div><dt>${ICON.phone}Phone</dt><dd><a href="tel:${esc(tel)}">${esc(person.phone)}</a></dd></div>` : ''}
<div><dt>${ICON.pin}Office</dt><dd>${person.office.map((l) => `<span>${esc(l)}</span>`).join('')}${ext(maps, 'Open in Google Maps')}</dd></div>
</dl>
</div>
<div>
<h2 class="section-title">I welcome enquiries about</h2>
<ul class="bullets">${S.openTo.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
</div>
</section>`;
}

function notFound(link: Link) {
  return pageHead('Page not found', 'The link may be from the old version of this site.', `<div class="actions"><a class="btn" href="${esc(link('/'))}">Go to the home page</a></div>`);
}

// ---------------------------------------------------------------- registry

export const pages = {
  home: { path: '/', title: '', description: person.summary, body: (link: Link = same) => home(link) },
  research: {
    path: '/research/',
    title: 'Research',
    description: 'Seismic vibration control and passive devices, steel sections, functionally graded materials, large-scale testing and ageing steel bridges, with figures from the experiments.',
    body: (link: Link = same) => research(link),
  },
  projects: {
    path: '/projects/',
    title: 'Projects',
    description: 'Current and earlier research projects, including the PRIN 2022 PNRR project at the University of Naples Federico II and PhD research at IIT Madras.',
    body: (_link: Link = same) => projects(),
  },
  publications: {
    path: '/publications/',
    title: 'Publications',
    description: 'Journal articles, conference papers, manuscripts and Indian patents on coped steel beams, functionally graded materials and seismic dampers.',
    body: (_link: Link = same) => publications(),
  },
  teaching: {
    path: '/teaching/',
    title: 'Teaching',
    description: 'Courses supported at the University of Naples Federico II and IIT Madras.',
    body: (_link: Link = same) => teaching(),
  },
  cv: { path: '/cv/', title: 'CV', description: 'Positions, education, honours, training and memberships.', body: (link: Link = same) => cv(link) },
  contact: {
    path: '/contact/',
    title: 'Contact',
    description: `How to reach ${fullName} at ${person.institutionShort}.`,
    body: (_link: Link = same) => contact(),
  },
  notFound: { path: '/404/', title: 'Page not found', description: 'This page does not exist.', body: (link: Link = same) => notFound(link) },
};
