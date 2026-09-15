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

function setSelectedUI(typo: Typology | null) {
  document.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((el) => {
    el.classList.toggle('is-active', el.dataset.hotspot === typo);
  });
  document.querySelectorAll<HTMLElement>('[data-panel]').forEach((el) => {
    const open = typo !== null && el.dataset.panel === typo;
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

export function initChoose() {
  let current: Typology | null = (sessionStorage.getItem(STORAGE_KEY) as Typology | null) || null;
  if (current && !['F3', 'F4', 'Fonds'].includes(current)) current = null;

  setSelectedUI(current);

  document.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.hotspot as Typology;
      if (!id) return;
      current = id;
      sessionStorage.setItem(STORAGE_KEY, id);
      setSelectedUI(current);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-panel-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      // keep selection for Talk; only close panel UI
      document.querySelectorAll<HTMLElement>('[data-panel]').forEach((el) => {
        el.hidden = true;
        el.classList.remove('is-open');
      });
      document.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((el) => {
        el.classList.remove('is-active');
      });
      if (current) {
        // re-mark selected hotspot softly
        document
          .querySelectorAll<HTMLElement>(`[data-hotspot="${current}"]`)
          .forEach((el) => el.classList.add('is-selected'));
      }
    });
  });

  document.querySelectorAll<HTMLElement>('[data-select-typo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.selectTypo as Typology;
      if (!id) return;
      current = id;
      sessionStorage.setItem(STORAGE_KEY, id);
      setSelectedUI(current);
      document.querySelectorAll<HTMLElement>('[data-hotspot]').forEach((el) => {
        el.classList.toggle('is-selected', el.dataset.hotspot === id);
      });
    });
  });

  // form toggle in Talk
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
