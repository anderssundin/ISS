'use strict';
let myIcon = L.icon({
    iconUrl: 'alien.png',
    iconSize: [100, 100],
    iconAnchor: [50, 50],
});


let map = L.map('map').setView([0, 0], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
async function getData() {
    let data;
    let request = 'https://api.wheretheiss.at/v1/satellites/25544';
    const result = await fetch(request);
    data = await result.json();
    let long = data.longitude;
    let lat = data.latitude;
    map.panTo([lat, long]);
    let domLong = document.getElementById('long').innerText = `Longitude: ${data.longitude.toFixed(3)}°`;
    let domLat = document.getElementById('lat').innerText = `Latitude: ${data.latitude.toFixed(3)}°`;
    let domAltitude = document.getElementById('altitude').innerText = `Höjd: ${data.altitude.toFixed(1)} km`;
    let domSpeed = document.getElementById('speed').innerText = `Hastighet: ${data.velocity.toFixed(1)} km/h`;
    marker.setLatLng([lat, long]);


}
setInterval(getData, 2000);


