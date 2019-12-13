const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

console.log(__dirname);
console.log(__filename);

app.set('view engine', 'hbs');

const publiDirPath = path.join(__dirname, '../public');
app.use(express.static(publiDirPath));

const viewPath = path.join(__dirname, '../template/views');
app.set('views', viewPath);

const partialPath = path.join(__dirname, '../template/partials');
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'weather',
    name: 'priyanka'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about',
    name: 'priyanka'
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help',
    name: 'priyanka'
  });
});
app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'error',
    errorMsg: 'help article not found',
    name: 'priyanka'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'u must provide address'
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error: error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          console.log('forecast data ' + forecastData);
          if (error) {
            return res.send({
              error: error
            });
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          });
        });
      }
    );
  }
});
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'search need to be passed'
    });
  }
  console.log(req.query.search);
  return res.send({
    products: []
  });
});
app.get('*', (req, res) => {
  res.render('error', {
    title: 'error',
    errorMsg: '404 error',
    name: 'priyanka'
  });
});
app.listen(port, () => {
  console.log('server is listening on 3000');
});
