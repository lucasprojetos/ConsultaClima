import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [location, setLocation] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  const [weather, setWeather] = useState(false);
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: '6bceb1e3073d8300340d5b083bbae0aa',
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }
  if (location === false) {
    return (
      <Fragment>
        Habilite sua localização no browser :)
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        Carregando o clima..
    </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>Clima agora em ({weather['name']})</h3>
        <hr />
        <ul>
          <li><b>Nuvens:</b> {weather['weather'][0]['description']}</li>
          <li><b>Temperatura atual:</b> {weather['main']['temp']} º </li>
          <li><b>Temperatura máxima:</b> {weather['main']['temp_max']} º</li>
          <li><b>Temperatura mínima:</b> {weather['main']['temp_min']} º</li>
          <li><b>Pressão:</b> {weather['main']['pressure']} hpa</li>
          <li><b>Umidade:</b> {weather['main']['humidity']} %</li>
          <hr/>
          <li><b>País:</b> {weather['sys']['country']} </li>
        </ul>
        <MapGL
                width = {width}
                height = {height}
                {... this.state.viewport}
                mapStyle = "mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={TOKEN}
                onViewStateChange={viewport => this.setState({ viewport })}
                />
      </Fragment>
    );
  }
}

export default App;
