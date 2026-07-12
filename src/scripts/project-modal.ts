// Project modals: open on card click, close on the X button or a backdrop click.
// Escape-to-close, the focus trap, and aria-modal are provided natively by the
// <dialog> element's showModal(), so there's nothing to hand-roll here.
document.querySelectorAll<HTMLElement>('[data-project-open]').forEach((trigger) => {
  const id = trigger.getAttribute('data-project-open');
  const dialog = id ? document.getElementById(id) : null;
  if (!(dialog instanceof HTMLDialogElement)) return;
  trigger.addEventListener('click', () => dialog.showModal());
});

document.querySelectorAll<HTMLDialogElement>('dialog[data-project-modal]').forEach((dialog) => {
  dialog.querySelector('[data-project-close]')?.addEventListener('click', () => dialog.close());
  // A click whose target is the dialog itself landed on the backdrop, not the panel.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});
