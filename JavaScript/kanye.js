var url = 'https://api.kanye.rest/'

function makeRequest() {
    return fetch(url)
        .then(function (res) {
            return res.json();
        })
}

makeRequest()
    .then(function(data){
        console.log(data);
    })