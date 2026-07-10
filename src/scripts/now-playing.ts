// "Now Playing" vinyl player: play/pause toggles the spinning disc + equalizer
// + ambient progress; prev/next cycle a small playlist of real current focuses.
interface Track {
  title: string;
  artist: string;
}

function initPlayer(root: HTMLElement): void {
  let tracks: Track[] = [];
  try {
    tracks = JSON.parse(root.querySelector('[data-np-playlist]')?.textContent ?? '[]');
  } catch {
    tracks = [];
  }
  if (!tracks.length) return;

  const titleEl = root.querySelector<HTMLElement>('[data-np-title]');
  const artistEl = root.querySelector<HTMLElement>('[data-np-artist]');
  const indexEl = root.querySelector<HTMLElement>('[data-np-index]');
  const totalEl = root.querySelector<HTMLElement>('[data-np-total]');
  const disc = root.querySelector<HTMLElement>('.vinyl-disc');
  const playBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-np-play]'));

  let index = 0;
  let playing = false;

  if (totalEl) totalEl.textContent = String(tracks.length);

  const render = (): void => {
    const track = tracks[index];
    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (indexEl) indexEl.textContent = String(index + 1);
  };

  const setPlaying = (next: boolean): void => {
    playing = next;
    root.classList.toggle('is-playing', playing);
    disc?.classList.toggle('animate-spin-slow', playing);
    playBtns.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(playing));
      btn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    });
  };

  const go = (delta: number): void => {
    index = (index + delta + tracks.length) % tracks.length;
    render();
  };

  root.querySelector('[data-np-prev]')?.addEventListener('click', () => go(-1));
  root.querySelector('[data-np-next]')?.addEventListener('click', () => go(1));
  playBtns.forEach((btn) => btn.addEventListener('click', () => setPlaying(!playing)));

  render();

  // Auto-play for a lively "now playing" feel — but stay calm for users who
  // asked for reduced motion.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setPlaying(!prefersReduced);
}

document.querySelectorAll<HTMLElement>('[data-now-playing]').forEach(initPlayer);
