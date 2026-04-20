function initLayout() {
  // 모바일 드롭다운 열기/닫기
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

  // 바깥 클릭 시 드롭다운 닫기
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-dropdown').forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
      }
    });
  });

  // 위치보기 플로팅 메뉴
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
  const headerRoot = document.getElementById('site-header');
  const footerRoot = document.getElementById('site-footer');

  if (headerRoot) {
    headerRoot.innerHTML = `
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

        <div
          id="careLocationMenu"
          class="care-location-menu"
          role="menu"
        >
          <a
            id="linkDaycare"
            href="https://map.naver.com/p/entry/place/2041796109"
            role="menuitem"
            target="_blank"
            rel="noopener noreferrer"
          >
            더수원주간보호
          </a>
          <a
            id="linkNursing"
            href="https://map.naver.com/p/entry/place/1286446205"
            role="menuitem"
            target="_blank"
            rel="noopener noreferrer"
          >
            더수원요양원
          </a>
        </div>
      </div>
    `;
  }

  if (footerRoot) {
    footerRoot.innerHTML = `
      <div style="
        text-align:center;
        line-height:1.75;
        font-size:13.5px;
        color:#666;
        padding:24px 12px;
        border-top:1px solid #e5e5e5;
        background:#fafafa;
        margin-top:60px;
      ">
        <p style="margin:0 0 6px;">
          <strong style="color:#444;">사업장명</strong><br>
          더수원 어르신 주간보호 · 더수원 어르신 요양원
        </p>

        <p style="margin:0 0 6px;">
          <strong style="color:#444;">주소</strong><br>
          경기도 수원시 팔달구 정조로 804 5층 · 경기도 수원시 팔달구 중부대로 125번길 14 (지동)
        </p>

        <p style="margin:0;">
          <strong style="color:#444;">대표번호</strong><br>
          <a href="tel:16668853" style="color:#2e7d32; text-decoration:none; font-weight:500;">
            1666-8853
          </a>
        </p>

        <p style="
          margin:16px 0 0;
          font-size:12.5px;
          color:#888;
        ">
          Copyright © 2025–Present<br>
          Thesuwonsilver. All Rights Reserved.
        </p>
      </div>
    `;
  }

  initLayout();
});