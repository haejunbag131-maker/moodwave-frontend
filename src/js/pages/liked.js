import { renderSidebar, initSidebar } from "../components/sidebar.js";
import { renderHeader, initHeader } from "../components/header.js";
import { renderFooter, initFooter } from "../components/footer.js";

import { renderHome, initHome } from "./home.js";
import { renderSearch, initSearch } from "./search.js";
import { renderLatestPage, initLatestPage } from "./latest.js";
import { renderPlaylistPage, initPlaylistPage } from "./playlist.js";
import { renderPopularPage, initPopularPage } from "./popular.js";

import { isLoggedIn } from "../utils/auth.js";
import { initToast } from "../utils/toast.js";

// =========================
// 로그인이 필요한 페이지 목록
// =========================
const protectedRoutes = ["#/search", "#/latest", "#/popular", "#/playlist"];

// =========================
// 보호 페이지 여부 확인 함수
// =========================
function isProtectedRoute(hash) {
  return protectedRoutes.some((route) => hash.startsWith(route));
}

// =========================
// 페이지 라우터 함수
// =========================
async function router() {
  const main = document.querySelector("#main");
  const hash = location.hash || "#/home";

  if (!main) return;

  // 로그인 필요한 페이지 접근 제한
  if (isProtectedRoute(hash)) {
    const loggedIn = await isLoggedIn();

    if (!loggedIn) {
      alert("로그인 후 이용할 수 있습니다.");
      location.hash = "#/home";
      return;
    }
  }
}

// =========================
// 초기 실행 함수
// =========================
function init() {
  const sidebar = document.querySelector("#sidebar");
  const header = document.querySelector("#header");
  const footer = document.querySelector("#footer");

  if (!sidebar || !header || !footer) return;

  // 공통 레이아웃 HTML 렌더링
  sidebar.innerHTML = renderSidebar();
  header.innerHTML = renderHeader();
  footer.innerHTML = renderFooter();

  // 공통 기능 실행
  initSidebar();
  initHeader();
  initFooter();

  // 현재 페이지 렌더링
  router();

  // hash 변경 시 메인 영역만 변경
  window.addEventListener("hashchange", router);
}

initToast();
init();
