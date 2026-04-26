function initLayout() {
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
      }, 300);
    }, { passive: true });
  }

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
              src="/logo.png"
              alt="더수원 로고"
              class="site-brand-logo"
            />
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
              <a href="/입소안내.html" class="nav-link">이용안내</a>
              <div class="dropdown-menu">
                <a href="/입소안내.html">입소 안내</a>
                <a href="/비용안내.html">비용 안내</a>
                <a href="/FAQ.html">자주 묻는 질문</a>
              </div>
            </div>

            <div class="nav-item has-dropdown">
              <a href="/건강관리.html" class="nav-link">프로그램</a>
              <div class="dropdown-menu">
                <a href="/건강관리.html">건강관리</a>
                <a href="/인지활동.html">인지활동</a>
                <a href="/정서 사회교류.html">정서·사회교류</a>
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
        <a href="tel:16668853" class="floating-btn">
          <span class="floating-btn__icon">📞</span>
          <span class="floating-btn__text">문의하기</span>
        </a>

        <a
          href="https://blog.naver.com/thesuwonsilver"
          class="floating-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="floating-btn__icon">📝</span>
          <span class="floating-btn__text">더수원 블로그</span>
        </a>

        <button
          id="careOpenLocationMenu"
          class="floating-btn"
          type="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="floating-btn__icon">📍</span>
          <span class="floating-btn__text">위치 보기</span>
        </button>

        <div id="careLocationMenu" class="care-location-menu" role="menu" aria-labelledby="careOpenLocationMenu">
          <div class="care-location-menu-title">위치 선택</div>

          <a
            id="linkDaycare"
            class="care-location-link"
            href="https://map.naver.com/p/entry/place/2041796109"
            role="menuitem"
            target="_blank"
            rel="noopener noreferrer"
          >
            더수원주간보호
            <small>네이버 지도 열기</small>
          </a>

          <a
            id="linkNursing"
            class="care-location-link"
            href="https://map.naver.com/p/entry/place/1286446205"
            role="menuitem"
            target="_blank"
            rel="noopener noreferrer"
          >
            더수원요양원
            <small>네이버 지도 열기</small>
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
(function injectSEO() {
  const head = document.head;

  // canonical
  if (!document.querySelector('link[rel="canonical"]')) {
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = window.location.origin + window.location.pathname;
    head.appendChild(canonical);
  }

  // robots
  if (!document.querySelector('meta[name="robots"]')) {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "index, follow";
    head.appendChild(robots);
  }

  // Open Graph 기본값
  const ogDefaults = {
    "og:type": "website",
    "og:site_name": "더수원 어르신 통합케어",
    "og:image": "https://thesuwon.com/og-image.jpg",
    "twitter:card": "summary_large_image"
  };

  Object.entries(ogDefaults).forEach(([property, content]) => {
    const attr = property.startsWith("og:") ? "property" : "name";
    if (!document.querySelector(`meta[${attr}="${property}"]`)) {
      const meta = document.createElement("meta");
      meta.setAttribute(attr, property);
      meta.content = content;
      head.appendChild(meta);
    }
  });

  // JSON-LD 구조화 데이터
  if (!document.querySelector('script[type="application/ld+json"]')) {
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "더수원 어르신 통합케어",
      "url": "https://thesuwon.com",
      "telephone": "1666-8853",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "수원",
        "addressRegion": "경기",
        "addressCountry": "KR"
      }
    });
    head.appendChild(schema);
  }
})();