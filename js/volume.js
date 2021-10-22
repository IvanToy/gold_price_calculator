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
				if (option == "inch") {
					const params = [16.387064, 0.016387064, 16.387064, 0.000016387064];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if (option == "foot") {
					const params = [28316.8466, 28.3168466, 28316.8466, 0.0283168466];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if (option == "yard") {
					const params = [764554.858, 764.554858, 764554.858, 0.764554858];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if (option == "acre-foot") {
					const params = [
						1233481855.32, 1233481.85532, 1233481855.32, 1233.48185532,
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
				if (option == "milliliter") {
					const params = [16.387064, 28316.8466, 764554.858, 1233481855.32];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "liter") {
					const params = [0.016387064, 28.3168466, 764.554858, 1233481.85532];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "centimeter") {
					const params = [16.387064, 28316.8466, 764554.858, 1233481855.32];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "meter") {
					const params = [
						0.000016387064, 0.0283168466, 0.764554858, 1233.48185532,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
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
		const arrOfParams1 = [
			"Milliliter ",
			"Liter: ",
			"Cubic Centimeter: ",
			"Cubic Meter ",
		];
		const arrOfParams2 = [
			"Cubic Inch: ",
			"Cubic  Foot: ",
			"Cubic Yard: ",
			"Acre-Foot: ",
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
			var j = 0;
			for (n of r2) {
				if (ul.children.length < 4) {
					var li = document.createElement("li");
					li.className = "list-group-item";
					li.appendChild(document.createTextNode(arrOfParams2[j] + n));
					ul.appendChild(li);
					j++;
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
button.addEventListener("click", removeUl);
//while ul has children remove them;
function removeUl() {
	while (ul.lastElementChild) {
		ul.removeChild(ul.lastElementChild);
	}
	//after removal set button display to none;
	button.style.display = "none";
}
/*-----removing results from the page----- */
