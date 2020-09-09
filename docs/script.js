// ------ Global Variables ------ //
var getToday = document.querySelector("#currentDay");
var momentToday = moment().format("MMMM DD YYYY");
var timeText = document.querySelectorAll(".time-text");
var saveBtn = document.querySelector(".saveicon");
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
};

//Load existing localstorage object on page load
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
// On click, target items to change
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
        readFromLocalStorage();
    }
    var workHours = JSON.parse(localStorage.getItem("dayObject"));
    workHours[hourStr] = val
    saveToLocalStorage(workHours);
}

//Read from local storage
function readFromLocalStorage() {
    localStorage.setItem('dayObject', JSON.stringify(dayObject));
};

function saveToLocalStorage(dayObj) {
    localStorage.setItem('dayObject', JSON.stringify(dayObj));
}

function updateCalendar(day) {
    $("tr").each(function (index) {
        var res = $(this).children(".time-value");
        $(this).children(".time-text").text(day[res.text()]);
    })
}

// Extra - countdown to your next appointment
var timerEl = document.querySelector("#ticker");
var calculatedTime;
window.setInterval(function(){
    runTimer()
},1000);

function runTimer() {
    var minutesLeft = 60 - +(moment().minutes());
    var secondsLeft = 60 - +(moment().seconds());
    if (secondsLeft < 10) {
        secondsLeft = "0"+secondsLeft
    }
    calculatedTime = (+minutesLeft + ":" + secondsLeft)
    timerEl.innerHTML = calculatedTime;
}