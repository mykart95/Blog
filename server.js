const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes= require('./routes/blogRoutes')
const port = 3000;
const app = express();

const dbURI='mongodb+srv://karthiblogs:test777@cluster0.bbjjc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(result=>app.listen(process.env.PORT || port,()=>console.log(`listening at http://localhost:${port}`))
    )
    .catch(err=>console.log(err))
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded());
app.use(morgan('tiny'));

app.get('/', (req, res)=>{
   res.redirect('/blogs')
}); 

app.get('/about', (req, res)=>{

        res.render('about', {title: "About"});
}); 

app.use('/blogs', blogRoutes);


app.use((req,res) =>{
    res.status(400).render('404', {title:"404"});
});