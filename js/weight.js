const electron = require("electron");
const { ipcRenderer } = electron;
/*-----Button leading back to main page----- */
const buttonToMainPage = document.querySelector("#btn-back");
buttonToMainPage.addEventListener("click", toMainPage);
function toMainPage() {
	ipcRenderer.send("load-main-page-back", "mainPage.html");
}
/*-----Button leading back to main page----- */
/*-----getting form, ul tag, button to delete result(setting it to display none)----- */
var form = document.getElementById("form");
var ul = document.getElementById("results");
var button = document.getElementById("btn-delete");
button.style.display = "none";
/*-----getting form, ul tag, button to delete result(setting it to display none)----- */
/*-----adding event listener(click) to the form in order to get results of calculation----- */
form.addEventListener("submit", formSubmitHandler);
//function handling event
function formSubmitHandler(e) {
	e.preventDefault();
	//getting values of input fields(converting them from string to numbers) and select fields in order to do calculation
	var num1 = document.getElementById("num-1").value;

	var option1 = document.getElementById("params-1").value;
	var num2 = document.getElementById("num-2").value;
	var option2 = document.getElementById("params-2").value;

	//if there are no values entered by the user than alert him that he must enter a number
	if (num1 == "" && num2 == "") {
		alert("Please enter a number");
	} else {
		/*constructing two classes Imperial and Metric with only one method in each class.
		Those methods is where calculation happens. Values of input fields are set in constructor(this.number = number).
		Then values of select fields are passed as arguments to methods. Depending on the number and select fields values
		calculation is carried on and displayed on the page(html).
		 */
		class Imperial {
			constructor(number) {
				this.number = number;
			}

			toMetric(option) {
				if (option == "grain") {
					const params = [64.79346, 0.06479891, 0.006479891, 1.543e7];
					for (let i = 0; i < params.length; i++) {
						if (i <= 2) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
					}
					return params;
				} else if (option == "dram") {
					const params = [1771.845195, 1.771845195, 564.382, 564382];
					for (let i = 0; i < params.length; i++) {
						if (i <= 1) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
					}
					return params;
				} else if (option == "ounce") {
					const params = [28349.52313, 28.34952313, 35.274, 35274];
					for (let i = 0; i < params.length; i++) {
						if (i <= 1) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
					}
					return params;
				} else if (option == "hundredweight") {
					const params = [45359237, 45359.237, 45.359237, 0.045359237];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if ((option = "long-hundredweight")) {
					const params = [5080234.544, 50802.34544, 50.80234544, 0.05080234544];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if ((option = "short-ton")) {
					const params = [90718474, 907184.74, 907.18474, 0.90718474];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if ((option = "long-ton")) {
					const params = [1016046908.8, 1016046.909, 1016.046909, 1.016046909];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if (option == "troy-grain") {
					const params = [64.79891, 0.06479891, 0.00006479891, 1.543e7];
					for (let i = 0; i < params.length; i++) {
						if (i <= 2) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
						return params;
					}
				} else if ((option = "pennyweight")) {
					const params = [1555.17384, 1.55517384, 0.0155517384, 643015];
					for (let i = 0; i < params.length; i++) {
						if (i <= 2) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
						return params;
					}
				} else if (option == "troy-ounce") {
					const params = [31103.4768, 31.1034768, 0.031103476, 32151];
					for (let i = 0; i < params.length; i++) {
						if (i <= 2) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
					}
					return params;
				} else if (option == "troy-pound") {
					const params = [
						373241.7216, 373.2417216, 0.3732417216, 0.0003732417216,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				}
			}
		}

		class Metric {
			constructor(number) {
				this.number = number;
			}

			toImperial(option) {
				if (option == "milligram") {
					const params = [
						64.79891, 1771.845195, 28350, 1016046908.8, 5080234.544, 90718474,
						1016046908.8, 64.79891, 1555.17384, 31103.4768, 373241.7216,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "gram") {
					const params = [
						0.06479891, 1.771845195, 28.34952313, 45359.237, 50802.34544,
						907184.74, 1016046.909, 0.06479891, 1.55517384, 31.1034768,
						373.2417216,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "kilogram") {
					const params = [
						0.006479891, 564.382, 35.274, 45.359237, 50.80234544, 907.18474,
						1016.046909, 0.00006479891, 0.0155517384, 0.031103476, 0.373241721,
					];
					for (let i = 0; i < params.length; i++) {
						if (i == 1 || i == 2) {
							params[i] = this.number * params[i];
						} else if (i == 0 || (i >= 3 && i <= 9)) {
							params[i] = this.number / params[i];
						}
					}
					return params;
				} else if (option == "ton") {
					const params = [
						1.543e7, 564382, 35274, 0.045359237, 0.05080234544, 0.9071847,
						1.016046909, 1.543e7, 643015, 32151, 0.0003732417216,
					];
					for (let i = 0; i < params.length; i++) {
						if (i <= 2 || (i >= 7 && i <= 9)) {
							params[i] = this.number * params[i];
						} else if ((i >= 3 && i <= 6) || i == 10) {
							params[i] = this.number / params[i];
						}
					}
					return params;
				}
			}
		}
		//passing input fields values(num1,num2) to constructor classes  and passing select fields values(option1,option2) to methods as args.
		const result1 = new Imperial(num1);
		const r1 = result1.toMetric(option1);
		const result2 = new Metric(num2);
		const r2 = result2.toImperial(option2);
		//two arrays holding "description of calculation"(I couldn't come up with better comment :( )
		const arrOfParams1 = ["Milligram: ", "Gram: ", "Kilogram: ", "Ton: "];
		const arrOfParams2 = [
			"Grain: ",
			"Dram: ",
			"Ounce:  ",
			"Hundredweight: ",
			"Long- Hundredweight: ",
			"Ton(short): ",
			"Ton(long): ",
			"Grain: ",
			"Pennyweight: ",
			"Troy Ounce:  ",
			"Troy Pound:  ",
		];
		// checking if num1 or num2 values is empty and if it is than we display the results of calculation on the page,using loop
		if (num1 !== "") {
			var i = 0;
			for (n of r1) {
				if (ul.children.length < 4) {
					var li = document.createElement("li");
					li.className = "list-group-item";
					li.appendChild(document.createTextNode(arrOfParams1[i] + n));
					ul.appendChild(li);
					i++;
				}
			}
		} else {
			var i = 0;
			for (n of r2) {
				if (ul.children.length < 13) {
					var li = document.createElement("li");
					li.className = "list-group-item";
					li.appendChild(document.createTextNode(arrOfParams2[i] + n));
					ul.appendChild(li);

					i++;
				}
			}
		}
		//setting values of num1 and num2 to empty string so that it won't stay in input fields after click;
		num1 = document.getElementById("num-1").value = "";
		num2 = document.getElementById("num-2").value = "";
		//displaying delete button on click event;
		button.style.display = "inline";
	}
}
/*-----adding event listener(click) to the form in order to get results of calculation----- */
/*-----removing results from the page----- */
//adding click event to button to handle remove of results;
button.addEventListener("click", handleRemove);
//while ul has children remove them;
function handleRemove() {
	while (ul.lastElementChild) {
		ul.removeChild(ul.lastElementChild);
	}
	//after removal set button display to none;
	button.style.display = "none";
}
/*-----removing results from the page----- */
