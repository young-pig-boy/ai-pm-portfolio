(() => {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  const target = lightbox.querySelector('img');
  const close = lightbox.querySelector('.lightbox-close');
  let previousFocus = null;

  const hide = () => {
    lightbox.classList.remove('open');
    target.removeAttribute('src');
    document.body.style.overflow = '';
    previousFocus?.focus();
  };

  document.querySelectorAll('.zoomable').forEach((image) => {
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', '查看大图');
    const show = () => {
      previousFocus = image;
      target.src = image.src;
      target.alt = image.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      close.focus();
    };
    image.addEventListener('click', show);
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        show();
      }
    });
  });

  close.addEventListener('click', hide);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) hide(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox.classList.contains('open')) hide(); });
})();
