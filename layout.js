function initLayout() {
  const openBtn = document.getElementById('careOpenLocationMenu');
  const menu = document.getElementById('careLocationMenu');

  function closeLocationMenu() {
    if (!openBtn || !menu) return;
    menu.classList.remove('open');
    openBtn.setAttribute('aria-expanded', 'false');
  }

  function openLocationMenu() {
    if (!openBtn || !menu) return;
    menu.classList.add('open');
    openBtn.setAttribute('aria-expanded', 'true');
  }

  if (openBtn && menu) {
    openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      menu.classList.contains('open')
        ? closeLocationMenu()
        : openLocationMenu();
    });

    menu.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.closest('a')) closeLocationMenu();
    });

    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !openBtn.contains(e.target)) {
        closeLocationMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeLocationMenu();
        openBtn.focus();
      }
    });
  }

  const floatingGroup = document.querySelector('.floating-buttons');
  let scrollTimer = null;

  if (floatingGroup) {
    window.addEventListener('scroll', function () {
      floatingGroup.classList.add('dimmed');
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(function () {
        floatingGroup.classList.remove('dimmed');
      }, 260);
    }, { passive: true });
  }

  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

  dropdownItems.forEach(function (item) {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');

    if (!link || !dropdown) return;

    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');

    link.addEventListener('click', function (e) {
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (!isMobile) return;

      const isOpen = item.classList.contains('open');

      if (!isOpen) {
        e.preventDefault();

        dropdownItems.forEach(function (otherItem) {
          otherItem.classList.remove('open');
          const otherLink = otherItem.querySelector('.nav-link');
          if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
        });

        item.classList.add('open');
        link.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      dropdownItems.forEach(function (item) {
        item.classList.remove('open');
        const link = item.querySelector('.nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
    }
  });

  const images = document.querySelectorAll('img:not([loading])');

  images.forEach(function (img) {
    const isLogo = img.classList.contains('site-brand-logo');
    const isHero =
      img.closest('[class*="hero"]') ||
      img.closest('[class*="visual"]') ||
      img.closest('[class*="banner"]');

    if (!isLogo && !isHero) {
      img.setAttribute('loading', 'lazy');
    }

    img.setAttribute('decoding', 'async');
  });

  const popup = document.getElementById('videoPopup');
  const iframe = document.getElementById('popupVideo');
  const closeBtn = document.querySelector('#videoPopup .closeBtn');

  if (popup && iframe && closeBtn) {
    function closePopup() {
      iframe.src = '';
      popup.style.display = 'none';
      document.body.classList.remove('video-popup-open');
    }

    closeBtn.addEventListener('click', closePopup);

    popup.addEventListener('click', function (e) {
      if (e.target === popup) closePopup();
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initLayout();
});

(function injectSEO() {
  const head = document.head;
  const cleanPath = window.location.pathname.replace(/\/index\.html$/, '/');

  if (!document.querySelector('link[rel="canonical"]')) {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.origin + cleanPath;
    head.appendChild(canonical);
  }

  if (!document.querySelector('meta[name="robots"]')) {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'index, follow';
    head.appendChild(robots);
  }
})();