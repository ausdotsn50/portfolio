// Client showcase carousel: a centered card with exactly one peeking neighbor
// on each side — always symmetric, regardless of how many cards there are
// (capping at ±1 avoids the left/right imbalance you get with ±2 when the
// total count is even). Advanced via dots/arrows or autoplay, which pauses on
// hover/focus and resumes after an idle delay (same rules as
// photo-carousel.ts).
const AUTOPLAY_MS = 5500;
const INTERACTION_RESUME_MS = 8000;
const HOVER_RESUME_MS = 900;
const MAX_VISIBLE_OFFSET = 1; // only the immediate neighbor peeks on each side

function initCarousel(root: HTMLElement): void {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'));
  if (cards.length <= 1) return;

  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-dot]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let autoTimer: number | undefined;
  let resumeTimer: number | undefined;
  let hovering = false;
  let visible = true;

  const show = (next: number): void => {
    index = (next + cards.length) % cards.length;
    cards.forEach((card, i) => {
      let diff = i - index;
      // Wrap to the shortest signed distance so the fan reads correctly at
      // both ends of the list (e.g. the last card is "-1" from the first).
      if (diff > cards.length / 2) diff -= cards.length;
      if (diff < -cards.length / 2) diff += cards.length;
      const offset = Math.abs(diff) > MAX_VISIBLE_OFFSET ? 'hidden' : String(diff);
      card.dataset.offset = offset;
      card.setAttribute('aria-hidden', diff === 0 ? 'false' : 'true');
      card.tabIndex = diff === 0 ? 0 : -1;
    });
    dots.forEach((d, i) => {
      d.toggleAttribute('data-active', i === index);
      d.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  };

  const stopAuto = (): void => {
    if (autoTimer !== undefined) {
      clearInterval(autoTimer);
      autoTimer = undefined;
    }
  };

  const startAuto = (): void => {
    if (reduceMotion || hovering || !visible || autoTimer !== undefined) return;
    autoTimer = window.setInterval(() => show(index + 1), AUTOPLAY_MS);
  };

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

  // Clicking a peeking side card brings it to center.
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (i === index) return; // let the center card's own link/click through
      e.preventDefault();
      onInteract(i);
    });
  });

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

  show(0);
  startAuto();
}

document.querySelectorAll<HTMLElement>('[data-client-carousel]').forEach(initCarousel);
