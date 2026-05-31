import { renderCommonLayout } from '../layout/commonLayout.js';
import { playlistMap } from '../data.js';

const BASE_URL = '';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// =========================
// 초기 실행
// =========================
renderCommonLayout();

function initWeather() {
  console.log('Weather page loaded');
}

initWeather();

const weatherCardGrid = document.querySelector('.weather-card-grid');
const weatherIcon = document.querySelector('.weather-icon');
const weatherTitle = document.querySelector('.weather-title');
const weatherInfo = document.querySelector('.weather-info');
const weatherDesc = document.querySelector('.weather-desc');

// 위치 정보
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeather(lat, lon);
  },

  () => {
    console.log('위치 정보를 가져올 수 없어 서울 날씨로 대체');

    // 서울 좌표(기본값)
    getWeather(37.5665, 126.978);
  },
);

// 날씨 정규화
function normalizeWeather(weather) {
  if (weather === 'Mist' || weather === 'Fog') {
    return 'Foggy';
  }

  return weather;
}

function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weather = normalizeWeather(data.weather[0].main);
      const currentWeather = weather;
      const temp = Math.round(data.main.temp);
      const city = data.name;

      // 화면 출력
      weatherInfo.textContent = `${temp}°C · ${city}`;

      updateWeather(weather);
      updatePlaylist(weather);
      renderWeatherCards(weather);
    })

    .catch((err) => {
      console.error(err);
    });
}

// 현재 날씨 인포
function updateWeather(weather) {
  const playlist = playlistMap[weather];

  if (!playlist) return;

  weatherTitle.textContent = playlist.weather;
  weatherDesc.textContent = playlist.desc;
  weatherIcon.src = playlist.icon;
}

// 대표 플레이리스트
function updatePlaylist(weather) {
  const playlist = playlistMap[weather];

  if (!playlist) return;

  const featuredCard = document.querySelector('.featured-card');

  playlistTag.textContent = playlist.tag;
  playlistTitle.textContent = playlist.title;
  playlistGenre.textContent = playlist.genre;
  playlistDesc.textContent = playlist.desc;
  playlistAlbumImg.style.backgroundImage = `url(${playlist.image})`;
  featuredCard.href = `/pages/playlist.html?playlist=${weather}`;
  featuredCard.style.setProperty('--playlist-color', playlist.color);
}

// 다른 날씨 플레이리스트
function renderWeatherCards(currentWeather) {
  weatherCardGrid.innerHTML = '';

  Object.entries(playlistMap).forEach(([weather, playlist]) => {
    if (weather === currentWeather) return;

    const card = document.createElement('a');
    card.className = 'weather-card';
    card.href = `/pages/playlist.html?playlist=${weather}`;

    card.innerHTML = `
  <img class="other-weather-img" src="${playlist.image}" alt="${playlist.title}"/>
  <div class="weather-card-content">
    <img class="weather-card-icon" src="${playlist.icon}" alt=""/>
    <h3>${playlist.weather}</h3>
    <span>${playlist.genre}</span>
    <p>${playlist.title}</p>
  </div>
  <img class="btn-other-weather" src="/assets/icon/weather-play.svg" alt="" />
`;

    weatherCardGrid.append(card);
  });
}

// 마우스 드래그
let isDown = false;
let startX;
let scrollLeft;

weatherCardGrid.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - weatherCardGrid.offsetLeft;
  scrollLeft = weatherCardGrid.scrollLeft;
});

weatherCardGrid.addEventListener('mouseleave', () => {
  isDown = false;
});

weatherCardGrid.addEventListener('mouseup', () => {
  isDown = false;
});

weatherCardGrid.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  e.preventDefault();

  const x = e.pageX - weatherCardGrid.offsetLeft;
  const walk = (x - startX) * 2;

  weatherCardGrid.scrollLeft = scrollLeft - walk;
});
