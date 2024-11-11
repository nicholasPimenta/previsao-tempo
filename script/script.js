/* QuerySelector */
const pesquisa = document.querySelector("#container__pesquisa__form");
const clima = document.querySelector("#container__infos");
const titulo = document.querySelector("#container__infos__titulo");
const imagemClima = document.querySelector("#infos__weather__img");
const tempClima = document.querySelector("#infos__weather__temp");
const descClima = document.querySelector("#infos__weather__desc");
const tempMax = document.querySelector("#temp-max");
const tempMin = document.querySelector("#temp-min");
const vento = document.querySelector("#vento");
const umidade = document.querySelector("#umidade");
const alerta = document.querySelector("#alerta");

/* Prevent default, Api, Mensagens e Infos */
pesquisa.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cidade = document.querySelector("#nome__cidade").value;
    
    if(!cidade) {
        clima.classList.remove("container__clima");
        showAlert("Você precisa digitar alguma cidade.");
        return;
    }

    const apiKey = "YOUR_KEY_HERE";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const resultsConvertido = await results.json();
    if(resultsConvertido.cod === 200){
        showInfos({
            cidade: resultsConvertido.name,
            pais: resultsConvertido.sys.country,
            temp: resultsConvertido.main.temp,
            maxTemp: resultsConvertido.main.temp_max,
            minTemp: resultsConvertido.main.temp_min,
            humidity: resultsConvertido.main.humidity,
            wind: resultsConvertido.wind.speed,
            descricao: resultsConvertido.weather[0].description,
            icone: resultsConvertido.weather[0].icon
        })
    } else {
        clima.classList.remove("container__clima");
        showAlert(`
            Não foi possível localizar.

            <img src="img/not_found.svg"/>
        `)
    }
})

/* Infos do clima */
function showInfos(resultsConvertido){
    showAlert("");

    clima.classList.add("container__clima");

    titulo.innerHTML = `${resultsConvertido.cidade}, ${resultsConvertido.pais}`;
    tempClima.innerHTML = `${resultsConvertido.temp.toFixed(0)} Cº`;
    descClima.innerHTML = `${resultsConvertido.descricao}`;
    tempMax.innerHTML = `${resultsConvertido.maxTemp.toFixed(0)} Cº`;
    tempMin.innerHTML = `${resultsConvertido.minTemp.toFixed(0)} Cº`;
    vento.innerHTML = `${resultsConvertido.wind.toFixed(0)} km/h`;
    umidade.innerHTML = `${resultsConvertido.humidity} %`;
    imagemClima.setAttribute('src', `https://openweathermap.org/img/wn/${resultsConvertido.icone}@2x.png`)
}

/* Alerta pra digitar cidade */
function showAlert(mensagem) {
    alerta.innerHTML = mensagem;
}