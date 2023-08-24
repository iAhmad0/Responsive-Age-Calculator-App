// get current date
const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();


// get user's input
const inputYear = document.getElementById("year");
const inputMonth = document.getElementById("month");
const inputDay = document.getElementById("day");


const errYear = document.createElement("p");
errYear.classList.add("hide");
errYear.classList.add("invalid");
errYear.classList.add("red");
errYear.textContent = "Must be in the past";
document.querySelector(".year").append(errYear);

const errMonth = document.createElement("p");
errMonth.classList.add("hide");
errMonth.classList.add("invalid");
errMonth.classList.add("red");
errMonth.textContent = "Must be a valid month";
document.querySelector(".month").append(errMonth);

const errDay = document.createElement("p");
errDay.classList.add("hide");
errDay.classList.add("invalid");
errDay.classList.add("red");
errDay.textContent = "Must be a valid day";
document.querySelector(".day").append(errDay);

const trueDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// function to check if there are any empty fields, and then check for errors in the date
function getInfo() {
    let flag = true;
    const inYear = inputYear.valueAsNumber;
    const inMonth = inputMonth.valueAsNumber;
    const inDay = inputDay.valueAsNumber;

    if (isNaN(inYear)) {
        errYear.textContent = "This field is required";
        document.querySelector(".year p").classList.remove("hide");
        document.querySelector(".year span").classList.add("red");
        document.querySelector(".year input").classList.add("border-red");
        flag = false;
    }

    if (isNaN(inMonth)) {
        errMonth.textContent = "This field is required";
        document.querySelector(".month p").classList.remove("hide");
        document.querySelector(".month span").classList.add("red");
        document.querySelector(".month input").classList.add("border-red");
        flag = false;
    }

    if (isNaN(inDay)) {
        errDay.textContent = "This field is required";
        document.querySelector(".day p").classList.remove("hide");
        document.querySelector(".day span").classList.add("red");
        document.querySelector(".day input").classList.add("border-red");
        flag = false;
    }
    
    if (!flag) {
        return flag;
    }

    if (inYear > year) {
        document.querySelector(".year p").classList.remove("hide");
        document.querySelector(".year span").classList.add("red");
        document.querySelector(".year input").classList.add("border-red");
        flag = false;
    } else {
        document.querySelector(".year p").classList.add("hide");
        document.querySelector(".year span").classList.remove("red");
        document.querySelector(".year input").classList.remove("border-red");
    }

    if (inMonth > 12 || inMonth < 1) {
        document.querySelector(".month p").classList.remove("hide");
        document.querySelector(".month span").classList.add("red");
        document.querySelector(".month input").classList.add("border-red");
        flag = false;
    } else {
        document.querySelector(".month p").classList.add("hide");
        document.querySelector(".month span").classList.remove("red");
        document.querySelector(".month input").classList.remove("border-red");
    }

    if (inputDay.valueAsNumber > 31 || inputDay.valueAsNumber < 1) {
        document.querySelector(".day p").classList.remove("hide");
        document.querySelector(".day span").classList.add("red");
        document.querySelector(".day input").classList.add("border-red");
        errDay.textContent = "Must be a valid day";
        flag = false;
    } else {
        document.querySelector(".day p").classList.add("hide");
        document.querySelector(".day span").classList.remove("red");
        document.querySelector(".day input").classList.remove("border-red");
    }

    if (inDay > trueDate[inMonth - 1]) {
        document.querySelector(".year span").classList.add("red");
        document.querySelector(".year input").classList.add("border-red");
        document.querySelector(".month span").classList.add("red");
        document.querySelector(".month input").classList.add("border-red");

        errDay.textContent = "Must be a valid date";
        document.querySelector(".day p").classList.remove("hide");
        document.querySelector(".day span").classList.add("red");
        document.querySelector(".day input").classList.add("border-red");
        flag = false;
    }
    if (!flag) {
        return flag;
    }
    if (inputMonth.valueAsNumber != 2) {
        if (inputDay.valueAsNumber <= trueDate[inputMonth.valueAsNumber - 1]) {
            return true;
        }
        return false;
    } else if (inputMonth.valueAsNumber == 2) {
        if ((inputYear.valueAsNumber % 4) == 0) {
            if( inputYear.valueAsNumber % 100 == 0) {
                if (inputYear.valueAsNumber % 400 == 0) {
                    if (inputDay.valueAsNumber <= (trueDate[1] + 1)) {
                        return true;
                    }
                }
                return false;
            }
            return true;
        } else {
            if (inputDay.valueAsNumber <= trueDate[1]) {
                return true;
            }
        }
    }
    
    return false;
}


// display output
const outYear = document.getElementById("outYear");
const outMonth = document.getElementById("outMonth");
const outDay = document.getElementById("outDay");

document.querySelector(".circle").addEventListener("click", function () {
    getAge(getInfo());
});

// function to calculate the time passed since the input date
function getAge(display) {
    let yearAge = year - inputYear.valueAsNumber;
    let monthAge = month - inputMonth.valueAsNumber;
    let dayAge = day - inputDay.valueAsNumber;

    if (dayAge < 0) {
        monthAge -= 1;
        dayAge += 30;
    }

    if (monthAge < 0) {
        yearAge -= 1;
        monthAge += 12;
    }

    if (display == false) {
        outYear.textContent = '--';
        outMonth.textContent = '--';
        outDay.textContent = '--';
    } else {
        if ( !(yearAge < 0) && !(isNaN(yearAge) || isNaN(monthAge) || isNaN(dayAge)) ) {
            outYear.textContent = yearAge;
            outMonth.textContent = monthAge;
            outDay.textContent = dayAge;
        }
    }
}

// function to allow only 2 digit numbers in day and month, and add 0 to the left in case of a 1 digit number
// and allow maximum of 4 digit numbers in year
function check(event) {
    if (event.target.id != 'year') {
        if (event.target.value < 10) {
            event.target.value = "0".concat(event.target.value);
        }
        if (event.target.value == 0) {
            event.target.value = null;
        }
        if (event.target.value > 10 && event.target.value.includes("0")) {
            event.target.value = event.target.value.slice(1);
        }
    }

    if (event.target.value < -9999) {
        event.target.value = Math.ceil(event.target.value / 10);
    }
    else if (event.target.value > 9999) {
        event.target.value = Math.floor(event.target.value / 10);
    } 
    else if (event.target.id != 'year' && event.target.value > 99) {
        event.target.value = Math.floor(event.target.value / 10);
    }
}