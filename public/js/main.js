const submitBtn =document.getElementById('submitBtn');
const cityName=document.getElementById('cityName');
const city_name=document.getElementById('city_name');

const temp_real_val=document.getElementById('temp_real_val');
const temp_status=document.getElementById('temp_status');
const humidity=document.getElementById('humidity');
const pressure=document.getElementById('pressure');
const description=document.getElementById('description');
const data_hide=document.querySelector('.middle_layer');



const day=document.getElementById('day');
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let dayname = weekday[d.getDay()];

const today_date=document.getElementById('today_date');
let date=d.getDate();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[d.getMonth()];

day.innerText=dayname;
today_date.innerText=`${date} ${month}`;

const getInfo=async(event)=>{
    event.preventDefault(); // to prevent refereshing after click on search
    // alert('Welcome');
    let cityVal=cityName.value;
    if(cityVal === ""){
        city_name.innerText=`Plz enter name of city before searching`;
      data_hide.classList.add('data_hide');
    }
    else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=058c44371ac6c96327e13c56e5982063`;
            const response=await fetch(url);
            const data=await response.json();
            console.log(data);
            const arrData=[data];

            city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`;
            temp_real_val.innerText=arrData[0].main.temp;
            humidity.innerText=arrData[0].main.humidity;
            pressure.innerText=arrData[0].main.pressure;
            description.innerText=arrData[0].weather[0].main;
           
            // temp_status.innerText=arrData[0].weather[0].main; // not needed as we are using images 

            const tempMood=arrData[0].weather[0].main;
            // conditions to check sunny or cloudy
            if(tempMood=="Clear"){
                temp_status.innerHTML="<i class='fas fa-sun' style ='color:#eccc68;'></i>";
            }
            else if(tempMood=="Clouds"){
                temp_status.innerHTML="<i class='fas fa-cloud' style ='color:#f1f2f6;'></i>";
            }
            else if(tempMood=="Rain"){
                temp_status.innerHTML="<i class='fas fa-cloud-rain' style ='color:#a4b0be;'></i>";
            } 
            else{
                temp_status.innerHTML="<i class='fas fa-sun' style ='color:#f1f2f6;'></i>";
            }
            data_hide.classList.remove('data_hide');
        }
        catch{
            data_hide.classList.add('data_hide');
            city_name.innerText=`Plz enter valid city name`;
        }
    }
}
submitBtn.addEventListener('click',getInfo); 