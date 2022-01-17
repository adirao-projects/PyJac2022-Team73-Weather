/*eslint-env es6*/
/*global window, document, console */

var browser_cookies = document.cookie
  .split(';')
  .map(cookie => cookie.split('='))
  .reduce((accumulator, [key, value]) => ({accumulator, [key.trim()]: decodeURIComponent(value) }), {});

console.log(browser_cookies);

if (browser_cookies.theme==undefined) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        var theme_pref = 'dark';
    } else {
        var theme_pref = 'light';
    }
} else {
    var theme_pref = browser_cookies.theme;
}


if (theme_pref=='dark'){
    document.body.className='dark';
    document.cookie = "theme=dark";
    document.getElementById('theme-tip').textContent='Switch to Light Theme';
    document.getElementById('theme-button-solar').value='dark';

} else if (theme_pref=='light') {
    document.body.className='light';
    document.cookie = "theme=light";
    document.getElementById('theme-tip').textContent='Switch to Dark Theme';
    document.getElementById('theme-button-solar').value='light';

}
    


function toggleTheme() {
    let className = document.body.className;
    
    if (className=='dark') {
        document.body.className='light';
        document.cookie = "theme=light";
        document.getElementById('theme-button-solar').value='light';
        document.getElementById('theme-tip').textContent='Switch to Dark Theme';
        
    } else if (className=='light') {
        document.body.className='dark';
        document.cookie = "theme=dark"; 
        document.getElementById('theme-button-solar').value='dark';
        document.getElementById('theme-tip').textContent='Switch to Light Theme';
        
    }
}

async function searchCity(query) {
    var key = '0134171cfe95ebe7417d26919449fb70';

    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + query + ',CA&appid='+ key + '&units=metric');
    let data = await response.json();
    return data;
}

