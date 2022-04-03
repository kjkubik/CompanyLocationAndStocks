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
    "Daily Percentage Changes": allDailyPercentChange,
    "Company Regions": allRegions,
    "Monthly Percent Changes": allMonthlyPercentChange
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

    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
        "#d48914",
        "#b14a09",
        "#b12b09",
        "#bf1230",
        "#800d21",
        "#520815"
    ];

    // Looping through intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};

// add legend to the map
legend.addTo(map);

//**********/
// Regions */
//**********/

CompanyRegions = "https://raw.githubusercontent.com/kjkubik/ProjectJSONStockInfo/main/gz_2010_us_040_00_500k.json";

d3.json(CompanyRegions).then(function(data) {

    function styleRegion(feature) {

        name_region = features.properties.NAME;

        return {
            color: getRegionColor(name_region)
        };
    }


    L.geoJSON(data, {
        fillColor: getRegionColor(name_region),
        lineWeight: 1,
        onEachFeature: function(feature, layer) {
            console.log(layer)
                // layer.bindPopup("<h2>" + "Neighborhood: " + feature.properties.AREA_NAME + "</2>");
        }
    }).addTo(map)

    function getRegionColor(name_region) {

        switch (name_region) {
            case name_region = 'Southeast':
                return "green";
            case name_region = 'Northwest':
                return "red";
            case name_region = 'Northeast':
                return "orange";
            case name_region = 'Southeast':
                return "purple";
            case name_region = 'Midwest':
                return "yellow";
            default:
                return "red";
        }
    }
});


//=====================================================





//******************************/
// Daily Stock Percent Changes */
//******************************/

let DailyPercentageChanges = "https://raw.githubusercontent.com/kjkubik/ProjectJSONStockInfo/main/daily_stock_map3.json"

// retrieve earthquake GeoJSON data
d3.json(DailyPercentageChanges).then(function(data) {

    // style for daily percent changes
    function styleInfo(feature) {

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

    // GeoJSON layer for daily percent changes
    L.geoJson(data, {
        // circleMarker
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

        // style for each circleMarker
        style: styleInfo,

        // create a popups for circleMarkers, display magnitude and locationfor each earthquake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Company: " + feature.properties.company_name + "<br>Sector: " + feature.properties.sector + "<br>Region: " + feature.properties.region + "<br>Location: " +
                feature.properties.place + ", " + feature.properties.state_name + "<br>Stock Percent Change: " + Math.round(feature.properties.mag * 100) / 100);
        }

    }).addTo(allDailyPercentChange);

    // Then we add the earthquake layer to our map.
    allDailyPercentChange.addTo(map);
});

//**************************/
// Monthly Percent Changes */
//**************************/

MonthlyPercentChanges = "https://raw.githubusercontent.com/kjkubik/ProjectJSONStockInfo/main/monthly_json_new3.json";
//const majorEQ = "resources\monthly_json_new.geojson"

d3.json(MonthlyPercentChanges).then(function(data) {

    // style for monthly percent changes
    function styleInfo(feature) {

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

    // GeoJSON layer for monthly percent changes
    L.geoJson(data, {
        // circleMarker
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },

        // style for each circleMarker
        style: styleInfo,

        // create a popups for circleMarkers, display magnitude and locationfor each earthquake
        onEachFeature: function(feature, layer) {

            layer.bindPopup("Company: " + feature.properties.company_name + "<br>Sector: " + feature.properties.sector + "<br>Region: " + feature.properties.region + "<br>Location: " +
                feature.properties.place + ", " + feature.properties.state_name + "<br>Stock Percent Change: " + Math.round(feature.properties.mag * 100) / 100);
        }

    }).addTo(allMonthlyPercentChange);

    // Then we add the earthquake layer to our map.
    allMonthlyPercentChange.addTo(map);
});