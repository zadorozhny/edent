export default {
  name: 'ripple',
  inserted: (el, binding) => {
    const ripple = document.createElement('span');
    const start = (event, el) => {
      const rect = el.getBoundingClientRect();
      const { offsetY: top, offsetX: left } = event.offsetY;
      const { height } = rect;
      const size = rect.width > rect.height ? rect.width : rect.height;

      setTimeout(() => {
        if (ripple.classList.contains !== 'ripple-active') {
          if (binding.value) {
            ripple.style.background = binding.value;
          }
          ripple.classList.add('ripple-active');
          ripple.style.position = 'absolute';
          ripple.style.width = `${size}px`;
          ripple.style.height = `${height}px`;
          ripple.style.top = `${top - rect.height / 2}px`;
          ripple.style.left = `${left - size / 2}px`;
        }
      }, 100);
    };

    ripple.setAttribute('class', 'ripple');
    el.appendChild(ripple);

    el.addEventListener('click', event => {
      start(event, el);
    });
    el.addEventListener('mouseup', () => {
      ripple.classList.remove('ripple-active');
    });
  }
};
