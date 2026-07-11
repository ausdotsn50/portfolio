// About photo carousel: crossfade between photos, prev/next + dots, with
// autoplay that pauses on interaction/hover and resumes after an idle delay.
// No-ops when there's a single photo (controls aren't rendered then).
const AUTOPLAY_MS = 5000; // how long each photo is shown while auto-advancing
const INTERACTION_RESUME_MS = 8000; // idle time after a click before resuming
const HOVER_RESUME_MS = 900; // grace period after the pointer leaves the sleeve

function initCarousel(root: HTMLElement): void {
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
  if (slides.length <= 1) return;

  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-dot]'));
  const captionEl = root.querySelector<HTMLElement>('[data-caption-display]');
  const indexEl = root.querySelector<HTMLElement>('[data-index]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = Math.max(
    0,
    slides.findIndex((s) => s.hasAttribute('data-active')),
  );
  let autoTimer: number | undefined;
  let resumeTimer: number | undefined;
  let hovering = false;
  let visible = true;

  const show = (next: number): void => {
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => s.toggleAttribute('data-active', i === index));
    dots.forEach((d, i) => {
      d.toggleAttribute('data-active', i === index);
      d.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
    const caption = slides[index].getAttribute('data-caption');
    if (captionEl && caption) captionEl.textContent = caption;
    if (indexEl) indexEl.textContent = String(index + 1);
  };

  const stopAuto = (): void => {
    if (autoTimer !== undefined) {
      clearInterval(autoTimer);
      autoTimer = undefined;
    }
  };

  // Start auto-advancing — but only when it's actually appropriate to.
  const startAuto = (): void => {
    if (reduceMotion || hovering || !visible || autoTimer !== undefined) return;
    autoTimer = window.setInterval(() => show(index + 1), AUTOPLAY_MS);
  };

  // Pause now and hand control to the user; resume after `delay` of quiet.
  const scheduleResume = (delay: number): void => {
    stopAuto();
    if (resumeTimer !== undefined) clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      resumeTimer = undefined;
      startAuto();
    }, delay);
  };

  const onInteract = (to: number): void => {
    show(to);
    scheduleResume(INTERACTION_RESUME_MS);
  };

  root.querySelector('[data-prev]')?.addEventListener('click', () => onInteract(index - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => onInteract(index + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => onInteract(i)));

  // Pause while hovering/focusing the sleeve (the true-colour reveal is showing);
  // resume a moment after the pointer/focus leaves.
  const enter = (): void => {
    hovering = true;
    stopAuto();
    if (resumeTimer !== undefined) {
      clearTimeout(resumeTimer);
      resumeTimer = undefined;
    }
  };
  const leave = (): void => {
    hovering = false;
    scheduleResume(HOVER_RESUME_MS);
  };
  root.addEventListener('mouseenter', enter);
  root.addEventListener('mouseleave', leave);
  root.addEventListener('focusin', enter);
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget as Node)) leave();
  });

  // Don't burn cycles auto-advancing off-screen or on a hidden tab.
  new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) startAuto();
      else stopAuto();
    },
    { threshold: 0.35 },
  ).observe(root);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  startAuto();
}

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(initCarousel);
