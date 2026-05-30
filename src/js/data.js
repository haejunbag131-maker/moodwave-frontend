// =========================
// 공통 데이터
// =========================
export const ICON_PATH = '/assets/icon/';

// =========================
// 메뉴 목록
// =========================
export const navItems = [
  {
    label: 'Home',
    icon: 'Home_Fill_S.svg',
    href: '#/home',
  },
  {
    label: 'Weather Vibes',
    icon: 'weather.svg',
    href: '/pages/weather.html',
  },
  {
    label: 'Your Status',
    icon: 'status.svg',
    href: '/pages/chart.html',
  },
];

// =========================
// 플레이리스트 메뉴 목록
// =========================
export const playlistMenuItems = [
  {
    label: 'Create Playlist',
    icon: '+Library_S.svg',
  },
  {
    label: 'Liked Songs',
    icon: 'Liked Songs_S.svg',
  },
];

// =========================
// 기본 이미지
// =========================
export const placeholder = {
  avatar:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34' viewBox='0 0 34 34'%3E%3Ccircle cx='17' cy='17' r='17' fill='%23999999'/%3E%3Ccircle cx='17' cy='13' r='5' fill='%23ffffff'/%3E%3Cpath d='M8 28c1.5-5 5-8 9-8s7.5 3 9 8' fill='%23ffffff'/%3E%3C/svg%3E",

  cover82:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='82' height='82' viewBox='0 0 82 82'%3E%3Crect width='82' height='82' fill='%23999999'/%3E%3C/svg%3E",

  cover182:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='182' height='182' viewBox='0 0 182 182'%3E%3Crect width='182' height='182' fill='%23999999'/%3E%3C/svg%3E",
};

// =========================
// 프로필
// =========================
export const user = {
  name: 'HAEJUNPARK',
  avatar: placeholder.avatar,
};

// 날씨별 플레이리스트 더미데이터
export const weatherTracks = {
  Rain: [
    {
      id: 1,
      title: 'Square (2017)',
      artist: '백예린',
      genre: 'Lo-fi',
      duration: '04:31',
      cover: '/assets/img/rainy-2.jpg',
    },
    {
      id: 2,
      title: '밤편지',
      artist: '아이유',
      genre: 'Lo-fi',
      duration: '04:12',
      cover: '/assets/img/rainy-2.jpg',
    },
    {
      id: 3,
      title: 'Everything',
      artist: '검정치마',
      genre: 'Indie',
      duration: '03:43',
      cover: '/assets/img/rainy-2.jpg',
    },
  ],

  Clouds: [
    {
      id: 1,
      title: 'Space Song',
      artist: 'Beach House',
      genre: 'Dream Pop',
      duration: '05:20',
      cover: '/assets/img/cloudy.jpg',
    },
    {
      id: 2,
      title: '505',
      artist: 'Arctic Monkeys',
      genre: 'Indie Rock',
      duration: '04:13',
      cover: '/assets/img/cloudy.jpg',
    },
    {
      id: 3,
      title: 'Sunset Lover',
      artist: 'Petit Biscuit',
      genre: 'Chill',
      duration: '03:58',
      cover: '/assets/img/cloudy.jpg',
    },
  ],

  Clear: [
    {
      id: 1,
      title: 'Super Shy',
      artist: 'NewJeans',
      genre: 'Pop',
      duration: '02:34',
      cover: '/assets/img/sunny-4.jpg',
    },
    {
      id: 2,
      title: 'Treasure',
      artist: 'Bruno Mars',
      genre: 'Funk',
      duration: '02:58',
      cover: '/assets/img/sunny-4.jpg',
    },
    {
      id: 3,
      title: 'Sunflower',
      artist: 'Post Malone',
      genre: 'Chill Pop',
      duration: '02:38',
      cover: '/assets/img/sunny-4.jpg',
    },
  ],

  Snow: [
    {
      id: 1,
      title: 'River Flows In You',
      artist: 'Yiruma',
      genre: 'Piano',
      duration: '03:28',
      cover: '/assets/img/snowy-3.jpg',
    },
  ],

  Foggy: [
    {
      id: 1,
      title: 'Near Light',
      artist: 'Ólafur Arnalds',
      genre: 'Ambient',
      duration: '05:31',
      cover: '/assets/img/foggy.jpg',
    },
  ],

  Thunderstorm: [
    {
      id: 1,
      title: 'Midnight City',
      artist: 'M83',
      genre: 'Electronic',
      duration: '04:04',
      cover: '/assets/img/stormy.jpg',
    },
  ],
};
