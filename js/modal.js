// ── Config ──
const CONFIG = {
  ids: { backdrop: 'vm-modal-backdrop', close: 'vm-modal-close', ok: 'vm-modal-ok' },
  classes: { visible: 'visible' },
};

// ── Logic ──
const isBackdropClick = (event, backdrop) => event.target === backdrop;

// ── Render ──
const setModalVisible = (backdrop, visible) =>
  backdrop.classList.toggle(CONFIG.classes.visible, visible);

// ── Init ──
const backdrop = document.getElementById(CONFIG.ids.backdrop);
const closeModal = () => setModalVisible(backdrop, false);
export const openModal = () => setModalVisible(backdrop, true);

document.getElementById(CONFIG.ids.close).addEventListener('click', closeModal);
document.getElementById(CONFIG.ids.ok)?.addEventListener('click', closeModal);
backdrop.addEventListener('click', event => {
  if (isBackdropClick(event, backdrop)) closeModal();
});
