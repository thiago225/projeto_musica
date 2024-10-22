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
const downloadButton = document.getElementById('download');

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

// Carregar a imagem de fundo e, em seguida, carregar a primeira música
const bgImage = new Image();
bgImage.src = './musica/img/';
bgImage.onload = () => {
    background.src = bgImage.src;

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
};

// Função para carregar uma música e atualizar a cor do footer
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;

    footerText.style.color = 'white'; // Ou qualquer cor padrão desejada
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
        playMusic();
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
        randomToggleBtn.textContent = 'Random Music: Enabled';
    } else {
        randomToggleBtn.textContent = 'Random Music: Off';
    }
}

// Função para carregar uma música aleatória
function loadRandomMusic() {
    let randomIndex = musicIndex;
    while (randomIndex === musicIndex) {
        randomIndex = getRandomIndex(songs.length);
    }
    musicIndex = randomIndex;
    loadMusic(songs[musicIndex]);
    playMusic();
}


function jumpToPreviousMusic() {
    changeMusic(-1);
}

function jumpToNextMusic() {
    changeMusic(1);
}

function jumpForward() {
    music.currentTime += 5; // Avançar 5 segundos
}

function jumpBackward() {
    music.currentTime -= 5; // Retroceder 5 segundos
}

// Event listener para as teclas de seta para cima e para baixo
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
        loadRandomMusic(); // Carregar uma música aleatória se a reprodução aleatória estiver ativada
    } else {
        changeMusic(1); // Carregar a próxima música se a reprodução aleatória estiver desativada
    }
});

music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
searchInput.addEventListener('input', handleSearch);
document.getElementById('random-toggle').addEventListener('click', toggleRandom);

// Função para iniciar o download da música atual
function downloadCurrentMusic() {
    const downloadLink = document.createElement('a');
    downloadLink.href = music.src;
    downloadLink.download = `${title.textContent}.mp3`; // Nome do arquivo de download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


// Event listener para o botão de download
downloadButton.addEventListener('click', downloadCurrentMusic);