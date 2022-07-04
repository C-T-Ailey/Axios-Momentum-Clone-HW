const icons = {
    clear: '☀',
    rain: '️🌧',
    storm: '⛈',
    snow: '🌨',
    mist: '🌫',
    clouds: '☁',
  };

$(document).ready(function(){
    
    axios({
        method: 'get',
        url: 'https://api.unsplash.com/photos/random?client_id=Iy4JSDrqcwwRCAF9nSs7JsFShvNyaCyGxkdHNz1Ojl8'
    })
    .then(response => {

        if(response.status == 200){
            $('body').attr('style', `background-image: url(${response.data.urls.full})`)
            //$('body').append(`<img src=${response.data.message}>`)
            //$('img').attr('src', `${response.data.message}`)
        }
    })
    .catch(error => {
        console.log(error)
    })

    // Weather
    axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather?lat=51.441883&lon=0.370759&units=metric&appid=696a1919fa89cdb1b575149e61261db6'
    })
    .then(response => {
        console.log(response.data)
        if(response.status == 200){
            icon = icons[response.data.weather[0].main.toLowerCase()]
            
            $('body').append('<div id="weather"></div>')
            $('#weather').append(`<h3>${icon} ${response.data.main.temp}°C</h3> <p>${response.data.name}</p>`)
        }
    })

    // Quote
    axios({
        method: 'get',
        url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
    })
    .then(response => {

        if(response.status == 200){
            $('body').append('<div id="quote"></div>')
            $('#quote').append(`<p>"${response.data.quoteText}"<br>—${response.data.quoteAuthor}</p>`)
        }
    })

    // Time
    $('body').append(`<div id="time">${moment().format('LT')}</div>`)
    var currentHour = moment().format('HH');
    var greeting = ''
    if (currentHour >= 3 && currentHour < 12){
        greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 15){
        greeting = "Good Afternoon";
    }   else if (currentHour >= 15 && currentHour < 20){
        greeting = "Good Evening";
    } else if (currentHour >= 20 && currentHour < 3){
        greeting = "Good Night";
    }

    $('#time').append(`<p>${greeting}, Chris</p>`)
    
})