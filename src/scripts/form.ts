export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('#lead-form');
  const toast = document.querySelector<HTMLElement>('#form-toast');
  if (!form || !toast) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toast.classList.add('is-visible');
    form.reset();
    window.setTimeout(() => toast.classList.remove('is-visible'), 5000);
  });
}
