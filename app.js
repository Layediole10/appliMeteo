let wrapper = document.querySelector(".wrapper");
let inputContainer = document.querySelector(".inputContainer");
let infoText = document.querySelector(".info-txt");
let inputfield = document.querySelector("input");
let locationBtn = document.querySelector("button");
let arrowBack = wrapper.querySelector("header i");

let wIcons = document.querySelector(".weather-part img");

let api;



inputfield.addEventListener("keyup", e => {

    if(e.key == "Enter" && inputfield.value != "" ){
       requestApi(inputfield.value);
    }
})

locationBtn.addEventListener("click", () => {

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
})

function onSuccess(position){

    const {latitude, longitude} = position.coords; 
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=811c337d89761b9ba9c8bff1e4cc8e97`
    fetchData();
}

function onError(error){

    infoText.innerText = error.message;
    infoText.classList.add("error");
}

function requestApi(city){

    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=811c337d89761b9ba9c8bff1e4cc8e97`
    fetchData();
}

function fetchData(){

    fetch(api).then(response  => response.json()).then(result => weatherDetails(result));
    infoText.innerText = "obtenir des détails sur la météo....";
    infoText.classList.add("pending");
}

function weatherDetails(info){

    infoText.classList.replace("pending", "error");
    if(info.cod == "404"){

        infoText.innerText = `${inputfield.value} n'est pas une ville valide`;
    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0]
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wIcons.src = "./img-meteo/nuage-soleil2.webp";
        }
        else if(id >=200 || id <= 232){
            wIcons.src = "./img-meteo/orage3.jpg";
        }
        else if(id >=300 || id <= 321){
            wIcons.src = "./img-meteo/drizze2.jng";
        }
        else if(id >=500 || id <= 531){
            wIcons.src = "./img-meteo/pluies2.jpg";
            
        }
        else if(id >=600 || id <= 622){
            wIcons.src = "./img-meteo/neige2.webp";
        }
        else if(id >=701 || id <= 781){
            wIcons.src = "./img-meteo/atmosphere2.webp";
        }
        else if(id >=801 || id <= 804){
            wIcons.src = "./img-meteo/nuage2.png";
        }
        

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
       

        infoText.classList.remove("pending", "error")
        wrapper.classList.add("active");
        console.log(info);


    }

    
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
    
})