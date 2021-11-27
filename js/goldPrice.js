const electron = require("electron");
const { ipcRenderer } = electron;

const buttonToMainPage = document.querySelector("#btn-back");
buttonToMainPage.addEventListener("click", toMainPage);
function toMainPage() {
	ipcRenderer.send("load-main-page-back", "mainPage.html");
}

const calculateForm = document.getElementById("calculate-form");
const deleteResultBtn = document.getElementById("delete-btn");
const updatePriceBtn = document.getElementById("price-update");
const historyPriceFrom = document.getElementById("history-price-form");
const calculationResult = document.getElementById("calc-result");
deleteResultBtn.style.display = "none";

var myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-1fozfqskry5yi04-io");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
	method: "GET",
	headers: myHeaders,
	redirect: "follow",
};

const url = "https://www.goldapi.io/api/XAU/USD";

async function getGoldPrice(url) {
	try {
		let data = await fetch(url, requestOptions);
		let { price, date } = await data.json();

		let goldPrice = document.getElementById("gold-price");
		url.length === 34
			? (goldPrice.innerText = `Current gold price:  ${price}$`)
			: (goldPrice.innerText = `Price for ${new Date(
					date
			  ).toDateString()}: ${price}$`);
	} catch (error) {
		//if error display it to the page;
		console.log(error.message);
		goldPrice.innerText = error.message;
	}
}
getGoldPrice(url);

class priceCalculation {
	constructor(weight, price) {
		this.weight = weight;
		this.price = price;
	}

	calculation(carat) {
		let result;
		switch (carat) {
			case "9K":
				result = (this.price / 20) * 0.375 * this.weight;
				break;
			case "10K":
				result = (this.price / 20) * 0.4167 * this.weight;
				break;
			case "12K":
				result = (this.price / 20) * 0.5 * this.weight;
				break;
			case "14K":
				result = (this.price / 20) * 0.5833 * this.weight;
				break;
			case "18K":
				result = (this.price / 20) * 0.75 * this.weight;
				break;
			case "22K":
				result = (this.price / 20) * 0.9167 * this.weight;
				break;
			case "24K":
				result = (this.price / 20) * 0.9999 * this.weight;
				break;

			default:
				break;
		}
		return result;
	}
}

calculateForm.addEventListener("submit", resultDisplay);

function resultDisplay(e) {
	e.preventDefault();

	let carat = document.getElementById("params").value;
	let weight = document.getElementById("num").value;
	weight = +weight;
	if (Number.isNaN(weight)) {
		alert("Please Enter a Number");
	} else {
		price = document.getElementById("gold-price").innerText;
		p = price.match(/(\d+).(\d+)(?=\$)/g)[0];
		console.log(p);
		let calcPrice = new priceCalculation(weight, Number(p));
		let resultOfCalculation = calcPrice.calculation(carat);

		//displaying result of calculation on the page;
		calculationResult.innerText = `Price for ${carat} and ${weight}pwt: ${resultOfCalculation.toFixed(
			2
		)}$`;
		console.log(resultOfCalculation);
		deleteResultBtn.style.display = "inline";
		document.getElementById("num").value = "";
	}
}

deleteResultBtn.addEventListener("click", () => {
	calculationResult.innerText = "";
	deleteResultBtn.style.display = "none";
});

updatePriceBtn.addEventListener("click", () => getGoldPrice(url));

historicalGoldPrice = document.getElementById("historical-price");
historicalGoldPrice.max = new Date().toISOString().split("T")[0];

historyPriceFrom.addEventListener("submit", historyPrice);

function historyPrice(e) {
	e.preventDefault();

	let historicalPrice = document.getElementById("historical-price").value;
	if (historicalPrice === "") {
		alert("Please chose a date");
	} else {
		historyUrl = `${url}/${historicalPrice.split("-").join("")}`;
		getGoldPrice(historyUrl);
		console.log(historyUrl);
		historicalPrice = document.getElementById("historical-price").value = "";
	}
}
