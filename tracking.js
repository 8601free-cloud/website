const SUPABASE_URL = "https://lfnreutlwezdkpzqgqfi.supabase.co";
const SUPABASE_KEY = "sb_publishable_teQk9TxtVO_LNoA4Kww9ZA_9MBi3eSV";

function getUtmValue(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function getDeviceType() {
  const ua = navigator.userAgent || "";

  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return "tablet";
  }

  if (/Mobi|Android|iPhone|iPod/i.test(ua)) {
    return "mobile";
  }

  return "desktop";
}

function getBrowserName() {
  const ua = navigator.userAgent || "";

  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  if (ua.includes("Firefox/")) return "Firefox";

  return "Unknown";
}

async function sendToSupabase(tableName, data) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.warn("Supabase 저장 실패:", tableName, response.status);
    }
  } catch (error) {
    console.warn("Supabase 연결 오류:", error);
  }
}

async function trackVisit() {
  const visitData = {
    page_url: window.location.href,
    page_title: document.title || "",
    referrer: document.referrer || "",
    utm_source: getUtmValue("utm_source"),
    utm_medium: getUtmValue("utm_medium"),
    utm_campaign: getUtmValue("utm_campaign"),
    device_type: getDeviceType(),
    browser: getBrowserName(),
    user_language: navigator.language || "",
    screen_width: window.innerWidth || null,
    screen_height: window.innerHeight || null
  };

  await sendToSupabase("visits", visitData);
}

function trackClicks() {
  document.addEventListener("click", function (e) {
    const target = e.target.closest("[data-track-click]");
    if (!target) return;

    const clickData = {
      event_type: target.dataset.trackClick || "unknown_click",
      page_url: window.location.href,
      button_name:
        target.getAttribute("aria-label") ||
        target.innerText ||
        target.textContent ||
        "",
      referrer: document.referrer || "",
      utm_source: getUtmValue("utm_source")
    };

    sendToSupabase("click_events", clickData);
  });
}

trackVisit();
trackClicks();