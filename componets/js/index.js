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

const music = new Audio();
let songs = [];

// Função para gerar um índice aleatório
function getRandomIndex(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
}

// Ler os dados do arquivo JSON e carregar a primeira música
fetch('./assets/musica.json')
    .then(response => response.json())
    .then(data => {
        songs = data; // Atribuir os dados do arquivo JSON ao array songs
        const randomIndex = getRandomIndex(songs.length); // Gerar um índice aleatório
        loadMusic(songs[randomIndex]); // Carregar a música aleatória
    })
    .catch(error => {
        console.error('Erro ao ler o arquivo JSON:', error);
        console.log("Erro ao ler o arquivo JSON");
    });

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

function playMusic() {
    isPlaying = true;
    // Alterar o ícone do botão de reprodução
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Definir título de foco do botão
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Ícone do botão Alterar pausa
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Definir título de foco do botão Play
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
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

// Função para buscar as músicas
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    // Encontrar as músicas correspondentes ao termo de busca
    const foundSongs = songs.filter(song =>
        song.displayName.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm)
    );

    if (foundSongs.length > 0) {
        // Carregar a primeira música encontrada
        loadMusic(foundSongs[0]);
    } else {
        // Exibir uma mensagem de erro ou fazer algo quando nenhuma música for encontrada
        console.log('Nenhuma música encontrada');
        alert('Nenhuma música encontrada!');
    }
}

// Função para ativar ou desativar a reprodução de música aleatória
function toggleRandom() {
    isRandom = !isRandom; // Inverte o valor de isRandom
    const randomToggleBtn = document.getElementById('random-toggle');

    if (isRandom) {
        randomToggleBtn.textContent = 'Música Aleatória: Ativada';
    } else {
        randomToggleBtn.textContent = 'Música Aleatória: Desativada';
    }
}

// Função para carregar uma música aleatória
function loadRandomMusic() {
    const randomIndex = getRandomIndex(songs.length); // Gerar um índice aleatório
    loadMusic(songs[randomIndex]); // Carregar a música aleatória
    playMusic();
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => {
    if (isRandom) {
        loadRandomMusic(); // Carregar uma música aleatória se a reprodução aleatória estiver ativada
    } else {
        changeMusic(1); // Carregar a próxima música se a reprodução aleatória estiver desativada
    }
});
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
searchInput.addEventListener('input', handleSearch);
document.getElementById('random-toggle').addEventListener('click', toggleRandom);
