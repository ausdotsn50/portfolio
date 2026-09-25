// Contact form: submits to the sendMessage action without a page navigation,
// so the page itself stays prerendered. The footer's mail link is the
// fallback when JS is unavailable.
import { actions, isInputError } from 'astro:actions';
import { contact } from '../data/contact';

const SUCCESS = "Thanks — your message is on its way. I'll get back to you soon.";

// Shown for anything that isn't a field-level validation problem. Server-side
// error messages are written for the logs, not for visitors, so they're never
// displayed verbatim — this is what the visitor sees instead.
const SEND_FAILED = `Sorry, your message couldn't be sent right now. Please try again in a moment, or email me at ${contact.email}.`;

function initForm(form: HTMLFormElement): void {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const statusText = form.querySelector<HTMLElement>('[data-form-status-text]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const startedAt = form.querySelector<HTMLInputElement>('[data-started-at]');

  // Stamped now, checked server-side — a submission that arrives within a
  // few seconds of the form rendering is a bot, not a person typing.
  if (startedAt) startedAt.value = String(Date.now());

  // Only the text span and data-state change — the banner also holds the
  // success/error icons, which setting the container's textContent would wipe.
  const setStatus = (message: string, state: 'success' | 'error'): void => {
    if (!status || !statusText) return;
    status.dataset.state = state;
    statusText.textContent = message;
  };

  const clearStatus = (): void => {
    if (!status || !statusText) return;
    delete status.dataset.state;
    statusText.textContent = '';
  };

  const setSending = (sending: boolean): void => {
    if (submit) submit.disabled = sending;
    // Label only — the button also contains the spinner icon.
    if (submitLabel) submitLabel.textContent = sending ? 'Sending…' : 'Send message';
  };

  const errorSlot = (name: string) =>
    form.querySelector<HTMLElement>(`[data-field-error="${name}"]`);

  const clearFieldError = (field: HTMLInputElement | HTMLTextAreaElement): void => {
    const slot = errorSlot(field.name);
    if (slot) slot.textContent = '';
    field.removeAttribute('aria-invalid');
  };

  const clearAllErrors = (): void => {
    form
      .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[aria-invalid]')
      .forEach(clearFieldError);
    form.querySelectorAll<HTMLElement>('[data-field-error]').forEach((slot) => {
      slot.textContent = '';
    });
  };

  // Shows every field's problem at once (rather than one per submit), and
  // moves focus to the first so keyboard and screen-reader users land on it.
  // Returns false if none of the errors belonged to a visible field.
  const showFieldErrors = (fields: Record<string, string[] | undefined>): boolean => {
    let firstInvalid: HTMLElement | undefined;
    for (const [name, messages] of Object.entries(fields)) {
      const slot = errorSlot(name);
      const field = form.querySelector<HTMLElement>(`[name="${name}"]`);
      if (!slot || !field || !messages?.length) continue;
      slot.textContent = messages[0];
      field.setAttribute('aria-invalid', 'true');
      firstInvalid ??= field;
    }
    firstInvalid?.focus();
    return firstInvalid !== undefined;
  };

  // Typing clears that field's error, and any banner — a lingering "Thanks,
  // your message is on its way" is confusing once someone starts a new one.
  form.addEventListener('input', (event) => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      if (field.hasAttribute('aria-invalid')) clearFieldError(field);
    }
    if (status?.dataset.state) clearStatus();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearAllErrors();
    clearStatus();
    setSending(true);

    try {
      const { error } = await actions.sendMessage(new FormData(form));

      if (isInputError(error)) {
        if (!showFieldErrors(error.fields)) setStatus(SEND_FAILED, 'error');
        return;
      }

      if (error) {
        setStatus(SEND_FAILED, 'error');
        return;
      }

      form.reset();
      if (startedAt) startedAt.value = String(Date.now());
      setStatus(SUCCESS, 'success');
    } catch {
      setStatus(SEND_FAILED, 'error');
    } finally {
      setSending(false);
    }
  });
}

document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach(initForm);
