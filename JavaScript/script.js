var htmlTimer = $('#timer');
var duration = 1500;
var button = $('#start-btn');
var pauseButton = $('#pause-btn');
var timerInterval;
var remainingTime = duration;
var isPaused = false;

$(function () {
    function startTimer() {
        var startTime = dayjs();
        var endTime = startTime.add(remainingTime, 'second');

        timerInterval = setInterval(function () {
            var currentTime = dayjs();
            remainingTime = endTime.diff(currentTime, 'second');

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                
            }
        
            updateDisplayTime();
        }, 1000);
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
