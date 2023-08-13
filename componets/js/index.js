const image = document.getElementById('cover');
const title = document.getElementById('music-title');
const artist = document.getElementById('music-artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const playerProgress = document.getElementById('player-progress');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const background = document.getElementById('bg-img');
const searchInput = document.getElementById('search-input');
const footerText = document.getElementById('footer-text');
const shareBtn = document.getElementById('share');

const music = new Audio();
let songs = [];

// Função para gerar um índice aleatório
function getRandomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
}

// Função para controlar se o espaço está pressionado
let isSpacePressed = false;

function togglePlayOnSpace(event) {
    if (event.code === 'Space') {
        isSpacePressed = !isSpacePressed; // Inverte o valor de isSpacePressed

        if (isSpacePressed) {
            pauseMusic();
        } else {
            playMusic();
        }
    }
}

// Adicionar o event listener para o evento de teclado
document.addEventListener('keydown', togglePlayOnSpace);

// Função para carregar uma música e atualizar a cor do footer
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;

    // Atualizar a cor do footer com a cor média do background
    const bgColor = getAverageColor(background);
    footerText.style.color = bgColor;
}

// Função para compartilhar a música atual
function shareCurrentMusic() {
    const shareTitle = title.textContent;
    const shareArtist = artist.textContent;
    const shareText = `Estou ouvindo: ${shareTitle} - ${shareArtist}`;
    const shareUrl = window.location.href;

    // Adicione o nome da música como parâmetro na URL usando o método GET
    const musicNameParam = encodeURIComponent(shareTitle);
    const urlWithParams = `${shareUrl}?music=${musicNameParam}`;

    if (navigator.share) {
        navigator.share({
            title: 'Compartilhar Música',
            text: shareText,
            url: urlWithParams, // Use a URL com os parâmetros
        })
            .then(() => console.log('Música compartilhada com sucesso'))
            .catch((error) => console.error('Erro ao compartilhar música:', error));
    } else {
        console.warn('API de compartilhamento não suportada pelo navegador.');
    }
}

// Event listener para o botão de compartilhamento
shareBtn.addEventListener('click', shareCurrentMusic);

// Função para pausar a música
function pauseMusic() {
    isPlaying = false;
    // Alterar ícone do botão para pausa
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Definir título do botão para Play
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Função para tocar a música
function playMusic() {
    isPlaying = true;
    // Alterar ícone do botão para reprodução
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Definir título do botão para Pause
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

let musicIndex = 0;
let isPlaying = false;
let isRandom = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    const foundSongs = songs.filter(song =>
        song.displayName.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm)
    );

    if (foundSongs.length > 0) {
        loadMusic(foundSongs[0]);
    } else {
        console.log('Nenhuma música encontrada');
        alert('Nenhuma música encontrada!');
    }
}

function toggleRandom() {
    isRandom = !isRandom;
    const randomToggleBtn = document.getElementById('random-toggle');

    if (isRandom) {
        randomToggleBtn.textContent = 'Random Music: Enabled';
    } else {
        randomToggleBtn.textContent = 'Random Music: Off';
    }
}

function loadRandomMusic() {
    const randomIndex = getRandomIndex(songs.length);
    loadMusic(songs[randomIndex]);
    playMusic();
}

function jumpToPreviousMusic() {
    changeMusic(-1);
}

function jumpToNextMusic() {
    changeMusic(1);
}

function jumpForward() {
    music.currentTime += 5;
}

function jumpBackward() {
    music.currentTime -= 5;
}

document.addEventListener('keydown', event => {
    if (event.code === 'ArrowUp') {
        jumpToPreviousMusic();
    } else if (event.code === 'ArrowDown') {
        jumpToNextMusic();
    } else if (event.code === 'ArrowRight') {
        jumpForward();
    } else if (event.code === 'ArrowLeft') {
        jumpBackward();
    }
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => {
    if (isRandom) {
        loadRandomMusic();
    } else {
        changeMusic(1);
    }
});

music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
searchInput.addEventListener('input', handleSearch);
document.getElementById('random-toggle').addEventListener('click', toggleRandom);

function downloadCurrentMusic() {
    const downloadLink = document.createElement('a');
    downloadLink.download = title.textContent;
    downloadLink.click();
    downloadLink.href = music.src;
}

const downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', downloadCurrentMusic);

