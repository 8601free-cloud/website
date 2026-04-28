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

    if (!link) return;

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

    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
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
              width="72"
              height="72"
              decoding="async"
            />
            <span class="site-brand-text">더수원</span>
          </a>

          <nav class="top-nav" aria-label="주요 메뉴">
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

      <div class="floating-buttons" aria-label="빠른 상담 메뉴">
        <a href="tel:16668853" class="floating-btn" aria-label="1666-8853 전화 문의하기">
          <span class="floating-btn__icon" aria-hidden="true">📞</span>
          <span class="floating-btn__text">문의하기</span>
        </a>

        <a
          href="https://blog.naver.com/thesuwonsilver"
          class="floating-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="더수원 블로그 새 창으로 열기"
        >
          <span class="floating-btn__icon" aria-hidden="true">📝</span>
          <span class="floating-btn__text">블로그</span>
        </a>

        <button
          id="careOpenLocationMenu"
          class="floating-btn"
          type="button"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="더수원 위치 선택 메뉴 열기"
        >
          <span class="floating-btn__icon" aria-hidden="true">📍</span>
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
      <div class="site-footer-inner" style="
        text-align:center;
        line-height:1.75;
        font-size:13.5px;
        color:#666;
        padding:24px 12px calc(24px + env(safe-area-inset-bottom));
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
          <a href="tel:16668853" style="color:#2e7d32; text-decoration:none; font-weight:700;">
            1666-8853
          </a>
        </p>

        <p style="margin:16px 0 0; font-size:12.5px; color:#888;">
          Copyright © 2025–Present<br>
          Thesuwonsilver. All Rights Reserved.
        </p>
      </div>
    `;
  }

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

  const ogDefaults = {
    'og:type': 'website',
    'og:site_name': '더수원 어르신 통합케어',
    'og:image': 'https://thesuwon.com/og-image.jpg',
    'twitter:card': 'summary_large_image'
  };

  Object.entries(ogDefaults).forEach(function ([property, content]) {
    const attr = property.startsWith('og:') ? 'property' : 'name';

    if (!document.querySelector(`meta[${attr}="${property}"]`)) {
      const meta = document.createElement('meta');
      meta.setAttribute(attr, property);
      meta.content = content;
      head.appendChild(meta);
    }
  });

  if (!document.querySelector('script[data-schema="thesuwon-localbusiness"]')) {
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.dataset.schema = 'thesuwon-localbusiness';

    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: '더수원 어르신 통합케어',
      alternateName: [
        '더수원 주간보호',
        '더수원주간보호',
        '더수원 요양원',
        '더수원요양원',
        '수원 주간보호',
        '팔달구 주간보호',
        '수원 요양원',
        '팔달구 요양원'
      ],
      url: 'https://thesuwon.com',
      telephone: '1666-8853',
      areaServed: [
        '수원시',
        '수원 팔달구',
        '팔달구',
        '지동',
        '행궁동',
        '인계동',
        '우만동',
        '매교동',
        '화서동'
      ],
      knowsAbout: [
        '수원 주간보호',
        '팔달구 주간보호',
        '수원 주간보호센터',
        '노인 주간보호',
        '수원 요양원',
        '팔달구 요양원',
        '장기요양보험',
        '치매 어르신 케어'
      ],
      department: [
        {
          '@type': 'LocalBusiness',
          name: '더수원 주간보호',
          telephone: '1666-8853',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '정조로 804 5층',
            addressLocality: '수원시 팔달구',
            addressRegion: '경기도',
            addressCountry: 'KR'
          }
        },
        {
          '@type': 'LocalBusiness',
          name: '더수원 요양원',
          telephone: '1666-8853',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '중부대로125번길 14',
            addressLocality: '수원시 팔달구 지동',
            addressRegion: '경기도',
            addressCountry: 'KR'
          }
        }
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: '수원시 팔달구',
        addressRegion: '경기도',
        addressCountry: 'KR'
      }
    });

    head.appendChild(schema);
  }
})();