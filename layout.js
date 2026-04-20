function initLayout() {
  document.querySelectorAll('.has-dropdown .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      const parent = this.parentElement;

      if (window.innerWidth < 900) {
        e.preventDefault();

        document.querySelectorAll('.has-dropdown').forEach(item => {
          if (item !== parent) item.classList.remove('open');
        });

        parent.classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-dropdown').forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
      }
    });
  });

  const openBtn = document.getElementById('careOpenLocationMenu');
  const menu = document.getElementById('careLocationMenu');

  if (openBtn && menu) {
    openBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = menu.classList.toggle('open');
      openBtn.setAttribute('aria-expanded', String(isOpen));
    });

    menu.addEventListener('click', function (e) {
      e.stopPropagation();
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

document.addEventListener('DOMContentLoaded', function () {
  const layoutRoot = document.getElementById('site-layout');
  if (!layoutRoot) return;

  layoutRoot.innerHTML = `
    <div class="top-nav-wrap">
      <nav class="top-nav">
        <a href="/index.html">홈</a>

        <div class="nav-item has-dropdown">
          <a href="/센터소개.html" class="nav-link">센터소개</a>
          <div class="dropdown-menu">
            <a href="/운영철학.html">운영철학</a>
            <a href="/시설안내.html">시설 안내</a>
            <a href="/오시는길.html">오시는 길</a>
          </div>
        </div>

        <div class="nav-item has-dropdown">
          <a href="/이용안내.html" class="nav-link">이용안내</a>
          <div class="dropdown-menu">
            <a href="/입소절차.html">입소 절차</a>
            <a href="/비용안내.html">비용 안내</a>
            <a href="/FAQ.html">자주 묻는 질문</a>
          </div>
        </div>

        <div class="nav-item has-dropdown">
          <a href="/프로그램.html" class="nav-link">프로그램</a>
          <div class="dropdown-menu">
            <a href="/건강관리.html">건강관리</a>
            <a href="/인지활동.html">인지활동</a>
            <a href="/정서사회교류.html">정서·사회교류</a>
            <a href="/주간일정표.html">주간 일정표</a>
          </div>
        </div>

        <div class="nav-item has-dropdown">
          <a href="/소식.html" class="nav-link">소식</a>
          <div class="dropdown-menu">
            <a href="/공지사항.html">공지사항</a>
            <a href="/활동사진.html">활동사진</a>
          </div>
        </div>

        <div class="nav-item has-dropdown">
          <a href="/상담안내.html" class="nav-link">상담</a>
          <div class="dropdown-menu">
            <a href="/상담안내.html">상담 안내</a>
            <a href="/문의하기.html">문의하기</a>
          </div>
        </div>
      </nav>
    </div>

    <div class="floating-buttons">
      <a href="tel:16668853" class="floating-btn">📞 전화 상담</a>
      <button
        id="careOpenLocationMenu"
        class="floating-btn"
        type="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        📍 위치 보기
      </button>

      <div id="careLocationMenu" class="care-location-menu" role="menu">
        <a id="linkDaycare" href="https://map.naver.com/" role="menuitem" target="_blank" rel="noopener noreferrer">더수원주간보호</a>
        <a id="linkNursing" href="https://map.naver.com/" role="menuitem" target="_blank" rel="noopener noreferrer">더수원요양원</a>
      </div>
    </div>

    <footer class="site-footer">
      <div class="site-footer-inner">
        <p class="footer-title">더수원 어르신 통합케어</p>
        <p class="footer-text">수원 주간보호·요양원 | 상담전화 1666-8853</p>
        <p class="footer-text">본 사이트의 사진·문구·디자인 무단 복제 및 무단 사용을 금합니다.</p>
        <p class="footer-copy">© 2026 더수원. All rights reserved.</p>
      </div>
    </footer>
  `;

  initLayout();
});