function initLayout() {
  // 위치보기 플로팅 메뉴
  const openBtn = document.getElementById('careOpenLocationMenu');
  const menu = document.getElementById('careLocationMenu');

  if (openBtn && menu) {
    openBtn.addEventListener('click', function (e) {
      e.preventDefault();
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

  // 유튜브 팝업 닫기
  const popup = document.getElementById('videoPopup');
  const iframe = document.getElementById('popupVideo');
  const closeBtn = document.querySelector('#videoPopup .closeBtn');

  if (popup && iframe && closeBtn) {
    closeBtn.addEventListener('click', closePopup);

    popup.addEventListener('click', function (e) {
      if (e.target === popup) closePopup();
    });

    function closePopup() {
      iframe.src = '';
      popup.style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const headerRoot = document.getElementById('site-header');
  const footerRoot = document.getElementById('site-footer');

  if (headerRoot) {
    headerRoot.innerHTML = `
      <div class="top-nav-wrap">
        <div class="top-nav-inner">

          <a href="/index.html" class="site-brand" aria-label="더수원 홈으로 이동">
            <img
              src="/images/ds-logo.png"
              alt="더수원 로고"
              class="site-brand-logo"
            />
            <span class="site-brand-text">더수원</span>
          </a>

          <nav class="top-nav">
            <a href="/index.html">홈</a>

            <div class="nav-item has-dropdown">
              <a href="/운영철학.html" class="nav-link">센터소개</a>
              <div class="dropdown-menu">
                <a href="/운영철학.html">운영철학</a>
                <a href="/시설안내.html">시설 안내</a>
                <a href="/오시는길.html">오시는 길</a>
              </div>
            </div>

            <div class="nav-item has-dropdown">
              <a href="/입소절차.html" class="nav-link">이용안내</a>
              <div class="dropdown-menu">
                <a href="/입소절차.html">입소 절차</a>
                <a href="/비용안내.html">비용 안내</a>
                <a href="/FAQ.html">자주 묻는 질문</a>
              </div>
            </div>

            <div class="nav-item has-dropdown">
              <a href="/건강관리.html" class="nav-link">프로그램</a>
              <div class="dropdown-menu">
                <a href="/건강관리.html">건강관리</a>
                <a href="/인지활동.html">인지활동</a>
                <a href="/정서사회교류.html">정서·사회교류</a>
                <a href="/주간일정표.html">주간 일정표</a>
              </div>
            </div>

            <div class="nav-item has-dropdown">
              <a href="/공지사항.html" class="nav-link">소식</a>
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
      </div>

      <div class="floating-buttons">
        <a href="tel:16668853" class="floating-btn floating-btn--green">
          <span class="floating-btn__icon">📞</span>
          <span class="floating-btn__text">전화 상담</span>
        </a>

        <a
          href="https://blog.naver.com/thesuwonsilver"
          class="floating-btn floating-btn--ivory"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="floating-btn__icon">📝</span>
          <span class="floating-btn__text">더수원 블로그</span>
        </a>

        <button
          id="careOpenLocationMenu"
          class="floating-btn floating-btn--green"
          type="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="floating-btn__icon">📍</span>
          <span class="floating-btn__text">위치 보기</span>
        </button>

        <div id="careLocationMenu" class="care-location-menu" role="menu">
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

  // 유튜브 팝업
  if (!document.getElementById('videoPopupStyle')) {
    const style = document.createElement('style');
    style.id = 'videoPopupStyle';
    style.textContent = `
      #videoPopup{
        position:fixed;
        inset:0;
        width:100vw;
        height:100vh;
        background:rgba(0,0,0,0.9);
        display:none;
        justify-content:center;
        align-items:center;
        z-index:99999;
      }

      #videoPopup .videoWrap{
        position:relative;
        width:95vw;
        height:75vh;
        max-width:1200px;
        max-height:85vh;
        overflow:hidden;
        border-radius:8px;
      }

      #videoPopup iframe{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        border:0;
      }

      #videoPopup .closeBtn{
        position:absolute;
        top:calc(18px + env(safe-area-inset-top));
        right:calc(18px + env(safe-area-inset-right));
        font-size:36px;
        color:#fff;
        background:rgba(0,0,0,0.6);
        padding:8px 12px;
        border-radius:6px;
        cursor:pointer;
        z-index:10;
        line-height:1;
      }

      @media (max-width:768px){
        #videoPopup .videoWrap{
          width:100vw;
          height:100vh;
          max-width:none;
          max-height:none;
          border-radius:0;
        }

        #videoPopup iframe{
          transform:scale(1.25);
          transform-origin:center;
        }
      }

      @media (max-width:380px){
        #videoPopup iframe{
          transform:scale(1.35);
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (!document.getElementById('videoPopup')) {
    const popup = document.createElement('div');
    popup.id = 'videoPopup';
    popup.innerHTML = `
      <div class="closeBtn">✕</div>
      <div class="videoWrap">
        <iframe
          id="popupVideo"
          src="https://www.youtube.com/embed/Q85KCCnUpww?autoplay=1&mute=1&playsinline=1"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    `;
    document.body.appendChild(popup);

    if (!sessionStorage.getItem('videoPopupShown')) {
      popup.style.display = 'flex';
      sessionStorage.setItem('videoPopupShown', 'yes');
    }
  }

  initLayout();
});