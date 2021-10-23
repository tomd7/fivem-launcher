require('dotenv').config();
const env = process.env;

const updatePlayerCount = () => {
    fetch(`http://${env.SERVER_ADDRESS}:${env.SERVER_PORT}/players.json`)
        .then(response => response.json())
        .then(players => playerCount.innerText = players.length);
};

const backgroundImage = document.getElementById("background-image");
const background = new Background(backgroundImage);

// Update the number of players on the server
const playerCount = document.getElementById('player-count');
updatePlayerCount();
setInterval(updatePlayerCount, 5000);

// Button that allow the user to clear FiveM cache
const btnClearCacheElem = document.getElementById('btn-clear-cache');
const btnClearCache = new BtnClearCache(btnClearCacheElem);

// Clickable link buttons
const links = document.querySelectorAll('.btn-url');
links.forEach(link => new Link(link));

// Prevent user from selecting elements
document.body.addEventListener('mousedown', e => e.preventDefault());