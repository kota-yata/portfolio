// ----- Print ordering dialog -----
const SECTION_IDS = ['featured', 'personal', 'work'];
let printOrderState = [];

function openPrintDialog() {
  ensurePrintStateFromDOM();
  renderOrderList();
  const modal = document.getElementById('print-modal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function initPrintDialog() {
  ensurePrintStateFromDOM();
  const confirmBtn = document.getElementById('print-confirm');
  const cancelBtn = document.getElementById('print-cancel');
  const closeBtn = document.getElementById('print-modal-close');
  const backdrop = document.getElementById('print-modal-backdrop');

  if (confirmBtn) confirmBtn.addEventListener('click', applyPrintOrderAndPrint);
  if (cancelBtn) cancelBtn.addEventListener('click', closePrintDialog);
  if (closeBtn) closeBtn.addEventListener('click', closePrintDialog);
  if (backdrop) backdrop.addEventListener('click', closePrintDialog);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePrintDialog(); });
}

function closePrintDialog() {
  const modal = document.getElementById('print-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function ensurePrintStateFromDOM() {
  printOrderState = SECTION_IDS.map((id) => ({ id, include: true }));
}

// no presets; users manually toggle and reorder

function renderOrderList() {
  const list = document.getElementById('order-list');
  if (!list) return;
  list.innerHTML = '';

  const labels = {
    featured: document.getElementById('featured-title')?.textContent || 'Featured',
    personal: document.getElementById('personal-title')?.textContent || 'Personal Projects',
    work: document.getElementById('work-title')?.textContent || 'Work',
  };

  printOrderState.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'order-item';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = item.include;
    cb.addEventListener('change', () => { item.include = cb.checked; });

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = labels[item.id] || item.id;

    const controls = document.createElement('span');
    controls.className = 'controls';
    const upBtn = document.createElement('button');
    upBtn.type = 'button';
    upBtn.textContent = '↑';
    upBtn.disabled = idx === 0;
    upBtn.addEventListener('click', () => { moveItem(idx, -1); });
    const downBtn = document.createElement('button');
    downBtn.type = 'button';
    downBtn.textContent = '↓';
    downBtn.disabled = idx === printOrderState.length - 1;
    downBtn.addEventListener('click', () => { moveItem(idx, +1); });

    controls.appendChild(upBtn);
    controls.appendChild(downBtn);

    li.appendChild(cb);
    li.appendChild(label);
    li.appendChild(controls);
    list.appendChild(li);
  });
}

function moveItem(index, delta) {
  const newIndex = index + delta;
  if (newIndex < 0 || newIndex >= printOrderState.length) return;
  const [item] = printOrderState.splice(index, 1);
  printOrderState.splice(newIndex, 0, item);
  renderOrderList();
}

function applyPrintOrderAndPrint() {
  const staging = document.getElementById('print-staging');
  if (!staging) return;
  staging.innerHTML = '';

  const chosen = printOrderState.filter((x) => x.include);
  chosen.forEach((x, idx) => {
    const section = document.getElementById(`${x.id}-section`);
    if (!section) return;
    if (idx !== 0) {
      const hr = document.createElement('hr');
      hr.className = 'section-sep';
      staging.appendChild(hr);
    }
    const clone = section.cloneNode(true);
    // Remove id so print CSS doesn't hide cloned sections
    clone.removeAttribute('id');
    staging.appendChild(clone);
  });

  closePrintDialog();
  window.print();
  setTimeout(() => { staging.innerHTML = ''; }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initPrintDialog();
});
