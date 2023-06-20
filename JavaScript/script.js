var htmlTimer = $('#timer');
var duration = 1500;
var button = $('#start-btn');
var pauseButton = $('#pause-btn');
var timerInterval;
var remainingTime = duration;
var isPaused = false;
var displayName = $('#display');
var displayTask = $('#task');
var textBox = $('#name');
var taskBox = $('#taskBox');


//timer
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

    //takes user to break screen after timer
    function takeAbreak() {
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

//this stores name
$(document).ready(function () {
    var names = [];
    var storedNames = localStorage.getItem("userName");

    if (storedNames) {
        names = JSON.parse(storedNames);
        displayName.text(names.join("\n"));
    }

    textBox.keydown(function (eventObj) {
        if (eventObj.keyCode === 13) {
            var userInput = textBox.val();

            names.push(userInput);
            localStorage.setItem("userName", JSON.stringify(names));

            displayName.html(names.map(name => name + "<br>").join(""));
            textBox.val("");
        }
    });
});

//this stores task
$(document).ready(function () {
    var tasks = [];
    var storedTasks = localStorage.getItem("userTask");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        displayTask.text(tasks.join("\n"));
    }

    taskBox.keydown(function (eventObj) {
        if (eventObj.keyCode === 13) {
            var userInputTask = taskBox.val();

            tasks.push(userInputTask);
            localStorage.setItem("userTask", JSON.stringify(tasks));

            displayTask.html(tasks.map(name => name + "<br>").join(""));
            taskBox.val("");
        }
    });
});


// URLs and APIs Dictionary and Thesaurus
var baseURL = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/';
var apiKey = '83c2a72e-bc0d-4ad6-9b37-d99b0ed1bfb3'
var thesaurusAPIKey = '3f455418-e1a4-47e9-853f-ca8eac707762'


//json response
function handleResponse(res) {
    return res.json();
}

//What to do
//Dictionary
async function displayInput(event) {
    //No Reset
    event.preventDefault();
   $('#output').empty();
    
   let inputValue = $("#inputField").val()
    var totalURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${inputValue}?key=83c2a72e-bc0d-4ad6-9b37-d99b0ed1bfb3`
    
   const response = await fetch(totalURL);
   const res = await response.json()
    console.log(res)

    const cardBody = $("<div>");
    const cardTitle = $("<h3>").text(`Word:${inputValue}`)
    const cardDef = $("<p>").text(res[0].shortdef);

    cardBody.append(cardTitle, cardDef);
    $('#output').append(cardBody);

}


function handleSubmit() {
    var inputValue2 = document.getElementById('inputField').value;
    console.log(inputValue2)
}

//Thesaurus

async function displayInputThes(event) {
    //No Reset
    event.preventDefault();
    $('#outputThes').empty();

    //Input
    let inputValueThes = $("#inputFieldThes").val()
    var totalURLThes = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${inputValueThes}?key=3f455418-e1a4-47e9-853f-ca8eac707762`
    
    //Response
   const responseThes = await fetch(totalURLThes);
   const resThes = await responseThes.json()
    console.log(resThes)

    //Output
    const cardBodyThes = $("<div>");
    const cardTitleThes = $("<h3>").text(`Word: ${inputValueThes}`)
    const cardDefThes = $("<p>").text(resThes[0].meta.syns[0]);

    cardBodyThes.append(cardTitleThes, cardDefThes);
    $('#outputThes').append(cardBodyThes);

}



function handleSubmitThes() {
    var inputValueThes = document.getElementById('inputFieldThes').value;
    console.log(inputValueThes)
}









// var breakTimer = $('#timer-text');
// var timeStart = 300;
// // var button = $('#start-break');
// // var pauseButton = $('#pause-break');
// var timerBreak;
// var remainingBreak = timeStart;
// // var isPaused = false;


// $(function () {
//     function startTimer() {
//         var startTime = dayjs();
//         var endTime = startTime.add(remainingBreak, 'second');

//         timerBreak = setInterval(function () {
//             var currentTime = dayjs();
//             remainingBreak = endTime.diff(currentTime, 'second');

//             if (remainingBreak <= 0) {
//                 clearInterval(timerBreak);
//                 takeAbreak();

//             }

//             updateDisplayTime();
//         }, 1000);
//     }


//     //takes user to break screen after timer
//     function takeAbreak() {
//         window.location.href = './focus.html';
//     }


//     function updateDisplayTime() {
//         var minutes = Math.floor(remainingTime / 60);
//         var seconds = remainingTime % 60;

//         var formattedTime = dayjs().minute(minutes).second(seconds).format('mm:ss');
//         breakTimer.text(formattedTime);
//     }

//     startTimer();


// });