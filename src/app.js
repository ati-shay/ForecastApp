const express=require('express')
const app =express();
const port = process.env.PORT || 3000 ;
const path =require('path');
const hbs=require('hbs');

// to use static file
const static_path=path.join(__dirname,"../public");


// storing paths of views and partials in consits
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");



// telling express that we are using templete engine hbs
app.set('view engine', 'hbs');
app.set('views',template_path); // we have changed path of index.hbs and other files to this
hbs.registerPartials(partials_path);



// express works on top to bottom way, so it firstly display this static page (not "res.send("wellcome to harsh's website")" this page) and closes the connection 
app.use(express.static(static_path));




// for routing ,ie; directing to its location according to request  
app.get("",(req,res)=>{
    // res.send("wellcome to harsh's website")
    res.render('index');
})
app.get("/about",(req,res)=>{
    // res.send("wellcome to harsh's website's about page")
    res.render('about');
})
app.get("/weather",(req,res)=>{
    // res.send("wellcome to harsh's website's weather page")
    res.render('weather');
})
app.get("/news",(req,res)=>{
    // res.send("wellcome to harsh's website's nes page")
    res.render('news');
})
app.get("*",(req,res)=>{
    // res.send("404 error page !!") 
    res.render('404error',{
        errorMsg:'Opps! Page Not Found'
    });
})

app.listen(port,()=>{
    console.log(`listening to the port at ${port}`);
})