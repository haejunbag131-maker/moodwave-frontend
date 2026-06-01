import { loadPlaylistNames, loadPlaylistTrackMap, removeTrackFromPlaylist } from '../utils/playlistStorage.js';

import { showConfirm } from '../utils/confirm.js';
import { escapeHTML } from '../utils/escapeHTML.js';
import { renderSongTable } from '../components/songTable.js';

// =========================
// 현재 hash에서 플레이리스트 이름 가져오기
// =========================
function getPlaylistNameFromHash() {
  const hash = window.location.hash || '';
  const queryString = hash.split('?')[1] || '';
  const params = new URLSearchParams(queryString);

  return params.get('name') || '';
}

// =========================
// 페이지 헤더 HTML 생성 함수
// =========================
function formatDuration(durationMs) {
  if (!durationMs) return '-';

  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// =========================
// HTML 특수문자 변환 함수
// =========================
function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };

    return escapeMap[char];
  });
}

// =========================
// 휴지통 아이콘 함수
// =========================
function trashIcon() {
  return `
    <div class="song-table-page__header">
      <h2 class="song-table-page__title">${escapeHTML(title)}</h2>
      <p class="song-table-page__desc">${escapeHTML(description)}</p>
    </div>
  `;
}

// =========================
// 플레이리스트 목록 행 생성 함수
// =========================
function createPlaylistRow(playlistName) {
  return `
    <a
      href="#/playlist?name=${encodeURIComponent(playlistName)}"
      class="playlist-card"
    >
      <div class="playlist-card__cover">
        <img src="/assets/icon/Library_S.svg" alt="" />
      </div>

      <div class="playlist-card__info">
        <strong class="playlist-card__title">
          ${escapeHTML(playlistName)}
        </strong>
        <span class="playlist-card__desc">Playlist</span>
      </div>
    </a>
  `;
}

// =========================
// 플레이리스트 곡 row 생성 함수
// =========================
function createPlaylistTrackRow(track, index) {
  const rowNumber = index + 1;

  return `
    <tr
      class="song-row"
      data-play-track
      data-id="${escapeHTML(track.id)}"
      data-uri="${escapeHTML(track.uri || '')}"
      data-title="${escapeHTML(track.title)}"
      data-artist="${escapeHTML(track.artist)}"
      data-cover="${escapeHTML(track.cover || '')}"
    >
      <td>${rowNumber}</td>

      <td>
        <div class="song-info">
          <img
            class="song-info__cover"
            src="${escapeHTML(track.cover || '')}"
            alt=""
          />

          <div class="song-info__text">
            <span class="song-info__title">
              ${escapeHTML(track.title)}
            </span>
            <span class="song-info__artist">
              ${escapeHTML(track.artist)}
            </span>
          </div>
        </div>
      </td>

      <td>${escapeHTML(track.releaseDate || '-')}</td>
      <td>${formatDuration(track.durationMs || track.duration_ms)}</td>

      <td>
        <button
          type="button"
          class="playlist-track-remove-button"
          data-no-play
          data-remove-playlist-track
          data-track-id="${escapeHTML(track.id)}"
          aria-label="플레이리스트에서 제거"
          title="제거"
        >
          ${escapeHTML(playlistName)}
        </a>
      </td>
    </tr>
  `;
}

// =========================
// 빈 플레이리스트 행 생성 함수
// =========================
function createEmptyPlaylistRow() {
  return `
    <tr>
      <td colspan="5" class="song-table__empty">
        생성한 플레이리스트가 없습니다.
      </td>
    </tr>
  `;
}

// =========================
// 플레이리스트 페이지 HTML 렌더링 함수
// =========================
export function renderPlaylistPage() {
  return `
    <section class="song-table-page">
      <div id="playlistPageContent"></div>
    </section>
  `;
}

// =========================
// 전체 플레이리스트 목록 렌더링 함수
// =========================
function renderPlaylistOverview() {
  const content = document.querySelector('#playlistPageContent');
  const playlistNames = loadPlaylistNames();

  if (!content) return;

  const playlistRows =
    playlistNames.length === 0 ? createEmptyPlaylistRow() : playlistNames.map(createPlaylistRow).join('');

  content.innerHTML = `
    ${renderPageHeader('Your Playlists', '생성한 플레이리스트를 확인해보세요.')}

    <table class="song-table">
      <thead>
        <tr>
          <th colspan="5">Playlist</th>
        </tr>
      </thead>

      <tbody>
        ${playlistRows}
      </tbody>
    </table>
  `;
}

// =========================
// 플레이리스트 상세 렌더링 함수
// =========================
function renderPlaylistDetail(playlistName) {
  const content = document.querySelector('#playlistPageContent');

  if (!content) return;

  if (!playlistName) {
    renderPlaylistOverview();
    return;
  }

  const playlistTrackMap = loadPlaylistTrackMap();
  const tracks = playlistTrackMap[playlistName] || [];
  const description = tracks.length > 0 ? `${tracks.length}곡` : '아직 추가된 곡이 없습니다.';

  content.innerHTML = `
    ${renderPageHeader(playlistName, description)}

    ${renderSongTable(tracks, {
      actionType: 'playlist-remove',
      actionHeader: 'Remove',
      emptyMessage: '아직 추가된 곡이 없습니다.',
    })}
  `;
}

// =========================
// 플레이리스트 곡 제거 이벤트 등록 함수
// =========================
function bindPlaylistTrackRemoveEvents() {
  const content = document.querySelector('#playlistPageContent');

  if (!content) return;

  if (content.dataset.removeEventBound === 'true') return;

  content.dataset.removeEventBound = 'true';

  content.addEventListener('click', async (event) => {
    const removeButton = event.target.closest('[data-remove-playlist-track]');

    if (!removeButton) return;

    event.preventDefault();
    event.stopPropagation();

    const playlistName = getPlaylistNameFromHash();
    const trackId = removeButton.dataset.trackId;

    const isConfirmed = await showConfirm('이 곡을 플레이리스트에서 제거하시겠습니까?', {
      title: '곡 제거',
      cancelText: '취소',
      confirmText: '제거',
    });

    if (!isConfirmed) return;

    removeTrackFromPlaylist(playlistName, trackId);
    renderPlaylistDetail(playlistName);
  });
}

// =========================
// 플레이리스트 페이지 초기 실행 함수
// =========================
export function initPlaylistPage() {
  const playlistName = getPlaylistNameFromHash();

  renderPlaylistDetail(playlistName);
  bindPlaylistTrackRemoveEvents();
}

// =========================
// 날씨 플레이리스트 초기 실행
// =========================
renderCommonLayout();

function initWeatherPlaylist() {
  console.log('Weather Playlist page loaded');
}

initWeatherPlaylist();
