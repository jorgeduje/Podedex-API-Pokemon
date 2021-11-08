let hours = new Date().getHours();
let bg = document.querySelector('body')
//console.log(hours)

if (hours >= 16 && hours <= 18) {
    //console.log('afternoon')
    bg.style.backgroundImage = "url('./assets/img/bg-sunset.jpg')"
} else if (hours >= 6 && hours <= 15) {
    //console.log('morning')
    bg.style.backgroundImage = "url('./assets/img/bg-day.jpg')"
} else {
    //console.log('evening')
    bg.style.backgroundImage = "url('./assets/img/bg-night.jpg')"
}
    
