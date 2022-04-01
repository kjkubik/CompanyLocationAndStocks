// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [40.7, -94.5],
    zoom: 3,
    layers: [streets]
});

// base layer 
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Dark Map": dark
};




// layers
let allDailyPercentChange = new L.LayerGroup();
let allRegions = new L.LayerGroup();
let allMonthlyPercentChange = new L.LayerGroup();


// overlays 
let overlays = {
    "Daily Percent Change": allDailyPercentChange,
    "Regions": allRegions,
    "Monthly Percent Change": allMonthlyPercentChange
};


// control for layers to be toggled on and off
L.control.layers(baseMaps, overlays).addTo(map);

// legend control object
let legend = L.control({
    position: "bottomright"
});


// creating HTML for legand on map:
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");

    const percent_change = [0, 1, 2, 3, 4, 5];
    const colors = [
        "#d48914",
        "#b14a09",
        "#b12b09",
        "#bf1230",
        "#800d21",
        "#520815"
    ];
    // N O T H I N G   C H A N G E S   A B O V E    H E R E ! ! ! ! !   


    // Looping through intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < percent_change.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            percent_change[i] + (percent_change[i + 1] ? "&ndash;" + percent_change[i + 1] + "<br>" : "+");
    }
    return div;
};

// add legend to the map
legend.addTo(map);

//******************/
// Company Regions */
//******************/

// T H I S   R E S O U R C E   I S   G O I N G   T O   H A V E   T O   B E   F O R   T H E   W E E K L Y   I N P U T ! ! ! ! 
// (O R   I   L I K E D   M A N D O ' S   S U G G E S T I O N .   W E   M A Y   B E   A B L E   T O   S H O W   A L L   1 1   R E G I O N S )
companyRegions = "resources\geo_json_new.geojson";

d3.json(companyRegions).then(function(data) {
    L.geoJSON(data, {
        color: "#264f45",
        weight: 2
    }).addTo(allRegions);
})
allRegions.addTo(map);

//**************************/
// Daily Percentage Change */
//**************************/

// T H I S   R E S O U R C E   I S   G O I N G   T O   H A V E   T O   B E   F O R   T H E   D A I L Y   I N P U T ! ! !
let dailyPercentChange = "resources\geo_json_new.geojson"

// retrieve daily percent change GeoJSON data
d3.json(dailyPercentChange).then(function(data) {

    // style for daily percent change
    function styleInfo(feature) {

        magnitude = parseInt(feature.properties.mag);

        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(),
            color: "#000000",
            radius: getRadius(magnitude, 'earthquake'),
            stroke: true,
            weight: 0.5
        };
    }

    // color, dependant on magnitude of earthquake
    function getColor(magnitude) {

        console.log(magnitude);

        switch (magnitude) {
            case magnitude = 5:
                return "#800d21";
            case magnitude = 4:
                return "#bf1230";
            case magnitude = 3:
                return "#b12b09";
            case magnitude = 2:
                return "#b14a09";
            case magnitude = 1:
                return "#d48914";
            default:
                return "#520815";
        }
    }

    // radius, dependant on magnitude of earthquake 
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // GeoJSON layer for daily percent change
    L.geoJson(data, {
        // circleMarker
        pointToLayer: function(feature, coordinates) {
            console.log(data);
            return L.circleMarker(coordinates);
        },

        // style for each circleMarker
        style: styleInfo,

        // create a popups for circleMarkers, display magnitude and locationfor each earthquake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Company Name: " + feature.properties.company_name + "<br>Region: " + feature.properties.region +
                "<br>Location: " + feature.properties.city_name + ", " + feature.properties.state_name +
                "<br>Percent Change: " + mag);
        }

    }).addTo(allDailyPercentChange);

    // Then we add the earthquake layer to our map.
    allDailyPercentChange.addTo(map);
});

//********************/
// Monthly Percent Chnages */
//********************/
// W H E R E   M O N T H L Y   P E R C E N T   C H A N G E S   C O U L D   G O ! ! !
monthlyPercentChanges = "resources\monthly_json_new.geojson";
d3.json(monthlyPercentChanges).then(function(data) {

    // A L L   M A P S   W E   A R E   C R E A T I N G   W I L L   B E   D O I N G 
    // W H A T   I S   I N   E A R T H Q U A K E S   M A P   D O E S, N O T   T H I S. 
    // C O P Y   F R O M   E A R T H Q U A K E ! ! ! 
    // style for Monthly Percent CHnages
    function styleInfo(feature) {

        // W H E R E   D O E S   T H E S E   C O M E   F R O M ?   S P E C I F I C A L L Y 
        // D O E S   I T   C O M E   F R O M   T H E   J S O N ?   P L E A S E   V E R I F Y ! ! ! 
        // feature.properties.mag
        // magnitude
        //'earthquake'

        magnitude = parseInt(feature.properties.mag);

        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(magnitude),
            color: "#000000",
            radius: getRadius(magnitude, 'earthquake'),
            stroke: true,
            weight: 0.5
        };
    }


    // color, dependant on magnitude of earthquake
    function getColor(magnitude) {

        console.log(magnitude);

        switch (magnitude) {
            case magnitude = 4:
                return "#bf1230";
            case magnitude = 5:
                return "#800d21";
            case magnitude = 6:
                return "#520815";
            default:
                return "#f69c0e";
        }
    }

    // radius, dependant on magnitude of earthquake 
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // GeoJSON layer for earthquakes
    L.geoJson(data, {
        // circleMarker
        pointToLayer: function(feature, coordinates) {
            console.log(data);
            return L.circleMarker(coordinates);
        },

        // style for each circleMarker
        style: styleInfo,

        // C H A N G E   P O P U P S   T O   C O M P A N Y   N A M E ,   C I T Y ,   
        // S T A T E ,   R E G I O N ,   A N D   P E R C E N T   C H A N G E ! ! !
        // create a popups for circleMarkers, display magnitude and locationfor each earthquake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }

    }).addTo(allMonthlyPercentChange);

    // Then we add the earthquake layer to our map.
    allMonthlyPercentChange.addTo(map);
});