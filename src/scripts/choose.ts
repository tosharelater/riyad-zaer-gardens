const WA_BASE = 'https://wa.me/212600000000';
const STORAGE_KEY = 'rzg-typology';

type Typology = 'F3' | 'F4' | 'Fonds';
const DEFAULT_TYPO: Typology = 'F3';

const LABELS: Record<Typology, string> = {
  F3: 'F3',
  F4: 'F4',
  Fonds: 'fonds de commerce',
};

function waHref(typo: Typology | null): string {
  if (!typo) return WA_BASE;
  const text = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par un ${LABELS[typo]} à Riyad Zaer Gardens.`
  );
  return `${WA_BASE}?text=${text}`;
}

function updateWaLinks(typo: Typology | null) {
  const href = waHref(typo);
  document.querySelectorAll<HTMLAnchorElement>('[data-wa]').forEach((a) => {
    a.href = href;
  });
}

function setPanelOpen(el: HTMLElement, open: boolean) {
  el.classList.toggle('is-open', open);
  el.setAttribute('aria-hidden', open ? 'false' : 'true');
  if (open) el.removeAttribute('inert');
  else el.setAttribute('inert', '');
}

/** Update explore UI. `committed` = user picked (show handoff label + WA prefill). */
function setSelectedUI(typo: Typology, committed: boolean) {
  document.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((el) => {
    const on = el.dataset.hotspot === typo;
    el.classList.toggle('is-active', on);
    el.classList.toggle('is-selected', on && committed);
    el.setAttribute('aria-pressed', on ? 'true' : 'false');
  });

  document.querySelectorAll<HTMLElement>('[data-legend], [data-hotspot-trigger]').forEach((el) => {
    const id = el.dataset.legend || el.dataset.hotspotTrigger;
    const on = id === typo;
    el.classList.toggle('is-active', on);
    el.setAttribute('aria-pressed', on ? 'true' : 'false');
  });

  const stage = document.querySelector<HTMLElement>('[data-panel-stage]');
  document.querySelectorAll<HTMLElement>('[data-panel]').forEach((el) => {
    setPanelOpen(el, el.dataset.panel === typo);
  });
  stage?.classList.add('has-open');

  document.querySelectorAll<HTMLElement>('[data-choose-empty]').forEach((el) => {
    el.classList.add('is-hidden');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('hidden', '');
  });

  // Never show “Aucune typologie sélectionnée” — hide until a typology is picked
  document.querySelectorAll<HTMLElement>('[data-selected-label]').forEach((el) => {
    if (!committed) {
      el.textContent = '';
      el.classList.add('is-empty');
      el.setAttribute('hidden', '');
    } else {
      const prefix = el.dataset.prefix || '';
      el.textContent = `${prefix} ${LABELS[typo]}`.trim();
      el.classList.remove('is-empty');
      el.removeAttribute('hidden');
    }
  });

  const formSelect = document.querySelector<HTMLSelectElement>('#typology');
  if (formSelect) {
    const map: Record<Typology, string> = { F3: 'F3', F4: 'F4', Fonds: 'Commerce' };
    formSelect.value = map[typo];
  }
  updateWaLinks(committed ? typo : null);
}

function persistTypology(id: Typology) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* private mode */
  }
}

function readTypology(): Typology | null {
  try {
    const fromLocal = localStorage.getItem(STORAGE_KEY);
    const fromSession = sessionStorage.getItem(STORAGE_KEY);
    const raw = fromLocal || fromSession;
    if (raw && ['F3', 'F4', 'Fonds'].includes(raw)) {
      if (!fromLocal) persistTypology(raw as Typology);
      return raw as Typology;
    }
  } catch {
    /* private mode */
  }
  return null;
}

function commitTypology(id: Typology) {
  persistTypology(id);
  setSelectedUI(id, true);
}

export function initChoose() {
  const stored = readTypology();
  // Explore always shows a summary (default F3); pins/legend change selection.
  // Handoff label + WA prefill only after a committed pick (stored or click).
  let current: Typology = stored || DEFAULT_TYPO;
  let committed = !!stored;
  setSelectedUI(current, committed);

  const openFromControl = (id: string | undefined) => {
    if (!id || !['F3', 'F4', 'Fonds'].includes(id)) return;
    current = id as Typology;
    committed = true;
    commitTypology(current);
  };

  document.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((btn) => {
    btn.addEventListener('click', () => openFromControl(btn.dataset.hotspot));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFromControl(btn.dataset.hotspot);
      }
    });
  });

  document.querySelectorAll<HTMLElement>('[data-legend], [data-hotspot-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openFromControl(btn.dataset.legend || btn.dataset.hotspotTrigger);
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFromControl(btn.dataset.legend || btn.dataset.hotspotTrigger);
      }
    });
  });

  document.querySelectorAll<HTMLElement>('[data-select-typo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.selectTypo as Typology;
      if (!id) return;
      current = id;
      committed = true;
      commitTypology(current);
    });
  });

  const toggle = document.querySelector<HTMLButtonElement>('[data-form-toggle]');
  const formWrap = document.querySelector<HTMLElement>('[data-quiet-form]');
  if (formWrap) formWrap.removeAttribute('hidden');
  if (toggle && formWrap) {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.addEventListener('click', () => {
      const open = formWrap.hasAttribute('hidden');
      if (open) formWrap.removeAttribute('hidden');
      else formWrap.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
}
