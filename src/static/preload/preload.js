const { BrowserWindow, Menu } = require("@electron/remote");
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld('actions',
    {
        close() {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.close();
        },

        maximize() {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (!focusedWindow.isMaximized()) focusedWindow.maximize();
            else focusedWindow.unmaximize();
        },

        minimize() {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.minimize();
        },

        devTools() {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (!focusedWindow.webContents.isDevToolsOpened()) focusedWindow.webContents.openDevTools();
            else focusedWindow.webContents.closeDevTools();
        }
    }
);

const blankAppMenu = Menu.buildFromTemplate([]);            
Menu.setApplicationMenu(blankAppMenu);

contextBridge.exposeInMainWorld('menu',
    {
        getMenu() {
            return Menu.getApplicationMenu().items;
        },

        setMenu(template) {
            const appMenu = Menu.buildFromTemplate(template);
            
            Menu.setApplicationMenu(appMenu);
        },

        popupMenu(role) {
            const appMenu = Menu.getApplicationMenu().items;
            let subMenu = null;

            for (let i in appMenu) {
                if (appMenu[i].role == role) subMenu = appMenu[i].submenu; 
            }

            if (!subMenu) return false;
            else return subMenu.popup();
        },

        platform: process.platform
    }
);