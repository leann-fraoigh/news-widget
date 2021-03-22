const addListeners = (el) => {

  const toggleBtn = el.shadowRoot.querySelector('.js-news-widget-toggle');
  const popup = el.shadowRoot.querySelector('.news-widget__content');

  const open = () => {
    popup.classList.add('news-widget__content--active');
  };

  const close = () => {
    popup.classList.remove('news-widget__content--active');
  };

  const onBtnClick = () => {
    let pressed = (toggleBtn.getAttribute('aria-pressed') === 'true');
    toggleBtn.setAttribute('aria-pressed', !pressed);
    if (pressed) {
      close();
    } else {
      open();
    }
  };

  toggleBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    onBtnClick();
  });

  const newsListChangeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.children.length > 0) {
        toggleBtn.querySelector('span').innerText = mutation.target.children.length;
        toggleBtn.classList.remove('news-widget__toggle--not-active');
        el.interactionObserver(mutation.target.querySelectorAll('li'));
      }
    });
  });

  newsListChangeObserver.observe(el.shadowRoot.querySelector('ul'), {childList: true});
};

export {addListeners};
