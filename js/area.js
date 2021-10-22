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
					const params = [
						645.16, 6.4516, 0.00064516, 0.00000000064516, 15500031.000062,
					];
					for (let i = 0; i < params.length; i++) {
						if (i <= 3) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
					}
					return params;
				} else if (option == "foot") {
					const params = [
						92903.04, 929.0304, 0.09290304, 0.000000009290304, 107639.1041671,
					];
					for (let i = 0; i < params.length; i++) {
						if (i <= 3) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
					}
					return params;
				} else if (option == "yard") {
					const params = [
						836127.36, 8361.2736, 0.83612736, 0.00000083612736, 11959.900463,
					];
					for (let i = 0; i < params.length; i++) {
						if (i <= 3) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
					}
					return params;
				} else if (option == "mile") {
					const params = [
						2589988110336, 25899881103.36, 2589988.110336, 2.589988110336,
						258.99881103,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if ((option = "acre")) {
					const params = [
						40468564224, 40468564.224, 4046.8564224, 0.0040468564224,
						2.4710538146717,
					];
					for (let i = 0; i < params.length; i++) {
						if (i <= 3) {
							params[i] = this.number * params[i];
						} else {
							params[i] = this.number / params[i];
						}
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
				if (option == "millimeter") {
					const params = [
						645.16, 92903.04, 836127.36, 2589988110336, 40468564224,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "centimeter") {
					const params = [
						6.4516, 929.0304, 8361.2736, 25899881103.36, 40468564.224,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "meter") {
					const params = [
						0.00064516, 0.09290304, 0.83612736, 2589988.110336, 4046.8564224,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "kilometer") {
					const params = [
						0.00000000064516, 0.00000009290304, 0.00000083612736,
						2.589988110336,
					];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if ((option = "hectare")) {
					const params = [
						15500031.00006, 107639.1041671, 11959.900463, 258.99881103,
						2.4710538146717,
					];
					for (let i = 0; i < params.length; i++) {
						if (i <= 2 || i == 4) {
							params[i] = this.number * params[i];
						} else {
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
		const arrOfParams1 = [
			"Square Millimeter: ",
			"Square Centimeter: ",
			"Square Meter: ",
			"Square Kilometer: ",
			"Hectare: ",
		];
		const arrOfParams2 = [
			"Square Inch: ",
			"Square Foot: ",
			"Square Yard: ",
			"Square Mile: ",
			"Acre: ",
		];
		// checking if num1 or num2 values is empty and if it is than we display the results of calculation on the page,using loop
		if (num1 !== "") {
			var i = 0;
			for (n of r1) {
				if (ul.children.length < 5) {
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
				if (ul.children.length < 5) {
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
