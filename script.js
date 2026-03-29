function applyTranslations(lang) {
  const translations = lang === 'ja' ? window.i18n_ja : window.i18n_en;

  const simpleFields = ['name', 'intro'];
  for (const key of simpleFields) {
    const element = document.getElementById(key);
    if (element) {
      element.textContent = translations[key];
    }
  }

  const blogLink = document.getElementById('blog-link');
  if (blogLink) {
    blogLink.href = translations['blog-link-href'];
  }

  document.body.classList.toggle('ja', lang === 'ja');

  updateSection('featured', translations.featured, translations.fieldLabels);
  updateSection('personal', translations.personal, translations.fieldLabels);
  updateSection('work', translations.work, translations.fieldLabels);

  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = lang;
  }
}

function updateSection(sectionId, sectionData, fieldLabels) {
  const section = document.getElementById(`${sectionId}-section`);
  if (!section) return;

  const titleElement = document.getElementById(`${sectionId}-title`);
  if (titleElement) {
    titleElement.textContent = sectionData.title;
  }

  const container = document.getElementById(`${sectionId}-entries`);
  if (container) {
    container.innerHTML = '';
    for (const entry of sectionData.entries) {
      const div = document.createElement('div');
      div.className = 'entry';

      const title = document.createElement('h3');
      title.textContent = entry.title;

      const desc = document.createElement('p');
      desc.textContent = entry.desc;

      div.appendChild(title);
      div.appendChild(desc);

      for (const fieldName of ['languages', 'protocols']) {
        if (!entry[fieldName]) continue;
        const meta = document.createElement('p');
        meta.textContent = `${fieldLabels[fieldName]}: ${entry[fieldName]}`;
        div.appendChild(meta);
      }

      if (entry.links && Array.isArray(entry.links) && entry.links.length > 0) {
        const linkP = document.createElement('p');
        linkP.appendChild(document.createTextNode('link: '));
        entry.links.forEach((linkObj, index) => {
          const link = document.createElement('a');
          link.href = linkObj.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = linkObj.label;
          linkP.appendChild(link);
          if (index !== entry.links.length - 1) {
            linkP.appendChild(document.createTextNode(', '));
          }
        });
        div.appendChild(linkP);
      }

      container.appendChild(div);
    }
  }
}

let currentLang = 'en';

function changeLanguage(e) {
  const selectedLang = e.target.value;
  applyTranslations(selectedLang);
  currentLang = selectedLang;
  localStorage.setItem('preferredLanguage', currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
  // const savedLang = localStorage.getItem('preferredLanguage');
  // const userLang = navigator.language || navigator.userLanguage;

  // if (savedLang) {
  //   applyTranslations(savedLang);
  //   currentLang = savedLang;
  // } else if (userLang.startsWith('ja')) {
  //   applyTranslations('ja');
  //   currentLang = 'ja';
  // } else {
  //   applyTranslations('en');
  //   currentLang = 'en';
  // }

  // const langSelect = document.getElementById('lang-select');
  // if (langSelect) {
  //   langSelect.addEventListener('change', changeLanguage);
  // }
  // temporarily force English until the Japanese translation is complete
  applyTranslations('en');
  currentLang = 'en';
});
