// ── Config ──
const CONFIG = {
  count: 120,
  sizeThreshold: 0.8,
  opacityRange: 0.3,
  opacityMinBase: 0.2,
  durationRange: 4,
  durationMin: 2,
};

// ── Logic ──
const buildStarData = () => {
  const minOpacity = (Math.random() * CONFIG.opacityRange + CONFIG.opacityMinBase).toFixed(2);
  const maxOpacity = (parseFloat(minOpacity) + Math.random() * CONFIG.opacityRange + CONFIG.opacityMinBase).toFixed(2);
  return {
    size: Math.random() < CONFIG.sizeThreshold ? 1 : 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: (Math.random() * CONFIG.durationRange + CONFIG.durationMin).toFixed(1),
    minOpacity,
    maxOpacity,
  };
};

// ── Render ──
const renderStar = ({ size, left, top, duration, minOpacity, maxOpacity }) => {
  const el = document.createElement('div');
  el.className = 'star';
  el.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${left}%;
    top: ${top}%;
    --duration: ${duration}s;
    --opacity-min: ${minOpacity};
    --opacity-max: ${maxOpacity};
  `;
  return el;
};

const renderStars = (container, count) => {
  for (let i = 0; i < count; i++) container.appendChild(renderStar(buildStarData()));
};

renderStars(document.body, CONFIG.count);
