
const weatherDiv = document.getElementById("weather")
const cityForm = document.getElementById("city-form")
// const myTableList = document.getElementById("myTable")
// const firstTable = document.getElementById("firstTable")




const getWeather = async function (city) {
  // const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=04ac07678f614ef6a9c202413231705&q=${city}&aqi=yes`)
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=04ac07678f614ef6a9c202413231705&q=${city}&days=3&aqi=no&alerts=no`)

  let weatherData = await response.json()
  console.log(weatherData);

  return weatherData
}

const displayCurrentWeather = async function (city) {
  const weatherData = await getWeather(city);


  document.getElementById("headerLocName").innerHTML = weatherData.location.name + ' , ' + weatherData.location.region + ' , ' + weatherData.location.country + ' .';
  document.getElementById("curentTemp").innerHTML = weatherData.current.temp_f + ' ' + '&#8457';
  document.getElementById("feelsliike").innerHTML = 'Feels Like ' + weatherData.current.feelslike_f + ' ' + '&#8457';
  document.getElementById("condition").innerHTML = weatherData.current.condition.text;
  document.getElementById("tempImg").innerHTML = `<img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">`;
  document.getElementById("windSpd").innerHTML = `<h5> Wind speed : ${weatherData.current.wind_mph} mph</h5>`;
  document.getElementById("Humidity").innerHTML = `<h4> Humidity : ${weatherData.current.humidity} % </h4>`;

  let div = document.getElementById('container');
  div.style.display = 'block';




  console.log(weatherData.forecast.forecastday);
  console.log(weatherData.current);
  const hourArray = weatherData.forecast.forecastday;





  let count = 0;


  document.getElementById("sec2header").innerHTML = 'Hourly Forecast';
  document.getElementById("sec2header").style.fontSize = '30px';
  document.getElementById("sec3header").innerHTML = 'Upcoming Days Forecast';
  document.getElementById("sec3header").style.fontSize = '30px';
  let div3 = document.getElementById('container2');
  div3.style.display = 'block';


  document.getElementById("container2").innerHTML = '';
  let main1 = document.getElementById("container2");

  outer:
  for (let x in hourArray) {
    console.log('hourArray : ' + hourArray[x]);
    console.log('selvi' + x);

    inner:
    for (let y in hourArray[x].hour) {
      console.log('Ayyappan' + y);
      if (new Date(hourArray[x].hour[y].time) > new Date()) {


        let cardColumn1 = document.createElement("div");
        cardColumn1.classList.add('column1');

        let card11 = document.createElement("div");
        card11.classList.add('card1');

        // creating header
        let cardHdred = document.createElement('h3');
        cardHdred.style.paddingBottom = '10px';
        cardHdred.innerHTML = hourArray[x].hour[y].time;
        card11.appendChild(cardHdred);

        // creating parah 1
        let cardP11 = document.createElement('p');
        cardP11.innerHTML = 'Temp  ' + hourArray[x].hour[y].temp_f + ' ' + '&#8457';
        card11.appendChild(cardP11);

        // creating parah 2
        let cardP21 = document.createElement('p');
        cardP21.innerHTML = 'Feels Like ' + hourArray[x].hour[y].feelslike_f + ' ' + '&#8457';
        card11.appendChild(cardP21)




        let cardP41 = document.createElement('p');
        cardP41.textContent = 'Humidity ' + hourArray[x].hour[y].humidity + ' ' + '%';
        card11.appendChild(cardP41);

        cardColumn1.appendChild(card11)
        main1.appendChild(cardColumn1);

        let cardImage1 = document.createElement('p');
        cardImage1.innerHTML = `<img src=${hourArray[x].hour[y].condition.icon}>`;
        card11.appendChild(cardImage1);

        let cardP35 = document.createElement('p');
        cardP35.textContent = hourArray[x].hour[y].condition.text;
        card11.appendChild(cardP35);




        count++;
        console.log('count' + count);
        if (count == 3) {
          console.log('inside if look' + count);
          break outer;
        }
      }
    }
  }









  let div2 = document.getElementById('container3');
  div2.style.display = 'block';



  document.getElementById("container3").innerHTML = '';
  let main = document.getElementById("container3");


  for (let x in hourArray) {


    let cardColumn = document.createElement("div");
    cardColumn.classList.add('column1');

    let card = document.createElement("div");
    card.classList.add('card1');

    let cardHdr = document.createElement('h3');
    cardHdr.style.paddingBottom = '10px';
    cardHdr.innerHTML = hourArray[x].date;
    card.appendChild(cardHdr);

    let cardP1 = document.createElement('p');
    cardP1.innerHTML = 'Max Temp ' + hourArray[x].day.maxtemp_f + ' ' + '&#8457';
    card.appendChild(cardP1);

    let cardP2 = document.createElement('p');
    cardP2.innerHTML = 'Min Temp ' + hourArray[x].day.mintemp_f + ' ' + '&#8457';
    card.appendChild(cardP2);


    let cardImage = document.createElement('p');
    cardImage.innerHTML = `<img src=${hourArray[x].day.condition.icon}>`;
    card.appendChild(cardImage);

    let cardP3 = document.createElement('p');
    cardP3.textContent = hourArray[x].day.condition.text;
    card.appendChild(cardP3);


    cardColumn.appendChild(card)
    main.appendChild(cardColumn);

  }



}

// Step-3: take user input from the html and search for the city requested
cityForm.addEventListener("submit", function (event) {
  event.preventDefault()
  const userCity = document.getElementById("city").value
  displayCurrentWeather(userCity)
})









