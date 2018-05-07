import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'

class App extends Component {
state={
  temp:undefined,
  city:undefined,
  country:undefined,
  humidity:undefined,
  desc:undefined,
  error:undefined
}
getWeather=async(e)=>{
  e.preventDefault();
  const city=e.target.elements.city.value;
const country=e.target.elements.country.value;
  const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=eec5c297fd91d3fa42c6178d775f5a57&units=metric`);
  const data= await api_call.json();
if(city&&country){
  console.log(data);
  this.setState({
    temp:data.main.temp,
    city:data.name,
    country:data.sys.country,
    humidity:data.main.humidity,
    desc:data.weather[0].description,
    error:""
  })
}else{
  console.log(data);
  this.setState({
  temp:undefined,
  city:undefined,
  country:undefined,
  humidity:undefined,
  desc:undefined,
  error:"Please enter the value"
  })
}

}

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Title />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temp={this.state.temp}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    desc={this.state.desc}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
