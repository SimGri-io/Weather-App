class AjaxWeather {
    constructor(){
        this.apiKey = '';
    }
    async getWeather(city){
        const url = ``;
        const weatherData = await fetch(url);
        const weather = weatherData.json();
        return weather;
    }
}

class Display {
    constructor(){
        this.results = document.querySelector('.results');
        this.cityName = document.querySelector('.cityName');
        this.cityCountry = document.querySelector('.cityCountry');
        this.cityIcon = document.querySelector('.cityIcon');
        this.cityTemperature = document.querySelector('.cityTemperature');
        this.cityHumidity = document.querySelector('.cityHumidity');
    }

    showWeather(data){
        const {name, sys:{country}, main:{temp, humidity}} = data;
        const {icon} = data.weather[0];

        this.results.classList.add('showItem');
        this.cityName.textContent = name;
        this.cityCountry.textContent = country;
        this.cityTemperature.textContent = temperature;
        this.cityHumidity.textContent = humidity;
        this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    }
}



const ajaxWeather = new AjaxWeather(); 
const display = new Display();

(function(){
    const form = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const feedback = document.querySelector('.feedback');


    city = cityInput.value

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        
        if(city.length === 0){
            showFeedback('You need to enter a city')
        }
        else{ 
            ajax.getWeather(city).then(data => {
            if(data.message === 'city not found'){
                showFeedback('such city doesnt exist')
            }
            else{
                display.showWeather(data)
            }
        })
        }
    })


    function showFeedback(text){
        feedback.classList.add('showItem')    
        feedback.innerHTML = `<p>${text}</p>`

        setTimeout(()=>{
            feedback.classList.remove('showItem')
        }, 3000)
    }


})()