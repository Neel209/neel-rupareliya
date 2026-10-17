let lenisInstance = null;
export const setLenis = (l) => { lenisInstance = l; };
export const scrollToId = (id) => {
  const el = document.querySelector(id);
  if (!el) return;
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -72, duration: 1.3 });
  else el.scrollIntoView({ behavior: "smooth" });
};
export const openResume = () => window.dispatchEvent(new Event("open-resume"));
