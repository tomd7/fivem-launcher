const path = require('path');
const open = require('open');
const fs = require('fs');
const { app, BrowserWindow, ipcMain } = require('electron');
const ejs = require('ejs-electron')
const url = require("url");
require('dotenv').config({path: path.join(__dirname, '.env')});

const env = process.env;
// Set the full path of the background image
env.LAUNCHER_BG_IMAGE = path.join(__dirname, env.LAUNCHER_BG_IMAGE);
env.CONNECTION_STRING = `fivem://connect/${env.SERVER_ADDRESS}:${env.SERVER_PORT}`;
ejs.data('config', env);

function createWindow () {
    const win = new BrowserWindow({
        show: false,
        width: env.LAUNCHER_WIDTH,
        height: env.LAUNCHER_HEIGHT,
        minWidth: 900,
        minHeight: 540,
        resizable: false,
        icon: path.join(__dirname, env.SERVER_ICON),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.once('ready-to-show', () => win.show());

    win.setMenuBarVisibility(false);
    win.setAspectRatio(env.LAUNCHER_WIDTH / env.LAUNCHER_HEIGHT);
    win.loadURL('file://' + __dirname + '/html/index.ejs');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

function clearCache() {
    const fivemData = path.join(process.env.LOCALAPPDATA, "FiveM\\FiveM.app\\data");
    const cache = path.join(fivemData, "cache");
    const serverCache = path.join(fivemData, "server-cache");

    if (fs.existsSync(cache)) {
        fs.rm(cache, { recursive: true, force: true }, () => {});
    }

    if (fs.existsSync(serverCache)) {
        fs.rm(serverCache, { recursive: true, force: true }, () => {});
    }
}

ipcMain.on('cache:clear', (event, message) => {
    clearCache();
    event.reply('cache:clear', { status: "done" });
});

ipcMain.on('url:open', (event, url) => open(url));
