/** Contact form QA helpers — honeypot, double-submit, phone length */

const forms = document.querySelectorAll<HTMLFormElement>('form[data-lead-form]');

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    const hp = form.querySelector<HTMLInputElement>('input[name="website"]');
    if (hp?.value.trim()) {
      event.preventDefault();
      return;
    }

    const phone = form.querySelector<HTMLInputElement>('input[name="telephone"]');
    const digits = (phone?.value ?? '').replace(/\D/g, '');
    if (phone && digits.length < 8) {
      event.preventDefault();
      phone.focus();
      phone.setCustomValidity(phone.dataset.invalidMsg || 'Invalid phone');
      phone.reportValidity();
      return;
    }
    phone?.setCustomValidity('');

    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
    }

    // Drop honeypot from query string for cleaner merci URLs
    if (hp) hp.disabled = true;
  });
});
