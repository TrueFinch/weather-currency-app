export const OPEN_WEATHER_API_KEY = 'd3302fde77c5205c8da7690baba735d7';

export var weatherData = {
  isLoaded: false,
  today: null,
  forecast: [],
  btcToRubCurrency: 0.0,
  screenCallbacks: [],
}

export const weatherGroups = new Map([
  ['Rain', {
    color: '#005BEA',
    title: 'Дождь',
  }],
  ['Clear', {
    color: '#f7b733',
    title: 'Ясно',
  }],
  ['Thunderstorm', {
    color: '#616161',
    title: 'Гроза',
  }],
  ['Clouds', {
    color: '#1F1C2C',
    title: 'Облачно',
  }],
  ['Snow', {
    color: '#00d2ff',
    title: 'Снег',
  }],
  ['Drizzle', {
    color: '#076585',
    title: 'Морось',
  }],
  ['Haze', {
    color: '#66A6FF',
    title: 'Лёгкий туман',
  }],
  ['Mist', {
    color: '#3CD3AD',
    title: 'Туман',
  }],
  ['Smoke', {
    color: '#738276',
    title: 'Смог',
  }],
  ['Dust', {
    color: '#C0A080',
    title: 'Пылевая буря',
  }],
  ['Fog', {
    color: '#C0A080',
    title: 'Туман',
  }],
  ['Sand', {
    color: '#c2b280',
    title: 'Песчаная буря',
  }],
  ['Ash', {
    color: '#BEBAA7',
    title: 'Пепел',
  }],
  ['Squall', {
    color: '#616161',
    title: 'Шквальный ветер',
  }],
  ['Tornado', {
    color: '#616161',
    title: 'Торнадо',
  }],
]);


export class WeatherData {

  static uid = 0;
  constructor(date, curT, minT, maxT, humidity, windSpeed, groupID, desc, iconID) {
    this.id = WeatherData.uid;
    WeatherData.uid += 1;
    this.date = date;
    this.curT = curT;
    this.minT = minT;
    this.maxT = maxT;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.group = groupID;
    this.desc = desc;
    this.iconID = iconID;
  }
}

export default WeatherData;

export async function getWeather(lat = 0, lon = 0) {
  try {
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&appid=${OPEN_WEATHER_API_KEY}&exclude=minutely,hourly,alerts&units=metric`;
    var response = await fetch(url);
    var json = await response.json();
    console.log(json);
    var currDate = new Date();
    weatherData.today = new WeatherData(
      currDate,
      json.current.temp,
      json.daily[0].temp.min,
      json.daily[0].temp.max,
      json.current.humidity,
      json.current.wind_speed,
      json.current.weather[0].main,
      json.current.weather[0].description,
      json.current.weather[0].icon,
    );
    for (var i = 0; i < 7; ++i) {
      var date = new Date();
      date.setDate(date.getDate() + i);
      // console.log(date);
      weatherData.forecast.push(new WeatherData(
        date,
        null,
        json.daily[i].temp.min,
        json.daily[i].temp.max,
        json.daily[i].humidity,
        json.daily[i].wind_speed,
        json.daily[i].weather[0].main,
        json.daily[i].weather[0].description,
        json.daily[i].weather[0].icon,
      ));
    }
  } catch (err) {
    console.log(err)
  }
}

export async function getBtcCurrency() {
    try {
      var url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc/rub.min.json';
      var response = await fetch(url);
      var json = await response.json();
      console.log(json);
      weatherData.btcToRubCurrency = json.rub.toFixed(2);
    } catch(error) {
      console.log(error);
    }
}
