// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// An array containing each city's location, state, and population.
let cities = [{
    location: [47.6038, -122.3300],
    city: "Seattle",
    state: "WA",
    name: "Amazon",
    precentage_change: 2.9022
  },
  {
    location: [41.8755, -87.6244],
    city: "Chicago",
    state: "IL",
    name: "Kraft Heinz Co.",
    precentage_change: 12.8531
  },
  {
    location: [30.2711, -97.7436],
    city: "Austin",
    state: "TX",
    name: "Tesla",
    precentage_change: 8.1310
  },
  {
    location: [41.0195, -73.7111],
    city: "Harrison",
    state: "NY",
    name: "PepsiCo Inc.",
    precentage_change: 5.6098
  },
  {
    location: [36.1672, -115.2459],
    city: "Capertino",
    state: "CA",
    name: "Apple",
    precentage_change: 1660272
  }
  ];

  // Loop through the cities array and create one marker for each city.
cities.forEach(function(city) {
    console.log(city)
   });

   // Loop through the cities array and create one marker for each city.
cities.forEach(function(city) {
    console.log(city)
    L.marker(city.location).addTo(map);
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);