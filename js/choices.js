// ── Config ──
const CONFIG = {
  arrow: '▸',
};

// ── Render ──
export const renderChoices = (target, choices) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'choices';

  for (const { id, label } of choices) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.id = id;
    btn.innerHTML = `<span class="choice-arrow">${CONFIG.arrow}</span>${label}`;
    wrapper.appendChild(btn);
  }

  target.replaceWith(wrapper);
};
