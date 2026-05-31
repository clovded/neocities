// ── Config ──
const CONFIG = {
  targetOrigin: '*',
  autoSelector: '.img-hover-wrap',
};

// ── Logic ──
const sendTooltipMessage = (type, data = {}) =>
  window.parent.postMessage({ type, ...data }, CONFIG.targetOrigin);

// ── Render (bind) ──
export const bindTooltip = (element, content) => {
  element.addEventListener('mouseenter', () => sendTooltipMessage('tooltip-show', { content }));
  element.addEventListener('mousemove', event => sendTooltipMessage('tooltip-move', { x: event.clientX, y: event.clientY }));
  element.addEventListener('mouseleave', () => sendTooltipMessage('tooltip-hide'));
};

// ── Init ──
document.querySelectorAll(CONFIG.autoSelector).forEach(el => bindTooltip(el, el.dataset.tooltip));
