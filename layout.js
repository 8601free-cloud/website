function initLayout() {
  const openBtn = document.getElementById('careOpenLocationMenu');
  const menu = document.getElementById('careLocationMenu');

  function isMobileNav() {
    return window.matchMedia(
      '(max-width: 900px), (hover: none), (pointer: coarse)'
    ).matches;
  }

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
    openBtn.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (menu.classList.contains('open')) {
        closeLocationMenu();
      } else {
        openLocationMenu();
      }
    });

    menu.addEventListener('click', function (event) {
      event.stopPropagation();

      if (event.target.closest('a')) {
        closeLocationMenu();
      }
    });

    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target) && !openBtn.contains(event.target)) {
        closeLocationMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeLocationMenu();
        openBtn.focus();
      }
    });
  }

  const floatingGroup = document.querySelector('.floating-buttons');
  let scrollTimer = null;

  if (floatingGroup) {
    window.addEventListener(
      'scroll',
      function () {
        floatingGroup.classList.add('dimmed');

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          floatingGroup.classList.remove('dimmed');
        }, 260);
      },
      { passive: true }
    );
  }

  const dropdownItems = document.querySelectorAll(
    '.nav-item.has-dropdown'
  );

  function closeAllDropdowns() {
    dropdownItems.forEach(function (item) {
      item.classList.remove('open');

      const link = item.querySelector('.nav-link');

      if (link) {
        link.setAttribute('aria-expanded', 'false');
      }
    });
  }

  dropdownItems.forEach(function (item) {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');

    if (!link || !dropdown) return;

    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');

    link.addEventListener('click', function (event) {
      if (!isMobileNav()) return;

      event.preventDefault();
      event.stopPropagation();

      const isOpen = item.classList.contains('open');

      closeAllDropdowns();

      if (!isOpen) {
        item.classList.add('open');
        link.setAttribute('aria-expanded', 'true');
      }
    });

    dropdown.addEventListener('click', function (event) {
      event.stopPropagation();

      if (event.target.closest('a')) {
        closeAllDropdowns();
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.nav-item.has-dropdown')) {
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeAllDropdowns();
      closeLocationMenu();
    }
  });

  const images = document.querySelectorAll('img:not([loading])');

  images.forEach(function (image) {
    const isLogo = image.classList.contains('site-brand-logo');
    const isHero =
      image.closest('[class*="hero"]') ||
      image.closest('[class*="visual"]') ||
      image.closest('[class*="banner"]');

    if (!isLogo && !isHero) {
      image.setAttribute('loading', 'lazy');
    }

    if (!image.hasAttribute('decoding')) {
      image.setAttribute('decoding', 'async');
    }
  });
}

function openAdmissionTabFromUrl() {
  const path = decodeURIComponent(window.location.pathname);
  const target = window.location.hash.replace('#', '').toLowerCase();

  if (!path.endsWith('/입소안내.html') || target !== 'daycare') {
    return;
  }

  const daycareTab = document.querySelector(
    '#dsw-admission-desktop .dsw-admission-tab[data-tab="daycare"]'
  );

  if (daycareTab) {
    daycareTab.click();
  }
}

function injectFavicon() {
  const head = document.head;

  if (!head) return;

  const faviconPNG = '/favicon.png?v=5';

  document.querySelectorAll('link[rel*="icon"]').forEach(function (element) {
    element.remove();
  });

  const png = document.createElement('link');
  png.rel = 'icon';
  png.href = faviconPNG;
  png.type = 'image/png';
  head.appendChild(png);

  const shortcut = document.createElement('link');
  shortcut.rel = 'shortcut icon';
  shortcut.href = faviconPNG;
  shortcut.type = 'image/png';
  head.appendChild(shortcut);

  const apple = document.createElement('link');
  apple.rel = 'apple-touch-icon';
  apple.href = faviconPNG;
  head.appendChild(apple);

  let themeColor = document.querySelector('meta[name="theme-color"]');

  if (!themeColor) {
    themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    head.appendChild(themeColor);
  }

  themeColor.content = '#fffaf0';
}


function injectAdminNavStyle() {
  if (document.getElementById('dsw-admin-nav-style')) return;

  const style = document.createElement('style');
  style.id = 'dsw-admin-nav-style';
  style.textContent = `
    .nav-admin-login{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      min-height:38px;
      margin-left:4px;
      padding:0 14px;
      border:1px solid rgba(58,106,75,.22);
      border-radius:999px;
      background:linear-gradient(145deg,rgba(58,106,75,.12),rgba(58,106,75,.06));
      color:#2f5a40 !important;
      font-size:13px;
      font-weight:800;
      line-height:1;
      text-decoration:none !important;
      white-space:nowrap;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.55);
      transition:transform .18s ease,background .18s ease,box-shadow .18s ease;
    }

    .nav-admin-login:hover{
      transform:translateY(-1px);
      background:linear-gradient(145deg,#3a6a4b,#2f5a40);
      color:#fff !important;
      box-shadow:0 8px 18px rgba(47,90,64,.18);
    }

    body.theme-night .nav-admin-login{
      border-color:rgba(241,182,109,.28);
      background:rgba(241,182,109,.11);
      color:#f1b66d !important;
    }

    body.theme-night .nav-admin-login:hover{
      background:linear-gradient(145deg,#f1b66d,#d97891);
      color:#2d1830 !important;
      box-shadow:0 8px 20px rgba(241,182,109,.18);
    }

    @media (max-width:900px){
      .nav-admin-login{
        margin-left:0;
      }
    }
  `;

  document.head.appendChild(style);
}

function injectTrackingScript() {
  if (
    document.querySelector(
      'script[data-thesuwon-tracking="true"]'
    )
  ) {
    return;
  }

  const trackingScript = document.createElement('script');

  trackingScript.src = '/tracking.js?v=1';
  trackingScript.defer = true;
  trackingScript.dataset.thesuwonTracking = 'true';

  document.body.appendChild(trackingScript);
}

/* =========================================
   어르신 돌봄 평가 + 낮/밤 테마
   ========================================= */

const DSW_CARE_TYPE_KEY = 'dswCareType';
const DSW_CARE_RESULT_KEY = 'dswCareAssessmentResult';
const DSW_CARE_DISMISSED_KEY =
  'dswCareDismissedThisSession';

const DSW_CARE_BASE_QUESTIONS = [
  {
    id: 'daytimeAlone',
    text: '어르신이 낮 동안 혼자 계시는 시간이 긴가요?',
    options: [
      {
        label: '거의 혼자 계시지 않아요',
        value: 0
      },
      {
        label: '하루 중 일부 시간 혼자 계세요',
        value: 1
      },
      {
        label: '대부분의 낮 시간을 혼자 계세요',
        value: 2
      }
    ]
  },
  {
    id: 'dailySupport',
    text: '식사·복약·이동·화장실 이용에 어느 정도 도움이 필요한가요?',
    options: [
      {
        label: '대부분 스스로 가능해요',
        value: 0
      },
      {
        label: '일부 도움이 필요해요',
        value: 1
      },
      {
        label: '대부분의 활동에 도움이 필요해요',
        value: 2
      }
    ]
  },
  {
    id: 'nightRisk',
    text: '밤에 배회하거나 넘어질 위험, 수면 중 돌봄 필요가 있나요?',
    options: [
      {
        label: '거의 없어요',
        value: 0,
        nightRisk: false
      },
      {
        label: '가끔 있어요',
        value: 2,
        nightRisk: false
      },
      {
        label: '자주 있어 지속적인 확인이 필요해요',
        value: 3,
        nightRisk: true
      }
    ]
  },
  {
    id: 'familyCare',
    text: '가족이 야간과 주말에도 계속 돌보기 어려운 상황인가요?',
    options: [
      {
        label: '가족 돌봄이 충분히 가능해요',
        value: 0
      },
      {
        label: '일부 시간은 어려워요',
        value: 1
      },
      {
        label: '야간과 주말 돌봄이 많이 어려워요',
        value: 2
      }
    ]
  },
  {
    id: 'continuousCare',
    text: '하루 동안 지속적인 관찰이나 건강 확인이 필요한가요?',
    options: [
      {
        label: '정기적인 확인 정도면 충분해요',
        value: 0
      },
      {
        label: '낮 시간 동안 자주 확인해야 해요',
        value: 1
      },
      {
        label: '밤낮으로 지속적인 확인이 필요해요',
        value: 3
      }
    ]
  }
];

const DSW_CARE_EXTRA_QUESTIONS = [
  {
    id: 'homeSleep',
    text: '현재처럼 집에서 주무시는 생활을 안전하게 유지할 수 있나요?',
    options: [
      {
        label: '안전하게 유지할 수 있어요',
        value: -1
      },
      {
        label: '조금 불안하지만 가족 도움으로 가능해요',
        value: 1
      },
      {
        label: '집에서의 야간 생활 유지가 어려워요',
        value: 3
      }
    ]
  },
  {
    id: 'morningEveningCare',
    text: '가족이 아침과 저녁 시간에는 돌봄을 제공할 수 있나요?',
    options: [
      {
        label: '대부분 제공할 수 있어요',
        value: -1
      },
      {
        label: '일부 시간만 가능해요',
        value: 1
      },
      {
        label: '아침과 저녁에도 돌보기 어려워요',
        value: 2
      }
    ]
  }
];

function getStoredCareType() {
  try {
    return localStorage.getItem(DSW_CARE_TYPE_KEY);
  } catch (error) {
    return null;
  }
}

function updateThemeColor(careType) {
  let themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (!themeColor) {
    themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    document.head.appendChild(themeColor);
  }

  themeColor.content =
    careType === 'nursing' ? '#0f291f' : '#fffaf0';
}

function applyCareTheme(careType) {
  if (!document.body) return;

  const normalizedType =
    careType === 'nursing' ? 'nursing' : 'daycare';

  document.body.classList.remove(
    'theme-day',
    'theme-night'
  );

  document.body.classList.add(
    normalizedType === 'nursing'
      ? 'theme-night'
      : 'theme-day'
  );

  document.body.dataset.careType = normalizedType;

  updateThemeColor(normalizedType);
}

function saveCareResult(careType, score, answers) {
  try {
    localStorage.setItem(
      DSW_CARE_TYPE_KEY,
      careType
    );

    localStorage.setItem(
      DSW_CARE_RESULT_KEY,
      JSON.stringify({
        careType: careType,
        score: score,
        completedAt: new Date().toISOString(),
        answers: answers
      })
    );
  } catch (error) {
    console.warn('평가 결과를 저장하지 못했습니다.', error);
  }
}

function injectCareAssessmentMarkup() {
  if (document.getElementById('dswCareModal')) {
    return;
  }

  document.body.insertAdjacentHTML(
    'beforeend',
    `
      <div
        id="dswCareModal"
        class="dsw-care-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dswCareTitle"
        aria-describedby="dswCareDescription"
        hidden
      >
        <div
          class="dsw-care-backdrop"
          data-care-close
        ></div>

        <div
          class="dsw-care-dialog"
          tabindex="-1"
        >
          <button
            class="dsw-care-close"
            type="button"
            aria-label="평가 닫기"
            data-care-close
          >
            ×
          </button>

          <section id="dswCareIntro">
            <p class="dsw-care-eyebrow">
              더수원 1분 돌봄 안내
            </p>

            <h2
              id="dswCareTitle"
              class="dsw-care-title"
            >
              우리 어르신께 어떤 돌봄이 적합할까요?
            </h2>

            <p
              id="dswCareDescription"
              class="dsw-care-description"
            >
              간단한 질문을 통해 주간보호와 요양원 중
              더 적합해 보이는 상담 방향을 안내해드립니다.
            </p>

            <div class="dsw-care-actions">
              <button
                id="dswCareStart"
                class="dsw-care-button dsw-care-button--primary"
                type="button"
              >
                간단 평가 시작
              </button>

              <button
                class="dsw-care-button"
                type="button"
                data-care-close
              >
                평가 없이 둘러보기
              </button>
            </div>

            <p class="dsw-care-disclaimer">
              이 결과는 의료적 진단이나 장기요양등급
              판정이 아닌 상담 방향 안내용입니다.
            </p>
          </section>

          <section
            id="dswCareQuiz"
            hidden
          >
            <div
              class="dsw-care-progress"
              aria-hidden="true"
            >
              <span id="dswCareProgressBar"></span>
            </div>

            <p
              id="dswCareStepLabel"
              class="dsw-care-step-label"
              aria-live="polite"
            ></p>

            <h2
              id="dswCareQuestion"
              class="dsw-care-question"
            ></h2>

            <div
              id="dswCareOptions"
              class="dsw-care-options"
            ></div>
          </section>

          <section
            id="dswCareResult"
            hidden
            aria-live="polite"
          >
            <div class="dsw-care-result">
              <span
                id="dswCareResultBadge"
                class="dsw-care-result-badge"
              ></span>

              <h2
                id="dswCareResultTitle"
                class="dsw-care-result-title"
              ></h2>

              <p
                id="dswCareResultCopy"
                class="dsw-care-result-copy"
              ></p>

              <div class="dsw-care-actions">
                <a
                  id="dswCareResultLink"
                  class="dsw-care-button dsw-care-button--primary"
                  href="/상담안내.html"
                >
                  상담 안내 보기
                </a>

                <button
                  id="dswCareRestart"
                  class="dsw-care-button"
                  type="button"
                >
                  다시 평가하기
                </button>
              </div>
            </div>

            <p class="dsw-care-disclaimer">
              어르신의 건강 상태와 가족의 돌봄 환경에 따라
              실제 상담 결과는 달라질 수 있습니다.
            </p>
          </section>
        </div>
      </div>

      <button
        id="dswCareReset"
        class="dsw-care-reset"
        type="button"
      >
        돌봄 유형 다시 확인
      </button>
    `
  );
}

function initCareAssessment() {
  if (
    /\/admin(?:-|\/|$)/i.test(
      window.location.pathname
    )
  ) {
    return;
  }

  injectCareAssessmentMarkup();

  const modal =
    document.getElementById('dswCareModal');

  const dialog =
    modal &&
    modal.querySelector('.dsw-care-dialog');

  const intro =
    document.getElementById('dswCareIntro');

  const quiz =
    document.getElementById('dswCareQuiz');

  const result =
    document.getElementById('dswCareResult');

  const startButton =
    document.getElementById('dswCareStart');

  const resetButton =
    document.getElementById('dswCareReset');

  const restartButton =
    document.getElementById('dswCareRestart');

  const progressBar =
    document.getElementById('dswCareProgressBar');

  const stepLabel =
    document.getElementById('dswCareStepLabel');

  const questionTitle =
    document.getElementById('dswCareQuestion');

  const optionsRoot =
    document.getElementById('dswCareOptions');

  if (
    !modal ||
    !intro ||
    !quiz ||
    !result ||
    !startButton ||
    !progressBar ||
    !stepLabel ||
    !questionTitle ||
    !optionsRoot
  ) {
    return;
  }

  let questions =
    DSW_CARE_BASE_QUESTIONS.slice();

  let currentIndex = 0;
  let score = 0;
  let nightRisk = false;
  let answers = {};
  let lastFocusedElement = null;
  let extraQuestionsAdded = false;

  function setScreen(screen) {
    intro.hidden = screen !== 'intro';
    quiz.hidden = screen !== 'quiz';
    result.hidden = screen !== 'result';
  }

  function openModal(screen) {
    lastFocusedElement = document.activeElement;

    setScreen(screen || 'intro');

    modal.hidden = false;

    document.body.classList.add(
      'dsw-care-modal-open'
    );

    window.requestAnimationFrame(function () {
      if (dialog) {
        dialog.focus();
      }
    });
  }

  function closeModal() {
    modal.hidden = true;

    document.body.classList.remove(
      'dsw-care-modal-open'
    );

    try {
      sessionStorage.setItem(
        DSW_CARE_DISMISSED_KEY,
        'true'
      );
    } catch (error) {
      console.warn(
        '평가 닫기 상태를 저장하지 못했습니다.',
        error
      );
    }

    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus === 'function'
    ) {
      lastFocusedElement.focus();
    }
  }

  function resetAssessment() {
    questions =
      DSW_CARE_BASE_QUESTIONS.slice();

    currentIndex = 0;
    score = 0;
    nightRisk = false;
    answers = {};
    extraQuestionsAdded = false;

    setScreen('intro');
  }

  function renderQuestion() {
    const question = questions[currentIndex];

    if (!question) return;

    const progress = Math.round(
      (currentIndex / questions.length) * 100
    );

    progressBar.style.width = progress + '%';

    stepLabel.textContent =
      currentIndex +
      1 +
      ' / ' +
      questions.length +
      ' 문항';

    questionTitle.textContent = question.text;

    optionsRoot.replaceChildren();

    question.options.forEach(function (option) {
      const button =
        document.createElement('button');

      button.type = 'button';
      button.className = 'dsw-care-option';
      button.textContent = option.label;

      button.addEventListener(
        'click',
        function () {
          score += option.value;

          if (option.nightRisk) {
            nightRisk = true;
          }

          answers[question.id] = option.label;

          currentIndex += 1;

          if (
            currentIndex ===
              DSW_CARE_BASE_QUESTIONS.length &&
            !extraQuestionsAdded &&
            score >= 6 &&
            score <= 8
          ) {
            questions = questions.concat(
              DSW_CARE_EXTRA_QUESTIONS
            );

            extraQuestionsAdded = true;
          }

          if (currentIndex >= questions.length) {
            showResult();
          } else {
            renderQuestion();
          }
        }
      );

      optionsRoot.appendChild(button);
    });

    const firstOption =
      optionsRoot.querySelector('button');

    if (firstOption) {
      firstOption.focus();
    }
  }

  function showResult() {
    const careType =
      nightRisk || score >= 9
        ? 'nursing'
        : 'daycare';

    const badge =
      document.getElementById(
        'dswCareResultBadge'
      );

    const title =
      document.getElementById(
        'dswCareResultTitle'
      );

    const copy =
      document.getElementById(
        'dswCareResultCopy'
      );

    const link =
      document.getElementById(
        'dswCareResultLink'
      );

    saveCareResult(
      careType,
      score,
      answers
    );

    applyCareTheme(careType);

    progressBar.style.width = '100%';

    if (careType === 'nursing') {
      badge.textContent =
        '24시간 돌봄 상담 권장';

      title.textContent =
        '요양원 상담이 더 적합해 보입니다';

      copy.textContent =
        '야간을 포함해 지속적인 관찰과 생활 지원이 필요한 답변이 확인되었습니다. 어르신의 실제 상태를 상담을 통해 자세히 확인해보세요.';

      link.href = '/입소안내.html';

      link.textContent =
        '요양원 입소 안내 보기';
    } else {
      badge.textContent =
        '낮 시간 주간보호 이용 권장';

      title.textContent =
        '주간보호 이용이 더 적합해 보입니다';

      copy.textContent =
        '집에서의 생활을 유지하면서 낮 시간 동안 식사·인지활동·건강관리와 안전한 돌봄을 받는 방향이 적합해 보입니다.';

      link.href = '/입소안내.html#daycare';

      link.textContent =
        '주간보호 입소 안내 보기';
    }

    setScreen('result');
  }

  startButton.addEventListener(
    'click',
    function () {
      resetAssessment();
      setScreen('quiz');
      renderQuestion();
    }
  );

  if (restartButton) {
    restartButton.addEventListener(
      'click',
      function () {
        resetAssessment();
        setScreen('quiz');
        renderQuestion();
      }
    );
  }

  if (resetButton) {
    resetButton.addEventListener(
      'click',
      function () {
        resetAssessment();
        openModal('intro');
      }
    );
  }

  modal
    .querySelectorAll('[data-care-close]')
    .forEach(function (button) {
      button.addEventListener(
        'click',
        closeModal
      );
    });

  modal.addEventListener(
    'keydown',
    function (event) {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        modal.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(function (element) {
        return !element.closest('[hidden]');
      });

      if (!focusable.length) return;

      const first = focusable[0];
      const last =
        focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  );

  const storedCareType =
    getStoredCareType();

  applyCareTheme(storedCareType);

  let dismissedThisSession = false;

  try {
    dismissedThisSession =
      sessionStorage.getItem(
        DSW_CARE_DISMISSED_KEY
      ) === 'true';
  } catch (error) {
    dismissedThisSession = false;
  }

  if (
    !storedCareType &&
    !dismissedThisSession
  ) {
    openModal('intro');
  }
}

/* =========================================
   공통 헤더·푸터 실행
   ========================================= */

document.addEventListener(
  'DOMContentLoaded',
  function () {
    injectFavicon();
    injectAdminNavStyle();

    const headerRoot =
      document.getElementById('site-header');

    const footerRoot =
      document.getElementById('site-footer');

    if (headerRoot) {
      headerRoot.innerHTML = `
        <div class="top-nav-wrap">
          <div class="top-nav-inner">
            <a
              href="/index.html"
              class="site-brand"
              aria-label="더수원 홈으로 이동"
            >
              <img
                src="/logo.png"
                alt="더수원 로고"
                class="site-brand-logo"
                width="72"
                height="72"
                decoding="async"
              >
              <span class="site-brand-text">
                더수원
              </span>
            </a>

            <nav
              class="top-nav"
              aria-label="주요 메뉴"
            >
              <a href="/index.html">홈</a>

              <div class="nav-item has-dropdown">
                <a
                  href="/운영철학.html"
                  class="nav-link"
                >
                  센터소개
                </a>

                <div class="dropdown-menu">
                  <a href="/운영철학.html">
                    운영철학
                  </a>
                  <a href="/시설안내.html">
                    시설 안내
                  </a>
                  <a href="/오시는길.html">
                    오시는 길
                  </a>
                </div>
              </div>

              <div class="nav-item has-dropdown">
                <a
                  href="/입소안내.html"
                  class="nav-link"
                >
                  이용안내
                </a>

                <div class="dropdown-menu">
                  <a href="/입소안내.html">
                    입소 안내
                  </a>
                  <a href="/비용안내.html">
                    비용 안내
                  </a>
                  <a href="/FAQ.html">
                    자주 묻는 질문
                  </a>
                </div>
              </div>

              <div class="nav-item has-dropdown">
                <a
                  href="/건강관리.html"
                  class="nav-link"
                >
                  프로그램
                </a>

                <div class="dropdown-menu">
                  <a href="/건강관리.html">
                    건강관리
                  </a>
                  <a href="/인지활동.html">
                    인지활동
                  </a>
                  <a href="/정서 사회교류.html">
                    정서·사회교류
                  </a>
                  <a href="/주간일정표.html">
                    주간 일정표
                  </a>
                </div>
              </div>

              <div class="nav-item has-dropdown">
                <a
                  href="/공지사항.html"
                  class="nav-link"
                >
                  소식
                </a>

                <div class="dropdown-menu">
                  <a href="/공지사항.html">
                    공지사항
                  </a>
                  <a href="/활동사진.html">
                    활동사진
                  </a>
                  <a href="/영상소식.html">
                    영상 소식
                  </a>
                </div>
              </div>

              <div class="nav-item has-dropdown">
                <a
                  href="/상담안내.html"
                  class="nav-link"
                >
                  상담
                </a>

                <div class="dropdown-menu">
                  <a href="/상담안내.html">
                    상담 안내
                  </a>
                  <a href="/문의하기.html">
                    문의하기
                  </a>
                </div>
              </div>

              <a
                href="/영상소식.html?admin=1&login=1"
                class="nav-admin-login"
                aria-label="더수원 영상 관리자 로그인"
              >
                관리자 로그인
              </a>
            </nav>
          </div>
        </div>

        <div
          class="floating-buttons"
          aria-label="빠른 상담 메뉴"
        >
          <a
            href="tel:16668853"
            class="floating-btn"
            aria-label="1666-8853 전화 문의하기"
            data-track-click="phone_click"
          >
            <span
              class="floating-btn__icon"
              aria-hidden="true"
            >
              📞
            </span>

            <span class="floating-btn__text">
              문의하기
            </span>
          </a>

          <a
            href="https://blog.naver.com/thesuwonsilver"
            class="floating-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="더수원 블로그 새 창으로 열기"
            data-track-click="blog_click"
          >
            <span
              class="floating-btn__icon"
              aria-hidden="true"
            >
              📝
            </span>

            <span class="floating-btn__text">
              블로그
            </span>
          </a>

          <button
            id="careOpenLocationMenu"
            class="floating-btn"
            type="button"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="더수원 위치 선택 메뉴 열기"
            data-track-click="location_menu_open"
          >
            <span
              class="floating-btn__icon"
              aria-hidden="true"
            >
              📍
            </span>

            <span class="floating-btn__text">
              위치 보기
            </span>
          </button>

          <div
            id="careLocationMenu"
            class="care-location-menu"
            role="menu"
            aria-labelledby="careOpenLocationMenu"
          >
            <div class="care-location-menu-title">
              위치 선택
            </div>

            <a
              id="linkDaycare"
              class="care-location-link"
              href="https://map.naver.com/p/entry/place/2041796109"
              role="menuitem"
              target="_blank"
              rel="noopener noreferrer"
              data-track-click="daycare_map_click"
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
              data-track-click="nursing_map_click"
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
        <div
          class="site-footer-inner"
          style="
            text-align:center;
            line-height:1.75;
            font-size:13.5px;
            color:var(--dsw-text-soft);
            padding:24px 12px calc(24px + env(safe-area-inset-bottom));
            border-top:1px solid var(--dsw-border);
            background:var(--dsw-surface);
            margin-top:60px;
          "
        >
          <p style="margin:0 0 6px;">
            <strong
              style="color:var(--dsw-text-strong);"
            >
              사업장명
            </strong>
            <br>
            더수원 어르신 주간보호 ·
            더수원 어르신 요양원
          </p>

          <p style="margin:0 0 6px;">
            <strong
              style="color:var(--dsw-text-strong);"
            >
              주소
            </strong>
            <br>
            경기도 수원시 팔달구 정조로 804 5층 ·
            경기도 수원시 팔달구 중부대로125번길 14
            (지동)
          </p>

          <p style="margin:0;">
            <strong
              style="color:var(--dsw-text-strong);"
            >
              대표번호
            </strong>
            <br>

            <a
              href="tel:16668853"
              style="
                color:var(--dsw-accent);
                text-decoration:none;
                font-weight:700;
              "
              data-track-click="footer_phone_click"
            >
              1666-8853
            </a>
          </p>

          <p
            style="
              margin:16px 0 0;
              font-size:12.5px;
              color:var(--dsw-text-soft);
            "
          >
            Copyright © 2025–Present
            <br>
            Thesuwonsilver. All Rights Reserved.
          </p>
        </div>
      `;
    }

    initCareAssessment();
    initLayout();
    openAdmissionTabFromUrl();
    injectTrackingScript();
  }
);

/* =========================================
   SEO 자동 설정
   ========================================= */

(function injectSEO() {
  const head = document.head;

  if (!head) return;

  const cleanPath =
    window.location.pathname.replace(
      /\/index\.html$/,
      '/'
    );

  injectFavicon();

  if (
    !document.querySelector(
      'link[rel="canonical"]'
    )
  ) {
    const canonical =
      document.createElement('link');

    canonical.rel = 'canonical';
    canonical.href =
      window.location.origin + cleanPath;

    head.appendChild(canonical);
  }

  if (
    !document.querySelector(
      'meta[name="robots"]'
    )
  ) {
    const robots =
      document.createElement('meta');

    robots.name = 'robots';
    robots.content = 'index, follow';

    head.appendChild(robots);
  }

  const ogDefaults = {
    'og:type': 'website',
    'og:site_name': '더수원 어르신 통합케어',
    'og:image':
      'https://thesuwon.com/og-image.jpg',
    'twitter:card': 'summary_large_image'
  };

  Object.entries(ogDefaults).forEach(
    function (entry) {
      const property = entry[0];
      const content = entry[1];

      const attribute =
        property.startsWith('og:')
          ? 'property'
          : 'name';

      if (
        !document.querySelector(
          'meta[' +
            attribute +
            '="' +
            property +
            '"]'
        )
      ) {
        const meta =
          document.createElement('meta');

        meta.setAttribute(
          attribute,
          property
        );

        meta.content = content;

        head.appendChild(meta);
      }
    }
  );

  if (
    !document.querySelector(
      'script[data-schema="thesuwon-localbusiness"]'
    )
  ) {
    const schema =
      document.createElement('script');

    schema.type = 'application/ld+json';

    schema.dataset.schema =
      'thesuwon-localbusiness';

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
