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
const form = document.querySelector("#form");
const ul = document.querySelector("#result");
const button = document.querySelector("#btn-delete");
button.style.display = "none";
/*-----getting form, ul tag, button to delete result(setting it to display none)----- */
/*-----adding event listener(click) to the form in order to get results of calculation----- */
form.addEventListener("submit", handleSubmitForm);
//function handling event
function handleSubmitForm(e) {
	e.preventDefault();
	//getting value of input field(converting them from string to numbers) and select field in order to do calculation
	var num = document.getElementById("num").value;
	var option = document.getElementById("params").value;
	num = +num;
	//if there are no value entered by the user than alert him that he must enter a number
	if (Number.isNaN(num)) {
		alert("Please enter a number");
	} else {
		/*constructing one Class  with only one method.
		This method is where calculation happens. Values of input field are set in constructor(this.number = number).
		Then value of select field is  passed as arguments to method. Depending on the number and select field value
		calculation is carried on and displayed on the page(html).
		 */
		class Temp {
			constructor(number) {
				this.number = number;
			}
			converter(option) {
				if (option == "celsius") {
					return `Fahrenheit: ${(this.number * 9) / 5 + 32}`;
				} else if (option == "fahrenheit") {
					return `Celsius: ${(((this.number - 32) * 5) / 9).toFixed(1)}`;
				}
			}
		}
		//passing input field value(num) to constructor class and passing select field value(option) to method as args.
		const result = new Temp(Number(num));
		var r = result.converter(option);
		// checking if ul length is less than zero and if it is than we display the results of calculation on the page,using loop
		if (ul.children.length < 1) {
			var li = document.createElement("li");
			li.id = "result-item";
			li.appendChild(document.createTextNode(r));
			ul.appendChild(li);
		}
		//setting value of num to empty string so that it won't stay in input field after click;
		num = document.getElementById("num").value = "";
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
