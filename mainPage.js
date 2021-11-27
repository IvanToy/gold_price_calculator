const electron = require("electron");
const { ipcRenderer } = electron;

const buttonToGoldPriceCalc = document.querySelector("#gold-price-btn");

//loads gold price calculator page;

buttonToGoldPriceCalc.addEventListener("click", toGoldPriceCalc);

function toGoldPriceCalc() {
	ipcRenderer.send("load-gold-price-page", "html/goldPrice.html");
}
