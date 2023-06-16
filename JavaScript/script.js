var htmlTimer = $('#timer');
var duration = 1500;
var button = $('#start-btn');
var pauseButton = $('#pause-btn');
var timerInterval;
var remainingTime = duration;
var isPaused = false;
var displayName = $('#display');
var displayTask = $('#task');
var textBox = $('#name') ;
var taskBox =  $('#taskBox');
//var nameForm = document.getElementById('userForm');


$(function () {
    function startTimer() {
        var startTime = dayjs();
        var endTime = startTime.add(remainingTime, 'second');

        timerInterval = setInterval(function () {
            var currentTime = dayjs();
            remainingTime = endTime.diff(currentTime, 'second');

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                takeAbreak();

            }

            updateDisplayTime();
        }, 1000);
    }

    function takeAbreak(){
        window.location.href = './break.html';
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isPaused = true;
    }

    function resumeTimer() {
        isPaused = false;
        startTimer();
    }

    function updateDisplayTime() {
        var minutes = Math.floor(remainingTime / 60);
        var seconds = remainingTime % 60;

        var formattedTime = dayjs().minute(minutes).second(seconds).format('mm:ss');
        htmlTimer.text(formattedTime);
    }

    button.on('click', function () {
        startTimer();
    });

    pauseButton.on('click', function () {
        if (isPaused) {
            resumeTimer();
        } else {
            pauseTimer();
        }


    });


});

$(document).ready(function() {
    var names = [];
    var storedNames = localStorage.getItem("userName");

    if (storedNames) {
        names = JSON.parse(storedNames);
        displayName.text(names.join("\n"));
    }

    textBox.keydown(function(eventObj) {
        if (eventObj.keyCode === 13) {
            var userInput = textBox.val();

            names.push(userInput);
            localStorage.setItem("userName", JSON.stringify(names));

            displayName.html(names.map(name => name + "<br>").join(""));
            textBox.val("");
        }
    });
});

$(document).ready(function() {
    var tasks = [];
    var storedTasks = localStorage.getItem("userTask");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        displayTask.text(tasks.join("\n"));
    }

    taskBox.keydown(function(eventObj) {
        if (eventObj.keyCode === 13) {
            var userInputTask = taskBox.val();

            tasks.push(userInputTask);
            localStorage.setItem("userTask", JSON.stringify(tasks));

            displayTask.html(tasks.map(name => name + "<br>").join(""));
            taskBox.val("");
        }
    });
});

