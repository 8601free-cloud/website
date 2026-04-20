function initLayout() {
  document.querySelectorAll('.has-dropdown .nav-link').forEach(link => {
    link.addEventListener('click', function(e){
      const parent = this.parentElement;

      if (window.innerWidth < 900){
        e.preventDefault();
        parent.classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', function(e){
    document.querySelectorAll('.has-dropdown').forEach(item => {
      if (!item.contains(e.target)){
        item.classList.remove('open');
      }
    });
  });

  const openBtn = document.getElementById('careOpenLocationMenu');
  const menu = document.getElementById('careLocationMenu');

  if (openBtn && menu) {
    openBtn.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      openBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !openBtn.contains(e.target)) {
        menu.classList.remove('open');
        openBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        menu.classList.remove('open');
        openBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

fetch('layout.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('site-layout').innerHTML = data;
    initLayout();
  });