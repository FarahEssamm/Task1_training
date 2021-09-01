const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const weatherRoutes = require('./routes/weatherRoutes');


// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb://FarahEssam:Farah1234@cluster0-shard-00-00.twxmv.mongodb.net:27017,cluster0-shard-00-01.twxmv.mongodb.net:27017,cluster0-shard-00-02.twxmv.mongodb.net:27017/note-tuts?ssl=true&replicaSet=atlas-12i9mg-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT||3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);


//weather routes from router
app.use('/api', weatherRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});