const electron = require("electron");
const { ipcRenderer } = electron;

const buttonToLengthPage = document.querySelector("#length-btn");
const buttonToTempPage = document.querySelector("#temp-btn");
const buttonToAreaPage = document.querySelector("#area-btn");
const buttonToWeightPage = document.querySelector("#weight-btn");
const buttonToVolumePage = document.querySelector("#volume-btn");
const buttonToGoldPriceCalc = document.querySelector("#gold-price-btn");
//loads length page instead of main;
buttonToLengthPage.addEventListener("click", toLengthPage);

function toLengthPage() {
	ipcRenderer.send("load-length-page", "html/length.html");
}

//loads temp page;
buttonToTempPage.addEventListener("click", toTempPage);

function toTempPage() {
	ipcRenderer.send("load-temp-page", "html/temp.html");
}

//loads area page;
buttonToAreaPage.addEventListener("click", toAreaPage);

function toAreaPage() {
	ipcRenderer.send("load-area-page", "html/area.html");
}

//loads weight page;

buttonToWeightPage.addEventListener("click", toWeightPage);

function toWeightPage() {
	ipcRenderer.send("load-weight-page", "html/weight.html");
}
//loads volume page;

buttonToVolumePage.addEventListener("click", toVolumePage);

function toVolumePage() {
	ipcRenderer.send("load-volume-page", "html/volume.html");
}

//loads gold price calculator page;

buttonToGoldPriceCalc.addEventListener("click", toGoldPriceCalc);

function toGoldPriceCalc() {
	ipcRenderer.send("load-gold-price-page", "html/goldPrice.html");
}
