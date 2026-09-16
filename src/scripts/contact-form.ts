// Contact form: submits to the sendMessage action without a page navigation,
// so the page itself stays prerendered. The mailto link beside the form is
// the fallback when JS is unavailable.
import { actions, isInputError } from 'astro:actions';

const SUCCESS = "Thanks — your message is on its way. I'll get back to you soon.";
const GENERIC_ERROR = 'Something went wrong sending that. Please email me directly instead.';

function initForm(form: HTMLFormElement): void {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const startedAt = form.querySelector<HTMLInputElement>('[data-started-at]');

  // Stamped now, checked server-side — a submission that arrives within a
  // few seconds of the form rendering is a bot, not a person typing.
  if (startedAt) startedAt.value = String(Date.now());

  const setStatus = (message: string, ok: boolean): void => {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('text-espresso-soft', ok);
    status.classList.toggle('text-burnt-orange', !ok);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending…';
    }
    setStatus('', true);

    try {
      const { error } = await actions.sendMessage(new FormData(form));

      if (isInputError(error)) {
        // Surface the first field-level complaint from the action's schema.
        const firstMessage = Object.values(error.fields).flat()[0];
        setStatus(firstMessage ?? 'Please check the form and try again.', false);
        return;
      }

      if (error) {
        setStatus(error.message || GENERIC_ERROR, false);
        return;
      }

      form.reset();
      if (startedAt) startedAt.value = String(Date.now());
      setStatus(SUCCESS, true);
    } catch {
      setStatus(GENERIC_ERROR, false);
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Send message';
      }
    }
  });
}

document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach(initForm);
