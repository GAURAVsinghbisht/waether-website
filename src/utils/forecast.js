const request = require('postman-request');


const forecast = (longitude,latitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=93d0d04a648f85b19c0fbc7dabc492f7&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;

    request({url,json:true},(error, {body} = {})=>{
        if(error){
            callback('Can not connect to weather stack api.',undefined)
        }else if(body.error){
            callback('Invalid locations',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] +'. It is '+ body.current.temperature + ' degree outside. It feels like ' + body.current.feelslike + ' degree outside. The humidity is ' + body.current.humidity);
        }
    });
}

module.exports = {
    forecast: forecast
}

