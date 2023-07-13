const temprature=document.querySelector(".weather1");
const cityfield=document.querySelector(".weather2 p");
const date=document.querySelector(".weather2 span")
const emojifield=document.querySelector(".weather3 img")
const season=document.querySelector(".weather3 span");
let form=document.querySelector("form");



function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, {weekday: 'long'});
  }
function updatedom(temp_c,text,icon,localtime,name){
    temprature.innerText=temp_c+"°";
    cityfield.innerText=name;
    emojifield.setAttribute("src",`${icon}`);
    season.innerText=text;
    let exactdate=localtime.split(" ")[0];
    let tt=localtime.split(" ")[1];
    // console.log(tt,date);
    let newdate=`${tt}  ${getDayName(new Date(exactdate))}  ${exactdate}`;
    date.innerText=newdate;

}
const fetchdata=async(target="muzaffarnagar")=>{

    
    try {
        const url=`http://api.weatherapi.com/v1/current.json?key=695ea5f9072c4fa3b24110543230706&q=${target}&aqi=yes`;
    let response=(await fetch(url));
 


    let data=await response.json();
    let {current:{temp_c,condition:{text,icon}},
        location:{localtime,name}}=data;
        updatedom(temp_c,text,icon,localtime,name);
   
    } catch (error) {
        alert("Location not found");
    }

}
let Search=(e)=>{
    e.preventDefault();
    let target=document.querySelector("input").value;
    // console.log(target);
    fetchdata(target);
}
fetchdata();

form.addEventListener("submit",Search);