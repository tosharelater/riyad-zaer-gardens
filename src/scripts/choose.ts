const WA_BASE = 'https://wa.me/212600000000';
const STORAGE_KEY = 'rzg-typology';

type Typology = 'F3' | 'F4' | 'Fonds';

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

function setSelectedUI(typo: Typology | null, opts: { openPanel?: boolean } = {}) {
  const openPanel = opts.openPanel !== false;

  document.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((el) => {
    const on = el.dataset.hotspot === typo;
    el.classList.toggle('is-active', on && openPanel);
    el.classList.toggle('is-selected', on);
    el.setAttribute('aria-pressed', on ? 'true' : 'false');
  });

  document.querySelectorAll<HTMLElement>('[data-legend], [data-hotspot-trigger]').forEach((el) => {
    const id = el.dataset.legend || el.dataset.hotspotTrigger;
    const on = id === typo;
    el.classList.toggle('is-active', on);
    el.setAttribute('aria-pressed', on ? 'true' : 'false');
  });

  document.querySelectorAll<HTMLElement>('[data-panel]').forEach((el) => {
    const open = openPanel && typo !== null && el.dataset.panel === typo;
    el.hidden = !open;
    el.classList.toggle('is-open', open);
  });

  document.querySelectorAll<HTMLElement>('[data-selected-label]').forEach((el) => {
    if (!typo) {
      el.textContent = el.dataset.empty || '';
      el.classList.add('is-empty');
    } else {
      const prefix = el.dataset.prefix || '';
      el.textContent = `${prefix} ${LABELS[typo]}`.trim();
      el.classList.remove('is-empty');
    }
  });

  const formSelect = document.querySelector<HTMLSelectElement>('#typology');
  if (formSelect && typo) {
    const map: Record<Typology, string> = { F3: 'F3', F4: 'F4', Fonds: 'Commerce' };
    formSelect.value = map[typo];
  }
  updateWaLinks(typo);
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

function activateTypology(id: Typology, openPanel = true) {
  persistTypology(id);
  setSelectedUI(id, { openPanel });
}

export function initChoose() {
  let current: Typology | null = readTypology();

  setSelectedUI(current, { openPanel: !!current });

  const openFromControl = (id: string | undefined) => {
    if (!id || !['F3', 'F4', 'Fonds'].includes(id)) return;
    current = id as Typology;
    activateTypology(current, true);
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

  document.querySelectorAll<HTMLElement>('[data-panel-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll<HTMLElement>('[data-panel]').forEach((el) => {
        el.hidden = true;
        el.classList.remove('is-open');
      });
      document.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((el) => {
        el.classList.remove('is-active');
      });
      if (current) {
        document
          .querySelectorAll<HTMLElement>(`[data-hotspot="${current}"]`)
          .forEach((el) => {
            el.classList.add('is-selected');
            el.setAttribute('aria-pressed', 'true');
          });
        document
          .querySelectorAll<HTMLElement>(`[data-legend="${current}"], [data-hotspot-trigger="${current}"]`)
          .forEach((el) => {
            el.classList.add('is-active');
            el.setAttribute('aria-pressed', 'true');
          });
      }
    });
  });

  document.querySelectorAll<HTMLElement>('[data-select-typo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.selectTypo as Typology;
      if (!id) return;
      current = id;
      activateTypology(current, true);
    });
  });

  const toggle = document.querySelector<HTMLButtonElement>('[data-form-toggle]');
  const formWrap = document.querySelector<HTMLElement>('[data-quiet-form]');
  if (toggle && formWrap) {
    toggle.addEventListener('click', () => {
      const open = formWrap.hasAttribute('hidden');
      if (open) formWrap.removeAttribute('hidden');
      else formWrap.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
}
