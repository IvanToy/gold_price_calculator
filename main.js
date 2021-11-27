const electron = require("electron");
const { app, BrowserWindow, ipcMain, Menu } = require("electron");

//Set Env

process.env.NODE_ENV = "production";

let mainWindow;

app.on("ready", function () {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.loadFile("mainPage.html");
	mainWindow.on("close", () => {
		app.quit();
	});
});

process.platform === "win32" && Menu.setApplicationMenu(null);

ipcMain.on("load-main-page-back", (event, args) => {
	mainWindow.loadFile(args);
});

ipcMain.on("load-gold-price-page", (event, args) => {
	mainWindow.loadFile(args);
});