function setCities (city_dat) {
    var city_name = city_dat.name;
    var temp = city_dat.main.temp;
    var cloud = city_dat.clouds.all;
    var wind = city_dat.wind.speed;

    var html = '';
    //Gets data from python (id and name) and adds buttons to the html DOM. Each buttton's onclick sends the client id to python

    html = '<button>'
    +city_name+"<br>"
    + '<?xml version="1.0" ?><svg height="30px" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{font-size:161.72px;stroke:#231815;stroke-miterlimit:10;font-family:DINAlternate-Bold, DIN Alternate;font-weight:700;}.cls-1,.cls-4{fill:#fff;}.cls-2{letter-spacing:-0.02em;}.cls-3{letter-spacing:-0.07em;}.cls-5{fill:#231815;}.cls-6{fill:#f46274;}</style></defs><title/><g data-name="图层 1" id="图层_1"><text class="cls-1" transform="translate(-3.4 -30.77)"><tspan class="cls-2"/><tspan class="cls-3" x="98.94" y="0"/><tspan x="185.56" y="0"/></text><path class="cls-4" d="M265.05,310.78,140.19,185.91a30.05,30.05,0,0,1,0-42.5h0a30.05,30.05,0,0,1,42.5,0L307.56,268.28a56.59,56.59,0,1,1-42.5,42.5Z"/><path class="cls-5" d="M270.36,305.48l-75.42-75.42-42.12-42.12c-2.44-2.44-4.93-4.83-7.31-7.31-11-11.5-7.41-31.32,7.92-37.06,16.64-6.23,27.62,8.8,37.88,19.06l46.76,46.76,48.14,48.14,13.62,13.62c.79.79,1.54,1.68,2.39,2.39,3.3,2.77,6.36,2,10.28,1.39a48.84,48.84,0,0,1,14.35-.18c18,2.45,33.94,15.29,39.71,32.6,5.43,16.28,2.37,35.08-9.1,48.11-11.15,12.66-28.18,19.27-45,16.51-17.57-2.9-32.92-15.39-38.65-32.38a50.33,50.33,0,0,1-1.54-26.79c2-9.41-12.44-13.44-14.46-4-4.82,22.49,1.9,46.35,19.16,62A65,65,0,0,0,333.93,386c20.81-4.39,38.13-19.62,45.9-39.27,7.69-19.44,5.12-42.79-7-59.89-15.29-21.55-41.54-31.34-67.25-25.82l7.3,1.93L259.59,209.7,191.49,141.6a74,74,0,0,0-7.52-6.92,37.86,37.86,0,0,0-40.75-2.87c-22.43,12.29-24.95,42.58-7.59,60.15,20.09,20.33,40.42,40.42,60.63,60.63,20.77,20.77,41.17,42,62.34,62.34.39.38.77.77,1.15,1.15C266.58,322.92,277.19,312.31,270.36,305.48Z"/><path class="cls-6" d="M291.14,305.29,156,170.13a7.73,7.73,0,0,1,0-10.93h0a7.73,7.73,0,0,1,10.93,0L302.07,294.36a34.26,34.26,0,1,1-10.93,10.93Z"/></g></svg>'
    +"<span>"+temp+"°C</span>" //Temperature information
    + '<?xml version="1.0" ?><svg height="20px" enable-background="new 0 0 48 48" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="40px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M35,40H11v-0.051C5.947,39.447,2,35.186,2,30c0-5.187,3.948-9.449,9.002-9.949  C11.002,20.033,11,20.018,11,20c0-6.627,5.373-12,12-12c5.947,0,10.871,4.331,11.821,10.009C34.882,18.008,34.939,18,35,18  c6.075,0,11,4.925,11,11S41.075,40,35,40z M35,20c-0.336,0-0.667,0.021-0.993,0.06l-0.002-0.005  c-0.013,0.001-0.023,0.008-0.036,0.008c-0.549,0-0.993-0.443-0.998-0.99l-0.018-0.002C32.483,13.983,28.209,10,23,10  c-5.523,0-10,4.477-10,10c0,0.297,0.021,0.587,0.048,0.876l-0.01,0.003c0.005,0.041,0.024,0.078,0.024,0.121  c0,0.543-0.434,0.979-0.973,0.994l-0.004,0.014C12.057,22.007,12.029,22,12,22c-4.418,0-8,3.582-8,8c0,4.079,3.055,7.438,7,7.931V38  h24c4.971,0,9-4.029,9-9S39.971,20,35,20z" fill-rule="evenodd"/></svg>'
    +"<span>"+cloud+"%</span>" //Cloud information
    + '<?xml version="1.0" ?><svg height="20px" enable-background="new 0 0 32 32" id="Outline" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><g><path d="M22,10H0V8h22c1.103,0,2-0.897,2-2s-0.897-2-2-2s-2,0.897-2,2h-2c0-2.206,1.794-4,4-4s4,1.794,4,4S24.206,10,22,10z"/><path d="M29,18h-1v-2h1c0.552,0,1-0.449,1-1s-0.448-1-1-1H18v-2h11c1.654,0,3,1.346,3,3S30.654,18,29,18z"/><path d="M23,22h-1v-2h1c0.552,0,1-0.449,1-1s-0.448-1-1-1H0v-2h23c1.654,0,3,1.346,3,3S24.654,22,23,22z"/><path d="M16,28c-2.206,0-4-1.794-4-4h2c0,1.103,0.897,2,2,2s2-0.897,2-2s-0.897-2-2-2H4v-2h12c2.206,0,4,1.794,4,4S18.206,28,16,28   z"/><rect height="2" width="2" x="2" y="12"/><rect height="2" width="10" x="6" y="12"/><rect height="2" width="2" y="20"/></g></svg>'
    +"<span>"+wind+"m/s</span>" //Wind information
    +'</button>';
    
    document.getElementById('city-grid').innerHTML += html;

}
//Loads the overview function, sets the current screen to the current screen (in the iframe) to the overview page.

function cityData() {
    let query = document.getElementById("search-input").value;
    searchCity(query).then(data => setCities(data))
}
