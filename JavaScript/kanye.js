var url = 'https://api.kanye.rest/'
var quoteOutput = document.querySelector('#break-quote')
var quoteDiv = document.querySelector('#quote-display')
var timer = document.querySelector('#timer-text')


function makeRequest() {
    return fetch(url)
        .then(function (res) {
            return res.json();
        })
}

makeRequest()
    .then(function (data) {
        quoteOutput.innerText = data.quote;
        console.log(data)
    })


var timer = $('#timer-text');
var duration = 300;
var timerInterval;
var remainingTime = duration;


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
        function takeAbreak(){
            window.location.href = './focus.html';
        }

        function updateDisplayTime() {
            var minutes = Math.floor(remainingTime / 60);
            var seconds = remainingTime % 60;
    
            var formattedTime = dayjs().minute(minutes).second(seconds).format('mm:ss');
            timer.text(formattedTime);
        }

        startTimer();

    });