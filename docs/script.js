// ------ Global Variables ------ //
var getToday = document.querySelector("#currentDay");
var momentToday = moment().format("MMMM DD YYYY");
var timeText = document.querySelectorAll(".time-text");
var saveBtn = document.querySelector(".saveicon");
var userInput = document.querySelector(".time-text").innerHTML;
var previouslyStored;
var nowStored;
var timeSpan = document.querySelector("#time-span");
var count = 1;
var value;
var hourStr;
var dayObject = {
    "8:00 AM": "",
    "9:00 AM": "",
    "10:00 AM": "",
    "11:00 AM": "",
    "12:00 AM": "",
    "1:00 PM": "",
    "2:00 PM": "",
    "3:00 PM": "",
    "4:00 PM": "",
    "5:00 PM": "",
    "6:00 PM": "",
}
$(document).ready(function () {
    if (!localStorage.getItem("dayObject")) {
        updateCalendar(dayObject);
    } else {
        updateCalendar(JSON.parse(localStorage.getItem("dayObject")));
    }
});

// ------ Global Functions ------ //

//For loop to add class to various hours
for (var property in dayObject) {
    var textInput = "#text-input" + count;
    var hourNow = moment().format("H");
    //Below testing if all times work
    // var hourNow = 10;
    $(textInput).text(dayObject[property]);
    var timeId = "#time" + count;
    var timeStr = $(timeId).text();
    var timeNum = hourCompare(timeStr);
    //Assign class to each hour per hourCompare
    if (timeNum < hourNow) {
        $(textInput).addClass("past");
    } else if (timeNum > hourNow) {
        $(textInput).addClass("future");
    } else {
        $(textInput).addClass("present");
    }
    count++;
}

// Function for Time Ticker
function displayClock() {
    var display = new Date().toLocaleTimeString();
    timeSpan.innerHTML = display;
    setTimeout(displayClock, 1000);
}
// // Current Day and Time with Moment.js
getToday.innerHTML = momentToday;
// // Current Time Display
timeSpan.innerHTML = displayClock()
// On click
$(".saveBtn").click(function () {
    value = $(this).parent().siblings(".time-text").html();
    hourStr = $(this).parent().siblings(".time-value").html();

    saveSchedule(hourStr, value);
});

// Returning hour for comparison to hourNow
function hourCompare(hourStr) {
    switch (hourStr) {
        case "8:00 AM": return 8;
        case "9:00 AM": return 9;
        case "10:00 AM": return 10;
        case "11:00 AM": return 11;
        case "12:00 PM": return 12;
        case "1:00 PM": return 13;
        case "2:00 PM": return 14;
        case "3:00 PM": return 15;
        case "4:00 PM": return 16;
        case "5:00 PM": return 17;
        case "6:00 PM": return 18;
    }
}

//Saving user amended schedule
function saveSchedule(hourStr, val) {
    if (!localStorage.getItem('dayObject')) {
        window.onload = readFromLocalStorage();
    }
    var workHours = JSON.parse(localStorage.getItem("dayObject"));
    workHours[hourStr] = val
    saveToLocalStorage(workHours);
}

//Read from local storage
function readFromLocalStorage() {
    localStorage.setItem('dayObject', JSON.stringify(dayObject));
};

function saveToLocalStorage(dayObject) {
    localStorage.setItem('dayObject', JSON.stringify(dayObject));
}

function updateCalendar(dayObject) {
    $("th").each(function (index) {
        var res = $(this).children("td");
        $(this).children("td").text(dayObject[res.text()]);
    })
}

// Extra - countdown to your next appointment









// //On click, writeToLocalStorage
// // saveBtn.addEventListener('click', writeToLocalStorage);

//On load, read and display whatever is stored in Local Storage, read value from time property, assign as text back in element (using its class (.description) and id (specific to each hour)
// function readFromLocalStorage() {
//     for (var i = 0; i < timeText.length; i++) {
//         // If previously stored exists in local storage, get it from local storage
//         previouslyStored = JSON.parse(window.localStorage.getItem("previouslyStored")) || [];
//         timeText[i].innerHTML = previouslyStored;
//     }
//     checkColor();
// }

// Not working correctly yet below
//             - read text from text area (class = "time-text", should be parent of save button)
//             - read schedule hour
//             - trim text, trim schedule hour
//             - send to local storage
// function writeToLocalStorage() {
//     for (var i = 0; i < timeText.length; i++) {
//         // If userInput Exists, Write it to Local Storage
//         if (userInput !== "") {
//             nowStored = timeText[i].innerHTML;
//             nowStored.innerHTML = userInput;
//             previouslyStored.push(nowStored);
//             previouslyStored = window.localStorage.setItem("previouslyStored", JSON.stringify(previouslyStored));
//             userInput = window.localStorage.setItem("userInput", JSON.stringify(userInput));
//             timeText[i].innerHTML = userInput;
//         }
//         checkColor();
//     }
// }