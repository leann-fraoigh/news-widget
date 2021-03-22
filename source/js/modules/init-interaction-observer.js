const initInteractionObserver = (arr) => {
  const STATUS_CHANGE_DELAY = 1500;

  const intersectionObserver = new IntersectionObserver((entry) => {
    onIntersection(entry[0].target);
  }, {
    rootMargin: '0px',
    threshold: 1.0,
  });

  const onIntersection = (el) => {
    if (!el.dataset.watched) {
      stopObserving(el);
    }
  };

  const stopObserving = (el) => {
    el.dataset.watched = 'true';
    intersectionObserver.unobserve(el);
    setTimeout(() => {
      el.querySelector('.news-list__status').setAttribute('aria-hidden', 'true');
    }, STATUS_CHANGE_DELAY);
  };

  arr.forEach((child) => {
    intersectionObserver.observe(child);
  });
};

export {initInteractionObserver};
