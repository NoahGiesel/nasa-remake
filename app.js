 

    const imgOfDay = document.getElementById("imgOfDay")
    const imgOfDay_HD = document.getElementById("imgOfDay_HD")
    const textOfDay = document.getElementById("textOfDay_one")

    const copyright = document.getElementById("copyright")
    const date = document.getElementById("date")








    fetch("https://api.nasa.gov/planetary/apod?api_key=vp0e7z1FZsaGJHfRQ7qFp6gA4IZK2AVPh4TsvfKq")
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
    })
    .then((data) => { 
         copyright.innerText = data.copyright;
        date.innerText = data.date;
        imgOfDay.src = data.url;
        imgOfDay_HD.src = data.hdurl;
        textOfDay.innerText = data.explanation
    })
/*  the json file is not returning enough data to be able to work. (at the time of developing this site) May be update in future
    fetch("https://api.nasa.gov/insight_weather/?api_key=vp0e7z1FZsaGJHfRQ7qFp6gA4IZK2AVPh4TsvfKq&feedtype=json&ver=1.0")
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
    })
    .then((data) => { 
        console.log(data) 
    })

*/

 