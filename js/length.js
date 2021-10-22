const electron = require("electron");
const { fdatasync } = require("original-fs");
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
	var num2 = document.getElementById("num-2").value;
	var option1 = document.getElementById("params-1").value;
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
					const params = [25.4, 2.54, 0.0254, 0.0000254];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if (option == "foot") {
					const params = [304.8, 30.48, 0.3048, 0.0003048];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if (option == "yard") {
					const params = [914.4, 91.44, 0.9144, 0.0009144];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number * params[i];
					}
					return params;
				} else if (option == "mile") {
					const params = [1609344, 160934.4, 1609.344, 1.609344];
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
				if (option == "millimeter") {
					const params = [25.4, 304.8, 914.4, 1609344];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "centimeter") {
					const params = [2.54, 30.48, 91.44, 1609344];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "meter") {
					const params = [0.0254, 0.3048, 0.9144, 1609.344];
					for (let i = 0; i < params.length; i++) {
						params[i] = this.number / params[i];
					}
					return params;
				} else if (option == "kilometer") {
					const params = [0.0000254, 0.0003048, 0.0009144, 1.609344];
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
			"Millimeter: ",
			"Centimeter: ",
			"Meter: ",
			"Kilometer: ",
		];
		const arrOfParams2 = ["Inch: ", "Foot: ", "Yard: ", " Mile: "];
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
