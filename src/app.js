
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodeProp = require('./utils/geocode')
const forecastProp = require('./utils/forecast')
const request = require('postman-request');

const app = express()

const port = process.env.Port || 3000;


// Define paths for express conifg
const publicDirectoryPath = path.join(__dirname,"../public");  // join method of path (node core module) can join path
const viewsPath = path.join(__dirname,"../templates/views");  // we can also rename the views folder so that express use that folder as view folder
const partialsPath = path.join(__dirname,"../templates/partials")
// setup static directory to serve
app.use(express.static(publicDirectoryPath));   // use this if you want to serve static content in ur app

// setup handlebars engine and views location

app.set('view engine','hbs')  // using handlebars templating engine to serve up by express
app.set('views',viewsPath)  // setting path of view files to serve up by express
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
   res.render('index',{   // using render method to render view
       name:'Gauri',
       title:'Weather App'
   })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Gauri',
        title: 'About me'
    })
})
//
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Gauri',
        title: 'Help',
        helpText: 'This is some helpful text'

    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send(
            {
                    error:'Please provide the address'
                  }
        )
    }
    const address = req.query.address;
    geocodeProp.geocode(address,(error,{longitude,latitude,location} ={})=>{
        if(error){
            return res.send(
                {
                         error
                      }
                )
        }
        forecastProp.forecast(longitude,latitude,(error,forecastData)=>{
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                foreacast: forecastData,
                location: location,
                address:address
            })
        });
    });
})

app.get('/help/*',(req,res)=>{
    res.render('pageNotFound',{
        text:'Help page not found',
        name:'Gauri',
        title: '404',
        }

    )
})


app.get('*',(req,res)=>{
    res.render('pageNotFound',{
        text:'Page not found',
        name:'Gauri',
        title: '404',
    })
})

app.listen(port,()=>{
console.log('Server is up and running on' + port);
});  // callback function argument is optional in listen method

