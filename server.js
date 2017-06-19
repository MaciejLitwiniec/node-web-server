const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//heroku setup
const port = process.env.PORT || 3000;
var app = express();

//Partials are reusable... Partials
hbs.registerPartials(__dirname + '/views/partials');

//.set allows to apply express-related configuration
app.set('view engine', 'hbs');

//server logger with 'next' as an argument
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

//MAINTENANCE MODE
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


//.use - adding middleware
app.use(express.static(__dirname + '/public'));

//registering Helper
//first argument is name of the Helper
//second argument is function that we are passing
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//main route - as arguments request comming in and response comming out
app.get('/',(req, res) => {
  // res.send('<h1>hello express</h1>');
  // res.send({
  //   name: 'Maciej',
  //   likes: [
  //     'traveling',
  //     'biking'
  //   ]
  // })
  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my page!'
      //year is now provided by Handlebars Helper
      //currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
  // res.send('About page');
  // res.render('about.hbs');
  res.render('about.hbs', {
    pageTitle: 'About Page'
    //year is now provided by Handlebars Helper
    //currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req, res) =>{
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    welcomeMessage: 'Those are my projects!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad route!'
  });
});

app.listen(port, () => {
  console.log(`Server is runnin on port ${port}`);
});
