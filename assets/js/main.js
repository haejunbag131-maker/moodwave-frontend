// =========================
// 더미 데이터
// =========================
const ICON_PATH = "assets/icon/";

const navItems = [
  {
    label: "Home",
    icon: "Home_Fill_S.svg",
    href: "#",
  },
  {
    label: "Search",
    icon: "Search_S.svg",
    href: "#",
  },
  {
    label: "Your Library",
    icon: "Library_S.svg",
    href: "#",
  },
];

const playlistMenuItems = [
  {
    label: "Create Playlist",
    icon: "+Library_S.svg",
    href: "#",
  },
  {
    label: "Liked Songs",
    icon: "Liked Songs_S.svg",
    href: "#",
  },
];

const playlists = [
  "Chill Mix",
  "Insta Hits",
  "Your Top Songs 2021",
  "Mellow Songs",
  "Anime Lofi & Chillhop Music",
  "BG Afro “Select” Vibes",
  "Afro “Select” Vibes",
  "Happy Hits!",
  "Deep Focus",
  "Instrumental Study",
  "OST Compilations",
  "Nostalgia for old souled mill...",
  "Mixed Feelings",
];

const placeholder = {
  avatar:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34'%3E%3Ccircle cx='17' cy='17' r='17' fill='%23999999'/%3E%3Ccircle cx='17' cy='13' r='5' fill='%23ffffff'/%3E%3Cpath d='M8 28c1.5-5 5-8 9-8s7.5 3 9 8' fill='%23ffffff'/%3E%3C/svg%3E",
  cover56:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23999999'/%3E%3C/svg%3E",
};

const user = {
  name: "HAEJUNPARK",
  avatar: placeholder.avatar,
};

// =========================
// 사이드바
// =========================

// 메뉴 아이템 작성 함수
function createNavItem(item) {
  return `
    <a href="${item.href}" class="sidebar__nav-item">
      <img
        class="sidebar__icon"
        src="${ICON_PATH}${item.icon}"
        width="32"
        height="32"
        alt=""
      />
      <span class="sidebar__label">${item.label}</span>
    </a>
  `;
}

// 메뉴 렌더링 함수
function renderNav() {
  const primaryNav = document.querySelector("#primaryNav");
  const secondaryNav = document.querySelector("#secondaryNav");

  primaryNav.innerHTML = navItems.map(createNavItem).join("");
  secondaryNav.innerHTML = playlistMenuItems.map(createNavItem).join("");
}

// 플레이리스트 목록 렌더링 함수
function renderPlaylists() {
  const playlistList = document.querySelector("#playlistList");

  playlistList.innerHTML = playlists
    .map((playlist) => {
      return `
        <a href="#" class="sidebar__playlist-item">
          ${playlist}
        </a>
      `;
    })
    .join("");
}

// =========================
// 헤더
// =========================

// 유저 렌더링 함수
function renderUser() {
  document.querySelector("#userName").textContent = user.name;
  document.querySelector("#userAvatar").src = user.avatar;
}

// 프로필 드롭 다운
const profile = document.querySelector(".header__profile");
const profileArrowButton = document.querySelector(".header__profile-arrow-btn");

profileArrowButton.addEventListener("click", () => {
  profile.classList.toggle("is-open");
});

// =========================
// 푸터
// =========================
const currentTrack = {
  title: "Play It Safe",
  artist: "Julia Wolf",
  cover: placeholder.cover56,
  currentTime: "2:39",
  duration: "4:22",
  progress: "49.82%",
};

function renderPlayer() {
  document.querySelector("#currentCover").src = currentTrack.cover;
  document.querySelector("#currentTitle").textContent = currentTrack.title;
  document.querySelector("#currentArtist").textContent = currentTrack.artist;
  document.querySelector("#currentTime").textContent = currentTrack.currentTime;
  document.querySelector("#durationTime").textContent = currentTrack.duration;
  document.querySelector("#progressBar").style.width = currentTrack.progress;
}

// =========================
// 초기 실행 함수
// =========================
function init() {
  renderNav();
  renderPlaylists();
  renderUser();
  renderPlayer();
}

init();
