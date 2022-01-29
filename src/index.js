require('v8-compile-cache');

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const remote = require("@electron/remote/main");

remote.initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 550,
        minHeight: 300,

        frame: false,
        
        show: false, // Hide when loading

        backgroundColor: "#181818",

        webPreferences: {
            preload: path.join(__dirname, "./static/preload/preload.js"),
            nodeIntegration: true
        }
    });

    // Enable remote on the window
    remote.enable(mainWindow.webContents);

    // Load ./static/html/index.html
    mainWindow.loadFile(path.join(__dirname, "./static/html/index.html"));

    // Show window when fully loaded
    mainWindow.webContents.on("did-finish-load", function() {
        mainWindow.show();
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});