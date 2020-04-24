

class AjaxWeather {
    constructor(){
        this.apiKey = '7768d3462433c1b04586635af05cfa5a';
    }
    async getWeather(city){
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
        const weatherData = await fetch(url);
        const weather = await weatherData.json();
        return weather;
    }
}

class Display{
    constructor(){
        this.results = document.querySelector('.results');
        this.cityName = document.getElementById('cityName');
        this.cityCountry = document.getElementById('cityCountry');
        this.cityIcon = document.getElementById('cityIcon');
        this.cityTemperature = document.getElementById('cityTemperature');
        this.cityHumidity = document.getElementById('cityHumidity');
       
    }
    showWeather(data){
        // console.log(data);
        const {name,sys:{country},main:{temp,humidity}} = data;
        const {icon} = data.weather[0];

        this.results.classList.add('showItem');
        this.cityName.textContent = name;
        this.cityCountry.textContent = country;
        this.cityTemperature.textContent = temp;
        this.cityHumidity.textContent = humidity;
        this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;

    }
    showPicture(temp){
        this.cityTemperature.textContent = temp
        this.cold.src = cold
        this.warm.src = warm

        if(temp < 0){
            return cold.add('showItem')
        }
        else{
            return warm.add('showItem')
        }
    }
}

(function(){

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const feedback = document.querySelector('.feedback');



// class
const ajax = new AjaxWeather();
const display = new Display();

form.addEventListener('submit', event =>{
    event.preventDefault();

    const city = cityInput.value;
    
    if(city.length === 0){
        showFeedback('city value cannot be empty')
    }
    else{
        ajax.getWeather(city).then(data => {
            if(data.message === 'city not found'){
                showFeedback('city with such name cannot be found');
            }
            else{
                display.showWeather(data);
            }
        });
    }
});


function showFeedback(text){
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p>`

    setTimeout(() => {
        feedback.classList.remove('showItem');
    }, 3000)
}


})();